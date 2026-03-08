import 'dotenv/config'
import http from 'http'
import { createReadStream } from 'fs'
import { stat, readdir, readFile } from 'fs/promises'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const IG_API = 'https://graph.facebook.com/v21.0'
const SERVER_PORT = 8081

const token  = () => process.env.INSTAGRAM_ACCESS_TOKEN
const userId = () => process.env.INSTAGRAM_USER_ID

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── Temp HTTP server ─────────────────────────────────────────────────────────
// Serves PNG files from a single directory so Instagram can pull them via URL.

function startServer(dir) {
  const server = http.createServer(async (req, res) => {
    try {
      const filename = decodeURIComponent(req.url.replace(/^\/+/, ''))
      const filePath = join(dir, filename)
      const { size } = await stat(filePath)
      res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': size })
      createReadStream(filePath).pipe(res)
    } catch {
      res.writeHead(404).end()
    }
  })
  return new Promise((resolve, reject) => {
    server.listen(SERVER_PORT, '0.0.0.0', () => resolve(server))
    server.on('error', reject)
  })
}

// ─── Instagram Graph API helpers ──────────────────────────────────────────────

async function igPost(path, body) {
  const res = await fetch(`${IG_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, access_token: token() }),
  })
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(`IG API ${path}: ${JSON.stringify(data)}`)
  return data
}

async function igGet(path) {
  const url = `${IG_API}${path}${path.includes('?') ? '&' : '?'}access_token=${token()}`
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok || data.error) throw new Error(`IG API ${path}: ${JSON.stringify(data)}`)
  return data
}

async function pollUntilReady(containerId, maxAttempts = 30, intervalMs = 3000) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(intervalMs)
    const { status_code } = await igGet(`/${containerId}?fields=status_code`)
    console.log(`[post] Container ${containerId}: ${status_code} (${i + 1}/${maxAttempts})`)
    if (status_code === 'FINISHED') return
    if (status_code === 'ERROR') throw new Error(`Container ${containerId} errored`)
  }
  throw new Error(`Container ${containerId} polling timed out`)
}

async function publish(containerId) {
  const { id } = await igPost(`/${userId()}/media_publish`, { creation_id: containerId })
  return id
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export async function postCarousel(pngPaths, caption) {
  const dir = dirname(pngPaths[0])
  const server = await startServer(dir)
  console.log(`[post] Image server listening on :${SERVER_PORT}`)

  try {
    const baseUrl = `${process.env.SERVER_BASE_URL}:${SERVER_PORT}`

    // 1. Upload each slide as a carousel item
    const itemIds = []
    for (const pngPath of pngPaths) {
      const filename = basename(pngPath)
      const { id } = await igPost(`/${userId()}/media`, {
        image_url: `${baseUrl}/${filename}`,
        is_carousel_item: true,
      })
      console.log(`[post] Carousel item: ${filename} → ${id}`)
      itemIds.push(id)
    }

    // 2. Create carousel container
    const { id: containerId } = await igPost(`/${userId()}/media`, {
      media_type: 'CAROUSEL',
      children: itemIds.join(','),
      caption,
    })
    console.log(`[post] Carousel container: ${containerId}`)

    // 3. Poll until ready
    await pollUntilReady(containerId)

    // 4. Publish
    const postId = await publish(containerId)
    console.log(`[post] Carousel published → post ${postId}`)
    return postId
  } finally {
    server.close()
    console.log('[post] Image server closed')
  }
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export async function postStories(pngPaths) {
  const dir = dirname(pngPaths[0])
  const server = await startServer(dir)
  console.log(`[post] Image server listening on :${SERVER_PORT}`)

  try {
    const baseUrl = `${process.env.SERVER_BASE_URL}:${SERVER_PORT}`

    for (const pngPath of pngPaths) {
      const filename = basename(pngPath)

      // 1. Upload story
      const { id: storyId } = await igPost(`/${userId()}/media`, {
        image_url: `${baseUrl}/${filename}`,
        media_type: 'STORIES',
      })
      console.log(`[post] Story uploaded: ${filename} → ${storyId}`)

      // 2. Poll until ready
      await pollUntilReady(storyId)

      // 3. Publish
      const postId = await publish(storyId)
      console.log(`[post] Story published → post ${postId}`)
    }
  } finally {
    server.close()
    console.log('[post] Image server closed')
  }
}

// ─── CLI entry point ──────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url)

if (process.argv[1] === __filename) {
  const args    = process.argv.slice(2)
  const typeIdx = args.indexOf('--type')
  const type    = typeIdx !== -1 ? args[typeIdx + 1] : null
  const full    = args.includes('--full')

  const ROOT   = join(dirname(__filename), '..')
  const outDir = join(ROOT, process.env.OUTPUT_DIR ?? 'output')

  async function loadLatestContent() {
    const files = (await readdir(outDir).catch(() => []))
      .filter(f => /^content-\d{4}-\d{2}-\d{2}\.json$/.test(f))
      .sort()
    if (!files.length) throw new Error('No content JSON found in output/')
    return JSON.parse(await readFile(join(outDir, files[files.length - 1]), 'utf8'))
  }

  async function findPngs(pattern) {
    const files = (await readdir(outDir).catch(() => []))
      .filter(f => pattern.test(f))
      .sort()
      .map(f => join(outDir, f))
    if (!files.length) throw new Error(`No PNGs found matching ${pattern}`)
    return files
  }

  async function main() {
    if (!type && !full) {
      console.error('Usage: node pipeline/post.js --type carousel|stories')
      console.error('       node pipeline/post.js --full')
      process.exit(1)
    }

    const content = await loadLatestContent()
    const date = content.date
    console.log(`[post] Using content for ${date}`)

    if (type === 'carousel' || full) {
      const pngs = await findPngs(new RegExp(`^${date}-carousel-\\d+\\.png$`))
      console.log(`[post] Carousel: ${pngs.length} slides`)
      await postCarousel(pngs, content.carousel.caption)
    }

    if (type === 'stories' || full) {
      const pngs = await findPngs(new RegExp(`^${date}-story-\\d+\\.png$`))
      console.log(`[post] Stories: ${pngs.length} slides`)
      await postStories(pngs)
    }
  }

  main().catch(err => {
    console.error('[post] Fatal:', err.message)
    process.exit(1)
  })
}
