import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ─── Date helpers ────────────────────────────────────────────────────────────

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date - start) / 86400000)
}

function getDateMeta(dateStr) {
  const date = dateStr ? new Date(dateStr + 'T12:00:00Z') : new Date()
  const isoStr = date.toISOString().slice(0, 10)
  const accentKeys = ['acid', 'electric', 'klein', 'violet', 'fuchsia']
  return {
    dateStr: isoStr,
    accentKey: accentKeys[getISOWeek(date) % 5],
    layoutSeed: getDayOfYear(date) % 3,
  }
}

// ─── Claude content generation ───────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a viral gut health content creator for @the.goodgut.guide on Instagram.
Your style is brutalist, punchy, science-backed. Bold single-idea headlines. Short words, direct claims.
Every piece of copy stops the scroll. You write for people who are curious but busy — one clear idea per slide.
Output ONLY valid JSON. No markdown fences, no commentary, no trailing text.`

const USER_PROMPT = `Generate a complete Instagram content package for today's gut health post.
Pick a compelling gut health topic NOT covered by these already-done topics: bloating, skin/acne, cravings, immunity, mood/serotonin.

Return ONLY this JSON schema (no other text):
{
  "carousel": {
    "hookEyebrow": "3-5 word phrase, lowercase, provocative",
    "hookTitle": "2-4 words, use \\n for line break, ALL CAPS feel",
    "hookTeaser": "X signs · #N will surprise you",
    "topic01": {
      "heading": "5-8 words, punchy, ALL CAPS feel",
      "body": "2-3 sentences, 40-55 words, one specific fact or stat",
      "cliffhanger": "8-10 words teasing next slide"
    },
    "topic02": {
      "heading": "5-8 words",
      "body": "2-3 sentences, 40-55 words",
      "cliffhanger": "8-10 words"
    },
    "topic03break": {
      "title": "3-5 words with \\n for line break, the shocking key claim",
      "subtitle": "3-6 words expanding the claim"
    },
    "topic03detail": {
      "eyebrow": "↓ Save this one",
      "heading": "5-8 words",
      "body": "2-3 sentences, 40-55 words"
    },
    "topic04": {
      "heading": "5-8 words",
      "body": "2-3 sentences, 40-55 words",
      "cliffhanger": "8-10 words"
    },
    "topic05": {
      "heading": "5-8 words",
      "body": "2-3 sentences, 40-55 words"
    },
    "ctaSummary": "Topic1 · Topic2 · Topic3\\nTopic4 · Topic5",
    "caption": "Hook line. 3-4 sentences expanding the topic. Call to action. 15-20 relevant hashtags on new lines."
  },
  "stories": {
    "storyHook": "4-6 lines, 3-5 words each, use \\n between lines, designed to stop scroll",
    "storyCliffToPost": "2 short lines teasing the carousel, use \\n between",
    "factNumber": "startling statistic like 95% or 3× or 400M",
    "factHeading": "4-8 words completing the stat",
    "factBody": "2-3 punchy sentences expanding the fact, 30-40 words",
    "storyCliff2": "8-10 word cliffhanger pointing to post",
    "postTitle": "3-6 words matching carousel topic, use \\n if needed",
    "pollQuestion": "Yes/No or agree/disagree question for Instagram poll sticker",
    "thisOrThatQ": "A vs B choice for Instagram quiz sticker, e.g. Kombucha or Kefir?",
    "hotTake": "Bold contrarian claim under 10 words, no question mark"
  }
}`

async function generateWithClaude() {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    temperature: 1,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: USER_PROMPT }],
  })

  const raw = response.content[0].text.trim()

  // Strip markdown code fences if Claude adds them
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '')

  try {
    return JSON.parse(cleaned)
  } catch {
    // Try extracting JSON object from response
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error(`Claude returned invalid JSON:\n${cleaned.slice(0, 300)}`)
  }
}

// ─── Gemini image generation (optional) ─────────────────────────────────────

async function generateGeminiImage(topic, dateStr) {
  if (!process.env.GOOGLE_AI_API_KEY) return null

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' })

    const styleHint = process.env.IMAGE_STYLE ||
      'award-winning editorial photography, macro close-up of fermented foods or gut microbiome ' +
      'visualised as bioluminescent organisms, deep blacks, acid green and electric blue accents, ' +
      'cinematic lighting, Wired magazine aesthetic, no text, no people'
    const prompt = `Create a striking visual image for a gut health Instagram post on the topic: "${topic}". Visual style: ${styleHint}. IMPORTANT: zero text, zero words, zero letters or typography anywhere in the image — purely visual, no captions, no labels. No human figures. Symbolic, abstract or close-up composition that evokes the topic visually.`

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
        imageConfig: { aspectRatio: '1:1' },
      },
    })

    for (const part of result.response.candidates[0].content.parts) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        const imgBuf = Buffer.from(part.inlineData.data, 'base64')
        const genDir = join(ROOT, 'assets', 'generated')
        await mkdir(genDir, { recursive: true })
        const imgPath = join(genDir, `image-${dateStr}.png`)
        await writeFile(imgPath, imgBuf)
        console.log(`[generate] Gemini image saved: ${imgPath}`)
        return imgPath
      }
    }
  } catch (err) {
    console.warn(`[generate] Gemini image generation skipped: ${err.message}`)
  }
  return null
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generateContent(dateStr) {
  const meta = getDateMeta(dateStr)
  console.log(`[generate] Generating content for ${meta.dateStr} (accent: ${meta.accentKey}, layout: ${meta.layoutSeed})`)

  const content = await generateWithClaude()
  console.log(`[generate] Claude response received`)

  // Extract topic context for Gemini — combine hook + first topic heading for specificity
  const topicContext = [
    content.carousel?.hookEyebrow,
    content.carousel?.hookTitle?.replace(/\\n/g, ' '),
    content.carousel?.topic01?.heading,
  ].filter(Boolean).join(' · ')
  await generateGeminiImage(topicContext, meta.dateStr)

  const output = {
    date: meta.dateStr,
    accentKey: meta.accentKey,
    layoutSeed: meta.layoutSeed,
    carousel: content.carousel,
    stories: content.stories,
  }

  const outDir = join(ROOT, 'output')
  await mkdir(outDir, { recursive: true })
  const outPath = join(outDir, `content-${meta.dateStr}.json`)
  await writeFile(outPath, JSON.stringify(output, null, 2))
  console.log(`[generate] Saved: ${outPath}`)

  return output
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dateArgIdx = process.argv.indexOf('--date')
  const dateArg = dateArgIdx !== -1 ? process.argv[dateArgIdx + 1] : null
  await generateContent(dateArg)
}
