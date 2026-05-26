"use client";
import { useState } from "react";

// ── Organic Palette ──────────────────────────────────────────────
const C = {
  bg:        "#0f1a0e",
  bgCard:    "#162014",
  bgDeep:    "#0b130a",
  border:    "#2a3d28",
  sage:      "#7aad6e",
  moss:      "#4a7a40",
  fern:      "#2d5e25",
  earth:     "#8b6b47",
  sand:      "#c9aa82",
  cream:     "#e8dfc8",
  bark:      "#3d2e1a",
  muted:     "#6b8264",
  white:     "#f0ede6",
  red:       "#c0392b",
  amber:     "#c97d30",
  teal:      "#3d8b7a",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
  mono: "'Courier New', monospace",
};

// ── Reusable Components ──────────────────────────────────────────
function ProgressRing({ pct, color, size = 80, label, value, unit }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={8} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }} />
      </svg>
      <div style={{ textAlign: "center", marginTop: "-4px" }}>
        <div style={{ fontFamily: font.display, fontSize: "13px", color: color, fontWeight: "bold" }}>{value}{unit}</div>
        <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted }}>{label}</div>
      </div>
    </div>
  );
}

function GreenBar({ pct, color }) {
  return (
    <div style={{ background: C.bgDeep, borderRadius: "20px", height: "8px", overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: "20px", transition: "width 0.8s ease" }} />
    </div>
  );
}

function InputField({ label, value, onChange, unit, min, max, step = 1, icon }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: C.muted, fontFamily: font.body, marginBottom: "5px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
        <span>{icon}</span>{label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "10px 14px", color: C.cream, fontSize: "16px", fontWeight: "700", fontFamily: font.display, outline: "none", width: "100%" }} />
        <span style={{ color: C.muted, fontSize: "12px", fontFamily: font.body, minWidth: "36px" }}>{unit}</span>
      </div>
    </div>
  );
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderRadius: "18px",
      padding: "22px",
      boxShadow: "0 4px 28px rgba(0,0,0,0.5)",
      borderLeft: accent ? `3px solid ${accent}` : undefined,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <h2 style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 26px)", fontWeight: "bold", color: C.cream, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{icon}</span>{title}
      </h2>
      {sub && <p style={{ fontFamily: font.body, fontSize: "13px", color: C.muted, margin: 0, paddingLeft: "36px" }}>{sub}</p>}
      <div style={{ width: "48px", height: "2px", background: `linear-gradient(90deg, ${C.sage}, transparent)`, borderRadius: "2px", marginTop: "10px", marginLeft: "36px" }} />
    </div>
  );
}

function NavButton({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1,
      background: active ? `linear-gradient(135deg, ${C.fern}, ${C.moss})` : C.bgDeep,
      border: `1px solid ${active ? C.moss : C.border}`,
      borderRadius: "14px",
      padding: "14px 8px",
      color: active ? C.cream : C.muted,
      fontFamily: font.display,
      fontWeight: active ? "bold" : "normal",
      fontSize: "clamp(12px, 2vw, 14px)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      transition: "all 0.3s ease",
      boxShadow: active ? `0 4px 16px ${C.fern}55` : "none",
    }}>
      <span style={{ fontSize: "20px" }}>{icon}</span>
      {label}
    </button>
  );
}

// ── Data ─────────────────────────────────────────────────────────
const workoutWeeks = [
  {
    week: "Week 1–2", theme: "Foundation & Gentle Activation",
    days: [
      { day: "Monday",    icon: "🚶", name: "Brisk Walk",         details: "30 min flat walk, moderate pace, focus on posture",           link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Tuesday",   icon: "💪", name: "Upper Body",         details: "Seated dumbbell press, lateral raises, curls — 3×12",         link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", icon: "🧘", name: "Core & Mobility",    details: "Dead bugs, bird dogs, planks 20s, hip circles — 3 rounds",    link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday",  icon: "🚴", name: "Bike Rehab",         details: "25 min low resistance stationary bike — zero knee strain",     link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday",    icon: "🏋️", name: "Upper + Core",      details: "Push-ups (modified), dumbbell rows, Russian twists — 3×10",   link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday",  icon: "🌿", name: "Long Walk",          details: "45 min light outdoor walk, enjoy nature",                     link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday",    icon: "😴", name: "Rest & Recovery",    details: "Full rest, light stretching, foam roll upper back",            link: "" },
    ],
  },
  {
    week: "Week 3–4", theme: "Momentum Building",
    days: [
      { day: "Monday",    icon: "📈", name: "Incline Treadmill",  details: "35 min, 4–6% incline, builds glutes without knee stress",     link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday",   icon: "💥", name: "Upper Body Power",   details: "Chest press, cable rows, lat pulldowns, skull crushers 4×10", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", icon: "🔥", name: "Core Blast",         details: "Plank 30s, reverse crunches, mountain climbers (slow) 4 rds", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday",  icon: "🚴", name: "Bike + Mobility",    details: "30 min bike + 15 min hip flexor & hamstring stretches",       link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday",    icon: "🏋️", name: "Full Upper Body",   details: "Arnold press, face pulls, dips (assisted), curls — 3×12",     link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday",  icon: "🏞️", name: "Nature Walk/Hike",  details: "50 min outdoor flat terrain hike or park walk",               link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday",    icon: "🛁", name: "Active Recovery",    details: "Yoga flow, contrast shower, target 8h sleep",                 link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
  {
    week: "Week 5–6", theme: "Fat Burn Acceleration",
    days: [
      { day: "Monday",    icon: "⚡", name: "Incline Intervals",  details: "40 min: 3 min 5% / 1 min 8% alternating incline cardio",     link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday",   icon: "💪", name: "Push Day",           details: "Chest press, shoulder press, incline push-ups, triceps 4×12", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", icon: "🔄", name: "Core + Cardio",      details: "3 rds: 1 min plank, 20 crunches, 20 twists, 10 min bike",    link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday",  icon: "🏋️", name: "Pull Day",          details: "Lat pulldown, cable row, face pulls, hammer curls 4×10",     link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Friday",    icon: "🚴", name: "Bike + Core",        details: "35 min bike + 20 min targeted core work",                    link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Saturday",  icon: "🌿", name: "Long Walk + Stretch", details: "60 min brisk walk + 15 min full-body stretch",              link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday",    icon: "😴", name: "Rest",               details: "Complete rest. Prep meals. Journal your progress.",           link: "" },
    ],
  },
  {
    week: "Week 7–8", theme: "Peak & Consolidation",
    days: [
      { day: "Monday",    icon: "🏔️", name: "Power Walk",        details: "45 min, 6–8% incline, fast pace — max calorie burn",         link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday",   icon: "🏆", name: "Strength Max",       details: "Heavy dumbbell: chest, back, shoulders superset 4×8-10",     link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", icon: "🔥", name: "Core Endurance",     details: "5 rds: 45s plank, 15 leg raises, 20 bicycle crunches",       link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday",  icon: "⚡", name: "Bike HIIT",          details: "30 min: 1 min hard / 2 min easy intervals on bike",          link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday",    icon: "💥", name: "Full Body Upper",    details: "Compound: rows, press, pull, curl, extend — 4 circuit rds",  link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday",  icon: "🎯", name: "Victory Walk",       details: "60+ min outdoor walk — take progress photos!",               link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday",    icon: "✨", name: "Reflect & Reset",    details: "Yoga, meditation, meal prep, measure your results",          link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
];

const meals = [
  {
    meal: "Breakfast", icon: "🌅", name: "Protein Oats Bowl",
    calories: 420, protein: 32, carbs: 45, fat: 10,
    ingredients: ["80g rolled oats", "1 scoop vanilla protein", "200ml almond milk", "1 banana", "1 tbsp almond butter", "Cinnamon"],
    instructions: "Cook oats in almond milk 5 min. Off heat, stir in protein. Top with sliced banana, almond butter, cinnamon.",
    video: "https://www.youtube.com/watch?v=kd3goxFqbJA",
  },
  {
    meal: "Lunch", icon: "☀️", name: "Grilled Chicken & Quinoa Bowl",
    calories: 520, protein: 48, carbs: 42, fat: 12,
    ingredients: ["180g chicken breast", "80g quinoa", "100g cherry tomatoes", "50g cucumber", "30g feta", "Olive oil, lemon, oregano"],
    instructions: "Season chicken, grill 6 min per side. Cook quinoa. Assemble bowl with veggies, feta, drizzle oil and lemon.",
    video: "https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal: "Dinner", icon: "🌙", name: "Baked Salmon & Roasted Veg",
    calories: 480, protein: 44, carbs: 22, fat: 22,
    ingredients: ["200g salmon fillet", "150g broccoli", "100g sweet potato", "2 garlic cloves", "Olive oil", "Lemon, dill"],
    instructions: "200°C oven. Roast veg 20 min. Add salmon with garlic, lemon, dill. Bake 12–15 min until flaky.",
    video: "https://www.youtube.com/watch?v=M_a_HcNADP4",
  },
  {
    meal: "Snack 1", icon: "🍎", name: "Greek Yogurt & Berries",
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
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
];

// ── HOME VIEW ────────────────────────────────────────────────────
function HomeView() {
  const [weight, setWeight] = useState(90);
  const [steps, setSteps]   = useState(5000);
  const [water, setWater]   = useState(1.5);
  const [sleep, setSleep]   = useState(6);
  const [qIdx, setQIdx]     = useState(0);

  const startW = 98, goalW = 80;
  const weightGoal = startW - goalW;
  const weightLost = Math.max(0, startW - weight);
  const behind = weight > startW - (weightGoal / 8) * 2;

  const totalCal   = meals.reduce((a, m) => a + m.calories, 0);
  const totalProt  = meals.reduce((a, m) => a + m.protein, 0);

  return (
    <div>
      {/* Warning */}
      {behind && (
        <div style={{ background: `${C.amber}18`, border: `1px solid ${C.amber}66`, borderRadius: "14px", padding: "14px 18px", marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "20px" }}>🍂</span>
          <span style={{ color: C.sand, fontSize: "13px", fontFamily: font.body }}>Weight progress may be behind schedule. Review your nutrition and increase daily movement.</span>
        </div>
      )}

      {/* Rings Row */}
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "14px", marginBottom: "16px", letterSpacing: "0.5px" }}>🌿 Today's Vitals</div>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "12px" }}>
          <ProgressRing pct={Math.min(100,(weightLost/weightGoal)*100)} color={C.sage}   size={80} label="kg lost"  value={weightLost.toFixed(1)} unit="kg" />
          <ProgressRing pct={Math.min(100,(steps/10000)*100)}           color={C.earth}  size={80} label="steps"    value={steps}                  unit="" />
          <ProgressRing pct={Math.min(100,(water/3)*100)}               color={C.teal}   size={80} label="hydration" value={water}                 unit="L" />
          <ProgressRing pct={Math.min(100,(sleep/8)*100)}               color={C.moss}   size={80} label="sleep"    value={sleep}                  unit="h" />
        </div>
      </Card>

      {/* Inputs */}
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "14px", marginBottom: "14px" }}>📝 Log Your Day</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <InputField label="Weight"   value={weight} onChange={setWeight} unit="kg"    min={50}  max={200} step={0.5} icon="⚖️" />
          <InputField label="Steps"    value={steps}  onChange={setSteps}  unit="steps" min={0}   max={20000} step={100} icon="👟" />
          <InputField label="Water"    value={water}  onChange={setWater}  unit="L"     min={0}   max={5}   step={0.1} icon="💧" />
          <InputField label="Sleep"    value={sleep}  onChange={setSleep}  unit="hrs"   min={0}   max={12}  step={0.5} icon="🌙" />
        </div>
      </Card>

      {/* Stats */}
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "14px", marginBottom: "14px" }}>🌱 Transformation Stats</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "14px" }}>
          {[
            { label: "Lost",    value: weightLost.toFixed(1)+"kg", color: C.sage },
            { label: "To Go",   value: Math.max(0,weightGoal-weightLost).toFixed(1)+"kg", color: C.earth },
            { label: "Done",    value: Math.round((weightLost/weightGoal)*100)+"%", color: C.teal },
          ].map((s,i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "12px", padding: "12px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: font.display, fontSize: "20px", fontWeight: "bold", color: s.color }}>{s.value}</div>
              <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, marginBottom: "6px" }}>Daily Calories Target</div>
        <GreenBar pct={100} color={C.fern} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontFamily: font.mono, fontSize: "11px", color: C.sage }}>{totalCal} kcal / day</span>
          <span style={{ fontFamily: font.mono, fontSize: "11px", color: C.earth }}>{totalProt}g protein</span>
        </div>
      </Card>

      {/* Knee Safety */}
      <Card style={{ marginBottom: "20px", background: `${C.bark}99`, border: `1px solid ${C.earth}55` }}>
        <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sand, fontSize: "14px", marginBottom: "12px" }}>🦵 Knee Safety Protocol</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {[
            { icon: "🚫", t: "No Deep Squats",  d: "Nothing below 90°", color: C.red },
            { icon: "🚫", t: "No Jumping",       d: "Zero impact moves",  color: C.red },
            { icon: "🚫", t: "Stop Sharp Pain",  d: "Rest & ice at once", color: C.red },
            { icon: "✅", t: "Bike & Walk Only", d: "Low-impact always",  color: C.sage },
            { icon: "✅", t: "Always Warm Up",   d: "5–10 min light move",color: C.sage },
            { icon: "✅", t: "Ice After Session",d: "10–15 min ice pack", color: C.sage },
          ].map((k,i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "16px", marginBottom: "3px" }}>{k.icon}</div>
              <div style={{ fontFamily: font.display, fontSize: "12px", fontWeight: "bold", color: k.color }}>{k.t}</div>
              <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted }}>{k.d}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivation */}
      <Card style={{ background: `linear-gradient(135deg, ${C.fern}22, ${C.bgCard})`, border: `1px solid ${C.sage}33`, textAlign: "center" }}>
        <div style={{ fontFamily: font.display, fontSize: "clamp(16px,3vw,20px)", fontStyle: "italic", color: C.cream, lineHeight: 1.6, marginBottom: "12px" }}>
          "{quotes[qIdx].text}"
        </div>
        <div style={{ fontFamily: font.body, fontSize: "13px", color: C.muted, marginBottom: "16px" }}>— {quotes[qIdx].author}</div>
        <button onClick={() => setQIdx((qIdx+1)%quotes.length)} style={{ background: `linear-gradient(135deg, ${C.moss}, ${C.fern})`, color: C.cream, border: "none", borderRadius: "10px", padding: "9px 20px", fontFamily: font.body, fontSize: "13px", cursor: "pointer", fontWeight: "bold" }}>
          🌿 Next Quote
        </button>
      </Card>
    </div>
  );
}

// ── WORKOUT VIEW ─────────────────────────────────────────────────
function WorkoutView() {
  const [openWeek, setOpenWeek] = useState(0);
  return (
    <div>
      <SectionTitle icon="🏋️" title="8-Week Workout Plan" sub="Tap a week to expand · All exercises are knee-safe" />
      {workoutWeeks.map((wk, wi) => (
        <div key={wi} style={{ marginBottom: "10px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden" }}>
          <button onClick={() => setOpenWeek(openWeek === wi ? -1 : wi)} style={{
            width: "100%", background: openWeek === wi ? `linear-gradient(90deg, ${C.fern}33, transparent)` : "transparent",
            border: "none", padding: "18px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: C.cream,
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "15px", color: C.sage }}>{wk.week}</div>
              <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted }}>{wk.theme}</div>
            </div>
            <span style={{ color: C.sage, fontSize: "18px", transform: openWeek === wi ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
          </button>
          {openWeek === wi && (
            <div style={{ padding: "0 12px 12px" }}>
              {wk.days.map((d, di) => (
                <div key={di} style={{ background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "12px 14px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "13px", color: C.sand }}>{d.icon} {d.day}</div>
                    <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "14px", color: C.cream, margin: "2px 0" }}>{d.name}</div>
                    <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted }}>{d.details}</div>
                  </div>
                  {d.link && (
                    <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ background: C.red, color: "#fff", fontWeight: "bold", fontSize: "11px", padding: "6px 12px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>
                      ▶ Watch
                    </a>
                  )}
                </div>
              ))}
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
  const totalCal  = meals.reduce((a,m) => a+m.calories, 0);
  const totalProt = meals.reduce((a,m) => a+m.protein,  0);
  const totalCarb = meals.reduce((a,m) => a+m.carbs,    0);
  const totalFat  = meals.reduce((a,m) => a+m.fat,      0);

  return (
    <div>
      <SectionTitle icon="🥗" title="Fat-Loss Meal Plan" sub="High protein · Calorie controlled · Easy to prepare" />

      {/* Totals */}
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "13px", marginBottom: "12px" }}>📊 Daily Nutritional Totals</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {[
            { l: "Calories", v: totalCal+"kcal", c: C.sand },
            { l: "Protein",  v: totalProt+"g",   c: C.sage },
            { l: "Carbs",    v: totalCarb+"g",   c: C.teal },
            { l: "Fat",      v: totalFat+"g",    c: C.earth },
          ].map((t,i) => (
            <div key={i} style={{ background: C.bgDeep, borderRadius: "10px", padding: "10px 6px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: font.display, fontSize: "14px", fontWeight: "bold", color: t.c }}>{t.v}</div>
              <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted }}>{t.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Meals */}
      {meals.map((m, i) => (
        <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", marginBottom: "12px", overflow: "hidden", borderTop: `3px solid ${C.moss}` }}>
          <div style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <div style={{ fontFamily: font.body, fontSize: "11px", color: C.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{m.icon} {m.meal}</div>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "15px", color: C.cream }}>{m.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", fontSize: "20px", color: C.sand }}>{m.calories}</div>
                <div style={{ fontFamily: font.body, fontSize: "10px", color: C.muted }}>kcal</div>
              </div>
            </div>

            {/* Macros */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
              {[
                { l: "Protein", v: m.protein+"g", c: C.sage },
                { l: "Carbs",   v: m.carbs+"g",   c: C.teal },
                { l: "Fat",     v: m.fat+"g",     c: C.earth },
              ].map((mc,j) => (
                <div key={j} style={{ flex: 1, background: C.bgDeep, borderRadius: "8px", padding: "6px 4px", textAlign: "center" }}>
                  <div style={{ fontFamily: font.mono, fontSize: "13px", fontWeight: "bold", color: mc.c }}>{mc.v}</div>
                  <div style={{ fontFamily: font.body, fontSize: "9px", color: C.muted }}>{mc.l}</div>
                </div>
              ))}
            </div>

            {/* Toggle button */}
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: C.bgDeep, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "8px", color: C.muted, cursor: "pointer", fontFamily: font.body, fontSize: "12px", marginBottom: "10px" }}>
              {open === i ? "▲ Hide Details" : "▼ Show Ingredients & Instructions"}
            </button>

            {/* Expanded */}
            {open === i && (
              <div style={{ marginBottom: "10px" }}>
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "12px", marginBottom: "6px" }}>🌿 Ingredients</div>
                {m.ingredients.map((ing, k) => (
                  <div key={k} style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, padding: "2px 0" }}>· {ing}</div>
                ))}
                <div style={{ fontFamily: font.display, fontWeight: "bold", color: C.sage, fontSize: "12px", margin: "10px 0 6px" }}>👨‍🍳 How to Prepare</div>
                <div style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, lineHeight: 1.6 }}>{m.instructions}</div>
              </div>
            )}

            {/* Video Button */}
            <a href={m.video} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              background: `linear-gradient(135deg, ${C.red}, #a93226)`,
              color: "#fff", fontWeight: "bold", fontFamily: font.body,
              fontSize: "13px", padding: "11px", borderRadius: "10px",
              textDecoration: "none", width: "100%", boxSizing: "border-box",
            }}>
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

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.white, fontFamily: font.body }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(180deg, ${C.fern}22 0%, transparent 100%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: "36px 20px 28px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative rings */}
        <div style={{ position: "absolute", top: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", border: `1px solid ${C.fern}33`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", border: `1px solid ${C.moss}33`, pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: `linear-gradient(90deg, ${C.moss}, ${C.fern})`, color: C.cream, fontWeight: "bold", fontSize: "10px", letterSpacing: "2.5px", padding: "4px 14px", borderRadius: "20px", marginBottom: "12px", textTransform: "uppercase", fontFamily: font.body }}>
          🌱 Organic Fitness Dashboard
        </div>
        <h1 style={{ fontFamily: font.display, fontSize: "clamp(28px, 6vw, 52px)", fontWeight: "bold", margin: "0 0 6px", color: C.cream, letterSpacing: "-0.5px" }}>
          PANDO APP
        </h1>
        <p style={{ fontFamily: font.display, fontSize: "clamp(13px, 2vw, 16px)", color: C.sage, margin: "0 0 4px", fontStyle: "italic" }}>
          2-Month Transformation Dashboard
        </p>
        <p style={{ fontFamily: font.body, fontSize: "12px", color: C.muted, margin: 0 }}>8 Weeks · Knee-Safe · Fat Loss · Strength</p>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: "flex", gap: "10px", padding: "16px 16px 0", maxWidth: "680px", margin: "0 auto" }}>
        <NavButton label="Progress"  icon="🌿" active={view === "home"}    onClick={() => setView("home")} />
        <NavButton label="Workout"   icon="🏋️" active={view === "workout"} onClick={() => setView("workout")} />
        <NavButton label="Food Plan" icon="🥗" active={view === "food"}    onClick={() => setView("food")} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "20px 16px 80px" }}>
        {view === "home"    && <HomeView />}
        {view === "workout" && <WorkoutView />}
        {view === "food"    && <FoodView />}
      </div>
    </div>
  );
}
