import { useState } from "react";

const BASE = {
    bg1: "#0D0D0D",
    bg2: "#F0F0E8",
    text1: "#F0F0E8",
    text2: "#0D0D0D",
    muted1: "#666",
    muted2: "#888",
};

const accents = {
    acid: { name: "Acid", accent: "#CCFF00", accentOnLight: "#B8E600" },
    electric: { name: "Electric", accent: "#4DEEEA", accentOnLight: "#2AACAA" },
    klein: { name: "Klein", accent: "#1845FF", accentOnLight: "#1238CC" },
    violet: { name: "Violet", accent: "#CF6BFF", accentOnLight: "#A84FD4" },
    fuchsia: { name: "Fuchsia", accent: "#FF2D95", accentOnLight: "#D42479" },
};

function getP(k) { return { ...BASE, ...accents[k] }; }
function toa(P) { return P.accent === "#1845FF" ? P.text1 : P.bg1; }
function moa(P) { return P.accent === "#1845FF" ? "rgba(240,240,232,0.5)" : "rgba(13,13,13,0.5)"; }

function Z({ top, bottom, left, right, children, style }) {
    return (
        <div style={{
            position: "absolute",
            top, bottom: bottom || "auto",
            left: left || 22, right: right || 22,
            overflow: "hidden", zIndex: 2,
            ...style,
        }}>{children}</div>
    );
}

function hookFont(text) {
    const lines = text.split("\n").length;
    const maxLen = Math.max(...text.split("\n").map(l => l.length));
    if (lines >= 6 || maxLen > 18) return 22;
    if (lines >= 5 || maxLen > 15) return 26;
    if (lines >= 4) return 30;
    return 36;
}
function headFont(text) {
    if (text.length > 45) return 18;
    if (text.length > 35) return 22;
    if (text.length > 25) return 24;
    return 28;
}
function numFont() { return 40; }

function ctaTitleFont(text) {
    const lines = text.split("\n").length;
    if (lines > 3) return 24;
    if (lines > 2) return 28;
    return 34;
}
function engageFont(text) {
    if (text.length > 50) return 22;
    if (text.length > 35) return 26;
    return 30;
}


// ═══════════════════════════════════════════════════════════
//  STORY 1 — HOOK TEASER
// ═══════════════════════════════════════════════════════════

function s1_straight_top65(d, P) {
    const fs = hookFont(d.storyHook);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "65%", background: P.accent }} />
            <Z top="3%" style={{ height: "5%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: toa(P), opacity: 0.5, letterSpacing: 3, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
            <Z top="10%" bottom="38%">
                <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, fontWeight: 400, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.storyHook}</h1>
            </Z>
            <Z top="70%" bottom="12%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5 }}>{d.storyCliffToPost}</span>
            </Z>
            <Z top="92%" bottom="2%">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.accent, textTransform: "uppercase", letterSpacing: 2 }}>New post ↓</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: P.accent }}>→</span>
                </div>
            </Z>
        </div>
    );
}

function s1_diag_band(d, P) {
    const fs = hookFont(d.storyHook);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "34%", left: "50%",
                width: "180%", height: "52%",
                background: P.accent,
                transform: "translate(-50%, -50%) rotate(-12deg)",
            }} />
            <Z top="3%" style={{ height: "5%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.accent, opacity: 0.6, letterSpacing: 3, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
            <Z top="12%" bottom="42%">
                <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, fontWeight: 400, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.storyHook}</h1>
            </Z>
            <Z top="72%" bottom="12%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5 }}>{d.storyCliffToPost}</span>
            </Z>
            <Z top="92%" bottom="2%">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.accent, textTransform: "uppercase", letterSpacing: 2 }}>New post ↓</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: P.accent }}>→</span>
                </div>
            </Z>
        </div>
    );
}

function s1_straight_leftBar(d, P) {
    const fs = hookFont(d.storyHook);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "24%", height: "100%", background: P.accent }} />
            <Z top="6%" bottom="44%" left="30%">
                <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, fontWeight: 400, color: P.text1, lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.storyHook}</h1>
            </Z>
            <Z top="60%" bottom="18%" left="30%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5 }}>{d.storyCliffToPost}</span>
            </Z>
            <Z top="88%" bottom="2%" left="30%">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.accent, textTransform: "uppercase", letterSpacing: 2 }}>New post ↓</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: P.accent }}>→</span>
                </div>
            </Z>
            <div style={{ position: "absolute", bottom: "8%", left: "5%", transform: "rotate(-90deg)", transformOrigin: "left bottom", zIndex: 2 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: toa(P), opacity: 0.5, letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>the.goodgut.guide</span>
            </div>
        </div>
    );
}

const s1Layouts = [s1_straight_top65, s1_diag_band, s1_straight_leftBar];
const s1Names = ["Straight · Top 65%", "Diagonal · Band", "Straight · Left bar"];


// ═══════════════════════════════════════════════════════════
//  STORY 2 — MICRO-FACT (number = same size as heading)
// ═══════════════════════════════════════════════════════════

function s2_diag_vertical(d, P) {
    const hfs = headFont(d.factHeading);
    const nfs = numFont();
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: P.accent, clipPath: "polygon(0 0, 42% 0, 30% 100%, 0 100%)" }} />
            <Z top="6%" left={14} style={{ height: "12%", right: "64%" }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: nfs, color: toa(P), lineHeight: 1 }}>{d.factNumber}</span>
            </Z>
            <Z top="8%" bottom="66%" left="44%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: hfs, color: P.text1, lineHeight: 1.05, margin: 0, textTransform: "uppercase" }}>{d.factHeading}</h2>
            </Z>
            <Z top="38%" bottom="38%" left="36%">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5, margin: 0 }}>{d.factBody}</p>
            </Z>
            <Z top="68%" bottom="14%" left="36%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.muted1, fontStyle: "italic", lineHeight: 1.45 }}>{d.storyCliff2}</span>
            </Z>
            <div style={{ position: "absolute", bottom: "10%", left: "4%", transform: "rotate(-90deg)", transformOrigin: "left bottom", zIndex: 2 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: toa(P), opacity: 0.4, letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>the.goodgut.guide</span>
            </div>
        </div>
    );
}

function s2_straight_band(d, P) {
    const hfs = headFont(d.factHeading);
    const nfs = numFont();
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "26%", left: 0, width: "100%", height: "28%", background: P.accent }} />
            <Z top="5%" style={{ height: "16%" }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: nfs, color: P.accent, lineHeight: 1 }}>{d.factNumber}</span>
            </Z>
            <Z top="27%" bottom="46%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: hfs, color: toa(P), lineHeight: 1.05, margin: 0, textTransform: "uppercase" }}>{d.factHeading}</h2>
            </Z>
            <Z top="60%" bottom="22%">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5, margin: 0 }}>{d.factBody}</p>
            </Z>
            <Z top="80%" bottom="8%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.muted1, fontStyle: "italic", lineHeight: 1.45 }}>{d.storyCliff2}</span>
            </Z>
            <Z top="94%" bottom="1%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, opacity: 0.4, letterSpacing: 3, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
        </div>
    );
}

function s2_diag_band(d, P) {
    const hfs = headFont(d.factHeading);
    const nfs = numFont();
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "40%", left: "50%",
                width: "180%", height: "34%",
                background: P.accent,
                transform: "translate(-50%, -50%) rotate(8deg)",
            }} />
            <Z top="5%" style={{ height: "16%" }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: nfs, color: P.accent, lineHeight: 1 }}>{d.factNumber}</span>
            </Z>
            <Z top="24%" bottom="50%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: hfs, color: toa(P), lineHeight: 1.05, margin: 0, textTransform: "uppercase" }}>{d.factHeading}</h2>
            </Z>
            <Z top="62%" bottom="22%">
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted1, lineHeight: 1.5, margin: 0 }}>{d.factBody}</p>
            </Z>
            <Z top="80%" bottom="8%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.muted1, fontStyle: "italic", lineHeight: 1.45 }}>{d.storyCliff2}</span>
            </Z>
            <Z top="94%" bottom="1%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, opacity: 0.4, letterSpacing: 3, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
        </div>
    );
}

const s2Layouts = [s2_diag_vertical, s2_straight_band, s2_diag_band];
const s2Names = ["Diagonal · Vertical", "Straight · Band", "Diagonal · Band"];


// ═══════════════════════════════════════════════════════════
//  STORY 3 — POST CTA
// ═══════════════════════════════════════════════════════════

function s3_straight_accent70(d, P) {
    const fs = ctaTitleFont(d.postTitle);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "70%", background: P.accent }} />
            <Z top="8%" style={{ height: "5%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: moa(P), letterSpacing: 3, textTransform: "uppercase" }}>Today's post</span>
            </Z>
            <Z top="16%" bottom="34%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.postTitle}</h2>
            </Z>
            <Z top="76%" bottom="4%">
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: P.accent, display: "block", marginBottom: 8 }}>See Full Post →</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, letterSpacing: 2, textTransform: "uppercase" }}>@the.goodgut.guide</span>
            </Z>
        </div>
    );
}

function s3_diag_band(d, P) {
    const fs = ctaTitleFont(d.postTitle);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "30%", left: "50%",
                width: "180%", height: "44%",
                background: P.accent,
                transform: "translate(-50%, -50%) rotate(-10deg)",
            }} />
            <Z top="6%" style={{ height: "5%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, letterSpacing: 3, textTransform: "uppercase" }}>Today's post</span>
            </Z>
            <Z top="14%" bottom="50%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.postTitle}</h2>
            </Z>
            <Z top="72%" bottom="4%">
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: P.accent, display: "block", marginBottom: 8 }}>See Full Post →</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, letterSpacing: 2, textTransform: "uppercase" }}>@the.goodgut.guide</span>
            </Z>
        </div>
    );
}

function s3_straight_darkBottom(d, P) {
    const fs = ctaTitleFont(d.postTitle);
    return (
        <div style={{ width: "100%", height: "100%", background: P.accent, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "35%", background: P.bg1 }} />
            <Z top="6%" style={{ height: "5%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: moa(P), letterSpacing: 3, textTransform: "uppercase" }}>Today's post</span>
            </Z>
            <Z top="14%" bottom="42%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: toa(P), lineHeight: 0.95, margin: 0, textTransform: "uppercase", whiteSpace: "pre-line" }}>{d.postTitle}</h2>
            </Z>
            <Z top="72%" bottom="4%">
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: P.accent, display: "block", marginBottom: 8 }}>See Full Post →</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, letterSpacing: 2, textTransform: "uppercase" }}>@the.goodgut.guide</span>
            </Z>
        </div>
    );
}

const s3Layouts = [s3_straight_accent70, s3_diag_band, s3_straight_darkBottom];
const s3Names = ["Straight · Accent 70%", "Diagonal · Band", "Straight · Dark bottom"];


// ═══════════════════════════════════════════════════════════
//  STORY 4 — ENGAGEMENT (background only, empty sticker zone)
// ═══════════════════════════════════════════════════════════

// A — POLL: Accent top 38%, question on accent, empty dark below for sticker
function s4_poll(d, P) {
    const fs = engageFont(d.pollQuestion);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "38%", background: P.accent }} />
            <Z top="3%" style={{ height: "4%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: toa(P), opacity: 0.5, letterSpacing: 3, textTransform: "uppercase" }}>Quick poll</span>
            </Z>
            <Z top="9%" bottom="64%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: toa(P), lineHeight: 0.98, margin: 0, textTransform: "uppercase" }}>{d.pollQuestion}</h2>
            </Z>
            {/* Empty space 44%-82% for IG poll sticker */}
            <Z top="88%" bottom="2%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, opacity: 0.5, letterSpacing: 2, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
        </div>
    );
}

// B — THIS OR THAT: Diagonal split, question in dark top-left, empty center for sticker
function s4_thisOrThat(d, P) {
    const fs = engageFont(d.thisOrThatQ);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: P.accent, clipPath: "polygon(100% 0, 100% 100%, 0 100%, 40% 0)" }} />
            <Z top="3%" style={{ height: "4%", right: "40%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, letterSpacing: 3, textTransform: "uppercase" }}>This or that</span>
            </Z>
            <Z top="10%" bottom="66%" right="30%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: P.text1, lineHeight: 0.98, margin: 0, textTransform: "uppercase" }}>{d.thisOrThatQ}</h2>
            </Z>
            {/* Empty space 40%-82% for IG quiz/poll sticker */}
            <Z top="88%" bottom="2%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: toa(P), opacity: 0.4, letterSpacing: 2, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
        </div>
    );
}

// C — HOT TAKE: Diagonal band top with statement, empty below for slider sticker
function s4_hotTake(d, P) {
    const fs = engageFont(d.hotTake);
    return (
        <div style={{ width: "100%", height: "100%", background: P.bg1, position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "22%", left: "50%",
                width: "180%", height: "28%",
                background: P.accent,
                transform: "translate(-50%, -50%) rotate(-8deg)",
            }} />
            <Z top="3%" style={{ height: "4%" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.accent, letterSpacing: 3, textTransform: "uppercase" }}>Hot take</span>
            </Z>
            <Z top="10%" bottom="62%">
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: fs, color: toa(P), lineHeight: 0.98, margin: 0, textTransform: "uppercase" }}>{d.hotTake}</h2>
            </Z>
            {/* Empty space 44%-82% for IG slider/question sticker */}
            <Z top="88%" bottom="2%">
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: P.muted1, opacity: 0.5, letterSpacing: 2, textTransform: "uppercase" }}>the.goodgut.guide</span>
            </Z>
        </div>
    );
}

const s4Layouts = [s4_poll, s4_thisOrThat, s4_hotTake];
const s4Names = ["Poll bg", "This or That bg", "Hot Take bg"];


// ═══════════════════════════════════════════════════════════
//  CONTENT
// ═══════════════════════════════════════════════════════════

const stories = [
    {
        accentKey: "acid", layoutSeed: 0,
        storyHook: "Did You\nKnow You\nHave 2kg Of\nBacteria\nInside You?",
        storyCliffToPost: "5 of them are screaming right now.\nWe counted the signs.",
        factNumber: "95%", factHeading: "Of Your Serotonin Is Made In Your Gut",
        factBody: "Not your brain. Your intestines are a happiness factory — or a depression machine.",
        storyCliff2: "4 more signs your gut is broken →",
        postTitle: "5 Signs\nYour Gut Is\nWarning You",
        pollQuestion: "Which Surprised You More?",
        thisOrThatQ: "Fix Your Gut With Food Or Supplements?",
        hotTake: "Probiotics Are A Waste Of Money For 90% Of People",
    },
    {
        accentKey: "electric", layoutSeed: 1,
        storyHook: "You Ate\nSomething\nToday That's\nKilling Your\nGut Flora",
        storyCliffToPost: "It's in your fridge.\nWe named all 5.",
        factNumber: "50%", factHeading: "Of Gut Bacteria Killed In 24 Hours",
        factBody: "One can of diet soda. You thought it was the healthy choice.",
        storyCliff2: "4 more foods are just as bad →",
        postTitle: "5 Foods\nDestroying\nYour Gut",
        pollQuestion: "Do You Drink Diet Soda?",
        thisOrThatQ: "Kombucha Every Day Or Kefir Every Day?",
        hotTake: "\"Healthy\" Granola Bars Are Worse Than Candy",
    },
    {
        accentKey: "klein", layoutSeed: 2,
        storyHook: "Your Brain\nDoesn't Make\nDecisions.\nYour Gut Does.",
        storyCliffToPost: "500 million neurons.\nMore than your spinal cord.",
        factNumber: "80%", factHeading: "Of Signals Go Gut To Brain",
        factBody: "The vagus nerve is a one-way highway — upward.",
        storyCliff2: "Your personality might be microbial →",
        postTitle: "Your Gut\nControls\nYour Brain",
        pollQuestion: "Did You Know Your Gut Has Its Own Nervous System?",
        thisOrThatQ: "Trust Your Gut Feeling Or Brain Logic?",
        hotTake: "Your Gut Feeling Is Literally Bacteria Talking",
    },
    {
        accentKey: "violet", layoutSeed: 0,
        storyHook: "One Course\nOf Antibiotics.\n90% Of Your\nGut. Gone.",
        storyCliffToPost: "Recovery takes 2 years.\nSome strains never return.",
        factNumber: "3×", factHeading: "Obesity Risk For Kids On Early Antibiotics",
        factBody: "3 courses before age 2. Finnish study. 12,000 kids.",
        storyCliff2: "You can rebuild. Today's post shows how →",
        postTitle: "What\nAntibiotics\nDo To You",
        pollQuestion: "How Often Do You Take Antibiotics?",
        thisOrThatQ: "Finish The Course Or Stop When Better?",
        hotTake: "Doctors Prescribe Antibiotics Way Too Casually",
    },
    {
        accentKey: "fuchsia", layoutSeed: 1,
        storyHook: "Your Gut\nMakes 400×\nMore Melatonin\nThan Your\nBrain",
        storyCliffToPost: "When your microbiome breaks,\nsleep goes first.",
        factNumber: "42%", factHeading: "Better Sleep In Just 14 Days",
        factBody: "30 different plants per week. One study. Two weeks.",
        storyCliff2: "Full gut-sleep protocol in today's post →",
        postTitle: "Why You\nCan't Sleep\nAnymore",
        pollQuestion: "What's Your Biggest Sleep Problem?",
        thisOrThatQ: "Melatonin Pill Or Fix Your Gut?",
        hotTake: "Melatonin Supplements Make Sleep Worse Long Term",
    },
];


// ═══════════════════════════════════════════════════════════
//  UI
// ═══════════════════════════════════════════════════════════

const accentKeys = ["acid", "electric", "klein", "violet", "fuchsia"];
const pubTitles = ["Gut Signs", "Gut Foods", "Gut Brain", "Antibiotics", "Sleep"];
const storyLabels = ["Hook", "Fact", "CTA", "Engage"];
const allLayouts = [s1Layouts, s2Layouts, s3Layouts, s4Layouts];
const allNames = [s1Names, s2Names, s3Names, s4Names];

export default function App() {
    const [pubIdx, setPubIdx] = useState(0);
    const [storyIdx, setStoryIdx] = useState(0);
    const [layoutOverride, setLayoutOverride] = useState(null);

    const d = stories[pubIdx];
    const P = getP(d.accentKey);
    const li = layoutOverride !== null ? layoutOverride : d.layoutSeed;
    const layouts = allLayouts[storyIdx];
    const names = allNames[storyIdx];

    return (
        <div style={{ minHeight: "100vh", background: "#070707", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 16px" }}>
            <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#444", letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>
                Stories v9 · Number 40px · Clean sticker zones
            </span>
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#fff", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
                the.goodgut.guide
            </span>

            <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {pubTitles.map((t, i) => (
                    <button key={i} onClick={() => { setPubIdx(i); setStoryIdx(0); setLayoutOverride(null); }}
                        style={{
                            fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, padding: "4px 8px", cursor: "pointer",
                            border: pubIdx === i ? `2px solid ${accents[accentKeys[i]].accent}` : "1px solid #333",
                            background: pubIdx === i ? accents[accentKeys[i]].accent + "18" : "transparent",
                            color: pubIdx === i ? accents[accentKeys[i]].accent : "#555",
                            textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 4,
                        }}>
                        <div style={{ width: 6, height: 6, background: accents[accentKeys[i]].accent }} />
                        {t}
                    </button>
                ))}
            </div>

            <div style={{ display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {names.map((n, v) => (
                    <button key={v} onClick={() => setLayoutOverride(v)}
                        style={{
                            fontFamily: "'Space Mono', monospace", fontSize: 7, padding: "3px 7px", cursor: "pointer",
                            border: (li % 3) === v ? `1px solid ${P.accent}` : "1px solid #333",
                            background: (li % 3) === v ? P.accent + "18" : "transparent",
                            color: (li % 3) === v ? P.accent : "#555",
                            textTransform: "uppercase", letterSpacing: 1,
                        }}>{n}</button>
                ))}
            </div>

            <div style={{ width: 240, height: 426, overflow: "hidden", position: "relative", border: "1px solid #222" }}>
                {layouts[li % 3](d, P)}
            </div>

            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#444", marginTop: 8, letterSpacing: 1, textAlign: "center" }}>
                {storyIdx + 1}/4 — {storyLabels[storyIdx]} · {names[li % 3]}
            </span>

            <div style={{ display: "flex", gap: 4, marginTop: 6, alignItems: "center" }}>
                {storyLabels.map((label, i) => (
                    <button key={i} onClick={() => { setStoryIdx(i); setLayoutOverride(null); }}
                        style={{
                            width: storyIdx === i ? 28 : i === 3 ? 16 : 12,
                            height: 3,
                            background: storyIdx === i ? P.accent : i === 3 ? P.accent + "40" : "#333",
                            border: "none", cursor: "pointer", transition: "all 0.2s", padding: 0,
                        }} />
                ))}
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, color: "#333", marginLeft: 4 }}>
                    {storyIdx === 3 ? "3-4×/WEEK" : ""}
                </span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={() => { setStoryIdx(Math.max(0, storyIdx - 1)); setLayoutOverride(null); }} disabled={storyIdx === 0}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, background: "none", color: storyIdx === 0 ? "#222" : "#aaa", border: `1px solid ${storyIdx === 0 ? "#222" : "#555"}`, padding: "6px 16px", cursor: storyIdx === 0 ? "default" : "pointer", textTransform: "uppercase", letterSpacing: 1 }}>←</button>
                <button onClick={() => { setStoryIdx(Math.min(3, storyIdx + 1)); setLayoutOverride(null); }} disabled={storyIdx === 3}
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, background: storyIdx === 3 ? "none" : P.accent, color: storyIdx === 3 ? "#222" : BASE.bg1, border: `1px solid ${storyIdx === 3 ? "#222" : P.accent}`, padding: "6px 16px", cursor: storyIdx === 3 ? "default" : "pointer", textTransform: "uppercase", letterSpacing: 1 }}>→</button>
            </div>
        </div>
    );
}