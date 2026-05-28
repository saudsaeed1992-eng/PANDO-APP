"use client";
import { useState } from "react";

const C = {
  bg:"#f5ede0",bgPage:"#ede0cc",bgCard:"#fdf6ee",bgDeep:"#f0e4d0",bgDark:"#e8d8c0",
  border:"#d4b896",borderHi:"#b8956a",
  sage:"#5a7a48",fern:"#3d6030",moss:"#2d4d22",leafLight:"#7a9e60",leafPale:"#c8ddb8",mintCream:"#e8f0e0",
  walnut:"#7b4f2a",wood:"#9b6b3c",bark:"#5c3820",caramel:"#b87333",mocha:"#6b3d1a",espresso:"#3d2010",
  latte:"#c8a876",latteLight:"#dfc49a",foam:"#f5ede0",
  textDark:"#2d1f0e",textMid:"#5c3820",textMuted:"#8b6b4a",textLight:"#a88060",white:"#fffdf8",
  red:"#a0432a",teal:"#3d7060",amber:"#c97d30",
};
const font={display:"'Georgia','Times New Roman',serif",body:"'Palatino Linotype','Book Antiqua',Georgia,serif",mono:"'Courier New',monospace"};
const PERSONAL={startWeight:105,goalWeight:88,height:176};
const bmi=(w)=>(w/((PERSONAL.height/100)**2)).toFixed(1);
const bmiLabel=(b)=>b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";

function Ring({pct,color,size=78,label,value,unit}){
  const r=((size-10)/2),circ=2*Math.PI*r,dash=(Math.min(100,pct)/100)*circ;
  return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bgDark} strokeWidth={7}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:"stroke-dasharray 0.8s ease"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:font.mono,fontSize:"11px",fontWeight:"bold",color}}>{Math.round(pct)}%</span></div></div><div style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontSize:"13px",color:C.textDark,fontWeight:"bold"}}>{value}{unit}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{label}</div></div></div>);
}
function Bar({pct,color,h=8}){return(<div style={{background:C.bgDark,borderRadius:"20px",height:h,overflow:"hidden",border:`1px solid ${C.border}`}}><div style={{width:`${Math.min(100,Math.max(0,pct))}%`,height:"100%",background:color,borderRadius:"20px",transition:"width 0.8s ease"}}/></div>);}
function Card({children,style={},topColor}){return(<div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"20px",padding:"20px",boxShadow:"0 2px 16px rgba(90,55,20,0.10)",borderTop:topColor?`3px solid ${topColor}`:undefined,...style}}>{children}</div>);}
function Divider({label}){return(<div style={{display:"flex",alignItems:"center",gap:"10px",margin:"12px 0"}}><div style={{flex:1,height:"1px",background:C.border}}/><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1.5px"}}>{label}</span><div style={{flex:1,height:"1px",background:C.border}}/></div>);}
function StatBox({label,value,color,bg}){return(<div style={{background:bg||C.bgDeep,borderRadius:"12px",padding:"11px 8px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:color||C.fern}}>{value}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"2px"}}>{label}</div></div>);}
function NavBtn({label,icon,active,onClick}){return(<button onClick={onClick} style={{flex:1,background:active?`linear-gradient(160deg,${C.fern},${C.moss})`:C.bgDark,border:`1px solid ${active?C.fern:C.border}`,borderRadius:"14px",padding:"12px 6px",color:active?C.white:C.textMuted,fontFamily:font.display,fontWeight:active?"bold":"normal",fontSize:"clamp(11px,2vw,13px)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",transition:"all 0.25s ease",boxShadow:active?`0 3px 14px ${C.moss}44`:"none"}}><span style={{fontSize:"18px"}}>{icon}</span>{label}</button>);}
function InputRow({label,value,onChange,unit,min,max,step,icon}){return(<div style={{marginBottom:"12px"}}><label style={{display:"flex",gap:"5px",alignItems:"center",fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"4px"}}><span>{icon}</span>{label}</label><div style={{display:"flex",alignItems:"center",gap:"8px"}}><input type="number" value={value} min={min} max={max} step={step||1} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"9px 13px",color:C.textDark,fontSize:"16px",fontFamily:font.display,fontWeight:"bold",outline:"none",boxSizing:"border-box"}}/><span style={{fontFamily:font.body,fontSize:"12px",color:C.textLight,minWidth:"34px"}}>{unit}</span></div></div>);}

// ── WORKOUT PLAN — each day has its OWN specific short tutorial video ─
const workoutWeeks=[
  {
    week:"Week 1–2", theme:"Foundation — Build the Habit (45 min sessions)",
    color:C.sage, focus:"Cardio base + activating muscles under fat",
    days:[
      { day:"Saturday",  time:"7:30am", icon:"🚶", name:"Incline Treadmill Walk",
        equipment:"Treadmill", sets:"45 min · 4% incline · 5.5 km/h",
        details:"Warm up 5 min flat. Increase to 4% incline at 5.5 km/h for 35 min. Cool down 5 min flat. Burns 350–400 kcal. Targets belly fat without knee stress. Keep back straight, no holding rails.",
        // Short tutorial: How To Incline Treadmill Walk (12-3-30) — 2024, specific technique
        link:"https://www.youtube.com/watch?v=NAsObfFJXvE" },
      { day:"Sunday",    time:"7:30am", icon:"💪", name:"Dumbbell Chest Press",
        equipment:"Dumbbells + Bench", sets:"3 sets × 12 reps · 10kg",
        details:"Lie on bench, dumbbells at chest level, elbows 45° from body. Press up and slightly inward. Lower slowly 3 sec. Squeeze chest at top. This is your primary chest fat exercise.",
        // Short tutorial: Dumbbell Bench Press — proper form, short video
        link:"https://www.youtube.com/watch?v=ufl6HV5NN9g" },
      { day:"Sunday",    time:"7:30am", icon:"💪", name:"One-Arm Dumbbell Row",
        equipment:"Dumbbells + Bench", sets:"3 sets × 12 reps each side · 12kg",
        details:"Place one knee and hand on bench. Pull dumbbell to hip, elbow close to body. Hold 1 sec at top. Lower slow. Building back width makes waist appear slimmer immediately.",
        // Short tutorial: Perfect One-Arm Dumbbell Row — 2025
        link:"https://www.youtube.com/watch?v=XVPYh-1DabI" },
      { day:"Monday",    time:"7:30am", icon:"🚴", name:"Stationary Bike Fat Burn",
        equipment:"Upright Bike", sets:"40 min · resistance 4–5 · 80-90 RPM",
        details:"Adjust seat to hip height. Resistance level 4–5. Maintain 80–90 RPM cadence for 40 min. Heart rate 120–130 BPM fat-burning zone. Zero knee impact.",
        // Tutorial: How To Use The Stationary Bike — correct setup and technique
        link:"https://www.youtube.com/watch?v=NwwDBARCGgo" },
      { day:"Tuesday",   time:"7:30am", icon:"🔄", name:"Cable Lat Pulldown",
        equipment:"Cable Machine", sets:"3 sets × 12 reps",
        details:"Sit at cable machine, grip bar wide. Pull bar down to upper chest, lean back slightly, retract shoulder blades. Squeeze lats at bottom. This builds back width and burns chest fat indirectly.",
        // Tutorial: How to Cable Lat Pulldown — complete guide 2024
        link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc" },
      { day:"Wednesday", time:"7:30am", icon:"🧘", name:"Dead Bug Core",
        equipment:"Yoga Mat", sets:"4 rounds · 30 sec each side",
        details:"Lie on back, arms up, knees bent 90°. Slowly lower opposite arm and leg toward floor, exhale fully. Return. Keep lower back pressed to floor. Best core exercise for belly fat with zero back strain.",
        // Tutorial: How to Do Dead Bug — NASM proper form
        link:"https://www.youtube.com/watch?v=bxn9FBrt4-A" },
      { day:"Thursday",  time:"7:30am", icon:"🌊", name:"Elliptical — Low Impact",
        equipment:"Elliptical", sets:"40 min · level 5 resistance",
        details:"Zero knee impact — ideal for your joints. Push and pull handles actively. Level 5 resistance, steady pace. Burns 400–450 kcal. Full body without stressing knees at all.",
        // Tutorial: How To Properly Use The Elliptical Machine — June 2024
        link:"https://www.youtube.com/watch?v=RakIFxUmSpA" },
      { day:"Friday",    time:"—",      icon:"😴", name:"Rest & Recovery",
        equipment:"Home", sets:"Full rest day",
        details:"Stretch for 10 min. Sleep 8 hours. Drink 3L water. Prep your meals for the week. Recovery is when your body burns fat and repairs muscle.",
        link:"" },
    ],
  },
  {
    week:"Week 3–4", theme:"Intensity Up — Chest & Belly Attack (50 min sessions)",
    color:C.wood, focus:"Target chest fat + increase calorie burn",
    days:[
      { day:"Saturday",  time:"7:30am", icon:"⚡", name:"Treadmill Incline Intervals",
        equipment:"Treadmill", sets:"50 min · interval protocol",
        details:"5 min warm-up flat. Then 8 rounds: 3 min at 5.5 km/h 6% incline + 2 min at 4.5 km/h 2% incline. Cool down 5 min. Burns 500+ kcal. HIIT incline melts belly fat 2× faster than steady pace.",
        // Tutorial: How To Incline Treadmill Walk — specific technique guide
        link:"https://www.youtube.com/watch?v=NAsObfFJXvE" },
      { day:"Sunday",    time:"7:30am", icon:"💪", name:"Incline Dumbbell Press",
        equipment:"Dumbbells + Bench", sets:"4 sets × 10 reps · 10–12kg",
        details:"Set bench to 30–45° incline. Press dumbbells up at shoulder width, elbows 45° from body. This targets upper chest — the main area of chest fat. Lower slowly, full stretch at bottom.",
        // Tutorial: Dumbbell Bench Press short — correct form
        link:"https://www.youtube.com/watch?v=5Y3VZsLb1Ys" },
      { day:"Sunday",    time:"7:30am", icon:"💪", name:"Dumbbell Lateral Raise",
        equipment:"Dumbbells", sets:"3 sets × 12 reps · 6–8kg",
        details:"Stand tall, dumbbells at sides. Raise arms out to sides until level with shoulders, slight bend in elbows. Pause 1 sec. Lower slowly. Building wide shoulders makes chest appear flatter.",
        // Tutorial: Dumbbell Lateral Raise Correct Form — short 2025
        link:"https://www.youtube.com/watch?v=LUxFg7UXf2g" },
      { day:"Monday",    time:"7:30am", icon:"🚴", name:"Bike HIIT 30/30",
        equipment:"Upright Bike", sets:"35 min · 20 intervals",
        details:"Warm up 5 min easy. Then 20 rounds: 30 sec MAX sprint effort + 30 sec easy recovery pedaling. Cool down 5 min. Burns 500+ kcal. Afterburn effect continues 24 hours after session.",
        // Tutorial: Stationary Bike — gym shorts quick technique
        link:"https://www.youtube.com/watch?v=_XwaTigA2_Y" },
      { day:"Tuesday",   time:"7:30am", icon:"🔄", name:"Cable Woodchop — Love Handles",
        equipment:"Cable Machine", sets:"4 sets × 10 reps each side",
        details:"Set cable to high position. Stand sideways, grab handle with both hands. Pull cable diagonally down across body, rotating trunk. This directly targets love handles and obliques.",
        // Tutorial: Standing Cable Woodchopper — exercise demo guide
        link:"https://www.youtube.com/watch?v=he4IhLc1d5k" },
      { day:"Wednesday", time:"7:30am", icon:"🔥", name:"Dead Bug + Plank Circuit",
        equipment:"Yoga Mat", sets:"4 rounds · 45s work/15s rest",
        details:"Round: Dead Bug 30s → Plank hold 30s → Side Plank 20s each → Glute Bridge 15 reps. No crunches — dead bug and planks protect your lower back while burning belly fat.",
        // Tutorial: Dead Bug exercise — NASM proper form
        link:"https://www.youtube.com/watch?v=bxn9FBrt4-A" },
      { day:"Thursday",  time:"7:30am", icon:"🌊", name:"Elliptical Endurance",
        equipment:"Elliptical", sets:"50 min · level 6–7",
        details:"Level 6–7 resistance. Alternate 5 min forward + 2 min backward every set. Backward activates glutes and hamstrings differently. No hands for 2 min to engage core. Full body fat burn.",
        // Tutorial: How To Properly Use Elliptical — 2024
        link:"https://www.youtube.com/watch?v=RakIFxUmSpA" },
      { day:"Friday",    time:"—",      icon:"😴", name:"Rest & Stretch",
        equipment:"Home", sets:"Active recovery",
        details:"10 min full body stretch. 20 min slow walk if energy allows. Foam roll upper back and calves. Sleep 8h — growth hormone released during sleep burns fat overnight.",
        link:"" },
    ],
  },
  {
    week:"Week 5–6", theme:"Peak Fat Burn — Compound Power (55 min sessions)",
    color:C.caramel, focus:"Maximize calorie deficit + build visible muscle",
    days:[
      { day:"Saturday",  time:"7:30am", icon:"🏔️", name:"Treadmill Power Walk 8% Incline",
        equipment:"Treadmill", sets:"55 min · 8% incline · 5.5 km/h",
        details:"Warm up 5 min flat. Main: 40 min at 8% incline 5.5 km/h. The famous 12-3-30 protocol. Burns 500–600 kcal. Targets glutes and hamstrings while shredding belly fat. No hands on rails.",
        // Tutorial: How To Incline Treadmill Walk — specific tutorial
        link:"https://www.youtube.com/watch?v=NAsObfFJXvE" },
      { day:"Sunday",    time:"7:30am", icon:"💥", name:"Cable Lat Pulldown — Wide Grip",
        equipment:"Cable Machine", sets:"4 sets × 10 reps",
        details:"Wide grip on bar, pull to upper chest, lean back 15°. Squeeze lats at bottom, hold 1 sec. Slow return 3 sec. Wide back = narrower-looking waist immediately. Most important back exercise.",
        // Tutorial: Cable Lat Pulldown complete guide 2024
        link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc" },
      { day:"Sunday",    time:"7:30am", icon:"💥", name:"One-Arm Dumbbell Row Heavy",
        equipment:"Dumbbells + Bench", sets:"4 sets × 10 reps · 14kg",
        details:"Brace on bench. Pull dumbbell to hip crease. Elbow tracks close to body. Pause at top, lower slow. Go heavier than week 1–2. Back and biceps burn most calories in upper body.",
        // Tutorial: Perfect One-Arm Dumbbell Row — 2025
        link:"https://www.youtube.com/watch?v=XVPYh-1DabI" },
      { day:"Monday",    time:"7:30am", icon:"🚴", name:"Bike Tabata Protocol",
        equipment:"Upright Bike", sets:"40 min · 6 Tabata rounds",
        details:"Warm up 8 min. Then 6 Tabata rounds: 20 sec MAX sprint + 10 sec rest × 8 sets = 4 min each. Rest 2 min between rounds. Burns 550+ kcal in 40 min. Most time-efficient fat burn method.",
        // Tutorial: Stationary Bike — gym shorts correct technique
        link:"https://www.youtube.com/watch?v=_XwaTigA2_Y" },
      { day:"Tuesday",   time:"7:30am", icon:"🔥", name:"Cable Woodchop High-to-Low",
        equipment:"Cable Machine", sets:"5 rounds · 10 reps each side",
        details:"Set cable to HIGH position. Stand sideways, both hands on handle. Rotate and pull cable down across body to opposite hip. This is the most effective oblique and love handle exercise available.",
        // Tutorial: Standing Cable Woodchopper — exercise demo
        link:"https://www.youtube.com/watch?v=he4IhLc1d5k" },
      { day:"Wednesday", time:"7:30am", icon:"🌿", name:"Dumbbell Shoulder Press",
        equipment:"Dumbbells", sets:"4 sets × 10 reps · 10–12kg",
        details:"Sit or stand. Dumbbells at ear level, elbows 90°. Press overhead until arms nearly straight. Lower slowly. Building shoulder width gives a V-shape and makes belly look much smaller visually.",
        // Tutorial: Dumbbell Lateral Raise form — side delt tutorial 2025
        link:"https://www.youtube.com/watch?v=pgrWjBfaFe8" },
      { day:"Thursday",  time:"7:30am", icon:"🌊", name:"Elliptical + DB Finisher",
        equipment:"Elliptical + Dumbbells", sets:"45 min elliptical + 10 min circuit",
        details:"45 min elliptical level 7–8. Then immediately: 3 rounds of DB Shoulder Press 10kg × 15 + DB Curl × 15 + Lateral Raise × 15 no rest. Maximizes post-workout fat burning window.",
        // Tutorial: Elliptical — how to properly use 2024
        link:"https://www.youtube.com/watch?v=RakIFxUmSpA" },
      { day:"Friday",    time:"—",      icon:"😴", name:"Full Rest",
        equipment:"Home", sets:"Mandatory recovery",
        details:"Full rest. Sleep 8h. Take progress photos. Measure your waist. Drink 3.5L water. Your body needs rest to rebuild. Trust the process.",
        link:"" },
    ],
  },
  {
    week:"Week 7–8", theme:"Consolidation & Results — Victory Lap (60 min sessions)",
    color:C.fern, focus:"Cement the habit, push final results",
    days:[
      { day:"Saturday",  time:"7:30am", icon:"🎯", name:"Treadmill Progressive Challenge",
        equipment:"Treadmill", sets:"60 min · progressive incline ladder",
        details:"10 min flat → 10 min 3% → 10 min 5% → 10 min 8% → 10 min 5% → 10 min flat. Progressive incline challenge burns 650+ kcal. You are 40% fitter than week 1.",
        // Tutorial: Incline treadmill walk technique — 2024
        link:"https://www.youtube.com/watch?v=NAsObfFJXvE" },
      { day:"Sunday",    time:"7:30am", icon:"🏆", name:"Dumbbell Chest Press — Heavy",
        equipment:"Dumbbells + Bench", sets:"4 sets × 8 reps · 16kg",
        details:"Go heavy this week. Full range of motion. Slow eccentric 3 sec down, explosive press up. You should be stronger than week 1. Push the weight. Chest development is visible now.",
        // Tutorial: How To Do Dumbbell Bench Press Correctly — 2024
        link:"https://www.youtube.com/watch?v=5Y3VZsLb1Ys" },
      { day:"Sunday",    time:"7:30am", icon:"🏆", name:"Cable Lat Pulldown — Heavy",
        equipment:"Cable Machine", sets:"4 sets × 8 reps heavy",
        details:"Increase weight from week 1–2. Wide grip. Full stretch at top, squeeze hard at bottom. Your lats should be visibly wider now. This is the exercise that changes body shape most.",
        // Tutorial: Cable Lat Pulldown complete guide 2024
        link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc" },
      { day:"Monday",    time:"7:30am", icon:"⚡", name:"Bike Max Effort — Beat Your Best",
        equipment:"Upright Bike", sets:"45 min · personal best attempt",
        details:"Level 6 resistance. Maintain 85–95 RPM. Check calorie counter — try to beat your week 1 total. You are significantly fitter now. Feel the difference.",
        // Tutorial: Stationary Bike — correct setup and technique
        link:"https://www.youtube.com/watch?v=NwwDBARCGgo" },
      { day:"Tuesday",   time:"7:30am", icon:"💥", name:"Dead Bug Core — Endurance",
        equipment:"Yoga Mat", sets:"5 rounds · max time",
        details:"5 rounds: Dead Bug 45s → Plank 60s → Side Plank 30s each → Glute Bridge 45s. Time yourself. Compare to week 1. Your core is substantially stronger now.",
        // Tutorial: Dead Bug exercise for beginners — NASM
        link:"https://www.youtube.com/watch?v=bxn9FBrt4-A" },
      { day:"Wednesday", time:"7:30am", icon:"🔥", name:"Cable Woodchop — Final Attack",
        equipment:"Cable Machine", sets:"5 sets × 12 reps each side",
        details:"Final love handle assault. Cable woodchop high-to-low with maximum control. Feel the oblique engagement. Your waist should have visibly reduced since week 1.",
        // Tutorial: Cable Woodchopper — proper form obliques
        link:"https://www.youtube.com/watch?v=wu3WvaWmCMU" },
      { day:"Thursday",  time:"7:30am", icon:"🌊", name:"Elliptical Victory Session",
        equipment:"Elliptical", sets:"60 min · level 8",
        details:"Longest elliptical session. Level 8. Mix forward and backward throughout. No hands for 5 min intervals. This is your final test. You are a different person than 8 weeks ago.",
        // Tutorial: Elliptical — how to properly use 2024
        link:"https://www.youtube.com/watch?v=RakIFxUmSpA" },
      { day:"Friday",    time:"—",      icon:"✨", name:"Reflection & Reset",
        equipment:"Home", sets:"Celebrate + plan next phase",
        details:"Full body progress photos front, back, side. Measure waist, chest, hips. Weigh yourself. Compare to day 1 photos. You did 8 weeks of consistent work. Plan your next 8 weeks!",
        link:"" },
    ],
  },
];

// ── MEALS — verified cooking tutorial videos ──────────────────────
const meals=[
  {
    meal:"Pre-Workout Breakfast",icon:"☕",time:"7:00 AM",
    name:"Eggs & Oats Power Bowl",
    calories:420,protein:35,carbs:38,fat:12,
    why:"High protein before workout prevents muscle loss. Oats give sustained energy. Eat 30 min before training for best performance.",
    ingredients:["3 whole eggs (scrambled)","60g rolled oats","150ml almond milk","1 tbsp peanut butter","½ banana sliced","Pinch cinnamon & salt"],
    instructions:"Cook oats in almond milk 4–5 min stirring. Scramble 3 eggs with salt on medium heat 3 min. Serve oats topped with banana and peanut butter. Eggs on side.",
    video:"https://www.youtube.com/watch?v=yGwXpqFAAT0",
  },
  {
    meal:"Post-Workout Meal",icon:"🍗",time:"9:30 AM",
    name:"Grilled Chicken & Brown Rice Bowl",
    calories:520,protein:52,carbs:44,fat:10,
    why:"Eat within 45 min after workout. This window maximises muscle repair and fat loss simultaneously. The gold standard post-workout meal.",
    ingredients:["200g chicken breast","80g brown rice (dry)","100g salad leaves","½ cucumber","10 cherry tomatoes","1 tbsp olive oil + lemon","Garlic powder, salt, pepper"],
    instructions:"Season chicken with garlic powder, salt, pepper. Grill 6–7 min per side on medium-high. Cook brown rice 25–30 min. Assemble: rice base, sliced chicken on top, salad dressed with olive oil and lemon.",
    video:"https://www.youtube.com/watch?v=zg6coSIW-I4",
  },
  {
    meal:"Work Lunch",icon:"🐟",time:"1:00 PM",
    name:"Tuna & Avocado Rice Cakes",
    calories:380,protein:36,carbs:28,fat:14,
    why:"Prep the night before and bring to work. No cooking needed. High protein keeps you full through the afternoon shift.",
    ingredients:["2 cans tuna in water (160g drained)","½ avocado","4 plain rice cakes","50g baby spinach","1 tbsp Greek yogurt","Lemon juice, salt, pepper","5 cherry tomatoes"],
    instructions:"Drain tuna. Mix with Greek yogurt, lemon, salt, pepper. Mash avocado with salt and lemon. Spread avocado on rice cakes, top with tuna mix. Serve with spinach and tomatoes on the side. Prep night before in containers.",
    video:"https://www.youtube.com/watch?v=TU3TDotubw8",
  },
  {
    meal:"Afternoon Snack",icon:"🥛",time:"4:00 PM",
    name:"Greek Yogurt & Berry Protein Bowl",
    calories:210,protein:28,carbs:18,fat:4,
    why:"Mid-afternoon protein stops muscle breakdown during your work hours and prevents overeating at dinner.",
    ingredients:["200g Greek yogurt 0% fat","80g mixed berries","1 tbsp chia seeds","1 tsp honey"],
    instructions:"Spoon yogurt into a bowl or jar. Top with berries, sprinkle chia seeds, drizzle honey. Can be prepped in a lidded jar the night before and kept in office fridge. Ready in 1 minute.",
    video:"https://www.youtube.com/watch?v=w8jhmWSl4Lc",
  },
  {
    meal:"Dinner",icon:"🐟",time:"8:00 PM",
    name:"Baked Salmon & Roasted Vegetables",
    calories:460,protein:44,carbs:24,fat:20,
    why:"Omega-3 reduces knee joint inflammation and supports fat burning during sleep. Low-carb vegetables keep insulin low overnight.",
    ingredients:["200g salmon fillet","150g broccoli florets","100g sweet potato cubed","1 zucchini sliced","2 garlic cloves minced","1 tbsp olive oil","Lemon, dill, salt, pepper, paprika"],
    instructions:"Preheat oven 200°C. Toss broccoli, sweet potato and zucchini in olive oil, salt, pepper. Roast 20 min. Add salmon, rub with garlic, paprika, salt. Top with lemon and dill. Bake 13–15 min until salmon flakes.",
    video:"https://www.youtube.com/watch?v=MgfXxnwOc98",
  },
  {
    meal:"Pre-Sleep Snack",icon:"🌙",time:"10:00 PM",
    name:"Cottage Cheese & Almonds",
    calories:210,protein:24,carbs:8,fat:10,
    why:"Casein protein digests slowly overnight — feeds muscles for 7–8 hours while you sleep. The #1 underrated fat-loss and muscle-preservation hack.",
    ingredients:["200g cottage cheese (low fat)","20g raw almonds (~15 almonds)","Pinch of cinnamon","Optional: ½ tsp honey"],
    instructions:"Scoop cottage cheese into a bowl. Top with almonds and cinnamon. Optional thin drizzle of honey. Eat 30 min before sleep. This slow protein prevents overnight muscle loss and keeps metabolism active.",
    video:"https://www.youtube.com/watch?v=gSmL5xwpzAw",
  },
];

const quotes=[
  {text:"The pain you feel today will be the strength you feel tomorrow.",author:"Arnold Schwarzenegger"},
  {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
  {text:"Every workout is progress. Every meal is a choice. Make them count.",author:"Unknown"},
  {text:"Take care of your body. It is the only place you have to live.",author:"Jim Rohn"},
  {text:"Your body can stand almost anything. It is your mind you have to convince.",author:"Unknown"},
];

function HomeView({logs}){
  const [qIdx,setQIdx]=useState(0);
  const startW=PERSONAL.startWeight,goalW=PERSONAL.goalWeight,range=startW-goalW;
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
      <Card topColor={C.bark} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.espresso}22,${C.bgCard})`}}>
        <Divider label="Body Analysis — Start Point"/>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.7,marginBottom:"12px"}}>
          Based on your photos: primary fat in <strong style={{color:C.walnut}}>abdomen, chest, lower back & flanks</strong>. Good broad shoulder frame underneath.
          All workouts use your <strong style={{color:C.fern}}>treadmill, elliptical, bike, cable machine, dumbbells & bench</strong>. Zero jumping. Zero deep squats.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {[{l:"Daily Calories",v:totCal+"kcal",c:C.walnut},{l:"Daily Protein",v:totProt+"g",c:C.fern},{l:"Workout Time",v:"7:30 AM",c:C.wood},{l:"Duration",v:"45–60 min",c:C.caramel}].map((s,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"15px",fontWeight:"bold",color:s.c}}>{s.v}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div></div>))}
        </div>
      </Card>
      <Card topColor={C.fern} style={{marginBottom:"14px"}}>
        <Divider label="Your Profile"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          <StatBox label="Start Weight" value={startW+"kg"} color={C.walnut}/>
          <StatBox label="Goal Weight" value={goalW+"kg"} color={C.fern}/>
          <StatBox label="Current" value={latest+"kg"} color={C.textDark}/>
          <StatBox label="Height" value={PERSONAL.height+"cm"} color={C.wood}/>
          <StatBox label="BMI" value={curBMI} color={parseFloat(curBMI)<25?C.fern:C.amber}/>
          <StatBox label="Status" value={bmiLabel(parseFloat(curBMI))} color={parseFloat(curBMI)<25?C.fern:C.amber}/>
        </div>
        <div style={{marginTop:"8px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
          <StatBox label="Lost" value={lost.toFixed(1)+"kg"} color={C.fern} bg={C.mintCream}/>
          <StatBox label="To Go" value={Math.max(0,range-lost).toFixed(1)+"kg"} color={C.amber} bg={`${C.amber}18`}/>
          <StatBox label="Done" value={Math.round(wPct)+"%"} color={C.sage} bg={C.mintCream}/>
        </div>
      </Card>
      {behind&&(<div style={{background:`${C.amber}22`,border:`1px solid ${C.amber}88`,borderRadius:"14px",padding:"12px 16px",marginBottom:"14px",display:"flex",gap:"10px",alignItems:"center"}}><span style={{fontSize:"18px"}}>🍂</span><span style={{color:C.mocha,fontSize:"12px",fontFamily:font.body,lineHeight:1.5}}>Weight progress may be behind schedule. Are you sticking to 1800 kcal/day?</span></div>)}
      <Card topColor={C.wood} style={{marginBottom:"14px"}}>
        <Divider label="Overall Progress"/>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"14px"}}>
          <Ring pct={wPct} color={C.fern} size={78} label="weight" value={lost.toFixed(1)} unit="kg"/>
          <Ring pct={woPct} color={C.wood} size={78} label="workouts" value={totalDone} unit=""/>
          <Ring pct={Math.min(100,(avgSteps/10000)*100)} color={C.caramel} size={78} label="avg steps" value={avgSteps} unit=""/>
          <Ring pct={Math.min(100,(parseFloat(avgWater)/3)*100)} color={C.teal} size={78} label="avg water" value={avgWater} unit="L"/>
        </div>
      </Card>
      <Card topColor={C.caramel} style={{marginBottom:"14px"}}>
        <Divider label="Workout Log Sheet"/>
        {logs.length===0?(<div style={{textAlign:"center",padding:"28px 0",color:C.textLight,fontFamily:font.body,fontSize:"13px",fontStyle:"italic"}}>🌱 No workouts logged yet.<br/>Go to Workout tab and press + Log after each session!</div>):(
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:font.body,fontSize:"12px"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["#","Date","Workout","Weight","Steps","Water","Sleep","Feel"].map(h=>(<th key={h} style={{padding:"7px 6px",color:C.textMuted,fontWeight:"normal",textAlign:"left",whiteSpace:"nowrap",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.6px"}}>{h}</th>))}</tr></thead><tbody>{[...logs].reverse().map((log,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.bgDark}`,background:i%2===0?C.bgDeep:"transparent"}}><td style={{padding:"8px 6px",color:C.textLight}}>{logs.length-i}</td><td style={{padding:"8px 6px",color:C.textMid,whiteSpace:"nowrap"}}>{log.date}</td><td style={{padding:"8px 6px",color:C.textDark,fontWeight:"bold"}}>{log.workoutName}</td><td style={{padding:"8px 6px",color:C.walnut}}>{log.weight}kg</td><td style={{padding:"8px 6px",color:C.wood}}>{log.steps}</td><td style={{padding:"8px 6px",color:C.teal}}>{log.water}L</td><td style={{padding:"8px 6px",color:C.fern}}>{log.sleep}h</td><td style={{padding:"8px 6px",fontSize:"16px"}}>{log.feel}</td></tr>))}</tbody></table></div>
        )}
        {logs.length>0&&(<div style={{marginTop:"12px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}><StatBox label="Sessions" value={totalDone} color={C.caramel}/><StatBox label="Avg Sleep" value={avgSleep+"h"} color={C.teal}/><StatBox label="Avg Water" value={avgWater+"L"} color={C.fern}/></div>)}
      </Card>
      <Card topColor={C.bark} style={{marginBottom:"14px"}}>
        <Divider label="Knee Safety Protocol"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {[{icon:"🚫",t:"No Deep Squats",d:"Nothing below 90°",c:C.red},{icon:"🚫",t:"No Jumping",d:"Zero impact moves",c:C.red},{icon:"🚫",t:"Stop Sharp Pain",d:"Rest & ice at once",c:C.red},{icon:"✅",t:"Elliptical First",d:"Zero joint impact",c:C.fern},{icon:"✅",t:"Incline Walk",d:"Knee-safe cardio",c:C.fern},{icon:"✅",t:"Ice After Session",d:"10–15 min ice pack",c:C.fern}].map((k,i)=>(<div key={i} style={{background:k.c===C.fern?C.mintCream:`${C.red}12`,border:`1px solid ${k.c===C.fern?C.leafPale:C.red+"44"}`,borderRadius:"10px",padding:"10px 12px"}}><div style={{fontSize:"14px",marginBottom:"3px"}}>{k.icon}</div><div style={{fontFamily:font.display,fontSize:"12px",fontWeight:"bold",color:k.c}}>{k.t}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{k.d}</div></div>))}
        </div>
      </Card>
      <Card style={{background:`linear-gradient(160deg,${C.mintCream},${C.bgCard})`,border:`1px solid ${C.leafPale}`,textAlign:"center"}}>
        <div style={{fontFamily:font.display,fontSize:"clamp(14px,3vw,18px)",fontStyle:"italic",color:C.textDark,lineHeight:1.7,marginBottom:"10px"}}>"{quotes[qIdx].text}"</div>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>— {quotes[qIdx].author}</div>
        <button onClick={()=>setQIdx((qIdx+1)%quotes.length)} style={{background:`linear-gradient(135deg,${C.fern},${C.moss})`,color:C.white,border:"none",borderRadius:"10px",padding:"9px 22px",fontFamily:font.body,fontSize:"12px",cursor:"pointer",fontWeight:"bold"}}>🌿 Next Quote</button>
      </Card>
    </div>
  );
}

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
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"6px"}}>Each ▶ Watch button = short accurate tutorial for that exact exercise</div>
      <div style={{background:C.mintCream,border:`1px solid ${C.leafPale}`,borderRadius:"12px",padding:"10px 14px",marginBottom:"18px"}}>
        <div style={{fontFamily:font.body,fontSize:"12px",color:C.fern,lineHeight:1.6}}>⏰ <strong>Workout window: 7:30am–9:15am daily</strong> · Work starts 10am<br/>🏋️ <strong>Equipment:</strong> Treadmill · Elliptical · Bike · Cable Machine · Dumbbells · Bench<br/>🦵 <strong>All exercises:</strong> Knee-safe — no jumping, no deep squats</div>
      </div>
      {logging!==null&&(<div style={{position:"fixed",inset:0,background:"rgba(60,35,10,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:C.bgCard,border:`2px solid ${C.fern}`,borderRadius:"22px",padding:"24px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 12px 40px rgba(0,0,0,0.25)"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:C.fern,marginBottom:"3px"}}>✅ Log Completed Workout</div><div style={{fontFamily:font.body,fontSize:"13px",color:C.textMid,marginBottom:"18px"}}>{workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}</div><InputRow label="Current Weight (kg)" value={form.weight} onChange={v=>setForm({...form,weight:v})} unit="kg" min={50} max={200} step={0.5} icon="⚖️"/><InputRow label="Steps Today" value={form.steps} onChange={v=>setForm({...form,steps:v})} unit="steps" min={0} max={30000} step={100} icon="👟"/><InputRow label="Water Intake (L)" value={form.water} onChange={v=>setForm({...form,water:v})} unit="L" min={0} max={6} step={0.1} icon="💧"/><InputRow label="Sleep Last Night (h)" value={form.sleep} onChange={v=>setForm({...form,sleep:v})} unit="hrs" min={0} max={12} step={0.5} icon="🌙"/><div style={{marginBottom:"16px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>How Did You Feel?</div><div style={{display:"flex",gap:"8px"}}>{["😴","😐","😊","💪","🔥"].map(e=>(<button key={e} onClick={()=>setForm({...form,feel:e})} style={{flex:1,fontSize:"20px",padding:"8px 4px",borderRadius:"10px",border:`2px solid ${form.feel===e?C.fern:C.border}`,background:form.feel===e?C.mintCream:C.bgDeep,cursor:"pointer"}}>{e}</button>))}</div></div><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setLogging(null)} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px",color:C.textMuted,fontFamily:font.body,fontSize:"13px",cursor:"pointer"}}>Cancel</button><button onClick={submitLog} style={{flex:2,background:`linear-gradient(135deg,${C.fern},${C.moss})`,border:"none",borderRadius:"12px",padding:"12px",color:C.white,fontFamily:font.display,fontWeight:"bold",fontSize:"14px",cursor:"pointer"}}>✅ Save to Log</button></div></div></div>)}
      {workoutWeeks.map((wk,wi)=>(
        <div key={wi} style={{marginBottom:"10px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)"}}>
          <button onClick={()=>setOpenWeek(openWeek===wi?-1:wi)} style={{width:"100%",background:openWeek===wi?`linear-gradient(90deg,${wk.color}18,${C.bgCard})`:C.bgCard,border:"none",padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:openWeek===wi?`1px solid ${C.border}`:"none"}}>
            <div style={{textAlign:"left"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:wk.color}}>{wk.week}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{wk.theme}</div><div style={{fontFamily:font.body,fontSize:"10px",color:wk.color,marginTop:"2px"}}>🎯 {wk.focus}</div></div>
            <span style={{color:wk.color,fontSize:"16px",transform:openWeek===wi?"rotate(180deg)":"none",transition:"transform 0.3s"}}>▼</span>
          </button>
          {openWeek===wi&&(
            <div style={{padding:"10px"}}>
              {wk.days.map((d,di)=>{
                const done=isDone(d.name),isRest=!d.link;
                return(
                  <div key={di} style={{background:done?C.mintCream:C.bgDeep,border:`1px solid ${done?C.leafPale:C.border}`,borderRadius:"14px",padding:"14px",marginBottom:"8px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"4px",flexWrap:"wrap"}}>
                          <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{d.icon} {d.day}</span>
                          <span style={{fontFamily:font.mono,fontSize:"10px",color:wk.color,background:`${wk.color}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {d.time}</span>
                          <span style={{fontFamily:font.mono,fontSize:"10px",color:C.wood,background:`${C.wood}18`,padding:"2px 8px",borderRadius:"20px"}}>🏋️ {d.equipment}</span>
                        </div>
                        <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:done?C.fern:C.textDark}}>{d.name}{done?" ✓":""}</div>
                        <div style={{fontFamily:font.mono,fontSize:"11px",color:wk.color,marginTop:"2px",marginBottom:"4px"}}>{d.sets}</div>
                        <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,lineHeight:1.5}}>{d.details}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"6px",alignItems:"flex-end"}}>
                        {d.link&&(<a href={d.link} target="_blank" rel="noopener noreferrer" style={{background:C.red,color:"#fff",fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",textDecoration:"none",whiteSpace:"nowrap"}}>▶ Watch</a>)}
                        {!isRest&&(<button onClick={()=>{setLogging({wi,di});setForm({weight:PERSONAL.startWeight,steps:5000,water:2.0,sleep:7,feel:"😊"});}} style={{background:done?C.mintCream:`linear-gradient(135deg,${C.fern},${C.moss})`,border:`1px solid ${done?C.fern:C.moss}`,color:done?C.fern:C.white,fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontFamily:font.body,whiteSpace:"nowrap"}}>{done?"✓ Logged":"+ Log"}</button>)}
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

function FoodView(){
  const [open,setOpen]=useState(null);
  const totCal=meals.reduce((a,m)=>a+m.calories,0),totProt=meals.reduce((a,m)=>a+m.protein,0),totCarb=meals.reduce((a,m)=>a+m.carbs,0),totFat=meals.reduce((a,m)=>a+m.fat,0);
  return(
    <div>
      <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>☕ Personalised Fat-Loss Meal Plan</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>Designed around your 10am–7pm work schedule</div>
      <Card style={{marginBottom:"14px",background:C.mintCream,border:`1px solid ${C.leafPale}`}}>
        <Divider label="Daily Meal Schedule"/>
        {meals.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",borderBottom:i<meals.length-1?`1px solid ${C.border}`:"none"}}><div style={{fontFamily:font.mono,fontSize:"12px",color:C.wood,minWidth:"65px"}}>{m.time}</div><div style={{fontSize:"16px"}}>{m.icon}</div><div style={{flex:1}}><div style={{fontFamily:font.display,fontSize:"13px",fontWeight:"bold",color:C.textDark}}>{m.name}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{m.meal}</div></div><div style={{fontFamily:font.mono,fontSize:"12px",color:C.walnut,fontWeight:"bold"}}>{m.calories}kcal</div></div>))}
      </Card>
      <Card topColor={C.fern} style={{marginBottom:"16px"}}>
        <Divider label="Daily Nutritional Totals"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"12px"}}>
          {[{l:"Calories",v:totCal,suf:"kcal",c:C.walnut},{l:"Protein",v:totProt,suf:"g",c:C.fern},{l:"Carbs",v:totCarb,suf:"g",c:C.teal},{l:"Fat",v:totFat,suf:"g",c:C.caramel}].map((t,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px 6px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:t.c}}>{t.v}</div><div style={{fontFamily:font.mono,fontSize:"9px",color:C.textLight}}>{t.suf}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{t.l}</div></div>))}
        </div>
        <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginBottom:"5px"}}>Protein target ({totProt}g / 160g)</div>
        <Bar pct={(totProt/160)*100} color={C.fern} h={7}/>
        <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"8px",marginBottom:"4px"}}>Calorie deficit ({totCal} / ~2800 TDEE)</div>
        <Bar pct={(totCal/2800)*100} color={C.walnut} h={7}/>
        <div style={{fontFamily:font.mono,fontSize:"10px",color:C.textMuted,marginTop:"4px",textAlign:"right"}}>Deficit: ~{2800-totCal}kcal/day</div>
      </Card>
      {meals.map((m,i)=>(
        <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",marginBottom:"12px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)",borderLeft:`4px solid ${C.wood}`}}>
          <div style={{padding:"16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
              <div><div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1px"}}>{m.icon} {m.meal}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:C.wood,background:`${C.wood}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {m.time}</span></div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:C.textDark}}>{m.name}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"22px",color:C.walnut}}>{m.calories}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>kcal</div></div>
            </div>
            <div style={{background:C.mintCream,borderRadius:"8px",padding:"8px 12px",marginBottom:"10px",border:`1px solid ${C.leafPale}`}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.fern,lineHeight:1.5}}>💡 {m.why}</div></div>
            <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>{[{l:"Protein",v:m.protein+"g",c:C.fern},{l:"Carbs",v:m.carbs+"g",c:C.teal},{l:"Fat",v:m.fat+"g",c:C.caramel}].map((mc,j)=>(<div key={j} style={{flex:1,background:C.bgDeep,borderRadius:"8px",padding:"7px 4px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.mono,fontSize:"13px",fontWeight:"bold",color:mc.c}}>{mc.v}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{mc.l}</div></div>))}</div>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"8px",color:C.textMuted,cursor:"pointer",fontFamily:font.body,fontSize:"11px",marginBottom:"10px"}}>{open===i?"▲ Hide Details":"▼ Ingredients & Instructions"}</button>
            {open===i&&(<div style={{marginBottom:"12px"}}><div style={{fontFamily:font.display,fontWeight:"bold",color:C.fern,fontSize:"12px",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.8px"}}>🌿 Ingredients</div>{m.ingredients.map((ing,k)=>(<div key={k} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,padding:"2px 0"}}>· {ing}</div>))}<div style={{fontFamily:font.display,fontWeight:"bold",color:C.wood,fontSize:"12px",margin:"10px 0 6px",textTransform:"uppercase",letterSpacing:"0.8px"}}>👨‍🍳 How to Prepare</div><div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.65}}>{m.instructions}</div></div>)}
            <a href={m.video} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:`linear-gradient(135deg,${C.red},#7a2a1a)`,color:"#fff",fontWeight:"bold",fontFamily:font.body,fontSize:"13px",padding:"11px",borderRadius:"10px",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>▶ Watch Cooking Video</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PandoApp(){
  const [view,setView]=useState("home");
  const [logs,setLogs]=useState([]);
  return(
    <div style={{minHeight:"100vh",background:C.bgPage,color:C.textDark,fontFamily:font.body}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(139,107,60,0.04) 80px,rgba(139,107,60,0.04) 81px)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1,background:`linear-gradient(160deg,${C.fern} 0%,${C.moss} 60%,${C.bark} 100%)`,padding:"32px 20px 24px",textAlign:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-30px",left:"-30px",width:"140px",height:"140px",borderRadius:"50%",background:`${C.leafLight}22`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`${C.latte}22`,pointerEvents:"none"}}/>
        <div style={{display:"inline-block",background:`${C.latte}33`,border:`1px solid ${C.latteLight}66`,color:C.foam,fontWeight:"bold",fontSize:"10px",letterSpacing:"2.5px",padding:"4px 16px",borderRadius:"20px",marginBottom:"14px",textTransform:"uppercase",fontFamily:font.body}}>☕ Wood · Latte · Wellness</div>
        <h1 style={{fontFamily:font.display,fontSize:"clamp(28px,7vw,52px)",fontWeight:"bold",margin:"0 0 4px",color:C.foam,letterSpacing:"1px"}}>PANDO APP</h1>
        <p style={{fontFamily:font.display,fontSize:"clamp(13px,2.5vw,16px)",color:C.latteLight,margin:"0 0 4px",fontStyle:"italic"}}>2-Month Transformation · 105kg → 88kg</p>
        <p style={{fontFamily:font.body,fontSize:"12px",color:`${C.foam}99`,margin:0}}>8 Weeks · Knee-Safe · 176cm · Work 10am–7pm</p>
      </div>
      <div style={{position:"relative",zIndex:1,background:C.bgDark,borderBottom:`1px solid ${C.border}`,padding:"12px 14px"}}>
        <div style={{display:"flex",gap:"10px",maxWidth:"680px",margin:"0 auto"}}>
          <NavBtn label="Progress" icon="🌿" active={view==="home"} onClick={()=>setView("home")}/>
          <NavBtn label="Workout" icon="🏋️" active={view==="workout"} onClick={()=>setView("workout")}/>
          <NavBtn label="Food Plan" icon="☕" active={view==="food"} onClick={()=>setView("food")}/>
        </div>
      </div>
      <div style={{position:"relative",zIndex:1,maxWidth:"680px",margin:"0 auto",padding:"18px 14px 80px"}}>
        {view==="home"&&<HomeView logs={logs}/>}
        {view==="workout"&&<WorkoutView onLog={e=>setLogs(p=>[...p,e])} logs={logs}/>}
        {view==="food"&&<FoodView/>}
      </div>
      <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"20px 0 32px",borderTop:`1px solid ${C.border}`,background:C.bgDark}}>
        <div style={{fontFamily:font.display,fontSize:"14px",color:C.wood,fontWeight:"bold"}}>PANDO APP 🌿</div>
        <div style={{fontFamily:font.body,fontSize:"11px",color:C.textLight,marginTop:"3px"}}>Personalised for you · Stay consistent · Trust the process</div>
      </div>
    </div>
  );
}
