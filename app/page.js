"use client";
import { useState, useEffect } from "react";

/* ── PANDO THEME ─────────────────────────────────────────── */
const C = {
  bg:       "#0f0e0b",
  bg2:      "#161410",
  card:     "#1c1916",
  card2:    "#221f1a",
  border:   "#2e2820",
  border2:  "#3d3528",
  wood:     "#c9933a",
  woodDark: "#a07020",
  woodLight:"#e8b86d",
  latte:    "#d4a96a",
  cream:    "#f0e0c0",
  green:    "#5a8a5a",
  greenLt:  "#7ab87a",
  greenDim: "#3d6b3d",
  sage:     "#8faa7a",
  text:     "#e8dcc8",
  textMid:  "#b8a888",
  textDim:  "#786858",
  red:      "#c0504a",
  blue:     "#5a8aaa",
  amber:    "#d4924a",
};

const F = {
  page: { minHeight:"100vh", background:C.bg, color:C.text,
    fontFamily:"'Georgia','Times New Roman',serif" },
  header: {
    background:`linear-gradient(180deg,${C.bg2} 0%,${C.bg} 100%)`,
    borderBottom:`1px solid ${C.border}`,
    padding:"28px 20px 20px", textAlign:"center", position:"relative",
  },
  headerGlow: {
    position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
    width:"320px",height:"120px",
    background:`radial-gradient(ellipse,rgba(201,147,58,0.12) 0%,transparent 70%)`,
    pointerEvents:"none",
  },
  pill: {
    display:"inline-block", padding:"4px 14px", borderRadius:"100px",
    background:`rgba(201,147,58,0.12)`, border:`1px solid rgba(201,147,58,0.25)`,
    fontSize:"11px", color:C.latte, fontWeight:"600", letterSpacing:"2px",
    textTransform:"uppercase", marginBottom:"12px",
  },
  title: {
    fontSize:"clamp(32px,7vw,52px)", fontWeight:"700",
    background:`linear-gradient(135deg,${C.woodLight} 0%,${C.cream} 55%,${C.wood} 100%)`,
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    backgroundClip:"text", margin:"0 0 6px", letterSpacing:"-0.5px",
    lineHeight:1.1,
  },
  subtitle: { fontSize:"13px", color:C.textMid, letterSpacing:"2.5px",
    textTransform:"uppercase", margin:"0 0 16px" },
  statRow: {
    display:"flex", justifyContent:"center", gap:"24px",
    flexWrap:"wrap", marginTop:"12px",
  },
  statBox: {
    textAlign:"center", padding:"8px 16px",
    background:C.card, border:`1px solid ${C.border}`,
    borderRadius:"10px", minWidth:"70px",
  },
  tabs: {
    display:"flex", borderBottom:`1px solid ${C.border}`,
    background:C.bg2, position:"sticky", top:0, zIndex:100,
    overflowX:"auto",
  },
  tab: (active) => ({
    flex:1, minWidth:"90px", padding:"14px 12px", border:"none",
    background:"none", cursor:"pointer", fontSize:"13px", fontWeight:"600",
    color: active ? C.woodLight : C.textDim,
    borderBottom: active ? `2px solid ${C.wood}` : "2px solid transparent",
    transition:"all 0.2s", letterSpacing:"0.3px",
    whiteSpace:"nowrap",
  }),
  wrap: { maxWidth:"900px", margin:"0 auto", padding:"24px 16px 80px" },
  section: { marginBottom:"8px" },
  sLabel: {
    fontSize:"10px", color:C.textDim, fontWeight:"700",
    letterSpacing:"2px", textTransform:"uppercase", marginBottom:"14px",
    display:"flex", alignItems:"center", gap:"8px",
  },
  sLine: { flex:1, height:"1px", background:C.border },
  card: {
    background:C.card, border:`1px solid ${C.border}`,
    borderRadius:"14px", padding:"20px", marginBottom:"12px",
    boxShadow:"0 2px 12px rgba(0,0,0,0.3)",
  },
  card2: {
    background:C.card2, border:`1px solid ${C.border}`,
    borderRadius:"12px", padding:"16px", marginBottom:"10px",
  },
  woodCard: {
    background:`linear-gradient(135deg,rgba(201,147,58,0.10),rgba(201,147,58,0.04))`,
    border:`1px solid rgba(201,147,58,0.22)`,
    borderRadius:"14px", padding:"20px", marginBottom:"12px",
  },
  greenCard: {
    background:`linear-gradient(135deg,rgba(90,138,90,0.10),rgba(90,138,90,0.03))`,
    border:`1px solid rgba(90,138,90,0.25)`,
    borderRadius:"14px", padding:"20px", marginBottom:"12px",
  },
  redCard: {
    background:"rgba(192,80,74,0.07)", border:"1px solid rgba(192,80,74,0.25)",
    borderRadius:"14px", padding:"20px", marginBottom:"12px",
  },
  grid2: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"12px" },
  grid3: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px" },
  input: {
    width:"100%", background:C.card2, border:`1px solid ${C.border2}`,
    borderRadius:"8px", padding:"10px 14px", color:C.text,
    fontSize:"15px", outline:"none", boxSizing:"border-box", marginTop:"6px",
    fontFamily:"'Georgia','Times New Roman',serif",
  },
  inputLabel: { fontSize:"11px", color:C.textDim, fontWeight:"700",
    letterSpacing:"1px", textTransform:"uppercase", display:"block" },
  pBar: { height:"6px", borderRadius:"100px", background:C.card2, overflow:"hidden", marginTop:"6px" },
  btn: (bg, col, bdr) => ({
    display:"inline-flex", alignItems:"center", gap:"6px",
    padding:"9px 16px", borderRadius:"9px",
    border: bdr || "none", cursor:"pointer",
    fontSize:"12px", fontWeight:"600",
    background: bg, color: col,
    textDecoration:"none", transition:"opacity 0.2s",
    letterSpacing:"0.3px",
  }),
  badge: (col) => ({
    display:"inline-block", padding:"3px 9px", borderRadius:"6px",
    fontSize:"11px", fontWeight:"700",
    background: col+"18", color: col,
    border:`1px solid ${col}35`, marginRight:"5px", marginBottom:"4px",
  }),
};

/* ── VERIFIED YOUTUBE LINKS ─────────────────────────────── */
const YT = {
  bike10:     "https://www.youtube.com/watch?v=YeHSHwBXbAU",  // 10 Min Beginner Indoor Cycle – Sunny Health ✓
  ellip10:    "https://www.youtube.com/watch?v=t9KVWTROVb0",  // Beginner Elliptical 10 Min Pyramid – Sunny Trainer Dana ✓
  incline20:  "https://www.youtube.com/watch?v=yWLJhLKywW0",  // 20 Min Fat-Burning Incline Treadmill Walk Follow-Along ✓
  chestFat:   "https://www.youtube.com/watch?v=xLnsx4AYExs",  // Lose Chest Fat – 8 Best Dumbbell Exercises ✓
  chestBuild: "https://www.youtube.com/watch?v=k6cFGQy7Usw",  // 20 Min Dumbbell Chest Build & Burn ✓
  chestPeak:  "https://www.youtube.com/watch?v=xvv_K1CeEEo",  // 25 Min Complete Chest Workout Build & Burn ✓
  upper15:    "https://www.youtube.com/watch?v=hT5VD0zdiBc",  // 15 Min Upper Body Dumbbell – Arms Chest Back Shoulders ✓
  upper20:    "https://www.youtube.com/watch?v=xxVRCzT2a1E",  // 20 Min Full Upper Body Tone & Sculpt – MadFit ✓
  core10:     "https://www.youtube.com/watch?v=eQdX2_k8FIM",  // 10 Min Beginner Total Core No Equipment ✓
  coreAbs:    "https://www.youtube.com/watch?v=yTn4bJ29rrU",  // Abs Abs Abs 10 Min Core Coach Todd ✓
  knee10:     "https://www.youtube.com/watch?v=cJCikne7iKM",  // 10 Min Knee Strengthening – Jessica Valant PT ✓
  knee3x:     "https://www.youtube.com/watch?v=ysgbSkfGaYY",  // 10 Min Knee Strength – do 3x/week ✓
  kneeRehab:  "https://www.youtube.com/watch?v=-6W03QOix3M",  // 20 Min Knee Strength Rehab ✓
  mobility:   "https://www.youtube.com/watch?v=REL4y5a_xF8",  // 30 Min Flexibility Stretching Mobility ✓
  // FOOD videos
  oats:       "https://www.youtube.com/watch?v=NeBf5ewmI0A",  // Overnight Oats 6 Ways ✓
  chicken:    "https://www.youtube.com/watch?v=PbhZCIPL-dU",  // Best Healthy Chicken Breast Recipes ✓
  salmon:     "https://www.youtube.com/watch?v=Vq_Mc_VT-oo",  // High Protein Salmon Dinner ✓
  snack:      "https://www.youtube.com/watch?v=4ihO6Hk5jN8",  // Healthy Chicken & Veggies ✓
};

/* ── CARDIO BLOCK (fixed every session) ─────────────────── */
function CardioBlock() {
  return (
    <div style={{
      background:`linear-gradient(135deg,rgba(90,138,90,0.10),rgba(201,147,58,0.06))`,
      border:`1px solid rgba(90,138,90,0.28)`, borderRadius:"12px",
      padding:"14px 18px", marginBottom:"14px",
    }}>
      <div style={{ fontSize:"10px", color:C.greenLt, fontWeight:"700",
        letterSpacing:"2px", textTransform:"uppercase", marginBottom:"10px" }}>
        🔥 DAILY CARDIO BLOCK — 40 MIN EVERY SESSION
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"8px" }}>
        {[
          { icon:"🚴", label:"10 min Bike", url:YT.bike10, color:C.blue },
          { icon:"🔄", label:"10 min Elliptical", url:YT.ellip10, color:"#9a7ac8" },
          { icon:"🏔️", label:"20 min Incline Walk", url:YT.incline20, color:C.greenLt },
        ].map(b => (
          <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
            style={F.btn(`${b.color}18`, b.color, `1px solid ${b.color}35`)}>
            {b.icon} {b.label} ▶
          </a>
        ))}
      </div>
      <div style={{ fontSize:"11px", color:C.textDim, lineHeight:"1.5" }}>
        Bike warms the knee joint · Elliptical zero-impact fat burn · Incline walk targets belly &amp; chest fat
      </div>
    </div>
  );
}

/* ── WORKOUT DATA ────────────────────────────────────────── */
const weeks = [
  {
    w:"Weeks 1–2", phase:"Foundation", color:C.greenLt,
    goal:"Learn proper chest activation with light weights. Start knee PT protocol. Build the cardio habit.",
    days:[
      { day:"MON", name:"Chest Fat Burn A", emoji:"💪",
        ex:"Flat DB Press 3×12 · DB Flyes 3×12 · Push-ups 3×15 · Incline DB Press 2×12. Squeeze chest 2s at top.",
        mainUrl:YT.chestFat, mainLabel:"Chest Fat – 8 Dumbbell Exercises",
        kneeUrl:YT.knee10, knee:"All on bench. Zero knee load." },
      { day:"TUE", name:"Knee Rehab + Core", emoji:"🦵",
        ex:"Straight leg raises 3×15 · Glute bridges 3×20 · Clamshells 3×15 · Wall sit 3×30s · Plank 3×30s · Dead bugs 3×12.",
        mainUrl:YT.knee10, mainLabel:"10 Min Knee Strengthening – Physio PT",
        kneeUrl:YT.knee3x, knee:"Pure PT protocol. No pain zone." },
      { day:"WED", name:"Upper Body – Back & Shoulders", emoji:"🏋️",
        ex:"DB Rows 3×12 · Shoulder Press 3×12 · Lateral Raises 3×12 · Bicep Curls 3×12 · Tricep Extensions 3×12.",
        mainUrl:YT.upper15, mainLabel:"15 Min Upper Body – Arms, Back, Shoulders",
        kneeUrl:YT.knee10, knee:"Seated or standing. Knee neutral." },
      { day:"THU", name:"Chest Fat Burn B", emoji:"🔥",
        ex:"DB Press 4×12 · Cable Chest Flyes 3×15 · Narrow Push-ups 3×15 · DB Pullover 3×12. Track weight used.",
        mainUrl:YT.chestBuild, mainLabel:"20 Min Dumbbell Chest Build & Burn",
        kneeUrl:YT.knee10, knee:"Flat bench only. Knee-safe." },
      { day:"FRI", name:"Knee Strength + Core", emoji:"🦵",
        ex:"Terminal knee extensions · Step touches · Seated leg raises 3×15 · Clamshells. Core: plank circuit 3×45s.",
        mainUrl:YT.knee3x, mainLabel:"10 Min Knee Strength – 3×/Week Plan",
        kneeUrl:YT.kneeRehab, knee:"Dedicated knee day — critical." },
      { day:"SAT", name:"Full Upper Circuit", emoji:"⚡",
        ex:"Giant set ×3 (no rest in set): DB Press + Rows + Shoulder Press + Curls + Triceps. 12 reps each, 90s between sets.",
        mainUrl:YT.upper20, mainLabel:"20 Min Full Upper Body – MadFit",
        kneeUrl:YT.knee10, knee:"Bench/seated throughout." },
      { day:"SUN", name:"Active Recovery", emoji:"🌿",
        ex:"30 min full-body stretch: chest opener, hip flexors, IT band, thoracic extension. Light walk optional.",
        mainUrl:YT.mobility, mainLabel:"30 Min Full Flexibility & Mobility",
        kneeUrl:YT.knee10, knee:"Gentle only. Zero pain." },
    ],
  },
  {
    w:"Weeks 3–4", phase:"Build", color:C.wood,
    goal:"Increase chest volume. Add band resistance to knee work. Cardio pace increases. Weekly weigh-in every Monday.",
    days:[
      { day:"MON", name:"Chest Volume A", emoji:"💪",
        ex:"DB Press 4×12 · Incline DB Press 4×12 · Chest Flyes 3×15 · Cable Crossover 3×15 · Push-ups to failure ×3. Beat W1-2 weight.",
        mainUrl:YT.chestBuild, mainLabel:"20 Min Dumbbell Chest Build & Burn",
        kneeUrl:YT.knee3x, knee:"All bench. Safe." },
      { day:"TUE", name:"Knee Build + Core", emoji:"🦵",
        ex:"Wall squats 3×30s (90° max) · Terminal extensions · Step-ups on low step 3×10 · Clamshells with band. Core plank series 3×45s.",
        mainUrl:YT.knee3x, mainLabel:"10 Min Knee Strength – Build Phase",
        kneeUrl:YT.kneeRehab, knee:"Wall squats strictly 90° max." },
      { day:"WED", name:"Back & Shoulder Build", emoji:"🏋️",
        ex:"DB Rows 4×12 · Arnold Press 3×12 · Face Pulls cable 3×15 · Lateral Raises 3×15 · Rear Delt Flyes 3×15.",
        mainUrl:YT.upper15, mainLabel:"15 Min Upper Body Full Session",
        kneeUrl:YT.knee10, knee:"Seated throughout." },
      { day:"THU", name:"Chest Superset B", emoji:"🔥",
        ex:"Superset ×4: DB Press + Chest Flyes — 12 reps each, 60s rest. Then 10 min core: leg raises · Russian twists · crunches.",
        mainUrl:YT.chestFat, mainLabel:"Chest Fat – 8 Best Dumbbell Exercises",
        kneeUrl:YT.knee10, knee:"Flat bench + mat core work." },
      { day:"FRI", name:"Full Knee Rehab", emoji:"🦵",
        ex:"20 min complete knee rehab: VMO activation · straight leg raises · standing terminal extensions · glute bridge progression.",
        mainUrl:YT.kneeRehab, mainLabel:"20 Min Knee Rehab – Strength & Stability",
        kneeUrl:YT.knee3x, knee:"Focus session. Critical week 3-4." },
      { day:"SAT", name:"Arms + Chest Finisher", emoji:"💥",
        ex:"Bicep Curls 4×12 · Hammer Curls 3×12 · Bench Dips 3×12 · Skull Crushers 3×12 · Chest drop set to failure.",
        mainUrl:YT.upper20, mainLabel:"20 Min Full Upper Body – MadFit",
        kneeUrl:YT.knee10, knee:"Bench dips only. No floor dips." },
      { day:"SUN", name:"Chest Stretch + Mobility", emoji:"🌿",
        ex:"Doorway chest stretch 3×60s · Pec minor release · Thoracic extension on bench · Full body 30 min stretch.",
        mainUrl:YT.mobility, mainLabel:"30 Min Full Body Stretch & Mobility",
        kneeUrl:YT.knee10, knee:"Gentle recovery." },
    ],
  },
  {
    w:"Weeks 5–6", phase:"Intensity", color:C.amber,
    goal:"Heavier weights, shorter rest. Chest definition visible. Knee should feel notably stronger. Increase cardio incline & bike resistance.",
    days:[
      { day:"MON", name:"Chest Power A", emoji:"🏆",
        ex:"Heavy DB Press 5×10 · Incline Press 4×12 · Cable Flyes 4×15 · Push-up variations 3×15. Beat W3-4 weight by 10-15%.",
        mainUrl:YT.chestPeak, mainLabel:"25 Min Complete Chest – Build & Burn",
        kneeUrl:YT.knee3x, knee:"Pure bench. Maximum chest." },
      { day:"TUE", name:"Knee Power + Core", emoji:"🦵",
        ex:"Shallow split squat 3×10 · Lateral band walks 3×20 · Terminal extensions w/ band · Step-ups 3×12 each leg. Core intense 10 min.",
        mainUrl:YT.knee3x, mainLabel:"10 Min Knee Strength – Power Phase",
        kneeUrl:YT.kneeRehab, knee:"Shallow split squat ONLY — no deep bend." },
      { day:"WED", name:"Back Heavy Day", emoji:"💪",
        ex:"Heavy DB Rows 5×10 · Overhead Press 4×12 · Upright Rows 3×12 · Rear Delt Flyes 3×15 · Face Pulls 4×15.",
        mainUrl:YT.upper15, mainLabel:"15 Min Upper Body – Heavy Session",
        kneeUrl:YT.knee10, knee:"Standing/seated. Knee neutral." },
      { day:"THU", name:"Chest Power B + Abs", emoji:"🔥",
        ex:"Drop set: 12 reps heavy → reduce weight → 10 more ×3. Cable crossover 4×15. 10 min intense abs follow-along.",
        mainUrl:YT.chestPeak, mainLabel:"25 Min Complete Chest Workout",
        kneeUrl:YT.knee10, knee:"Bench + cable only." },
      { day:"FRI", name:"Knee + Full Core Burn", emoji:"🧘",
        ex:"20 min knee rehab full session + glute bridge progression. Then 10 min core intense abs. 30 min functional total.",
        mainUrl:YT.kneeRehab, mainLabel:"20 Min Knee Strength Rehab",
        kneeUrl:YT.knee3x, knee:"Controlled. No sudden moves." },
      { day:"SAT", name:"Upper Body Burnout", emoji:"⚡",
        ex:"Giant set ×4 no rest: Chest Press + Rows + Shoulder Press + Curls + Triceps. Rest 2 min between giant sets.",
        mainUrl:YT.upper20, mainLabel:"20 Min Full Upper Body Tone & Sculpt",
        kneeUrl:YT.knee10, knee:"All seated or bench." },
      { day:"SUN", name:"Deep Recovery", emoji:"🌿",
        ex:"Foam roll chest & pecs · Pec stretch · Thoracic extension on bench · Full body 30 min mobility. Posture reset.",
        mainUrl:YT.mobility, mainLabel:"30 Min Flexibility & Mobility",
        kneeUrl:YT.knee10, knee:"Zero intensity. Pure recovery." },
    ],
  },
  {
    w:"Weeks 7–8", phase:"Peak", color:C.red,
    goal:"Heaviest weights of the program. Maximum fat burn. Knees strong enough for slow controlled squats. Final push!",
    days:[
      { day:"MON", name:"Chest Peak A — PR Day", emoji:"🏅",
        ex:"Max weight DB Press 4×8 · Incline Press 4×10 · Cable Flyes 4×15 · Push-ups to failure ×3. Chest on fire!",
        mainUrl:YT.chestPeak, mainLabel:"25 Min Complete Chest – Peak Session",
        kneeUrl:YT.knee3x, knee:"Pure bench. No knee." },
      { day:"TUE", name:"Knee Mastery + Core Peak", emoji:"🦵",
        ex:"Controlled squats 3×12 (90° max pain-free only) · Single-leg cable press · Step-ups w/ dumbbell 3×10 · Core 10 min peak.",
        mainUrl:YT.kneeRehab, mainLabel:"20 Min Knee Rehab – Mastery Session",
        kneeUrl:YT.knee3x, knee:"Controlled squats ONLY if pain-free." },
      { day:"WED", name:"Back & Shoulders Peak", emoji:"💪",
        ex:"PR rows 5×10 · Arnold Press 4×10 · Lateral Raises 4×15 · Cable Face Pulls 4×20. Beat W5-6 weights.",
        mainUrl:YT.upper15, mainLabel:"15 Min Upper Body – Peak Session",
        kneeUrl:YT.knee10, knee:"Standing/seated only." },
      { day:"THU", name:"Chest Peak B — Burnout", emoji:"🔥",
        ex:"100 total chest press reps any scheme · Flyes 4×15 · Cable crossover 4×15 · Incline push-ups 3×20.",
        mainUrl:YT.chestFat, mainLabel:"Chest Fat Burn – 8 Best Exercises",
        kneeUrl:YT.knee10, knee:"Bench and cable only." },
      { day:"FRI", name:"Knee Final Test", emoji:"🧘",
        ex:"All knee exercises from weeks 1–7 in sequence. See strength gain! Core 10 min intense finisher. 8-week assessment.",
        mainUrl:YT.knee3x, mainLabel:"10 Min Knee Strength – Final Test",
        kneeUrl:YT.kneeRehab, knee:"8-week knee progress check!" },
      { day:"SAT", name:"Ultimate Upper Finale", emoji:"🏆",
        ex:"Celebrate 8 weeks! Full upper body max effort — chest, back, shoulders, arms. Giant set ×5. Finish legendary.",
        mainUrl:YT.upper20, mainLabel:"20 Min Full Upper Body – Final Session",
        kneeUrl:YT.knee10, knee:"All bench/seated." },
      { day:"SUN", name:"Transformation Day 🎉", emoji:"📸",
        ex:"Take progress photos front/side/back! Measure waist, chest, hips. Compare to Day 1. Rest. Celebrate. You did it.",
        mainUrl:YT.mobility, mainLabel:"Recovery & Mobility – You Earned It",
        kneeUrl:YT.knee10, knee:"Rest day. Celebrate!" },
    ],
  },
];

const meals = [
  {
    type:"🌅 Breakfast", name:"Protein Overnight Oats",
    cal:420, pro:32, carb:45, fat:10,
    ings:["80g rolled oats","1 scoop vanilla whey protein","200ml unsweetened almond milk","1 tbsp chia seeds","100g mixed berries","1 tsp honey"],
    how:"Mix oats, protein, chia and almond milk in jar. Refrigerate overnight. Top with berries and honey. 5 min prep — no cooking.",
    vid:YT.oats,
  },
  {
    type:"☀️ Lunch", name:"Grilled Chicken & Roasted Veggies",
    cal:520, pro:48, carb:35, fat:14,
    ings:["180g chicken breast","150g sweet potato cubed","100g broccoli florets","1 tbsp olive oil","Garlic, cumin, paprika","Juice of half lemon"],
    how:"Season chicken with spices. Pan-sear 4 min each side until golden. Roast sweet potato and broccoli at 200°C for 20 min. Squeeze lemon.",
    vid:YT.chicken,
  },
  {
    type:"🌙 Dinner", name:"Baked Salmon & Asparagus",
    cal:480, pro:42, carb:18, fat:22,
    ings:["200g salmon fillet","1 bunch asparagus","1 tbsp olive oil","2 cloves garlic minced","Dill, salt, pepper","Half lemon sliced"],
    how:"Drizzle salmon with olive oil, garlic, dill. Top with lemon slices. Asparagus alongside. Bake 190°C for 18–20 min until salmon flakes.",
    vid:YT.salmon,
  },
  {
    type:"🍎 Snacks (×2 daily)", name:"High-Protein Snack Pack",
    cal:280, pro:28, carb:20, fat:8,
    ings:["150g Greek yogurt 0% fat","1 medium apple","20g raw almonds","1 hard-boiled egg"],
    how:"Prep night before. Morning: yogurt + apple. Pre-workout: egg + almonds. Simple, fast, 28g protein across both snacks.",
    vid:YT.snack,
  },
];

const quotes = [
  { q:"Every rep you do when you don't want to is the one that changes your body.", a:"Your Future Self" },
  { q:"The pain you feel today will be the strength you feel tomorrow.", a:"Arnold Schwarzenegger" },
  { q:"You are not starting over. You are starting from experience.", a:"Transformation Truth" },
  { q:"The gym is hard. Being unfit is hard. Choose your hard.", a:"Daily Reminder" },
  { q:"Kaius is watching. Be the father who showed up.", a:"Your Greatest Why" },
  { q:"Consistency beats perfection every single time.", a:"The Process" },
];

/* ── COMPONENTS ─────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={F.sLabel}>
      <span>{children}</span>
      <div style={F.sLine} />
    </div>
  );
}

function PBar({ pct, color }) {
  return (
    <div style={F.pBar}>
      <div style={{ height:"100%", width:`${Math.min(pct,100)}%`,
        borderRadius:"100px", background:color, transition:"width 0.7s ease" }} />
    </div>
  );
}

function WeekBlock({ wk }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...F.card, padding:0, overflow:"hidden", marginBottom:"10px",
      borderTop:`2px solid ${wk.color}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width:"100%", background:"none", border:"none", cursor:"pointer",
        padding:"16px 20px", display:"flex", justifyContent:"space-between",
        alignItems:"center", textAlign:"left",
      }}>
        <div>
          <div style={{ fontSize:"15px", fontWeight:"700", color:C.text }}>{wk.w}</div>
          <div style={{ fontSize:"11px", color:wk.color, fontWeight:"600",
            letterSpacing:"1.5px", textTransform:"uppercase", marginTop:"2px" }}>
            {wk.phase} Phase
          </div>
        </div>
        <span style={{ color:C.textDim, fontSize:"18px",
          transform:open?"rotate(180deg)":"none", display:"inline-block",
          transition:"transform 0.2s" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding:"0 16px 16px" }}>
          <div style={{ fontSize:"12px", color:C.textMid, marginBottom:"14px",
            padding:"10px 14px", background:`${wk.color}0d`,
            borderRadius:"8px", lineHeight:"1.6",
            border:`1px solid ${wk.color}20` }}>
            🎯 {wk.goal}
          </div>
          <CardioBlock />
          {wk.days.map(d => (
            <div key={d.day} style={{ ...F.card2, marginBottom:"8px" }}>
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"22px", flexShrink:0, marginTop:"2px" }}>{d.emoji}</span>
                <div style={{ flex:1, minWidth:"180px" }}>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center",
                    flexWrap:"wrap", marginBottom:"4px" }}>
                    <span style={{ ...F.badge(wk.color), fontSize:"10px" }}>{d.day}</span>
                    <span style={{ fontWeight:"700", fontSize:"14px", color:C.cream }}>{d.name}</span>
                  </div>
                  <p style={{ fontSize:"12px", color:C.textMid, margin:"0 0 4px",
                    lineHeight:"1.6" }}>{d.ex}</p>
                  <p style={{ fontSize:"11px", color:C.greenLt, margin:"0 0 10px" }}>
                    🦵 {d.knee}
                  </p>
                  <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                    <a href={d.mainUrl} target="_blank" rel="noopener noreferrer"
                      style={F.btn(`${wk.color}20`, wk.color, `1px solid ${wk.color}40`)}>
                      ▶ {d.mainLabel}
                    </a>
                    <a href={d.kneeUrl} target="_blank" rel="noopener noreferrer"
                      style={F.btn(`${C.greenLt}14`, C.greenLt, `1px solid ${C.greenLt}30`)}>
                      🦵 Knee Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MealCard({ m, idx }) {
  const [open, setOpen] = useState(false);
  const cols = [C.wood, C.blue, C.greenLt, C.amber];
  const col = cols[idx % cols.length];
  return (
    <div style={{ ...F.card, borderLeft:`3px solid ${col}`, paddingLeft:"18px" }}>
      <div style={{ display:"flex", justifyContent:"space-between",
        alignItems:"flex-start", gap:"12px", flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:"10px", color:col, fontWeight:"700",
            letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"4px" }}>{m.type}</div>
          <div style={{ fontSize:"17px", fontWeight:"700", color:C.cream }}>{m.name}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:"26px", fontWeight:"800", color:col, lineHeight:1 }}>{m.cal}</div>
          <div style={{ fontSize:"10px", color:C.textDim, fontWeight:"600" }}>KCAL</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", margin:"10px 0" }}>
        {[[C.blue,"🥩 "+m.pro+"g protein"],[C.wood,"🌾 "+m.carb+"g carbs"],[C.green,"🥑 "+m.fat+"g fat"]].map(([c,t])=>(
          <span key={t} style={F.badge(c)}>{t}</span>
        ))}
      </div>
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
        <button onClick={() => setOpen(!open)}
          style={F.btn(`${col}14`, col, `1px solid ${col}30`)}>
          {open ? "▲ Hide Recipe" : "▼ View Recipe"}
        </button>
        <a href={m.vid} target="_blank" rel="noopener noreferrer"
          style={F.btn(`${C.blue}18`, C.blue, `1px solid ${C.blue}35`)}>
          🎬 Watch Cooking Video
        </a>
      </div>
      {open && (
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"14px", marginTop:"14px" }}>
          <div style={F.grid2}>
            <div>
              <div style={{ fontSize:"10px", color:C.wood, fontWeight:"700",
                letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"8px" }}>Ingredients</div>
              <ul style={{ margin:0, padding:"0 0 0 16px", color:C.textMid,
                lineHeight:"2", fontSize:"13px" }}>
                {m.ings.map((g,i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
            <div>
              <div style={{ fontSize:"10px", color:C.blue, fontWeight:"700",
                letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"8px" }}>How to Cook</div>
              <p style={{ color:C.textMid, fontSize:"13px", lineHeight:"1.7", margin:0 }}>{m.how}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── TABS DATA ───────────────────────────────────────────── */
const TABS = [
  { id:"progress", label:"🌿 Progress" },
  { id:"workout",  label:"🏋️ Workout"  },
  { id:"food",     label:"☕ Food Plan" },
];

/* ── MAIN PAGE ───────────────────────────────────────────── */
export default function PandoApp() {
  const [tab, setTab] = useState("progress");
  const [weight, setWeight] = useState("");
  const [steps, setSteps]   = useState("");
  const [water, setWater]   = useState("");
  const [sleep, setSleep]   = useState("");
  const [logs, setLogs]     = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [logInput, setLogInput] = useState({ date:"", session:"", notes:"" });

  const START = 105, GOAL = 88;
  const cur = parseFloat(weight) || START;
  const lost = Math.max(0, START - cur);
  const toGo = Math.max(0, cur - GOAL);
  const wPct = Math.min(100, (lost / (START - GOAL)) * 100);
  const sPct = Math.min(100, ((parseFloat(steps)||0) / 10000) * 100);
  const waPct= Math.min(100, ((parseFloat(water)||0) / 3) * 100);
  const slPct= Math.min(100, ((parseFloat(sleep)||0) / 8) * 100);
  const behind = weight && cur > START - 0.5;

  function addLog() {
    if (!logInput.date || !logInput.session) return;
    setLogs(prev => [{ ...logInput, id: Date.now() }, ...prev]);
    setLogInput({ date:"", session:"", notes:"" });
  }

  return (
    <div style={F.page}>
      {/* HEADER */}
      <div style={F.header}>
        <div style={F.headerGlow} />
        <div style={F.pill}>☕ Wood · Latte · Wellness</div>
        <h1 style={F.title}>PANDO APP</h1>
        <p style={F.subtitle}>2-Month Transformation · 105kg → 88kg</p>
        <p style={{ fontSize:"11px", color:C.textDim, margin:"0 0 12px",
          letterSpacing:"1px" }}>
          8 Weeks · Knee-Safe · 176cm · Work 10am–7pm
        </p>
        <div style={F.statRow}>
          {[
            ["105kg","Start Weight"],["88kg","Goal Weight"],
            ["2200kcal","Daily Target"],["7:30 AM","Workout Time"],
          ].map(([v,l]) => (
            <div key={l} style={F.statBox}>
              <div style={{ fontSize:"16px", fontWeight:"800", color:C.woodLight }}>{v}</div>
              <div style={{ fontSize:"10px", color:C.textDim, marginTop:"2px",
                letterSpacing:"1px", textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={F.tabs}>
        {TABS.map(t => (
          <button key={t.id} style={F.tab(tab===t.id)} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={F.wrap}>

        {/* ── PROGRESS TAB ── */}
        {tab === "progress" && (
          <div>
            {/* Body Analysis */}
            <SectionLabel>Body Analysis — Start Point</SectionLabel>
            <div style={F.woodCard}>
              <p style={{ fontSize:"13px", color:C.textMid, margin:"0 0 14px",
                lineHeight:"1.7" }}>
                Based on your photos: primary fat in <strong style={{ color:C.woodLight }}>abdomen,
                chest, lower back &amp; flanks</strong>. Good broad shoulder frame underneath.
                All workouts use your <strong style={{ color:C.woodLight }}>treadmill, elliptical,
                bike, cable machine, dumbbells &amp; bench</strong>. Zero jumping. Zero deep squats.
              </p>
              <div style={F.grid3}>
                {[["2200kcal","Daily Calories"],["219g","Daily Protein"],
                  ["7:30 AM","Workout Time"],["45–60 min","Duration"]].map(([v,l]) => (
                  <div key={l} style={{ textAlign:"center", padding:"12px",
                    background:C.card, borderRadius:"10px", border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:"20px", fontWeight:"800", color:C.wood }}>{v}</div>
                    <div style={{ fontSize:"10px", color:C.textDim, marginTop:"4px",
                      textTransform:"uppercase", letterSpacing:"1px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Profile */}
            <SectionLabel>Your Profile</SectionLabel>
            <div style={F.grid3}>
              {[["105kg","Current"],[`${cur.toFixed(1)}kg`,"Current Weight"],
                ["176cm","Height"],["33.9","BMI"],
                ["Obese","Status"],[`${lost.toFixed(1)}kg`,"Lost"],
                [`${toGo.toFixed(1)}kg`,"To Go"],[`${wPct.toFixed(0)}%`,"Done"]].map(([v,l]) => (
                <div key={l} style={{ ...F.card, padding:"14px", textAlign:"center" }}>
                  <div style={{ fontSize:"18px", fontWeight:"800",
                    color: l==="Lost"?C.greenLt:l==="Status"?C.red:C.latte }}>{v}</div>
                  <div style={{ fontSize:"10px", color:C.textDim, marginTop:"3px",
                    textTransform:"uppercase", letterSpacing:"1px" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Live Tracker */}
            <SectionLabel>Live Daily Tracker</SectionLabel>
            <div style={F.grid2}>
              {[
                { label:"Current Weight (kg)", val:weight, set:setWeight, ph:"e.g. 104.5" },
                { label:"Daily Steps",         val:steps,  set:setSteps,  ph:"e.g. 8500"  },
                { label:"Water Intake (L)",     val:water,  set:setWater,  ph:"e.g. 2.5"   },
                { label:"Sleep Hours",          val:sleep,  set:setSleep,  ph:"e.g. 7.5"   },
              ].map(f => (
                <div key={f.label} style={F.card}>
                  <label style={F.inputLabel}>{f.label}</label>
                  <input type="number" value={f.val} placeholder={f.ph}
                    onChange={e => f.set(e.target.value)} style={F.input} />
                </div>
              ))}
            </div>

            {behind && (
              <div style={F.redCard}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                  <span style={{ fontSize:"20px" }}>⚠️</span>
                  <span style={{ fontWeight:"700", color:"#e87070", fontSize:"14px" }}>
                    Weight Loss Behind Schedule</span>
                </div>
                <p style={{ color:"#d09090", margin:0, fontSize:"13px", lineHeight:"1.6" }}>
                  Target: 0.5–1 kg/week. Check calorie deficit, increase daily steps,
                  and ensure the full 40-min cardio block is completed every session.
                </p>
              </div>
            )}

            <div style={F.card}>
              <div style={{ fontSize:"13px", fontWeight:"700", color:C.cream, marginBottom:"14px" }}>
                Overall Progress
              </div>
              {[
                { label:"⚖️ Weight Goal", pct:wPct,  color:`linear-gradient(90deg,${C.wood},${C.woodLight})` },
                { label:"👟 Daily Steps", pct:sPct,  color:`linear-gradient(90deg,${C.blue},#7ab0d8)` },
                { label:"💧 Water Intake",pct:waPct, color:`linear-gradient(90deg,#4a9aaa,#7abbc8)` },
                { label:"😴 Sleep",       pct:slPct, color:`linear-gradient(90deg,#7a5aaa,#9a7ac8)` },
              ].map(p => (
                <div key={p.label} style={{ marginBottom:"14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                    <span style={{ fontSize:"12px", color:C.textMid }}>{p.label}</span>
                    <span style={{ fontSize:"12px", color:p.pct>=100?C.greenLt:C.latte, fontWeight:"700" }}>
                      {p.pct.toFixed(0)}%
                    </span>
                  </div>
                  <PBar pct={p.pct} color={p.color} />
                </div>
              ))}
            </div>

            {/* Workout Log */}
            <SectionLabel>Workout Log Sheet</SectionLabel>
            <div style={F.card}>
              <div style={F.grid3}>
                <div>
                  <label style={F.inputLabel}>Date</label>
                  <input type="date" value={logInput.date}
                    onChange={e => setLogInput(p => ({...p, date:e.target.value}))}
                    style={F.input} />
                </div>
                <div>
                  <label style={F.inputLabel}>Session</label>
                  <input type="text" value={logInput.session}
                    placeholder="e.g. Chest Day + Cardio"
                    onChange={e => setLogInput(p => ({...p, session:e.target.value}))}
                    style={F.input} />
                </div>
                <div>
                  <label style={F.inputLabel}>Notes</label>
                  <input type="text" value={logInput.notes}
                    placeholder="e.g. 12kg DB press"
                    onChange={e => setLogInput(p => ({...p, notes:e.target.value}))}
                    style={F.input} />
                </div>
              </div>
              <button onClick={addLog}
                style={{ ...F.btn(`linear-gradient(135deg,${C.wood},${C.woodDark})`, "#000"), marginTop:"12px" }}>
                + Log Session
              </button>
            </div>
            {logs.length === 0 ? (
              <div style={{ textAlign:"center", padding:"24px", color:C.textDim, fontSize:"13px" }}>
                🌱 No workouts logged yet.<br />
                <span style={{ fontSize:"12px" }}>Go to Workout tab and press + Log after each session!</span>
              </div>
            ) : (
              <div>
                {logs.map(lg => (
                  <div key={lg.id} style={{ ...F.card2, display:"flex",
                    justifyContent:"space-between", alignItems:"center", gap:"12px" }}>
                    <div>
                      <div style={{ fontSize:"12px", color:C.textDim }}>{lg.date}</div>
                      <div style={{ fontWeight:"700", color:C.cream, fontSize:"14px" }}>{lg.session}</div>
                      {lg.notes && <div style={{ fontSize:"12px", color:C.textMid }}>{lg.notes}</div>}
                    </div>
                    <span style={{ fontSize:"20px" }}>✅</span>
                  </div>
                ))}
              </div>
            )}

            {/* Knee Safety */}
            <SectionLabel>Knee Safety Protocol</SectionLabel>
            <div style={F.redCard}>
              <div style={F.grid3}>
                {[
                  { icon:"🚫", rule:"No Deep Squats",   detail:"Nothing below 90°", col:C.red },
                  { icon:"🚫", rule:"No Jumping",        detail:"Zero impact moves",  col:C.red },
                  { icon:"🚫", rule:"Stop Sharp Pain",   detail:"Rest & ice at once", col:C.red },
                  { icon:"✅", rule:"Elliptical First",  detail:"Zero joint impact",  col:C.greenLt },
                  { icon:"✅", rule:"Incline Walk",      detail:"Knee-safe cardio",   col:C.greenLt },
                  { icon:"✅", rule:"Ice After Session", detail:"10–15 min ice pack", col:C.greenLt },
                ].map(k => (
                  <div key={k.rule} style={{ padding:"12px",
                    background: k.icon==="✅"?"rgba(90,138,90,0.08)":"rgba(192,80,74,0.06)",
                    borderRadius:"10px", border:`1px solid ${k.col}25` }}>
                    <div style={{ fontSize:"20px", marginBottom:"4px" }}>{k.icon}</div>
                    <div style={{ fontWeight:"700", color:k.col, fontSize:"13px" }}>{k.rule}</div>
                    <div style={{ fontSize:"11px", color:C.textDim, marginTop:"2px" }}>{k.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation Quote */}
            <SectionLabel>Daily Motivation</SectionLabel>
            <div style={F.woodCard}>
              <div style={{ fontSize:"24px", marginBottom:"10px", textAlign:"center" }}>💬</div>
              <p style={{ fontSize:"15px", fontStyle:"italic", color:C.cream,
                lineHeight:"1.7", textAlign:"center", margin:"0 0 12px" }}>
                "{quotes[quoteIdx].q}"
              </p>
              <p style={{ textAlign:"center", fontSize:"12px", color:C.wood,
                fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase", margin:"0 0 14px" }}>
                — {quotes[quoteIdx].a}
              </p>
              <div style={{ textAlign:"center" }}>
                <button onClick={() => setQuoteIdx((quoteIdx + 1) % quotes.length)}
                  style={F.btn(`${C.greenLt}18`, C.greenLt, `1px solid ${C.greenLt}35`)}>
                  🌿 Next Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── WORKOUT TAB ── */}
        {tab === "workout" && (
          <div>
            <SectionLabel>Daily Cardio Structure</SectionLabel>
            <div style={F.greenCard}>
              <div style={{ fontWeight:"700", color:C.greenLt, fontSize:"15px", marginBottom:"14px" }}>
                🔥 40 Minutes — Fixed Every Training Day
              </div>
              <div style={F.grid3}>
                {[
                  { icon:"🚴", label:"Step 1 — Bike", time:"10 min",
                    detail:"Medium resistance. Warm knee joint safely.", col:C.blue, url:YT.bike10 },
                  { icon:"🔄", label:"Step 2 — Elliptical", time:"10 min",
                    detail:"Full-body glide. Zero knee impact. Fat-burn zone.", col:"#9a7ac8", url:YT.ellip10 },
                  { icon:"🏔️", label:"Step 3 — Incline Walk", time:"20 min",
                    detail:"6–10% incline. Max calorie afterburn.", col:C.greenLt, url:YT.incline20 },
                ].map(st => (
                  <div key={st.label} style={{ background:`${st.col}12`,
                    border:`1px solid ${st.col}30`, borderRadius:"12px", padding:"16px" }}>
                    <div style={{ fontSize:"22px", marginBottom:"6px" }}>{st.icon}</div>
                    <div style={{ fontWeight:"700", color:st.col, fontSize:"13px" }}>{st.label}</div>
                    <div style={{ fontSize:"22px", fontWeight:"800", color:C.cream,
                      margin:"4px 0", letterSpacing:"-0.5px" }}>{st.time}</div>
                    <div style={{ fontSize:"11px", color:C.textDim, marginBottom:"10px",
                      lineHeight:"1.5" }}>{st.detail}</div>
                    <a href={st.url} target="_blank" rel="noopener noreferrer"
                      style={F.btn(`${st.col}20`, st.col, `1px solid ${st.col}40`)}>
                      ▶ Follow Along
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:"12px", color:C.textDim, lineHeight:"1.7",
                padding:"12px 14px", marginTop:"12px",
                background:"rgba(201,147,58,0.05)", borderRadius:"8px",
                border:`1px solid rgba(201,147,58,0.12)` }}>
                <strong style={{ color:C.wood }}>Why this sequence:</strong> Bike warms the knee safely first.
                Elliptical raises heart rate without joint stress. Incline walk targets belly &amp; chest fat
                and strengthens the VMO muscle around the knee. This 40-min block is your
                <strong style={{ color:C.cream }}> daily fat furnace</strong>.
              </div>
            </div>

            <SectionLabel>8-Week Plan — Chest Focus + Knee Rehab</SectionLabel>
            <div style={F.woodCard}>
              <p style={{ margin:0, color:C.textMid, fontSize:"13px", lineHeight:"1.7" }}>
                <strong style={{ color:C.woodLight }}>🎯 Chest Priority:</strong> Monday &amp; Thursday
                every week are dedicated chest sessions — DB press, flyes, cable crossover — to burn
                chest fat and build pec definition.&nbsp;
                <strong style={{ color:C.greenLt }}>🦵 Knee Priority:</strong> Tuesday, Friday +
                Sunday use physical therapy protocols — VMO activation, glute bridges, terminal knee
                extensions — to make your knees pain-free and strong.
              </p>
            </div>
            {weeks.map(w => <WeekBlock key={w.w} wk={w} />)}
          </div>
        )}

        {/* ── FOOD TAB ── */}
        {tab === "food" && (
          <div>
            <SectionLabel>Daily Nutrition Targets</SectionLabel>
            <div style={F.woodCard}>
              <div style={{ display:"flex", justifyContent:"space-around",
                flexWrap:"wrap", gap:"16px" }}>
                {[["1,700",C.wood,"Calories"],["150g",C.blue,"Protein"],
                  ["118g",C.greenLt,"Carbs"],["54g",C.amber,"Fats"]].map(([v,c,l]) => (
                  <div key={l} style={{ textAlign:"center", minWidth:"70px" }}>
                    <div style={{ fontSize:"clamp(22px,5vw,30px)", fontWeight:"800", color:c }}>{v}</div>
                    <div style={{ fontSize:"10px", color:C.textDim, textTransform:"uppercase",
                      letterSpacing:"1px", marginTop:"3px" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionLabel>Meal Plan</SectionLabel>
            {meals.map((m, i) => <MealCard key={m.name} m={m} idx={i} />)}

            <SectionLabel>Nutrition Rules</SectionLabel>
            <div style={F.card}>
              <div style={F.grid2}>
                {[
                  { icon:"🥩", text:"Protein first at every meal — chicken, salmon, eggs, Greek yogurt" },
                  { icon:"💧", text:"Drink 3L water daily — start with 500ml before breakfast" },
                  { icon:"⏰", text:"Eat breakfast within 60 min of waking to kickstart metabolism" },
                  { icon:"🚫", text:"Avoid rice, bread, pasta, sugary drinks and fried foods" },
                  { icon:"🌙", text:"Last meal 2–3 hours before sleep for optimal fat burning" },
                  { icon:"📏", text:"Use a food scale for the first 2 weeks — accuracy matters" },
                ].map(r => (
                  <div key={r.text} style={{ display:"flex", gap:"10px", alignItems:"flex-start",
                    padding:"12px", background:C.card2, borderRadius:"9px",
                    border:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:"16px", flexShrink:0 }}>{r.icon}</span>
                    <span style={{ fontSize:"12px", color:C.textMid, lineHeight:"1.5" }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign:"center", padding:"20px",
        borderTop:`1px solid ${C.border}`, color:C.textDim, fontSize:"11px",
        letterSpacing:"1px" }}>
        PANDO APP 🌿 &nbsp;·&nbsp; Personalised for you &nbsp;·&nbsp; Stay consistent &nbsp;·&nbsp; Trust the process
      </div>
    </div>
  );
}
