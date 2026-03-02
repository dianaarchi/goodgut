import 'dotenv/config'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { loadFonts } from './fonts.js'
import {
  makePalette,
  renderSlide1, renderSlide2, renderSlide3, renderSlide4,
  renderSlide5, renderSlide6, renderSlide7, renderSlide8,
} from './templates/carousel.js'
import {
  renderStory1, renderStory2, renderStory3, renderStory4,
} from './templates/stories.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function buildFontConfig() {
  const { antonBuf, spacemonoBuf } = await loadFonts()
  return [
    { name: 'Anton',      data: antonBuf,     weight: 400, style: 'normal' },
    { name: 'Space Mono', data: spacemonoBuf, weight: 400, style: 'normal' },
  ]
}

async function svgToPng(svgStr, width) {
  const resvg = new Resvg(svgStr, { fitTo: { mode: 'width', value: width } })
  return resvg.render().asPng()
}

// ─── Carousel render (8 × 1080×1080 PNGs) ────────────────────────────────────

export async function renderCarousel(content) {
  const outDir = join(ROOT, process.env.OUTPUT_DIR ?? 'output')
  await mkdir(outDir, { recursive: true })

  const P = makePalette(content.accentKey)
  const fonts = await buildFontConfig()
  const d = content.carousel

  const slides = [
    renderSlide1(d, P),
    renderSlide2(d, P),
    renderSlide3(d, P),
    renderSlide4(d, P),
    renderSlide5(d, P),
    renderSlide6(d, P),
    renderSlide7(d, P),
    renderSlide8(d, P),
  ]

  const pngPaths = []
  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: 1080, height: 1080, fonts })
    const png = await svgToPng(svg, 1080)
    const filepath = join(outDir, `${content.date}-carousel-${String(i + 1).padStart(2, '0')}.png`)
    await writeFile(filepath, png)
    console.log(`[render] ${filepath}`)
    pngPaths.push(filepath)
  }

  return pngPaths
}

// ─── Stories render (4 × 1080×1920 PNGs) ─────────────────────────────────────

export async function renderStories(content) {
  const outDir = join(ROOT, process.env.OUTPUT_DIR ?? 'output')
  await mkdir(outDir, { recursive: true })

  const P = makePalette(content.accentKey)
  const fonts = await buildFontConfig()
  const d = content.stories
  const seed = content.layoutSeed ?? 0

  const stories = [
    renderStory1(d, P, seed),
    renderStory2(d, P, seed),
    renderStory3(d, P, seed),
    renderStory4(d, P, seed),
  ]

  const pngPaths = []
  for (let i = 0; i < stories.length; i++) {
    const svg = await satori(stories[i], { width: 1080, height: 1920, fonts })
    const png = await svgToPng(svg, 1080)
    const filepath = join(outDir, `${content.date}-story-${String(i + 1).padStart(2, '0')}.png`)
    await writeFile(filepath, png)
    console.log(`[render] ${filepath}`)
    pngPaths.push(filepath)
  }

  return pngPaths
}

// ─── CLI: node pipeline/render.js <content.json> ─────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const contentPath = process.argv[2]
  if (!contentPath) {
    console.error('Usage: node pipeline/render.js <path/to/content-YYYY-MM-DD.json>')
    process.exit(1)
  }
  const content = JSON.parse(await readFile(contentPath, 'utf8'))
  await renderCarousel(content)
  await renderStories(content)
}
