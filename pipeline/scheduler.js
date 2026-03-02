import 'dotenv/config'
import cron from 'node-cron'
import { readdir, readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { generateContent } from '../generator/generate.js'
import { renderCarousel, renderStories } from './render.js'
import { postCarousel, postStories } from './post.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const TZ            = process.env.TIMEZONE            ?? 'UTC'
const CAROUSEL_TIME = process.env.CAROUSEL_POST_TIME  ?? '09:00'
const STORY_TIMES   = (process.env.STORIES_POST_TIMES ?? '10:00').split(',').map(t => t.trim())

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert "HH:MM" and optional day spec to cron expression */
function toCron(hhmm, days = '*') {
  const [h, m] = hhmm.split(':').map(Number)
  return `${m} ${h} * * ${days}`
}

/** Load the most recently generated content JSON from output/ */
async function loadLatestContent() {
  const outDir = join(ROOT, 'output')
  const files = (await readdir(outDir).catch(() => []))
    .filter(f => /^content-\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
  if (!files.length) return null
  return JSON.parse(await readFile(join(outDir, files[files.length - 1]), 'utf8'))
}

// ─── Job runners ──────────────────────────────────────────────────────────────

async function runCarousel() {
  console.log('[scheduler] ── Carousel run starting ──')
  try {
    const content  = await generateContent()
    const pngPaths = await renderCarousel(content)
    await postCarousel(pngPaths, content.carousel.caption)
    console.log('[scheduler] Carousel run complete')
  } catch (err) {
    console.error('[scheduler] Carousel run failed:', err)
  }
}

async function runStories() {
  console.log('[scheduler] ── Stories run starting ──')
  try {
    const content = await loadLatestContent()
    if (!content) {
      console.warn('[scheduler] No content found — skipping stories')
      return
    }
    const pngPaths = await renderStories(content)
    await postStories(pngPaths)
    console.log('[scheduler] Stories run complete')
  } catch (err) {
    console.error('[scheduler] Stories run failed:', err)
  }
}

// ─── Schedules ────────────────────────────────────────────────────────────────

// Carousel: every day at CAROUSEL_POST_TIME
cron.schedule(toCron(CAROUSEL_TIME), runCarousel, { timezone: TZ })
console.log(`[scheduler] Carousel   → ${CAROUSEL_TIME} daily (${TZ})`)

// Stories: Mon / Wed / Fri at each configured time
for (const t of STORY_TIMES) {
  cron.schedule(toCron(t, '1,3,5'), runStories, { timezone: TZ })
  console.log(`[scheduler] Stories    → ${t} Mon/Wed/Fri (${TZ})`)
}

console.log('[scheduler] Running — Ctrl+C to stop')
