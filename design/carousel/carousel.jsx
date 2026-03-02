import { useState } from "react";

const p = {
    bg1: "#0D0D0D",
    bg2: "#F0F0E8",
    accent: "#CCFF00",
    accentOnLight: "#B8E600",
    text1: "#F0F0E8",
    text2: "#0D0D0D",
    muted1: "#666",
    muted2: "#888",
};

// ═══════════════════════════════════════════════════
// SLIDE 1 — HOOK
// ═══════════════════════════════════════════════════
function Slide1() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg1, position: "relative", overflow: "hidden" }}>
            {/* Accent block right */}
            <div style={{ position: "absolute", top: "12%", right: 0, width: "32%", height: "65%", background: p.accent }} />

            {/* Vertical branding on accent */}
            <div style={{ position: "absolute", top: "15%", right: "8%", transform: "rotate(-90deg)", transformOrigin: "right top", zIndex: 2 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.bg1, letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    the.goodgut.guide
                </span>
            </div>

            {/* Title bottom left */}
            <div style={{ position: "absolute", bottom: 28, left: 22, right: "36%", zIndex: 1 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: p.accent, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Your body is talking
                </span>
                <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 44, fontWeight: 400, color: p.text1, lineHeight: 0.92, margin: 0, textTransform: "uppercase" }}>
                    Are You Listen&shy;ing?
                </h1>
            </div>

            {/* Open loop top left */}
            <span style={{ position: "absolute", top: 22, left: 22, fontFamily: "'Space Mono', monospace", fontSize: 10, color: p.muted1 }}>
                5 signs · #3 will surprise you
            </span>

            {/* Arrow */}
            <span style={{ position: "absolute", bottom: 28, right: 22, fontFamily: "'Anton', sans-serif", fontSize: 20, color: p.bg1, zIndex: 3 }}>→</span>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 2 — "01" top-left, cliffhanger in bottom color strip
// ═══════════════════════════════════════════════════
function Slide2() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg2, position: "relative", overflow: "hidden" }}>
            {/* Number */}
            <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 72,
                color: p.accentOnLight,
                position: "absolute",
                top: 20,
                left: 22,
                lineHeight: 1,
            }}>01</span>

            {/* Content right-aligned */}
            <div style={{ position: "absolute", bottom: 52, left: 22, right: 22 }}>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, color: p.text2, lineHeight: 1.05, margin: "0 0 10px 0", textTransform: "uppercase", textAlign: "right" }}>
                    That Bloat{"\n"}Isn't Normal
                </h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.55, color: p.muted2, margin: 0, textAlign: "right" }}>
                    You carry 2kg of bacteria in your gut right now. When the wrong strains dominate, they ferment every meal into gas. That "food baby" is a bacterial mutiny.
                </p>
            </div>

            {/* Bottom color strip with cliffhanger */}
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 32, background: p.text2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", boxSizing: "border-box" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.bg2, fontStyle: "italic" }}>
                    The next sign is written on your face
                </span>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 14, color: p.accent }}>→</span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 3 — "02" accent field left, grid-aligned number
// ═══════════════════════════════════════════════════
function Slide3() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg1, position: "relative", overflow: "hidden" }}>
            {/* Accent zone left */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "18%", height: "100%", background: p.accent }} />

            {/* Content */}
            <div style={{ position: "absolute", top: 28, left: "24%", right: 22, bottom: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 64,
                    color: p.accent,
                    lineHeight: 1,
                    marginBottom: 6,
                }}>02</span>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: p.text1, lineHeight: 1.05, margin: "0 0 14px 0", textTransform: "uppercase" }}>
                    Your Face Is Your Gut's Billboard
                </h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.6, color: p.muted1, margin: 0 }}>
                    A 2018 study found acne patients had 10× less bacterial diversity than clear-skinned controls. Every breakout is a message from 8 meters below your skin.
                </p>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.muted1, fontStyle: "italic", marginTop: "auto" }}>
                    But the next sign is the strangest →
                </span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 4 — PATTERN BREAK (tilted accent plane)
// ═══════════════════════════════════════════════════
function Slide4() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg1, position: "relative", overflow: "hidden" }}>
            {/* Tilted accent plane */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "140%",
                height: "55%",
                background: p.accent,
                transform: "translate(-50%, -50%) rotate(-8deg)",
            }} />

            {/* Straight text */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
                textAlign: "center",
                zIndex: 2,
                padding: "0 30px",
            }}>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 46, color: p.bg1, lineHeight: 0.95, margin: 0, textTransform: "uppercase" }}>
                    Your Cravings{"\n"}Aren't Yours
                </h2>
            </div>

            {/* Bottom */}
            <div style={{ position: "absolute", bottom: 18, left: 22, right: 22, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.muted1 }}>
                    They belong to your bacteria
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.muted1 }}>→</span>
            </div>

            <span style={{ position: "absolute", top: 18, right: 22, fontFamily: "'Anton', sans-serif", fontSize: 16, color: p.muted1, zIndex: 2 }}>03</span>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 5 — "03" content top, number bottom-right
// ═══════════════════════════════════════════════════
function Slide5() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg2, position: "relative", overflow: "hidden" }}>
            {/* Content top */}
            <div style={{ position: "absolute", top: 22, left: 22, right: 22 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: p.accentOnLight, letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    ↓ Save this one
                </span>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, color: p.text2, lineHeight: 1.05, margin: "0 0 14px 0", textTransform: "uppercase" }}>
                    Bacteria Hack Your Brain To Get Sugar
                </h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.6, color: p.muted2, margin: 0 }}>
                    Candida yeast and Prevotella bacteria produce neurotransmitters that trigger sugar cravings. They're farming you for glucose. That 3pm sweet tooth? A chemical hijack.
                </p>
            </div>

            {/* Number bottom right */}
            <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 72,
                color: p.accentOnLight,
                position: "absolute",
                bottom: 16,
                right: 22,
                lineHeight: 1,
            }}>03</span>

            {/* Bottom accent strip */}
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 6, background: p.text2 }} />
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 6 — "04" diagonal clip + cliffhanger strip
// ═══════════════════════════════════════════════════
function Slide6() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg1, position: "relative", overflow: "hidden" }}>
            {/* Diagonal accent clip */}
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: p.accent,
                clipPath: "polygon(100% 0, 100% 100%, 58% 100%)",
                opacity: 0.15,
            }} />

            {/* Number top right */}
            <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 64,
                color: p.accent,
                position: "absolute",
                top: 16,
                right: 22,
                lineHeight: 1,
            }}>04</span>

            {/* Content mid-left */}
            <div style={{ position: "absolute", top: "38%", left: 40, right: "28%" }}>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, color: p.text1, lineHeight: 1.08, margin: "0 0 12px 0", textTransform: "uppercase" }}>
                    Always Sick? Blame Your Gut
                </h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.6, color: p.muted1, margin: 0 }}>
                    70% of your immune cells live in your intestinal wall. Low gut diversity = 3× more respiratory infections per year.
                </p>
            </div>

            {/* Bottom color strip with cliffhanger */}
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 34, background: p.text1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", boxSizing: "border-box" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: p.bg1, fontStyle: "italic" }}>
                    The last sign connects everything
                </span>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 14, color: p.accent }}>→</span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 7 — "05" top accent strip, clean stack
// ═══════════════════════════════════════════════════
function Slide7() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.bg1, position: "relative", overflow: "hidden" }}>
            {/* Top accent strip */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 6, background: p.accent }} />

            {/* Content */}
            <div style={{ position: "absolute", top: 28, left: 22, right: 22, bottom: 22, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 52, color: p.accent, lineHeight: 1, marginBottom: 10 }}>05</span>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, color: p.text1, lineHeight: 1.05, margin: "0 0 14px 0", textTransform: "uppercase" }}>
                    95% Of Your Happiness Is Made In Your Gut
                </h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.6, color: p.muted1, margin: 0 }}>
                    Your gut produces more serotonin than your brain ever will. A 2019 Caltech study found germ-free mice had 60% less serotonin. Mood swings, anxiety, brain fog — it all starts in your intestines.
                </p>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// SLIDE 8 — CTA (tilted dark triangle on accent)
// ═══════════════════════════════════════════════════
function Slide8() {
    return (
        <div style={{ width: "100%", height: "100%", background: p.accent, position: "relative", overflow: "hidden" }}>
            {/* Tilted dark triangle */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: p.bg1,
                clipPath: "polygon(0 0, 40% 0, 0 100%)",
            }} />

            {/* Top summary on accent */}
            <div style={{ position: "absolute", top: 22, right: 22, left: "44%", zIndex: 2 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 7.5, color: p.bg1, letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.8, display: "block" }}>
                    Bloating · Skin · Cravings{"\n"}Immunity · Mood
                </span>
            </div>

            {/* CTA center */}
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", textAlign: "center", zIndex: 2, padding: "0 24px" }}>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 56, color: p.bg1, lineHeight: 0.9, margin: 0, textTransform: "uppercase" }}>
                    Fix{"\n"}This.
                </h2>
            </div>

            {/* Bottom on dark triangle */}
            <div style={{ position: "absolute", bottom: 20, left: 22, zIndex: 2 }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 14, color: p.accent, display: "block" }}>
                    @the.goodgut.guide
                </span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: p.text1, opacity: 0.5, letterSpacing: 2, textTransform: "uppercase" }}>
                    Follow · Save · Share
                </span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════

const comps = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

const labels = [
    "Hook · Accent field right",
    "01 · Bottom color strip cliffhanger",
    "02 · Accent field left",
    "⚡ Break · Tilted accent plane",
    "03 · Partial bottom strip",
    "04 · Diagonal clip + bottom strip",
    "05 · Top accent strip",
    "CTA · Dark triangle on accent",
];

export default function App() {
    const [current, setCurrent] = useState(0);
    const Comp = comps[current];

    return (
        <div style={{ minHeight: "100vh", background: "#070707", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 16px" }}>
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#444", letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>
                Acid Minimal · Color blocks, no dividers
            </span>
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>
                the.goodgut.guide
            </span>

            {/* Frame */}
            <div style={{ width: 380, height: 380, overflow: "hidden", position: "relative" }}>
                <Comp />
            </div>

            {/* Label */}
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#444", marginTop: 10, letterSpacing: 1, textAlign: "center" }}>
                {String(current + 1).padStart(2, "0")}/{String(8).padStart(2, "0")} — {labels[current]}
            </span>

            {/* Dots */}
            <div style={{ display: "flex", gap: 3, marginTop: 10 }}>
                {labels.map((l, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                        style={{
                            width: current === i ? 24 : l.includes("⚡") ? 14 : 10,
                            height: 3,
                            background: current === i ? p.accent : l.includes("⚡") ? p.accent + "50" : "#333",
                            border: "none", cursor: "pointer", transition: "all 0.2s", padding: 0,
                        }} />
                ))}
            </div>

            {/* Nav */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, background: "none", color: current === 0 ? "#222" : "#aaa", border: `1px solid ${current === 0 ? "#222" : "#555"}`, padding: "7px 18px", cursor: current === 0 ? "default" : "pointer", textTransform: "uppercase", letterSpacing: 1 }}>←</button>
                <button onClick={() => setCurrent(Math.min(7, current + 1))} disabled={current === 7}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, background: current === 7 ? "none" : p.accent, color: current === 7 ? "#222" : p.bg1, border: `1px solid ${current === 7 ? "#222" : p.accent}`, padding: "7px 18px", cursor: current === 7 ? "default" : "pointer", textTransform: "uppercase", letterSpacing: 1 }}>→</button>
            </div>
        </div>
    );
}