"use client";
import { useState } from "react";

// ── Wood-Latte Palette ───────────────────────────────────────────
const C = {
  bg:        "#1a1108",
  bgCard:    "#231a0d",
  bgDeep:    "#160e05",
  bgLight:   "#2e2010",
  border:    "#3d2c14",
  borderHi:  "#5c4220",
  latte:     "#c8a876",
  latteLight:"#dfc49a",
  latteDark: "#9a7a50",
  cream:     "#f0e6d3",
  espresso:  "#3d1f0a",
  mocha:     "#6b3d1a",
  caramel:   "#b87333",
  walnut:    "#7b4f2a",
  bark:      "#4a2d0f",
  wood:      "#8b5e3c",
  foam:      "#e8d5b5",
  muted:     "#7a6045",
  mutedHi:   "#9a8060",
  white:     "#faf4ec",
  red:       "#a0432a",
  green:     "#5a7a3a",
  teal:      "#4a7060",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
  mono:    "'Courier New', monospace",
};

// ── Personal Stats ───────────────────────────────────────────────
const PERSONAL = {
  startWeight: 105,
  goalWeight:  88,
  height:      176,
  startDate:   "2025-06-01",
};

const bmi = (w) => (w / ((PERSONAL.height / 100) ** 2)).toFixed(1);
const bmiLabel = (b) => b < 18.5 ? "Underweight" : b < 25 ? "Healthy" : b < 30 ? "Overweight" : "Obese";

// ── Reusable Components ──────────────────────────────────────────
function ProgressRing({ pct, color, size = 80, label, value, unit }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(100, pct) / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={7} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: font.mono, fontSize: "11px", fontWeight: "bold", color: color }}>{Math.round(pct)}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: font.display, fontSize: "13px", color: C.latteLight, fontWeight: "bold" }}>{value}{unit}</div>
        <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted }}>{label}</div>
      </div>
    </div>
  );
}

function WoodBar({ pct, color, height = 8 }) {
  return (
    <div style={{ background: C.bgDeep, borderRadius: "20px", height, overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}bb)`, borderRadius: "20px", transition: "width 0.8s ease" }} />
    </div>
  );
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "0 6px 32px rgba(0,0,0,0.5)",
      borderTop: accent ? `2px solid ${accent}` : undefined,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ text, color }) {
  return (
    <div style={{ fontFamily: font.body, fontSize: "11px", color: color || C.muted, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ flex: 1, height: "1px", background: C.border }} />
      {text}
      <div style={{ flex: 1, height: "1px", background: C.border }} />
    </div>
  );
}

function NavButton({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1,
      background: active ? `linear-gradient(160deg, ${C.walnut}, ${C.mocha})` : C.bgDeep,
      border: `1px solid ${active ? C.caramel : C.border}`,
      borderRadius: "14px",
      padding: "13px 6px",
      color: active ? C.cream : C.muted,
      fontFamily: font.display,
      fontWeight: active ? "bold" : "normal",
      fontSize: "clamp(11px, 2vw, 13px)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      transition: "all 0.25s ease",
      boxShadow: active ? `0 4px 20px ${C.mocha}66` : "none",
      letterSpacing: "0.3px",
    }}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      {label}
    </button>
  );
}

// ── Workout & Meal Data ──────────────────────────────────────────
const workoutWeeks = [
  {
    week: "Week 1–2", theme: "Foundation & Gentle Activation", color: C.green,
    days: [
      { day: "Mon", icon: "🚶", name: "Brisk Walk",       details: "30 min flat walk, moderate pace, focus on posture",            link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Tue", icon: "💪", name: "Upper Body",        details: "Seated dumbbell press, lateral raises, curls — 3×12",          link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🧘", name: "Core & Mobility",   details: "Dead bugs, bird dogs, planks 20s, hip circles — 3 rounds",     link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🚴", name: "Bike Rehab",        details: "25 min low resistance stationary bike — zero knee strain",      link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "🏋️", name: "Upper + Core",     details: "Push-ups (modified), dumbbell rows, Russian twists — 3×10",    link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🌿", name: "Long Walk",         details: "45 min light outdoor walk, enjoy nature",                      link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "😴", name: "Rest & Recovery",   details: "Full rest, light stretching, foam roll upper back",             link: "" },
    ],
  },
  {
    week: "Week 3–4", theme: "Momentum Building", color: C.caramel,
    days: [
      { day: "Mon", icon: "📈", name: "Incline Treadmill", details: "35 min, 4–6% incline, builds glutes without knee stress",      link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "💥", name: "Upper Body Power",  details: "Chest press, cable rows, lat pulldowns, skull crushers 4×10",  link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔥", name: "Core Blast",        details: "Plank 30s, reverse crunches, mountain climbers (slow) 4 rds",  link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🚴", name: "Bike + Mobility",   details: "30 min bike + 15 min hip flexor & hamstring stretches",        link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "🏋️", name: "Full Upper Body",  details: "Arnold press, face pulls, dips (assisted), curls — 3×12",      link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🏞️", name: "Nature Walk",      details: "50 min outdoor flat terrain hike or park walk",                link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "🛁", name: "Active Recovery",   details: "Yoga flow, contrast shower, target 8h sleep",                  link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
  {
    week: "Week 5–6", theme: "Fat Burn Acceleration", color: C.latte,
    days: [
      { day: "Mon", icon: "⚡", name: "Incline Intervals", details: "40 min: 3 min 5% / 1 min 8% alternating incline cardio",      link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "💪", name: "Push Day",          details: "Chest press, shoulder press, incline push-ups, triceps 4×12",  link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔄", name: "Core + Cardio",     details: "3 rds: 1 min plank, 20 crunches, 20 twists, 10 min bike",     link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "🏋️", name: "Pull Day",         details: "Lat pulldown, cable row, face pulls, hammer curls 4×10",      link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Fri", icon: "🚴", name: "Bike + Core",       details: "35 min bike + 20 min targeted core work",                     link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Sat", icon: "🌿", name: "Long Walk + Stretch",details:"60 min brisk walk + 15 min full-body stretch",                link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "😴", name: "Rest",              details: "Complete rest. Prep meals. Journal your progress.",            link: "" },
    ],
  },
  {
    week: "Week 7–8", theme: "Peak & Consolidation", color: C.wood,
    days: [
      { day: "Mon", icon: "🏔️", name: "Power Walk",       details: "45 min, 6–8% incline, fast pace — max calorie burn",          link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tue", icon: "🏆", name: "Strength Max",      details: "Heavy dumbbell: chest, back, shoulders superset 4×8-10",      link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wed", icon: "🔥", name: "Core Endurance",    details: "5 rds: 45s plank, 15 leg raises, 20 bicycle crunches",        link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thu", icon: "⚡", name: "Bike HIIT",         details: "30 min: 1 min hard / 2 min easy intervals on bike",           link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Fri", icon: "💥", name: "Full Body Upper",   details: "Compound: rows, press, pull, curl, extend — 4 circuit rds",   link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Sat", icon: "🎯", name: "Victory Walk",      details: "60+ min outdoor walk — take progress photos!",                link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sun", icon: "✨", name: "Reflect & Reset",   details: "Yoga, meditation, meal prep, measure your results",           link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
];

const meals = [
  {
    meal: "Breakfast", icon: "☕", name: "Protein Oats Bowl",
    calories: 420, protein: 32, carbs: 45, fat: 10,
    ingredients: ["80g rolled oats", "1 scoop vanilla protein", "200ml almond milk", "1 banana", "1 tbsp almond butter", "Cinnamon"],
    instructions: "Cook oats in almond milk 5 min. Off heat, stir in protein. Top with banana, almond butter, cinnamon.",
    video: "https://www.youtube.com/watch?v=kd3goxFqbJA",
  },
  {
    meal: "Lunch", icon: "🍗", name: "Grilled Chicken & Quinoa",
    calories: 520, protein: 48, carbs: 42, fat: 12,
    ingredients: ["180g chicken breast", "80g quinoa", "100g cherry tomatoes", "50g cucumber", "30g feta", "Olive oil, lemon, oregano"],
    instructions: "Season chicken, grill 6 min per side. Cook quinoa. Assemble bowl with veggies, feta, drizzle oil and lemon.",
    video: "https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal: "Dinner", icon: "🐟", name: "Baked Salmon & Roasted Veg",
    calories: 480, protein: 44, carbs: 22, fat: 22,
    ingredients: ["200g salmon fillet", "150g broccoli", "100g sweet potato", "2 garlic cloves", "Olive oil", "Lemon, dill"],
    instructions: "200°C oven. Roast veg 20 min. Add salmon with garlic, lemon, dill. Bake 12–15 min until flaky.",
    video: "https://www.youtube.com/watch?v=M_a_HcNADP4",
  },
  {
    meal: "Snack 1", icon: "🥛", name: "Greek Yogurt & Berries",
    calories: 180, protein: 18, carbs: 20, fat: 3,
    ingredients: ["200g Greek yogurt 0%", "80g mixed berries", "1 tsp honey", "1 tbsp chia seeds"],
    instructions: "Layer yogurt in bowl. Top with berries, honey, chia seeds. Can prep night before.",
    video: "https://www.youtube.com/watch?v=xGrC_vHH3oU",
  },
  {
    meal: "Snack 2", icon: "🥜", name: "Protein Shake & Almonds",
    calories: 220, protein: 26, carbs: 8, fat: 10,
    ingredients: ["1 scoop chocolate protein", "250ml almond milk", "20g raw almonds"],
    instructions: "Shake protein with liquid. Pair with almonds. Great post-workout or evening snack.",
    video: "https://www.youtube.com/watch?v=Yz4hDgk_3iU",
  },
];

const quotes = [
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Like a tree, grow stronger through every storm.", author: "Unknown" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Take care of your body. It is the only place you have to live.", author: "Jim Rohn" },
  { text: "Every day is a new ring in your tree. Make it count.", author: "Unknown" },
];

// ── HOME VIEW ────────────────────────────────────────────────────
function HomeView({ logs }) {
  const [qIdx, setQIdx] = useState(0);

  const startW = PERSONAL.startWeight;
  const goalW  = PERSONAL.goalWeight;
  const weightRange = startW - goalW;

  // Latest weight from logs or start
  const latestWeight = logs.length > 0 ? logs[logs.length - 1].weight : startW;
  const weightLost   = Math.max(0, startW - latestWeight);
  const weightPct    = Math.min(100, (weightLost / weightRange) * 100);

  // Total workouts done
  const totalDone    = logs.length;
  const totalPlanned = workoutWeeks.reduce((a, w) => a + w.days.filter(d => d.name !== "Rest & Recovery" && d.name !== "Rest" && d.name !== "Active Recovery").length, 0);
  const workoutPct   = Math.min(100, (totalDone / totalPlanned) * 100);

  // Steps & water averages from logs
  const avgSteps = logs.length > 0 ? Math.round(logs.reduce((a, l) => a + (l.steps || 0), 0) / logs.length) : 0;
  const avgWater = logs.length > 0 ? (logs.reduce((a, l) => a + (l.water || 0), 0) / logs.length).toFixed(1) : 0;
  const avgSleep = logs.length > 0 ? (logs.reduce((a, l) => a + (l.sleep || 0), 0) / logs.length).toFixed(1) : 0;

  const currentBMI = bmi(latestWeight);
  const behind = latestWeight > startW - (weightRange / 8) * 2 && logs.length > 5;

  return (
    <div>
      {/* Personal Card */}
      <Card accent={C.latte} style={{ marginBottom: "16px" }}>
        <SectionLabel text="Your Profile" color={C.latteDark} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { l: "Start Weight", v: startW+"kg",       c: C.caramel },
            { l: "Goal Weight",  v: goalW+"kg",        c: C.green },
            { l: "Height",       v: PERSONAL.height+"cm", c: C.latte },
            { l: "BMI Now",      v: `${currentBMI} · ${bmiLabel(parseFloat(currentBMI))}`, c: parseFloat(currentBMI) < 25 ? C.green : C.caramel },
            { l: "Current Weight",v: latestWeight+"kg", c: C.latteLight },
            { l: "Lost So Far",  v: weightLost.toFixed(1)+"kg", c: C.green },
          ].map((s, i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px 12px", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.l}</div>
              <div style={{ fontFamily: font.display, fontSize: "15px", fontWeight: "bold", color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Warning */}
      {behind && (
        <div style={{ background: `${C.caramel}18`, border: `1px solid ${C.caramel}55`, borderRadius: "14px", padding: "12px 16px", marginBottom: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "18px" }}>🍂</span>
          <span style={{ color: C.latteLight, fontSize: "12px", fontFamily: font.body, lineHeight: 1.5 }}>Weight loss may be behind schedule. Review nutrition and increase daily movement.</span>
        </div>
      )}

      {/* Progress Rings */}
      <Card accent={C.walnut} style={{ marginBottom: "16px" }}>
        <SectionLabel text="Overall Progress" color={C.latteDark} />
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "16px" }}>
          <ProgressRing pct={weightPct}   color={C.latte}   size={80} label="weight goal" value={weightLost.toFixed(1)} unit="kg" />
          <ProgressRing pct={workoutPct}  color={C.caramel} size={80} label="workouts"    value={totalDone}              unit="" />
          <ProgressRing pct={Math.min(100,(avgSteps/10000)*100)} color={C.wood} size={80} label="avg steps" value={avgSteps} unit="" />
          <ProgressRing pct={Math.min(100,(parseFloat(avgWater)/3)*100)} color={C.teal} size={80} label="avg water" value={avgWater} unit="L" />
        </div>
      </Card>

      {/* Workout Log Sheet */}
      <Card accent={C.wood} style={{ marginBottom: "16px" }}>
        <SectionLabel text="Workout Log Sheet" color={C.latteDark} />
        {logs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: C.muted, fontFamily: font.body, fontSize: "13px", fontStyle: "italic" }}>
            No workouts logged yet. Complete a workout and log it in the Workout tab!
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font.body, fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["#", "Date", "Workout", "Weight", "Steps", "Water", "Sleep", "Feel"].map(h => (
                    <th key={h} style={{ padding: "8px 6px", color: C.muted, fontWeight: "normal", textAlign: "left", whiteSpace: "nowrap", letterSpacing: "0.5px", fontSize: "10px", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.bgDeep}`, background: i % 2 === 0 ? C.bgDeep+"44" : "transparent" }}>
                    <td style={{ padding: "8px 6px", color: C.muted }}>{logs.length - i}</td>
                    <td style={{ padding: "8px 6px", color: C.latteLight, whiteSpace: "nowrap" }}>{log.date}</td>
                    <td style={{ padding: "8px 6px", color: C.cream, fontWeight: "bold" }}>{log.workoutName}</td>
                    <td style={{ padding: "8px 6px", color: C.caramel }}>{log.weight}kg</td>
                    <td style={{ padding: "8px 6px", color: C.wood }}>{log.steps}</td>
                    <td style={{ padding: "8px 6px", color: C.teal }}>{log.water}L</td>
                    <td style={{ padding: "8px 6px", color: C.latte }}>{log.sleep}h</td>
                    <td style={{ padding: "8px 6px", fontSize: "16px" }}>{log.feel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats summary */}
        {logs.length > 0 && (
          <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {[
              { l: "Sessions Done", v: totalDone, c: C.caramel },
              { l: "kg Lost",       v: weightLost.toFixed(1), c: C.green },
              { l: "Avg Sleep",     v: avgSleep+"h", c: C.latte },
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px", textAlign: "center", border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: font.display, fontSize: "18px", fontWeight: "bold", color: s.c }}>{s.v}</div>
                <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted }}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Knee Safety */}
      <Card accent={C.bark} style={{ marginBottom: "16px" }}>
        <SectionLabel text="Knee Safety Protocol" color={C.latteDark} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { icon: "🚫", t: "No Deep Squats",   d: "Nothing below 90°",   c: C.red },
            { icon: "🚫", t: "No Jumping",        d: "Zero impact moves",   c: C.red },
            { icon: "🚫", t: "Stop Sharp Pain",   d: "Rest & ice at once",  c: C.red },
            { icon: "✅", t: "Bike & Walk Only",  d: "Low-impact always",   c: C.green },
            { icon: "✅", t: "Always Warm Up",    d: "5–10 min light move", c: C.green },
            { icon: "✅", t: "Ice After Session", d: "10–15 min ice pack",  c: C.green },
          ].map((k, i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "14px", marginBottom: "3px" }}>{k.icon}</div>
              <div style={{ fontFamily: font.display, fontSize: "11px", fontWeight: "bold", color: k.c }}>{k.t}</div>
              <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted }}>{k.d}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivation */}
      <Card style={{ background: `linear-gradient(160deg, ${C.espresso}, ${C.bgCard})`, border: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ fontFamily: font.display, fontSize: "clamp(15px,3vw,19px)", fontStyle: "italic", color: C.foam, lineHeight: 1.7, marginBottom: "12px" }}>
          "{quotes[qIdx].text}"
        </div>
        <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, marginBottom: "14px" }}>— {quotes[qIdx].author}</div>
        <button onClick={() => setQIdx((qIdx + 1) % quotes.length)} style={{ background: `linear-gradient(135deg, ${C.walnut}, ${C.bark})`, color: C.cream, border: "none", borderRadius: "10px", padding: "9px 20px", fontFamily: font.body, fontSize: "12px", cursor: "pointer" }}>
          ☕ Next
        </button>
      </Card>
    </div>
  );
}

// ── WORKOUT VIEW ─────────────────────────────────────────────────
function WorkoutView({ onLog, logs }) {
  const [openWeek, setOpenWeek]   = useState(0);
  const [logging,  setLogging]    = useState(null); // {weekIdx, dayIdx}
  const [form,     setForm]       = useState({ weight: PERSONAL.startWeight, steps: 5000, water: 2.0, sleep: 7, feel: "😊", notes: "" });

  const isDone = (wName) => logs.some(l => l.workoutName === wName);

  const submitLog = () => {
    if (!logging) return;
    const day = workoutWeeks[logging.wi].days[logging.di];
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    onLog({ date: today, workoutName: day.name, ...form });
    setLogging(null);
  };

  return (
    <div>
      <div style={{ fontFamily: font.display, fontSize: "clamp(18px,3vw,24px)", fontWeight: "bold", color: C.cream, marginBottom: "4px" }}>🏋️ 8-Week Plan</div>
      <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, marginBottom: "20px" }}>Tap a week → tap a workout → log it when done</div>

      {/* Log Modal */}
      {logging !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "24px", width: "100%", maxWidth: "360px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "16px", color: C.latte, marginBottom: "4px" }}>
              ✅ Log Completed Workout
            </div>
            <div style={{ fontFamily: font.body, fontSize: "13px", color: C.cream, marginBottom: "20px" }}>
              {workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}
            </div>

            {[
              { label: "Current Weight (kg)", key: "weight", min: 50,  max: 200, step: 0.5 },
              { label: "Steps Today",         key: "steps",  min: 0,   max: 30000, step: 100 },
              { label: "Water (L)",           key: "water",  min: 0,   max: 6, step: 0.1 },
              { label: "Sleep Last Night (h)", key: "sleep", min: 0,   max: 12, step: 0.5 },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: "12px" }}>
                <label style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.8px" }}>{f.label}</label>
                <input type="number" value={form[f.key]} min={f.min} max={f.max} step={f.step}
                  onChange={e => setForm({ ...form, [f.key]: Number(e.target.value) })}
                  style={{ width: "100%", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "10px 14px", color: C.cream, fontSize: "16px", fontFamily: font.display, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>How Did You Feel?</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["😴", "😐", "😊", "💪", "🔥"].map(e => (
                  <button key={e} onClick={() => setForm({ ...form, feel: e })}
                    style={{ flex: 1, fontSize: "20px", padding: "8px", borderRadius: "10px", border: `2px solid ${form.feel === e ? C.latte : C.border}`, background: form.feel === e ? C.espresso : C.bgDeep, cursor: "pointer" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setLogging(null)} style={{ flex: 1, background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "12px", color: C.muted, fontFamily: font.body, fontSize: "13px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={submitLog} style={{ flex: 2, background: `linear-gradient(135deg, ${C.walnut}, ${C.mocha})`, border: "none", borderRadius: "12px", padding: "12px", color: C.cream, fontFamily: font.display, fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                ✅ Save Log
              </button>
            </div>
          </div>
        </div>
      )}

      {workoutWeeks.map((wk, wi) => (
        <div key={wi} style={{ marginBottom: "10px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden" }}>
          <button onClick={() => setOpenWeek(openWeek === wi ? -1 : wi)} style={{
            width: "100%", background: openWeek === wi ? `linear-gradient(90deg, ${wk.color}22, transparent)` : "transparent",
            border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "14px", color: wk.color }}>{wk.week}</div>
              <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted }}>{wk.theme}</div>
            </div>
            <span style={{ color: wk.color, fontSize: "16px", transform: openWeek === wi ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
          </button>

          {openWeek === wi && (
            <div style={{ padding: "0 10px 10px" }}>
              {wk.days.map((d, di) => {
                const done = isDone(d.name);
                const isRest = !d.link;
                return (
                  <div key={di} style={{ background: done ? `${C.green}18` : C.bgDeep, border: `1px solid ${done ? C.green+"44" : C.border}`, borderRadius: "12px", padding: "12px 14px", marginBottom: "7px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, marginBottom: "2px" }}>{d.icon} {d.day}</div>
                        <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "14px", color: done ? C.green : C.cream }}>{d.name} {done ? "✓" : ""}</div>
                        <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, marginTop: "2px" }}>{d.details}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                        {d.link && (
                          <a href={d.link} target="_blank" rel="noopener noreferrer"
                            style={{ background: C.red, color: "#fff", fontWeight: "bold", fontSize: "11px", padding: "5px 10px", borderRadius: "7px", textDecoration: "none" }}>
                            ▶ Watch
                          </a>
                        )}
                        {!isRest && (
                          <button onClick={() => { setLogging({ wi, di }); setForm({ weight: PERSONAL.startWeight, steps: 5000, water: 2.0, sleep: 7, feel: "😊", notes: "" }); }}
                            style={{ background: done ? `${C.green}33` : `linear-gradient(135deg, ${C.walnut}, ${C.bark})`, border: `1px solid ${done ? C.green : C.caramel}`, color: done ? C.green : C.cream, fontWeight: "bold", fontSize: "11px", padding: "5px 10px", borderRadius: "7px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: font.body }}>
                            {done ? "✓ Logged" : "+ Log"}
                          </button>
                        )}
                      </div>
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
  const totalCal  = meals.reduce((a, m) => a + m.calories, 0);
  const totalProt = meals.reduce((a, m) => a + m.protein, 0);
  const totalCarb = meals.reduce((a, m) => a + m.carbs, 0);
  const totalFat  = meals.reduce((a, m) => a + m.fat, 0);

  return (
    <div>
      <div style={{ fontFamily: font.display, fontSize: "clamp(18px,3vw,24px)", fontWeight: "bold", color: C.cream, marginBottom: "4px" }}>🥗 Fat-Loss Meal Plan</div>
      <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, marginBottom: "20px" }}>High protein · Calorie controlled · Easy to prepare</div>

      {/* Daily Totals */}
      <Card accent={C.latte} style={{ marginBottom: "18px" }}>
        <SectionLabel text="Daily Nutritional Totals" color={C.latteDark} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px", marginBottom: "14px" }}>
          {[
            { l: "Calories", v: totalCal+"", suf: "kcal", c: C.latteLight },
            { l: "Protein",  v: totalProt+"", suf: "g",  c: C.green },
            { l: "Carbs",    v: totalCarb+"", suf: "g",  c: C.teal },
            { l: "Fat",      v: totalFat+"",  suf: "g",  c: C.caramel },
          ].map((t, i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px 6px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: font.display, fontSize: "16px", fontWeight: "bold", color: t.c }}>{t.v}</div>
              <div style={{ fontFamily: font.mono, fontSize: "9px", color: C.muted }}>{t.suf}</div>
              <div style={{ fontFamily: font.body, fontSize: "9px", color: C.muted }}>{t.l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, marginBottom: "6px" }}>Protein coverage</div>
        <WoodBar pct={(totalProt / 160) * 100} color={C.green} height={6} />
        <div style={{ fontFamily: font.mono, fontSize: "10px", color: C.muted, marginTop: "4px", textAlign: "right" }}>{totalProt}g / 160g target</div>
      </Card>

      {/* Meals */}
      {meals.map((m, i) => (
        <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", marginBottom: "12px", overflow: "hidden", borderLeft: `3px solid ${C.walnut}` }}>
          <div style={{ padding: "16px 16px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>{m.icon} {m.meal}</div>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "15px", color: C.cream }}>{m.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "22px", color: C.latte }}>{m.calories}</div>
                <div style={{ fontFamily: font.body, fontSize: "9px", color: C.muted }}>kcal</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
              {[
                { l: "Protein", v: m.protein+"g", c: C.green },
                { l: "Carbs",   v: m.carbs+"g",   c: C.teal },
                { l: "Fat",     v: m.fat+"g",     c: C.caramel },
              ].map((mc, j) => (
                <div key={j} style={{ flex: 1, background: C.bgDeep, borderRadius: "8px", padding: "7px 4px", textAlign: "center" }}>
                  <div style={{ fontFamily: font.mono, fontSize: "12px", fontWeight: "bold", color: mc.c }}>{mc.v}</div>
                  <div style={{ fontFamily: font.body, fontSize: "9px", color: C.muted }}>{mc.l}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px", color: C.muted, cursor: "pointer", fontFamily: font.body, fontSize: "11px", marginBottom: "10px" }}>
              {open === i ? "▲ Hide Details" : "▼ Ingredients & Instructions"}
            </button>

            {open === i && (
              <div style={{ marginBottom: "10px" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.latte, fontSize: "11px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>🌿 Ingredients</div>
                {m.ingredients.map((ing, k) => (
                  <div key={k} style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, padding: "2px 0" }}>· {ing}</div>
                ))}
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.latte, fontSize: "11px", margin: "10px 0 6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>👨‍🍳 Method</div>
                <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, lineHeight: 1.6 }}>{m.instructions}</div>
              </div>
            )}

            <a href={m.video} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `linear-gradient(135deg, ${C.red}, #7a2a1a)`, color: "#fff", fontWeight: "bold", fontFamily: font.body, fontSize: "12px", padding: "11px", borderRadius: "10px", textDecoration: "none", width: "100%", boxSizing: "border-box" }}>
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

  const addLog = (entry) => {
    setLogs(prev => [...prev, entry]);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.white, fontFamily: font.body }}>

      {/* Wood-grain texture overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(61,40,20,0.03) 60px, rgba(61,40,20,0.03) 61px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, background: `linear-gradient(180deg, ${C.espresso} 0%, ${C.bgDeep} 100%)`, borderBottom: `1px solid ${C.border}`, padding: "32px 20px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", left: "-40px", width: "160px", height: "160px", borderRadius: "50%", border: `1px solid ${C.walnut}22`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", border: `1px solid ${C.latte}22`, pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: `linear-gradient(90deg, ${C.walnut}, ${C.bark})`, color: C.foam, fontWeight: "bold", fontSize: "10px", letterSpacing: "2.5px", padding: "4px 14px", borderRadius: "20px", marginBottom: "12px", textTransform: "uppercase", fontFamily: font.body }}>
          ☕ Wood · Latte · Wellness
        </div>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(26px, 6vw, 48px)", fontWeight: "bold", margin: "0 0 4px", color: C.foam, letterSpacing: "-0.5px" }}>
          PANDO APP
        </h1>
        <p style={{ fontFamily: font.display, fontSize: "clamp(12px,2vw,15px)", color: C.latte, margin: "0 0 2px", fontStyle: "italic" }}>
          2-Month Transformation · 105kg → 88kg
        </p>
        <p style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, margin: 0 }}>8 Weeks · Knee-Safe · 176cm · Fat Loss</p>
      </div>

      {/* Nav */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "10px", padding: "14px 14px 0", maxWidth: "680px", margin: "0 auto" }}>
        <NavButton label="Progress"  icon="🌿" active={view === "home"}    onClick={() => setView("home")} />
        <NavButton label="Workout"   icon="🏋️" active={view === "workout"} onClick={() => setView("workout")} />
        <NavButton label="Food Plan" icon="☕" active={view === "food"}    onClick={() => setView("food")} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "18px 14px 80px" }}>
        {view === "home"    && <HomeView logs={logs} />}
        {view === "workout" && <WorkoutView onLog={addLog} logs={logs} />}
        {view === "food"    && <FoodView />}
      </div>
    </div>
  );
}
