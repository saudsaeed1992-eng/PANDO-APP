"use client";
import { useState } from "react";

const C = {
  bg:        "#f5ede0",
  bgPage:    "#ede0cc",
  bgCard:    "#fdf6ee",
  bgDeep:    "#f0e4d0",
  bgDark:    "#e8d8c0",
  border:    "#d4b896",
  borderHi:  "#b8956a",
  sage:      "#5a7a48",
  fern:      "#3d6030",
  moss:      "#2d4d22",
  leafLight: "#7a9e60",
  leafPale:  "#c8ddb8",
  mintCream: "#e8f0e0",
  walnut:    "#7b4f2a",
  wood:      "#9b6b3c",
  bark:      "#5c3820",
  caramel:   "#b87333",
  mocha:     "#6b3d1a",
  espresso:  "#3d2010",
  latte:     "#c8a876",
  latteLight:"#dfc49a",
  foam:      "#f5ede0",
  textDark:  "#2d1f0e",
  textMid:   "#5c3820",
  textMuted: "#8b6b4a",
  textLight: "#a88060",
  white:     "#fffdf8",
  red:       "#a0432a",
  teal:      "#3d7060",
  amber:     "#c97d30",
};

const font = {
  display: "'Georgia','Times New Roman',serif",
  body:    "'Palatino Linotype','Book Antiqua',Georgia,serif",
  mono:    "'Courier New',monospace",
};

const PERSONAL = { startWeight: 105, goalWeight: 88, height: 176 };
const bmi      = (w) => (w / ((PERSONAL.height/100)**2)).toFixed(1);
const bmiLabel = (b) => b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";

// ── UI Atoms ─────────────────────────────────────────────────────
function Ring({ pct, color, size=78, label, value, unit }) {
  const r=((size-10)/2), circ=2*Math.PI*r, dash=(Math.min(100,pct)/100)*circ;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
      <div style={{position:"relative",width:size,height:size}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bgDark} strokeWidth={7}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{transition:"stroke-dasharray 0.8s ease"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:font.mono,fontSize:"11px",fontWeight:"bold",color}}>{Math.round(pct)}%</span>
        </div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:font.display,fontSize:"13px",color:C.textDark,fontWeight:"bold"}}>{value}{unit}</div>
        <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{label}</div>
      </div>
    </div>
  );
}

function Bar({pct,color,h=8}){
  return(
    <div style={{background:C.bgDark,borderRadius:"20px",height:h,overflow:"hidden",border:`1px solid ${C.border}`}}>
      <div style={{width:`${Math.min(100,Math.max(0,pct))}%`,height:"100%",background:color,borderRadius:"20px",transition:"width 0.8s ease"}}/>
    </div>
  );
}

function Card({children,style={},topColor}){
  return(
    <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"20px",padding:"20px",
      boxShadow:"0 2px 16px rgba(90,55,20,0.10)",borderTop:topColor?`3px solid ${topColor}`:undefined,...style}}>
      {children}
    </div>
  );
}

function Divider({label}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"12px 0"}}>
      <div style={{flex:1,height:"1px",background:C.border}}/>
      <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1.5px"}}>{label}</span>
      <div style={{flex:1,height:"1px",background:C.border}}/>
    </div>
  );
}

function StatBox({label,value,color,bg}){
  return(
    <div style={{background:bg||C.bgDeep,borderRadius:"12px",padding:"11px 8px",textAlign:"center",border:`1px solid ${C.border}`}}>
      <div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:color||C.fern}}>{value}</div>
      <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"2px"}}>{label}</div>
    </div>
  );
}

function NavBtn({label,icon,active,onClick}){
  return(
    <button onClick={onClick} style={{flex:1,
      background:active?`linear-gradient(160deg,${C.fern},${C.moss})`:C.bgDark,
      border:`1px solid ${active?C.fern:C.border}`,borderRadius:"14px",padding:"12px 6px",
      color:active?C.white:C.textMuted,fontFamily:font.display,fontWeight:active?"bold":"normal",
      fontSize:"clamp(11px,2vw,13px)",cursor:"pointer",display:"flex",flexDirection:"column",
      alignItems:"center",gap:"4px",transition:"all 0.25s ease",
      boxShadow:active?`0 3px 14px ${C.moss}44`:"none"}}>
      <span style={{fontSize:"18px"}}>{icon}</span>{label}
    </button>
  );
}

function InputRow({label,value,onChange,unit,min,max,step,icon}){
  return(
    <div style={{marginBottom:"12px"}}>
      <label style={{display:"flex",gap:"5px",alignItems:"center",fontFamily:font.body,fontSize:"11px",
        color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"4px"}}>
        <span>{icon}</span>{label}
      </label>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <input type="number" value={value} min={min} max={max} step={step||1}
          onChange={e=>onChange(Number(e.target.value))}
          style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"10px",
            padding:"9px 13px",color:C.textDark,fontSize:"16px",fontFamily:font.display,
            fontWeight:"bold",outline:"none",boxSizing:"border-box"}}/>
        <span style={{fontFamily:font.body,fontSize:"12px",color:C.textLight,minWidth:"34px"}}>{unit}</span>
      </div>
    </div>
  );
}

// ── PERSONALIZED WORKOUT DATA ─────────────────────────────────────
// Based on: body analysis (belly/chest fat, knee issue), gym equipment (treadmill, elliptical,
// bike, cable machine, dumbbells 2-20kg, flat bench, yoga mat), schedule (7:30am or 7:30pm)
const workoutWeeks = [
  {
    week:"Week 1–2", theme:"Foundation — Build the Habit (45 min sessions)",
    color:C.sage, focus:"Cardio base + activating muscles under fat",
    days:[
      { day:"Saturday",   time:"7:30am", icon:"🚶", name:"Incline Treadmill Walk",
        equipment:"Treadmill",
        sets:"45 min · 4% incline · 5.5 km/h",
        details:"Warm up 5 min flat. Increase to 4% incline at 5.5 km/h for 35 min. Cool down 5 min flat. This burns 350–400 kcal and targets belly fat without knee stress.",
        link:"https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day:"Sunday",     time:"7:30am", icon:"💪", name:"Dumbbell Upper Body A",
        equipment:"Dumbbells + Bench",
        sets:"4 exercises · 3 sets × 12 reps",
        details:"1) Flat DB Chest Press 10kg · 2) One-Arm DB Row 12kg · 3) DB Lateral Raise 6kg · 4) DB Bicep Curl 10kg. Rest 60s between sets. Focus on chest and back to reduce chest fat appearance.",
        link:"https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day:"Monday",     time:"7:30am", icon:"🚴", name:"Stationary Bike — Fat Burn Zone",
        equipment:"Upright Bike",
        sets:"40 min · moderate resistance · 70–75% max HR",
        details:"Set resistance level 4–5. Maintain 80–90 RPM cadence for 40 min. Keep heart rate at 120–130 BPM. This is the optimal fat-burning zone for your current fitness level. No knee impact.",
        link:"https://www.youtube.com/watch?v=lJbSB9oy4HM" },
      { day:"Tuesday",    time:"7:30am", icon:"🔄", name:"Cable Machine Full Body",
        equipment:"Cable Machine",
        sets:"5 exercises · 3 sets × 12 reps",
        details:"1) Cable Lat Pulldown · 2) Cable Seated Row · 3) Cable Chest Fly (mid) · 4) Cable Tricep Pushdown · 5) Cable Face Pull. These target back width and chest — crucial for your body shape.",
        link:"https://www.youtube.com/watch?v=mYgBYhsv7hs" },
      { day:"Wednesday",  time:"7:30am", icon:"🧘", name:"Core + Mobility Circuit",
        equipment:"Yoga Mat",
        sets:"4 rounds · no rest between exercises",
        details:"1) Dead Bug 30s · 2) Bird Dog 30s each side · 3) Plank 20s · 4) Glute Bridge 15 reps · 5) Cat-Cow 10 reps. No crunches — dead bugs and planks are safer for your lower back and more effective for belly fat.",
        link:"https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day:"Thursday",   time:"7:30am", icon:"🌊", name:"Elliptical — Low Impact Cardio",
        equipment:"Elliptical",
        sets:"40 min · level 5 resistance",
        details:"The elliptical is perfect for your knees — zero impact. Full body cardio. Keep resistance at level 5, push and pull the handles actively. Burns 400–450 kcal. Great for chest fat reduction.",
        link:"https://www.youtube.com/watch?v=EL3G9byiMWw" },
      { day:"Friday",     time:"—",      icon:"😴", name:"Rest & Recovery",
        equipment:"Home",
        sets:"Full rest day",
        details:"Stretch for 10 min. Sleep 8 hours. Drink 3L water. Prep your meals for the week. Recovery is when your body burns fat and builds muscle.",
        link:"" },
    ],
  },
  {
    week:"Week 3–4", theme:"Intensity Up — Chest & Belly Attack (50 min sessions)",
    color:C.wood, focus:"Target chest fat + increase calorie burn",
    days:[
      { day:"Saturday",   time:"7:30am", icon:"⚡", name:"Treadmill Intervals",
        equipment:"Treadmill",
        sets:"50 min · interval protocol",
        details:"5 min warm-up flat. Then 8 rounds: 3 min at 5.5 km/h 6% incline + 2 min at 4.5 km/h 2% incline. Cool down 5 min. This HIIT incline protocol melts belly and chest fat 2× faster than steady cardio.",
        link:"https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day:"Sunday",     time:"7:30am", icon:"💪", name:"Chest & Tricep Focus",
        equipment:"Dumbbells + Bench + Cable",
        sets:"5 exercises · 4 sets × 10 reps",
        details:"1) Flat DB Press 12kg · 2) Incline DB Press 10kg (reduces upper chest fat) · 3) Cable Chest Fly Low-to-High · 4) DB Tricep Kickback 8kg · 5) Cable Tricep Pushdown. Key for chest fat reduction.",
        link:"https://www.youtube.com/watch?v=vcBig73ojpE" },
      { day:"Monday",     time:"7:30am", icon:"🚴", name:"Bike HIIT — 30/30 Protocol",
        equipment:"Upright Bike",
        sets:"35 min · HIIT intervals",
        details:"Warm up 5 min easy. Then 20 rounds of: 30 sec MAX effort sprint + 30 sec easy recovery. Cool down 5 min. This post-workout afterburn effect burns fat for 24 hours. Burns 500+ kcal.",
        link:"https://www.youtube.com/watch?v=lJbSB9oy4HM" },
      { day:"Tuesday",    time:"7:30am", icon:"🏋️", name:"Back & Bicep Width",
        equipment:"Cable Machine + Dumbbells",
        sets:"5 exercises · 4 sets × 10 reps",
        details:"1) Cable Lat Pulldown wide grip · 2) Cable Single-Arm Row · 3) DB Hammer Curl 12kg · 4) Cable Face Pull · 5) DB Rear Delt Fly 6kg. Building back width makes waist LOOK smaller instantly.",
        link:"https://www.youtube.com/watch?v=mYgBYhsv7hs" },
      { day:"Wednesday",  time:"7:30am", icon:"🔥", name:"Core Blast — Belly Protocol",
        equipment:"Yoga Mat + Cable",
        sets:"4 rounds · 45s work / 15s rest",
        details:"1) Plank with shoulder tap · 2) Dead Bug · 3) Cable Woodchop (love handles) · 4) Glute Bridge march · 5) Side Plank 20s each. Cable woodchops directly target your love handles and obliques.",
        link:"https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day:"Thursday",   time:"7:30am", icon:"🌊", name:"Elliptical Endurance",
        equipment:"Elliptical",
        sets:"50 min · level 6–7",
        details:"Level 6–7 resistance. Alternate: 5 min forward + 2 min backward (activates glutes and hamstrings differently). No hands for 2 min intervals to engage core. Excellent full-body fat burn.",
        link:"https://www.youtube.com/watch?v=EL3G9byiMWw" },
      { day:"Friday",     time:"—",      icon:"😴", name:"Rest & Stretch",
        equipment:"Home",
        sets:"Active recovery",
        details:"10 min full body stretch. Walk 20 min at slow pace if energy allows. Foam roll upper back and calves. Focus on sleep — growth hormone released during sleep burns fat.",
        link:"" },
    ],
  },
  {
    week:"Week 5–6", theme:"Peak Fat Burn — Compound Power (55 min sessions)",
    color:C.caramel, focus:"Maximize calorie deficit + build visible muscle",
    days:[
      { day:"Saturday",   time:"7:30am", icon:"🏔️", name:"Treadmill Power Walk — Max Incline",
        equipment:"Treadmill",
        sets:"55 min · 8% incline",
        details:"Warm up 5 min flat. Main: 40 min at 8% incline 5.5 km/h. This is the famous 12-3-30 variation. Burns 500–600 kcal. Targets glutes, hamstrings and shreds belly fat. Cool down 10 min.",
        link:"https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day:"Sunday",     time:"7:30am", icon:"💥", name:"Push Day — Chest + Shoulders",
        equipment:"Dumbbells + Bench + Cable",
        sets:"6 exercises · 4 sets × 10 reps",
        details:"1) Flat DB Press 14kg · 2) Incline DB Press 12kg · 3) DB Lateral Raise 8kg · 4) Cable Chest Fly · 5) DB Front Raise 8kg · 6) Cable Overhead Tricep Extension. Supersets for maximum burn.",
        link:"https://www.youtube.com/watch?v=vcBig73ojpE" },
      { day:"Monday",     time:"7:30am", icon:"🚴", name:"Bike Tabata Protocol",
        equipment:"Upright Bike",
        sets:"40 min total · Tabata intervals",
        details:"Warm up 8 min. Then 6 rounds Tabata: 20 sec max sprint + 10 sec rest × 8 sets = 4 min per round. Rest 2 min between rounds. This is the most time-efficient fat-burning protocol. Burn 550 kcal in 40 min.",
        link:"https://www.youtube.com/watch?v=lJbSB9oy4HM" },
      { day:"Tuesday",    time:"7:30am", icon:"🏋️", name:"Pull Day — Back + Bicep",
        equipment:"Cable Machine + Dumbbells",
        sets:"6 exercises · 4 sets × 10 reps",
        details:"1) Cable Lat Pulldown close grip · 2) Cable Straight-Arm Pulldown · 3) DB Bent-Over Row 14kg · 4) Cable Reverse Fly · 5) DB Hammer Curl 14kg · 6) Cable Curl. Back and bicep = most calories burned in upper body.",
        link:"https://www.youtube.com/watch?v=mYgBYhsv7hs" },
      { day:"Wednesday",  time:"7:30am", icon:"🔥", name:"Core + Cable Circuit",
        equipment:"Cable + Yoga Mat",
        sets:"5 rounds · no rest",
        details:"1) Cable Woodchop high-to-low 10 reps each side · 2) Plank 40s · 3) Cable Crunch 15 reps · 4) Dead Bug 30s · 5) Side Plank 25s each. Cable crunches directly target your rectus abdominis under the belly fat.",
        link:"https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day:"Thursday",   time:"7:30am", icon:"🌊", name:"Elliptical + DB Finisher",
        equipment:"Elliptical + Dumbbells",
        sets:"45 min elliptical + 10 min DB circuit",
        details:"45 min elliptical level 7–8. Then immediately: DB Shoulder Press 10kg × 15 + DB Curl × 15 + DB Lateral Raise × 15 — 3 rounds no rest. This combination maximizes the fat-burning window.",
        link:"https://www.youtube.com/watch?v=EL3G9byiMWw" },
      { day:"Friday",     time:"—",      icon:"😴", name:"Full Rest",
        equipment:"Home",
        sets:"Mandatory recovery",
        details:"At this point your body needs full rest to rebuild. Sleep 8h. Take progress photos. Measure waist. Drink 3.5L water. Enjoy your results — you earned it!",
        link:"" },
    ],
  },
  {
    week:"Week 7–8", theme:"Consolidation & Results — Victory Lap (60 min sessions)",
    color:C.fern, focus:"Cement the habit, push final results",
    days:[
      { day:"Saturday",   time:"7:30am", icon:"🎯", name:"Treadmill Challenge — 60 min",
        equipment:"Treadmill",
        sets:"60 min · progressive incline",
        details:"10 min flat warm-up. 10 min 3% incline. 10 min 5% incline. 10 min 8% incline. 10 min 5% incline. 10 min flat cool-down. Progressive incline challenge burns 650+ kcal in one session.",
        link:"https://www.youtube.com/watch?v=O9RMnVsSwgo" },
      { day:"Sunday",     time:"7:30am", icon:"🏆", name:"Upper Body Strength Max",
        equipment:"Full Gym",
        sets:"6 exercises · 4 sets × 8 reps heavy",
        details:"Go heavy this week. 1) DB Chest Press 16kg · 2) Cable Row heavy · 3) DB Shoulder Press 12kg · 4) Cable Lat Pulldown heavy · 5) DB Bicep Curl 14kg · 6) Cable Tricep heavy. You are stronger now.",
        link:"https://www.youtube.com/watch?v=vc1E5CfRfos" },
      { day:"Monday",     time:"7:30am", icon:"⚡", name:"Bike Max Effort — 45 min",
        equipment:"Upright Bike",
        sets:"45 min · personal best attempt",
        details:"Aim to beat your best distance or calories burned. Level 6 resistance. Maintain 85–95 RPM. Check calorie counter and try to beat week 1 by 20%. You are 30% fitter now than week 1.",
        link:"https://www.youtube.com/watch?v=lJbSB9oy4HM" },
      { day:"Tuesday",    time:"7:30am", icon:"💥", name:"Full Body Cable Circuit",
        equipment:"Cable Machine",
        sets:"6 cable exercises · 4 sets × 12 reps",
        details:"1) Cable Lat Pulldown · 2) Cable Chest Press · 3) Cable Row · 4) Cable Woodchop · 5) Cable Face Pull · 6) Cable Curl. Full body in one machine — maximum fat burning in minimum time.",
        link:"https://www.youtube.com/watch?v=mYgBYhsv7hs" },
      { day:"Wednesday",  time:"7:30am", icon:"🔥", name:"Core Endurance Final Test",
        equipment:"Yoga Mat + Cable",
        sets:"5 rounds · timed",
        details:"1) Plank 60s · 2) Dead Bug 45s · 3) Cable Woodchop 15 each · 4) Side Plank 30s each · 5) Glute Bridge hold 45s. Time yourself. Compare to week 1. You will be shocked at your improvement.",
        link:"https://www.youtube.com/watch?v=AnYl6Nk9GOA" },
      { day:"Thursday",   time:"7:30am", icon:"🌊", name:"Elliptical Victory Session",
        equipment:"Elliptical",
        sets:"60 min · level 8",
        details:"Your strongest elliptical session. Level 8. Mix forward and backward. No hands for 5 min intervals. You should be breathing hard but able to talk. This is your fitness level now vs 8 weeks ago.",
        link:"https://www.youtube.com/watch?v=EL3G9byiMWw" },
      { day:"Friday",     time:"—",      icon:"✨", name:"Reflection & Reset",
        equipment:"Home",
        sets:"Celebrate + plan next phase",
        details:"Take full set of progress photos. Measure waist, chest, hips. Weigh yourself. Compare to week 1 photos. You did 8 weeks of consistent work. Plan your next 8 weeks.",
        link:"" },
    ],
  },
];

// ── PERSONALIZED MEAL DATA ────────────────────────────────────────
// Calories: 1800 kcal/day (deficit from ~2800 TDEE at 105kg)
// Protein: 160g/day (1.5g per kg goal weight — preserves muscle while losing fat)
// Meal timing: around work schedule 10am–7pm
const meals = [
  {
    meal:"Pre-Workout Breakfast", icon:"☕", time:"7:00 AM",
    name:"Eggs & Oats Power Bowl",
    calories:420, protein:35, carbs:38, fat:12,
    why:"High protein before morning workout prevents muscle breakdown. Oats give sustained energy for your 45–60 min session.",
    ingredients:[
      "3 whole eggs (scrambled or boiled)",
      "60g rolled oats",
      "150ml almond milk (unsweetened)",
      "1 tbsp natural peanut butter",
      "½ banana sliced",
      "Pinch of cinnamon & salt",
    ],
    instructions:"Cook oats in almond milk 4–5 min. In a separate pan, scramble 3 eggs with salt. Serve oats topped with banana slices and peanut butter. Eat 30 min before workout for best energy.",
    video:"https://www.youtube.com/watch?v=kd3goxFqbJA",
  },
  {
    meal:"Post-Workout Meal", icon:"🥗", time:"9:30 AM",
    name:"Grilled Chicken & Brown Rice",
    calories:520, protein:52, carbs:44, fat:10,
    why:"This meal eaten within 45 min after workout maximises muscle repair and fat loss simultaneously. The window is critical.",
    ingredients:[
      "200g chicken breast (grilled)",
      "80g brown rice (dry weight)",
      "100g mixed salad leaves",
      "½ cucumber sliced",
      "10 cherry tomatoes",
      "1 tbsp olive oil + lemon juice",
      "Salt, pepper, garlic powder",
    ],
    instructions:"Season chicken with garlic powder, salt, pepper. Grill or pan-fry 6–7 min per side on medium heat. Cook brown rice per pack instructions. Assemble plate: rice base, chicken on top, salad on side dressed with olive oil and lemon.",
    video:"https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal:"Work Lunch", icon:"🍗", time:"1:00 PM",
    name:"Tuna & Avocado Rice Cake Plate",
    calories:380, protein:36, carbs:28, fat:14,
    why:"Easy to prep the night before and bring to work. High protein keeps you full through afternoon. No cooking needed at work.",
    ingredients:[
      "2 cans tuna in water (160g drained)",
      "½ avocado",
      "4 rice cakes (plain)",
      "50g baby spinach",
      "1 tbsp Greek yogurt (mixed into tuna)",
      "Lemon juice, salt, black pepper",
      "5 cherry tomatoes",
    ],
    instructions:"Drain tuna. Mix with Greek yogurt, lemon juice, salt, pepper. Mash avocado with salt and lemon. Spread avocado on rice cakes, top with tuna mix. Serve with spinach and tomatoes on the side. Prep and store in containers the night before.",
    video:"https://www.youtube.com/watch?v=6A_5FJKIMLE",
  },
  {
    meal:"Afternoon Snack", icon:"🥜", time:"4:00 PM",
    name:"Greek Yogurt Protein Bowl",
    calories:210, protein:28, carbs:18, fat:4,
    why:"Mid-afternoon protein prevents muscle breakdown during the work-to-evening gap. Prevents overeating at dinner.",
    ingredients:[
      "200g Greek yogurt (0% fat)",
      "1 scoop vanilla protein powder (optional)",
      "80g mixed berries (fresh or frozen)",
      "1 tbsp chia seeds",
      "1 tsp honey",
    ],
    instructions:"Mix protein powder into yogurt if using. Top with berries, chia seeds, and a drizzle of honey. Can be prepped in a jar the night before and kept in the office fridge.",
    video:"https://www.youtube.com/watch?v=xGrC_vHH3oU",
  },
  {
    meal:"Dinner", icon:"🐟", time:"8:00 PM",
    name:"Baked Salmon with Roasted Vegetables",
    calories:460, protein:44, carbs:24, fat:20,
    why:"Omega-3 in salmon reduces inflammation, helps joint health (knees), and supports fat burning during sleep. Vegetables keep insulin low overnight.",
    ingredients:[
      "200g salmon fillet",
      "150g broccoli florets",
      "100g sweet potato (cubed)",
      "1 zucchini sliced",
      "2 garlic cloves minced",
      "1 tbsp olive oil",
      "Lemon slices, fresh dill or dried",
      "Salt, pepper, paprika",
    ],
    instructions:"Preheat oven to 200°C. Toss broccoli, sweet potato, and zucchini in olive oil, salt, pepper. Roast 20 min. Place salmon on baking tray, rub with garlic, paprika, salt. Top with lemon and dill. Bake 13–15 min until salmon flakes easily. Serve immediately.",
    video:"https://www.youtube.com/watch?v=M_a_HcNADP4",
  },
  {
    meal:"Pre-Sleep Snack", icon:"🌙", time:"10:00 PM",
    name:"Cottage Cheese & Almonds",
    calories:210, protein:24, carbs:8, fat:10,
    why:"Casein protein in cottage cheese digests slowly overnight — feeds muscles for 7–8 hours during sleep. This is the most underrated fat-loss and muscle-preservation hack.",
    ingredients:[
      "200g cottage cheese (low fat)",
      "20g raw almonds (about 15 almonds)",
      "Pinch of cinnamon",
      "Optional: ½ tsp honey",
    ],
    instructions:"Serve cottage cheese in a bowl. Top with almonds and cinnamon. Eat 30 min before sleep. This slow-digesting protein prevents muscle loss overnight and keeps metabolism active during sleep.",
    video:"https://www.youtube.com/watch?v=Yz4hDgk_3iU",
  },
];

const quotes = [
  {text:"The pain you feel today will be the strength you feel tomorrow.",author:"Arnold Schwarzenegger"},
  {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
  {text:"Every workout is progress. Every meal is a choice. Make them count.",author:"Unknown"},
  {text:"Take care of your body. It is the only place you have to live.",author:"Jim Rohn"},
  {text:"Your body can stand almost anything. It is your mind you have to convince.",author:"Unknown"},
];

// ── HOME VIEW ──────────────────────────────────────────────────
function HomeView({logs}){
  const [qIdx,setQIdx]=useState(0);
  const startW=PERSONAL.startWeight, goalW=PERSONAL.goalWeight, range=startW-goalW;
  const latest=logs.length>0?logs[logs.length-1].weight:startW;
  const lost=Math.max(0,startW-latest);
  const wPct=Math.min(100,(lost/range)*100);
  const totalDone=logs.length;
  const totalPlanned=workoutWeeks.reduce((a,w)=>a+w.days.filter(d=>d.link).length,0);
  const woPct=Math.min(100,(totalDone/totalPlanned)*100);
  const avgSteps=logs.length>0?Math.round(logs.reduce((a,l)=>a+(l.steps||0),0)/logs.length):0;
  const avgWater=logs.length>0?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.length).toFixed(1):"—";
  const avgSleep=logs.length>0?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.length).toFixed(1):"—";
  const curBMI=bmi(latest);
  const behind=latest>startW-(range/8)*2&&logs.length>5;
  const totCal=meals.reduce((a,m)=>a+m.calories,0);
  const totProt=meals.reduce((a,m)=>a+m.protein,0);

  return(
    <div>
      {/* Body Analysis Banner */}
      <Card topColor={C.bark} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.espresso}22,${C.bgCard})`}}>
        <Divider label="Body Analysis — Start Point"/>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.7,marginBottom:"12px"}}>
          Based on your photos: primary fat storage in <strong style={{color:C.walnut}}>abdomen, chest, lower back and flanks</strong>.
          You have a good broad shoulder frame. Target: reduce visceral belly fat, chest fat, and love handles.
          Your knee issue means <strong style={{color:C.red}}>zero jumping, zero deep squats</strong> — all workouts are designed around your treadmill, elliptical, bike, cable machine and dumbbells.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {[
            {l:"Daily Calories",v:totCal+"kcal",c:C.walnut},
            {l:"Daily Protein",v:totProt+"g",c:C.fern},
            {l:"Workout Time",v:"7:30 AM",c:C.wood},
            {l:"Duration",v:"45–60 min",c:C.caramel},
          ].map((s,i)=>(
            <div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px",border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:font.display,fontSize:"15px",fontWeight:"bold",color:s.c}}>{s.v}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Profile */}
      <Card topColor={C.fern} style={{marginBottom:"14px"}}>
        <Divider label="Your Profile"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          <StatBox label="Start Weight" value={startW+"kg"}   color={C.walnut}/>
          <StatBox label="Goal Weight"  value={goalW+"kg"}    color={C.fern}/>
          <StatBox label="Current"      value={latest+"kg"}   color={C.textDark}/>
          <StatBox label="Height"       value={PERSONAL.height+"cm"} color={C.wood}/>
          <StatBox label="BMI"          value={curBMI}        color={parseFloat(curBMI)<25?C.fern:C.amber}/>
          <StatBox label="Status"       value={bmiLabel(parseFloat(curBMI))} color={parseFloat(curBMI)<25?C.fern:C.amber}/>
        </div>
        <div style={{marginTop:"8px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
          <StatBox label="Lost"   value={lost.toFixed(1)+"kg"} color={C.fern}    bg={C.mintCream}/>
          <StatBox label="To Go"  value={Math.max(0,range-lost).toFixed(1)+"kg"} color={C.amber} bg={`${C.amber}18`}/>
          <StatBox label="Done"   value={Math.round(wPct)+"%"}  color={C.sage}   bg={C.mintCream}/>
        </div>
      </Card>

      {behind&&(
        <div style={{background:`${C.amber}22`,border:`1px solid ${C.amber}88`,borderRadius:"14px",padding:"12px 16px",marginBottom:"14px",display:"flex",gap:"10px",alignItems:"center"}}>
          <span style={{fontSize:"18px"}}>🍂</span>
          <span style={{color:C.mocha,fontSize:"12px",fontFamily:font.body,lineHeight:1.5}}>Weight progress may be behind schedule. Check your nutrition — are you sticking to 1800 kcal/day?</span>
        </div>
      )}

      {/* Rings */}
      <Card topColor={C.wood} style={{marginBottom:"14px"}}>
        <Divider label="Overall Progress"/>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"14px"}}>
          <Ring pct={wPct}  color={C.fern}    size={78} label="weight" value={lost.toFixed(1)} unit="kg"/>
          <Ring pct={woPct} color={C.wood}    size={78} label="workouts" value={totalDone} unit=""/>
          <Ring pct={Math.min(100,(avgSteps/10000)*100)} color={C.caramel} size={78} label="avg steps" value={avgSteps} unit=""/>
          <Ring pct={Math.min(100,(parseFloat(avgWater)/3)*100)} color={C.teal} size={78} label="avg water" value={avgWater} unit="L"/>
        </div>
      </Card>

      {/* Log Sheet */}
      <Card topColor={C.caramel} style={{marginBottom:"14px"}}>
        <Divider label="Workout Log Sheet"/>
        {logs.length===0?(
          <div style={{textAlign:"center",padding:"28px 0",color:C.textLight,fontFamily:font.body,fontSize:"13px",fontStyle:"italic"}}>
            🌱 No workouts logged yet.<br/>Go to Workout tab and press + Log after each session!
          </div>
        ):(
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:font.body,fontSize:"12px"}}>
              <thead>
                <tr style={{borderBottom:`2px solid ${C.border}`}}>
                  {["#","Date","Workout","Weight","Steps","Water","Sleep","Feel"].map(h=>(
                    <th key={h} style={{padding:"7px 6px",color:C.textMuted,fontWeight:"normal",textAlign:"left",whiteSpace:"nowrap",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.6px"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${C.bgDark}`,background:i%2===0?C.bgDeep:"transparent"}}>
                    <td style={{padding:"8px 6px",color:C.textLight}}>{logs.length-i}</td>
                    <td style={{padding:"8px 6px",color:C.textMid,whiteSpace:"nowrap"}}>{log.date}</td>
                    <td style={{padding:"8px 6px",color:C.textDark,fontWeight:"bold"}}>{log.workoutName}</td>
                    <td style={{padding:"8px 6px",color:C.walnut}}>{log.weight}kg</td>
                    <td style={{padding:"8px 6px",color:C.wood}}>{log.steps}</td>
                    <td style={{padding:"8px 6px",color:C.teal}}>{log.water}L</td>
                    <td style={{padding:"8px 6px",color:C.fern}}>{log.sleep}h</td>
                    <td style={{padding:"8px 6px",fontSize:"16px"}}>{log.feel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {logs.length>0&&(
          <div style={{marginTop:"12px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
            <StatBox label="Sessions"  value={totalDone}    color={C.caramel}/>
            <StatBox label="Avg Sleep" value={avgSleep+"h"} color={C.teal}/>
            <StatBox label="Avg Water" value={avgWater+"L"} color={C.fern}/>
          </div>
        )}
      </Card>

      {/* Knee Safety */}
      <Card topColor={C.bark} style={{marginBottom:"14px"}}>
        <Divider label="Knee Safety Protocol"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {[
            {icon:"🚫",t:"No Deep Squats",d:"Nothing below 90°",c:C.red},
            {icon:"🚫",t:"No Jumping",d:"Zero impact moves",c:C.red},
            {icon:"🚫",t:"Stop Sharp Pain",d:"Rest & ice at once",c:C.red},
            {icon:"✅",t:"Elliptical First",d:"Zero joint impact",c:C.fern},
            {icon:"✅",t:"Incline Walk",d:"Knee-safe cardio",c:C.fern},
            {icon:"✅",t:"Ice After Session",d:"10–15 min ice pack",c:C.fern},
          ].map((k,i)=>(
            <div key={i} style={{background:k.c===C.fern?C.mintCream:`${C.red}12`,border:`1px solid ${k.c===C.fern?C.leafPale:C.red+"44"}`,borderRadius:"10px",padding:"10px 12px"}}>
              <div style={{fontSize:"14px",marginBottom:"3px"}}>{k.icon}</div>
              <div style={{fontFamily:font.display,fontSize:"12px",fontWeight:"bold",color:k.c}}>{k.t}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{k.d}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivation */}
      <Card style={{background:`linear-gradient(160deg,${C.mintCream},${C.bgCard})`,border:`1px solid ${C.leafPale}`,textAlign:"center"}}>
        <div style={{fontFamily:font.display,fontSize:"clamp(14px,3vw,18px)",fontStyle:"italic",color:C.textDark,lineHeight:1.7,marginBottom:"10px"}}>
          "{quotes[qIdx].text}"
        </div>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>— {quotes[qIdx].author}</div>
        <button onClick={()=>setQIdx((qIdx+1)%quotes.length)}
          style={{background:`linear-gradient(135deg,${C.fern},${C.moss})`,color:C.white,border:"none",borderRadius:"10px",padding:"9px 22px",fontFamily:font.body,fontSize:"12px",cursor:"pointer",fontWeight:"bold"}}>
          🌿 Next Quote
        </button>
      </Card>
    </div>
  );
}

// ── WORKOUT VIEW ──────────────────────────────────────────────────
function WorkoutView({onLog,logs}){
  const [openWeek,setOpenWeek]=useState(0);
  const [logging,setLogging]=useState(null);
  const [form,setForm]=useState({weight:PERSONAL.startWeight,steps:5000,water:2.0,sleep:7,feel:"😊"});
  const isDone=(name)=>logs.some(l=>l.workoutName===name);
  const submitLog=()=>{
    if(!logging)return;
    const day=workoutWeeks[logging.wi].days[logging.di];
    const today=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
    onLog({date:today,workoutName:day.name,...form});
    setLogging(null);
  };

  return(
    <div>
      <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>🏋️ Your Personalised 8-Week Plan</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"6px"}}>Based on your body analysis & gym equipment</div>
      <div style={{background:C.mintCream,border:`1px solid ${C.leafPale}`,borderRadius:"12px",padding:"10px 14px",marginBottom:"18px"}}>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.fern,lineHeight:1.6}}>
          ⏰ <strong>Schedule:</strong> Work 10am–7pm · Workout window: <strong>7:30am–9:15am daily</strong><br/>
          🏋️ <strong>Equipment:</strong> Treadmill · Elliptical · Bike · Cable Machine · Dumbbells 2–20kg · Bench · Mat<br/>
          🦵 <strong>Knee-safe:</strong> All exercises selected to protect your knees
        </div>
      </div>

      {/* Log Modal */}
      {logging!==null&&(
        <div style={{position:"fixed",inset:0,background:"rgba(60,35,10,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:C.bgCard,border:`2px solid ${C.fern}`,borderRadius:"22px",padding:"24px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 12px 40px rgba(0,0,0,0.25)"}}>
            <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:C.fern,marginBottom:"3px"}}>✅ Log Completed Workout</div>
            <div style={{fontFamily:font.body,fontSize:"13px",color:C.textMid,marginBottom:"18px"}}>
              {workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}
            </div>
            <InputRow label="Current Weight (kg)" value={form.weight} onChange={v=>setForm({...form,weight:v})} unit="kg"    min={50} max={200} step={0.5} icon="⚖️"/>
            <InputRow label="Steps Today"          value={form.steps}  onChange={v=>setForm({...form,steps:v})}  unit="steps" min={0}  max={30000} step={100} icon="👟"/>
            <InputRow label="Water Intake (L)"     value={form.water}  onChange={v=>setForm({...form,water:v})}  unit="L"     min={0}  max={6}  step={0.1} icon="💧"/>
            <InputRow label="Sleep Last Night (h)" value={form.sleep}  onChange={v=>setForm({...form,sleep:v})}  unit="hrs"   min={0}  max={12} step={0.5} icon="🌙"/>
            <div style={{marginBottom:"16px"}}>
              <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>How Did You Feel?</div>
              <div style={{display:"flex",gap:"8px"}}>
                {["😴","😐","😊","💪","🔥"].map(e=>(
                  <button key={e} onClick={()=>setForm({...form,feel:e})}
                    style={{flex:1,fontSize:"20px",padding:"8px 4px",borderRadius:"10px",border:`2px solid ${form.feel===e?C.fern:C.border}`,background:form.feel===e?C.mintCream:C.bgDeep,cursor:"pointer"}}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:"10px"}}>
              <button onClick={()=>setLogging(null)}
                style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px",color:C.textMuted,fontFamily:font.body,fontSize:"13px",cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={submitLog}
                style={{flex:2,background:`linear-gradient(135deg,${C.fern},${C.moss})`,border:"none",borderRadius:"12px",padding:"12px",color:C.white,fontFamily:font.display,fontWeight:"bold",fontSize:"14px",cursor:"pointer"}}>
                ✅ Save to Log
              </button>
            </div>
          </div>
        </div>
      )}

      {workoutWeeks.map((wk,wi)=>(
        <div key={wi} style={{marginBottom:"10px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)"}}>
          <button onClick={()=>setOpenWeek(openWeek===wi?-1:wi)} style={{
            width:"100%",background:openWeek===wi?`linear-gradient(90deg,${wk.color}18,${C.bgCard})`:C.bgCard,
            border:"none",padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",
            borderBottom:openWeek===wi?`1px solid ${C.border}`:"none"}}>
            <div style={{textAlign:"left"}}>
              <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:wk.color}}>{wk.week}</div>
              <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{wk.theme}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:wk.color,marginTop:"2px"}}>🎯 {wk.focus}</div>
            </div>
            <span style={{color:wk.color,fontSize:"16px",transform:openWeek===wi?"rotate(180deg)":"none",transition:"transform 0.3s"}}>▼</span>
          </button>

          {openWeek===wi&&(
            <div style={{padding:"10px"}}>
              {wk.days.map((d,di)=>{
                const done=isDone(d.name);
                const isRest=!d.link;
                return(
                  <div key={di} style={{background:done?C.mintCream:C.bgDeep,border:`1px solid ${done?C.leafPale:C.border}`,borderRadius:"14px",padding:"14px",marginBottom:"8px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"4px",flexWrap:"wrap"}}>
                          <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"0.6px"}}>{d.icon} {d.day}</span>
                          <span style={{fontFamily:font.mono,fontSize:"10px",color:wk.color,background:`${wk.color}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {d.time}</span>
                          <span style={{fontFamily:font.mono,fontSize:"10px",color:C.wood,background:`${C.wood}18`,padding:"2px 8px",borderRadius:"20px"}}>🏋️ {d.equipment}</span>
                        </div>
                        <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:done?C.fern:C.textDark}}>{d.name}{done?" ✓":""}</div>
                        <div style={{fontFamily:font.mono,fontSize:"11px",color:wk.color,marginTop:"2px",marginBottom:"4px"}}>{d.sets}</div>
                        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,lineHeight:1.5}}>{d.details}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"6px",alignItems:"flex-end"}}>
                        {d.link&&(
                          <a href={d.link} target="_blank" rel="noopener noreferrer"
                            style={{background:C.red,color:"#fff",fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",textDecoration:"none",whiteSpace:"nowrap"}}>
                            ▶ Watch
                          </a>
                        )}
                        {!isRest&&(
                          <button onClick={()=>{setLogging({wi,di});setForm({weight:PERSONAL.startWeight,steps:5000,water:2.0,sleep:7,feel:"😊"});}}
                            style={{background:done?C.mintCream:`linear-gradient(135deg,${C.fern},${C.moss})`,border:`1px solid ${done?C.fern:C.moss}`,color:done?C.fern:C.white,fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontFamily:font.body,whiteSpace:"nowrap"}}>
                            {done?"✓ Logged":"+ Log"}
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

// ── FOOD VIEW ─────────────────────────────────────────────────────
function FoodView(){
  const [open,setOpen]=useState(null);
  const totCal=meals.reduce((a,m)=>a+m.calories,0);
  const totProt=meals.reduce((a,m)=>a+m.protein,0);
  const totCarb=meals.reduce((a,m)=>a+m.carbs,0);
  const totFat=meals.reduce((a,m)=>a+m.fat,0);

  return(
    <div>
      <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>☕ Personalised Fat-Loss Meal Plan</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>Designed around your 10am–7pm work schedule</div>

      {/* Schedule overview */}
      <Card style={{marginBottom:"14px",background:C.mintCream,border:`1px solid ${C.leafPale}`}}>
        <Divider label="Daily Meal Schedule"/>
        {meals.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",borderBottom:i<meals.length-1?`1px solid ${C.border}`:"none"}}>
            <div style={{fontFamily:font.mono,fontSize:"12px",color:C.wood,minWidth:"65px"}}>{m.time}</div>
            <div style={{fontSize:"16px"}}>{m.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:font.display,fontSize:"13px",fontWeight:"bold",color:C.textDark}}>{m.name}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{m.meal}</div>
            </div>
            <div style={{fontFamily:font.mono,fontSize:"12px",color:C.walnut,fontWeight:"bold"}}>{m.calories}kcal</div>
          </div>
        ))}
      </Card>

      {/* Totals */}
      <Card topColor={C.fern} style={{marginBottom:"16px"}}>
        <Divider label="Daily Nutritional Totals"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"12px"}}>
          {[
            {l:"Calories",v:totCal,suf:"kcal",c:C.walnut},
            {l:"Protein", v:totProt,suf:"g",  c:C.fern},
            {l:"Carbs",   v:totCarb,suf:"g",  c:C.teal},
            {l:"Fat",     v:totFat, suf:"g",  c:C.caramel},
          ].map((t,i)=>(
            <div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px 6px",textAlign:"center",border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:t.c}}>{t.v}</div>
              <div style={{fontFamily:font.mono,fontSize:"9px",color:C.textLight}}>{t.suf}</div>
              <div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{t.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginBottom:"5px"}}>Protein target (160g = 1.5g per kg goal weight)</div>
        <Bar pct={(totProt/160)*100} color={C.fern} h={7}/>
        <div style={{fontFamily:font.mono,fontSize:"10px",color:C.textMuted,marginTop:"4px",textAlign:"right"}}>{totProt}g / 160g</div>
        <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"8px",marginBottom:"4px"}}>Calorie deficit (target 1800 from ~2800 TDEE)</div>
        <Bar pct={(totCal/2800)*100} color={C.walnut} h={7}/>
        <div style={{fontFamily:font.mono,fontSize:"10px",color:C.textMuted,marginTop:"4px",textAlign:"right"}}>{totCal}kcal / ~2800 TDEE · deficit: ~{2800-totCal}kcal</div>
      </Card>

      {/* Meals */}
      {meals.map((m,i)=>(
        <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",marginBottom:"12px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)",borderLeft:`4px solid ${C.wood}`}}>
          <div style={{padding:"16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
              <div>
                <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}>
                  <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1px"}}>{m.icon} {m.meal}</span>
                  <span style={{fontFamily:font.mono,fontSize:"10px",color:C.wood,background:`${C.wood}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {m.time}</span>
                </div>
                <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:C.textDark}}>{m.name}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"22px",color:C.walnut}}>{m.calories}</div>
                <div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>kcal</div>
              </div>
            </div>

            {/* Why this meal */}
            <div style={{background:C.mintCream,borderRadius:"8px",padding:"8px 12px",marginBottom:"10px",border:`1px solid ${C.leafPale}`}}>
              <div style={{fontFamily:font.body,fontSize:"11px",color:C.fern,lineHeight:1.5}}>💡 {m.why}</div>
            </div>

            <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
              {[
                {l:"Protein",v:m.protein+"g",c:C.fern},
                {l:"Carbs",  v:m.carbs+"g",  c:C.teal},
                {l:"Fat",    v:m.fat+"g",    c:C.caramel},
              ].map((mc,j)=>(
                <div key={j} style={{flex:1,background:C.bgDeep,borderRadius:"8px",padding:"7px 4px",textAlign:"center",border:`1px solid ${C.border}`}}>
                  <div style={{fontFamily:font.mono,fontSize:"13px",fontWeight:"bold",color:mc.c}}>{mc.v}</div>
                  <div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{mc.l}</div>
                </div>
              ))}
            </div>

            <button onClick={()=>setOpen(open===i?null:i)}
              style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"8px",color:C.textMuted,cursor:"pointer",fontFamily:font.body,fontSize:"11px",marginBottom:"10px"}}>
              {open===i?"▲ Hide Details":"▼ Ingredients & Instructions"}
            </button>

            {open===i&&(
              <div style={{marginBottom:"12px"}}>
                <div style={{fontFamily:font.display,fontWeight:"bold",color:C.fern,fontSize:"12px",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.8px"}}>🌿 Ingredients</div>
                {m.ingredients.map((ing,k)=>(
                  <div key={k} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,padding:"2px 0"}}>· {ing}</div>
                ))}
                <div style={{fontFamily:font.display,fontWeight:"bold",color:C.wood,fontSize:"12px",margin:"10px 0 6px",textTransform:"uppercase",letterSpacing:"0.8px"}}>👨‍🍳 How to Prepare</div>
                <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.65}}>{m.instructions}</div>
              </div>
            )}

            <a href={m.video} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:`linear-gradient(135deg,${C.red},#7a2a1a)`,color:"#fff",fontWeight:"bold",fontFamily:font.body,fontSize:"13px",padding:"11px",borderRadius:"10px",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>
              ▶ Watch Cooking Video
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────
export default function PandoApp(){
  const [view,setView]=useState("home");
  const [logs,setLogs]=useState([]);

  return(
    <div style={{minHeight:"100vh",background:C.bgPage,color:C.textDark,fontFamily:font.body}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(139,107,60,0.04) 80px,rgba(139,107,60,0.04) 81px),repeating-linear-gradient(180deg,transparent,transparent 120px,rgba(139,107,60,0.03) 120px,rgba(139,107,60,0.03) 121px)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,background:`linear-gradient(160deg,${C.fern} 0%,${C.moss} 60%,${C.bark} 100%)`,padding:"32px 20px 24px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-30px",left:"-30px",width:"140px",height:"140px",borderRadius:"50%",background:`${C.leafLight}22`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`${C.latte}22`,pointerEvents:"none"}}/>
        <div style={{display:"inline-block",background:`${C.latte}33`,border:`1px solid ${C.latteLight}66`,color:C.foam,fontWeight:"bold",fontSize:"10px",letterSpacing:"2.5px",padding:"4px 16px",borderRadius:"20px",marginBottom:"14px",textTransform:"uppercase",fontFamily:font.body}}>
          ☕ Wood · Latte · Wellness
        </div>
        <h1 style={{fontFamily:font.display,fontSize:"clamp(28px,7vw,52px)",fontWeight:"bold",margin:"0 0 4px",color:C.foam,letterSpacing:"1px"}}>PANDO APP</h1>
        <p style={{fontFamily:font.display,fontSize:"clamp(13px,2.5vw,16px)",color:C.latteLight,margin:"0 0 4px",fontStyle:"italic"}}>2-Month Transformation · 105kg → 88kg</p>
        <p style={{fontFamily:font.body,fontSize:"12px",color:`${C.foam}99`,margin:0}}>8 Weeks · Knee-Safe · 176cm · Work 10am–7pm</p>
      </div>

      <div style={{position:"relative",zIndex:1,background:C.bgDark,borderBottom:`1px solid ${C.border}`,padding:"12px 14px"}}>
        <div style={{display:"flex",gap:"10px",maxWidth:"680px",margin:"0 auto"}}>
          <NavBtn label="Progress"  icon="🌿" active={view==="home"}    onClick={()=>setView("home")}/>
          <NavBtn label="Workout"   icon="🏋️" active={view==="workout"} onClick={()=>setView("workout")}/>
          <NavBtn label="Food Plan" icon="☕" active={view==="food"}    onClick={()=>setView("food")}/>
        </div>
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:"680px",margin:"0 auto",padding:"18px 14px 80px"}}>
        {view==="home"    && <HomeView logs={logs}/>}
        {view==="workout" && <WorkoutView onLog={e=>setLogs(p=>[...p,e])} logs={logs}/>}
        {view==="food"    && <FoodView/>}
      </div>

      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"20px 0 32px",borderTop:`1px solid ${C.border}`,background:C.bgDark}}>
        <div style={{fontFamily:font.display,fontSize:"14px",color:C.wood,fontWeight:"bold"}}>PANDO APP 🌿</div>
        <div style={{fontFamily:font.body,fontSize:"11px",color:C.textLight,marginTop:"3px"}}>Personalised for you · Stay consistent · Trust the process</div>
      </div>
    </div>
  );
}
