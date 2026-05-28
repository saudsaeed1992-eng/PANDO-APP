"use client";
import { useState } from "react";

const GOLD = "#F5C518";
const DARK_BG = "#0a0b0e";
const CARD_BG = "#111318";
const CARD2 = "#161b22";
const BORDER = "#1f2937";
const BLUE = "#3b82f6";
const GREEN = "#22c55e";
const RED = "#ef4444";
const ORANGE = "#f97316";
const PURPLE = "#a855f7";

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0a0b0e 0%,#0d1117 40%,#111827 100%)",
    fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
    color: "#fff",
  },
  header: {
    background: "linear-gradient(180deg,#0a0b0e 0%,rgba(10,11,14,0.95) 100%)",
    borderBottom: "1px solid #1f2937",
    padding: "48px 24px 40px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute", top: "-60px", left: "50%",
    transform: "translateX(-50%)", width: "400px", height: "200px",
    background: "radial-gradient(ellipse,rgba(245,197,24,0.12) 0%,transparent 70%)",
    pointerEvents: "none",
  },
  title: {
    fontSize: "clamp(36px,7vw,64px)", fontWeight: "800", letterSpacing: "-1px",
    background: "linear-gradient(135deg,#F5C518 0%,#fff 60%,#F5C518 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", margin: "0 0 12px", lineHeight: 1.1,
  },
  subtitle: { fontSize: "clamp(14px,2.5vw,18px)", color: "#9ca3af", fontWeight: "400", letterSpacing: "2px", textTransform: "uppercase", margin: 0 },
  badge: {
    display: "inline-block", marginTop: "20px", padding: "8px 20px",
    background: "linear-gradient(135deg,rgba(245,197,24,0.15),rgba(245,197,24,0.05))",
    border: "1px solid rgba(245,197,24,0.3)", borderRadius: "100px",
    fontSize: "12px", color: GOLD, fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase",
  },
  wrap: { maxWidth: "1100px", margin: "0 auto", padding: "32px 16px 80px" },
  secTitle: {
    fontSize: "clamp(20px,4vw,28px)", fontWeight: "700", color: "#fff",
    marginBottom: "20px", marginTop: "48px",
    display: "flex", alignItems: "center", gap: "12px",
  },
  accent: {
    width: "4px", height: "28px",
    background: "linear-gradient(180deg,#F5C518,transparent)",
    borderRadius: "2px", flexShrink: 0,
  },
  card: {
    background: CARD_BG, border: "1px solid #1f2937", borderRadius: "16px",
    padding: "24px", marginBottom: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px" },
  input: {
    width: "100%", background: CARD2, border: "1px solid #1f2937",
    borderRadius: "10px", padding: "12px 16px", color: "#fff", fontSize: "16px",
    outline: "none", boxSizing: "border-box", marginTop: "8px",
  },
  label: { fontSize: "12px", color: "#9ca3af", fontWeight: "600", letterSpacing: "0.5px", textTransform: "uppercase", display: "block" },
  pBar: { height: "8px", borderRadius: "100px", background: CARD2, overflow: "hidden", marginTop: "8px" },
  warnCard: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "14px", padding: "20px 24px", marginBottom: "16px",
  },
  goldCard: {
    background: "linear-gradient(135deg,rgba(245,197,24,0.08),rgba(245,197,24,0.03))",
    border: "1px solid rgba(245,197,24,0.2)", borderRadius: "16px",
    padding: "24px", marginBottom: "16px",
  },
  btn: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "10px 20px", borderRadius: "10px", border: "none",
    cursor: "pointer", fontSize: "13px", fontWeight: "600",
    textDecoration: "none", transition: "all 0.2s",
  },
  btnBlue: { background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff" },
  btnGold: { background: "linear-gradient(135deg,#F5C518,#d97706)", color: "#000" },
  mealCard: {
    background: CARD_BG, border: "1px solid #1f2937", borderRadius: "16px",
    padding: "24px", marginBottom: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  },
  macroRow: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px", marginBottom: "12px" },
  quoteCard: {
    background: "linear-gradient(135deg,rgba(59,130,246,0.08),rgba(245,197,24,0.04))",
    border: "1px solid rgba(59,130,246,0.2)", borderRadius: "16px",
    padding: "28px", marginBottom: "16px", textAlign: "center",
  },
  accHdr: {
    width: "100%", background: "none", border: "none",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    cursor: "pointer", padding: 0, color: "#fff", fontSize: "16px", fontWeight: "600",
  },
  tag: {
    display: "inline-block", padding: "3px 10px", borderRadius: "6px",
    fontSize: "11px", fontWeight: "700",
    background: "rgba(245,197,24,0.12)", color: GOLD,
    border: "1px solid rgba(245,197,24,0.2)", marginRight: "6px", marginBottom: "4px",
    textTransform: "uppercase", letterSpacing: "0.5px",
  },
};

function macroBadge(color, text) {
  return (
    <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", background: color + "20", color, border: "1px solid " + color + "40" }}>
      {text}
    </span>
  );
}

function ProgressBar({ label, current, target, unit, color }) {
  const pct = target > 0 ? Math.max(0, (current / target) * 100) : 0;
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={s.label}>{label}</span>
        <span style={{ fontSize: "13px", color: pct >= 100 ? GREEN : "#9ca3af", fontWeight: "600" }}>
          {current || 0} / {target} {unit}{" "}
          <span style={{ color: pct >= 100 ? GREEN : GOLD }}>{Math.round(pct)}%</span>
        </span>
      </div>
      <div style={s.pBar}>
        <div style={{ height: "100%", width: Math.min(pct, 100) + "%", borderRadius: "100px", background: color, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

// ─── VERIFIED YOUTUBE LINKS ──────────────────────────────────────────────────
// Cardio (fixed, every session):
const BIKE_URL = "https://www.youtube.com/watch?v=YeHSHwBXbAU";        // 10 MIN BEGINNER INDOOR CYCLE - Sunny Health
const ELLIP_URL = "https://www.youtube.com/watch?v=t9KVWTROVb0";       // Beginner Elliptical 10 Min Pyramid - Sunny Trainer Dana
const TREAD_URL = "https://www.youtube.com/watch?v=yWLJhLKywW0";       // 20 Min Fat-Burning Incline Treadmill Walk Follow-Along

// Chest-focus:
const CHEST_FAT_URL = "https://www.youtube.com/watch?v=xLnsx4AYExs";   // How To Lose Chest Fat – 8 Best Dumbbell Exercises
const CHEST_BENCH_URL = "https://www.youtube.com/watch?v=k6cFGQy7Usw"; // 20 Min Dumbbell Chest Workout Build & Burn
const CHEST_ADV_URL = "https://www.youtube.com/watch?v=xvv_K1CeEEo";   // 25 Min Dumbbell Complete Chest Workout

// Upper body:
const UPPER_URL = "https://www.youtube.com/watch?v=hT5VD0zdiBc";       // 15 Min Upper Body Dumbbell (Arms,Chest,Back,Shoulders)
const UPPER2_URL = "https://www.youtube.com/watch?v=xxVRCzT2a1E";      // 20 Min Full Upper Body Tone & Sculpt - MadFit

// Core:
const CORE_URL = "https://www.youtube.com/watch?v=eQdX2_k8FIM";        // 10 MIN BEGINNER TOTAL CORE WORKOUT
const CORE2_URL = "https://www.youtube.com/watch?v=yTn4bJ29rrU";       // Abs Abs Abs 10 Min Core – Coach Todd

// Knee:
const KNEE_URL = "https://www.youtube.com/watch?v=cJCikne7iKM";        // 10 Min Knee Strengthening – Jessica Valant PT
const KNEE2_URL = "https://www.youtube.com/watch?v=ysgbSkfGaYY";       // 10 MIN WORKOUT FOR KNEE STRENGTH – do 3x/week
const KNEE_REHAB_URL = "https://www.youtube.com/watch?v=-6W03QOix3M";  // 20 Min Knee Strength Rehab – improve knee pain

// Mobility:
const MOB_URL = "https://www.youtube.com/watch?v=REL4y5a_xF8";         // 30 Min Flexibility + Stretching + Mobility Routine

// Cardio session component shown at top of every day
function CardioBlock() {
  return (
    <div style={{
      background: "linear-gradient(135deg,rgba(59,130,246,0.10),rgba(168,85,247,0.06))",
      border: "1px solid rgba(59,130,246,0.25)", borderRadius: "12px",
      padding: "14px 18px", marginBottom: "12px",
    }}>
      <div style={{ fontSize: "11px", color: BLUE, fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>
        🔥 DAILY CARDIO WARMUP — 40 MIN TOTAL
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <a href={BIKE_URL} target="_blank" rel="noopener noreferrer"
          style={{ ...s.btn, background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)", fontSize: "12px", padding: "7px 14px" }}>
          🚴 10 min Bike ▶
        </a>
        <a href={ELLIP_URL} target="_blank" rel="noopener noreferrer"
          style={{ ...s.btn, background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)", fontSize: "12px", padding: "7px 14px" }}>
          🔄 10 min Elliptical ▶
        </a>
        <a href={TREAD_URL} target="_blank" rel="noopener noreferrer"
          style={{ ...s.btn, background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)", fontSize: "12px", padding: "7px 14px" }}>
          🏃 20 min Incline Walk ▶
        </a>
      </div>
      <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "8px" }}>
        Bike → Elliptical → Incline Treadmill Walk. Click each to follow along.
      </div>
    </div>
  );
}

const workoutWeeks = [
  {
    weeks: "Weeks 1–2", label: "Foundation — Chest Activation + Knee Rehab", color: GREEN,
    summary: "Priority: Learn chest activation with light dumbbells. Start knee strengthening gently. Daily 40-min cardio block every session.",
    days: [
      {
        day: "Mon", focus: "Chest Fat Burn A", emoji: "💪",
        detail: "3×12 Flat Dumbbell Press · 3×12 Dumbbell Flyes · 3×15 Push-ups (knees OK) · 2×12 Incline Press. Full chest squeeze on every rep.",
        link: CHEST_FAT_URL, linkLabel: "Chest Fat – 8 Dumbbell Exercises",
        kneeNote: "No standing movements. All lying/seated.", kneeLink: KNEE_URL,
      },
      {
        day: "Tue", focus: "Knee Strength + Core", emoji: "🦵",
        detail: "10 min knee protocol: Straight leg raises · Glute bridges · Clamshells · Wall sits 30s. Then 10 min core: Dead bugs · Planks · Bird dogs.",
        link: KNEE_URL, linkLabel: "10 Min Knee Strengthening – Physio PT",
        kneeNote: "Zero impact. Physical therapy approach.", kneeLink: KNEE2_URL,
      },
      {
        day: "Wed", focus: "Upper Body (Back & Shoulders)", emoji: "🏋️",
        detail: "3×12 Dumbbell Rows · 3×12 Shoulder Press · 3×12 Lateral Raises · 3×12 Bicep Curls · 3×12 Tricep Extensions.",
        link: UPPER_URL, linkLabel: "15 Min Upper Body – Arms, Back, Shoulders",
        kneeNote: "Seated or standing. Knee neutral.", kneeLink: KNEE_URL,
      },
      {
        day: "Thu", focus: "Chest Fat Burn B", emoji: "🔥",
        detail: "4×12 Dumbbell Press · 4×12 Cable Chest Flyes (cable machine in gym) · 3×15 Narrow Push-ups · 3×12 Pullover. Squeeze & hold top 2s.",
        link: CHEST_BENCH_URL, linkLabel: "20 Min Dumbbell Chest Build & Burn",
        kneeNote: "Bench pressing only. Knee-safe.", kneeLink: KNEE_URL,
      },
      {
        day: "Fri", focus: "Knee Rehab + Core", emoji: "🧘",
        detail: "10 min knee: Terminal knee extensions · Step touches · Seated leg raises. Then 10 min core abs follow-along.",
        link: KNEE2_URL, linkLabel: "10 Min Knee Strength – 3×/week Plan",
        kneeNote: "Dedicated knee day — critical for progression.", kneeLink: KNEE_REHAB_URL,
      },
      {
        day: "Sat", focus: "Full Upper Body Circuit", emoji: "⚡",
        detail: "Giant set ×3: Chest Press + Rows + Shoulder Press + Curls + Triceps. 12 reps each, 90s rest between sets. Total body upper burn.",
        link: UPPER2_URL, linkLabel: "20 Min Full Upper Body Tone & Sculpt",
        kneeNote: "Seated/bench. No knee load.", kneeLink: KNEE_URL,
      },
      {
        day: "Sun", focus: "Active Recovery + Mobility", emoji: "☀️",
        detail: "30 min gentle full-body stretch focusing on hip flexors, chest opener, and IT band. Light walk optional.",
        link: MOB_URL, linkLabel: "30 Min Flexibility & Mobility Routine",
        kneeNote: "Gentle only. No pain.", kneeLink: KNEE_URL,
      },
    ],
  },
  {
    weeks: "Weeks 3–4", label: "Build Phase — Chest Volume + Knee Stability", color: BLUE,
    summary: "Increase chest volume. Add resistance to knee exercises. Cardio pace steps up. Track weekly weight and waist measurements.",
    days: [
      {
        day: "Mon", focus: "Chest Sculpt A (Volume)", emoji: "💪",
        detail: "4×12 Flat DB Press · 4×12 Incline DB Press · 3×15 Chest Flyes · 3×12 Cable Crossover · Push-ups to failure. Increase weight vs W1-2.",
        link: CHEST_BENCH_URL, linkLabel: "20 Min Dumbbell Chest Build & Burn",
        kneeNote: "All bench work. Safe.", kneeLink: KNEE2_URL,
      },
      {
        day: "Tue", focus: "Knee Strength + Core", emoji: "🦵",
        detail: "Knee: Wall squats 3×30s · Terminal extensions · Step-ups (low step, slow) · Clamshells with band if available. Core: Plank series 3×45s.",
        link: KNEE2_URL, linkLabel: "10 Min Knee Strength Workout",
        kneeNote: "No pain zone only. Wall squats max 90°.", kneeLink: KNEE_REHAB_URL,
      },
      {
        day: "Wed", focus: "Back & Shoulder Day", emoji: "🏋️",
        detail: "4×12 Dumbbell Rows · 3×12 Arnold Press · 3×12 Face Pulls (cable) · 3×12 Lateral Raises · Rear delt flyes 3×15.",
        link: UPPER_URL, linkLabel: "15 Min Upper Body – Full Session",
        kneeNote: "Seated throughout.", kneeLink: KNEE_URL,
      },
      {
        day: "Thu", focus: "Chest Sculpt B + Core", emoji: "🔥",
        detail: "Superset ×4: DB Press + Chest Flyes, 12 reps each. Rest 60s. Then 10 min core: Leg raises · Russian twists · Crunches.",
        link: CHEST_FAT_URL, linkLabel: "Chest Fat – 8 Best Dumbbell Exercises",
        kneeNote: "Flat bench. Core on mat.", kneeLink: KNEE_URL,
      },
      {
        day: "Fri", focus: "Knee Rehabilitation", emoji: "🦵",
        detail: "20 min full knee rehabilitation session: VMO activation, straight leg raises, standing terminal knee extension, glute bridge progression.",
        link: KNEE_REHAB_URL, linkLabel: "20 Min Knee Rehab – Strength & Stability",
        kneeNote: "Focus session on knee health.", kneeLink: KNEE2_URL,
      },
      {
        day: "Sat", focus: "Arms + Chest Finisher", emoji: "💥",
        detail: "Bicep curls 4×12 · Hammer curls 3×12 · Tricep dips (bench) 3×12 · Skull crushers 3×12 · Chest push-up drop set to failure.",
        link: UPPER2_URL, linkLabel: "20 Min Full Upper Body – MadFit",
        kneeNote: "Bench dips only. No floor dips.", kneeLink: KNEE_URL,
      },
      {
        day: "Sun", focus: "Mobility + Chest Stretch", emoji: "☀️",
        detail: "Doorway chest stretch · Pec minor release · Full body mobility 30 min. Critical for chest muscle recovery and posture improvement.",
        link: MOB_URL, linkLabel: "30 Min Full Body Stretch & Mobility",
        kneeNote: "Gentle stretching only.", kneeLink: KNEE_URL,
      },
    ],
  },
  {
    weeks: "Weeks 5–6", label: "Intensity Phase — Chest Definition + Knee Power", color: GOLD,
    summary: "Heavier weights, shorter rest. Chest starts showing definition. Knee should feel notably stronger. Increase cardio incline and bike resistance.",
    days: [
      {
        day: "Mon", focus: "Chest Power Day A", emoji: "🏆",
        detail: "5×10 Heavy Flat DB Press · 4×12 Incline DB Press · 4×12 Cable Flyes · 3×15 Push-up variations. Increase weight by 10-15% vs W3-4.",
        link: CHEST_ADV_URL, linkLabel: "25 Min Complete Chest Workout – Build & Burn",
        kneeNote: "Pure bench work. Max chest focus.", kneeLink: KNEE2_URL,
      },
      {
        day: "Tue", focus: "Knee Power + Core", emoji: "🦵",
        detail: "Knee progressions: Shallow split squat 3×10 · Lateral band walks · Terminal knee extensions with band · Step-ups 3×12 each leg.",
        link: KNEE2_URL, linkLabel: "10 Min Knee Strength – Build Strong Knees",
        kneeNote: "Shallow split squat only — NO deep bend.", kneeLink: KNEE_REHAB_URL,
      },
      {
        day: "Wed", focus: "Back Heavy + Shoulders", emoji: "💪",
        detail: "5×10 Heavy DB Rows · 4×12 Overhead Press · 3×12 Upright rows · 3×15 Rear delt flyes · Face pulls 4×15.",
        link: UPPER_URL, linkLabel: "15 Min Upper Body Dumbbell Session",
        kneeNote: "All standing/seated. Knee neutral.", kneeLink: KNEE_URL,
      },
      {
        day: "Thu", focus: "Chest Power Day B + Abs", emoji: "🔥",
        detail: "Drop set chest: 12 reps heavy → reduce weight → 10 more reps (3 rounds). Cable crossover 4×15. 10 min intense abs follow-along.",
        link: CHEST_ADV_URL, linkLabel: "25 Min Complete Chest Workout",
        kneeNote: "Bench press + cable only.", kneeLink: KNEE_URL,
      },
      {
        day: "Fri", focus: "Knee + Full Core Burn", emoji: "🧘",
        detail: "Knee: 20 min full rehabilitation + glute bridge progression. Core: 10 min intense abs. Together = 30 min functional session.",
        link: KNEE_REHAB_URL, linkLabel: "20 Min Knee Strength Rehab Session",
        kneeNote: "Controlled. No sudden movements.", kneeLink: KNEE2_URL,
      },
      {
        day: "Sat", focus: "Full Upper Body Burnout", emoji: "⚡",
        detail: "Giant set ×4 (no rest within set): Chest Press + Rows + Shoulder Press + Curls + Tricep ext. Rest 2 min between giant sets.",
        link: UPPER2_URL, linkLabel: "20 Min Full Upper Body Tone & Sculpt",
        kneeNote: "All seated or bench. Zero knee impact.", kneeLink: KNEE_URL,
      },
      {
        day: "Sun", focus: "Deep Recovery + Posture", emoji: "☀️",
        detail: "Foam roll chest/pecs · Pec stretch · Thoracic extension on bench · Full body 30 min mobility. Posture reset after heavy week.",
        link: MOB_URL, linkLabel: "30 Min Flexibility & Mobility",
        kneeNote: "Zero intensity. Pure recovery.", kneeLink: KNEE_URL,
      },
    ],
  },
  {
    weeks: "Weeks 7–8", label: "Peak Phase — Maximum Chest Burn + Knee Mastery", color: ORANGE,
    summary: "Final push. Heaviest chest weights of the program. Knees should be strong enough for slow controlled squats. Maximum fat burn mode.",
    days: [
      {
        day: "Mon", focus: "Chest Peak Session A", emoji: "🏅",
        detail: "PR attempt: Max weight DB Press 4×8 · Incline press 4×10 · Cable flye 4×15 · Push-ups to failure × 3. Chest should be on fire.",
        link: CHEST_ADV_URL, linkLabel: "25 Min Complete Chest – Peak Workout",
        kneeNote: "Pure bench. No knee involvement.", kneeLink: KNEE2_URL,
      },
      {
        day: "Tue", focus: "Knee Mastery + Core Peak", emoji: "🦵",
        detail: "Advanced knee: Slow controlled squats 3×12 (90° max) · Single leg press on cable low · Step-ups with dumbbell 3×10. 10 min core peak.",
        link: KNEE_REHAB_URL, linkLabel: "20 Min Knee Rehab – Strength Session",
        kneeNote: "Controlled squats ONLY if pain-free.", kneeLink: KNEE2_URL,
      },
      {
        day: "Wed", focus: "Back & Shoulders Peak", emoji: "💪",
        detail: "Heavy week: 5×10 rows · Arnold press 4×10 · Lateral raises 4×15 · Cable face pulls 4×20. Track and beat week 5-6 weights.",
        link: UPPER_URL, linkLabel: "15 Min Upper Body Full Session",
        kneeNote: "Standing/seated only.", kneeLink: KNEE_URL,
      },
      {
        day: "Thu", focus: "Chest Peak Session B", emoji: "🔥",
        detail: "Burnout chest day: 100 total reps chest press (any rep scheme) · 4×15 flyes · Cable crossover 4×15 · Incline push-ups 3×20.",
        link: CHEST_FAT_URL, linkLabel: "Chest Fat Burn – 8 Best Exercises",
        kneeNote: "Bench and cable only.", kneeLink: KNEE_URL,
      },
      {
        day: "Fri", focus: "Full Knee + Core Final", emoji: "🧘",
        detail: "Knee assessment day: All exercises from weeks 1–7 in sequence. See how much stronger you've become. Core 10 min intense finisher.",
        link: KNEE2_URL, linkLabel: "10 Min Knee Strength – Final Test",
        kneeNote: "8-week knee progress check!", kneeLink: KNEE_REHAB_URL,
      },
      {
        day: "Sat", focus: "Ultimate Upper Body Finale", emoji: "🏆",
        detail: "Celebrate 8 weeks! Full upper body — chest, back, shoulders, arms. Max effort. Giant set × 5. Finish strong. You earned it.",
        link: UPPER2_URL, linkLabel: "20 Min Full Upper Body – Final Session",
        kneeNote: "All bench/seated.", kneeLink: KNEE_URL,
      },
      {
        day: "Sun", focus: "Transformation Day 🎉", emoji: "📸",
        detail: "Take progress photos front/side/back! Measure waist, chest, hips. Compare to Day 1. Rest. Celebrate. You transformed your body!",
        link: MOB_URL, linkLabel: "Recovery & Mobility – Reward Yourself",
        kneeNote: "Rest day. You did it.", kneeLink: KNEE_URL,
      },
    ],
  },
];

const meals = [
  {
    type: "🌅 Breakfast", name: "Protein Overnight Oats",
    calories: 420, protein: 32, carbs: 45, fats: 10,
    ingredients: ["80g rolled oats","1 scoop vanilla whey protein","200ml unsweetened almond milk","1 tbsp chia seeds","100g mixed berries","1 tsp honey"],
    instructions: "Mix oats, protein, chia seeds and almond milk in a jar. Refrigerate overnight. Top with berries and honey in the morning. Ready in 5 min prep.",
    videoLink: "https://www.youtube.com/watch?v=NeBf5ewmI0A",
  },
  {
    type: "☀️ Lunch", name: "Grilled Chicken & Roasted Veggies",
    calories: 520, protein: 48, carbs: 35, fats: 14,
    ingredients: ["180g chicken breast","150g sweet potato cubed","100g broccoli florets","1 tbsp olive oil","Garlic, cumin, paprika","Lemon juice"],
    instructions: "Season chicken with spices. Pan-sear 4 min each side until golden. Roast sweet potato and broccoli at 200°C for 20 min with olive oil. Serve with lemon.",
    videoLink: "https://www.youtube.com/watch?v=PbhZCIPL-dU",
  },
  {
    type: "🌙 Dinner", name: "Baked Salmon & Asparagus",
    calories: 480, protein: 42, carbs: 18, fats: 22,
    ingredients: ["200g salmon fillet","1 bunch asparagus","1 tbsp olive oil","2 cloves garlic minced","Dill, salt, pepper","Half lemon sliced"],
    instructions: "Drizzle salmon with olive oil, garlic, dill. Lay lemon slices on top. Asparagus alongside. Bake at 190°C for 18–20 min until salmon flakes easily.",
    videoLink: "https://www.youtube.com/watch?v=Vq_Mc_VT-oo",
  },
  {
    type: "🍎 Snacks (×2/day)", name: "High-Protein Snack Pack",
    calories: 280, protein: 28, carbs: 20, fats: 8,
    ingredients: ["150g Greek yogurt 0% fat","1 medium apple","20g raw almonds","1 hard-boiled egg"],
    instructions: "Prep night before. Morning snack: Greek yogurt + apple. Pre-workout snack: hard-boiled egg + almonds. Simple, fast, high protein.",
    videoLink: "https://www.youtube.com/watch?v=4ihO6Hk5jN8",
  },
];

const quotes = [
  { text: "Every rep you do when you don't want to is the rep that changes your body.", author: "Your Future Self" },
  { text: "You are not starting over. You are starting from experience.", author: "Transformation Truth" },
  { text: "The gym is hard. Being unhealthy is hard. Choose your hard.", author: "Daily Reminder" },
  { text: "Kaius is watching you. Be the father who showed up.", author: "Your Greatest Motivation" },
  { text: "8 weeks from now, you will thank yourself for starting today.", author: "The Plan" },
  { text: "Consistency beats perfection every single time. Show up imperfectly.", author: "Mindset Reset" },
];

function DayRow({ d, weekColor }) {
  return (
    <div style={{
      background: CARD2, border: "1px solid #1f2937", borderRadius: "12px",
      padding: "16px 20px", marginBottom: "10px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ fontSize: "26px", flexShrink: 0, marginTop: "2px" }}>{d.emoji}</div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "6px" }}>
            <span style={{ ...s.tag, background: weekColor + "15", color: weekColor, border: "1px solid " + weekColor + "30" }}>{d.day}</span>
            <span style={{ fontWeight: "700", fontSize: "15px" }}>{d.focus}</span>
          </div>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0 0 4px", lineHeight: "1.6" }}>{d.detail}</p>
          <div style={{ fontSize: "11px", color: "#4ade80", marginBottom: "10px" }}>
            🦵 <em>{d.kneeNote}</em>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={d.link} target="_blank" rel="noopener noreferrer"
              style={{ ...s.btn, ...s.btnBlue, fontSize: "12px", padding: "7px 14px" }}>
              ▶ {d.linkLabel}
            </a>
            <a href={d.kneeLink} target="_blank" rel="noopener noreferrer"
              style={{ ...s.btn, background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)", fontSize: "12px", padding: "7px 14px" }}>
              🦵 Knee Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeekAccordion({ week }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...s.card, padding: "0", overflow: "hidden", marginBottom: "12px" }}>
      <button
        style={{
          ...s.accHdr, padding: "20px 24px",
          background: "linear-gradient(135deg," + week.color + "10,transparent)",
          borderBottom: open ? "1px solid #1f2937" : "none",
        }}
        onClick={() => setOpen(!open)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: week.color, boxShadow: "0 0 10px " + week.color, flexShrink: 0 }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: "700", fontSize: "16px", color: "#fff" }}>{week.weeks}</div>
            <div style={{ fontSize: "12px", color: week.color, fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>{week.label}</div>
          </div>
        </div>
        <span style={{ color: "#9ca3af", fontSize: "20px", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "16px 20px" }}>
          <div style={{ fontSize: "13px", color: "#d1d5db", marginBottom: "14px", padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", lineHeight: "1.6" }}>
            📋 <strong style={{ color: week.color }}>Phase Goal:</strong> {week.summary}
          </div>
          <CardioBlock />
          {week.days.map((d) => (
            <DayRow key={d.day} d={d} weekColor={week.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function MealCard({ meal, index }) {
  const [open, setOpen] = useState(false);
  const colors = [GOLD, BLUE, GREEN, ORANGE];
  const color = colors[index % colors.length];
  return (
    <div style={{ ...s.mealCard, borderTop: "3px solid " + color }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "12px", color, fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{meal.type}</div>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>{meal.name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "28px", fontWeight: "800", color }}>{meal.calories}</div>
          <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: "600" }}>CALORIES</div>
        </div>
      </div>
      <div style={s.macroRow}>
        {macroBadge(BLUE, "🥩 " + meal.protein + "g Protein")}
        {macroBadge(GOLD, "🌾 " + meal.carbs + "g Carbs")}
        {macroBadge(GREEN, "🥑 " + meal.fats + "g Fats")}
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: open ? "16px" : 0 }}>
        <button
          style={{ ...s.btn, background: color + "15", color, border: "1px solid " + color + "30", fontSize: "12px", padding: "8px 16px" }}
          onClick={() => setOpen(!open)}
        >
          {open ? "▲ Hide Recipe" : "▼ View Recipe"}
        </button>
        <a href={meal.videoLink} target="_blank" rel="noopener noreferrer"
          style={{ ...s.btn, ...s.btnBlue, fontSize: "12px", padding: "8px 16px" }}>
          🎬 Watch Cooking Video
        </a>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: "16px", marginTop: "8px" }}>
          <div style={s.grid2}>
            <div>
              <div style={{ fontSize: "12px", color: GOLD, fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Ingredients</div>
              <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#d1d5db", lineHeight: "2", fontSize: "14px" }}>
                {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: BLUE, fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>How to Cook</div>
              <p style={{ color: "#d1d5db", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{meal.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BabeKaius() {
  const [weight, setWeight] = useState("");
  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");

  const startWeight = 115;
  const goalWeight = 100;
  const weightLost = startWeight - (parseFloat(weight) || startWeight);
  const weightGoal = startWeight - goalWeight;
  const weightPct = weightGoal > 0 ? Math.max(0, (weightLost / weightGoal) * 100) : 0;
  const stepsPct = parseFloat(steps) > 0 ? (parseFloat(steps) / 10000) * 100 : 0;
  const waterPct = parseFloat(water) > 0 ? (parseFloat(water) / 3) * 100 : 0;
  const sleepPct = parseFloat(sleep) > 0 ? (parseFloat(sleep) / 8) * 100 : 0;
  const behindSchedule = weight && parseFloat(weight) > startWeight - 1;

  return (
    <div style={s.page}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.glow} />
        <h1 style={s.title}>Babê Kaius</h1>
        <p style={s.subtitle}>2-Month Transformation Dashboard</p>
        <div style={s.badge}>🏆 Week 1 of 8 — The Journey Begins</div>
      </div>

      <div style={s.wrap}>

        {/* LIVE PROGRESS TRACKER */}
        <h2 style={s.secTitle}><div style={s.accent} />📊 Live Progress Tracker</h2>
        <div style={s.grid2}>
          {[
            { label: "Current Weight (kg)", value: weight, set: setWeight, placeholder: "e.g. 115" },
            { label: "Daily Steps", value: steps, set: setSteps, placeholder: "e.g. 8000" },
            { label: "Water Intake (litres)", value: water, set: setWater, placeholder: "e.g. 2.5" },
            { label: "Sleep Hours", value: sleep, set: setSleep, placeholder: "e.g. 7.5" },
          ].map((f) => (
            <div key={f.label} style={s.card}>
              <label style={s.label}>{f.label}</label>
              <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} style={s.input} />
            </div>
          ))}
        </div>

        {behindSchedule && (
          <div style={s.warnCard}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px" }}>⚠️</span>
              <span style={{ fontWeight: "700", color: "#f87171", fontSize: "16px" }}>Weight Loss Behind Schedule</span>
            </div>
            <p style={{ color: "#fca5a5", margin: 0, fontSize: "14px", lineHeight: "1.6" }}>
              Target: 0.5–1 kg/week. Check calorie deficit, increase steps, and ensure you are hitting your cardio block every day. You can do this!
            </p>
          </div>
        )}

        <div style={s.card}>
          <ProgressBar label="⚖️ Weight Goal" current={weightLost.toFixed(1)} target={weightGoal} unit="kg lost" color={"linear-gradient(90deg,#F5C518,#f59e0b)"} />
          <ProgressBar label="👟 Daily Steps" current={parseFloat(steps) || 0} target={10000} unit="steps" color={"linear-gradient(90deg,#3b82f6,#60a5fa)"} />
          <ProgressBar label="💧 Water Intake" current={parseFloat(water) || 0} target={3} unit="L" color={"linear-gradient(90deg,#06b6d4,#22d3ee)"} />
          <ProgressBar label="😴 Sleep Hours" current={parseFloat(sleep) || 0} target={8} unit="hrs" color={"linear-gradient(90deg,#8b5cf6,#a78bfa)"} />
        </div>

        {/* KNEE SAFETY */}
        <h2 style={s.secTitle}><div style={s.accent} />🦵 Knee Safety Protocol</h2>
        <div style={s.warnCard}>
          <div style={{ fontWeight: "700", color: "#f87171", fontSize: "18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>🚨</span> Critical Knee Rules — Read Every Day
          </div>
          <div style={s.grid3}>
            {[
              { icon: "🚫", rule: "NO Deep Squats", detail: "No squat below 90°. Use wall sits and shallow bodyweight squats only." },
              { icon: "🚫", rule: "NO Jumping", detail: "Zero impact. No jump squats, burpees, box jumps or plyometrics." },
              { icon: "🛑", rule: "STOP Sharp Pain", detail: "Mild ache is fine. Sharp or burning knee pain = STOP immediately." },
              { icon: "✅", rule: "Safe: Cycling", detail: "Bike at low-medium resistance. Best knee-strengthening cardio available." },
              { icon: "✅", rule: "Safe: Elliptical", detail: "Gliding motion is zero-impact. Great for fat burn without knee stress." },
              { icon: "✅", rule: "Safe: Incline Walk", detail: "Treadmill at incline burns fat and builds quads — knee-safe at low speed." },
            ].map((item) => (
              <div key={item.rule} style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>{item.icon}</div>
                <div style={{ fontWeight: "700", color: item.icon === "✅" ? GREEN : "#f87171", fontSize: "14px", marginBottom: "6px" }}>{item.rule}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: "1.5" }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DAILY CARDIO STRUCTURE */}
        <h2 style={s.secTitle}><div style={s.accent} />🔥 Daily Cardio Structure (Every Session)</h2>
        <div style={s.goldCard}>
          <div style={{ fontWeight: "700", color: GOLD, fontSize: "16px", marginBottom: "16px" }}>40 Minutes — Fixed Every Training Day</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px", marginBottom: "16px" }}>
            {[
              { icon: "🚴", label: "Step 1 — Bike", time: "10 min", detail: "Medium resistance. Warm up legs, activate cardiovascular system.", color: BLUE, link: BIKE_URL },
              { icon: "🔄", label: "Step 2 — Elliptical", time: "10 min", detail: "Smooth full-body glide. Zero knee impact. Fat-burn zone.", color: PURPLE, link: ELLIP_URL },
              { icon: "🏃", label: "Step 3 — Incline Walk", time: "20 min", detail: "6–10% incline, 4.5–5.5 km/h. Maximum calorie afterburn.", color: GREEN, link: TREAD_URL },
            ].map((step) => (
              <div key={step.label} style={{ background: step.color + "10", border: "1px solid " + step.color + "30", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{step.icon}</div>
                <div style={{ fontWeight: "700", color: step.color, fontSize: "14px" }}>{step.label}</div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", margin: "4px 0" }}>{step.time}</div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px", lineHeight: "1.4" }}>{step.detail}</div>
                <a href={step.link} target="_blank" rel="noopener noreferrer"
                  style={{ ...s.btn, background: step.color + "20", color: step.color, border: "1px solid " + step.color + "40", fontSize: "11px", padding: "6px 12px" }}>
                  ▶ Follow Along
                </a>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "13px", color: "#9ca3af", lineHeight: "1.7", padding: "12px 16px", background: "rgba(245,197,24,0.05)", borderRadius: "10px", border: "1px solid rgba(245,197,24,0.1)" }}>
            <strong style={{ color: GOLD }}>Why this order matters:</strong> Bike first warms the knee joint safely. Elliptical elevates heart rate without impact. Incline walk finishes in the fat-burning zone and directly strengthens the VMO muscle around the knee. This 40-min sequence is your <strong style={{ color: "#fff" }}>chest-fat and visceral-fat furnace</strong> every single day.
          </div>
        </div>

        {/* WORKOUT PLAN */}
        <h2 style={s.secTitle}><div style={s.accent} />🏋️ 8-Week Workout Plan</h2>
        <div style={s.goldCard}>
          <p style={{ margin: 0, color: "#d1d5db", fontSize: "14px", lineHeight: "1.7" }}>
            <strong style={{ color: GOLD }}>Focus #1 — Chest:</strong> Every session targets chest with dumbbell press, flyes, and cable crossovers. Consistent chest work = visible pec definition and reduced chest fat. &nbsp;
            <strong style={{ color: GREEN }}>Focus #2 — Knee:</strong> Dedicated knee strengthening 3×/week using physical therapy protocols. VMO activation, glute bridges, and terminal knee extensions will make your knees bulletproof.
          </p>
        </div>
        {workoutWeeks.map((w) => <WeekAccordion key={w.weeks} week={w} />)}

        {/* FOOD PLAN */}
        <h2 style={s.secTitle}><div style={s.accent} />🍽️ Fat-Loss Meal Plan</h2>
        <div style={s.goldCard}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            {[
              { label: "Daily Calories", value: "1,700", color: GOLD },
              { label: "Daily Protein", value: "150g", color: BLUE },
              { label: "Daily Carbs", value: "118g", color: GREEN },
              { label: "Daily Fats", value: "54g", color: ORANGE },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "center", flex: 1, minWidth: "80px" }}>
                <div style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: "800", color: m.color }}>{m.value}</div>
                <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        {meals.map((meal, i) => <MealCard key={meal.name} meal={meal} index={i} />)}

        {/* MOTIVATION */}
        <h2 style={s.secTitle}><div style={s.accent} />🔥 Motivation & Mindset</h2>
        <div style={s.grid2}>
          {quotes.map((q) => (
            <div key={q.text} style={s.quoteCard}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>💬</div>
              <p style={{ fontSize: "15px", color: "#e5e7eb", lineHeight: "1.7", fontStyle: "italic", margin: "0 0 12px" }}>"{q.text}"</p>
              <div style={{ fontSize: "12px", color: GOLD, fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>— {q.author}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg,rgba(245,197,24,0.12),rgba(59,130,246,0.08))", border: "1px solid rgba(245,197,24,0.25)", borderRadius: "20px", padding: "36px 28px", textAlign: "center", marginTop: "8px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>👑</div>
          <h3 style={{ color: GOLD, fontWeight: "800", fontSize: "22px", margin: "0 0 12px" }}>For Kaius. For You. For The Future.</h3>
          <p style={{ color: "#d1d5db", fontSize: "15px", lineHeight: "1.8", margin: "0 0 20px" }}>
            Every morning you wake up and choose the gym, you are choosing to be present — not just physically, but as a father, a man, a version of yourself that Kaius will be proud of. This is not about looks. This is about energy, health, and being <strong style={{ color: GOLD }}>fully alive</strong> for the people you love.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {["🎯 8 Weeks","🔥 Daily Cardio","💪 Chest Focus","🦵 Knee Safe","🏆 For Kaius"].map((tag) => (
              <span key={tag} style={{ ...s.tag, fontSize: "13px", padding: "6px 16px" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* DAILY NON-NEGOTIABLES */}
        <div style={{ marginTop: "32px" }}>
          <div style={s.card}>
            <div style={{ fontWeight: "700", fontSize: "16px", color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>📋</span> Daily Non-Negotiables
            </div>
            <div style={s.grid3}>
              {[
                { icon: "🚴", text: "10 min bike + 10 min elliptical + 20 min incline walk — every session" },
                { icon: "💪", text: "Chest exercises every Monday & Thursday — no skipping chest day" },
                { icon: "🦵", text: "Knee strengthening exercises Tue, Thu, Fri — protect your joints" },
                { icon: "💧", text: "Drink 3L water — start with 500ml first thing in the morning" },
                { icon: "🥩", text: "Hit 150g protein daily — chicken, salmon, eggs, Greek yogurt" },
                { icon: "😴", text: "Sleep 7–8 hours — fat loss and muscle recovery happen during sleep" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px", background: CARD2, borderRadius: "10px", border: "1px solid #1f2937" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: "13px", color: "#d1d5db", lineHeight: "1.5" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div style={{ textAlign: "center", padding: "24px", borderTop: "1px solid #1f2937", color: "#374151", fontSize: "12px" }}>
        Built for Babê Kaius · 8-Week Transformation · Dubai 2026
      </div>
    </div>
  );
}
