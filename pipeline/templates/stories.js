/**
 * Stories render templates — React.createElement equivalents of design/stories/stories.jsx
 * Production canvas: 1080×1920 (design preview was 240×426, scale ≈ ×4.5)
 *
 * renderStory1–4(d, P, layoutSeed) return React element trees for Satori.
 * d = content.stories data, P = palette from makePalette(), layoutSeed = 0|1|2
 */

import { createElement as h } from 'react'
import { makePalette } from './carousel.js'

// ─── Colour helpers ───────────────────────────────────────────────────────────

// Text colour to use on top of the accent background
function toa(P) { return P.accent === '#1845FF' ? P.text1 : P.bg1 }
// Muted colour on accent background
function moa(P) { return P.accent === '#1845FF' ? 'rgba(240,240,232,0.5)' : 'rgba(13,13,13,0.5)' }

// ─── Font-size helpers (design preview sizes × 4.5 → 1080px production) ──────

function hookFont(text) {
  const lines = text.split('\n').length
  const maxLen = Math.max(...text.split('\n').map(l => l.length))
  if (lines >= 6 || maxLen > 18) return 99   // 22 × 4.5
  if (lines >= 5 || maxLen > 15) return 117  // 26 × 4.5
  if (lines >= 4) return 135                  // 30 × 4.5
  return 162                                  // 36 × 4.5
}

function headFont(text) {
  if (text.length > 45) return 81    // 18 × 4.5
  if (text.length > 35) return 99    // 22 × 4.5
  if (text.length > 25) return 108   // 24 × 4.5
  return 126                          // 28 × 4.5
}

function numFont() { return 180 }    // 40 × 4.5

function ctaTitleFont(text) {
  const lines = text.split('\n').length
  if (lines > 3) return 108  // 24 × 4.5
  if (lines > 2) return 126  // 28 × 4.5
  return 153                  // 34 × 4.5
}

function engageFont(text) {
  if (text.length > 50) return 99   // 22 × 4.5
  if (text.length > 35) return 117  // 26 × 4.5
  return 135                         // 30 × 4.5
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

// Root: 1080×1920 story container
function root(bg, ...children) {
  return h('div', {
    style: {
      width: 1080, height: 1920,
      display: 'flex', flexDirection: 'column',
      backgroundColor: bg,
      position: 'relative',
      overflow: 'hidden',
    },
  }, ...children)
}

// z: absolutely-positioned flex column (equiv. of <Z> component in JSX design)
// Default left/right: 99px (= 22 × 4.5)
function z({ top, bottom, left, right, style }, ...children) {
  return h('div', {
    style: {
      position: 'absolute',
      top,
      left: left !== undefined ? left : 99,
      right: right !== undefined ? right : 99,
      ...(bottom !== undefined ? { bottom } : {}),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      ...(style || {}),
    },
  }, ...children)
}

// ─── Story 1 — Hook Teaser ────────────────────────────────────────────────────

function s1_straight_top65(d, P) {
  const fs = hookFont(d.storyHook)
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '65%', backgroundColor: P.accent } }),

    z({ top: '3%', style: { height: '5%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: toa(P), opacity: 0.5, letterSpacing: 14, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),

    z({ top: '10%', bottom: '38%' },
      h('h1', { style: { fontFamily: 'Anton', fontSize: fs, fontWeight: 400, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.storyHook,
      ),
    ),

    z({ top: '70%', bottom: '12%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5 } },
        d.storyCliffToPost,
      ),
    ),

    z({ top: '92%', bottom: '2%' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.accent, textTransform: 'uppercase', letterSpacing: 9 } },
          'New post ↓',
        ),
        h('span', { style: { fontFamily: 'Anton', fontSize: 72, color: P.accent } }, '→'),
      ),
    ),
  )
}

function s1_diag_band(d, P) {
  const fs = hookFont(d.storyHook)
  return root(P.bg1,
    h('div', { style: {
      position: 'absolute', top: '34%', left: '50%',
      width: '180%', height: '52%',
      backgroundColor: P.accent,
      transform: 'translate(-50%, -50%) rotate(-12deg)',
    } }),

    z({ top: '3%', style: { height: '5%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: P.accent, opacity: 0.6, letterSpacing: 14, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),

    z({ top: '12%', bottom: '42%' },
      h('h1', { style: { fontFamily: 'Anton', fontSize: fs, fontWeight: 400, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.storyHook,
      ),
    ),

    z({ top: '72%', bottom: '12%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5 } },
        d.storyCliffToPost,
      ),
    ),

    z({ top: '92%', bottom: '2%' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.accent, textTransform: 'uppercase', letterSpacing: 9 } },
          'New post ↓',
        ),
        h('span', { style: { fontFamily: 'Anton', fontSize: 72, color: P.accent } }, '→'),
      ),
    ),
  )
}

function s1_straight_leftBar(d, P) {
  const fs = hookFont(d.storyHook)
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '24%', height: '100%', backgroundColor: P.accent } }),

    z({ top: '6%', bottom: '44%', left: '30%' },
      h('h1', { style: { fontFamily: 'Anton', fontSize: fs, fontWeight: 400, color: P.text1, lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.storyHook,
      ),
    ),

    z({ top: '60%', bottom: '18%', left: '30%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5 } },
        d.storyCliffToPost,
      ),
    ),

    z({ top: '88%', bottom: '2%', left: '30%' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.accent, textTransform: 'uppercase', letterSpacing: 9 } },
          'New post ↓',
        ),
        h('span', { style: { fontFamily: 'Anton', fontSize: 72, color: P.accent } }, '→'),
      ),
    ),

    // Vertical branding on left accent bar
    h('div', { style: { position: 'absolute', bottom: '8%', left: '5%', transform: 'rotate(-90deg)', transformOrigin: 'left bottom', display: 'flex' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: toa(P), opacity: 0.5, letterSpacing: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

// ─── Story 2 — Micro-Fact ─────────────────────────────────────────────────────

function s2_diag_vertical(d, P) {
  const hfs = headFont(d.factHeading)
  const nfs = numFont()
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: P.accent, clipPath: 'polygon(0 0, 42% 0, 30% 100%, 0 100%)' } }),

    // Number in the accent column (left: 63 = 14 × 4.5)
    z({ top: '6%', left: 63, style: { height: '12%', right: '64%' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: nfs, color: toa(P), lineHeight: 1 } },
        d.factNumber,
      ),
    ),

    // Heading in the dark right area
    z({ top: '8%', bottom: '66%', left: '44%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: hfs, color: P.text1, lineHeight: 1.05, margin: 0, textTransform: 'uppercase' } },
        d.factHeading,
      ),
    ),

    z({ top: '38%', bottom: '38%', left: '36%' },
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5, margin: 0 } },
        d.factBody,
      ),
    ),

    z({ top: '68%', bottom: '14%', left: '36%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: P.muted1, fontStyle: 'italic', lineHeight: 1.45 } },
        d.storyCliff2,
      ),
    ),

    // Vertical branding
    h('div', { style: { position: 'absolute', bottom: '10%', left: '4%', transform: 'rotate(-90deg)', transformOrigin: 'left bottom', display: 'flex' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: toa(P), opacity: 0.4, letterSpacing: 14, textTransform: 'uppercase', whiteSpace: 'nowrap' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

function s2_straight_band(d, P) {
  const hfs = headFont(d.factHeading)
  const nfs = numFont()
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: '26%', left: 0, width: '100%', height: '28%', backgroundColor: P.accent } }),

    z({ top: '5%', style: { height: '16%' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: nfs, color: P.accent, lineHeight: 1 } },
        d.factNumber,
      ),
    ),

    z({ top: '27%', bottom: '46%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: hfs, color: toa(P), lineHeight: 1.05, margin: 0, textTransform: 'uppercase' } },
        d.factHeading,
      ),
    ),

    z({ top: '60%', bottom: '22%' },
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5, margin: 0 } },
        d.factBody,
      ),
    ),

    z({ top: '80%', bottom: '8%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: P.muted1, fontStyle: 'italic', lineHeight: 1.45 } },
        d.storyCliff2,
      ),
    ),

    z({ top: '94%', bottom: '1%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, opacity: 0.4, letterSpacing: 14, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

function s2_diag_band(d, P) {
  const hfs = headFont(d.factHeading)
  const nfs = numFont()
  return root(P.bg1,
    h('div', { style: {
      position: 'absolute', top: '40%', left: '50%',
      width: '180%', height: '34%',
      backgroundColor: P.accent,
      transform: 'translate(-50%, -50%) rotate(8deg)',
    } }),

    z({ top: '5%', style: { height: '16%' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: nfs, color: P.accent, lineHeight: 1 } },
        d.factNumber,
      ),
    ),

    z({ top: '24%', bottom: '50%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: hfs, color: toa(P), lineHeight: 1.05, margin: 0, textTransform: 'uppercase' } },
        d.factHeading,
      ),
    ),

    z({ top: '62%', bottom: '22%' },
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 45, color: P.muted1, lineHeight: 1.5, margin: 0 } },
        d.factBody,
      ),
    ),

    z({ top: '80%', bottom: '8%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: P.muted1, fontStyle: 'italic', lineHeight: 1.45 } },
        d.storyCliff2,
      ),
    ),

    z({ top: '94%', bottom: '1%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, opacity: 0.4, letterSpacing: 14, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

// ─── Story 3 — Post CTA ───────────────────────────────────────────────────────

function s3_straight_accent70(d, P) {
  const fs = ctaTitleFont(d.postTitle)
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '70%', backgroundColor: P.accent } }),

    z({ top: '8%', style: { height: '5%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: moa(P), letterSpacing: 14, textTransform: 'uppercase' } },
        "Today's post",
      ),
    ),

    z({ top: '16%', bottom: '34%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.postTitle,
      ),
    ),

    z({ top: '76%', bottom: '4%' },
      h('span', { style: { fontFamily: 'Anton', fontSize: 99, color: P.accent, display: 'block', marginBottom: 36 } },
        'See Full Post →',
      ),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, letterSpacing: 9, textTransform: 'uppercase' } },
        '@the.goodgut.guide',
      ),
    ),
  )
}

function s3_diag_band(d, P) {
  const fs = ctaTitleFont(d.postTitle)
  return root(P.bg1,
    h('div', { style: {
      position: 'absolute', top: '30%', left: '50%',
      width: '180%', height: '44%',
      backgroundColor: P.accent,
      transform: 'translate(-50%, -50%) rotate(-10deg)',
    } }),

    z({ top: '6%', style: { height: '5%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, letterSpacing: 14, textTransform: 'uppercase' } },
        "Today's post",
      ),
    ),

    z({ top: '14%', bottom: '50%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.postTitle,
      ),
    ),

    z({ top: '72%', bottom: '4%' },
      h('span', { style: { fontFamily: 'Anton', fontSize: 99, color: P.accent, display: 'block', marginBottom: 36 } },
        'See Full Post →',
      ),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, letterSpacing: 9, textTransform: 'uppercase' } },
        '@the.goodgut.guide',
      ),
    ),
  )
}

function s3_straight_darkBottom(d, P) {
  const fs = ctaTitleFont(d.postTitle)
  return root(P.accent,
    // Dark strip covers bottom 35%
    h('div', { style: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', backgroundColor: P.bg1 } }),

    z({ top: '6%', style: { height: '5%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: moa(P), letterSpacing: 14, textTransform: 'uppercase' } },
        "Today's post",
      ),
    ),

    z({ top: '14%', bottom: '42%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.postTitle,
      ),
    ),

    // CTA sits inside the dark bottom strip
    z({ top: '72%', bottom: '4%' },
      h('span', { style: { fontFamily: 'Anton', fontSize: 99, color: P.accent, display: 'block', marginBottom: 36 } },
        'See Full Post →',
      ),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, letterSpacing: 9, textTransform: 'uppercase' } },
        '@the.goodgut.guide',
      ),
    ),
  )
}

// ─── Story 4 — Engagement (blank sticker zone) ───────────────────────────────

// A — Poll background: accent top 38%, question on accent, empty dark zone for sticker
function s4_poll(d, P) {
  const fs = engageFont(d.pollQuestion)
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '38%', backgroundColor: P.accent } }),

    z({ top: '3%', style: { height: '4%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: toa(P), opacity: 0.5, letterSpacing: 14, textTransform: 'uppercase' } },
        'Quick poll',
      ),
    ),

    z({ top: '9%', bottom: '64%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: toa(P), lineHeight: 0.98, margin: 0, textTransform: 'uppercase' } },
        d.pollQuestion,
      ),
    ),

    // Empty zone 44%–82% for IG poll sticker

    z({ top: '88%', bottom: '2%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, opacity: 0.5, letterSpacing: 9, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

// B — This or That: diagonal split, question top-left, empty center for sticker
function s4_thisOrThat(d, P) {
  const fs = engageFont(d.thisOrThatQ)
  return root(P.bg1,
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: P.accent, clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 40% 0)' } }),

    z({ top: '3%', style: { height: '4%', right: '40%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, letterSpacing: 14, textTransform: 'uppercase' } },
        'This or that',
      ),
    ),

    z({ top: '10%', bottom: '66%', right: '30%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: P.text1, lineHeight: 0.98, margin: 0, textTransform: 'uppercase' } },
        d.thisOrThatQ,
      ),
    ),

    // Empty zone 40%–82% for IG quiz/poll sticker

    z({ top: '88%', bottom: '2%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: toa(P), opacity: 0.4, letterSpacing: 9, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

// C — Hot Take: diagonal band, statement above, empty zone for slider sticker
function s4_hotTake(d, P) {
  const fs = engageFont(d.hotTake)
  return root(P.bg1,
    h('div', { style: {
      position: 'absolute', top: '22%', left: '50%',
      width: '180%', height: '28%',
      backgroundColor: P.accent,
      transform: 'translate(-50%, -50%) rotate(-8deg)',
    } }),

    z({ top: '3%', style: { height: '4%' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 41, color: P.accent, letterSpacing: 14, textTransform: 'uppercase' } },
        'Hot take',
      ),
    ),

    z({ top: '10%', bottom: '62%' },
      h('h2', { style: { fontFamily: 'Anton', fontSize: fs, color: toa(P), lineHeight: 0.98, margin: 0, textTransform: 'uppercase' } },
        d.hotTake,
      ),
    ),

    // Empty zone 44%–82% for IG slider/question sticker

    z({ top: '88%', bottom: '2%' },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 36, color: P.muted1, opacity: 0.5, letterSpacing: 9, textTransform: 'uppercase' } },
        'the.goodgut.guide',
      ),
    ),
  )
}

// ─── Layout arrays ────────────────────────────────────────────────────────────

const s1Layouts = [s1_straight_top65, s1_diag_band, s1_straight_leftBar]
const s2Layouts = [s2_diag_vertical, s2_straight_band, s2_diag_band]
const s3Layouts = [s3_straight_accent70, s3_diag_band, s3_straight_darkBottom]
const s4Layouts = [s4_poll, s4_thisOrThat, s4_hotTake]

// ─── Exports ──────────────────────────────────────────────────────────────────

export function renderStory1(d, P, layoutSeed = 0) { return s1Layouts[layoutSeed % 3](d, P) }
export function renderStory2(d, P, layoutSeed = 0) { return s2Layouts[layoutSeed % 3](d, P) }
export function renderStory3(d, P, layoutSeed = 0) { return s3Layouts[layoutSeed % 3](d, P) }
export function renderStory4(d, P, layoutSeed = 0) { return s4Layouts[layoutSeed % 3](d, P) }

export { makePalette }
