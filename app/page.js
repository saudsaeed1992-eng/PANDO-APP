"use client";
import { useState } from "react";

const C = {
  bg:"#f5ede0",bgPage:"#ede0cc",bgCard:"#fdf6ee",bgDeep:"#f0e4d0",bgDark:"#e8d8c0",
  border:"#d4b896",sage:"#5a7a48",fern:"#3d6030",moss:"#2d4d22",
  leafLight:"#7a9e60",leafPale:"#c8ddb8",mintCream:"#e8f0e0",
  walnut:"#7b4f2a",wood:"#9b6b3c",bark:"#5c3820",caramel:"#b87333",
  mocha:"#6b3d1a",espresso:"#3d2010",latte:"#c8a876",latteLight:"#dfc49a",foam:"#f5ede0",
  textDark:"#2d1f0e",textMid:"#5c3820",textMuted:"#8b6b4a",textLight:"#a88060",white:"#fffdf8",
  red:"#a0432a",teal:"#3d7060",amber:"#c97d30",blue:"#3b6ea5",gold:"#c9960c",
};
const font={display:"'Georgia','Times New Roman',serif",body:"'Palatino Linotype','Book Antiqua',Georgia,serif",mono:"'Courier New',monospace"};
const PERSONAL={startWeight:105,goalWeight:88,height:176};
const bmi=(w)=>(w/((PERSONAL.height/100)**2)).toFixed(1);
const bmiLabel=(b)=>b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";

function Ring({pct,color,size=78,label,value,unit}){const r=((size-10)/2),circ=2*Math.PI*r,dash=(Math.min(100,pct)/100)*circ;return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bgDark} strokeWidth={7}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:"stroke-dasharray 0.8s ease"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:font.mono,fontSize:"11px",fontWeight:"bold",color}}>{Math.round(pct)}%</span></div></div><div style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontSize:"13px",color:C.textDark,fontWeight:"bold"}}>{value}{unit}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{label}</div></div></div>);}
function Bar({pct,color,h=8}){return(<div style={{background:C.bgDark,borderRadius:"20px",height:h,overflow:"hidden",border:`1px solid ${C.border}`}}><div style={{width:`${Math.min(100,Math.max(0,pct))}%`,height:"100%",background:color,borderRadius:"20px",transition:"width 0.8s ease"}}/></div>);}
function Card({children,style={},topColor}){return(<div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"20px",padding:"20px",boxShadow:"0 2px 16px rgba(90,55,20,0.10)",borderTop:topColor?`3px solid ${topColor}`:undefined,...style}}>{children}</div>);}
function Divider({label}){return(<div style={{display:"flex",alignItems:"center",gap:"10px",margin:"12px 0"}}><div style={{flex:1,height:"1px",background:C.border}}/><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1.5px"}}>{label}</span><div style={{flex:1,height:"1px",background:C.border}}/></div>);}
function StatBox({label,value,color,bg}){return(<div style={{background:bg||C.bgDeep,borderRadius:"12px",padding:"11px 8px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"15px",fontWeight:"bold",color:color||C.fern}}>{value}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"2px"}}>{label}</div></div>);}
function NavBtn({label,icon,active,onClick}){return(<button onClick={onClick} style={{flex:1,background:active?`linear-gradient(160deg,${C.fern},${C.moss})`:C.bgDark,border:`1px solid ${active?C.fern:C.border}`,borderRadius:"14px",padding:"12px 6px",color:active?C.white:C.textMuted,fontFamily:font.display,fontWeight:active?"bold":"normal",fontSize:"clamp(11px,2vw,13px)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",transition:"all 0.25s ease",boxShadow:active?`0 3px 14px ${C.moss}44`:"none"}}><span style={{fontSize:"18px"}}>{icon}</span>{label}</button>);}
function InputRow({label,value,onChange,unit,min,max,step,icon}){return(<div style={{marginBottom:"12px"}}><label style={{display:"flex",gap:"5px",alignItems:"center",fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"4px"}}><span>{icon}</span>{label}</label><div style={{display:"flex",alignItems:"center",gap:"8px"}}><input type="number" value={value} min={min} max={max} step={step||1} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"9px 13px",color:C.textDark,fontSize:"16px",fontFamily:font.display,fontWeight:"bold",outline:"none",boxSizing:"border-box"}}/><span style={{fontFamily:font.body,fontSize:"12px",color:C.textLight,minWidth:"34px"}}>{unit}</span></div></div>);}
function WatchBtn({link,label="Watch"}){if(!link)return null;return(<a href={link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"4px",background:C.red,color:"#fff",fontWeight:"bold",fontSize:"11px",padding:"5px 11px",borderRadius:"8px",textDecoration:"none",whiteSpace:"nowrap"}}>▶ {label}</a>);}

// ── CARDIO BLOCK ──────────────────────────────────────────────────
const cardioBlock=[
  {order:"1st 10 min",icon:"🚴",name:"Stationary Bike",protocol:"Resistance 4-5, 80-90 RPM",note:"Warms knees gently. Zero impact. Always start here.",link:"https://www.youtube.com/watch?v=obUQJ1hb4xI"},
  {order:"2nd 10 min",icon:"🌊",name:"Elliptical Machine",protocol:"Level 5-6, push and pull handles",note:"Zero knee impact. Full body. Directly after bike.",link:"https://www.youtube.com/watch?v=t9KVWTROVb0"},
  {order:"3rd 20 min",icon:"📈",name:"Incline Treadmill Walk",protocol:"4-8% incline, 5.5 km/h, no rails",note:"Primary fat burner. Targets belly and chest fat.",link:"https://www.youtube.com/watch?v=NAsObfFJXvE"},
];

// ── WORKOUT WEEKS ─────────────────────────────────────────────────
const workoutWeeks=[
  {week:"Week 1-2",theme:"Foundation (40 min cardio + 30 min weights)",color:C.sage,focus:"Build base, chest activation, protect knees",
   days:[
    {day:"Sun",time:"8:00pm",icon:"💪",name:"Chest Press + Back",target:"CHEST",equipment:"Bench + Dumbbells + Cable",sets:"3 sets x 12 reps",exercises:[{name:"Flat DB Chest Press 10kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"Incline DB Press 10kg upper chest fat",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"Cable Lat Pulldown",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"One-Arm DB Row 12kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"}]},
    {day:"Mon",time:"8:00pm",icon:"🦵",name:"Knee Strengthen + Shoulders",target:"KNEES",equipment:"Mat + Dumbbells",sets:"3 sets each",exercises:[{name:"Knee Strengthening Routine 10 min PT",link:"https://www.youtube.com/watch?v=cJCikne7iKM"},{name:"Glute Bridge 3x15 VMO protection",link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},{name:"DB Lateral Raise 6kg",link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},{name:"DB Shoulder Press 8kg seated",link:"https://www.youtube.com/watch?v=qEwKCR5JCog"}]},
    {day:"Tue",time:"8:00pm",icon:"🔥",name:"Cable Chest Fly + Core",target:"CHEST + BELLY",equipment:"Cable + Mat",sets:"3 sets x 12 reps",exercises:[{name:"Cable Low-to-High Fly upper chest",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"DB Chest Fly on bench",link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},{name:"Dead Bug core 30s each side",link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},{name:"Plank hold 30s",link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"}]},
    {day:"Wed",time:"8:00pm",icon:"🏋️",name:"Cable Full Body",target:"FULL BODY",equipment:"Cable Machine",sets:"3 sets x 12 reps",exercises:[{name:"Cable Lat Pulldown",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"Cable Seated Row",link:"https://www.youtube.com/watch?v=GZbfZ033f74"},{name:"Cable Woodchop love handles",link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},{name:"Cable Tricep Pushdown",link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"}]},
    {day:"Thu",time:"8:00pm",icon:"💥",name:"Chest Superset + Arms",target:"CHEST BURN",equipment:"Bench + Dumbbells",sets:"4 sets x 10 reps",exercises:[{name:"Flat DB Press 10kg superset Incline 10kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"DB Chest Fly full stretch",link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},{name:"DB Bicep Curl 10kg",link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},{name:"DB Tricep Kickback 8kg",link:"https://www.youtube.com/watch?v=GzmlxvSFE7A"}]},
    {day:"Fri",time:"OFF",icon:"😴",name:"Rest Day Friday",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Sat",time:"OFF",icon:"🌿",name:"Active Recovery Saturday",target:"LIGHT",equipment:"Outdoors",sets:"30 min walk + weekly shop",exercises:[{name:"30 min outdoor walk Warsan area",link:""},{name:"LuLu Souk Warsan weekly shop",link:""}]},
   ]},
  {week:"Week 3-4",theme:"Intensity Up (40 min cardio + 35 min weights)",color:C.wood,focus:"Chest attack, love handles, knee build",
   days:[
    {day:"Sun",time:"8:00pm",icon:"💥",name:"Chest Power Day",target:"CHEST MAX",equipment:"Bench + Dumbbells + Cable",sets:"4 sets x 10 reps",exercises:[{name:"Flat DB Press 12kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"Incline DB Press 12kg chest fat focus",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"Cable Low-to-High Fly heavy",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"Cable Chest Fly mid",link:"https://www.youtube.com/watch?v=yrpiK8R4Vqo"},{name:"Cable Tricep Pushdown",link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"}]},
    {day:"Mon",time:"8:00pm",icon:"🦵",name:"Knee + Back Strength",target:"KNEES + BACK",equipment:"Cable + Mat",sets:"4 sets x 10 reps",exercises:[{name:"BEST Knee Strengthening PT Routine",link:"https://www.youtube.com/watch?v=rsSV_lqbEVo"},{name:"Cable Lat Pulldown wide",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"One-Arm DB Row 14kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},{name:"Glute Bridge march",link:"https://www.youtube.com/watch?v=wPM8icPu6H8"}]},
    {day:"Tue",time:"8:00pm",icon:"🔥",name:"Core Love Handle Blast",target:"BELLY + OBLIQUES",equipment:"Cable + Mat",sets:"4 rounds",exercises:[{name:"Cable Woodchop high-to-low love handles",link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},{name:"Cable Woodchop low-to-high obliques",link:"https://www.youtube.com/watch?v=rHfjG2Oflz0"},{name:"Plank 40s + Side Plank 25s each",link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},{name:"Dead Bug 45s",link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"}]},
    {day:"Wed",time:"8:00pm",icon:"💪",name:"Upper Chest + Shoulders",target:"CHEST + SHOULDERS",equipment:"Bench + Cable",sets:"4 sets x 10 reps",exercises:[{name:"Incline DB Press 12kg",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"Cable Upper Chest Fly",link:"https://www.youtube.com/watch?v=i6EeAosJVEI"},{name:"DB Lateral Raise 8kg",link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},{name:"Cable Face Pull posture",link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"}]},
    {day:"Thu",time:"8:00pm",icon:"🏋️",name:"Back + Bicep Width",target:"WIDE BACK",equipment:"Cable + Dumbbells",sets:"4 sets x 10 reps",exercises:[{name:"Cable Lat Pulldown wide grip",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"Cable Seated Row",link:"https://www.youtube.com/watch?v=GZbfZ033f74"},{name:"DB Hammer Curl 12kg",link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},{name:"Cable Face Pull",link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"}]},
    {day:"Fri",time:"OFF",icon:"😴",name:"Rest Day Friday",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Sat",time:"OFF",icon:"🌿",name:"Active Recovery Saturday",target:"SHOP + WALK",equipment:"Outdoors",sets:"LuLu shop + 30 min walk",exercises:[{name:"Weekly grocery shop at LuLu Souk Warsan",link:""},{name:"30 min walk around International City",link:""}]},
   ]},
  {week:"Week 5-6",theme:"Peak Fat Burn (40 min cardio + 40 min weights)",color:C.caramel,focus:"Maximum chest burn, oblique shred",
   days:[
    {day:"Sun",time:"8:00pm",icon:"💥",name:"Chest Max Effort",target:"CHEST ULTIMATE",equipment:"Bench + Dumbbells + Cable",sets:"4 sets x 10 reps",exercises:[{name:"Flat DB Press 14kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"Incline DB Press 12kg upper chest",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"Cable Low-to-High Fly heavy",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"DB Chest Fly flat stretch",link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},{name:"Cable Tricep heavy",link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"}]},
    {day:"Mon",time:"8:00pm",icon:"🦵",name:"Knee Strength + Pull",target:"KNEES + BACK",equipment:"Cable + Mat",sets:"4 sets",exercises:[{name:"Knee exercises no equipment 10 min",link:"https://www.youtube.com/watch?v=cJCikne7iKM"},{name:"Cable Lat Pulldown close grip",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"DB Row 14kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},{name:"Dead Bug 5 rounds",link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"}]},
    {day:"Tue",time:"8:00pm",icon:"🔥",name:"Core Oblique Blast",target:"LOVE HANDLES",equipment:"Cable + Mat",sets:"5 rounds no rest",exercises:[{name:"Cable Woodchop 12 reps each side",link:"https://www.youtube.com/watch?v=wu3WvaWmCMU"},{name:"Plank 45s",link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},{name:"Side Plank 30s each",link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},{name:"Dead Bug 45s",link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},{name:"Glute Bridge hold 40s",link:"https://www.youtube.com/watch?v=wPM8icPu6H8"}]},
    {day:"Wed",time:"8:00pm",icon:"💪",name:"Chest Superset Day",target:"CHEST SUPERSET",equipment:"Bench + Cable",sets:"4 rounds x 10 reps",exercises:[{name:"SUPERSET Incline DB Press 12kg + Cable Fly",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"SUPERSET Flat DB Press 14kg + Low-to-High Fly",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"DB Shoulder Press 12kg",link:"https://www.youtube.com/watch?v=qEwKCR5JCog"}]},
    {day:"Thu",time:"8:00pm",icon:"🏋️",name:"Back Power Day",target:"WIDE BACK",equipment:"Cable + Dumbbells",sets:"4 sets x 8 reps",exercises:[{name:"Cable Lat Pulldown heavy",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"DB Row 16kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},{name:"Cable Seated Row",link:"https://www.youtube.com/watch?v=GZbfZ033f74"},{name:"DB Hammer Curl 14kg",link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"}]},
    {day:"Fri",time:"OFF",icon:"😴",name:"Rest Day Friday",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Sat",time:"OFF",icon:"🎯",name:"Progress Day Saturday",target:"MEASURE",equipment:"Home",sets:"Progress photos + measure",exercises:[{name:"Progress photos front back side",link:""},{name:"Measure waist chest and weight",link:""}]},
   ]},
  {week:"Week 7-8",theme:"Victory (40 min cardio + 45 min weights)",color:C.fern,focus:"Cement gains, final chest push, celebrate",
   days:[
    {day:"Sun",time:"8:00pm",icon:"🏆",name:"Chest Final Boss",target:"CHEST HEAVY",equipment:"Bench + Dumbbells + Cable",sets:"4 sets x 8 reps HEAVY",exercises:[{name:"Flat DB Press 16kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"Incline DB Press 14kg",link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},{name:"Cable Low-to-High Fly max",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"DB Chest Fly 10kg",link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},{name:"DB Shoulder Press 12kg",link:"https://www.youtube.com/watch?v=qEwKCR5JCog"}]},
    {day:"Mon",time:"8:00pm",icon:"🦵",name:"Knee Final Strengthen",target:"BULLETPROOF KNEES",equipment:"Mat + Dumbbells",sets:"Full PT routine",exercises:[{name:"BEST Knee Strengthening Beginners",link:"https://www.youtube.com/watch?v=rsSV_lqbEVo"},{name:"Glute Bridge 3x20",link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},{name:"DB Row 16kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"}]},
    {day:"Tue",time:"8:00pm",icon:"🔥",name:"Core Endurance Final",target:"CORE MAX",equipment:"Cable + Mat",sets:"5 rounds timed",exercises:[{name:"Plank 60s beat week 1",link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},{name:"Dead Bug 60s",link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},{name:"Cable Woodchop 15 each side",link:"https://www.youtube.com/watch?v=wu3WvaWmCMU"}]},
    {day:"Wed",time:"8:00pm",icon:"💥",name:"Upper Body Peak",target:"FULL UPPER HEAVY",equipment:"Full Gym",sets:"4 sets x 8 reps",exercises:[{name:"Flat DB Press 16kg",link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},{name:"Cable Lat Pulldown heavy",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"DB Shoulder Press 12kg",link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},{name:"Cable Low-to-High Fly",link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},{name:"DB Hammer Curl 14kg",link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"}]},
    {day:"Thu",time:"8:00pm",icon:"🎯",name:"Victory Back Session",target:"WIDEST BACK",equipment:"Cable + Dumbbells",sets:"4 sets x 10 reps",exercises:[{name:"Cable Lat Pulldown heavy",link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},{name:"DB Row 16kg",link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},{name:"Cable Seated Row",link:"https://www.youtube.com/watch?v=GZbfZ033f74"},{name:"Cable Face Pull",link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"}]},
    {day:"Fri",time:"OFF",icon:"😴",name:"Rest Day Friday",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Sat",time:"OFF",icon:"✨",name:"Reflection Saturday",target:"CELEBRATE",equipment:"Home",sets:"Final photos + plan next phase",exercises:[{name:"Full progress photos all angles",link:""},{name:"Measure all body measurements",link:""}]},
   ]},
];

// ── MEAL PLAN — 3 meals + 1 snack ─────────────────────────────────
// Breakfast 10:00am · Snack 12:30pm · Lunch 2:00pm · Dinner 7:30pm
// Work days Sun-Thu · Off Fri-Sat
// All ingredients from LuLu Souk Warsan or Al Madeena Mini Mart (0.2km)
// Target: ~1700 kcal/day · 140g+ protein · simple prep

const meals=[
  {
    meal:"Breakfast",icon:"☕",time:"10:00 AM",
    tag:"Work days Sun-Thu · At work or just before leaving home",
    name:"Oats + Eggs + Banana",
    calories:480,protein:36,carbs:48,fat:13,
    shopNote:"LuLu Warsan: Oats 1kg ~AED 8 · Eggs 30pk ~AED 14 · Bananas 1kg ~AED 5",
    why:"High protein + slow carbs keeps you full from 10am to 2pm. No cravings during morning work hours.",
    prepTip:"Night before: measure oats in pot, crack eggs into bowl. Morning cook = 8 minutes total.",
    ingredients:["3 whole eggs scrambled","70g rolled oats","200ml low-fat milk or water","1 banana sliced","1 tbsp peanut butter","Pinch cinnamon and salt"],
    instructions:"Cook oats in milk on medium heat 4-5 min stirring. Scramble 3 eggs with pinch of salt in separate pan 3 min. Top oats with banana and peanut butter. Eat eggs alongside.",
    video:"https://www.youtube.com/watch?v=daIsNUhS2ik",
  },
  {
    meal:"Snack",icon:"🍎",time:"12:30 PM",
    tag:"At work · Keep in desk or bring from home",
    name:"Greek Yogurt + Fruit",
    calories:200,protein:20,carbs:22,fat:4,
    shopNote:"LuLu Warsan: Greek yogurt 200g ~AED 5 · Apples ~AED 8 bag · Berries frozen ~AED 12",
    why:"One daily snack between breakfast and lunch. Keeps energy steady and prevents overeating at lunch.",
    prepTip:"Pack yogurt cup and fruit in your bag every morning. Zero prep needed. Eat at desk.",
    ingredients:["200g Greek yogurt 0% fat","1 apple or handful of berries","1 tsp honey optional"],
    instructions:"Open yogurt. Top with fruit and optional honey. Eat at desk. Takes 1 minute. Can also prep in a lidded jar the night before.",
    video:"https://www.youtube.com/watch?v=w8jhmWSl4Lc",
  },
  {
    meal:"Lunch",icon:"🍗",time:"2:00 PM",
    tag:"At work · Prep the night before · No microwave needed",
    name:"Grilled Chicken + Rice Cakes + Salad",
    calories:520,protein:50,carbs:38,fat:12,
    shopNote:"LuLu Warsan: Chicken 1kg ~AED 18 · Rice cakes ~AED 8 · Cucumber ~AED 4 · Tomatoes ~AED 7",
    why:"Biggest protein meal of the day. Timed at 2pm to fuel your afternoon and your 8pm workout.",
    prepTip:"Saturday batch cook: grill all chicken for the week. Pack 180g sliced in container with rice cakes and salad every night. 5 min prep.",
    ingredients:["180g grilled chicken breast sliced from batch","4 plain rice cakes","Half cucumber sliced","8 cherry tomatoes","Handful baby spinach","1 tbsp olive oil and lemon squeeze","Salt, pepper, garlic powder"],
    instructions:"Saturday: grill all 600g chicken with garlic, salt, pepper, cumin. Store in fridge 4 days. Each night: slice 180g into container, pack rice cakes, cucumber, tomatoes, spinach, drizzle olive oil and lemon. Seal and refrigerate. At lunch: eat cold, no heating needed.",
    video:"https://www.youtube.com/watch?v=mbGpI2XNHFQ",
  },
  {
    meal:"Dinner",icon:"🌙",time:"7:30 PM",
    tag:"At home · After arriving 7:15pm · Before gym at 8pm",
    name:"Salmon or Chicken + Brown Rice + Broccoli",
    calories:500,protein:46,carbs:40,fat:14,
    shopNote:"LuLu Warsan: Salmon 200g ~AED 20 · Brown rice 2kg ~AED 12 · Broccoli 500g ~AED 5",
    why:"Your pre-workout meal. Eaten at 7:30pm gives 30 min before your 8pm session. Balanced carbs and protein — enough energy for training without feeling heavy.",
    prepTip:"Saturday batch: cook 400g brown rice, stores 5 days. Each night reheat rice 90 sec + cook salmon or chicken 12 min + steam broccoli 5 min. Total 15 min.",
    ingredients:["200g salmon fillet or 180g chicken breast","80g cooked brown rice from batch","150g broccoli florets","1 garlic clove minced","1 tsp olive oil","Lemon, salt, pepper, paprika"],
    instructions:"Option 1 Salmon: rub with garlic, paprika, salt. Pan-fry skin-down 5 min, flip 3 min. Option 2 Chicken: slice thin, cook in pan with oil garlic 5 min each side. Steam broccoli with lid on 5 min. Serve over rice with lemon squeeze. Total 15 minutes.",
    video:"https://www.youtube.com/watch?v=MgfXxnwOc98",
  },
  {
    meal:"Friday Breakfast",icon:"🌅",time:"9:00 AM",
    tag:"Friday OFF · Cook fresh · Take your time",
    name:"Egg Omelette + Whole Wheat Toast",
    calories:420,protein:30,carbs:32,fat:16,
    shopNote:"LuLu Warsan: Eggs · Tomatoes · Spinach · Bread all under AED 20",
    why:"Rest day breakfast. Cook properly and enjoy it. Good nutrition supports Friday recovery.",
    prepTip:"Friday morning is a good time to check what you need before Saturday big shop.",
    ingredients:["3 eggs","Handful baby spinach","2 tomatoes sliced","Half onion diced","1 tsp olive oil","2 slices whole wheat toast","Salt, pepper, cumin"],
    instructions:"Beat eggs with salt and pepper. Saute onion in oil 2 min. Add spinach and tomato 1 min. Pour eggs over, cook on medium 3-4 min. Fold omelette. Serve with toast. Eat slowly.",
    video:"https://www.youtube.com/watch?v=KQbaqNPqBaU",
  },
  {
    meal:"Saturday Batch Cook",icon:"🛒",time:"10:00 AM",
    tag:"Saturday OFF · Weekly shop + 1 hour batch cook",
    name:"Weekly Prep: Chicken + Rice + Eggs",
    calories:0,protein:0,carbs:0,fat:0,
    shopNote:"LuLu Souk Warsan 5 min drive from Akasya South · Open 8am to midnight · ~AED 120 per week total",
    why:"One hour Saturday saves 15 minutes every work day and guarantees you eat right all week without thinking.",
    prepTip:"Full buy list: Chicken 1kg, Eggs 30pk, Brown rice 2kg, Oats 1kg, Greek yogurt x5, Salmon or chicken for dinners, Rice cakes, Cucumber, Tomatoes, Spinach, Bananas, Apples, Peanut butter, Labneh.",
    ingredients:["600g chicken breast grill all for lunches","400g brown rice cook full batch","Portion dinners for each day","Set aside yogurt and fruit for daily snacks"],
    instructions:"1 Grill all 600g chicken with garlic cumin salt pepper - stores 4 days in fridge. 2 Cook 400g brown rice - stores 5 days. 3 Pack 4 lunch containers: chicken sliced + rice cakes + salad veg. 4 Put yogurt cups and fruit in fridge ready to grab. Done in 60 minutes. Your whole week is set.",
    video:"https://www.youtube.com/watch?v=zg6coSIW-I4",
  },
];

const quotes=[
  {text:"The pain you feel today will be the strength you feel tomorrow.",author:"Arnold Schwarzenegger"},
  {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
  {text:"Discipline is choosing between what you want now and what you want most.",author:"Abraham Lincoln"},
  {text:"Take care of your body. It is the only place you have to live.",author:"Jim Rohn"},
  {text:"Small daily improvements lead to stunning long-term results.",author:"Robin Sharma"},
];

// ── DAILY SCHEDULE ────────────────────────────────────────────────
const schedule=[
  {t:"9:00am", e:"🚗", d:"Leave Akasya South for work",         h:false},
  {t:"9:30am", e:"🚇", d:"Metro — CentrePoint to Al Ras",       h:false},
  {t:"10:00am",e:"☕", d:"Check in at work + Breakfast",         h:true},
  {t:"12:30pm",e:"🍎", d:"Daily snack — yogurt and fruit",       h:false},
  {t:"2:00pm", e:"🍗", d:"Lunch — chicken rice cakes salad",     h:true},
  {t:"6:00pm", e:"🚇", d:"Check out — metro home",               h:false},
  {t:"7:15pm", e:"🏠", d:"Arrive home Akasya South",             h:false},
  {t:"7:30pm", e:"🌙", d:"Dinner — salmon or chicken + rice",    h:true},
  {t:"7:50pm", e:"🚗", d:"Drive to gym",                         h:false},
  {t:"8:00pm", e:"🏋️",d:"WORKOUT — 40 min cardio + weights",    h:true},
  {t:"9:30pm", e:"🚗", d:"Drive home from gym",                  h:false},
  {t:"11:00pm",e:"😴", d:"Sleep — 7 hours recovery",             h:false},
];

// ── HOME VIEW ─────────────────────────────────────────────────────
function HomeView({logs}){
  const [qIdx,setQIdx]=useState(0);
  const sW=PERSONAL.startWeight,gW=PERSONAL.goalWeight,range=sW-gW;
  const latest=logs.length>0?logs[logs.length-1].weight:sW;
  const lost=Math.max(0,sW-latest);
  const wPct=Math.min(100,(lost/range)*100);
  const totalDone=logs.length;
  const totalPlanned=workoutWeeks.reduce((a,w)=>a+w.days.filter(d=>d.time==="8:00pm").length,0);
  const woPct=Math.min(100,(totalDone/totalPlanned)*100);
  const avgW=logs.length>0?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.length).toFixed(1):"0";
  const avgS=logs.length>0?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.length).toFixed(1):"0";
  const curBMI=bmi(latest);
  const workMeals=meals.filter(m=>m.calories>0&&!m.meal.includes("Friday")&&!m.meal.includes("Saturday"));
  const totCal=workMeals.reduce((a,m)=>a+m.calories,0);
  const totProt=workMeals.reduce((a,m)=>a+m.protein,0);

  return(<div>

    {/* Cardio Banner */}
    <Card topColor={C.blue} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.blue}11,${C.bgCard})`}}>
      <Divider label="Daily Cardio — Every Session First (40 min)"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,marginBottom:"10px"}}>🚴 10 min Bike → 🌊 10 min Elliptical → 📈 20 min Incline Walk — always before weights</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
        {cardioBlock.map((c,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"12px",padding:"10px 8px",border:`1px solid ${C.border}`,textAlign:"center"}}><div style={{fontSize:"18px",marginBottom:"3px"}}>{c.icon}</div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"11px",color:C.textDark}}>{c.name}</div><div style={{fontFamily:font.mono,fontSize:"10px",color:C.blue,margin:"2px 0"}}>{c.order}</div><WatchBtn link={c.link} label="How To"/></div>))}
      </div>
    </Card>

    {/* Daily Schedule */}
    <Card topColor={C.gold} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.gold}11,${C.bgCard})`}}>
      <Divider label="Your Daily Schedule — Sun to Thu"/>
      {schedule.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:"10px",alignItems:"center",padding:"6px 8px",borderRadius:"8px",background:s.h?`${C.fern}11`:"transparent",marginBottom:"2px"}}>
          <div style={{fontFamily:font.mono,fontSize:"11px",color:s.h?C.fern:C.gold,minWidth:"58px",fontWeight:s.h?"bold":"normal"}}>{s.t}</div>
          <div style={{fontSize:"15px"}}>{s.e}</div>
          <div style={{fontFamily:font.body,fontSize:"12px",color:s.h?C.fern:C.textMid,fontWeight:s.h?"bold":"normal"}}>{s.d}</div>
        </div>
      ))}
      <div style={{background:C.mintCream,borderRadius:"8px",padding:"8px 12px",marginTop:"8px",border:`1px solid ${C.leafPale}`}}>
        <div style={{fontFamily:font.body,fontSize:"11px",color:C.fern}}>🏖️ <strong>Fri OFF</strong> — Full rest &nbsp;·&nbsp; <strong>Sat OFF</strong> — LuLu shop + batch cook + walk</div>
      </div>
    </Card>

    {/* Meal Summary Strip */}
    <Card topColor={C.wood} style={{marginBottom:"14px"}}>
      <Divider label="Daily Meal Plan at a Glance"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {[
          {icon:"☕",label:"Breakfast",time:"10:00am",cal:"480 kcal",color:C.caramel},
          {icon:"🍎",label:"Snack",time:"12:30pm",cal:"200 kcal",color:C.sage},
          {icon:"🍗",label:"Lunch",time:"2:00pm",cal:"520 kcal",color:C.wood},
          {icon:"🌙",label:"Dinner",time:"7:30pm",cal:"500 kcal",color:C.teal},
        ].map((m,i)=>(
          <div key={i} style={{background:C.bgDeep,borderRadius:"12px",padding:"12px 10px",border:`1px solid ${C.border}`,display:"flex",gap:"10px",alignItems:"center"}}>
            <div style={{fontSize:"22px"}}>{m.icon}</div>
            <div>
              <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{m.label}</div>
              <div style={{fontFamily:font.mono,fontSize:"10px",color:m.color}}>{m.time}</div>
              <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{m.cal}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:"12px",background:`${C.fern}11`,borderRadius:"10px",padding:"10px 14px",border:`1px solid ${C.leafPale}`}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          {[{l:"Total Calories",v:totCal+"kcal",c:C.walnut},{l:"Total Protein",v:totProt+"g",c:C.fern},{l:"Deficit/day",v:"~"+(2800-totCal)+"kcal",c:C.caramel}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:s.c}}>{s.v}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>

    {/* Profile */}
    <Card topColor={C.fern} style={{marginBottom:"14px"}}>
      <Divider label="Your Profile"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        <StatBox label="Start Weight" value={sW+"kg"} color={C.walnut}/>
        <StatBox label="Goal Weight" value={gW+"kg"} color={C.fern}/>
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

    {/* Progress Rings */}
    <Card topColor={C.caramel} style={{marginBottom:"14px"}}>
      <Divider label="Overall Progress"/>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"14px"}}>
        <Ring pct={wPct} color={C.fern} size={78} label="weight" value={lost.toFixed(1)} unit="kg"/>
        <Ring pct={woPct} color={C.wood} size={78} label="workouts" value={totalDone} unit=""/>
        <Ring pct={Math.min(100,(parseFloat(avgW)/3)*100)} color={C.teal} size={78} label="avg water" value={avgW} unit="L"/>
        <Ring pct={Math.min(100,(parseFloat(avgS)/7)*100)} color={C.caramel} size={78} label="avg sleep" value={avgS} unit="h"/>
      </div>
    </Card>

    {/* Log Sheet */}
    <Card topColor={C.bark} style={{marginBottom:"14px"}}>
      <Divider label="Workout Log Sheet"/>
      {logs.length===0
        ?(<div style={{textAlign:"center",padding:"24px 0",color:C.textLight,fontFamily:font.body,fontSize:"13px",fontStyle:"italic"}}>🌱 No sessions logged yet. Go to Workout tab and press + Log after each session.</div>)
        :(<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:font.body,fontSize:"12px"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["#","Date","Workout","Weight","Water","Sleep","Feel"].map(h=>(<th key={h} style={{padding:"6px 5px",color:C.textMuted,fontWeight:"normal",textAlign:"left",whiteSpace:"nowrap",fontSize:"10px",textTransform:"uppercase"}}>{h}</th>))}</tr></thead><tbody>{[...logs].reverse().map((log,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.bgDark}`,background:i%2===0?C.bgDeep:"transparent"}}><td style={{padding:"7px 5px",color:C.textLight}}>{logs.length-i}</td><td style={{padding:"7px 5px",color:C.textMid,whiteSpace:"nowrap"}}>{log.date}</td><td style={{padding:"7px 5px",color:C.textDark,fontWeight:"bold",maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.workoutName}</td><td style={{padding:"7px 5px",color:C.walnut}}>{log.weight}kg</td><td style={{padding:"7px 5px",color:C.teal}}>{log.water}L</td><td style={{padding:"7px 5px",color:C.fern}}>{log.sleep}h</td><td style={{padding:"7px 5px",fontSize:"16px"}}>{log.feel}</td></tr>))}</tbody></table></div>)
      }
    </Card>

    {/* Knee Safety */}
    <Card topColor={C.bark} style={{marginBottom:"14px"}}>
      <Divider label="Knee Safety Protocol"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {[{icon:"🚫",t:"No Deep Squats",d:"Nothing below 90°",c:C.red},{icon:"🚫",t:"No Jumping",d:"Zero impact",c:C.red},{icon:"🚫",t:"Stop Sharp Pain",d:"Rest and ice",c:C.red},{icon:"✅",t:"Bike First Daily",d:"Warms knees gently",c:C.fern},{icon:"✅",t:"PT Knee Routine",d:"3 times per week",c:C.fern},{icon:"✅",t:"Ice After Session",d:"10-15 min ice pack",c:C.fern}].map((k,i)=>(<div key={i} style={{background:k.c===C.fern?C.mintCream:`${C.red}12`,border:`1px solid ${k.c===C.fern?C.leafPale:C.red+"44"}`,borderRadius:"10px",padding:"10px 12px"}}><div style={{fontSize:"14px",marginBottom:"3px"}}>{k.icon}</div><div style={{fontFamily:font.display,fontSize:"12px",fontWeight:"bold",color:k.c}}>{k.t}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{k.d}</div></div>))}
      </div>
    </Card>

    {/* Quote */}
    <Card style={{background:`linear-gradient(160deg,${C.mintCream},${C.bgCard})`,border:`1px solid ${C.leafPale}`,textAlign:"center"}}>
      <div style={{fontFamily:font.display,fontSize:"clamp(14px,3vw,18px)",fontStyle:"italic",color:C.textDark,lineHeight:1.7,marginBottom:"10px"}}>"{quotes[qIdx].text}"</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>— {quotes[qIdx].author}</div>
      <button onClick={()=>setQIdx((qIdx+1)%quotes.length)} style={{background:`linear-gradient(135deg,${C.fern},${C.moss})`,color:C.white,border:"none",borderRadius:"10px",padding:"9px 22px",fontFamily:font.body,fontSize:"12px",cursor:"pointer",fontWeight:"bold"}}>🌿 Next Quote</button>
    </Card>
  </div>);
}

// ── WORKOUT VIEW ──────────────────────────────────────────────────
function WorkoutView({onLog,logs}){
  const [openWeek,setOpenWeek]=useState(0);
  const [logging,setLogging]=useState(null);
  const [form,setForm]=useState({weight:105,water:2.0,sleep:7,feel:"😊"});
  const isDone=(name)=>logs.some(l=>l.workoutName===name);
  const submitLog=()=>{
    if(!logging)return;
    const day=workoutWeeks[logging.wi].days[logging.di];
    const today=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
    onLog({date:today,workoutName:day.name,...form});
    setLogging(null);
  };
  return(<div>
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>🏋️ 8-Week Evening Workout Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"12px"}}>Sun-Thu · Gym 8:00pm to 9:30pm · Fri-Sat Off</div>

    <Card topColor={C.blue} style={{marginBottom:"16px"}}>
      <Divider label="Daily Cardio — First Every Session (8:00pm–8:40pm)"/>
      {cardioBlock.map((c,i)=>(<div key={i} style={{background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px 14px",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}><div style={{flex:1}}><div style={{fontFamily:font.mono,fontSize:"11px",color:C.blue,marginBottom:"2px"}}>{c.icon} {c.order}</div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{c.name}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{c.protocol}</div></div><WatchBtn link={c.link} label="Watch"/></div>))}
    </Card>

    {logging!==null&&(<div style={{position:"fixed",inset:0,background:"rgba(60,35,10,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:C.bgCard,border:`2px solid ${C.fern}`,borderRadius:"22px",padding:"24px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 12px 40px rgba(0,0,0,0.25)"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:C.fern,marginBottom:"3px"}}>✅ Log Completed Session</div><div style={{fontFamily:font.body,fontSize:"13px",color:C.textMid,marginBottom:"18px"}}>{workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}</div><InputRow label="Current Weight kg" value={form.weight} onChange={v=>setForm({...form,weight:v})} unit="kg" min={50} max={200} step={0.5} icon="⚖️"/><InputRow label="Water Today L" value={form.water} onChange={v=>setForm({...form,water:v})} unit="L" min={0} max={6} step={0.1} icon="💧"/><InputRow label="Sleep Last Night h" value={form.sleep} onChange={v=>setForm({...form,sleep:v})} unit="hrs" min={0} max={12} step={0.5} icon="🌙"/><div style={{marginBottom:"16px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>How Did You Feel?</div><div style={{display:"flex",gap:"8px"}}>{["😴","😐","😊","💪","🔥"].map(e=>(<button key={e} onClick={()=>setForm({...form,feel:e})} style={{flex:1,fontSize:"20px",padding:"8px 4px",borderRadius:"10px",border:`2px solid ${form.feel===e?C.fern:C.border}`,background:form.feel===e?C.mintCream:C.bgDeep,cursor:"pointer"}}>{e}</button>))}</div></div><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setLogging(null)} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px",color:C.textMuted,fontFamily:font.body,fontSize:"13px",cursor:"pointer"}}>Cancel</button><button onClick={submitLog} style={{flex:2,background:`linear-gradient(135deg,${C.fern},${C.moss})`,border:"none",borderRadius:"12px",padding:"12px",color:C.white,fontFamily:font.display,fontWeight:"bold",fontSize:"14px",cursor:"pointer"}}>✅ Save to Log</button></div></div></div>)}

    {workoutWeeks.map((wk,wi)=>(<div key={wi} style={{marginBottom:"10px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)"}}><button onClick={()=>setOpenWeek(openWeek===wi?-1:wi)} style={{width:"100%",background:openWeek===wi?`linear-gradient(90deg,${wk.color}18,${C.bgCard})`:C.bgCard,border:"none",padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:openWeek===wi?`1px solid ${C.border}`:"none"}}><div style={{textAlign:"left"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:wk.color}}>{wk.week}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{wk.theme}</div><div style={{fontFamily:font.body,fontSize:"10px",color:wk.color,marginTop:"2px"}}>{wk.focus}</div></div><span style={{color:wk.color,fontSize:"16px",transform:openWeek===wi?"rotate(180deg)":"none",transition:"transform 0.3s"}}>▼</span></button>{openWeek===wi&&(<div style={{padding:"10px"}}>{wk.days.map((d,di)=>{const done=isDone(d.name);const isOff=d.time==="OFF";return(<div key={di} style={{background:isOff?`${C.amber}10`:done?C.mintCream:C.bgDeep,border:`1px solid ${isOff?C.border:done?C.leafPale:C.border}`,borderRadius:"14px",padding:"14px",marginBottom:"8px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px",marginBottom:d.exercises.length>0?"8px":"0"}}><div style={{flex:1}}><div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap",marginBottom:"3px"}}><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{d.icon} {d.day}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:wk.color,background:`${wk.color}18`,padding:"2px 8px",borderRadius:"20px"}}>{d.time}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:C.red,background:`${C.red}15`,padding:"2px 8px",borderRadius:"20px"}}>{d.target}</span></div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:done?C.fern:C.textDark}}>{d.name}{done?" ✓":""}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{d.equipment} · {d.sets}</div></div>{!isOff&&(<button onClick={()=>{setLogging({wi,di});setForm({weight:105,water:2.0,sleep:7,feel:"😊"});}} style={{background:done?C.mintCream:`linear-gradient(135deg,${C.fern},${C.moss})`,border:`1px solid ${done?C.fern:C.moss}`,color:done?C.fern:C.white,fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontFamily:font.body,whiteSpace:"nowrap"}}>{done?"✓ Logged":"+ Log"}</button>)}</div>{d.exercises.length>0&&(<div style={{display:"flex",flexDirection:"column",gap:"5px"}}>{d.exercises.map((ex,ei)=>(<div key={ei} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bgCard,borderRadius:"8px",padding:"7px 10px",gap:"8px"}}><span style={{fontFamily:font.body,fontSize:"12px",color:C.textDark,flex:1}}>• {ex.name}</span>{ex.link&&<WatchBtn link={ex.link}/>}</div>))}</div>)}</div>);})}</div>)}</div>))}
  </div>);
}

// ── FOOD VIEW ─────────────────────────────────────────────────────
function FoodView(){
  const [open,setOpen]=useState(null);
  const workMeals=meals.filter(m=>m.calories>0&&!m.meal.includes("Friday")&&!m.meal.includes("Saturday"));
  const totCal=workMeals.reduce((a,m)=>a+m.calories,0);
  const totProt=workMeals.reduce((a,m)=>a+m.protein,0);
  const totCarb=workMeals.reduce((a,m)=>a+m.carbs,0);
  const totFat=workMeals.reduce((a,m)=>a+m.fat,0);

  return(<div>
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>☕ Meal Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>3 meals + 1 snack · Simple · Affordable · All from LuLu Warsan</div>

    {/* Quick overview */}
    <Card topColor={C.gold} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.gold}11,${C.bgCard})`}}>
      <Divider label="Daily Meal Times"/>
      {[
        {icon:"☕",time:"10:00 AM",name:"Breakfast",cal:480,desc:"Oats + Eggs + Banana"},
        {icon:"🍎",time:"12:30 PM",name:"Snack",cal:200,desc:"Greek Yogurt + Fruit"},
        {icon:"🍗",time:"2:00 PM", name:"Lunch",cal:520,desc:"Chicken + Rice Cakes + Salad"},
        {icon:"🌙",time:"7:30 PM", name:"Dinner",cal:500,desc:"Salmon or Chicken + Rice + Broccoli"},
      ].map((m,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
          <div style={{fontSize:"20px"}}>{m.icon}</div>
          <div style={{fontFamily:font.mono,fontSize:"12px",color:C.gold,minWidth:"62px",fontWeight:"bold"}}>{m.time}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{m.name}</div>
            <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{m.desc}</div>
          </div>
          <div style={{fontFamily:font.mono,fontSize:"12px",color:C.walnut,fontWeight:"bold"}}>{m.cal} kcal</div>
        </div>
      ))}
      <div style={{marginTop:"12px",background:`${C.fern}11`,borderRadius:"10px",padding:"10px 14px",border:`1px solid ${C.leafPale}`}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          {[{l:"Total",v:totCal+" kcal",c:C.walnut},{l:"Protein",v:totProt+"g",c:C.fern},{l:"Deficit",v:"~"+(2800-totCal)+" kcal",c:C.caramel}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:s.c}}>{s.v}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </Card>

    {/* Totals bar */}
    <Card topColor={C.fern} style={{marginBottom:"16px"}}>
      <Divider label="Nutritional Breakdown"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"10px"}}>
        {[{l:"Calories",v:totCal,suf:"kcal",c:C.walnut},{l:"Protein",v:totProt,suf:"g",c:C.fern},{l:"Carbs",v:totCarb,suf:"g",c:C.teal},{l:"Fat",v:totFat,suf:"g",c:C.caramel}].map((t,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px 6px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:t.c}}>{t.v}</div><div style={{fontFamily:font.mono,fontSize:"9px",color:C.textLight}}>{t.suf}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{t.l}</div></div>))}
      </div>
      <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginBottom:"4px"}}>Protein coverage ({totProt}g / 140g target)</div>
      <Bar pct={(totProt/140)*100} color={C.fern} h={7}/>
    </Card>

    {/* Meal Cards */}
    {meals.map((m,i)=>(
      <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",marginBottom:"12px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)",borderLeft:`4px solid ${m.meal.includes("Friday")||m.meal.includes("Saturday")?C.amber:m.meal==="Snack"?C.sage:m.meal==="Dinner"?C.teal:C.wood}`}}>
        <div style={{padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
            <div>
              <div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}>
                <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{m.icon} {m.meal}</span>
                <span style={{fontFamily:font.mono,fontSize:"11px",color:C.gold,background:`${C.gold}22`,padding:"2px 10px",borderRadius:"20px",fontWeight:"bold"}}>{m.time}</span>
              </div>
              <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:C.textDark}}>{m.name}</div>
              <div style={{fontFamily:font.body,fontSize:"10px",color:C.blue,marginTop:"2px"}}>{m.tag}</div>
            </div>
            {m.calories>0&&<div style={{textAlign:"right"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"22px",color:C.walnut}}>{m.calories}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>kcal</div></div>}
          </div>

          <div style={{background:`${C.gold}18`,border:`1px solid ${C.gold}44`,borderRadius:"8px",padding:"6px 10px",marginBottom:"7px"}}>
            <div style={{fontFamily:font.body,fontSize:"11px",color:C.mocha}}>🛒 {m.shopNote}</div>
          </div>
          <div style={{background:C.mintCream,border:`1px solid ${C.leafPale}`,borderRadius:"8px",padding:"7px 10px",marginBottom:"7px"}}>
            <div style={{fontFamily:font.body,fontSize:"11px",color:C.fern}}>💡 {m.why}</div>
          </div>
          <div style={{background:`${C.blue}11`,border:`1px solid ${C.blue}33`,borderRadius:"8px",padding:"7px 10px",marginBottom:"10px"}}>
            <div style={{fontFamily:font.body,fontSize:"11px",color:C.blue}}>⏱ {m.prepTip}</div>
          </div>

          {m.calories>0&&(
            <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>
              {[{l:"Protein",v:m.protein+"g",c:C.fern},{l:"Carbs",v:m.carbs+"g",c:C.teal},{l:"Fat",v:m.fat+"g",c:C.caramel}].map((mc,j)=>(<div key={j} style={{flex:1,background:C.bgDeep,borderRadius:"8px",padding:"6px 4px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.mono,fontSize:"13px",fontWeight:"bold",color:mc.c}}>{mc.v}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{mc.l}</div></div>))}
            </div>
          )}

          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"7px",color:C.textMuted,cursor:"pointer",fontFamily:font.body,fontSize:"11px",marginBottom:"10px"}}>{open===i?"▲ Hide Recipe":"▼ Show Ingredients and Recipe"}</button>
          {open===i&&(<div style={{marginBottom:"12px"}}><div style={{fontFamily:font.display,fontWeight:"bold",color:C.fern,fontSize:"12px",marginBottom:"5px",textTransform:"uppercase"}}>🌿 Ingredients</div>{m.ingredients.map((ing,k)=>(<div key={k} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,padding:"2px 0"}}>· {ing}</div>))}<div style={{fontFamily:font.display,fontWeight:"bold",color:C.wood,fontSize:"12px",margin:"10px 0 5px",textTransform:"uppercase"}}>👨‍🍳 Method</div><div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.65}}>{m.instructions}</div></div>)}

          <a href={m.video} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:`linear-gradient(135deg,${C.red},#7a2a1a)`,color:"#fff",fontWeight:"bold",fontFamily:font.body,fontSize:"13px",padding:"10px",borderRadius:"10px",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>▶ Watch Cooking Video</a>
        </div>
      </div>
    ))}
  </div>);
}

// ── ROOT ─────────────────────────────────────────────────────────
export default function PandoApp(){
  const [view,setView]=useState("home");
  const [logs,setLogs]=useState([]);
  return(<div style={{minHeight:"100vh",background:C.bgPage,color:C.textDark,fontFamily:font.body}}>
    <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(139,107,60,0.04) 80px,rgba(139,107,60,0.04) 81px)",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:`linear-gradient(160deg,${C.fern} 0%,${C.moss} 60%,${C.bark} 100%)`,padding:"32px 20px 24px",textAlign:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-30px",left:"-30px",width:"140px",height:"140px",borderRadius:"50%",background:`${C.leafLight}22`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`${C.latte}22`,pointerEvents:"none"}}/>
      <div style={{display:"inline-block",background:`${C.latte}33`,border:`1px solid ${C.latteLight}66`,color:C.foam,fontWeight:"bold",fontSize:"10px",letterSpacing:"2.5px",padding:"4px 16px",borderRadius:"20px",marginBottom:"14px",textTransform:"uppercase",fontFamily:font.body}}>☕ Warsan 4 · Akasya South</div>
      <h1 style={{fontFamily:font.display,fontSize:"clamp(28px,7vw,52px)",fontWeight:"bold",margin:"0 0 4px",color:C.foam,letterSpacing:"1px"}}>PANDO APP</h1>
      <p style={{fontFamily:font.display,fontSize:"clamp(13px,2.5vw,16px)",color:C.latteLight,margin:"0 0 4px",fontStyle:"italic"}}>2-Month Transformation · 105kg → 88kg</p>
      <p style={{fontFamily:font.body,fontSize:"12px",color:`${C.foam}99`,margin:0}}>3 Meals + 1 Snack · Evening Workout 8pm · Sun–Thu</p>
    </div>
    <div style={{position:"relative",zIndex:1,background:C.bgDark,borderBottom:`1px solid ${C.border}`,padding:"12px 14px"}}>
      <div style={{display:"flex",gap:"10px",maxWidth:"720px",margin:"0 auto"}}>
        <NavBtn label="Progress" icon="🌿" active={view==="home"} onClick={()=>setView("home")}/>
        <NavBtn label="Workout" icon="🏋️" active={view==="workout"} onClick={()=>setView("workout")}/>
        <NavBtn label="Food Plan" icon="☕" active={view==="food"} onClick={()=>setView("food")}/>
      </div>
    </div>
    <div style={{position:"relative",zIndex:1,maxWidth:"720px",margin:"0 auto",padding:"18px 14px 80px"}}>
      {view==="home"&&<HomeView logs={logs}/>}
      {view==="workout"&&<WorkoutView onLog={e=>setLogs(p=>[...p,e])} logs={logs}/>}
      {view==="food"&&<FoodView/>}
    </div>
    <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"20px 0 32px",borderTop:`1px solid ${C.border}`,background:C.bgDark}}>
      <div style={{fontFamily:font.display,fontSize:"14px",color:C.wood,fontWeight:"bold"}}>PANDO APP 🌿 · Warsan 4, Dubai</div>
      <div style={{fontFamily:font.body,fontSize:"11px",color:C.textLight,marginTop:"3px"}}>3 meals · 1 snack · Evening workouts · Built for your life</div>
    </div>
  </div>);
}
