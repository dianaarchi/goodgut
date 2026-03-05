/**
 * Carousel render templates — React.createElement equivalents of design/carousel/carousel.jsx
 * Production canvas: 1080×1080 (design preview was 380×380, scale ≈ ×2.84)
 *
 * Each renderSlideN(d, P) function returns a React element tree for Satori.
 * d = content data object, P = palette from makePalette()
 */

import { createElement as h } from 'react'

// ─── Palette ─────────────────────────────────────────────────────────────────

const ACCENTS = {
  acid:     { hex: '#CCFF00', onLight: '#B8E600' },
  electric: { hex: '#4DEEEA', onLight: '#2AACAA' },
  klein:    { hex: '#1845FF', onLight: '#1238CC' },
  violet:   { hex: '#CF6BFF', onLight: '#A84FD4' },
  fuchsia:  { hex: '#FF2D95', onLight: '#D42479' },
}

export function makePalette(accentKey = 'acid') {
  const a = ACCENTS[accentKey] ?? ACCENTS.acid
  return {
    accentKey,
    bg1:          '#0D0D0D',
    bg2:          '#F0F0E8',
    accent:       a.hex,
    accentOnLight: a.onLight,
    text1:        '#F0F0E8',  // light — use on dark bg1
    text2:        '#0D0D0D',  // dark  — use on light bg2
    muted1:       '#666',
    muted2:       '#888',
  }
}

// ─── Root wrapper ─────────────────────────────────────────────────────────────

function root(bg, ...children) {
  return h('div', {
    style: {
      width: 1080, height: 1080,
      display: 'flex', flexDirection: 'column',
      backgroundColor: bg,
      position: 'relative',
      overflow: 'hidden',
    },
  }, ...children)
}

// ─── Slide 1 — Hook (dark, accent block right) ────────────────────────────────

export function renderSlide1(d, P, bgImageUri = null) {
  // ── Image variant: full-bleed woodcut composited on accent bg ─────────────
  if (bgImageUri) {
    return root(P.accent,
      // Full-bleed composited woodcut (multiply: white→accent, ink stays black)
      h('div', { style: {
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
        backgroundImage: `url(${bgImageUri})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } }),

      // Vertical branding top-right (white — readable on both ink and accent)
      h('div', { style: { position: 'absolute', top: '15%', right: 0, width: '32%',
                          display: 'flex', transform: 'rotate(-90deg)', transformOrigin: 'right top' } },
        h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.text1,
                              letterSpacing: 9, textTransform: 'uppercase', whiteSpace: 'nowrap' } },
          'the.goodgut.guide',
        ),
      ),

      // Teaser top-left (white)
      h('span', { style: { position: 'absolute', top: 62, left: 62, fontFamily: 'Space Mono',
                            fontSize: 28, color: P.text1 } },
        d.hookTeaser,
      ),

      // Eyebrow + title bottom-left — all white
      h('div', { style: { position: 'absolute', bottom: 80, left: 62, right: '10%',
                          display: 'flex', flexDirection: 'column' } },
        h('span', { style: { fontFamily: 'Space Mono', fontSize: 23, color: P.text1,
                              letterSpacing: 11, textTransform: 'uppercase', marginBottom: 28 } },
          d.hookEyebrow,
        ),
        h('h1', { style: { fontFamily: 'Anton', fontSize: 125, fontWeight: 400, color: P.text1,
                            lineHeight: 0.92, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
          d.hookTitle,
        ),
      ),

      // Arrow (white)
      h('span', { style: { position: 'absolute', bottom: 80, right: 62,
                            fontFamily: 'Anton', fontSize: 57, color: P.text1 } }, '→'),
    )
  }

  // ── Standard variant (no image) ───────────────────────────────────────────
  return root(P.bg1,
    // Accent block right
    h('div', { style: { position: 'absolute', top: '12%', right: 0, width: '32%', height: '65%', backgroundColor: P.accent } }),

    // Vertical branding on accent
    h('div', { style: { position: 'absolute', top: '15%', right: '8%', display: 'flex', transform: 'rotate(-90deg)', transformOrigin: 'right top' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.bg1, letterSpacing: 9, textTransform: 'uppercase', whiteSpace: 'nowrap' } },
        'the.goodgut.guide',
      ),
    ),

    // Teaser top-left
    h('span', { style: { position: 'absolute', top: 62, left: 62, fontFamily: 'Space Mono', fontSize: 28, color: P.muted1 } },
      d.hookTeaser,
    ),

    // Eyebrow + title bottom-left
    h('div', { style: { position: 'absolute', bottom: 80, left: 62, right: '36%', display: 'flex', flexDirection: 'column' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 23, color: P.accent, letterSpacing: 11, textTransform: 'uppercase', marginBottom: 28 } },
        d.hookEyebrow,
      ),
      h('h1', { style: { fontFamily: 'Anton', fontSize: 125, fontWeight: 400, color: P.text1, lineHeight: 0.92, margin: 0, textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.hookTitle,
      ),
    ),

    // Arrow (on dark area, use text1 so it's visible)
    h('span', { style: { position: 'absolute', bottom: 80, right: 62, fontFamily: 'Anton', fontSize: 57, color: P.text1 } }, '→'),
  )
}

// ─── Slide 2 — Topic 01 (light, bottom dark strip with cliffhanger) ───────────

export function renderSlide2(d, P) {
  return root(P.bg2,
    // Large ghost number top-right
    h('span', { style: { position: 'absolute', top: 28, right: 40, fontFamily: 'Anton', fontSize: 205, color: P.text2, opacity: 0.08, lineHeight: 1 } },
      '01',
    ),

    // Content
    h('div', { style: { position: 'absolute', bottom: 91, left: 62, right: 62, display: 'flex', flexDirection: 'column' } },
      h('h2', { style: { fontFamily: 'Anton', fontSize: 88, color: P.text2, lineHeight: 1.0, margin: '0 0 34px 0', textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.topic01.heading,
      ),
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 31, lineHeight: 1.55, color: P.muted2, margin: 0 } },
        d.topic01.body,
      ),
    ),

    // Bottom dark strip with cliffhanger
    h('div', { style: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: 91, backgroundColor: P.bg1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 62px', boxSizing: 'border-box' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.bg2, fontStyle: 'italic' } },
        d.topic01.cliffhanger,
      ),
      h('span', { style: { fontFamily: 'Anton', fontSize: 40, color: P.accent } }, '→'),
    ),
  )
}

// ─── Slide 3 — Topic 02 (dark, left accent bar) ───────────────────────────────

export function renderSlide3(d, P) {
  return root(P.bg1,
    // Left accent bar
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: 17, height: '100%', backgroundColor: P.accent } }),

    // Ghost number top-right
    h('span', { style: { position: 'absolute', top: 28, right: 40, fontFamily: 'Anton', fontSize: 182, color: P.text1, opacity: 0.06, lineHeight: 1 } },
      '02',
    ),

    // Content
    h('div', { style: { position: 'absolute', top: 80, left: 80, right: 62, bottom: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: 182, color: P.accent, lineHeight: 1, marginBottom: 17 } }, '02'),
      h('h2', { style: { fontFamily: 'Anton', fontSize: 80, color: P.text1, lineHeight: 1.05, margin: '0 0 40px 0', textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.topic02.heading,
      ),
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 31, lineHeight: 1.6, color: P.muted1, margin: 0 } },
        d.topic02.body,
      ),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.muted1, fontStyle: 'italic', marginTop: 28 } },
        d.topic02.cliffhanger,
      ),
    ),
  )
}

// ─── Slide 4 — Pattern break (dark, tilted accent plane) ─────────────────────

export function renderSlide4(d, P) {
  return root(P.bg1,
    // Tilted accent plane (wide, centered, rotated)
    h('div', { style: {
      position: 'absolute',
      top: '50%', left: '50%',
      width: '140%', height: '55%',
      backgroundColor: P.accent,
      transform: 'translate(-50%, -50%) rotate(-8deg)',
    } }),

    // Number top-right
    h('span', { style: { position: 'absolute', top: 51, right: 62, fontFamily: 'Anton', fontSize: 148, color: P.muted1, lineHeight: 1 } }, '03'),

    // Centered text (on top of tilted plane)
    h('div', { style: {
      position: 'absolute',
      top: '50%', left: 0, right: 0,
      transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '0 85px',
    } },
      h('h2', { style: { fontFamily: 'Anton', fontSize: 131, color: P.bg1, lineHeight: 0.95, margin: 0, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'pre-line' } },
        d.topic03break.title,
      ),
    ),

    // Subtitle bottom
    h('div', { style: { position: 'absolute', bottom: 51, left: 62, right: 62, display: 'flex', justifyContent: 'space-between' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.muted1 } }, d.topic03break.subtitle),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.muted1 } }, '→'),
    ),
  )
}

// ─── Slide 5 — Topic 03 detail (light, number bottom-right) ──────────────────

export function renderSlide5(d, P) {
  return root(P.bg2,
    // Content top
    h('div', { style: { position: 'absolute', top: 62, left: 62, right: 62, display: 'flex', flexDirection: 'column' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 23, color: P.accentOnLight, letterSpacing: 9, textTransform: 'uppercase', marginBottom: 23 } },
        d.topic03detail.eyebrow,
      ),
      h('h2', { style: { fontFamily: 'Anton', fontSize: 80, color: P.text2, lineHeight: 1.05, margin: '0 0 40px 0', textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.topic03detail.heading,
      ),
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 31, lineHeight: 1.6, color: P.muted2, margin: 0 } },
        d.topic03detail.body,
      ),
    ),

    // Ghost number bottom-right
    h('span', { style: { position: 'absolute', bottom: 28, right: 40, fontFamily: 'Anton', fontSize: 205, color: P.accentOnLight, opacity: 0.18, lineHeight: 1 } },
      '03',
    ),

    // Thin accent strip at bottom
    h('div', { style: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: 17, backgroundColor: P.text2 } }),
  )
}

// ─── Slide 6 — Topic 04 (dark, diagonal ghost + bottom light strip) ───────────

export function renderSlide6(d, P) {
  return root(P.bg1,
    // Diagonal ghost — low opacity rotated div (approximates clip-path triangle)
    h('div', { style: {
      position: 'absolute',
      top: '20%', right: '-20%',
      width: '90%', height: '90%',
      backgroundColor: P.bg2,
      opacity: 0.06,
      transform: 'rotate(30deg)',
    } }),

    // Number top-right
    h('span', { style: { position: 'absolute', top: 45, right: 62, fontFamily: 'Anton', fontSize: 182, color: P.accent, opacity: 0.15, lineHeight: 1 } },
      '04',
    ),

    // Content mid-left
    h('div', { style: { position: 'absolute', top: '35%', left: 114, right: '20%', display: 'flex', flexDirection: 'column' } },
      h('h2', { style: { fontFamily: 'Anton', fontSize: 74, color: P.text1, lineHeight: 1.08, margin: '0 0 34px 0', textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.topic04.heading,
      ),
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 31, lineHeight: 1.6, color: P.muted1, margin: 0 } },
        d.topic04.body,
      ),
    ),

    // Bottom light strip with cliffhanger
    h('div', { style: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: 97, backgroundColor: P.text1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 62px', boxSizing: 'border-box' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 26, color: P.bg1, fontStyle: 'italic' } },
        d.topic04.cliffhanger,
      ),
      h('span', { style: { fontFamily: 'Anton', fontSize: 40, color: P.accent } }, '→'),
    ),
  )
}

// ─── Slide 7 — Topic 05 (dark, thin top accent strip) ────────────────────────

export function renderSlide7(d, P) {
  return root(P.bg1,
    // Top accent strip
    h('div', { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: 17, backgroundColor: P.accent } }),

    // Content centered
    h('div', { style: { position: 'absolute', top: 62, left: 62, right: 62, bottom: 62, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: 148, color: P.accent, lineHeight: 1, marginBottom: 28 } }, '05'),
      h('h2', { style: { fontFamily: 'Anton', fontSize: 80, color: P.text1, lineHeight: 1.05, margin: '0 0 40px 0', textTransform: 'uppercase', whiteSpace: 'pre-line' } },
        d.topic05.heading,
      ),
      h('p', { style: { fontFamily: 'Space Mono', fontSize: 31, lineHeight: 1.6, color: P.muted1, margin: 0 } },
        d.topic05.body,
      ),
    ),
  )
}

// ─── Slide 8 — CTA (accent bg, dark triangle top-left) ───────────────────────

export function renderSlide8(d, P) {
  // Dark triangle: polygon(0 0, 40% 0, 0 100%) — use CSS border trick
  // borderTop creates the vertical leg, borderRight creates the hypotenuse
  const triangleStyle = {
    position: 'absolute', top: 0, left: 0,
    width: 0, height: 0,
    borderStyle: 'solid',
    borderTopWidth: 1080,
    borderTopColor: P.bg1,
    borderRightWidth: 432,   // 40% of 1080
    borderRightColor: 'transparent',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  }

  return root(P.accent,
    // Dark triangle
    h('div', { style: triangleStyle }),

    // Summary tags top-right
    h('div', { style: { position: 'absolute', top: 62, right: 62, left: '44%', display: 'flex' } },
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 21, color: P.bg1, letterSpacing: 4, textTransform: 'uppercase', lineHeight: 1.8, whiteSpace: 'pre-line' } },
        d.ctaSummary,
      ),
    ),

    // Big CTA centered
    h('div', { style: {
      position: 'absolute',
      top: '50%', left: 0, right: 0,
      transform: 'translateY(-50%)',
      display: 'flex', justifyContent: 'center',
      padding: '0 68px',
    } },
      h('h2', { style: { fontFamily: 'Anton', fontSize: 159, color: P.bg1, lineHeight: 0.9, margin: 0, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'pre-line' } },
        'Fix\nThis.',
      ),
    ),

    // Handle + follow CTA bottom-left
    h('div', { style: { position: 'absolute', bottom: 57, left: 62, display: 'flex', flexDirection: 'column' } },
      h('span', { style: { fontFamily: 'Anton', fontSize: 40, color: P.bg1 } }, '@the.goodgut.guide'),
      h('span', { style: { fontFamily: 'Space Mono', fontSize: 23, color: P.bg1, opacity: 0.5, letterSpacing: 6, textTransform: 'uppercase', marginTop: 8 } },
        'Follow · Save · Share',
      ),
    ),
  )
}
