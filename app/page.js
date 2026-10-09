"use client";
import { useState, useEffect } from "react";

const C={bg:"#0a0f1f",bgPage:"#060913",bgCard:"#101830",bgDeep:"#0b1226",bgDark:"#18234a",border:"#2a3a68",sage:"#3b82f6",fern:"#f5c542",moss:"#d99a0b",leafLight:"#60a5fa",leafPale:"#2c3d73",mintCream:"#14213f",walnut:"#f0bb36",wood:"#3b82f6",bark:"#1b2a55",caramel:"#fbbf24",mocha:"#fcd34d",espresso:"#0a0f1f",latte:"#8fa3d1",latteLight:"#c7d4f5",foam:"#ffffff",textDark:"#f4f7ff",textMid:"#c9d3ee",textMuted:"#93a4cc",textLight:"#7a8cb8",white:"#0a0f1f",red:"#ff6b6b",teal:"#2dd4bf",amber:"#fbbf24",blue:"#60a5fa",gold:"#f5c542"};
const font={display:"'Georgia','Times New Roman',serif",body:"'Palatino Linotype','Book Antiqua',Georgia,serif",mono:"'Courier New',monospace"};
const PERSONAL={startWeight:105,goalWeight:88,height:176};
const bmi=(w)=>(w/((PERSONAL.height/100)**2)).toFixed(1);
const bmiLabel=(b)=>b<18.5?"Underweight":b<25?"Healthy":b<30?"Overweight":"Obese";

/* ── PERSIST HOOK ─────────────────────────────────────────── */
function useStored(key,def){
  const[val,setVal]=useState(()=>{
    if(typeof window==="undefined")return def;
    try{const r=localStorage.getItem(key);return r!==null?JSON.parse(r):def;}
    catch{return def;}
  });
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(val));}catch{}},[key,val]);
  return[val,setVal];
}

function Ring({pct,color,size=78,label,value,unit}){const r=((size-10)/2),circ=2*Math.PI*r,dash=(Math.min(100,pct)/100)*circ;return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}><div style={{position:"relative",width:size,height:size}}><svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bgDark} strokeWidth={7}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:"stroke-dasharray 0.8s ease"}}/></svg><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:font.mono,fontSize:"11px",fontWeight:"bold",color}}>{Math.round(pct)}%</span></div></div><div style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontSize:"13px",color:C.textDark,fontWeight:"bold"}}>{value}{unit}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{label}</div></div></div>);}
function Bar({pct,color,h=8}){return(<div style={{background:C.bgDark,borderRadius:"20px",height:h,overflow:"hidden",border:`1px solid ${C.border}`}}><div style={{width:`${Math.min(100,Math.max(0,pct))}%`,height:"100%",background:color,borderRadius:"20px",transition:"width 0.8s ease"}}/></div>);}
function Card({children,style={},topColor}){return(<div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"20px",padding:"20px",boxShadow:"0 2px 16px rgba(0,0,0,0.45)",borderTop:topColor?`3px solid ${topColor}`:undefined,...style}}>{children}</div>);}
function Divider({label}){return(<div style={{display:"flex",alignItems:"center",gap:"10px",margin:"12px 0"}}><div style={{flex:1,height:"1px",background:C.border}}/><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase",letterSpacing:"1.5px"}}>{label}</span><div style={{flex:1,height:"1px",background:C.border}}/></div>);}
function StatBox({label,value,color,bg}){return(<div style={{background:bg||C.bgDeep,borderRadius:"12px",padding:"11px 8px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"15px",fontWeight:"bold",color:color||C.fern}}>{value}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted,marginTop:"2px"}}>{label}</div></div>);}
function NavBtn({label,icon,active,onClick}){return(<button onClick={onClick} style={{flex:1,background:active?`linear-gradient(160deg,${C.fern},${C.moss})`:C.bgDark,border:`1px solid ${active?C.fern:C.border}`,borderRadius:"14px",padding:"12px 6px",color:active?C.white:C.textMuted,fontFamily:font.display,fontWeight:active?"bold":"normal",fontSize:"clamp(11px,2vw,13px)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",transition:"all 0.25s ease",boxShadow:active?`0 3px 14px ${C.moss}44`:"none"}}><span style={{fontSize:"18px"}}>{icon}</span>{label}</button>);}
function InputRow({label,value,onChange,unit,min,max,step,icon}){return(<div style={{marginBottom:"12px"}}><label style={{display:"flex",gap:"5px",alignItems:"center",fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"4px"}}><span>{icon}</span>{label}</label><div style={{display:"flex",alignItems:"center",gap:"8px"}}><input type="number" value={value} min={min} max={max} step={step||1} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"9px 13px",color:C.textDark,fontSize:"16px",fontFamily:font.display,fontWeight:"bold",outline:"none",boxSizing:"border-box"}}/><span style={{fontFamily:font.body,fontSize:"12px",color:C.textLight,minWidth:"34px"}}>{unit}</span></div></div>);}

function WatchBtn({searchQuery,label="Watch Cooking Video"}){
  const url="https://www.youtube.com/results?search_query="+encodeURIComponent(searchQuery);
  return(<a href={url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:`linear-gradient(135deg,${C.red},#7a2a1a)`,color:"#fff",fontWeight:"bold",fontFamily:font.body,fontSize:"13px",padding:"11px",borderRadius:"10px",textDecoration:"none",width:"100%",boxSizing:"border-box"}}>▶ {label}</a>);
}
function WorkoutWatchBtn({searchQuery}){
  const url="https://www.youtube.com/results?search_query="+encodeURIComponent(searchQuery);
  return(<a href={url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"4px",background:C.red,color:"#fff",fontWeight:"bold",fontSize:"11px",padding:"5px 11px",borderRadius:"8px",textDecoration:"none",whiteSpace:"nowrap"}}>▶ Watch</a>);
}

const cardioBlock=[
  {order:"1st 10 min",icon:"🚴",name:"Stationary Bike",protocol:"Resistance 4-5, 80-90 RPM",note:"Warms knees gently. Start every session here.",search:"how to use stationary bike workout beginner"},
  {order:"2nd 10 min",icon:"🌀",name:"Elliptical Machine",protocol:"Level 5-6, push and pull handles",note:"Zero knee impact. Full body burn.",search:"how to use elliptical machine correctly beginner"},
  {order:"3rd 20 min",icon:"📈",name:"Incline Treadmill Walk",protocol:"4-8% incline, 5.5 km/h, no rails",note:"Primary fat burner. Belly and chest fat.",search:"incline treadmill walk fat loss workout tutorial"},
];

const workoutWeeks=[
  {week:"Week 1-2",theme:"Chest Ignition (40 min cardio + 35 min weights)",color:C.sage,focus:"Chest 3x a week, learn form, build the base",days:[
    {day:"Sun",time:"8:00pm",icon:"🦍",name:"Back + Biceps Base",target:"BACK + BICEPS",equipment:"Cable + Dumbbells",sets:"3 sets x 12 reps",exercises:[{name:"Cable Lat Pulldown",s:"cable lat pulldown proper form tutorial"},{name:"Cable Seated Row",s:"cable seated row proper form tutorial"},{name:"One-Arm DB Row 12kg",s:"one arm dumbbell row proper form tutorial"},{name:"Cable Face Pull",s:"cable face pull tutorial rear delts posture"},{name:"DB Bicep Curl 10kg",s:"dumbbell bicep curl proper form tutorial"}]},
    {day:"Mon",time:"8:00pm",icon:"💥",name:"Chest Heavy A - Ignition",target:"CHEST HEAVY",equipment:"Bench + Dumbbells + Cable",sets:"4 sets x 10-12 reps",exercises:[{name:"Warm-up Push-ups 2 x 10 (easy)",s:"push up proper form warm up chest"},{name:"Flat DB Press 12kg",s:"dumbbell bench press proper form tutorial"},{name:"Incline DB Press 10kg upper chest",s:"incline dumbbell press upper chest tutorial"},{name:"Cable High-to-Low Fly lower chest 3 x 15",s:"cable high to low fly lower chest tutorial"},{name:"Finisher Push-ups to near failure x 2",s:"push up to failure chest finisher"}]},
    {day:"Tue",time:"OFF",icon:"🛌",name:"Rest Day Tuesday",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Wed",time:"OFF",icon:"🧘",name:"Rest Day Wednesday",target:"REST",equipment:"Home",sets:"Full rest and recovery",exercises:[]},
    {day:"Thu",time:"8:00pm",icon:"🔥",name:"Chest Volume B - Burn",target:"CHEST VOLUME",equipment:"Bench + Cable + Dumbbells",sets:"4 sets x 12 reps",exercises:[{name:"Incline DB Press 10kg",s:"incline dumbbell press upper chest tutorial"},{name:"DB Chest Fly 8kg full stretch",s:"dumbbell chest fly proper form tutorial"},{name:"Cable Chest Press (functional trainer)",s:"cable chest press functional trainer tutorial"},{name:"Cable Low-to-High Fly upper chest 3 x 15",s:"cable low to high chest fly tutorial"},{name:"Cable Tricep Pushdown 3 x 12",s:"cable tricep pushdown tutorial proper form"}]},
    {day:"Fri",time:"8:00pm",icon:"🎯",name:"Shoulders + Arms + Core",target:"SHOULDERS + ARMS",equipment:"Dumbbells + Cable + Mat",sets:"3 sets x 12 reps",exercises:[{name:"DB Lateral Raise 6kg",s:"dumbbell lateral raise proper form tutorial"},{name:"DB Shoulder Press 8kg seated",s:"seated dumbbell shoulder press tutorial"},{name:"Cable Rear Delt Fly",s:"cable rear delt fly tutorial form"},{name:"Lying Leg Raise lower belly",s:"lying leg raise lower abs tutorial form"},{name:"Plank hold 30s",s:"plank exercise proper form tutorial"}]},
    {day:"Sat",time:"8:00pm",icon:"💪",name:"Chest Pump C - Squeeze",target:"CHEST PUMP",equipment:"Bench + Cable",sets:"3 sets x 15 reps",exercises:[{name:"Cable Chest Fly mid squeeze 3 x 15",s:"cable chest fly middle chest tutorial"},{name:"Hands-elevated Push-up on bench lower chest",s:"incline push up lower chest bench tutorial"},{name:"Bench Dips 3 x 12",s:"bench dips triceps chest tutorial form"},{name:"Finisher Push-ups to failure x 2",s:"push up to failure chest finisher"}]},
  ]},
  {week:"Week 3-4",theme:"Chest Attack (40 min cardio + 40 min weights)",color:C.wood,focus:"More weight, more sets, supersets and drop sets",days:[
    {day:"Sun",time:"8:00pm",icon:"🦍",name:"Back + Biceps Builder",target:"BACK + BICEPS",equipment:"Cable + Dumbbells",sets:"4 sets x 10 reps",exercises:[{name:"Cable Lat Pulldown wide grip",s:"cable lat pulldown wide grip tutorial"},{name:"Cable Seated Row",s:"cable seated row proper form tutorial"},{name:"One-Arm DB Row 14kg",s:"one arm dumbbell row tutorial form"},{name:"Cable Face Pull",s:"cable face pull tutorial proper form"},{name:"DB Hammer Curl 12kg",s:"dumbbell hammer curl tutorial proper form"}]},
    {day:"Mon",time:"8:00pm",icon:"💥",name:"Chest Heavy A - Attack",target:"CHEST HEAVY",equipment:"Bench + Dumbbells + Cable",sets:"4 sets x 8-10 reps",exercises:[{name:"Warm-up Push-ups 2 x 12",s:"push up proper form warm up chest"},{name:"Flat DB Press 14kg",s:"dumbbell bench press proper form tutorial"},{name:"Incline DB Press 12kg upper chest",s:"incline dumbbell press upper chest tutorial"},{name:"Cable High-to-Low Fly lower chest 4 x 12",s:"cable high to low fly lower chest tutorial"},{name:"Drop set Push-ups to failure x 2",s:"push up to failure chest finisher"}]},
    {day:"Tue",time:"OFF",icon:"🛌",name:"Rest Day Tuesday 2",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Wed",time:"OFF",icon:"🧘",name:"Rest Day Wednesday 2",target:"REST",equipment:"Home",sets:"Full rest and recovery",exercises:[]},
    {day:"Thu",time:"8:00pm",icon:"🔥",name:"Chest Volume B - Superset",target:"CHEST SUPERSET",equipment:"Bench + Cable + Dumbbells",sets:"4 rounds x 12 reps",exercises:[{name:"SUPERSET Incline DB Press 12kg + Cable Low-to-High Fly",s:"chest superset incline press cable fly tutorial"},{name:"SUPERSET Flat DB Fly 10kg + Push-ups",s:"chest superset dumbbell fly push up workout"},{name:"Cable Chest Press heavy 3 x 10",s:"cable chest press functional trainer tutorial"},{name:"Overhead Cable Tricep Extension 3 x 12",s:"overhead cable triceps extension tutorial"}]},
    {day:"Fri",time:"8:00pm",icon:"🎯",name:"Shoulders + Arms + Core Builder",target:"SHOULDERS + ARMS",equipment:"Dumbbells + Cable + Mat",sets:"4 sets x 10 reps",exercises:[{name:"DB Lateral Raise 8kg",s:"dumbbell lateral raise shoulder tutorial"},{name:"DB Shoulder Press 10kg seated",s:"seated dumbbell shoulder press tutorial"},{name:"Cable Rear Delt Fly",s:"cable rear delt fly tutorial form"},{name:"Cable Woodchop high-to-low",s:"cable woodchop high to low obliques tutorial"},{name:"Plank and Side Plank",s:"plank side plank tutorial core exercise"}]},
    {day:"Sat",time:"8:00pm",icon:"💪",name:"Chest Pump C - Burnout",target:"CHEST PUMP",equipment:"Bench + Cable",sets:"4 sets x 15 reps",exercises:[{name:"Cable Chest Fly mid 4 x 15 slow squeeze",s:"cable chest fly middle chest tutorial"},{name:"Hands-elevated Push-up lower chest 3 x failure",s:"incline push up lower chest bench tutorial"},{name:"Bench Dips 3 x 15",s:"bench dips triceps chest tutorial form"},{name:"Burnout Cable Fly 1 x 25",s:"cable fly burnout chest pump"}]},
  ]},
  {week:"Week 5-6",theme:"Chest Overload (40 min cardio + 45 min weights)",color:C.caramel,focus:"Peak volume, tempo reps and drop sets",days:[
    {day:"Sun",time:"8:00pm",icon:"🦍",name:"Back Thickness + Biceps",target:"BACK + BICEPS",equipment:"Cable + Dumbbells",sets:"4 sets x 8-10 reps",exercises:[{name:"Cable Lat Pulldown heavy",s:"cable lat pulldown heavy tutorial"},{name:"One-Arm DB Row 16kg",s:"dumbbell row heavy back exercise tutorial"},{name:"Cable Seated Row",s:"cable seated row proper form tutorial"},{name:"Cable Face Pull",s:"cable face pull rear delt tutorial"},{name:"DB Hammer Curl 14kg",s:"hammer curl tutorial biceps form"}]},
    {day:"Mon",time:"8:00pm",icon:"💥",name:"Chest Heavy A - Overload",target:"CHEST MAX",equipment:"Bench + Dumbbells + Cable",sets:"5 sets x 8 reps",exercises:[{name:"Warm-up Push-ups 2 x 15",s:"push up proper form warm up chest"},{name:"Flat DB Press 16kg slow 3 sec lowering",s:"dumbbell bench press heavy tutorial"},{name:"Incline DB Press 14kg",s:"incline dumbbell press upper chest tutorial"},{name:"Cable High-to-Low Fly lower chest 4 x 12 drop set",s:"cable high to low fly lower chest tutorial"},{name:"Push-up Burnout to failure x 3",s:"push up to failure chest finisher"}]},
    {day:"Tue",time:"OFF",icon:"🛌",name:"Rest Day Tuesday 3",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Wed",time:"OFF",icon:"🧘",name:"Rest Day Wednesday 3",target:"REST",equipment:"Home",sets:"Full rest and recovery",exercises:[]},
    {day:"Thu",time:"8:00pm",icon:"🔥",name:"Chest Volume B - Overload",target:"CHEST SUPERSET",equipment:"Bench + Cable + Dumbbells",sets:"5 rounds x 10-12 reps",exercises:[{name:"SUPERSET Incline DB Press 14kg + Cable Low-to-High Fly",s:"chest superset incline press cable fly tutorial"},{name:"SUPERSET Flat DB Fly 12kg + Push-ups",s:"chest superset dumbbell fly push up workout"},{name:"Cable Chest Press 4 x 10",s:"cable chest press functional trainer tutorial"},{name:"Cable Tricep Pushdown heavy 4 x 10",s:"cable tricep pushdown heavy tutorial"}]},
    {day:"Fri",time:"8:00pm",icon:"🎯",name:"Shoulder Arm Superset + Core",target:"SHOULDERS + ARMS",equipment:"Dumbbells + Cable + Mat",sets:"4 rounds x 10 reps",exercises:[{name:"SUPERSET DB Shoulder Press 12kg + Lateral Raise",s:"shoulder press lateral raise superset tutorial"},{name:"SUPERSET DB Bicep Curl 12kg + Cable Tricep Pushdown",s:"biceps triceps superset workout cable"},{name:"Cable Rear Delt Fly",s:"cable rear delt fly tutorial form"},{name:"Cable Woodchop 12 each side",s:"cable woodchop obliques love handles exercise"}]},
    {day:"Sat",time:"8:00pm",icon:"💪",name:"Chest Pump C - Overload",target:"CHEST PUMP",equipment:"Bench + Cable",sets:"4 sets x 15-20 reps",exercises:[{name:"Cable Chest Fly mid 4 x 20 squeeze",s:"cable chest fly middle chest tutorial"},{name:"Hands-elevated Push-up lower chest 4 x failure",s:"incline push up lower chest bench tutorial"},{name:"Bench Dips 4 x 15",s:"bench dips triceps chest tutorial form"},{name:"Burnout Cable Fly 2 x 25",s:"cable fly burnout chest pump"}]},
  ]},
  {week:"Week 7-8",theme:"Chest Final Push (40 min cardio + 45 min weights)",color:C.fern,focus:"Heaviest weights, cement the chest, test and measure",days:[
    {day:"Sun",time:"8:00pm",icon:"🦍",name:"Victory Back + Biceps",target:"WIDE BACK",equipment:"Cable + Dumbbells",sets:"4 sets x 8-10 reps",exercises:[{name:"Cable Lat Pulldown heavy",s:"cable lat pulldown tutorial"},{name:"One-Arm DB Row 18kg",s:"dumbbell row back tutorial"},{name:"Cable Seated Row",s:"cable seated row tutorial"},{name:"Cable Face Pull",s:"cable face pull rear delt tutorial"},{name:"DB Hammer Curl 14kg",s:"hammer curl biceps tutorial"}]},
    {day:"Mon",time:"8:00pm",icon:"🏆",name:"Chest Final Boss A",target:"CHEST HEAVY",equipment:"Bench + Dumbbells + Cable",sets:"5 sets x 6-8 reps HEAVY",exercises:[{name:"Warm-up Push-ups 2 x 15",s:"push up proper form warm up chest"},{name:"Flat DB Press 18kg",s:"dumbbell bench press heavy form tutorial"},{name:"Incline DB Press 16kg",s:"incline dumbbell press upper chest heavy"},{name:"Cable High-to-Low Fly lower chest heavy 4 x 12",s:"cable high to low fly lower chest tutorial"},{name:"Push-up Burnout to failure x 3",s:"push up to failure chest finisher"}]},
    {day:"Tue",time:"OFF",icon:"🛌",name:"Rest Day Tuesday 4",target:"REST",equipment:"Home",sets:"Full rest",exercises:[]},
    {day:"Wed",time:"OFF",icon:"🧘",name:"Rest Day Wednesday 4",target:"REST",equipment:"Home",sets:"Full rest and recovery",exercises:[]},
    {day:"Thu",time:"8:00pm",icon:"🔥",name:"Chest Volume B - Final",target:"CHEST SUPERSET",equipment:"Bench + Cable + Dumbbells",sets:"5 rounds x 10 reps",exercises:[{name:"SUPERSET Incline DB Press 16kg + Cable Low-to-High Fly",s:"chest superset incline press cable fly tutorial"},{name:"SUPERSET Flat DB Fly 12kg + Push-ups",s:"chest superset dumbbell fly push up workout"},{name:"Cable Chest Press heavy 4 x 10",s:"cable chest press functional trainer tutorial"},{name:"Overhead Cable Tricep Extension 4 x 12",s:"overhead cable triceps extension tutorial"}]},
    {day:"Fri",time:"8:00pm",icon:"🎯",name:"Shoulder Arm Peak + Core",target:"SHOULDERS + ARMS",equipment:"Dumbbells + Cable + Mat",sets:"4 sets x 8-10 reps",exercises:[{name:"DB Shoulder Press 14kg",s:"dumbbell shoulder press heavy tutorial"},{name:"DB Lateral Raise 10kg",s:"dumbbell lateral raise shoulder tutorial"},{name:"DB Bicep Curl 14kg",s:"dumbbell bicep curl proper form tutorial"},{name:"Plank 60 seconds",s:"plank exercise core endurance tutorial"},{name:"Cable Woodchop 15 each side",s:"cable woodchop obliques tutorial"}]},
    {day:"Sat",time:"8:00pm",icon:"💪",name:"Chest Pump C - Final",target:"CHEST PUMP",equipment:"Bench + Cable",sets:"4 sets x 15-20 reps",exercises:[{name:"Cable Chest Fly mid 4 x 20 squeeze",s:"cable chest fly middle chest tutorial"},{name:"Hands-elevated Push-up lower chest 4 x failure",s:"incline push up lower chest bench tutorial"},{name:"Bench Dips 4 x 15",s:"bench dips triceps chest tutorial form"},{name:"Burnout Cable Fly 2 x 30",s:"cable fly burnout chest pump"}]},
  ]},
];

const meals=[
  {meal:"Breakfast",icon:"🍳",time:"10:00 AM",tag:"At work Sun-Thu",name:"Protein Oats + Scrambled Eggs",calories:480,protein:33,carbs:38,fat:18,brand:"Jif No Added Sugar PB · Stevia · Cooking Spray",shopNote:"Your items: Oats, Eggs 30pk, Jif No Added Sugar PB, Stevia — LuLu Warsan",why:"3 eggs + oats = 33g protein. Keeps you full 10am to 12:30pm. Jif has 0g added sugar. Stevia = zero calories. Cooking spray = zero oil calories.",prepTip:"Night before: measure 40g oats into pot, crack 3 eggs into bowl. Morning = 8 min cook, zero thinking.",ingredients:["3 whole eggs (scrambled — cooking spray, 0 cal)","40g rolled oats","100ml low-fat milk","2 tsp Jif No Added Sugar peanut butter","20g banana (about 3 small slices)","1g Stevia — half packet or 3 drops liquid","Pinch of cinnamon and salt"],instructions:"Cook 40g oats in 100ml milk on medium heat 4-5 min stirring. Spray pan with cooking spray, scramble 3 eggs with pinch of salt 3 min on medium. Stir stevia into warm oats. Top with banana slices and Jif peanut butter. Eat together.",search:"protein oatmeal scrambled eggs high protein breakfast recipe cook"},
  {meal:"Snack",icon:"🍎",time:"12:30 PM",tag:"At work desk - one snack per day",name:"Hayatna Low Fat Yogurt + Apple",calories:87,protein:5,carbs:14,fat:2,brand:"Hayatna Low Fat Yogurt — 67 kcal per 100g",shopNote:"Your item: Hayatna Low Fat Yogurt — LuLu Warsan",why:"Light bridge between breakfast and lunch. Hayatna low fat is only 67 kcal per 100g — very efficient for the protein it delivers. Keeps you steady until 2pm lunch.",prepTip:"Pack 1 Hayatna pot and 1 apple in your bag every morning. Zero prep. Eat at desk.",ingredients:["100g Hayatna Low Fat Yogurt","1 small apple or 5-6 strawberries","Stevia to taste (0 kcal)"],instructions:"Open Hayatna yogurt. Slice apple directly into pot or bowl. Add stevia if you like sweetness. Eat at desk at 12:30pm. Takes 1 minute. Can prep in lidded jar the night before.",search:"low fat yogurt apple fruit snack healthy weight loss recipe"},
  {meal:"Lunch",icon:"🍗",time:"2:00 PM",tag:"At work - prep night before - no microwave needed",name:"Grilled Chicken + Brown Rice + Labneh + Salad",calories:520,protein:55,carbs:40,fat:10,brand:"Baladé Farms Low Fat Labneh (97 kcal / 10g protein per 100g) · Vita Health 45% Less Salt Soy",shopNote:"Your items: Chicken breast, Balade Labneh, Vita soy sauce, Brown basmati rice — LuLu Warsan",why:"55g protein — biggest meal of the day. Fuels afternoon work and your 8pm workout. Balade labneh adds 6g extra protein at only 60 kcal per 2 tbsp. No olive oil — cooking spray used in batch prep.",prepTip:"Saturday batch: grill all chicken with cooking spray + Vita soy. Each night pack 200g chicken + 80g rice + 2 tbsp Balade labneh + salad into container. 5 min prep. Eat cold — no microwave.",ingredients:["200g grilled chicken breast — sliced (from Saturday batch)","80g cooked brown basmati rice (from Saturday batch)","2 tbsp Baladé Farms Low Fat Labneh","Half cucumber sliced","8 cherry tomatoes","Handful baby spinach","1 tsp Vita Health 45% Less Salt Soy Sauce","Squeeze of lemon"],instructions:"Saturday batch: spray pan with cooking spray. Grill all chicken with garlic, cumin, Vita soy, salt — stores 4 days. Cook brown basmati rice — stores 5 days. Each night: slice 200g chicken into container, add 80g rice, 2 tbsp Balade labneh, cucumber, tomatoes, spinach, lemon. Seal. Refrigerate. Eat cold at work.",search:"grilled chicken brown rice meal prep lunch high protein batch cooking"},
  {meal:"Pre-Workout Snack",icon:"🍌",time:"7:20 PM",tag:"Home - 40 min before gym - LIGHT ONLY",name:"Banana + 1 Boiled Egg + Hayatna Yogurt",calories:196,protein:10,carbs:28,fat:5,brand:"Hayatna Low Fat Yogurt — 67 kcal per 100g",shopNote:"Your items: Bananas, Eggs, Hayatna Low Fat Yogurt — LuLu Warsan",why:"Light fuel — 40 min before gym. Banana = fast carbs for energy. Egg + Hayatna = protein to protect muscle. NOT a full meal. Eating more will cause nausea during cardio.",prepTip:"Boil all eggs Sunday night. Peel and store in fridge. At 7:20pm grab banana + 1 egg + 50g Hayatna. Done in 30 seconds.",ingredients:["1 ripe banana","1 hard-boiled egg (from Sunday batch)","50g Hayatna Low Fat Yogurt"],instructions:"Grab banana, 1 pre-boiled egg and 50g Hayatna from fridge. Eat at 7:20pm exactly — 40 minutes before 8pm gym. Do NOT eat anything else before training. This is fuel, not a meal.",search:"pre workout snack banana egg yogurt before evening gym light"},
  {meal:"Dinner",icon:"🌙",time:"9:45 PM",tag:"Home - after gym - most important meal",name:"Grilled Chicken + Brown Basmati Rice + Broccoli",calories:498,protein:53,carbs:40,fat:8,brand:"Vita Health 45% Less Salt Soy Sauce · Cooking Spray (0 cal)",shopNote:"Your items: Chicken breast, Brown basmati rice, Broccoli, Vita soy sauce, Cooking spray — LuLu Warsan",why:"Eat within 30 min of finishing workout. Chicken repairs muscle fibres. Rice refuels glycogen stores. Broccoli has sulforaphane which reduces fat storage. Cooking spray = 0 extra calories. Vita soy is 45% less salt — better for blood pressure.",prepTip:"Saturday batch: cook 400g brown basmati rice — stores 5 days. Each night: reheat rice 90 sec + cook chicken 12 min + steam broccoli 5 min = 15 minutes total.",ingredients:["200g chicken breast (sliced thin)","80g cooked brown basmati rice (from Saturday batch)","150g broccoli florets","1 garlic clove minced","Cooking spray (0 calories)","1 tbsp Vita Health 45% Less Salt Soy Sauce","Lemon squeeze, salt, pepper, paprika"],instructions:"Spray pan with cooking spray. Season chicken with garlic, paprika, salt, pepper. Cook medium-high 5-6 min each side until golden. Steam broccoli with lid on 5 min. Drizzle Vita soy sauce over chicken and broccoli. Reheat rice 90 sec in microwave. Serve and eat immediately after gym.",search:"grilled chicken breast brown rice broccoli healthy dinner recipe easy"},
  {meal:"Dinner Swap",icon:"🍝",time:"9:45 PM",tag:"Home - after gym - Mon and Thu dinner instead of chicken rice",name:"Creamy Chicken Macaroni",calories:530,protein:50,carbs:58,fat:12,brand:"Almarai Cooking Cream Lite 12% · Kuwait Flour Mills Wholewheat Pasta",shopNote:"Your items: Wholewheat pasta, Chicken breast, Almarai Cooking Cream Lite 12%, Mushrooms, Garlic, Cooking spray — LuLu Warsan",why:"Same calories as your normal dinner but a creamy comfort meal, so the plan stays easy to follow. Wholewheat macaroni gives slow carbs to refuel after training, chicken brings 35g protein, and Almarai Lite cream (12% fat) makes the sauce without heavy cream calories.",prepTip:"Weigh the pasta dry (80g) and the chicken raw (150g). Cook the sauce while the pasta boils. 20 minutes total, one pan plus one pot.",ingredients:["80g dry wholewheat macaroni (weigh dry)","150g raw chicken breast cut in small cubes","50ml Almarai Cooking Cream Lite 12%","80g sliced mushrooms","2 garlic cloves minced","Cooking spray (0 calories)","Salt, black pepper, paprika, dried oregano","Squeeze of lemon and a pinch of parsley"],instructions:"Boil the macaroni in salted water 9-10 minutes until just tender, keep 3 tbsp of the pasta water, then drain. Spray a pan with cooking spray, cook the chicken cubes with paprika, salt and pepper on medium-high 6-7 minutes until golden. Add the garlic and mushrooms and cook 3 minutes. Lower the heat, pour in the Almarai cooking cream with the pasta water and simmer 2 minutes. Toss in the macaroni, add oregano and lemon, stir 1 minute and serve right after the gym.",search:"creamy chicken macaroni pasta light cooking cream healthy high protein recipe"},
  {meal:"Friday Breakfast",icon:"🌅",time:"9:00 AM",tag:"Friday OFF - cook fresh - take your time",name:"Egg Omelette + LuLu Wholemeal Toast",calories:406,protein:26,carbs:40,fat:14,brand:"LuLu Wholemeal Sliced Bread (wholemeal listed as first ingredient)",shopNote:"Your items: Eggs, LuLu Wholemeal Bread, Tomatoes, Spinach, Cooking spray — LuLu Warsan",why:"Rest day — cook properly and enjoy it. LuLu Wholemeal bread has wholemeal as first ingredient = higher fibre, slower digestion, better blood sugar vs white bread. Good nutrition supports Friday recovery.",prepTip:"Friday morning: good time to check what you need before Saturday big shop at LuLu.",ingredients:["3 eggs","Handful baby spinach","2 tomatoes sliced","Half onion diced","Cooking spray (0 calories)","2 slices LuLu Wholemeal Sliced Bread (toasted)","Salt, pepper, cumin"],instructions:"Spray pan with cooking spray. Beat eggs with salt and pepper. Saute onion 2 min. Add spinach and tomato 1 min. Pour eggs over, cook 3-4 min on medium. Fold omelette. Toast LuLu wholemeal bread. Serve together. Eat slowly — it is your day off.",search:"egg vegetable omelette wholemeal toast healthy breakfast recipe easy"},
  {meal:"Saturday Batch Cook",icon:"🛒",time:"10:00 AM",tag:"Saturday OFF - weekly shop plus 1 hour batch cook",name:"Weekly Prep: Chicken + Brown Rice + Eggs",calories:0,protein:0,carbs:0,fat:0,brand:"All your purchased LuLu items used this session",shopNote:"LuLu Souk Warsan — 5 min from Akasya South — open 8am to midnight — about AED 120 per week",why:"One hour Saturday saves 15 minutes every work day. Guarantees you eat correctly all week without thinking or deciding.",prepTip:"Weekly buy list: Chicken breast 1kg · Eggs 30pk · Brown basmati rice 2kg · Oats · Hayatna yogurt x6 · LuLu Wholemeal bread · Balade labneh · Bananas · Apples · Broccoli · Cucumber · Tomatoes · Spinach · Vita soy sauce · Cooking spray · Jif PB.",ingredients:["600g chicken breast — grill all (lunches and dinners)","400g brown basmati rice — cook full batch","10 eggs — boil all (for pre-workout snacks)","Pack 4 lunch containers for Mon-Thu"],instructions:"1. Spray pan with cooking spray. Grill all 600g chicken with garlic, cumin, Vita soy, salt — stores 4 days in fridge. 2. Cook 400g brown basmati rice — stores 5 days in fridge. 3. Boil 10 eggs — peel, stores 5 days. 4. Pack 4 lunch containers: 200g chicken + 80g rice + 2 tbsp Balade labneh + salad veg. Everything done in 60 minutes. Your whole week is ready.",search:"weekly chicken rice egg meal prep batch cooking beginners how to"},
];

const quotes=[
  {text:"The pain you feel today will be the strength you feel tomorrow.",author:"Arnold Schwarzenegger"},
  {text:"It does not matter how slowly you go as long as you do not stop.",author:"Confucius"},
  {text:"Discipline is choosing between what you want now and what you want most.",author:"Abraham Lincoln"},
  {text:"Take care of your body. It is the only place you have to live.",author:"Jim Rohn"},
  {text:"Small daily improvements lead to stunning long-term results.",author:"Robin Sharma"},
];

const schedule=[
  {t:"9:00am",e:"🚗",d:"Leave Akasya South",h:false},
  {t:"9:30am",e:"🚇",d:"Metro to Al Ras Station",h:false},
  {t:"10:00am",e:"🍳",d:"Check in + Breakfast",h:true},
  {t:"12:30pm",e:"🍎",d:"Snack - yogurt and fruit",h:false},
  {t:"2:00pm",e:"🍗",d:"Lunch - chicken rice cakes salad",h:true},
  {t:"6:00pm",e:"🚇",d:"Check out - metro home",h:false},
  {t:"7:15pm",e:"🏠",d:"Arrive home Akasya South",h:false},
  {t:"7:20pm",e:"🍌",d:"Pre-workout snack - banana and 2 eggs only",h:true},
  {t:"7:50pm",e:"🚗",d:"Drive to gym",h:false},
  {t:"8:00pm",e:"🏋️",d:"WORKOUT - 40 min cardio then weights",h:true},
  {t:"9:30pm",e:"🚗",d:"Drive home from gym",h:false},
  {t:"9:45pm",e:"🌙",d:"DINNER - salmon + rice + broccoli",h:true},
  {t:"11:00pm",e:"😴",d:"Sleep - 7 hours recovery",h:false},
];

function HomeView({logs,onDeleteLog,onClearLogs}){
  const[qIdx,setQIdx]=useStored("pando_qidx",0);
  const sW=PERSONAL.startWeight,gW=PERSONAL.goalWeight,range=sW-gW;
  const latest=logs.length>0?logs[logs.length-1].weight:sW;
  const lost=Math.max(0,sW-latest);
  const wPct=Math.min(100,(lost/range)*100);
  const done=logs.length;
  const planned=workoutWeeks.reduce((a,w)=>a+w.days.filter(d=>d.time==="8:00pm").length,0);
  const woPct=Math.min(100,(done/planned)*100);
  const avgW=logs.length>0?(logs.reduce((a,l)=>a+(l.water||0),0)/logs.length).toFixed(1):"0";
  const avgS=logs.length>0?(logs.reduce((a,l)=>a+(l.sleep||0),0)/logs.length).toFixed(1):"0";
  const curBMI=bmi(latest);
  const wMeals=meals.filter(m=>m.calories>0&&!m.meal.includes("Friday")&&!m.meal.includes("Saturday")&&!m.meal.includes("Swap"));
  const totCal=wMeals.reduce((a,m)=>a+m.calories,0);
  const totProt=wMeals.reduce((a,m)=>a+m.protein,0);

  return(<div>
    <Card topColor={C.blue} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.blue}11,${C.bgCard})`}}>
      <Divider label="Daily Cardio - Every Session First (40 min)"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,marginBottom:"10px"}}>Bike 10 min then Elliptical 10 min then Incline Walk 20 min - always before weights</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
        {cardioBlock.map((c,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"12px",padding:"10px 8px",border:`1px solid ${C.border}`,textAlign:"center"}}><div style={{fontSize:"18px",marginBottom:"3px"}}>{c.icon}</div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"11px",color:C.textDark}}>{c.name}</div><div style={{fontFamily:font.mono,fontSize:"10px",color:C.blue,margin:"2px 0"}}>{c.order}</div><WorkoutWatchBtn searchQuery={c.search}/></div>))}
      </div>
    </Card>

    <Card topColor={C.gold} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.gold}11,${C.bgCard})`}}>
      <Divider label="Your Full Daily Schedule - Sun to Thu"/>
      {schedule.map((s,i)=>(<div key={i} style={{display:"flex",gap:"10px",alignItems:"center",padding:"6px 8px",borderRadius:"8px",background:s.h?`${C.fern}11`:"transparent",marginBottom:"2px"}}><div style={{fontFamily:font.mono,fontSize:"11px",color:s.h?C.fern:C.gold,minWidth:"58px",fontWeight:s.h?"bold":"normal"}}>{s.t}</div><div style={{fontSize:"15px"}}>{s.e}</div><div style={{fontFamily:font.body,fontSize:"12px",color:s.h?C.fern:C.textMid,fontWeight:s.h?"bold":"normal"}}>{s.d}</div></div>))}
      <div style={{background:`${C.amber}18`,border:`1px solid ${C.amber}55`,borderRadius:"8px",padding:"8px 12px",marginTop:"8px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.mocha}}>Pre-workout at 7:20pm is banana and 2 eggs ONLY. Full dinner comes AFTER gym at 9:45pm.</div></div>
    </Card>

    <Card topColor={C.wood} style={{marginBottom:"14px"}}>
      <Divider label="Daily Meal Plan"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {[{icon:"🍳",label:"Breakfast",time:"10:00am",cal:"480 kcal",color:C.caramel},{icon:"🍎",label:"Snack",time:"12:30pm",cal:"200 kcal",color:C.sage},{icon:"🍗",label:"Lunch",time:"2:00pm",cal:"520 kcal",color:C.wood},{icon:"🍌",label:"Pre-Workout",time:"7:20pm",cal:"210 kcal",color:C.amber},{icon:"🌙",label:"Dinner",time:"9:45pm",cal:"500 kcal",color:C.teal}].map((m,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"12px",padding:"10px",border:`1px solid ${C.border}`,display:"flex",gap:"10px",alignItems:"center"}}><div style={{fontSize:"20px"}}>{m.icon}</div><div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{m.label}</div><div style={{fontFamily:font.mono,fontSize:"10px",color:m.color}}>{m.time}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{m.cal}</div></div></div>))}
      </div>
      <div style={{marginTop:"12px",background:`${C.fern}11`,borderRadius:"10px",padding:"10px 14px",border:`1px solid ${C.leafPale}`}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          {[{l:"Total",v:totCal+" kcal",c:C.walnut},{l:"Protein",v:totProt+"g",c:C.fern},{l:"Deficit",v:"~"+(2800-totCal)+" kcal",c:C.caramel}].map((s,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:s.c}}>{s.v}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div></div>))}
        </div>
      </div>
    </Card>

    <Card topColor={C.fern} style={{marginBottom:"14px"}}>
      <Divider label="Your Profile"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        <StatBox label="Start Weight" value={sW+"kg"} color={C.walnut}/>
        <StatBox label="Goal Weight" value={gW+"kg"} color={C.fern}/>
        <StatBox label="Current" value={latest+"kg"} color={lost>0?C.fern:C.textDark}/>
        <StatBox label="Height" value={PERSONAL.height+"cm"} color={C.wood}/>
        <StatBox label="BMI" value={curBMI} color={parseFloat(curBMI)<25?C.fern:C.amber}/>
        <StatBox label="Status" value={bmiLabel(parseFloat(curBMI))} color={parseFloat(curBMI)<25?C.fern:C.amber}/>
      </div>
      <div style={{marginTop:"8px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
        <StatBox label="Lost" value={lost.toFixed(1)+"kg"} color={C.fern} bg={C.mintCream}/>
        <StatBox label="To Go" value={Math.max(0,range-lost).toFixed(1)+"kg"} color={C.amber} bg={`${C.amber}18`}/>
        <StatBox label="Done" value={Math.round(wPct)+"%" } color={C.sage} bg={C.mintCream}/>
      </div>
      <div style={{marginTop:"8px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        <StatBox label="Sessions Logged" value={done} color={done>0?C.fern:C.textMuted} bg={done>0?C.mintCream:C.bgDeep}/>
        <StatBox label="Plan Progress" value={Math.round(woPct)+"%"} color={C.wood} bg={`${C.wood}15`}/>
      </div>
    </Card>

    <Card topColor={C.caramel} style={{marginBottom:"14px"}}>
      <Divider label="Progress Rings"/>
      <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:"14px"}}>
        <Ring pct={wPct} color={C.fern} size={78} label="weight" value={lost.toFixed(1)} unit="kg"/>
        <Ring pct={woPct} color={C.wood} size={78} label="workouts" value={done} unit=""/>
        <Ring pct={Math.min(100,(parseFloat(avgW)/3)*100)} color={C.teal} size={78} label="avg water" value={avgW} unit="L"/>
        <Ring pct={Math.min(100,(parseFloat(avgS)/7)*100)} color={C.caramel} size={78} label="avg sleep" value={avgS} unit="h"/>
      </div>
    </Card>

    <Card topColor={C.bark} style={{marginBottom:"14px"}}>
      <Divider label="Workout Log Sheet"/>
      {logs.length===0?(
        <div style={{textAlign:"center",padding:"24px 0",color:C.textLight,fontFamily:font.body,fontSize:"13px",fontStyle:"italic"}}>No sessions logged yet. Go to Workout tab and press + Log after each session.</div>
      ):(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",flexWrap:"wrap",gap:"8px"}}>
            <div style={{fontFamily:font.mono,fontSize:"11px",color:C.textMuted}}>
              <span style={{color:C.fern,fontWeight:"bold"}}>{done}</span> session{done!==1?"s":""} saved
              &nbsp;·&nbsp;
              <span style={{color:C.wood,fontWeight:"bold"}}>{Math.round(woPct)}%</span> of plan complete
            </div>
            <button onClick={onClearLogs} style={{background:`${C.red}18`,border:`1px solid ${C.red}44`,color:C.red,borderRadius:"8px",padding:"5px 12px",fontFamily:font.body,fontSize:"11px",cursor:"pointer",fontWeight:"bold"}}>🗑 Clear All</button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:font.body,fontSize:"12px"}}>
              <thead>
                <tr style={{borderBottom:`2px solid ${C.border}`}}>
                  {["#","Date","Workout","Weight","Water","Sleep","Feel",""].map(h=>(<th key={h} style={{padding:"6px 5px",color:C.textMuted,fontWeight:"normal",textAlign:"left",whiteSpace:"nowrap",fontSize:"10px",textTransform:"uppercase"}}>{h}</th>))}
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log,i)=>(
                  <tr key={log.id||i} style={{borderBottom:`1px solid ${C.bgDark}`,background:i%2===0?C.bgDeep:"transparent"}}>
                    <td style={{padding:"7px 5px",color:C.textLight}}>{logs.length-i}</td>
                    <td style={{padding:"7px 5px",color:C.textMid,whiteSpace:"nowrap"}}>{log.date}</td>
                    <td style={{padding:"7px 5px",color:C.textDark,fontWeight:"bold",maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.workoutName}</td>
                    <td style={{padding:"7px 5px",color:C.walnut}}>{log.weight}kg</td>
                    <td style={{padding:"7px 5px",color:C.teal}}>{log.water}L</td>
                    <td style={{padding:"7px 5px",color:C.fern}}>{log.sleep}h</td>
                    <td style={{padding:"7px 5px",fontSize:"16px"}}>{log.feel}</td>
                    <td style={{padding:"7px 5px"}}>
                      <button onClick={()=>onDeleteLog(log.id||i)} style={{background:`${C.red}18`,border:`1px solid ${C.red}44`,color:C.red,borderRadius:"6px",padding:"3px 8px",fontSize:"11px",cursor:"pointer",fontWeight:"bold"}}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>

    <Card style={{background:`linear-gradient(160deg,${C.mintCream},${C.bgCard})`,border:`1px solid ${C.leafPale}`,textAlign:"center"}}>
      <div style={{fontFamily:font.display,fontSize:"clamp(14px,3vw,18px)",fontStyle:"italic",color:C.textDark,lineHeight:1.7,marginBottom:"10px"}}>"{quotes[qIdx].text}"</div>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>- {quotes[qIdx].author}</div>
      <button onClick={()=>setQIdx((qIdx+1)%quotes.length)} style={{background:`linear-gradient(135deg,${C.fern},${C.moss})`,color:C.white,border:"none",borderRadius:"10px",padding:"9px 22px",fontFamily:font.body,fontSize:"12px",cursor:"pointer",fontWeight:"bold"}}>Next Quote</button>
    </Card>
  </div>);
}

function WorkoutView({onLog,logs}){
  const[openWeek,setOpenWeek]=useState(0);
  const[logging,setLogging]=useState(null);
  const[form,setForm]=useState({weight:105,water:2.0,sleep:7,feel:"😊"});
  const isDone=(name)=>logs.some(l=>l.workoutName===name);
  const submitLog=()=>{
    if(!logging)return;
    const day=workoutWeeks[logging.wi].days[logging.di];
    const today=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
    onLog({date:today,workoutName:day.name,...form,id:Date.now()});
    setLogging(null);
  };
  return(<div>
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>8-Week Evening Workout Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"12px"}}>Train Sun, Mon, Thu, Fri, Sat 8:00pm to 9:30pm - Tue and Wed Off</div>
    <Card topColor={C.blue} style={{marginBottom:"16px"}}>
      <Divider label="Daily Cardio - First Every Session 8:00pm to 8:40pm"/>
      {cardioBlock.map((c,i)=>(<div key={i} style={{background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px 14px",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}><div style={{flex:1}}><div style={{fontFamily:font.mono,fontSize:"11px",color:C.blue,marginBottom:"2px"}}>{c.icon} {c.order}</div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{c.name}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{c.protocol}</div></div><WorkoutWatchBtn searchQuery={c.search}/></div>))}
    </Card>
    <Card topColor={C.red} style={{marginBottom:"16px",background:`linear-gradient(135deg,${C.red}14,${C.bgCard})`}}>
      <Divider label="Chest Melt Mode - Intensive Chest Plan"/>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {["💥 Chest is trained 3 times a week: Mon heavy, Thu volume, Sat pump. Each day has at least 48 hours before the next chest session.","🔥 Intensity tools: slow 3-second lowering, supersets, drop sets and push-up burnouts at the end.","📏 Fat leaves your whole body, not one spot. Daily cardio and your calorie deficit melt the fat, and chest training builds the muscle underneath so it looks tight.","⚖️ Weigh in and measure your chest every Friday to see the change.","🛡️ Warm up first. Pick a weight where the last 2 reps are hard but form stays clean. Stop if you feel sharp shoulder or chest pain."].map((t,i)=>(<div key={i} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.6,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"10px",padding:"8px 10px"}}>{t}</div>))}
      </div>
    </Card>
    {logging!==null&&(<div style={{position:"fixed",inset:0,background:"rgba(3,6,18,0.82)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}><div style={{background:C.bgCard,border:`2px solid ${C.fern}`,borderRadius:"22px",padding:"24px",width:"100%",maxWidth:"360px",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 12px 40px rgba(0,0,0,0.6)"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"16px",color:C.fern,marginBottom:"3px"}}>Log Completed Session</div><div style={{fontFamily:font.body,fontSize:"13px",color:C.textMid,marginBottom:"18px"}}>{workoutWeeks[logging.wi].days[logging.di].icon} {workoutWeeks[logging.wi].days[logging.di].name}</div><InputRow label="Current Weight kg" value={form.weight} onChange={v=>setForm({...form,weight:v})} unit="kg" min={50} max={200} step={0.5} icon="⚖️"/><InputRow label="Water Today L" value={form.water} onChange={v=>setForm({...form,water:v})} unit="L" min={0} max={6} step={0.1} icon="💧"/><InputRow label="Sleep Last Night h" value={form.sleep} onChange={v=>setForm({...form,sleep:v})} unit="hrs" min={0} max={12} step={0.5} icon="🌙"/><div style={{marginBottom:"16px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"8px"}}>How Did You Feel?</div><div style={{display:"flex",gap:"8px"}}>{["😴","😐","😊","💪","🔥"].map(e=>(<button key={e} onClick={()=>setForm({...form,feel:e})} style={{flex:1,fontSize:"20px",padding:"8px 4px",borderRadius:"10px",border:`2px solid ${form.feel===e?C.fern:C.border}`,background:form.feel===e?C.mintCream:C.bgDeep,cursor:"pointer"}}>{e}</button>))}</div></div><div style={{display:"flex",gap:"10px"}}><button onClick={()=>setLogging(null)} style={{flex:1,background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"12px",padding:"12px",color:C.textMuted,fontFamily:font.body,fontSize:"13px",cursor:"pointer"}}>Cancel</button><button onClick={submitLog} style={{flex:2,background:`linear-gradient(135deg,${C.fern},${C.moss})`,border:"none",borderRadius:"12px",padding:"12px",color:C.white,fontFamily:font.display,fontWeight:"bold",fontSize:"14px",cursor:"pointer"}}>Save to Log</button></div></div></div>)}
    {workoutWeeks.map((wk,wi)=>(<div key={wi} style={{marginBottom:"10px",background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.40)"}}><button onClick={()=>setOpenWeek(openWeek===wi?-1:wi)} style={{width:"100%",background:openWeek===wi?`linear-gradient(90deg,${wk.color}18,${C.bgCard})`:C.bgCard,border:"none",padding:"16px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:openWeek===wi?`1px solid ${C.border}`:"none"}}><div style={{textAlign:"left"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:wk.color}}>{wk.week}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{wk.theme}</div><div style={{fontFamily:font.body,fontSize:"10px",color:wk.color,marginTop:"2px"}}>{wk.focus}</div></div><span style={{color:wk.color,fontSize:"16px",transform:openWeek===wi?"rotate(180deg)":"none",transition:"transform 0.3s"}}>▼</span></button>{openWeek===wi&&(<div style={{padding:"10px"}}>{wk.days.map((d,di)=>{const done=isDone(d.name);const isOff=d.time==="OFF";return(<div key={di} style={{background:isOff?`${C.amber}10`:done?C.mintCream:C.bgDeep,border:`1px solid ${isOff?C.border:done?C.leafPale:C.border}`,borderRadius:"14px",padding:"14px",marginBottom:"8px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px",marginBottom:d.exercises.length>0?"8px":"0"}}><div style={{flex:1}}><div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap",marginBottom:"3px"}}><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{d.icon} {d.day}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:wk.color,background:`${wk.color}18`,padding:"2px 8px",borderRadius:"20px"}}>{d.time}</span><span style={{fontFamily:font.mono,fontSize:"10px",color:C.red,background:`${C.red}15`,padding:"2px 8px",borderRadius:"20px"}}>{d.target}</span></div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"14px",color:done?C.fern:C.textDark}}>{d.name}{done?" ✓":""}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{d.equipment} - {d.sets}</div></div>{!isOff&&(<button onClick={()=>{setLogging({wi,di});setForm({weight:105,water:2.0,sleep:7,feel:"😊"});}} style={{background:done?C.mintCream:`linear-gradient(135deg,${C.fern},${C.moss})`,border:`1px solid ${done?C.fern:C.moss}`,color:done?C.fern:C.white,fontWeight:"bold",fontSize:"11px",padding:"6px 12px",borderRadius:"8px",cursor:"pointer",fontFamily:font.body,whiteSpace:"nowrap"}}>{done?"Log Again":"+ Log"}</button>)}</div>{d.exercises.length>0&&(<div style={{display:"flex",flexDirection:"column",gap:"5px"}}>{d.exercises.map((ex,ei)=>(<div key={ei} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bgCard,borderRadius:"8px",padding:"7px 10px",gap:"8px"}}><span style={{fontFamily:font.body,fontSize:"12px",color:C.textDark,flex:1}}>{ex.name}</span><WorkoutWatchBtn searchQuery={ex.s}/></div>))}</div>)}</div>);})}</div>)}</div>))}
  </div>);
}

function FoodView(){
  const[open,setOpen]=useState(null);
  const wMeals=meals.filter(m=>m.calories>0&&!m.meal.includes("Friday")&&!m.meal.includes("Saturday")&&!m.meal.includes("Swap"));
  const totCal=wMeals.reduce((a,m)=>a+m.calories,0);
  const totProt=wMeals.reduce((a,m)=>a+m.protein,0);
  const totCarb=wMeals.reduce((a,m)=>a+m.carbs,0);
  const totFat=wMeals.reduce((a,m)=>a+m.fat,0);
  return(<div>
    <div style={{fontFamily:font.display,fontSize:"clamp(18px,3vw,22px)",fontWeight:"bold",color:C.textDark,marginBottom:"3px"}}>Meal Plan</div>
    <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMuted,marginBottom:"14px"}}>Dinner after gym 9:45pm - Videos open YouTube search for that exact recipe</div>
    <Card topColor={C.gold} style={{marginBottom:"14px",background:`linear-gradient(135deg,${C.gold}11,${C.bgCard})`}}>
      <Divider label="Daily Meal Times"/>
      {[{icon:"🍳",time:"10:00am",name:"Breakfast",cal:480,desc:"Protein Oats + Eggs"},{icon:"🍎",time:"12:30pm",name:"Snack",cal:200,desc:"Greek Yogurt + Fruit"},{icon:"🍗",time:"2:00pm",name:"Lunch",cal:520,desc:"Chicken + Rice Cakes + Salad"},{icon:"🍌",time:"7:20pm",name:"Pre-Workout",cal:210,desc:"Banana + 2 Boiled Eggs ONLY"},{icon:"🌙",time:"9:45pm",name:"Dinner",cal:500,desc:"Salmon + Rice + Broccoli"}].map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}><div style={{fontSize:"20px"}}>{m.icon}</div><div style={{fontFamily:font.mono,fontSize:"12px",color:m.time==="7:20pm"||m.time==="9:45pm"?C.amber:C.gold,minWidth:"62px",fontWeight:"bold"}}>{m.time}</div><div style={{flex:1}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"13px",color:C.textDark}}>{m.name}</div><div style={{fontFamily:font.body,fontSize:"11px",color:C.textMuted}}>{m.desc}</div></div><div style={{fontFamily:font.mono,fontSize:"12px",color:C.walnut,fontWeight:"bold"}}>{m.cal}</div></div>))}
      <div style={{background:`${C.amber}18`,border:`1px solid ${C.amber}55`,borderRadius:"8px",padding:"8px 12px",marginTop:"10px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.mocha}}>Pre-workout at 7:20pm is banana and 2 eggs ONLY. Full dinner is AFTER gym at 9:45pm.</div></div>
      <div style={{marginTop:"8px",background:`${C.fern}11`,borderRadius:"10px",padding:"10px 14px",border:`1px solid ${C.leafPale}`}}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>{[{l:"Total",v:totCal+" kcal",c:C.walnut},{l:"Protein",v:totProt+"g",c:C.fern},{l:"Deficit",v:"~"+(2800-totCal)+" kcal",c:C.caramel}].map((s,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:s.c}}>{s.v}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMuted}}>{s.l}</div></div>))}</div></div>
    </Card>
    <Card topColor={C.fern} style={{marginBottom:"16px"}}>
      <Divider label="Nutritional Breakdown"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"10px"}}>
        {[{l:"Calories",v:totCal,suf:"kcal",c:C.walnut},{l:"Protein",v:totProt,suf:"g",c:C.fern},{l:"Carbs",v:totCarb,suf:"g",c:C.teal},{l:"Fat",v:totFat,suf:"g",c:C.caramel}].map((t,i)=>(<div key={i} style={{background:C.bgDeep,borderRadius:"10px",padding:"10px 6px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.display,fontSize:"16px",fontWeight:"bold",color:t.c}}>{t.v}</div><div style={{fontFamily:font.mono,fontSize:"9px",color:C.textLight}}>{t.suf}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{t.l}</div></div>))}
      </div>
      <Bar pct={(totProt/160)*100} color={C.fern} h={6}/>
      <div style={{fontFamily:font.mono,fontSize:"10px",color:C.textMuted,marginTop:"3px",textAlign:"right"}}>{totProt}g protein / 160g target · deficit ~{2800-totCal} kcal/day</div>
    </Card>
    <Card topColor={C.gold} style={{marginBottom:"16px"}}>
      <Divider label="Weekly Dinner Rotation"/>
      <div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,marginBottom:"10px"}}>Creamy Chicken Macaroni twice a week. Every other night stays Chicken + Rice + Broccoli. Both are about 500 kcal, so your total does not change.</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(96px,1fr))",gap:"8px"}}>
        {[{d:"Sun",p:false},{d:"Mon",p:true},{d:"Tue",p:false},{d:"Wed",p:false},{d:"Thu",p:true},{d:"Fri",p:false},{d:"Sat",p:false}].map((x,i)=>(<div key={i} style={{background:x.p?`${C.gold}1f`:C.bgDeep,border:`1px solid ${x.p?C.gold:C.border}`,borderRadius:"12px",padding:"10px 8px",textAlign:"center"}}><div style={{fontFamily:font.mono,fontSize:"11px",color:x.p?C.gold:C.textMuted,fontWeight:"bold"}}>{x.d}</div><div style={{fontSize:"20px",margin:"4px 0"}}>{x.p?"🍝":"🍗"}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.textMid,lineHeight:1.4}}>{x.p?"Creamy Chicken Macaroni":"Chicken Rice Broccoli"}</div><div style={{fontFamily:font.mono,fontSize:"10px",color:C.walnut,marginTop:"3px"}}>{x.p?"530 kcal":"498 kcal"}</div></div>))}
      </div>
    </Card>
    {meals.map((m,i)=>(<div key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"18px",marginBottom:"12px",overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.40)",borderLeft:`4px solid ${m.meal==="Pre-Workout Snack"?C.amber:m.meal==="Dinner"||m.meal==="Dinner Swap"?C.teal:m.meal==="Snack"?C.sage:m.meal.includes("Friday")||m.meal.includes("Saturday")?C.amber:C.wood}`}}><div style={{padding:"16px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}><div><div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}><span style={{fontFamily:font.body,fontSize:"10px",color:C.textLight,textTransform:"uppercase"}}>{m.icon} {m.meal}</span><span style={{fontFamily:font.mono,fontSize:"11px",color:C.gold,background:`${C.gold}22`,padding:"2px 10px",borderRadius:"20px",fontWeight:"bold"}}>{m.time}</span></div><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"15px",color:C.textDark}}>{m.name}</div><div style={{fontFamily:font.body,fontSize:"10px",color:C.blue,marginTop:"2px"}}>{m.tag}</div>{m.brand&&<div style={{fontFamily:font.mono,fontSize:"10px",color:C.fern,marginTop:"4px",background:C.mintCream,display:"inline-block",padding:"2px 8px",borderRadius:"20px",border:`1px solid ${C.leafPale}`}}>🏷️ {m.brand}</div>}</div>{m.calories>0&&<div style={{textAlign:"right"}}><div style={{fontFamily:font.display,fontWeight:"bold",fontSize:"22px",color:C.walnut}}>{m.calories}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>kcal</div></div>}</div><div style={{background:`${C.gold}18`,border:`1px solid ${C.gold}44`,borderRadius:"8px",padding:"6px 10px",marginBottom:"7px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.mocha}}>🛒 {m.shopNote}</div></div><div style={{background:C.mintCream,border:`1px solid ${C.leafPale}`,borderRadius:"8px",padding:"7px 10px",marginBottom:"7px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.fern}}>💡 {m.why}</div></div><div style={{background:`${C.blue}11`,border:`1px solid ${C.blue}33`,borderRadius:"8px",padding:"7px 10px",marginBottom:"10px"}}><div style={{fontFamily:font.body,fontSize:"11px",color:C.blue}}>⏱ {m.prepTip}</div></div>{m.calories>0&&(<div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>{[{l:"Protein",v:m.protein+"g",c:C.fern},{l:"Carbs",v:m.carbs+"g",c:C.teal},{l:"Fat",v:m.fat+"g",c:C.caramel}].map((mc,j)=>(<div key={j} style={{flex:1,background:C.bgDeep,borderRadius:"8px",padding:"6px 4px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontFamily:font.mono,fontSize:"13px",fontWeight:"bold",color:mc.c}}>{mc.v}</div><div style={{fontFamily:font.body,fontSize:"9px",color:C.textMuted}}>{mc.l}</div></div>))}</div>)}<button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:C.bgDeep,border:`1px solid ${C.border}`,borderRadius:"8px",padding:"7px",color:C.textMuted,cursor:"pointer",fontFamily:font.body,fontSize:"11px",marginBottom:"10px"}}>{open===i?"Hide Recipe":"Show Ingredients and Recipe"}</button>{open===i&&(<div style={{marginBottom:"12px"}}><div style={{fontFamily:font.display,fontWeight:"bold",color:C.fern,fontSize:"12px",marginBottom:"5px",textTransform:"uppercase"}}>Ingredients</div>{m.ingredients.map((ing,k)=>(<div key={k} style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,padding:"2px 0"}}>- {ing}</div>))}<div style={{fontFamily:font.display,fontWeight:"bold",color:C.wood,fontSize:"12px",margin:"10px 0 5px",textTransform:"uppercase"}}>Method</div><div style={{fontFamily:font.body,fontSize:"12px",color:C.textMid,lineHeight:1.65}}>{m.instructions}</div></div>)}<WatchBtn searchQuery={m.search}/></div></div>))}
  </div>);
}

export default function PandoApp(){
  const[view,setView]=useState("home");

  // ── All data persisted to localStorage ──────────────────
  const[logs,setLogs]=useStored("pando_logs",[]);

  function handleLog(entry){
    setLogs(prev=>[...prev,{...entry,id:Date.now()}]);
  }
  function handleDeleteLog(id){
    setLogs(prev=>prev.filter((l,i)=>(l.id!==undefined?l.id!==id:i!==id)));
  }
  function handleClearLogs(){
    if(typeof window!=="undefined"&&window.confirm("Delete all logged sessions? This cannot be undone."))setLogs([]);
  }

  return(<div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0c1538 0%,#080d22 45%,#060913 100%)",backgroundAttachment:"fixed",color:C.textDark,fontFamily:font.body,colorScheme:"dark"}}>
    <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 80px,rgba(96,165,250,0.05) 80px,rgba(96,165,250,0.05) 81px)",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:"radial-gradient(circle at 50% 0%,rgba(245,197,66,0.22) 0%,rgba(245,197,66,0) 55%),linear-gradient(160deg,#10204f 0%,#0a1230 60%,#060913 100%)",borderBottom:`2px solid ${C.gold}`,padding:"32px 20px 24px",textAlign:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-30px",left:"-30px",width:"140px",height:"140px",borderRadius:"50%",background:`${C.leafLight}22`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`${C.latte}22`,pointerEvents:"none"}}/>
      <div style={{display:"inline-block",background:`${C.latte}33`,border:`1px solid ${C.latteLight}66`,color:C.foam,fontWeight:"bold",fontSize:"10px",letterSpacing:"2.5px",padding:"4px 16px",borderRadius:"20px",marginBottom:"14px",textTransform:"uppercase",fontFamily:font.body}}>📍 Warsan 4 - Akasya South</div>
      <h1 style={{fontFamily:font.display,fontSize:"clamp(28px,7vw,52px)",fontWeight:"bold",margin:"0 0 4px",color:C.gold,letterSpacing:"3px",textShadow:"0 0 28px rgba(245,197,66,0.45)"}}>🏆 PANDO APP</h1>
      <p style={{fontFamily:font.display,fontSize:"clamp(13px,2.5vw,16px)",color:C.latteLight,margin:"0 0 4px",fontStyle:"italic"}}>2-Month Transformation - 105kg to 88kg</p>
      <p style={{fontFamily:font.body,fontSize:"12px",color:C.latteLight,margin:0}}>Dinner after gym 9:45pm - Evening Workout 8pm - Off Tue and Wed</p>
    </div>
    <div style={{position:"relative",zIndex:1,background:C.bgDark,borderBottom:`1px solid ${C.border}`,padding:"12px 14px"}}>
      <div style={{display:"flex",gap:"10px",maxWidth:"720px",margin:"0 auto"}}>
        <NavBtn label="Progress" icon="📊" active={view==="home"} onClick={()=>setView("home")}/>
        <NavBtn label="Workout" icon="🏋️" active={view==="workout"} onClick={()=>setView("workout")}/>
        <NavBtn label="Food Plan" icon="🥗" active={view==="food"} onClick={()=>setView("food")}/>
      </div>
    </div>
    <div style={{position:"relative",zIndex:1,maxWidth:"720px",margin:"0 auto",padding:"18px 14px 80px"}}>
      {view==="home"&&<HomeView logs={logs} onDeleteLog={handleDeleteLog} onClearLogs={handleClearLogs}/>}
      {view==="workout"&&<WorkoutView onLog={handleLog} logs={logs}/>}
      {view==="food"&&<FoodView/>}
    </div>
    <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"20px 0 32px",borderTop:`1px solid ${C.border}`,background:C.bgDark}}>
      <div style={{fontFamily:font.display,fontSize:"14px",color:C.wood,fontWeight:"bold"}}>PANDO APP - Warsan 4 Dubai</div>
      <div style={{fontFamily:font.body,fontSize:"11px",color:C.textLight,marginTop:"3px"}}>Dinner after gym - Simple food - Built for your life</div>
    </div>
  </div>);
}
