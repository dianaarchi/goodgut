import { readFile, writeFile, access, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FONT_DIR = join(ROOT, 'assets', 'fonts')

const FONTS = {
  anton: {
    file: 'Anton-Regular.ttf',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf',
  },
  spacemono: {
    file: 'SpaceMono-Regular.ttf',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/spacemono/SpaceMono-Regular.ttf',
  },
}

async function ensureFont(name, { file, url }) {
  const dest = join(FONT_DIR, file)
  try {
    await access(dest)
  } catch {
    console.log(`[fonts] Downloading ${name}...`)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Font download failed: ${url} (${res.status})`)
    await writeFile(dest, Buffer.from(await res.arrayBuffer()))
    console.log(`[fonts] Saved ${file}`)
  }
  return readFile(dest)
}

export async function loadFonts() {
  await mkdir(FONT_DIR, { recursive: true })
  const [antonBuf, spacemonoBuf] = await Promise.all([
    ensureFont('Anton', FONTS.anton),
    ensureFont('SpaceMono', FONTS.spacemono),
  ])
  return { antonBuf, spacemonoBuf }
}

// Standalone test
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { antonBuf, spacemonoBuf } = await loadFonts()
  console.log(`Anton: ${antonBuf.length} bytes`)
  console.log(`SpaceMono: ${spacemonoBuf.length} bytes`)
}
