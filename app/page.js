"use client";
import { useState } from "react";

const gold = "#F5C518";
const navy = "#0a0f1e";
const card = "#111827";
const cardBorder = "#1f2937";
const blue = "#3B82F6";
const green = "#10B981";
const red = "#EF4444";
const muted = "#6B7280";
const white = "#F9FAFB";

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0f172a 100%)`,
    color: white,
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "0 0 80px 0",
  },
  header: {
    background: `linear-gradient(180deg, rgba(245,197,24,0.08) 0%, transparent 100%)`,
    borderBottom: `1px solid ${cardBorder}`,
    padding: "48px 24px 40px",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: `linear-gradient(90deg, ${gold}, #e6a800)`,
    color: "#000",
    fontWeight: 800,
    fontSize: "11px",
    letterSpacing: "2px",
    padding: "4px 14px",
    borderRadius: "20px",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "clamp(32px, 6vw, 64px)",
    fontWeight: 900,
    margin: "0 0 8px",
    background: `linear-gradient(90deg, ${white}, ${gold})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: "clamp(14px, 2vw, 18px)",
    color: muted,
    margin: 0,
    letterSpacing: "0.5px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 16px",
  },
  sectionTitle: {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontWeight: 800,
    color: white,
    margin: "0 0 8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionSub: {
    color: muted,
    fontSize: "14px",
    margin: "0 0 24px",
  },
  card: {
    background: card,
    border: `1px solid ${cardBorder}`,
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  section: {
    marginTop: "48px",
  },
  goldLine: {
    width: "40px",
    height: "3px",
    background: `linear-gradient(90deg, ${gold}, transparent)`,
    borderRadius: "2px",
    marginBottom: "24px",
  },
};

function ProgressBar({ label, value, max, unit, color = blue, icon }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "14px", color: white, fontWeight: 600 }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: "13px", color: gold, fontWeight: 700 }}>
          {value} / {max} {unit}
        </span>
      </div>
      <div style={{ background: "#1f2937", borderRadius: "8px", height: "10px", overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            borderRadius: "8px",
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <div style={{ textAlign: "right", fontSize: "11px", color: muted, marginTop: "4px" }}>{pct}%</div>
    </div>
  );
}

function InputField({ label, value, onChange, unit, min, max, step = 1 }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "13px", color: muted, marginBottom: "6px", fontWeight: 600 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            flex: 1,
            background: "#1f2937",
            border: `1px solid ${cardBorder}`,
            borderRadius: "10px",
            padding: "10px 14px",
            color: white,
            fontSize: "16px",
            fontWeight: 700,
            outline: "none",
            width: "100%",
          }}
        />
        <span style={{ color: muted, fontSize: "13px", minWidth: "36px" }}>{unit}</span>
      </div>
    </div>
  );
}

const workoutWeeks = [
  {
    week: "Week 1–2",
    theme: "Foundation & Activation",
    days: [
      { day: "Monday", name: "Brisk Walking", icon: "🚶", details: "30 min brisk walk outdoors or treadmill, flat surface, moderate pace", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Tuesday", name: "Upper Body Strength", icon: "💪", details: "Seated dumbbell press, lateral raises, bicep curls, tricep extensions – 3 sets x 12 reps", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", name: "Core & Mobility", icon: "🧘", details: "Dead bugs, bird dogs, planks (20s), hip circles, seated stretches – 3 rounds", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday", name: "Stationary Bike Rehab", icon: "🚴", details: "Low resistance, 25 min at comfortable pace – zero knee strain protocol", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday", name: "Upper Body + Core", icon: "🏋️", details: "Push-ups (modified), dumbbell rows, shoulder press, Russian twists – 3 sets x 10", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday", name: "Long Walk", icon: "🌤️", details: "45 min light walk, focus on breathing and posture", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday", name: "Rest & Recovery", icon: "😴", details: "Full rest, light stretching, foam rolling calves and upper back", link: "" },
    ],
  },
  {
    week: "Week 3–4",
    theme: "Momentum Building",
    days: [
      { day: "Monday", name: "Incline Treadmill", icon: "📈", details: "35 min, 4–6% incline, moderate pace – great for glutes and cardio without knee stress", link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday", name: "Upper Body Power", icon: "💥", details: "Dumbbell chest press, cable rows, lat pulldowns, skull crushers – 4 sets x 10", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", name: "Core Blast", icon: "🔥", details: "Plank holds (30s), reverse crunches, mountain climbers (slow), leg raises – 4 rounds", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday", name: "Bike + Mobility", icon: "🚴", details: "30 min bike, then 15 min mobility: hip flexor stretch, hamstring stretch, thoracic rotation", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday", name: "Full Upper Body", icon: "🏋️", details: "Arnold press, pull-aparts, face pulls, dips (assisted), curls – 3 sets x 12", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday", name: "Outdoor Walk / Hike", icon: "🏞️", details: "50 min outdoor walk or gentle nature hike on flat terrain", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday", name: "Active Recovery", icon: "🛁", details: "Yoga flow, light stretching, contrast shower, 8+ hours sleep target", link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
  {
    week: "Week 5–6",
    theme: "Fat Burn Acceleration",
    days: [
      { day: "Monday", name: "Incline Intervals", icon: "⚡", details: "40 min: alternate 3 min at 5% incline, 1 min at 8% incline – interval cardio", link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday", name: "Push Day", icon: "💪", details: "Chest press, shoulder press, incline push-ups, lateral raises, tricep pushdowns – 4x12", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", name: "Core + Cardio Circuit", icon: "🔄", details: "3 rounds: 1 min plank, 20 reverse crunches, 20 seated twists, 10 min bike", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday", name: "Pull Day", icon: "🏋️", details: "Lat pulldown, seated cable row, face pulls, hammer curls, rear delt fly – 4x10", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Friday", name: "Bike + Core", icon: "🚴", details: "35 min bike moderate pace, then 20 min targeted core work", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Saturday", name: "Long Walk + Stretch", icon: "🌿", details: "60 min brisk walk, followed by 15 min full-body stretching routine", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday", name: "Rest", icon: "😴", details: "Complete rest. Prep meals for the week. Journaling and mindset work.", link: "" },
    ],
  },
  {
    week: "Week 7–8",
    theme: "Peak & Consolidation",
    days: [
      { day: "Monday", name: "Incline Power Walk", icon: "🏔️", details: "45 min, 6–8% incline, fast pace – maximum calorie burn cardio session", link: "https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day: "Tuesday", name: "Upper Body Strength Max", icon: "🏆", details: "Heavy dumbbell work: chest, back, shoulders superset – 4 sets x 8-10 reps", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Wednesday", name: "Core Endurance", icon: "🔥", details: "5 rounds: 45s plank, 15 leg raises, 20 bicycle crunches, 30s rest", link: "https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day: "Thursday", name: "Bike HIIT", icon: "⚡", details: "30 min: 1 min hard, 2 min easy intervals on stationary bike", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Friday", name: "Full Body Upper", icon: "💥", details: "Compound movements: rows, press, pull, curl, extend – full circuit 4 rounds", link: "https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day: "Saturday", name: "Victory Walk", icon: "🎯", details: "60+ min outdoor walk, celebrate your progress, take progress photos", link: "https://www.youtube.com/watch?v=njeZ29umqVE" },
      { day: "Sunday", name: "Reflect & Reset", icon: "✨", details: "Yoga, meditation, meal prep for next phase, measure results", link: "https://www.youtube.com/watch?v=v7AYKMP6rOE" },
    ],
  },
];

const meals = [
  {
    meal: "Breakfast",
    icon: "🌅",
    name: "Protein Oats Bowl",
    calories: 420,
    protein: 32,
    carbs: 45,
    fat: 10,
    ingredients: ["80g rolled oats", "1 scoop vanilla protein powder", "200ml almond milk", "1 banana", "1 tbsp almond butter", "Cinnamon to taste"],
    instructions: "Cook oats in almond milk for 5 min. Stir in protein powder off heat. Top with sliced banana and almond butter. Sprinkle cinnamon.",
    videoLink: "https://www.youtube.com/watch?v=kd3goxFqbJA",
  },
  {
    meal: "Lunch",
    icon: "☀️",
    name: "Grilled Chicken & Quinoa Bowl",
    calories: 520,
    protein: 48,
    carbs: 42,
    fat: 12,
    ingredients: ["180g chicken breast", "80g quinoa (dry)", "100g cherry tomatoes", "50g cucumber", "30g feta cheese", "Olive oil, lemon, oregano"],
    instructions: "Season chicken with oregano, salt, pepper. Grill 6 min per side. Cook quinoa per package. Assemble bowl with veggies, crumble feta, drizzle olive oil and lemon.",
    videoLink: "https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal: "Dinner",
    icon: "🌙",
    name: "Baked Salmon & Roasted Veg",
    calories: 480,
    protein: 44,
    carbs: 22,
    fat: 22,
    ingredients: ["200g salmon fillet", "150g broccoli", "100g sweet potato", "2 cloves garlic", "Olive oil", "Lemon, dill, salt, pepper"],
    instructions: "Preheat oven 200°C. Toss broccoli and sweet potato in olive oil, season. Roast 20 min. Add salmon to pan, top with garlic, lemon, dill. Bake 12–15 min until flaky.",
    videoLink: "https://www.youtube.com/watch?v=M_a_HcNADP4",
  },
  {
    meal: "Snack 1",
    icon: "🍎",
    name: "Greek Yogurt & Berries",
    calories: 180,
    protein: 18,
    carbs: 20,
    fat: 3,
    ingredients: ["200g Greek yogurt (0% fat)", "80g mixed berries", "1 tsp honey", "1 tbsp chia seeds"],
    instructions: "Layer yogurt in a bowl. Top with berries, drizzle honey, sprinkle chia seeds. Can be prepped the night before.",
    videoLink: "https://www.youtube.com/watch?v=xGrC_vHH3oU",
  },
  {
    meal: "Snack 2",
    icon: "🥜",
    name: "Protein Shake & Almonds",
    calories: 220,
    protein: 26,
    carbs: 8,
    fat: 10,
    ingredients: ["1 scoop chocolate protein powder", "250ml water or almond milk", "20g raw almonds"],
    instructions: "Shake protein with liquid. Serve with almonds on the side. Great post-workout or evening snack to hit protein goals.",
    videoLink: "https://www.youtube.com/watch?v=Yz4hDgk_3iU",
  },
];

const quotes = [
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Don't wish for it. Work for it.", author: "Unknown" },
  { text: "Your only limit is you.", author: "Unknown" },
  { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
];

export default function PandoApp() {
  const [weight, setWeight] = useState(90);
  const [steps, setSteps] = useState(5000);
  const [water, setWater] = useState(1.5);
  const [sleep, setSleep] = useState(6);
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const goalWeight = 80;
  const startWeight = 98;
  const weightLost = Math.max(0, startWeight - weight);
  const weightGoal = startWeight - goalWeight;

  const behind = weight > startWeight - (weightGoal / 8) * 2;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.badge}>🔥 Premium Fitness Dashboard</div>
        <h1 style={styles.title}>PANDO APP</h1>
        <p style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 700, color: gold, margin: "0 0 8px" }}>
          2-Month Transformation Dashboard
        </p>
        <p style={styles.subtitle}>8 Weeks · Knee-Safe · Fat Loss · Strength Building</p>
      </div>

      <div style={styles.container}>

        {/* PROGRESS TRACKER */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📊 Live Progress Tracker</div>
          <div style={styles.goldLine} />
          {behind && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: `1px solid ${red}`, borderRadius: "12px", padding: "14px 18px", marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <span style={{ color: "#fca5a5", fontSize: "14px", fontWeight: 600 }}>Weight loss may be behind schedule. Review your nutrition and increase daily movement.</span>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            <div style={styles.card}>
              <div style={{ fontWeight: 700, color: gold, marginBottom: "16px", fontSize: "15px" }}>📝 Log Today</div>
              <InputField label="Current Weight" value={weight} onChange={setWeight} unit="kg" min={50} max={200} step={0.5} />
              <InputField label="Daily Steps" value={steps} onChange={setSteps} unit="steps" min={0} max={20000} step={100} />
              <InputField label="Water Intake" value={water} onChange={setWater} unit="L" min={0} max={5} step={0.1} />
              <InputField label="Sleep Hours" value={sleep} onChange={setSleep} unit="hrs" min={0} max={12} step={0.5} />
            </div>
            <div style={styles.card}>
              <div style={{ fontWeight: 700, color: gold, marginBottom: "16px", fontSize: "15px" }}>📈 Progress Overview</div>
              <ProgressBar label="Weight Lost" value={weightLost} max={weightGoal} unit="kg" color={green} icon="⚖️" />
              <ProgressBar label="Daily Steps" value={steps} max={10000} unit="steps" color={blue} icon="👟" />
              <ProgressBar label="Water Intake" value={water} max={3} unit="L" color="#06B6D4" icon="💧" />
              <ProgressBar label="Sleep" value={sleep} max={8} unit="hrs" color="#8B5CF6" icon="😴" />
              <div style={{ marginTop: "16px", padding: "12px", background: "#1f2937", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: gold, fontWeight: 800, fontSize: "22px" }}>{weightLost.toFixed(1)}</div>
                  <div style={{ color: muted, fontSize: "11px" }}>kg lost</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: blue, fontWeight: 800, fontSize: "22px" }}>{weightGoal - weightLost > 0 ? (weightGoal - weightLost).toFixed(1) : 0}</div>
                  <div style={{ color: muted, fontSize: "11px" }}>kg to go</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: green, fontWeight: 800, fontSize: "22px" }}>{Math.round((weightLost / weightGoal) * 100)}%</div>
                  <div style={{ color: muted, fontSize: "11px" }}>complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KNEE SAFETY */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🦵 Knee Safety Protocol</div>
          <div style={styles.goldLine} />
          <div style={{ background: "rgba(245,197,24,0.06)", border: `1px solid ${gold}44`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontWeight: 700, color: gold, fontSize: "16px", marginBottom: "16px" }}>⚠️ Important Knee Guidelines – Follow at ALL Times</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { icon: "🚫", label: "No Deep Squats", desc: "Avoid any squat below 90°. No full squats ever." },
                { icon: "🚫", label: "No Jumping", desc: "Zero impact jumping. No jump squats, burpees, or box jumps." },
                { icon: "🚫", label: "Stop at Sharp Pain", desc: "Any sharp knee pain = stop immediately. Rest and ice." },
                { icon: "✅", label: "Use Bike & Walk", desc: "Low-impact cardio only. Bike and walking are your best friends." },
                { icon: "✅", label: "Warm Up Always", desc: "5–10 min light movement before every session." },
                { icon: "✅", label: "Ice After Exercise", desc: "10–15 min ice pack on knees after intense sessions." },
              ].map((item, i) => (
                <div key={i} style={{ background: "#111827", border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "14px" }}>
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: item.icon === "✅" ? green : red, marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: muted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WORKOUT PLAN */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🏋️ 8-Week Workout Plan</div>
          <div style={styles.goldLine} />
          <p style={styles.sectionSub}>Tap a week to expand. All workouts are knee-safe and progressive.</p>
          {workoutWeeks.map((wk, wi) => (
            <div key={wi} style={{ ...styles.card, marginBottom: "12px", padding: 0, overflow: "hidden" }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === wi ? -1 : wi)}
                style={{
                  width: "100%",
                  background: expandedWeek === wi ? "rgba(245,197,24,0.08)" : "transparent",
                  border: "none",
                  padding: "20px 24px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: white,
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 800, fontSize: "16px", color: gold }}>{wk.week}</div>
                  <div style={{ fontSize: "13px", color: muted }}>{wk.theme}</div>
                </div>
                <span style={{ color: gold, fontSize: "20px", transform: expandedWeek === wi ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>▼</span>
              </button>
              {expandedWeek === wi && (
                <div style={{ padding: "0 16px 16px" }}>
                  {wk.days.map((day, di) => (
                    <div key={di} style={{ background: "#0d1117", border: `1px solid ${cardBorder}`, borderRadius: "12px", padding: "14px 16px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: "14px", color: gold, marginBottom: "2px" }}>{day.icon} {day.day}</div>
                          <div style={{ fontWeight: 700, fontSize: "15px", color: white, marginBottom: "4px" }}>{day.name}</div>
                          <div style={{ fontSize: "13px", color: muted }}>{day.details}</div>
                        </div>
                        {day.link && (
                          <a
                            href={day.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: red,
                              color: white,
                              fontWeight: 700,
                              fontSize: "12px",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              textDecoration: "none",
                              whiteSpace: "nowrap",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            ▶ Watch
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOD PLAN */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🥗 Fat-Loss Meal Plan</div>
          <div style={styles.goldLine} />
          <p style={styles.sectionSub}>High protein · Calorie controlled · Easy to prepare</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {meals.map((m, i) => (
              <div key={i} style={{ ...styles.card, borderTop: `3px solid ${gold}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{m.icon} {m.meal}</div>
                    <div style={{ fontWeight: 800, fontSize: "16px", color: white }}>{m.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: gold, fontWeight: 800, fontSize: "20px" }}>{m.calories}</div>
                    <div style={{ color: muted, fontSize: "11px" }}>calories</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                  {[
                    { label: "Protein", value: m.protein + "g", color: green },
                    { label: "Carbs", value: m.carbs + "g", color: blue },
                    { label: "Fat", value: m.fat + "g", color: gold },
                  ].map((macro, j) => (
                    <div key={j} style={{ flex: 1, background: "#1f2937", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                      <div style={{ color: macro.color, fontWeight: 700, fontSize: "14px" }}>{macro.value}</div>
                      <div style={{ color: muted, fontSize: "10px" }}>{macro.label}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                  style={{ width: "100%", background: "#1f2937", border: `1px solid ${cardBorder}`, borderRadius: "8px", padding: "8px", color: white, cursor: "pointer", fontSize: "13px", fontWeight: 600, marginBottom: "10px" }}
                >
                  {expandedMeal === i ? "▲ Hide Details" : "▼ Show Ingredients & Instructions"}
                </button>
                {expandedMeal === i && (
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontWeight: 700, color: gold, fontSize: "13px", marginBottom: "6px" }}>🧾 Ingredients</div>
                      {m.ingredients.map((ing, k) => (
                        <div key={k} style={{ fontSize: "13px", color: muted, padding: "2px 0" }}>• {ing}</div>
                      ))}
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontWeight: 700, color: gold, fontSize: "13px", marginBottom: "6px" }}>👨‍🍳 Instructions</div>
                      <div style={{ fontSize: "13px", color: muted, lineHeight: "1.6" }}>{m.instructions}</div>
                    </div>
                  </div>
                )}
                <a
                  href={m.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: `linear-gradient(90deg, ${red}, #c0392b)`,
                    color: white,
                    fontWeight: 700,
                    fontSize: "13px",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  ▶ Watch Cooking Video
                </a>
              </div>
            ))}
          </div>
          <div style={{ ...styles.card, marginTop: "20px", background: "rgba(245,197,24,0.05)", border: `1px solid ${gold}33` }}>
            <div style={{ fontWeight: 700, color: gold, marginBottom: "12px" }}>📊 Daily Totals</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {[
                { label: "Total Calories", value: meals.reduce((a, m) => a + m.calories, 0) + " kcal", color: gold },
                { label: "Total Protein", value: meals.reduce((a, m) => a + m.protein, 0) + "g", color: green },
                { label: "Total Carbs", value: meals.reduce((a, m) => a + m.carbs, 0) + "g", color: blue },
                { label: "Total Fat", value: meals.reduce((a, m) => a + m.fat, 0) + "g", color: "#F97316" },
              ].map((t, i) => (
                <div key={i} style={{ flex: "1 1 120px", background: "#1f2937", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
                  <div style={{ color: t.color, fontWeight: 800, fontSize: "20px" }}>{t.value}</div>
                  <div style={{ color: muted, fontSize: "12px" }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOTIVATION */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>✨ Daily Motivation</div>
          <div style={styles.goldLine} />
          <div style={{ ...styles.card, background: `linear-gradient(135deg, rgba(245,197,24,0.08), rgba(59,130,246,0.05))`, border: `1px solid ${gold}33`, textAlign: "center", padding: "40px 24px" }}>
            <div style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, color: white, lineHeight: 1.4, marginBottom: "16px" }}>
              "{quotes[quoteIdx].text}"
            </div>
            <div style={{ color: gold, fontWeight: 600, fontSize: "14px", marginBottom: "24px" }}>— {quotes[quoteIdx].author}</div>
            <button
              onClick={() => setQuoteIdx((quoteIdx + 1) % quotes.length)}
              style={{ background: `linear-gradient(90deg, ${gold}, #e6a800)`, color: "#000", fontWeight: 800, fontSize: "13px", padding: "10px 24px", borderRadius: "10px", border: "none", cursor: "pointer" }}
            >
              Next Quote →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "16px" }}>
            {[
              { icon: "🎯", title: "Stay Consistent", desc: "80% consistency beats 100% perfection for 3 days." },
              { icon: "📸", title: "Track Progress", desc: "Take weekly photos. The mirror lies, the camera doesn't." },
              { icon: "🧠", title: "Mindset First", desc: "Your body transforms after your mind does." },
              { icon: "🌙", title: "Sleep is Training", desc: "8 hours sleep = your body's repair workshop." },
            ].map((tip, i) => (
              <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${gold}` }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{tip.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: white, marginBottom: "4px" }}>{tip.title}</div>
                <div style={{ fontSize: "13px", color: muted }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "60px", padding: "24px 0", borderTop: `1px solid ${cardBorder}` }}>
          <div style={{ color: gold, fontWeight: 800, fontSize: "18px", marginBottom: "4px" }}>PANDO APP</div>
          <div style={{ color: muted, fontSize: "13px" }}>Your 2-Month Transformation Journey · Stay Consistent · Trust the Process</div>
        </div>

      </div>
    </div>
  );
}
