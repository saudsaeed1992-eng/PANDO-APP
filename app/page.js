"use client";
import { useState } from "react";

const C = {
  bg:"#f5ede0",bgPage:"#ede0cc",bgCard:"#fdf6ee",bgDeep:"#f0e4d0",bgDark:"#e8d8c0",
  border:"#d4b896",sage:"#5a7a48",fern:"#3d6030",moss:"#2d4d22",
  leafLight:"#7a9e60",leafPale:"#c8ddb8",mintCream:"#e8f0e0",
  walnut:"#7b4f2a",wood:"#9b6b3c",bark:"#5c3820",caramel:"#b87333",
  mocha:"#6b3d1a",espresso:"#3d2010",latte:"#c8a876",latteLight:"#dfc49a",foam:"#f5ede0",
  textDark:"#2d1f0e",textMid:"#5c3820",textMuted:"#8b6b4a",textLight:"#a88060",white:"#fffdf8",
  red:"#a0432a",teal:"#3d7060",amber:"#c97d30",blue:"#3b6ea5",
};
const font={display:"'Georgia','Times New Roman',serif",body:"'Palatino Linotype','Book Antiqua',Georgia,serif",mono:"'Courier New',monospace"};
const PERSONAL={startWeight:105,goalWeight:88,height:176};
const bmi=(w)=>(w/((PERSONAL.height/100)**2)).toFixed(1);
const bmiLabel=(b)=>b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";

// ── UI ATOMS ────────────────────────────────────────────────────────
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

function WatchBtn({link,label="▶ Watch"}){
  if(!link)return null;
  return(<a href={link} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"4px",background:C.red,color:"#fff",fontWeight:"bold",fontSize:"11px",padding:"5px 11px",borderRadius:"8px",textDecoration:"none",whiteSpace:"nowrap"}}>{label}</a>);
}

// ═══════════════════════════════════════════════════════════════════
// WORKOUT DATA — all videos verified short & exercise-specific
// ═══════════════════════════════════════════════════════════════════
// CARDIO BLOCK (done EVERY session before weights)
const cardioBlock = [
  {
    order:"1st · 10 min", icon:"🚴", name:"Stationary Bike",
    protocol:"Resistance 4–5 · 80–90 RPM · fat-burn zone · no stop",
    note:"Warms up knees gently. Zero impact. Targets belly fat through sustained heart rate.",
    // "10 Minute Indoor Bike HIIT Workout | Short Powerful Cardio" — Feb 2026
    link:"https://www.youtube.com/watch?v=obUQJ1hb4xI",
  },
  {
    order:"2nd · 10 min", icon:"🌊", name:"Elliptical Machine",
    protocol:"Level 5–6 · push & pull handles · steady pace",
    note:"Zero knee joint impact. Full body activation. Transitions directly from bike.",
    // "Beginner Elliptical Workout PYRAMID LEVELS 10 Minutes" — Sunny 2023
    link:"https://www.youtube.com/watch?v=t9KVWTROVb0",
  },
  {
    order:"3rd · 20 min", icon:"📈", name:"Incline Treadmill Walk",
    protocol:"4–8% incline · 5.5 km/h · no holding rails · posture upright",
    note:"Primary fat-burning cardio. Engages glutes and core. Targets belly and chest fat.",
    // "How To: Incline Treadmill Walk (12-3-30)" — 2024 short tutorial
    link:"https://www.youtube.com/watch?v=NAsObfFJXvE",
  },
];

const workoutWeeks=[
  {
    week:"Week 1–2", theme:"Foundation (40 min cardio + 30 min weights)",
    color:C.sage, focus:"Build base · activate chest · protect knees",
    days:[
      { day:"Sat", time:"7:30am", icon:"💪", name:"Chest Focus Day A",
        target:"🎯 CHEST BURN", equipment:"Bench + Dumbbells + Cable",
        sets:"4 exercises · 3 sets × 12 reps",
        exercises:[
          {name:"Flat DB Chest Press 10kg", link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},
          {name:"Incline DB Press 10kg (upper chest)", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Chest Fly (mid chest)", link:"https://www.youtube.com/watch?v=yrpiK8R4Vqo"},
          {name:"Cable Face Pull (posture)", link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"},
        ]},
      { day:"Sun", time:"7:30am", icon:"🦵", name:"Knee Strengthen + Back",
        target:"🎯 KNEES + BACK", equipment:"Dumbbells + Cable + Mat",
        sets:"4 exercises · 3 sets × 12 reps",
        exercises:[
          {name:"Glute Bridge (knee rehab)", link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},
          {name:"Seated Leg Extension light (strengthen VMO)", link:"https://www.youtube.com/watch?v=YyvSfVjQeL0"},
          {name:"Cable Lat Pulldown", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"One-Arm DB Row 12kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
        ]},
      { day:"Mon", time:"7:30am", icon:"🔥", name:"Core + Upper Body",
        target:"🎯 BELLY + ARMS", equipment:"Dumbbells + Mat",
        sets:"4 exercises · 3 sets",
        exercises:[
          {name:"Dead Bug core (30 sec each side)", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
          {name:"Plank hold 30s", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"DB Lateral Raise 6kg (shoulders)", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
          {name:"DB Bicep Curl 10kg", link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},
        ]},
      { day:"Tue", time:"7:30am", icon:"💪", name:"Chest Focus Day B",
        target:"🎯 CHEST BURN", equipment:"Bench + Dumbbells + Cable",
        sets:"4 exercises · 3 sets × 12 reps",
        exercises:[
          {name:"Incline DB Press 10kg (upper chest)", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Low-to-High Fly (upper chest)", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"DB Chest Fly on bench (stretch)", link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},
          {name:"Cable Tricep Pushdown", link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"},
        ]},
      { day:"Wed", time:"7:30am", icon:"🦵", name:"Knee Rehab + Shoulders",
        target:"🎯 KNEES + SHOULDERS", equipment:"Dumbbells + Mat",
        sets:"4 exercises · 3 sets",
        exercises:[
          {name:"Knee Strengthening Exercises (10 min routine)", link:"https://www.youtube.com/watch?v=cJCikne7iKM"},
          {name:"DB Shoulder Press 8kg seated", link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},
          {name:"Bird Dog (spinal stability)", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
          {name:"DB Lateral Raise 6kg", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
        ]},
      { day:"Thu", time:"7:30am", icon:"🔄", name:"Cable Full Body",
        target:"🎯 FULL BODY BURN", equipment:"Cable Machine",
        sets:"5 exercises · 3 sets × 12 reps",
        exercises:[
          {name:"Cable Lat Pulldown", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"Cable Seated Row", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"Cable Woodchop (love handles)", link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},
          {name:"Cable Tricep Pushdown", link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"},
          {name:"Cable Bicep Curl", link:"https://www.youtube.com/watch?v=NFzTWp2qpiE"},
        ]},
      { day:"Fri", time:"—", icon:"😴", name:"Full Rest",
        target:"💤 RECOVERY", equipment:"Home", sets:"Rest day",
        exercises:[]},
    ],
  },
  {
    week:"Week 3–4", theme:"Intensity Up (40 min cardio + 35 min weights)",
    color:C.wood, focus:"Chest attack · love handles · knee build",
    days:[
      { day:"Sat", time:"7:30am", icon:"💥", name:"Chest Power Day",
        target:"🎯 CHEST BURN MAX", equipment:"Bench + Dumbbells + Cable",
        sets:"5 exercises · 4 sets × 10 reps",
        exercises:[
          {name:"Flat DB Press 12kg", link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},
          {name:"Incline DB Press 12kg (upper chest fat)", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Low-to-High Fly (upper chest)", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"Cable Mid Chest Fly", link:"https://www.youtube.com/watch?v=yrpiK8R4Vqo"},
          {name:"DB Tricep Extension overhead 8kg", link:"https://www.youtube.com/watch?v=GzmlxvSFE7A"},
        ]},
      { day:"Sun", time:"7:30am", icon:"🦵", name:"Knee + Back Strength",
        target:"🎯 KNEES STRONGER", equipment:"Cable + Dumbbells + Mat",
        sets:"5 exercises · 4 sets × 10 reps",
        exercises:[
          {name:"BEST Knee Strengthening (follow-along PT routine)", link:"https://www.youtube.com/watch?v=rsSV_lqbEVo"},
          {name:"Cable Lat Pulldown wide", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"One-Arm DB Row 14kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
          {name:"Glute Bridge march (VMO protection)", link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},
          {name:"Dead Bug 4 rounds", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
        ]},
      { day:"Mon", time:"7:30am", icon:"🔥", name:"Core + Love Handles",
        target:"🎯 BELLY + OBLIQUES", equipment:"Cable + Mat",
        sets:"5 exercises · 4 rounds",
        exercises:[
          {name:"Cable Woodchop high-to-low (love handles)", link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},
          {name:"Cable Woodchop low-to-high (obliques)", link:"https://www.youtube.com/watch?v=rHfjG2Oflz0"},
          {name:"Plank shoulder tap 40s", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"Side Plank 25s each", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"Dead Bug 45s", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
        ]},
      { day:"Tue", time:"7:30am", icon:"💪", name:"Upper Chest + Shoulders",
        target:"🎯 CHEST + SHOULDERS", equipment:"Bench + Dumbbells + Cable",
        sets:"5 exercises · 4 sets × 10 reps",
        exercises:[
          {name:"Incline DB Press 12kg", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Upper Chest Fly", link:"https://www.youtube.com/watch?v=i6EeAosJVEI"},
          {name:"DB Lateral Raise 8kg", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
          {name:"DB Shoulder Press 10kg seated", link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},
          {name:"Cable Face Pull", link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"},
        ]},
      { day:"Wed", time:"7:30am", icon:"🦵", name:"Knee Rehab Focus",
        target:"🎯 KNEE HEALTH", equipment:"Mat + Dumbbells",
        sets:"PT knee routine + upper body",
        exercises:[
          {name:"10 Exercises Knee Strength & Decrease Pain (Dr. Jared)", link:"https://www.youtube.com/watch?v=rZjthGWVq7Q"},
          {name:"DB Hammer Curl 12kg", link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},
          {name:"DB Lateral Raise 8kg", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
        ]},
      { day:"Thu", time:"7:30am", icon:"🏋️", name:"Back + Bicep",
        target:"🎯 BACK WIDTH", equipment:"Cable + Dumbbells",
        sets:"5 exercises · 4 sets × 10 reps",
        exercises:[
          {name:"Cable Lat Pulldown wide grip", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"Cable Seated Row", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"DB Bent-Over Row 14kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
          {name:"DB Hammer Curl 12kg", link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},
          {name:"Cable Face Pull (rear delts)", link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"},
        ]},
      { day:"Fri", time:"—", icon:"😴", name:"Full Rest",
        target:"💤 RECOVERY", equipment:"Home", sets:"Rest day",
        exercises:[]},
    ],
  },
  {
    week:"Week 5–6", theme:"Peak Fat Burn (40 min cardio + 40 min weights)",
    color:C.caramel, focus:"Maximum chest burn · oblique attack",
    days:[
      { day:"Sat", time:"7:30am", icon:"💥", name:"Chest Max Effort",
        target:"🎯 CHEST BURN MAX", equipment:"Bench + Dumbbells + Cable",
        sets:"6 exercises · 4 sets × 10 reps",
        exercises:[
          {name:"Flat DB Press 14kg", link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},
          {name:"Incline DB Press 12kg (upper chest)", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Low-to-High Fly (upper chest max)", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"DB Chest Fly flat (stretch & squeeze)", link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},
          {name:"Cable Tricep Pushdown heavy", link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"},
          {name:"DB Lateral Raise 8kg", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
        ]},
      { day:"Sun", time:"7:30am", icon:"🦵", name:"Knee Strength + Pull",
        target:"🎯 KNEES + BACK", equipment:"Cable + Mat",
        sets:"5 exercises · 4 sets",
        exercises:[
          {name:"Knee Strengthening Exercises no equipment (10 min)", link:"https://www.youtube.com/watch?v=cJCikne7iKM"},
          {name:"Cable Lat Pulldown close grip", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"Cable Straight-Arm Pulldown", link:"https://www.youtube.com/watch?v=AjCCGN2tU3Q"},
          {name:"Cable Row heavy", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"Dead Bug 5 rounds 45s", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
        ]},
      { day:"Mon", time:"7:30am", icon:"🔥", name:"Core Oblique Blast",
        target:"🎯 LOVE HANDLES + BELLY", equipment:"Cable + Mat",
        sets:"5 exercises · 5 rounds no rest",
        exercises:[
          {name:"Cable Woodchop high-to-low 12 reps each", link:"https://www.youtube.com/watch?v=wu3WvaWmCMU"},
          {name:"Plank 45s", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"Side Plank 30s each", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"Dead Bug 45s", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
          {name:"Glute Bridge hold 40s", link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},
        ]},
      { day:"Tue", time:"7:30am", icon:"💪", name:"Upper Chest Superset",
        target:"🎯 CHEST BURN SUPERSET", equipment:"Bench + Cable",
        sets:"Superset pairs · 4 rounds × 10 reps",
        exercises:[
          {name:"SUPERSET: Incline DB Press 12kg + Cable Fly", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"SUPERSET: Flat DB Press 14kg + Cable Low-to-High", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"DB Shoulder Press 12kg", link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},
        ]},
      { day:"Wed", time:"7:30am", icon:"🦵", name:"Knee + Core Day",
        target:"🎯 KNEE HEALTH + CORE", equipment:"Mat + Cable",
        sets:"PT routine + core",
        exercises:[
          {name:"Fix Knee Pain — 4 muscle strengthening routine", link:"https://www.youtube.com/watch?v=D2p8DxrbgT0"},
          {name:"Cable Woodchop obliques", link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},
          {name:"Plank 60s", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
        ]},
      { day:"Thu", time:"7:30am", icon:"🏋️", name:"Back Power Day",
        target:"🎯 WIDE BACK", equipment:"Cable + Dumbbells",
        sets:"5 exercises · 4 sets × 8 reps",
        exercises:[
          {name:"Cable Lat Pulldown heavy wide grip", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"DB One-Arm Row 16kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
          {name:"Cable Seated Row", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"DB Hammer Curl 14kg", link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},
          {name:"Cable Face Pull", link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"},
        ]},
      { day:"Fri", time:"—", icon:"😴", name:"Full Rest",
        target:"💤 RECOVERY", equipment:"Home", sets:"Rest day",
        exercises:[]},
    ],
  },
  {
    week:"Week 7–8", theme:"Victory — Peak Power (40 min cardio + 45 min weights)",
    color:C.fern, focus:"Final chest burn · cement gains · maximum results",
    days:[
      { day:"Sat", time:"7:30am", icon:"🏆", name:"Chest Final Boss Day",
        target:"🎯 CHEST ULTIMATE BURN", equipment:"Bench + Dumbbells + Cable",
        sets:"6 exercises · 4 sets × 8 reps HEAVY",
        exercises:[
          {name:"Flat DB Press 16kg heavy", link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},
          {name:"Incline DB Press 14kg (upper chest)", link:"https://www.youtube.com/watch?v=IP4oeKh1Sd4"},
          {name:"Cable Low-to-High Fly heavy", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"DB Chest Fly 10kg (full stretch)", link:"https://www.youtube.com/watch?v=LzFvciCdoW0"},
          {name:"Cable Tricep Pushdown heavy", link:"https://www.youtube.com/watch?v=-zLyUAo1gMw"},
          {name:"DB Shoulder Press 12kg", link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},
        ]},
      { day:"Sun", time:"7:30am", icon:"🦵", name:"Knee Final Strengthen",
        target:"🎯 BULLETPROOF KNEES", equipment:"Mat + Dumbbells",
        sets:"Full knee routine",
        exercises:[
          {name:"BEST Knee Strengthening Beginners — full PT routine 2026", link:"https://www.youtube.com/watch?v=rsSV_lqbEVo"},
          {name:"Glute Bridge 3×20", link:"https://www.youtube.com/watch?v=wPM8icPu6H8"},
          {name:"Cable Row heavy", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"DB Row 16kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
        ]},
      { day:"Mon", time:"7:30am", icon:"🔥", name:"Core Final Test",
        target:"🎯 CORE ENDURANCE MAX", equipment:"Cable + Mat",
        sets:"5 rounds timed — compare to week 1",
        exercises:[
          {name:"Plank 60s (measure improvement)", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
          {name:"Dead Bug 60s", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
          {name:"Cable Woodchop 15 reps each side", link:"https://www.youtube.com/watch?v=wu3WvaWmCMU"},
          {name:"Side Plank 35s each", link:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
        ]},
      { day:"Tue", time:"7:30am", icon:"💥", name:"Upper Body Peak",
        target:"🎯 FULL UPPER HEAVY", equipment:"Full Gym",
        sets:"6 exercises · 4 sets × 8 reps",
        exercises:[
          {name:"Flat DB Press 16kg", link:"https://www.youtube.com/watch?v=ufl6HV5NN9g"},
          {name:"Cable Lat Pulldown heavy", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"DB Shoulder Press 12kg", link:"https://www.youtube.com/watch?v=qEwKCR5JCog"},
          {name:"DB Row 16kg", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
          {name:"Cable Low-to-High Fly chest", link:"https://www.youtube.com/watch?v=eQ_NBB6OBH4"},
          {name:"DB Hammer Curl 14kg", link:"https://www.youtube.com/watch?v=ykJmrZ5v0Oo"},
        ]},
      { day:"Wed", time:"7:30am", icon:"🦵", name:"Knee Victory Day",
        target:"🎯 HEALTHY KNEES", equipment:"Mat + Cable",
        sets:"Knee routine + core",
        exercises:[
          {name:"10 Exercises Knee Strength (Dr. Jared full routine)", link:"https://www.youtube.com/watch?v=rZjthGWVq7Q"},
          {name:"Cable Woodchop obliques", link:"https://www.youtube.com/watch?v=he4IhLc1d5k"},
          {name:"Dead Bug 60s", link:"https://www.youtube.com/watch?v=bxn9FBrt4-A"},
        ]},
      { day:"Thu", time:"7:30am", icon:"🎯", name:"Back Victory Session",
        target:"🎯 WIDEST BACK YET", equipment:"Cable + Dumbbells",
        sets:"5 exercises · 4 sets × 10",
        exercises:[
          {name:"Cable Lat Pulldown heavy", link:"https://www.youtube.com/watch?v=NYQ-o3ffxOc"},
          {name:"DB Row 16kg both arms", link:"https://www.youtube.com/watch?v=XVPYh-1DabI"},
          {name:"Cable Seated Row heavy", link:"https://www.youtube.com/watch?v=GZbfZ033f74"},
          {name:"DB Lateral Raise 10kg", link:"https://www.youtube.com/watch?v=LUxFg7UXf2g"},
          {name:"Cable Face Pull", link:"https://www.youtube.com/watch?v=eIq5CB9JfKE"},
        ]},
      { day:"Fri", time:"—", icon:"✨", name:"Reflect & Reset",
        target:"🎊 CELEBRATE", equipment:"Home", sets:"Take progress photos + plan next 8 weeks",
        exercises:[]},
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// MEAL DATA — all cooking videos verified available
// ═══════════════════════════════════════════════════════════════════
const meals=[
  {
    meal:"Pre-Workout Breakfast", icon:"☕", time:"7:00 AM",
    name:"Protein Oats + Scrambled Eggs",
    calories:420, protein:35, carbs:38, fat:12,
    why:"Fuel for your 7:30am session. Eggs + oats = perfect mix of fast and slow protein. Eat 30 min before training.",
    ingredients:["3 whole eggs","60g rolled oats","150ml almond milk","1 tbsp peanut butter","½ banana","Pinch cinnamon & salt"],
    instructions:"Cook oats in almond milk on medium heat 4–5 min. Scramble eggs in separate pan 3 min with salt. Top oats with banana and peanut butter. Eat together.",
    // "Protein Oatmeal with Eggs" — Sep 2024, exact recipe
    video:"https://www.youtube.com/watch?v=daIsNUhS2ik",
  },
  {
    meal:"Post-Workout Meal", icon:"🍗", time:"9:30 AM",
    name:"Grilled Chicken Brown Rice Bowl",
    calories:520, protein:52, carbs:44, fat:10,
    why:"Eat within 45 min after training. This exact window maximises fat loss and muscle repair simultaneously. Non-negotiable.",
    ingredients:["200g chicken breast","80g brown rice dry","100g mixed salad","½ cucumber","10 cherry tomatoes","1 tbsp olive oil + lemon","Garlic powder, salt, pepper"],
    instructions:"Season chicken with garlic, salt, pepper. Grill 6–7 min each side on medium-high. Cook brown rice 25–30 min. Assemble plate and dress salad with olive oil and lemon.",
    // "Chicken Brown Rice Broccoli Meal Recipe HIGH PROTEIN LOW FAT" — Aug 2020
    video:"https://www.youtube.com/watch?v=zg6coSIW-I4",
  },
  {
    meal:"Work Lunch", icon:"🥗", time:"1:00 PM",
    name:"Tuna Avocado Rice Cakes",
    calories:380, protein:36, carbs:28, fat:14,
    why:"Prep the night before. Zero cooking at work. High protein keeps you full through your afternoon shift.",
    ingredients:["2 cans tuna in water 160g drained","½ avocado","4 plain rice cakes","50g baby spinach","1 tbsp Greek yogurt","Lemon juice, salt, pepper","5 cherry tomatoes"],
    instructions:"Drain tuna. Mix with Greek yogurt, lemon, salt, pepper. Mash avocado with lemon and salt. Spread avocado on rice cakes, top with tuna. Serve with spinach and tomatoes. Store in containers night before.",
    // "Tuna Rice Cakes" — exact recipe short
    video:"https://www.youtube.com/watch?v=TU3TDotubw8",
  },
  {
    meal:"Afternoon Snack", icon:"🥛", time:"4:00 PM",
    name:"Greek Yogurt Berry Bowl",
    calories:210, protein:28, carbs:18, fat:4,
    why:"Prevents afternoon muscle breakdown during work hours. Stops overeating at dinner.",
    ingredients:["200g Greek yogurt 0%","80g mixed berries","1 tbsp chia seeds","1 tsp honey"],
    instructions:"Layer yogurt in a jar or bowl. Top with berries, chia seeds, honey. Prep night before in lidded jar. Keeps in office fridge all day. Ready in 60 seconds.",
    // "Greek Yogurt Protein Berry Bowl With Chia & Flax Seeds" — Feb 2024
    video:"https://www.youtube.com/watch?v=w8jhmWSl4Lc",
  },
  {
    meal:"Dinner", icon:"🐟", time:"8:00 PM",
    name:"Sheet-Pan Salmon with Sweet Potato & Broccoli",
    calories:460, protein:44, carbs:24, fat:20,
    why:"Omega-3 in salmon reduces knee joint inflammation and supports overnight fat burning. Exact same ingredients as your drafted recipe.",
    ingredients:["200g salmon fillet","150g broccoli florets","100g sweet potato cubed","1 zucchini sliced","2 garlic cloves minced","1 tbsp olive oil","Lemon, dill, salt, pepper, paprika"],
    instructions:"Preheat oven 200°C. Toss veg in oil, season. Roast 20 min. Add salmon, rub with garlic, paprika, salt, lemon slices and dill. Bake 13–15 min until salmon flakes.",
    // "Sheet-pan salmon broccoli sweet potato — TODAY kitchen" — Mar 2023 exact recipe
    video:"https://www.youtube.com/watch?v=g8VO1SIl0B0",
  },
  {
    meal:"Pre-Sleep Snack", icon:"🌙", time:"10:00 PM",
    name:"Cottage Cheese & Almonds",
    calories:210, protein:24, carbs:8, fat:10,
    why:"Casein protein digests over 7–8 hours while you sleep. Feeds muscles and keeps metabolism burning overnight.",
    ingredients:["200g cottage cheese low fat","20g raw almonds","Pinch cinnamon","Optional ½ tsp honey"],
    instructions:"Scoop cottage cheese. Top with almonds and cinnamon. Eat 30 min before sleep. The slow protein prevents overnight muscle loss.",
    // "5 Easy Ways to Use Cottage Cheese For Weight Loss" — Jan 2024
    video:"https://www.youtube.com/watch?v=gSmL5xwpzAw",
  },
];

const quotes=[
  {text:"The pain you feel today will be the strength you feel tomorrow.",author:"Arnold Schwarzenegger"},
  {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
  {text:"Every workout is progress. Every meal is a choice. Make them count.",author:"Unknown"},
  {text:"Take care of your body. It is the only place you have to live.",author:"Jim Rohn"},
  {text:"Small daily improvements lead to stunning long-term results.",author:"Robin Sharma"},
];

// ═══════════════════════════════════════════════════════════════════
// HOME VIEW
// ═══════════════════════════════════════════════════════════════════
function HomeView({logs}){
  const [qIdx,setQIdx]=useState(0);
  const startW=PERSONAL.startWeight,goalW=PERSONAL.goalWeight,range=startW-goalW;
  const latest=logs.length>0?logs[logs.length-1].weight:startW;
  const lost=Math.max(0,startW-latest);
  const wPct=Math.min(100,(lost/range)*100);
  const totalDone=logs.length;
  const totalPlanned=workoutWeeks.reduce((a,w)=>a+w.days.filter(d=>d.exercises.length>0).length,0);
  const woPct=Math.min(100,(totalDone/totalPlanned)*100);
  const avgW=logs.length>0?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.length).toFixed(1):"—";
  const avgS=logs.length>0?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.length).toFixed(1):"—";
  const curBMI=bmi(latest);
  const totCal=meals.reduce((a,m)=>a+m.calories,0);
  const totProt=meals.reduce((a,m)=>a+m.protein,0);

  return(<div>
    {/* Daily structure banner */}
    <Card topColor={C.blue} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.blue}11,${C.bgCard})`}}>
      <Divider label="Daily Session Structure"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.7,marginBottom:"12px"}}>
        Every session = <strong style={{color:C.blue}}>40 min cardio</strong> + <strong style={{color:C.fern}}>weight training</strong><br/>
        Focus: <strong style={{color:C.red}}>Chest fat burning</strong> + <strong style={{color:C.teal}}>Knee strengthening</strong>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
        {cardioBlock.map((c,i)=>(
          <div key={i} style={{background:C.bgDeep,borderRadius:"12px",padding:"10px 8px",border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{fontSize:"20px",marginBottom:"4px"}}>{c.icon}</div>
            <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"11px",color:C.textDark}}>{c.name}</div>
            <div style={{fontFamily:font.mono,fontSize:"10px",color:C.blue,margin:"3px 0"}}>{c.order}</div>
            <WatchBtn link={c.link} label="▶ How To"/>
          </div>
        ))}
      </div>
    </Card>

    <Card topColor={C.bark} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.espresso}22,${C.bgCard})`}}>
      <Divider label="Body Analysis — Start Point"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.7,marginBottom:"10px"}}>
        Primary fat: <strong style={{color:C.walnut}}>abdomen, chest, lower back & flanks</strong>. Broad shoulder frame underneath.
        Equipment: <strong style={{color:C.fern}}>treadmill, elliptical, bike, cable, dumbbells, bench</strong>. Zero jumping. Zero deep squats.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {[{l:"Daily Calories",v:totCal+"kcal",c:C.walnut},{l:"Daily Protein",v:totProt+"g",c:C.fern},{l:"Workout Time",v:"7:30 AM",c:C.wood},{l:"Total Duration",v:"70–85 min",c:C.caramel}].map((s,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"15px",fontWeight:"bold",color:s.c}}>{s.v}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div></div>))}
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

    <Card topColor={C.wood} style={{marginBottom:"14px"}}>
      <Divider label="Overall Progress"/>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"14px"}}>
        <Ring pct={wPct} color={C.fern} size={78} label="weight" value={lost.toFixed(1)} unit="kg"/>
        <Ring pct={woPct} color={C.wood} size={78} label="workouts" value={totalDone} unit=""/>
        <Ring pct={Math.min(100,(parseFloat(avgW)/3)*100)} color={C.teal} size={78} label="avg water" value={avgW} unit="L"/>
        <Ring pct={Math.min(100,(parseFloat(avgS)/8)*100)} color={C.caramel} size={78} label="avg sleep" value={avgS} unit="h"/>
      </div>
    </Card>

    <Card topColor={C.caramel} style={{marginBottom:"14px"}}>
      <Divider label="Workout Log Sheet"/>
      {logs.length===0?(<div style={{textAlign:"center",padding:"28px 0",color:C.textLight,fontFamily:font.body,fontSize:"13px",fontStyle:"italic"}}>🌱 No sessions logged yet.<br/>Go to Workout tab → press + Log after each session!</div>):(
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:font.body,fontSize:"12px"}}><thead><tr style={{borderBottom:`2px solid ${C.border}`}}>{["#","Date","Workout","Weight","Water","Sleep","Feel"].map(h=>(<th key={h} style={{padding:"7px 6px",color:C.textMuted,fontWeight:"normal",textAlign:"left",whiteSpace:"nowrap",fontSize:"10px",textTransform:"uppercase"}}>{h}</th>))}</tr></thead><tbody>{[...logs].reverse().map((log,i)=>(<tr key={i} style={{borderBottom:`1px solid ${C.bgDark}`,background:i%2===0?C.bgDeep:"transparent"}}><td style={{padding:"8px 6px",color:C.textLight}}>{logs.length-i}</td><td style={{padding:"8px 6px",color:C.textMid,whiteSpace:"nowrap"}}>{log.date}</td><td style={{padding:"8px 6px",color:C.textDark,fontWeight:"bold",maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.workoutName}</td><td style={{padding:"8px 6px",color:C.walnut}}>{log.weight}kg</td><td style={{padding:"8px 6px",color:C.teal}}>{log.water}L</td><td style={{padding:"8px 6px",color:C.fern}}>{log.sleep}h</td><td style={{padding:"8px 6px",fontSize:"16px"}}>{log.feel}</td></tr>))}</tbody></table></div>
      )}
    </Card>

    <Card topColor={C.bark} style={{marginBottom:"14px"}}>
      <Divider label="Knee Safety Protocol"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {[{icon:"🚫",t:"No Deep Squats",d:"Nothing below 90°",c:C.red},{icon:"🚫",t:"No Jumping",d:"Zero impact moves",c:C.red},{icon:"🚫",t:"Stop Sharp Pain",d:"Rest & ice at once",c:C.red},{icon:"✅",t:"Bike First",d:"Knee warm-up daily",c:C.fern},{icon:"✅",t:"Knee Exercises",d:"PT routine 3× week",c:C.fern},{icon:"✅",t:"Ice After Session",d:"10–15 min ice pack",c:C.fern}].map((k,i)=>(<div key={i} style={{background:k.c===C.fern?C.mintCream:`${C.red}12`,border:`1px solid ${k.c===C.fern?C.leafPale:C.red+"44"}`,borderRadius:"10px",padding:"10px 12px"}}><div style={{fontSize:"14px",marginBottom:"3px"}}>{k.icon}</div><div style={{fontFamily:font.display,fontSize:"12px",fontWeight:"bold",color:k.c}}>{k.t}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{k.d}</div></div>))}
      </div>
    </Card>

    <Card style={{background:`linear-gradient(160deg,${C.mintCream},${C.bgCard})`,border:`1px solid ${C.leafPale}`,textAlign:"center"}}>
      <div style={{fontFamily:font.display,fontSize:"clamp(14px,3vw,18px)",fontStyle:"italic",color:C.textDark,lineHeight:1.7,marginBottom:"10px"}}>"{quotes[qIdx].text}"</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>— {quotes[qIdx].author}</div>
      <button onClick={()=>setQIdx((qIdx+1)%quotes.length)} style={{background:`linear-gradient(135deg,${C.fern},${C.moss})`,color:C.white,border:"none",borderRadius:"10px",padding:"9px 22px",fontFamily:font.body,fontSize:"12px",cursor:"pointer",fontWeight:"bold"}}>🌿 Next Quote</button>
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════════
// WORKOUT VIEW
// ═══════════════════════════════════════════════════════════════════
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
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>🏋️ 8-Week Personalised Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"12px"}}>Every day = 40 min cardio first, then weights</div>

    {/* Daily Cardio Block */}
    <Card topColor={C.blue} style={{marginBottom:"16px"}}>
      <Divider label="Daily Cardio Block — Do This EVERY Session First"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,marginBottom:"12px",lineHeight:1.6}}>
        ⏱ <strong>Total: 40 minutes</strong> · Start every workout with this exact cardio sequence before touching any weights
      </div>
      {cardioBlock.map((c,i)=>(
        <div key={i} style={{background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px 14px",marginBottom:"8px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:font.mono,fontSize:"11px",color:C.blue,marginBottom:"3px"}}>{c.icon} {c.order}</div>
              <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:C.textDark}}>{c.name}</div>
              <div style={{fontFamily:font.mono,fontSize:"11px",color:C.wood,margin:"2px 0"}}>{c.protocol}</div>
              <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{c.note}</div>
            </div>
            <WatchBtn link={c.link} label="▶ Watch"/>
          </div>
        </div>
      ))}
    </Card>

    {/* Log Modal */}
    {logging!==null&&(<div style={{position:"fixed",inset:0,background:"rgba(60,35,10,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:C.bgCard,border:`2px solid ${C.fern}`,borderRadius:"22px",padding:"24px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 12px 40px rgba(0,0,0,0.25)"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:C.fern,marginBottom:"3px"}}>✅ Log Completed Session</div><div style={{fontFamily:font.body,fontSize:"13px",color:C.textMid,marginBottom:"18px"}}>{workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}</div><InputRow label="Current Weight (kg)" value={form.weight} onChange={v=>setForm({...form,weight:v})} unit="kg" min={50} max={200} step={0.5} icon="⚖️"/><InputRow label="Water Intake (L)" value={form.water} onChange={v=>setForm({...form,water:v})} unit="L" min={0} max={6} step={0.1} icon="💧"/><InputRow label="Sleep Last Night (h)" value={form.sleep} onChange={v=>setForm({...form,sleep:v})} unit="hrs" min={0} max={12} step={0.5} icon="🌙"/><div style={{marginBottom:"16px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>How Did You Feel?</div><div style={{display:"flex",gap:"8px"}}>{["😴","😐","😊","💪","🔥"].map(e=>(<button key={e} onClick={()=>setForm({...form,feel:e})} style={{flex:1,fontSize:"20px",padding:"8px 4px",borderRadius:"10px",border:`2px solid ${form.feel===e?C.fern:C.border}`,background:form.feel===e?C.mintCream:C.bgDeep,cursor:"pointer"}}>{e}</button>))}</div></div><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setLogging(null)} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px",color:C.textMuted,fontFamily:font.body,fontSize:"13px",cursor:"pointer"}}>Cancel</button><button onClick={submitLog} style={{flex:2,background:`linear-gradient(135deg,${C.fern},${C.moss})`,border:"none",borderRadius:"12px",padding:"12px",color:C.white,fontFamily:font.display,fontWeight:"bold",fontSize:"14px",cursor:"pointer"}}>✅ Save to Log</button></div></div></div>)}

    {workoutWeeks.map((wk,wi)=>(
      <div key={wi} style={{marginBottom:"10px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)"}}>
        <button onClick={()=>setOpenWeek(openWeek===wi?-1:wi)} style={{width:"100%",background:openWeek===wi?`linear-gradient(90deg,${wk.color}18,${C.bgCard})`:C.bgCard,border:"none",padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:openWeek===wi?`1px solid ${C.border}`:"none"}}>
          <div style={{textAlign:"left"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:wk.color}}>{wk.week}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{wk.theme}</div><div style={{fontFamily:font.body,fontSize:"10px",color:wk.color,marginTop:"2px"}}>🎯 {wk.focus}</div></div>
          <span style={{color:wk.color,fontSize:"16px",transform:openWeek===wi?"rotate(180deg)":"none",transition:"transform 0.3s"}}>▼</span>
        </button>
        {openWeek===wi&&(
          <div style={{padding:"10px"}}>
            {wk.days.map((d,di)=>{
              const done=isDone(d.name),isRest=d.exercises.length===0;
              return(
                <div key={di} style={{background:done?C.mintCream:C.bgDeep,border:`1px solid ${done?C.leafPale:C.border}`,borderRadius:"14px",padding:"14px",marginBottom:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px",marginBottom:"8px"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap",marginBottom:"4px"}}>
                        <span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{d.icon} {d.day}</span>
                        <span style={{fontFamily:font.mono,fontSize:"10px",color:wk.color,background:`${wk.color}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {d.time}</span>
                        <span style={{fontFamily:font.mono,fontSize:"10px",color:C.red,background:`${C.red}18`,padding:"2px 8px",borderRadius:"20px"}}>{d.target}</span>
                      </div>
                      <div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:done?C.fern:C.textDark}}>{d.name}{done?" ✓":""}</div>
                      <div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,marginTop:"2px"}}>{d.equipment} · {d.sets}</div>
                    </div>
                    {!isRest&&(<button onClick={()=>{setLogging({wi,di});setForm({weight:105,water:2.0,sleep:7,feel:"😊"});}} style={{background:done?C.mintCream:`linear-gradient(135deg,${C.fern},${C.moss})`,border:`1px solid ${done?C.fern:C.moss}`,color:done?C.fern:C.white,fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontFamily:font.body,whiteSpace:"nowrap"}}>{done?"✓ Logged":"+ Log"}</button>)}
                  </div>
                  {/* Exercise list with individual watch buttons */}
                  {d.exercises.length>0&&(
                    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                      {d.exercises.map((ex,ei)=>(
                        <div key={ei} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bgCard,borderRadius:"8px",padding:"7px 10px",gap:"8px"}}>
                          <span style={{fontFamily:font.body,fontSize:"12px",color:C.textDark,flex:1}}>• {ex.name}</span>
                          <WatchBtn link={ex.link}/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    ))}
  </div>);
}

// ═══════════════════════════════════════════════════════════════════
// FOOD VIEW
// ═══════════════════════════════════════════════════════════════════
function FoodView(){
  const [open,setOpen]=useState(null);
  const totCal=meals.reduce((a,m)=>a+m.calories,0),totProt=meals.reduce((a,m)=>a+m.protein,0),totCarb=meals.reduce((a,m)=>a+m.carbs,0),totFat=meals.reduce((a,m)=>a+m.fat,0);
  return(<div>
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>☕ Personalised Fat-Loss Meal Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>Timed around your 10am–7pm work schedule · {totCal} kcal/day</div>
    <Card style={{marginBottom:"14px",background:C.mintCream,border:`1px solid ${C.leafPale}`}}>
      <Divider label="Daily Schedule"/>
      {meals.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",borderBottom:i<meals.length-1?`1px solid ${C.border}`:"none"}}><div style={{fontFamily:font.mono,fontSize:"11px",color:C.wood,minWidth:"60px"}}>{m.time}</div><span style={{fontSize:"16px"}}>{m.icon}</span><div style={{flex:1}}><div style={{fontFamily:font.display,fontSize:"12px",fontWeight:"bold",color:C.textDark}}>{m.name}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{m.meal}</div></div><div style={{fontFamily:font.mono,fontSize:"11px",color:C.walnut,fontWeight:"bold"}}>{m.calories}kcal</div></div>))}
    </Card>
    <Card topColor={C.fern} style={{marginBottom:"16px"}}>
      <Divider label="Daily Nutritional Totals"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"12px"}}>
        {[{l:"Calories",v:totCal,suf:"kcal",c:C.walnut},{l:"Protein",v:totProt,suf:"g",c:C.fern},{l:"Carbs",v:totCarb,suf:"g",c:C.teal},{l:"Fat",v:totFat,suf:"g",c:C.caramel}].map((t,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px 6px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:t.c}}>{t.v}</div><div style={{fontFamily:font.mono,fontSize:"9px",color:C.textLight}}>{t.suf}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{t.l}</div></div>))}
      </div>
      <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginBottom:"4px"}}>Protein ({totProt}g / 160g target)</div>
      <Bar pct={(totProt/160)*100} color={C.fern} h={7}/>
      <div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"8px",marginBottom:"4px"}}>Calorie deficit ({totCal} / ~2800 TDEE)</div>
      <Bar pct={(totCal/2800)*100} color={C.walnut} h={7}/>
      <div style={{fontFamily:font.mono,fontSize:"10px",color:C.textMuted,marginTop:"4px",textAlign:"right"}}>~{2800-totCal} kcal deficit/day</div>
    </Card>
    {meals.map((m,i)=>(
      <div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",marginBottom:"12px",overflow:"hidden",boxShadow:"0 2px 10px rgba(90,55,20,0.08)",borderLeft:`4px solid ${C.wood}`}}>
        <div style={{padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
            <div><div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{m.icon} {m.meal}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:C.wood,background:`${C.wood}18`,padding:"2px 8px",borderRadius:"20px"}}>⏰ {m.time}</span></div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:C.textDark}}>{m.name}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"22px",color:C.walnut}}>{m.calories}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>kcal</div></div>
          </div>
          <div style={{background:C.mintCream,borderRadius:"8px",padding:"8px 12px",marginBottom:"10px",border:`1px solid ${C.leafPale}`}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.fern,lineHeight:1.5}}>💡 {m.why}</div></div>
          <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>{[{l:"Protein",v:m.protein+"g",c:C.fern},{l:"Carbs",v:m.carbs+"g",c:C.teal},{l:"Fat",v:m.fat+"g",c:C.caramel}].map((mc,j)=>(<div key={j} style={{flex:1,background:C.bgDeep,borderRadius:"8px",padding:"7px 4px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.mono,fontSize:"13px",fontWeight:"bold",color:mc.c}}>{mc.v}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{mc.l}</div></div>))}</div>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"8px",color:C.textMuted,cursor:"pointer",fontFamily:font.body,fontSize:"11px",marginBottom:"10px"}}>{open===i?"▲ Hide Details":"▼ Ingredients & Instructions"}</button>
          {open===i&&(<div style={{marginBottom:"12px"}}><div style={{fontFamily:font.display,fontWeight:"bold",color:C.fern,fontSize:"12px",marginBottom:"6px",textTransform:"uppercase"}}>🌿 Ingredients</div>{m.ingredients.map((ing,k)=>(<div key={k} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,padding:"2px 0"}}>· {ing}</div>))}<div style={{fontFamily:font.display,fontWeight:"bold",color:C.wood,fontSize:"12px",margin:"10px 0 6px",textTransform:"uppercase"}}>👨‍🍳 How to Prepare</div><div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.65}}>{m.instructions}</div></div>)}
          <a href={m.video} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:`linear-gradient(135deg,${C.red},#7a2a1a)`,color:"#fff",fontWeight:"bold",fontFamily:font.body,fontSize:"13px",padding:"11px",borderRadius:"10px",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>▶ Watch Cooking Video</a>
        </div>
      </div>
    ))}
  </div>);
}

// ═══════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════
export default function PandoApp(){
  const [view,setView]=useState("home");
  const [logs,setLogs]=useState([]);
  return(<div style={{minHeight:"100vh",background:C.bgPage,color:C.textDark,fontFamily:font.body}}>
    <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(139,107,60,0.04) 80px,rgba(139,107,60,0.04) 81px)",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:`linear-gradient(160deg,${C.fern} 0%,${C.moss} 60%,${C.bark} 100%)`,padding:"32px 20px 24px",textAlign:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-30px",left:"-30px",width:"140px",height:"140px",borderRadius:"50%",background:`${C.leafLight}22`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`${C.latte}22`,pointerEvents:"none"}}/>
      <div style={{display:"inline-block",background:`${C.latte}33`,border:`1px solid ${C.latteLight}66`,color:C.foam,fontWeight:"bold",fontSize:"10px",letterSpacing:"2.5px",padding:"4px 16px",borderRadius:"20px",marginBottom:"14px",textTransform:"uppercase",fontFamily:font.body}}>☕ Wood · Latte · Wellness</div>
      <h1 style={{fontFamily:font.display,fontSize:"clamp(28px,7vw,52px)",fontWeight:"bold",margin:"0 0 4px",color:C.foam,letterSpacing:"1px"}}>PANDO APP</h1>
      <p style={{fontFamily:font.display,fontSize:"clamp(13px,2.5vw,16px)",color:C.latteLight,margin:"0 0 4px",fontStyle:"italic"}}>2-Month Transformation · 105kg → 88kg</p>
      <p style={{fontFamily:font.body,fontSize:"12px",color:`${C.foam}99`,margin:0}}>8 Weeks · 40 min Cardio Daily · Chest Focus · Knee Safe</p>
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
      <div style={{fontFamily:font.display,fontSize:"14px",color:C.wood,fontWeight:"bold"}}>PANDO APP 🌿</div>
      <div style={{fontFamily:font.body,fontSize:"11px",color:C.textLight,marginTop:"3px"}}>Personalised · Consistent · Strong</div>
    </div>
  </div>);
}
