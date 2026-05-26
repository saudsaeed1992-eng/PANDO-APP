"use client";
import { useState } from "react";

// ── Latte Cream + Organic Green + Woody Palette ──────────────────
const C = {
  // Backgrounds — warm creamy latte
  bg:         "#f5ede0",
  bgPage:     "#ede0cc",
  bgCard:     "#fdf6ee",
  bgDeep:     "#f0e4d0",
  bgDark:     "#e8d8c0",

  // Borders
  border:     "#d4b896",
  borderHi:   "#b8956a",

  // Organic greens
  sage:       "#5a7a48",
  fern:       "#3d6030",
  moss:       "#2d4d22",
  leafLight:  "#7a9e60",
  leafPale:   "#c8ddb8",
  mintCream:  "#e8f0e0",

  // Woody / earth tones
  walnut:     "#7b4f2a",
  wood:       "#9b6b3c",
  bark:       "#5c3820",
  caramel:    "#b87333",
  mocha:      "#6b3d1a",
  espresso:   "#3d2010",

  // Latte tones
  latte:      "#c8a876",
  latteLight: "#dfc49a",
  latteMid:   "#a88050",
  foam:       "#f5ede0",

  // Text
  textDark:   "#2d1f0e",
  textMid:    "#5c3820",
  textMuted:  "#8b6b4a",
  textLight:  "#a88060",
  white:      "#fffdf8",

  // Accents
  red:        "#a0432a",
  teal:       "#3d7060",
  amber:      "#c97d30",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
  mono:    "'Courier New', monospace",
};

const PERSONAL = {
  startWeight: 105,
  goalWeight:  88,
  height:      176,
};

const bmi     = (w) => (w / ((PERSONAL.height / 100) ** 2)).toFixed(1);
const bmiLabel = (b) => b < 18.5 ? "Underweight" : b < 25 ? "Healthy" : b < 30 ? "Overweight" : "Obese";

// ── Shared UI ────────────────────────────────────────────────────
function ProgressRing({ pct, color, size = 78, label, value, unit }) {
  const r    = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(100, pct) / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bgDark} strokeWidth={7} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: font.mono, fontSize: "11px", fontWeight: "bold", color }}>{Math.round(pct)}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: font.display, fontSize: "13px", color: C.textDark, fontWeight: "bold" }}>{value}{unit}</div>
        <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textMuted }}>{label}</div>
      </div>
    </div>
  );
}

function Bar({ pct, color, h = 8 }) {
  return (
    <div style={{ background: C.bgDark, borderRadius: "20px", height: h, overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: "100%", background: color, borderRadius: "20px", transition: "width 0.8s ease" }} />
    </div>
  );
}

function Card({ children, style = {}, topColor }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 2px 16px rgba(90,55,20,0.10)",
      borderTop: topColor ? `3px solid ${topColor}` : undefined,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0" }}>
      <div style={{ flex: 1, height: "1px", background: C.border }} />
      <span style={{ fontFamily: font.body, fontSize: "10px", color: C.textLight, textTransform: "uppercase", letterSpacing: "1.5px" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: C.border }} />
    </div>
  );
}

function StatBox({ label, value, color, bg }) {
  return (
    <div style={{ background: bg || C.bgDeep, borderRadius: "12px", padding: "12px 8px", textAlign: "center", border: `1px solid ${C.border}` }}>
      <div style={{ fontFamily: font.display, fontSize: "17px", fontWeight: "bold", color: color || C.fern }}>{value}</div>
      <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textMuted, marginTop: "2px" }}>{label}</div>
    </div>
  );
}

function NavBtn({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1,
      background: active
        ? `linear-gradient(160deg, ${C.fern}, ${C.moss})`
        : C.bgDark,
      border: `1px solid ${active ? C.fern : C.border}`,
      borderRadius: "14px",
      padding: "12px 6px",
      color: active ? C.white : C.textMuted,
      fontFamily: font.display,
      fontWeight: active ? "bold" : "normal",
      fontSize: "clamp(11px, 2vw, 13px)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      transition: "all 0.25s ease",
      boxShadow: active ? `0 3px 14px ${C.moss}44` : "none",
    }}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      {label}
    </button>
  );
}

function InputRow({ label, value, onChange, unit, min, max, step, icon }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ display: "flex", gap: "5px", alignItems: "center", fontFamily: font.body, fontSize: "11px", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>
        <span>{icon}</span>{label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" value={value} min={min} max={max} step={step || 1}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "9px 13px", color: C.textDark, fontSize: "16px", fontFamily: font.display, fontWeight: "bold", outline: "none", boxSizing: "border-box" }} />
        <span style={{ fontFamily: font.body, fontSize: "12px", color: C.textLight, minWidth: "34px" }}>{unit}</span>
      </div>
    </div>
  );
}

// ── Workout & Meal Data ──────────────────────────────────────────
const workoutWeeks = [
  {
    week: "Week 1–2", theme: "Foundation & Gentle Activation", color: C.sage,
    days: [
      { day: "Mon", icon: "🚶", name: "Brisk Walk",        details: "30 min flat walk, moderate pace, good posture",              link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Tue", icon: "💪", name: "Upper Body",         details: "Seated dumbbell press, lateral raises, curls — 3×12",        link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🧘", name: "Core & Mobility",    details: "Dead bugs, bird dogs, planks 20s, hip circles — 3 rounds",   link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🚴", name: "Bike Rehab",         details: "25 min low-resistance stationary bike — zero knee strain",    link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "🏋️", name: "Upper + Core",      details: "Modified push-ups, dumbbell rows, Russian twists — 3×10",    link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🌿", name: "Long Walk",          details: "45 min relaxed outdoor walk, enjoy nature",                   link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "😴", name: "Rest & Recovery",    details: "Full rest, light stretch, foam roll upper back",               link: "" },
    ],
  },
  {
    week: "Week 3–4", theme: "Momentum Building", color: C.wood,
    days: [
      { day: "Mon", icon: "📈", name: "Incline Treadmill",  details: "35 min 4–6% incline — builds glutes, no knee stress",        link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "💥", name: "Upper Body Power",   details: "Chest press, cable rows, lat pulldowns, skull crushers 4×10", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔥", name: "Core Blast",         details: "Plank 30s, reverse crunches, slow mountain climbers — 4 rds", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🚴", name: "Bike + Mobility",    details: "30 min bike + 15 min hip flexor & hamstring stretches",        link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "🏋️", name: "Full Upper Body",   details: "Arnold press, face pulls, assisted dips, curls — 3×12",       link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🏞️", name: "Nature Walk",       details: "50 min outdoor flat terrain walk or gentle hike",              link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "🛁", name: "Active Recovery",    details: "Yoga flow, contrast shower, target 8h sleep",                  link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
  {
    week: "Week 5–6", theme: "Fat Burn Acceleration", color: C.caramel,
    days: [
      { day: "Mon", icon: "⚡", name: "Incline Intervals",  details: "40 min: 3 min 5% / 1 min 8% alternating incline",            link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "💪", name: "Push Day",           details: "Chest press, shoulder press, incline push-ups, triceps 4×12", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔄", name: "Core + Cardio",      details: "3 rds: 1 min plank, 20 crunches, 20 twists, 10 min bike",    link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🏋️", name: "Pull Day",          details: "Lat pulldown, cable row, face pulls, hammer curls — 4×10",   link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Fri", icon: "🚴", name: "Bike + Core",        details: "35 min bike + 20 min targeted core work",                    link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Sat", icon: "🌿", name: "Walk + Stretch",     details: "60 min brisk walk + 15 min full-body stretch",                link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "😴", name: "Rest",               details: "Full rest. Prep meals. Write in your journal.",               link: "" },
    ],
  },
  {
    week: "Week 7–8", theme: "Peak & Consolidation", color: C.fern,
    days: [
      { day: "Mon", icon: "🏔️", name: "Power Walk",        details: "45 min 6–8% incline, fast pace — maximum calorie burn",     link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "🏆", name: "Strength Max",       details: "Heavy dumbbell superset: chest, back, shoulders — 4×8-10",  link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔥", name: "Core Endurance",     details: "5 rds: 45s plank, 15 leg raises, 20 bicycle crunches",      link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "⚡", name: "Bike HIIT",          details: "30 min: 1 min hard / 2 min easy intervals",                 link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "💥", name: "Full Body Upper",    details: "Compound circuit: rows, press, pull, curl, extend — 4 rds", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🎯", name: "Victory Walk",       details: "60+ min outdoor walk — take progress photos!",              link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "✨", name: "Reflect & Reset",    details: "Yoga, meditation, meal prep, measure results",               link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
];

const meals = [
  {
    meal: "Breakfast", icon: "☕", name: "Protein Oats Bowl",
    calories: 420, protein: 32, carbs: 45, fat: 10,
    ingredients: ["80g rolled oats", "1 scoop vanilla protein", "200ml almond milk", "1 banana", "1 tbsp almond butter", "Cinnamon"],
    instructions: "Cook oats in almond milk 5 min. Off heat, stir in protein. Top with banana, almond butter, and cinnamon.",
    video: "https://www.youtube.com/watch?v=kd3goxFqbJA",
  },
  {
    meal: "Lunch", icon: "🍗", name: "Grilled Chicken & Quinoa",
    calories: 520, protein: 48, carbs: 42, fat: 12,
    ingredients: ["180g chicken breast", "80g quinoa (dry)", "100g cherry tomatoes", "50g cucumber", "30g feta", "Olive oil, lemon, oregano"],
    instructions: "Season chicken with oregano, salt, pepper. Grill 6 min per side. Cook quinoa. Assemble bowl, crumble feta, drizzle oil and lemon.",
    video: "https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal: "Dinner", icon: "🐟", name: "Baked Salmon & Roasted Veg",
    calories: 480, protein: 44, carbs: 22, fat: 22,
    ingredients: ["200g salmon fillet", "150g broccoli", "100g sweet potato", "2 garlic cloves", "Olive oil", "Lemon, fresh dill"],
    instructions: "Preheat oven 200°C. Toss veg in oil, season, roast 20 min. Place salmon in pan with garlic, lemon, dill. Bake 12–15 min until flaky.",
    video: "https://www.youtube.com/watch?v=M_a_HcNADP4",
  },
  {
    meal: "Snack 1", icon: "🥛", name: "Greek Yogurt & Berries",
    calories: 180, protein: 18, carbs: 20, fat: 3,
    ingredients: ["200g Greek yogurt 0%", "80g mixed berries", "1 tsp honey", "1 tbsp chia seeds"],
    instructions: "Layer yogurt in bowl. Top with berries, honey, and chia seeds. Can be prepped the night before.",
    video: "https://www.youtube.com/watch?v=xGrC_vHH3oU",
  },
  {
    meal: "Snack 2", icon: "🥜", name: "Protein Shake & Almonds",
    calories: 220, protein: 26, carbs: 8, fat: 10,
    ingredients: ["1 scoop chocolate protein powder", "250ml almond milk", "20g raw almonds"],
    instructions: "Shake protein with milk. Serve with almonds on the side. Great post-workout or evening snack.",
    video: "https://www.youtube.com/watch?v=Yz4hDgk_3iU",
  },
];

const quotes = [
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Like a tree — grow stronger through every storm.", author: "Unknown" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Take care of your body. It is the only place you have to live.", author: "Jim Rohn" },
  { text: "Every sunrise is a new chance to grow.", author: "Unknown" },
];

// ── HOME VIEW ────────────────────────────────────────────────────
function HomeView({ logs }) {
  const [qIdx, setQIdx] = useState(0);
  const startW   = PERSONAL.startWeight;
  const goalW    = PERSONAL.goalWeight;
  const range    = startW - goalW;
  const latest   = logs.length > 0 ? logs[logs.length - 1].weight : startW;
  const lost     = Math.max(0, startW - latest);
  const wPct     = Math.min(100, (lost / range) * 100);
  const totalDone    = logs.length;
  const totalPlanned = workoutWeeks.reduce((a, w) => a + w.days.filter(d => d.link).length, 0);
  const woPct    = Math.min(100, (totalDone / totalPlanned) * 100);
  const avgSteps = logs.length > 0 ? Math.round(logs.reduce((a, l) => a + (l.steps || 0), 0) / logs.length) : 0;
  const avgWater = logs.length > 0 ? (logs.reduce((a, l) => a + (l.water || 0), 0) / logs.length).toFixed(1) : "—";
  const avgSleep = logs.length > 0 ? (logs.reduce((a, l) => a + (l.sleep || 0), 0) / logs.length).toFixed(1) : "—";
  const curBMI   = bmi(latest);
  const behind   = latest > startW - (range / 8) * 2 && logs.length > 5;

  return (
    <div>
      {/* Profile Card */}
      <Card topColor={C.fern} style={{ marginBottom: "14px" }}>
        <Divider label="Your Profile" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <StatBox label="Start Weight"   value={startW+"kg"}  color={C.walnut} />
          <StatBox label="Goal Weight"    value={goalW+"kg"}   color={C.fern} />
          <StatBox label="Current Weight" value={latest+"kg"}  color={C.textDark} />
          <StatBox label="Height"         value={PERSONAL.height+"cm"} color={C.wood} />
          <StatBox label="BMI Now"        value={curBMI}       color={parseFloat(curBMI) < 25 ? C.fern : C.amber} />
          <StatBox label="BMI Status"     value={bmiLabel(parseFloat(curBMI))} color={parseFloat(curBMI) < 25 ? C.fern : C.amber} />
        </div>
        <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          <StatBox label="kg Lost"     value={lost.toFixed(1)+"kg"} color={C.fern} bg={C.mintCream} />
          <StatBox label="kg To Go"    value={Math.max(0,range-lost).toFixed(1)+"kg"} color={C.amber} bg={`${C.amber}18`} />
          <StatBox label="Journey"     value={Math.round(wPct)+"%"} color={C.sage} bg={C.mintCream} />
        </div>
      </Card>

      {/* Behind warning */}
      {behind && (
        <div style={{ background: `${C.amber}22`, border: `1px solid ${C.amber}88`, borderRadius: "14px", padding: "12px 16px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "18px" }}>🍂</span>
          <span style={{ color: C.mocha, fontSize: "12px", fontFamily: font.body, lineHeight: 1.5 }}>Weight progress may be behind schedule. Review your nutrition and increase daily movement.</span>
        </div>
      )}

      {/* Progress Rings */}
      <Card topColor={C.wood} style={{ marginBottom: "14px" }}>
        <Divider label="Overall Progress" />
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "14px" }}>
          <ProgressRing pct={wPct}   color={C.fern}     size={78} label="weight goal" value={lost.toFixed(1)} unit="kg" />
          <ProgressRing pct={woPct}  color={C.wood}     size={78} label="workouts"    value={totalDone}        unit="" />
          <ProgressRing pct={Math.min(100,(avgSteps/10000)*100)} color={C.caramel} size={78} label="avg steps" value={avgSteps} unit="" />
          <ProgressRing pct={Math.min(100,(parseFloat(avgWater)/3)*100)} color={C.teal} size={78} label="avg water" value={avgWater} unit="L" />
        </div>
      </Card>

      {/* Workout Log Sheet */}
      <Card topColor={C.caramel} style={{ marginBottom: "14px" }}>
        <Divider label="Workout Log Sheet" />
        {logs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "28px 0", color: C.textLight, fontFamily: font.body, fontSize: "13px", fontStyle: "italic" }}>
            🌱 No workouts logged yet.<br />Go to the Workout tab and log your first session!
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font.body, fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  {["#","Date","Workout","Weight","Steps","Water","Sleep","Feel"].map(h => (
                    <th key={h} style={{ padding: "7px 6px", color: C.textMuted, fontWeight: "normal", textAlign: "left", whiteSpace: "nowrap", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.bgDark}`, background: i % 2 === 0 ? C.bgDeep : "transparent" }}>
                    <td style={{ padding: "8px 6px", color: C.textLight }}>{logs.length - i}</td>
                    <td style={{ padding: "8px 6px", color: C.textMid, whiteSpace: "nowrap" }}>{log.date}</td>
                    <td style={{ padding: "8px 6px", color: C.textDark, fontWeight: "bold" }}>{log.workoutName}</td>
                    <td style={{ padding: "8px 6px", color: C.walnut }}>{log.weight}kg</td>
                    <td style={{ padding: "8px 6px", color: C.wood }}>{log.steps}</td>
                    <td style={{ padding: "8px 6px", color: C.teal }}>{log.water}L</td>
                    <td style={{ padding: "8px 6px", color: C.fern }}>{log.sleep}h</td>
                    <td style={{ padding: "8px 6px", fontSize: "16px" }}>{log.feel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {logs.length > 0 && (
          <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
            <StatBox label="Sessions"  value={totalDone}        color={C.caramel} />
            <StatBox label="Avg Sleep" value={avgSleep+"h"}     color={C.teal}    />
            <StatBox label="Avg Water" value={avgWater+"L"}     color={C.fern}    />
          </div>
        )}
      </Card>

      {/* Knee Safety */}
      <Card topColor={C.bark} style={{ marginBottom: "14px" }}>
        <Divider label="Knee Safety Protocol" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { icon: "🚫", t: "No Deep Squats",   d: "Nothing below 90°",   c: C.red },
            { icon: "🚫", t: "No Jumping",        d: "Zero impact moves",    c: C.red },
            { icon: "🚫", t: "Stop Sharp Pain",   d: "Rest & ice at once",   c: C.red },
            { icon: "✅", t: "Bike & Walk Only",  d: "Low-impact always",    c: C.fern },
            { icon: "✅", t: "Always Warm Up",    d: "5–10 min light move",  c: C.fern },
            { icon: "✅", t: "Ice After Session", d: "10–15 min ice pack",   c: C.fern },
          ].map((k, i) => (
            <div key={i} style={{ background: k.c === C.fern ? C.mintCream : `${C.red}12`, border: `1px solid ${k.c === C.fern ? C.leafPale : C.red+"44"}`, borderRadius: "10px", padding: "10px 12px" }}>
              <div style={{ fontSize: "14px", marginBottom: "3px" }}>{k.icon}</div>
              <div style={{ fontFamily: font.display, fontSize: "12px", fontWeight: "bold", color: k.c }}>{k.t}</div>
              <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textMuted }}>{k.d}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivation */}
      <Card style={{ background: `linear-gradient(160deg, ${C.mintCream}, ${C.bgCard})`, border: `1px solid ${C.leafPale}`, textAlign: "center" }}>
        <div style={{ fontFamily: font.display, fontSize: "clamp(15px,3vw,19px)", fontStyle: "italic", color: C.textDark, lineHeight: 1.7, marginBottom: "10px" }}>
          "{quotes[qIdx].text}"
        </div>
        <div style={{ fontFamily: font.body, fontSize: "12px", color: C.textMuted, marginBottom: "14px" }}>— {quotes[qIdx].author}</div>
        <button onClick={() => setQIdx((qIdx + 1) % quotes.length)}
          style={{ background: `linear-gradient(135deg, ${C.fern}, ${C.moss})`, color: C.white, border: "none", borderRadius: "10px", padding: "9px 22px", fontFamily: font.body, fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>
          🌿 Next Quote
        </button>
      </Card>
    </div>
  );
}

// ── WORKOUT VIEW ─────────────────────────────────────────────────
function WorkoutView({ onLog, logs }) {
  const [openWeek, setOpenWeek] = useState(0);
  const [logging,  setLogging]  = useState(null);
  const [form, setForm] = useState({ weight: PERSONAL.startWeight, steps: 5000, water: 2.0, sleep: 7, feel: "😊" });

  const isDone   = (name) => logs.some(l => l.workoutName === name);
  const submitLog = () => {
    if (!logging) return;
    const day = workoutWeeks[logging.wi].days[logging.di];
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    onLog({ date: today, workoutName: day.name, ...form });
    setLogging(null);
  };

  return (
    <div>
      <div style={{ fontFamily: font.display, fontSize: "clamp(18px,3vw,24px)", fontWeight: "bold", color: C.textDark, marginBottom: "3px" }}>🏋️ 8-Week Workout Plan</div>
      <div style={{ fontFamily: font.body, fontSize: "12px", color: C.textMuted, marginBottom: "18px" }}>Tap a week · Tap a workout · Press + Log when done</div>

      {/* Log Modal */}
      {logging !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(60,35,10,0.65)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: C.bgCard, border: `2px solid ${C.fern}`, borderRadius: "22px", padding: "24px", width: "100%", maxWidth: "360px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
            <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "16px", color: C.fern, marginBottom: "3px" }}>✅ Log Completed Workout</div>
            <div style={{ fontFamily: font.body, fontSize: "13px", color: C.textMid, marginBottom: "18px" }}>
              {workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}
            </div>
            <InputRow label="Current Weight (kg)" value={form.weight} onChange={v => setForm({...form, weight: v})} unit="kg"    min={50} max={200} step={0.5} icon="⚖️" />
            <InputRow label="Steps Today"          value={form.steps}  onChange={v => setForm({...form, steps: v})}  unit="steps" min={0}  max={30000} step={100} icon="👟" />
            <InputRow label="Water Intake (L)"     value={form.water}  onChange={v => setForm({...form, water: v})}  unit="L"     min={0}  max={6}  step={0.1} icon="💧" />
            <InputRow label="Sleep Last Night (h)" value={form.sleep}  onChange={v => setForm({...form, sleep: v})}  unit="hrs"   min={0}  max={12} step={0.5} icon="🌙" />
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontFamily: font.body, fontSize: "11px", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>How Did You Feel?</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["😴","😐","😊","💪","🔥"].map(e => (
                  <button key={e} onClick={() => setForm({...form, feel: e})}
                    style={{ flex: 1, fontSize: "20px", padding: "8px 4px", borderRadius: "10px", border: `2px solid ${form.feel === e ? C.fern : C.border}`, background: form.feel === e ? C.mintCream : C.bgDeep, cursor: "pointer" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setLogging(null)}
                style={{ flex: 1, background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "12px", color: C.textMuted, fontFamily: font.body, fontSize: "13px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={submitLog}
                style={{ flex: 2, background: `linear-gradient(135deg, ${C.fern}, ${C.moss})`, border: "none", borderRadius: "12px", padding: "12px", color: C.white, fontFamily: font.display, fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                ✅ Save to Log
              </button>
            </div>
          </div>
        </div>
      )}

      {workoutWeeks.map((wk, wi) => (
        <div key={wi} style={{ marginBottom: "10px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 10px rgba(90,55,20,0.08)" }}>
          <button onClick={() => setOpenWeek(openWeek === wi ? -1 : wi)} style={{
            width: "100%",
            background: openWeek === wi ? `linear-gradient(90deg, ${wk.color}18, ${C.bgCard})` : C.bgCard,
            border: "none", padding: "16px 18px", cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderBottom: openWeek === wi ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "14px", color: wk.color }}>{wk.week}</div>
              <div style={{ fontFamily: font.body, fontSize: "11px", color: C.textMuted }}>{wk.theme}</div>
            </div>
            <span style={{ color: wk.color, fontSize: "16px", transform: openWeek === wi ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
          </button>

          {openWeek === wi && (
            <div style={{ padding: "10px" }}>
              {wk.days.map((d, di) => {
                const done  = isDone(d.name);
                const isRest = !d.link;
                return (
                  <div key={di} style={{
                    background: done ? C.mintCream : C.bgDeep,
                    border: `1px solid ${done ? C.leafPale : C.border}`,
                    borderRadius: "12px", padding: "12px 14px", marginBottom: "8px",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px",
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textLight, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{d.icon} {d.day}</div>
                      <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "14px", color: done ? C.fern : C.textDark }}>{d.name}{done ? " ✓" : ""}</div>
                      <div style={{ fontFamily: font.body, fontSize: "11px", color: C.textMuted, marginTop: "2px" }}>{d.details}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                      {d.link && (
                        <a href={d.link} target="_blank" rel="noopener noreferrer"
                          style={{ background: C.red, color: "#fff", fontWeight: "bold", fontSize: "11px", padding: "5px 11px", borderRadius: "7px", textDecoration: "none" }}>
                          ▶ Watch
                        </a>
                      )}
                      {!isRest && (
                        <button onClick={() => { setLogging({ wi, di }); setForm({ weight: PERSONAL.startWeight, steps: 5000, water: 2.0, sleep: 7, feel: "😊" }); }}
                          style={{ background: done ? C.mintCream : `linear-gradient(135deg, ${C.fern}, ${C.moss})`, border: `1px solid ${done ? C.fern : C.moss}`, color: done ? C.fern : C.white, fontWeight: "bold", fontSize: "11px", padding: "5px 11px", borderRadius: "7px", cursor: "pointer", fontFamily: font.body }}>
                          {done ? "✓ Logged" : "+ Log"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── FOOD VIEW ────────────────────────────────────────────────────
function FoodView() {
  const [open, setOpen] = useState(null);
  const totCal  = meals.reduce((a, m) => a + m.calories, 0);
  const totProt = meals.reduce((a, m) => a + m.protein,  0);
  const totCarb = meals.reduce((a, m) => a + m.carbs,    0);
  const totFat  = meals.reduce((a, m) => a + m.fat,      0);

  return (
    <div>
      <div style={{ fontFamily: font.display, fontSize: "clamp(18px,3vw,24px)", fontWeight: "bold", color: C.textDark, marginBottom: "3px" }}>☕ Fat-Loss Meal Plan</div>
      <div style={{ fontFamily: font.body, fontSize: "12px", color: C.textMuted, marginBottom: "18px" }}>High protein · Calorie controlled · Easy to prepare</div>

      <Card topColor={C.fern} style={{ marginBottom: "16px" }}>
        <Divider label="Daily Nutritional Totals" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "14px" }}>
          {[
            { l: "Calories", v: totCal,  suf: "kcal", c: C.walnut },
            { l: "Protein",  v: totProt, suf: "g",    c: C.fern   },
            { l: "Carbs",    v: totCarb, suf: "g",    c: C.teal   },
            { l: "Fat",      v: totFat,  suf: "g",    c: C.caramel},
          ].map((t, i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px 6px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: font.display, fontSize: "16px", fontWeight: "bold", color: t.c }}>{t.v}</div>
              <div style={{ fontFamily: font.mono, fontSize: "9px", color: C.textLight }}>{t.suf}</div>
              <div style={{ fontFamily: font.body, fontSize: "9px", color: C.textMuted }}>{t.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textMuted, marginBottom: "5px" }}>Protein coverage</div>
        <Bar pct={(totProt / 160) * 100} color={C.fern} h={7} />
        <div style={{ fontFamily: font.mono, fontSize: "10px", color: C.textMuted, marginTop: "4px", textAlign: "right" }}>{totProt}g / 160g target</div>
      </Card>

      {meals.map((m, i) => (
        <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "18px", marginBottom: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(90,55,20,0.08)", borderLeft: `4px solid ${C.wood}` }}>
          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: "10px", color: C.textLight, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>{m.icon} {m.meal}</div>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "15px", color: C.textDark }}>{m.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "22px", color: C.walnut }}>{m.calories}</div>
                <div style={{ fontFamily: font.body, fontSize: "9px", color: C.textMuted }}>kcal</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
              {[
                { l: "Protein", v: m.protein+"g", c: C.fern },
                { l: "Carbs",   v: m.carbs+"g",   c: C.teal },
                { l: "Fat",     v: m.fat+"g",     c: C.caramel },
              ].map((mc, j) => (
                <div key={j} style={{ flex: 1, background: C.bgDeep, borderRadius: "8px", padding: "7px 4px", textAlign: "center", border: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: font.mono, fontSize: "13px", fontWeight: "bold", color: mc.c }}>{mc.v}</div>
                  <div style={{ fontFamily: font.body, fontSize: "9px", color: C.textMuted }}>{mc.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px", color: C.textMuted, cursor: "pointer", fontFamily: font.body, fontSize: "11px", marginBottom: "10px" }}>
              {open === i ? "▲ Hide Details" : "▼ Ingredients & Instructions"}
            </button>
            {open === i && (
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.fern, fontSize: "12px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>🌿 Ingredients</div>
                {m.ingredients.map((ing, k) => (
                  <div key={k} style={{ fontFamily: font.body, fontSize: "12px", color: C.textMid, padding: "2px 0" }}>· {ing}</div>
                ))}
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.wood, fontSize: "12px", margin: "10px 0 6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>👨‍🍳 Method</div>
                <div style={{ fontFamily: font.body, fontSize: "12px", color: C.textMid, lineHeight: 1.65 }}>{m.instructions}</div>
              </div>
            )}
            <a href={m.video} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `linear-gradient(135deg, ${C.red}, #7a2a1a)`, color: "#fff", fontWeight: "bold", fontFamily: font.body, fontSize: "13px", padding: "11px", borderRadius: "10px", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
              ▶ Watch Cooking Video
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────
export default function PandoApp() {
  const [view, setView] = useState("home");
  const [logs, setLogs] = useState([]);

  return (
    <div style={{ minHeight: "100vh", background: C.bgPage, color: C.textDark, fontFamily: font.body }}>

      {/* Subtle wood-grain texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(139,107,60,0.04) 80px, rgba(139,107,60,0.04) 81px), repeating-linear-gradient(180deg, transparent, transparent 120px, rgba(139,107,60,0.03) 120px, rgba(139,107,60,0.03) 121px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1,
        background: `linear-gradient(160deg, ${C.fern} 0%, ${C.moss} 60%, ${C.bark} 100%)`,
        padding: "36px 20px 28px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* decorative leaf shapes */}
        <div style={{ position: "absolute", top: "-30px", left: "-30px", width: "140px", height: "140px", borderRadius: "50%", background: `${C.leafLight}22`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: `${C.latte}22`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20px", right: "30px", width: "60px", height: "60px", borderRadius: "50%", background: `${C.wood}22`, pointerEvents: "none" }} />

        <div style={{ display: "inline-block", background: `${C.latte}33`, border: `1px solid ${C.latteLight}66`, color: C.foam, fontWeight: "bold", fontSize: "10px", letterSpacing: "2.5px", padding: "4px 16px", borderRadius: "20px", marginBottom: "14px", textTransform: "uppercase", fontFamily: font.body }}>
          ☕ Wood · Latte · Wellness
        </div>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(28px,7vw,52px)", fontWeight: "bold", margin: "0 0 4px", color: C.foam, letterSpacing: "1px" }}>
          PANDO APP
        </h1>
        <p style={{ fontFamily: font.display, fontSize: "clamp(13px,2.5vw,16px)", color: C.latteLight, margin: "0 0 4px", fontStyle: "italic" }}>
          2-Month Transformation · 105kg → 88kg
        </p>
        <p style={{ fontFamily: font.body, fontSize: "12px", color: `${C.foam}99`, margin: 0, letterSpacing: "0.5px" }}>
          8 Weeks · Knee-Safe · 176cm · Fat Loss
        </p>
      </div>

      {/* Nav */}
      <div style={{ position: "relative", zIndex: 1, background: C.bgDark, borderBottom: `1px solid ${C.border}`, padding: "12px 14px" }}>
        <div style={{ display: "flex", gap: "10px", maxWidth: "680px", margin: "0 auto" }}>
          <NavBtn label="Progress"  icon="🌿" active={view === "home"}    onClick={() => setView("home")} />
          <NavBtn label="Workout"   icon="🏋️" active={view === "workout"} onClick={() => setView("workout")} />
          <NavBtn label="Food Plan" icon="☕" active={view === "food"}    onClick={() => setView("food")} />
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "18px 14px 80px" }}>
        {view === "home"    && <HomeView logs={logs} />}
        {view === "workout" && <WorkoutView onLog={e => setLogs(p => [...p, e])} logs={logs} />}
        {view === "food"    && <FoodView />}
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "20px 0 32px", borderTop: `1px solid ${C.border}`, background: C.bgDark }}>
        <div style={{ fontFamily: font.display, fontSize: "14px", color: C.wood, fontWeight: "bold" }}>PANDO APP 🌿</div>
        <div style={{ fontFamily: font.body, fontSize: "11px", color: C.textLight, marginTop: "3px" }}>Stay consistent · Trust the process · Grow every day</div>
      </div>
    </div>
  );
}
