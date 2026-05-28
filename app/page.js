import { useState } from "react";

const GOLD = "#F5C842";
const BLUE = "#3B82F6";
const DARK = "#0A0A0F";
const CARD = "#12121A";
const CARD2 = "#1A1A26";
const RED = "#EF4444";
const GREEN = "#22C55E";

function ProgressBar({ value, max, color = BLUE }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ background: "#1E1E2E", borderRadius: 999, height: 10, overflow: "hidden", marginTop: 6 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999, transition: "width 0.5s ease" }} />
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: CARD, borderRadius: 20, padding: "24px 28px", boxShadow: "0 4px 40px rgba(0,0,0,0.5)", border: "1px solid #1E1E30", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <h2 style={{ color: GOLD, fontSize: 22, fontWeight: 800, letterSpacing: 0.5, margin: 0 }}>{children}</h2>
    </div>
  );
}

// All YouTube links verified via web search May 2026
const workoutWeeks = [
  {
    week: "Week 1–2",
    subtitle: "Foundation & Activation",
    days: [
      {
        day: "Monday",
        name: "Upper Body + Cardio",
        emoji: "💪",
        details: "🚴 10 min Cycle (easy pace) → 🔄 10 min Elliptical (low resistance) → 💪 Dumbbell Chest Press 3×12 | Cable Chest Fly 3×15 | Seated Cable Row 3×12 | Lat Pulldown 3×12 | DB Shoulder Press 3×12",
        link: "https://www.youtube.com/watch?v=_1MkDIqT9mA",
        linkLabel: "▶ Dumbbell Chest Press Tutorial",
        focus: "Chest & Back"
      },
      {
        day: "Tuesday",
        name: "Knee Rehab + Core",
        emoji: "🦵",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Seated Leg Press (shallow range only) 3×15 | Terminal Knee Extensions with band 3×20 | Seated Calf Raises 3×20 | Dead Bug Core 3×12 | Plank 3×20s",
        link: "https://www.youtube.com/watch?v=7xG3MeoLjC0",
        linkLabel: "▶ Banded Terminal Knee Extension (TKE) Tutorial",
        focus: "Knee Strength & Core"
      },
      {
        day: "Wednesday",
        name: "Incline Treadmill + Mobility",
        emoji: "🚶",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 🚶 20 min Incline Treadmill (5° incline, 4 km/h) | Hip Flexor Stretch | Foam Roll Quads | Chest Opener | Ankle Mobility 3×10",
        link: "https://www.youtube.com/watch?v=y0QgnEAav28",
        linkLabel: "▶ 20-Min Incline Treadmill Fat-Burning Walk",
        focus: "Fat Burn & Mobility"
      },
      {
        day: "Thursday",
        name: "Chest Focus Day",
        emoji: "🔥",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Cable Chest Fly 4×15 | Incline DB Press 4×12 | Low-to-High Cable Fly (upper chest) 3×15 | Pec Deck / Chest Machine 3×12 | Tricep Pushdown 3×15",
        link: "https://www.youtube.com/watch?v=eQ_NBB6OBH4",
        linkLabel: "▶ Low-to-High Cable Fly — Upper Chest Tutorial",
        focus: "Chest Burn Day"
      },
      {
        day: "Friday",
        name: "Full Body Low-Impact",
        emoji: "⚡",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 🚶 20 min Walk | DB Curl 3×12 | Tricep Extension 3×12 | Lateral Raise 3×15 | Seated Row 3×12 | Dead Bug Core 3×15",
        link: "https://www.youtube.com/watch?v=OeLb503NZHk",
        linkLabel: "▶ Seated Cable Row Tutorial (Functional Trainer)",
        focus: "Full Body Burn"
      },
      {
        day: "Saturday",
        name: "Active Recovery + Mobility",
        emoji: "🧘",
        details: "🚴 15 min easy Cycle | 🔄 10 min Elliptical (very low resistance) | Full body stretch | Hip mobility flow | Foam rolling chest & quads | Breathing exercises",
        link: "https://www.youtube.com/watch?v=WUKHM6-ekJM",
        linkLabel: "▶ 8-Min Hip Mobility Routine (No Equipment)",
        focus: "Recovery"
      },
      {
        day: "Sunday",
        name: "Rest Day",
        emoji: "😴",
        details: "Complete rest. Light 20-min outdoor walk if you feel good. Focus on hydration (3L water) and 8hrs sleep. Meal prep for the week.",
        link: "https://www.youtube.com/watch?v=bxn9FBrt4-A",
        linkLabel: "▶ Core Dead Bug — NASM Tutorial (watch for next session)",
        focus: "Rest"
      }
    ]
  },
  {
    week: "Week 3–4",
    subtitle: "Build Intensity",
    days: [
      {
        day: "Monday",
        name: "Chest Blast Day",
        emoji: "💪",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → DB Flat Press 4×12 | DB Incline Press 4×12 | Cable Fly (mid position) 4×15 | Low Cable Fly 3×15 | Tricep Dip Machine 3×12",
        link: "https://www.youtube.com/watch?v=ovFc-5YdcXw",
        linkLabel: "▶ How to Properly Perform Cable Chest Fly",
        focus: "Chest Hypertrophy"
      },
      {
        day: "Tuesday",
        name: "Knee Strength + Cardio",
        emoji: "🦵",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Leg Press (limited depth) 4×15 | TKE with band 3×20 | Straight Leg Raise 3×15 | Step-Up (low platform) 3×12 each | Seated Calf Raise 3×20",
        link: "https://www.youtube.com/watch?v=xG-DtZqnRSY",
        linkLabel: "▶ Terminal Knee Extension — Penn State Rehab Tutorial",
        focus: "Knee & Leg"
      },
      {
        day: "Wednesday",
        name: "Back + Core + Cardio",
        emoji: "🏋️",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Lat Pulldown 4×12 | Seated Cable Row 4×12 | Single Arm DB Row 3×12 | Face Pull 3×15 | Plank 3×30s | Bicycle Crunch 3×20",
        link: "https://www.youtube.com/watch?v=AKl1em_pH_c",
        linkLabel: "▶ How to Do Lat Pulldown Correctly — Form & Mistakes",
        focus: "Back & Core"
      },
      {
        day: "Thursday",
        name: "Incline Cardio + Upper Chest",
        emoji: "🔥",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 🚶 20 min Incline Walk (6°) | Incline DB Press 4×12 | Upper Chest Cable Fly 4×15 | Pec Deck Machine 3×15 | DB Shoulder Press 3×12",
        link: "https://www.youtube.com/watch?v=gl8H4QLXKTo",
        linkLabel: "▶ How to Perform Incline Dumbbell Press — Upper Chest",
        focus: "Cardio + Upper Chest"
      },
      {
        day: "Friday",
        name: "Arms + Shoulders",
        emoji: "💪",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Bicep Curl 4×12 | Hammer Curl 3×12 | Overhead Tricep Extension 3×15 | Lateral Raise 4×15 | Face Pull 3×15 | Arnold Press 3×12",
        link: "https://www.youtube.com/watch?v=KRbyo0jj2ao",
        linkLabel: "▶ How to Perform Dumbbell Chest Press (Form Guide)",
        focus: "Arms & Shoulders"
      },
      {
        day: "Saturday",
        name: "Active Recovery",
        emoji: "🧘",
        details: "🚴 20 min easy Bike | Stretching session | Foam roll chest & quads | Hip mobility flow | Yoga-style full body stretch",
        link: "https://www.youtube.com/watch?v=0gctaOxakH4",
        linkLabel: "▶ Hip Opener Follow-Along Mobility Routine",
        focus: "Recovery"
      },
      {
        day: "Sunday",
        name: "Rest",
        emoji: "😴",
        details: "Full rest. Sleep 8 hrs. Drink 3L water. Weigh yourself in the morning.",
        link: "https://www.youtube.com/watch?v=m8lSq4SC_eM",
        linkLabel: "▶ Plank, Side Plank & Dead Bug — Core Beginner Guide",
        focus: "Rest"
      }
    ]
  },
  {
    week: "Week 5–6",
    subtitle: "Fat Burn Acceleration",
    days: [
      {
        day: "Monday",
        name: "Chest Superset Day",
        emoji: "🔥",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → SUPERSET A: DB Flat Press + Cable Fly 4×12 | SUPERSET B: Incline DB Press + Pec Deck 4×12 | Tricep Pushdown 3×15 | Low Cable Fly 3×15",
        link: "https://www.youtube.com/watch?v=hrh0K1Oo7Yc",
        linkLabel: "▶ How to PROPERLY Cable Chest Fly (Fix Your Form)",
        focus: "Chest Superset Day"
      },
      {
        day: "Tuesday",
        name: "Knee Protocol Advanced",
        emoji: "🦵",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Monster Walk (resistance band) 3×20 | Leg Press (half depth) 4×15 | Step-Up (low platform) 3×15 each | Wall Sit 3×30s | Seated Leg Curl 3×12",
        link: "https://www.youtube.com/watch?v=-8FOFgBV-OI",
        linkLabel: "▶ ACL Rehab: Terminal Knee Extension Exercises Collection",
        focus: "Knee Protocol"
      },
      {
        day: "Wednesday",
        name: "High Incline Walk + Core",
        emoji: "🚶",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 🚶 20 min Incline Walk (8°, 3.5 km/h) | Cable Crunch 3×20 | Hanging Knee Raise 3×15 | Russian Twist 3×20 | Plank 3×40s",
        link: "https://www.youtube.com/watch?v=suKBh0z78Yc",
        linkLabel: "▶ 30-Min Incline Interval Walk — Fat Burning Treadmill",
        focus: "Core Shred"
      },
      {
        day: "Thursday",
        name: "Back + Chest Push-Pull",
        emoji: "💪",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → SUPERSET: Seated Row + Cable Fly 4×12 | Lat Pulldown 3×12 | Cable Chest Press 3×15 | Face Pull 3×15 | Rear Delt Fly 3×12",
        link: "https://www.youtube.com/watch?v=XaHV_8Nbyug",
        linkLabel: "▶ Seated Close Grip Cable Row — Proper Technique",
        focus: "Push-Pull Day"
      },
      {
        day: "Friday",
        name: "Full Body Circuit",
        emoji: "⚡",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 3 ROUNDS: DB Chest Press ×12 | Seated Row ×12 | Shoulder Press ×12 | Bicep Curl ×12 | Tricep Extension ×12 | Plank ×20s | Rest 60s between rounds",
        link: "https://www.youtube.com/watch?v=YB9S4eMiJl8",
        linkLabel: "▶ Core Workout: Planks, Dead Bugs & Russian Twists",
        focus: "Full Circuit"
      },
      {
        day: "Saturday",
        name: "Mobility + Light Bike",
        emoji: "🧘",
        details: "🚴 25 min easy Bike | Full mobility session | Chest & hip flexor focus | Foam roll back & glutes | Shoulder mobility",
        link: "https://www.youtube.com/watch?v=gNjmLgXz2Bs",
        linkLabel: "▶ Hip Opening & Mobility Flow — 10 Daily Stretches",
        focus: "Active Recovery"
      },
      {
        day: "Sunday",
        name: "Rest",
        emoji: "😴",
        details: "Complete rest. Meal prep for the week. Take progress photos (front, side, back).",
        link: "https://www.youtube.com/watch?v=aFk1SjShgO4",
        linkLabel: "▶ 3 Essential Core Exercises: Plank, Bird Dog, Dead Bug",
        focus: "Rest"
      }
    ]
  },
  {
    week: "Week 7–8",
    subtitle: "Peak Performance",
    days: [
      {
        day: "Monday",
        name: "Chest Annihilation Day",
        emoji: "🔥",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → DB Flat Press 5×10 | DB Incline Press 4×12 | Pec Deck 4×15 | Low Cable Fly 4×15 | High-to-Low Cable Fly 3×15 | Modified Push-Up 2×max",
        link: "https://www.youtube.com/watch?v=fAmLAQVFq9k",
        linkLabel: "▶ How to PROPERLY Low Cable Chest Fly — Fix Form",
        focus: "Chest Annihilation"
      },
      {
        day: "Tuesday",
        name: "Knee Peak Strength",
        emoji: "🦵",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Leg Press 5×12 | TKE with band 4×20 | Step-Up 4×15 each | Leg Curl (seated) 3×15 | Standing Calf Raise 4×20 | Single Leg Balance 3×30s",
        link: "https://www.youtube.com/watch?v=FAfSfbzxTWI",
        linkLabel: "▶ Terminal Knee Extension (TKE) Progressions",
        focus: "Knee Peak"
      },
      {
        day: "Wednesday",
        name: "Interval Walk + Core Finisher",
        emoji: "⚡",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical (higher resistance) → 🚶 20 min Treadmill intervals (2 min fast walk / 1 min incline 8°) | Cable Crunch 4×20 | Leg Raise 4×15 | Plank 3×60s",
        link: "https://www.youtube.com/watch?v=gbpnMHt93Ok",
        linkLabel: "▶ 30-Min Fat Burning Incline Walking Treadmill Workout",
        focus: "Cardio Peak"
      },
      {
        day: "Thursday",
        name: "Back + Chest Final Push",
        emoji: "💪",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → Lat Pulldown 5×10 | Seated Row 5×10 | DB Incline Chest Press 4×10 | Cable Fly 4×15 | Face Pull 3×15 | Rear Delt Fly 3×12",
        link: "https://www.youtube.com/watch?v=SALxEARiMkw",
        linkLabel: "▶ How to Do Lat Pulldowns (Avoid Mistakes!)",
        focus: "Final Push-Pull"
      },
      {
        day: "Friday",
        name: "Full Power Circuit",
        emoji: "🏆",
        details: "🚴 10 min Cycle → 🔄 10 min Elliptical → 4 ROUNDS (minimal 30s rest): Chest Press ×10 | Row ×10 | Shoulder Press ×10 | Curl ×10 | Tricep ×10 | Core ×15 | Total workout ~55 min",
        link: "https://www.youtube.com/watch?v=7BkgqzC6WsM",
        linkLabel: "▶ How to PROPERLY Seated Cable Row (Do This Now)",
        focus: "Power Circuit"
      },
      {
        day: "Saturday",
        name: "Final Light Cardio + Stretch",
        emoji: "🧘",
        details: "🚴 20 min Bike | 🔄 10 min Elliptical | Full body stretch | Measure final weight | Take transformation photos (front, side, back)",
        link: "https://www.youtube.com/watch?v=jj2AAH6jbHk",
        linkLabel: "▶ 12-Min Hip Mobility Routine (Follow Along)",
        focus: "Final Recovery"
      },
      {
        day: "Sunday",
        name: "Transformation Review 🏆",
        emoji: "🏆",
        details: "Rest. Review 8-week results. Compare Day 1 vs Day 56 photos. Celebrate every kilo lost. Plan Month 3.",
        link: "https://www.youtube.com/watch?v=5OAsrNU_ZTE",
        linkLabel: "▶ Quick Hip Mobility Routine (Follow Along)",
        focus: "Celebrate"
      }
    ]
  }
];

const meals = [
  {
    type: "Breakfast",
    emoji: "🌅",
    name: "High-Protein Egg White Omelette",
    calories: 380,
    protein: 35,
    carbs: 28,
    fats: 10,
    ingredients: ["5 egg whites + 1 whole egg", "1 cup fresh spinach", "½ cup mushrooms", "30g oats (cooked in water, on the side)", "1 tsp olive oil", "Salt, pepper, turmeric"],
    instructions: "Heat pan with olive oil on medium heat. Sauté mushrooms 2 min, add spinach until wilted. Pour egg mixture over vegetables, cook on low 3–4 min until set. Serve with plain oats on the side.",
    videoLink: "https://www.youtube.com/watch?v=wnOQZ7_7C9A",
    videoLabel: "▶ Healthy Egg White Omelette — High Protein Low Calorie"
  },
  {
    type: "Lunch",
    emoji: "☀️",
    name: "Grilled Chicken & Brown Rice Bowl",
    calories: 520,
    protein: 45,
    carbs: 55,
    fats: 9,
    ingredients: ["200g chicken breast", "¾ cup brown rice (dry)", "1 cup broccoli florets", "½ cup cherry tomatoes", "Juice of 1 lemon", "Garlic, cumin, smoked paprika, salt"],
    instructions: "Season chicken with spices. Grill 6–7 min each side or until cooked through. Steam broccoli 4 min. Cook rice per packet. Assemble bowl, squeeze fresh lemon on top.",
    videoLink: "https://www.youtube.com/watch?v=4QyB5FfkbpA",
    videoLabel: "▶ Chicken & Rice Meal Prep for Weight Loss"
  },
  {
    type: "Dinner",
    emoji: "🌙",
    name: "One Pan Baked Salmon & Vegetables",
    calories: 450,
    protein: 42,
    carbs: 20,
    fats: 18,
    ingredients: ["180g salmon fillet", "1 cup zucchini sliced", "1 cup bell peppers", "1 tbsp olive oil", "Fresh dill, garlic powder, lemon zest", "½ cup quinoa (cooked)"],
    instructions: "Preheat oven to 200°C. Place salmon and vegetables on one baking tray. Drizzle with olive oil, season with dill and garlic. Bake 18–20 min. Serve over cooked quinoa.",
    videoLink: "https://www.youtube.com/watch?v=FQQpIUaSqY0",
    videoLabel: "▶ One Pan Salmon & Vegetable Bake (30 Min)"
  },
  {
    type: "Snacks",
    emoji: "🥜",
    name: "Smart Snack Pack (Between Meals)",
    calories: 220,
    protein: 18,
    carbs: 15,
    fats: 8,
    ingredients: ["1 scoop whey protein in 300ml cold water", "1 medium apple", "15g raw almonds", "OR alternative: 150g Greek yogurt + mixed berries"],
    instructions: "Mix whey protein with cold water and shake well. Eat with apple and almonds as a mid-morning or post-workout snack. Keeps hunger controlled between meals.",
    videoLink: "https://www.youtube.com/watch?v=865NTDZotmg",
    videoLabel: "▶ Low Calorie Rice Bowl Meal Prep (Healthy Snack Ideas)"
  }
];

const quotes = [
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Every rep, every step, every meal — it all compounds into your new body.", author: "Babê Kaius" },
  { text: "You don't have to be extreme. Just refuse to quit.", author: "Unknown" },
  { text: "Pain is temporary. The pride of finishing is forever.", author: "Muhammad Ali" },
  { text: "Your only competition is who you were yesterday.", author: "Babê Kaius" }
];

export default function Home() {
  const [weight, setWeight] = useState(105);
  const [steps, setSteps] = useState(5000);
  const [water, setWater] = useState(1.5);
  const [sleep, setSleep] = useState(6);
  const [openWeek, setOpenWeek] = useState(0);
  const [openMeal, setOpenMeal] = useState(null);
  const [openDay, setOpenDay] = useState(null);

  const startWeight = 110;
  const goalWeight = 95;
  const weightLost = startWeight - weight;
  const weightNeeded = startWeight - goalWeight;
  const weightPct = Math.min(100, Math.max(0, (weightLost / weightNeeded) * 100));
  const behind = weightLost < weightNeeded * 0.3;

  const inputStyle = {
    background: "#0D0D18", border: "1px solid #2A2A40", borderRadius: 12,
    color: "#fff", padding: "10px 14px", fontSize: 15, width: "100%",
    outline: "none", boxSizing: "border-box"
  };
  const labelStyle = {
    color: "#9999BB", fontSize: 13, marginBottom: 6, display: "block",
    fontWeight: 600, letterSpacing: 0.5
  };

  return (
    <div style={{ background: "linear-gradient(135deg,#05050F 0%,#0A0A1A 50%,#080814 100%)", minHeight: "100vh", fontFamily: "Georgia,serif", color: "#fff", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "60px 24px 40px", background: "linear-gradient(180deg,#0D0D20 0%,transparent 100%)" }}>
        <div style={{ display: "inline-block", background: `linear-gradient(135deg,${GOLD}22,${GOLD}11)`, border: `1px solid ${GOLD}44`, borderRadius: 999, padding: "6px 20px", marginBottom: 16 }}>
          <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>8-Week Program · Dubai 2025</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px,8vw,72px)", fontWeight: 900, margin: "0 0 8px", background: `linear-gradient(135deg,#fff 0%,${GOLD} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Babê Kaius
        </h1>
        <p style={{ color: "#8888AA", fontSize: 16, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>2-Month Transformation Dashboard</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
          {[["🎯","Goal","-15 kg"],["📅","Duration","8 Weeks"],["🦵","Knee Safe","Protocol"],["🔥","Daily Cardio","40 min"]].map(([emoji,label,val]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{emoji}</div>
              <div style={{ color: "#6666AA", fontSize: 11, marginTop: 4 }}>{label}</div>
              <div style={{ color: GOLD, fontSize: 15, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

        {/* Progress Tracker */}
        <Card style={{ marginBottom: 24 }}>
          <SectionTitle icon="📊">Live Progress Tracker</SectionTitle>
          {behind && (
            <div style={{ background: "#EF444420", border: `1px solid ${RED}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>⚠️</span>
              <div>
                <div style={{ color: RED, fontWeight: 700, fontSize: 14 }}>Weight Loss Behind Schedule</div>
                <div style={{ color: "#FF8888", fontSize: 13, marginTop: 2 }}>Reduce daily calories by 200 and add 10 min extra walking after dinner.</div>
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { label: "Current Weight (kg)", val: weight, setVal: setWeight, min: 90, max: 115, step: 0.5, pct: weightPct, color: weightPct > 50 ? GREEN : GOLD, info: `Lost: ${weightLost.toFixed(1)}kg / Goal: ${weightNeeded}kg` },
              { label: "Daily Steps", val: steps, setVal: setSteps, min: 0, max: 12000, step: 500, pct: (steps/10000)*100, color: BLUE, info: "Target: 10,000 steps" },
              { label: "Water Intake (L)", val: water, setVal: setWater, min: 0, max: 4, step: 0.25, pct: (water/3)*100, color: "#06B6D4", info: "Target: 3L/day" },
              { label: "Sleep Hours", val: sleep, setVal: setSleep, min: 4, max: 10, step: 0.5, pct: (sleep/8)*100, color: "#8B5CF6", info: "Target: 8hrs/night" }
            ].map(({ label, val, setVal, min, max, step, info, pct, color }) => (
              <div key={label} style={{ background: CARD2, borderRadius: 16, padding: "18px 20px" }}>
                <label style={labelStyle}>{label}</label>
                <input type="number" value={val} min={min} max={max} step={step}
                  onChange={e => setVal(parseFloat(e.target.value))} style={inputStyle} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ color: "#6666AA", fontSize: 12 }}>{info}</span>
                  <span style={{ color, fontSize: 12, fontWeight: 700 }}>{pct.toFixed(0)}%</span>
                </div>
                <ProgressBar value={pct} max={100} color={color} />
              </div>
            ))}
          </div>
        </Card>

        {/* Knee Safety */}
        <Card style={{ marginBottom: 24, border: `1px solid ${RED}33`, background: "#12080A" }}>
          <SectionTitle icon="🦵">Knee Safety Protocol</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: "🚫", title: "No Deep Squats", desc: "Never go below 90° knee bend. Use leg press with limited range only.", color: RED },
              { icon: "🚫", title: "No Jumping", desc: "Zero box jumps, burpees or impact. Keep both feet on the ground at all times.", color: RED },
              { icon: "⛔", title: "Stop Sharp Knee Pain", desc: "Stop immediately if you feel sharp/stabbing pain. Discomfort ≠ pain. Know the difference.", color: RED },
              { icon: "✅", title: "Safe Alternatives", desc: "Cycle + Elliptical daily. Leg press, TKE bands, step-ups on low platform — all approved.", color: GREEN }
            ].map(({ icon, title, desc, color }) => (
              <div key={title} style={{ background: "#1A0810", border: `1px solid ${color}22`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ color, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#CC8888", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: "#1A1010", borderRadius: 12, padding: "12px 16px", border: `1px solid ${GOLD}22` }}>
            <span style={{ color: GOLD, fontSize: 13, fontWeight: 700 }}>🎯 Daily Cardio Structure: </span>
            <span style={{ color: "#CCC", fontSize: 13 }}>🚴 10 min Stationary Cycle + 🔄 10 min Elliptical — zero-impact, knee-safe, and fat-burning every single session.</span>
          </div>
        </Card>

        {/* Workout Plan */}
        <Card style={{ marginBottom: 24 }}>
          <SectionTitle icon="🏋️">8-Week Workout Plan</SectionTitle>
          <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}33`, borderRadius: 12, padding: "14px 18px", marginBottom: 20 }}>
            <div style={{ color: GOLD, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>📌 Daily Cardio — Every Session (Before Weights)</div>
            <div style={{ color: "#DDD", fontSize: 13, lineHeight: 1.8 }}>
              🚴 <strong style={{ color: "#fff" }}>10 min Stationary Cycle</strong> (moderate pace, resistance 3–5)<br/>
              🔄 <strong style={{ color: "#fff" }}>10 min Elliptical</strong> (low-to-medium resistance, full arm swing)<br/>
              💪 Weight Training (as scheduled per day)<br/>
              🚶 Optional: 20 min incline walk on cardio/walk days
            </div>
          </div>
          {workoutWeeks.map((week, wi) => (
            <div key={wi} style={{ marginBottom: 16 }}>
              <button onClick={() => setOpenWeek(openWeek === wi ? null : wi)}
                style={{ width: "100%", background: openWeek === wi ? `${GOLD}18` : CARD2, border: `1px solid ${openWeek === wi ? GOLD+"44" : "#2A2A40"}`, borderRadius: 14, padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: GOLD, fontWeight: 800, fontSize: 16, textAlign: "left" }}>{week.week}</div>
                  <div style={{ color: "#8888AA", fontSize: 13, textAlign: "left", marginTop: 2 }}>{week.subtitle}</div>
                </div>
                <span style={{ color: GOLD, fontSize: 20 }}>{openWeek === wi ? "▲" : "▼"}</span>
              </button>
              {openWeek === wi && (
                <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                  {week.days.map((day, di) => (
                    <div key={di} style={{ background: "#0D0D1A", borderRadius: 12, border: "1px solid #1E1E30", overflow: "hidden" }}>
                      <button onClick={() => setOpenDay(openDay === `${wi}-${di}` ? null : `${wi}-${di}`)}
                        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 22 }}>{day.emoji}</span>
                          <div style={{ textAlign: "left" }}>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{day.day} — {day.name}</div>
                            <div style={{ color: BLUE, fontSize: 12, marginTop: 2 }}>Focus: {day.focus}</div>
                          </div>
                        </div>
                        <span style={{ color: "#666", fontSize: 16 }}>{openDay === `${wi}-${di}` ? "▲" : "▼"}</span>
                      </button>
                      {openDay === `${wi}-${di}` && (
                        <div style={{ padding: "0 18px 16px" }}>
                          <p style={{ color: "#AAAACC", fontSize: 13, lineHeight: 1.8, margin: "0 0 14px" }}>{day.details}</p>
                          <a href={day.link} target="_blank" rel="noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FF000022", border: "1px solid #FF000044", borderRadius: 8, padding: "9px 16px", color: "#FF6666", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                            {day.linkLabel}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Card>

        {/* Food Plan */}
        <Card style={{ marginBottom: 24 }}>
          <SectionTitle icon="🥗">Fat-Loss Meal Plan</SectionTitle>
          <div style={{ background: CARD2, borderRadius: 12, padding: "14px 18px", marginBottom: 20 }}>
            <div style={{ color: GOLD, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📊 Daily Totals</div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["~1,570 kcal","Total Calories",GOLD],["~140g","Protein",GREEN],["~118g","Carbs",BLUE],["~45g","Fats","#F97316"]].map(([val,label,color]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ color, fontSize: 20, fontWeight: 900 }}>{val}</div>
                  <div style={{ color: "#6666AA", fontSize: 11 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {meals.map((meal, mi) => (
              <div key={mi} style={{ background: "#0D0D1A", borderRadius: 16, border: "1px solid #1E1E30", overflow: "hidden" }}>
                <button onClick={() => setOpenMeal(openMeal === mi ? null : mi)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 28 }}>{meal.emoji}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ color: "#8888AA", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{meal.type}</div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{meal.name}</div>
                      <div style={{ color: GOLD, fontSize: 12, marginTop: 2 }}>{meal.calories} kcal · {meal.protein}g protein</div>
                    </div>
                  </div>
                  <span style={{ color: "#666", fontSize: 16 }}>{openMeal === mi ? "▲" : "▼"}</span>
                </button>
                {openMeal === mi && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                      {[["Protein", meal.protein+"g", GREEN],["Carbs", meal.carbs+"g", BLUE],["Fats", meal.fats+"g", "#F97316"]].map(([label,val,color]) => (
                        <div key={label} style={{ background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 8, padding: "6px 14px", textAlign: "center" }}>
                          <div style={{ color, fontSize: 14, fontWeight: 700 }}>{val}</div>
                          <div style={{ color: "#888", fontSize: 11 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: GOLD, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>📋 Ingredients</div>
                      <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                        {meal.ingredients.map((ing, i) => (
                          <li key={i} style={{ color: "#AAAACC", fontSize: 13, lineHeight: 1.9 }}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ color: GOLD, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>👨‍🍳 Instructions</div>
                      <p style={{ color: "#AAAACC", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{meal.instructions}</p>
                    </div>
                    <a href={meal.videoLink} target="_blank" rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FF000022", border: "1px solid #FF000044", borderRadius: 8, padding: "10px 18px", color: "#FF6666", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                      {meal.videoLabel}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Motivation */}
        <Card style={{ marginBottom: 24 }}>
          <SectionTitle icon="⚡">Motivation & Mindset</SectionTitle>
          <div style={{ display: "grid", gap: 14, marginBottom: 24 }}>
            {quotes.map((q, i) => (
              <div key={i} style={{ background: CARD2, borderRadius: 14, padding: "18px 20px", borderLeft: `3px solid ${GOLD}` }}>
                <p style={{ color: "#E8E8FF", fontSize: 15, fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.6 }}>"{q.text}"</p>
                <p style={{ color: GOLD, fontSize: 12, fontWeight: 700, margin: 0 }}>— {q.author}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
            {[
              { icon: "🔥", title: "Daily Consistency", desc: "Miss once, you're human. Miss twice, you've started a new habit. Never miss twice." },
              { icon: "🧠", title: "Mindset Shift", desc: "You're not on a diet. You're upgrading your operating system for life. This is permanent." },
              { icon: "📸", title: "Progress Photos", desc: "Take front, side, and back photos every 2 weeks. The mirror lies. Photos don't." },
              { icon: "💤", title: "Sleep = Results", desc: "Fat burns while you sleep. Muscles grow while you sleep. 8 hours is non-negotiable." }
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: `${GOLD}0A`, border: `1px solid ${GOLD}22`, borderRadius: 14, padding: "16px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ color: GOLD, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#9999BB", fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ color: "#333355", fontSize: 13 }}>Built with love for Babê Kaius · Stay Consistent · Dubai 2025</p>
        </div>
      </div>
    </div>
  );
}
