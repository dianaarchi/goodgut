import 'dotenv/config'
import http from 'http'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { basename, dirname, join } from 'path'

const IG_API = 'https://graph.instagram.com/v21.0'
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
  const params = new URLSearchParams({ ...body, access_token: token() })
  const res = await fetch(`${IG_API}${path}`, {
    method: 'POST',
    body: params,
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

// ─── CLI ──────────────────────────────────────────────────────────────────────

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const { readFile } = await import('fs/promises')
  const { resolve, join: pjoin } = await import('path')

  const [,, mode, contentPath] = process.argv
  if (!mode || !contentPath) {
    console.error('Usage: node pipeline/post.js <carousel|stories> <content-YYYY-MM-DD.json>')
    process.exit(1)
  }

  const content = JSON.parse(await readFile(resolve(contentPath), 'utf8'))
  const date = content.date
  const dir = resolve('output')

  if (mode === 'carousel') {
    const pngs = Array.from({ length: 8 }, (_, i) =>
      pjoin(dir, `${date}-carousel-${String(i + 1).padStart(2, '0')}.png`))
    await postCarousel(pngs, content.carousel.caption)
  } else if (mode === 'stories') {
    const pngs = Array.from({ length: 4 }, (_, i) =>
      pjoin(dir, `${date}-story-${String(i + 1).padStart(2, '0')}.png`))
    await postStories(pngs)
  } else {
    console.error(`Unknown mode: ${mode}. Use "carousel" or "stories".`)
    process.exit(1)
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
