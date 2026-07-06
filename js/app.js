// ─── Config ───────────────────────────────────────────────
const REPS = [
  { name:"จุ๋ม",  color:"#3b82f6" },
  { name:"กรีน", color:"#22c55e" },
  { name:"ส้ม",  color:"#f97316" },
  { name:"อุ๋ม",  color:"#a855f7" },
  { name:"เมย์", color:"#ec4899" },
  { name:"เบล",  color:"#14b8a6" },
];

// ─── Mock Data: ภาพรวม (4 weeks) ─────────────────────────
const WK = {
  WK1:{
    tab:"WK1 1/6-7/6", label:"1/6 – 7/6", info:"ข้อมูลครบสัปดาห์ · WK1 1/6-7/6",
    dates:["1/6","2/6","3/6","4/6","5/6","6/6","7/6"],
    // ยอดทักรายวัน: ref screenshot 135832
    dailyLeads:[
      [6,40,20,30,32,30,38],
      [43,10,0,26,26,22,18],
      [43,53,45,31,38,8,67],
      [17,31,43,49,18,41,41],
      [36,40,33,25,26,24,42],
      [29,31,42,32,34,25,43],
    ],
    target:[47,46,90,57,72,75],
    // สรุปการทักรายวัน (ล่าสุด 1/6)
    daily:{
      serving:[68,45,45,68,45,45],
      chatAll:[27,72,83,37,53,50],
      active:[21,29,40,20,17,21],
      newCust:[6,43,43,17,36,29],
      bills:[1,2,0,0,1,2],
      pctNew:[18,96,96,28,88,64],
      status:["น้อยมาก","มาตรฐาน","มาตรฐาน","เลือกดึง","มาตรฐาน","มาตรฐาน"],
    },
    // การทักและการเปิดบิล: ref screenshot 135855
    leadBill:[
      {leads:196,bills:8, sales:238380,  pct:4},
      {leads:145,bills:8, sales:145540,  pct:6},
      {leads:285,bills:9, sales:116750,  pct:3},
      {leads:240,bills:6, sales:154213,  pct:3},
      {leads:226,bills:9, sales:98523.5, pct:4},
      {leads:236,bills:4, sales:102775,  pct:2},
    ],
    teamTotal:{leads:1328,bills:44,sales:856181.5},
    // rep card data
    repStatus:["ปักษี","อิสระ","ปักษี","ควรติดตาม","ปักษี","ควรติดตาม"],
    wait12h:[24,8,10,2,6,10],
    repInsights:[
      // จุ๋ม
      ["ทักใหม่ 196 คน จาก ~420 คน/สัปดาห์ — ต่ำกว่าเป้า",
       "ตอบช้า 24 เคสสัปดาห์นี้ — อาจทำให้ลูกค้าหลุด",
       "ถามลูกค้าที่ยังไม่เปิดบิลอย่างต่อเนื่อง",
       "เช็กช่วงเวลาที่ตอบช้า และวางแผนดูแลลูกค้าแทน"],
      // กรีน
      ["เปิดบิลได้ต่อเนื่อง ลูกค้าใหม่ 145 คน ได้บิล 8 บิล",
       "ทักใหม่ 145 คน จาก 315 คน/สัปดาห์ — ต่ำกว่าเป้า",
       "ตอบช้า 8 เคสสัปดาห์นี้ — อาจทำให้ลูกค้าหลุด",
       "ถามลูกค้าที่ยังไม่เปิดบิลอย่างต่อเนื่อง"],
      // ส้ม
      ["ตอบช้า 10 เคสสัปดาห์นี้ — อาจทำให้ลูกค้าหลุด",
       "ทักลูกค้าใหม่ไม่ได้เปิดบิลอย่างต่อเนื่อง"],
      // อุ๋ม
      ["ลูกค้าใหม่ แต่บิลน้อย ควรดูว่าติดขัดที่ไหน",
       "ดูแนวทางการทักนำที่ยังไม่เปิดบิล — เช็ก",
       "จังหวะของการสนทนาที่ขาดช่วงน่าเป็นห่วง"],
      // เมย์
      ["ตอบช้า 6 เคสสัปดาห์นี้ — อาจทำให้ลูกค้าหลุด",
       "ถามลูกค้าที่ยังไม่เปิดบิลอย่างต่อเนื่อง",
       "เช็กช่วงเวลาที่ตอบช้า และวางแผนแต่น้อย"],
      // เบล
      ["ลูกค้าใหม่น้อย แต่บิลน้อยด้วย ควรดูว่าติดขัดที่ไหน",
       "ตอบช้า 10 เคสสัปดาห์นี้ — อาจทำให้ลูกค้าหลุด",
       "ดูแนวทางการทักนำที่ยังไม่เปิดบิล"],
    ],
  },
  WK2:{
    tab:"WK2 8/6-14/6", label:"8/6 – 14/6", info:"ข้อมูลครบสัปดาห์ · WK2 8/6-14/6",
    dates:["8/6","9/6","10/6","11/6","12/6","13/6","14/6"],
    dailyLeads:[
      [25,38,22,18,35,28,7],
      [40,45,35,48,52,25,10],
      [38,35,42,28,45,32,21],
      [22,18,28,25,20,28,12],
      [32,28,38,22,34,44,15],
      [42,38,52,35,48,38,21],
    ],
    target:[55,62,76,48,68,80],
    daily:{
      serving:[65,48,45,65,48,48],
      chatAll:[32,68,78,42,58,55],
      active:[24,32,38,22,28,24],
      newCust:[8,38,38,18,32,28],
      bills:[2,3,1,2,1,3],
      pctNew:[24,90,88,32,80,72],
      status:["น้อยมาก","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน"],
    },
    leadBill:[
      {leads:173,bills:11,sales:265000, pct:6},
      {leads:255,bills:12,sales:218000, pct:5},
      {leads:241,bills:14,sales:198500, pct:6},
      {leads:153,bills:15,sales:182000, pct:10},
      {leads:213,bills:6, sales:165000, pct:3},
      {leads:274,bills:7, sales:145000, pct:3},
    ],
    teamTotal:{leads:1309,bills:65,sales:1431073},
    repStatus:["ปักษี","อิสระ","ปักษี","ปักษี","ปักษี","ปักษี"],
    wait12h:[18,6,8,4,5,8],
    repInsights:[
      ["ทักดีขึ้น แต่ควรดูแลลูกค้าที่ยังไม่ตัดสินใจ","เช็กช่วงเวลาตอบช้า 18 เคส"],
      ["ลูกค้าใหม่สูงขึ้น เปิดบิลได้ต่อเนื่อง","รักษาระดับการทักให้สม่ำเสมอ"],
      ["เปิดบิล 14 ราย — ดีมากสัปดาห์นี้","ยอดขายควรดีขึ้นในสัปดาห์หน้า"],
      ["เปิดบิล 15 ราย — สูงสุดในทีม","ดูแลลูกค้าใหม่ที่ยังค้างอยู่"],
      ["ยอดเปิดบิลน้อย ควรดูแลการปิดการขาย","เช็กช่วงเวลาที่ลูกค้าตอบสนองดี"],
      ["ลูกค้าใหม่มาก แต่บิลยังน้อย","ติดตามลูกค้าที่สนใจแต่ยังไม่ตัดสินใจ"],
    ],
  },
  WK3:{
    tab:"WK3 15/6-21/6", label:"15/6 – 21/6", info:"ข้อมูลครบสัปดาห์ · WK3 15/6-21/6",
    dates:["15/6","16/6","17/6","18/6","19/6","20/6","21/6"],
    dailyLeads:[
      [28,35,32,28,42,20,13],
      [24,22,28,35,18,20,11],
      [38,42,35,32,48,28,16],
      [24,28,32,22,36,18,5],
      [30,28,35,30,42,32,12],
      [28,32,38,28,30,28,15],
    ],
    target:[58,48,84,50,72,76],
    daily:{
      serving:[62,42,48,62,42,42],
      chatAll:[28,58,75,35,52,50],
      active:[20,28,35,18,25,22],
      newCust:[5,28,35,15,28,24],
      bills:[1,2,1,3,1,2],
      pctNew:[20,88,85,28,75,68],
      status:["น้อยมาก","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน"],
    },
    leadBill:[
      {leads:198,bills:5, sales:198000, pct:3},
      {leads:158,bills:7, sales:142000, pct:4},
      {leads:239,bills:6, sales:165000, pct:3},
      {leads:165,bills:18,sales:225000, pct:11},
      {leads:209,bills:10,sales:178000, pct:5},
      {leads:199,bills:8, sales:145000, pct:4},
    ],
    teamTotal:{leads:1168,bills:54,sales:991343.73},
    repStatus:["ปักษี","อิสระ","ปักษี","ปักษี","ปักษี","ควรติดตาม"],
    wait12h:[20,5,8,5,4,7],
    repInsights:[
      ["บิลลดลงจากสัปดาห์ก่อน ควรดูแลลูกค้า","ตอบช้า 20 เคส ควรจัดการ"],
      ["ยอดดีขึ้นต่อเนื่อง รักษาระดับนี้ไว้","ลูกค้าใหม่ลดลง ต้องเพิ่มการทัก"],
      ["เปิดบิลลดลง แต่ลูกค้าใหม่ยังมาก","ดูกระบวนการปิดการขาย"],
      ["เปิดบิล 18 ราย — ดีที่สุดในทีมสัปดาห์นี้","ยอดขายสูงสุด ทำต่อเนื่อง"],
      ["เปิดบิล 10 ราย ดีขึ้นจากสัปดาห์ก่อน","รักษาระดับการทักให้สม่ำเสมอ"],
      ["บิลลดลง ควรดูแลการปิดการขาย","เช็กว่าลูกค้าค้างอยู่ที่ขั้นไหน"],
    ],
  },
  WK4:{
    tab:"WK4 22/6-28/6", label:"22/6 – 28/6", info:"ข้อมูลครบสัปดาห์ · WK4 22/6-28/6",
    dates:["22/6","23/6","24/6","25/6","26/6","27/6","28/6"],
    dailyLeads:[
      [18,22,28,18,22,15,4],
      [25,28,32,28,24,18,7],
      [35,38,42,30,38,28,15],
      [32,38,40,35,42,22,11],
      [38,42,45,38,45,35,17],
      [32,35,38,30,35,32,18],
    ],
    target:[42,54,78,58,85,72],
    daily:{
      serving:[58,40,45,58,40,40],
      chatAll:[22,52,68,32,48,45],
      active:[16,25,32,18,22,20],
      newCust:[4,25,32,12,25,22],
      bills:[1,2,1,4,1,2],
      pctNew:[18,82,82,24,70,62],
      status:["น้อยมาก","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน","มาตรฐาน"],
    },
    leadBill:[
      {leads:127,bills:9, sales:185000, pct:7},
      {leads:162,bills:8, sales:138000, pct:5},
      {leads:226,bills:14,sales:178000, pct:6},
      {leads:220,bills:10,sales:195000, pct:5},
      {leads:260,bills:10,sales:182000, pct:4},
      {leads:220,bills:9, sales:148000, pct:4},
    ],
    teamTotal:{leads:1215,bills:60,sales:1224159.25},
    repStatus:["ปักษี","อิสระ","ปักษี","ปักษี","ปักษี","ควรติดตาม"],
    wait12h:[15,4,6,4,3,6],
    repInsights:[
      ["ลูกค้าใหม่ลดลงมาก ต้องเพิ่มการทักเชิงรุก","ตอบช้า 15 เคส ต้องแก้ไข"],
      ["ยอดดีต่อเนื่อง รักษาระดับ","ลูกค้าใหม่ควรเพิ่มขึ้น"],
      ["เปิดบิลดีขึ้น 14 ราย — สัปดาห์ที่ดี","รักษาการทักให้สม่ำเสมอ"],
      ["บิลดี ยอดขายสูง ทำต่อเนื่อง","ดูแลลูกค้าที่รอการตัดสินใจ"],
      ["ลูกค้าใหม่สูงสุดในทีม 260 คน","เปิดบิล 10 ราย ดีต่อเนื่อง"],
      ["ลูกค้าใหม่มาก แต่บิลยังน้อย","ควรเพิ่มการติดตามลูกค้าเก่า"],
    ],
  },
};

// Trend (all 4 weeks combined) — ref screenshot 135914
const TREND = [
  {wk:"WK1",label:"1/6-7/6",   leads:1328,bills:44,sales:856181.5,   pct:3},
  {wk:"WK2",label:"8/6-14/6",  leads:1309,bills:65,sales:1431073,    pct:5},
  {wk:"WK3",label:"15/6-21/6", leads:1168,bills:54,sales:991343.73,  pct:5},
  {wk:"WK4",label:"22/6-28/6", leads:1215,bills:60,sales:1224159.25, pct:5},
];

// ─── Real Data Layer ──────────────────────────────────────
// wkData / trendData: เริ่มต้นเป็น mock, เปลี่ยนเป็นข้อมูลจริงเมื่อโหลด JSON ได้
let wkData      = WK;
let trendData   = TREND;
let usingRealData = false;

function buildWKFromReal(salesData, zaapiData) {
  const repNames = REPS.map(r => r.name);
  const result   = {};

  for (const wkKey of ["WK1","WK2","WK3","WK4"]) {
    const wkMeta = salesData.weeks && salesData.weeks[wkKey];
    if (!wkMeta) continue;

    const days  = wkMeta.days;
    const dates = days.map(d => `${d}/6`);

    // Lead รายวัน × รายเซล
    const dailyLeads = repNames.map(rep =>
      days.map(day => {
        const dk = `2026-06-${String(day).padStart(2,'0')}`;
        return (zaapiData.leadsByDay[dk] && zaapiData.leadsByDay[dk][rep]) || 0;
      })
    );

    // Lead + Bill + Sales รายสัปดาห์ × รายเซล
    const leadBill = repNames.map(rep => {
      const leads = days.reduce((s, day) => {
        const dk = `2026-06-${String(day).padStart(2,'0')}`;
        return s + ((zaapiData.leadsByDay[dk] && zaapiData.leadsByDay[dk][rep]) || 0);
      }, 0);
      const wkSale   = (salesData.byWkBySale[wkKey] && salesData.byWkBySale[wkKey][rep]) || {};
      const bills    = wkSale.open  || 0;
      const salesAmt = wkSale.sales || 0;
      const pct      = leads > 0 ? Math.round(bills / leads * 100) : 0;
      return { leads, bills, sales: salesAmt, pct };
    });

    // ตอบช้า 12 ชม. รายสัปดาห์ × รายเซล
    const wait12h = repNames.map(rep =>
      days.reduce((s, day) => {
        const dk = `2026-06-${String(day).padStart(2,'0')}`;
        return s + ((zaapiData.missed12hByDay[dk] && zaapiData.missed12hByDay[dk][rep]) || 0);
      }, 0)
    );

    // ข้อมูลวันแรกของสัปดาห์ (สำหรับตาราง "สรุปการทักรายวัน")
    const day1    = days[0];
    const day1Key = `2026-06-${String(day1).padStart(2,'0')}`;
    const daily   = {
      serving: repNames.map(() => null),  // ไม่มีใน JSON
      chatAll: repNames.map(rep => (zaapiData.chatsByDay[day1Key]    && zaapiData.chatsByDay[day1Key][rep])    || 0),
      active:  repNames.map(() => null),  // ไม่มีใน JSON
      newCust: repNames.map(rep => (zaapiData.leadsByDay[day1Key]    && zaapiData.leadsByDay[day1Key][rep])    || 0),
      bills:   repNames.map(rep => {
        const ds = salesData.byDayBySale[String(day1)] && salesData.byDayBySale[String(day1)][rep];
        return ds ? (ds.open || 0) : 0;
      }),
      pctNew:  repNames.map(rep => {
        const chat = (zaapiData.chatsByDay[day1Key] && zaapiData.chatsByDay[day1Key][rep]) || 0;
        const lead = (zaapiData.leadsByDay[day1Key] && zaapiData.leadsByDay[day1Key][rep]) || 0;
        return chat > 0 ? Math.round(lead / chat * 100) : 0;
      }),
      status: repNames.map(() => "ปกติ"),
    };

    // Insights จากตัวเลขจริง
    const repInsights = repNames.map((rep, i) => {
      const lb = leadBill[i];
      const w  = wait12h[i];
      const ins = [];
      if (lb.leads > 0) ins.push(`Lead ${fmt(lb.leads)} คน เปิดบิล ${lb.bills} บิล (${lb.pct}%)`);
      else ins.push("ไม่มีข้อมูล Lead สัปดาห์นี้");
      if (w > 0) ins.push(`ตอบช้า 12 ชม. ${w} เคส`);
      if (lb.sales > 0) ins.push(`ยอดขาย ${fmtB(lb.sales)}`);
      return ins;
    });

    const teamLeads = leadBill.reduce((s,r) => s + r.leads, 0);
    const teamBills = leadBill.reduce((s,r) => s + r.bills, 0);
    const teamSales = leadBill.reduce((s,r) => s + r.sales, 0);

    result[wkKey] = {
      tab:       `${wkKey} ${wkMeta.label}`,
      label:     wkMeta.label,
      info:      `ข้อมูลจริง · ${wkKey} ${wkMeta.label}`,
      dates,
      dailyLeads,
      target:    repNames.map(() => null), // รอข้อมูลเป้า
      daily,
      leadBill,
      teamTotal: { leads: teamLeads, bills: teamBills, sales: teamSales },
      repStatus: repNames.map(() => "ปกติ"),
      wait12h,
      repInsights,
    };
  }
  return result;
}

function buildTrendFromReal(builtWK) {
  return ["WK1","WK2","WK3","WK4"].filter(k => builtWK[k]).map(k => {
    const d   = builtWK[k];
    const pct = d.teamTotal.leads > 0 ? Math.round(d.teamTotal.bills / d.teamTotal.leads * 100) : 0;
    return { wk: k, label: d.label, leads: d.teamTotal.leads, bills: d.teamTotal.bills, sales: d.teamTotal.sales, pct };
  });
}

// โหลด JSON จริง — ถ้าโหลดไม่ได้ (เช่น GitHub Pages ไม่มีไฟล์) ใช้ mock ต่อ
async function tryLoadRealData() {
  try {
    const [sRes, zRes] = await Promise.all([
      fetch('data/sales.json'),
      fetch('data/zaapi.json'),
    ]);
    if (!sRes.ok || !zRes.ok) return;
    const salesData = await sRes.json();
    const zaapiData = await zRes.json();
    const built = buildWKFromReal(salesData, zaapiData);
    if (Object.keys(built).length > 0) {
      wkData        = built;
      trendData     = buildTrendFromReal(built);
      usingRealData = true;
      console.log('[Store-Statistics] ใช้ข้อมูลจริงจาก JSON');
    }
  } catch(e) {
    console.log('[Store-Statistics] ไม่พบ JSON จริง — ใช้ mock data แทน');
  }
}

// ─── Mock Data: ยอดขาย ────────────────────────────────────
const SALES = {
  year:2026,month:"มิ.ย.",
  total:4954122.48,
  byType:[
    {name:"ป้ายสวมเด่น",  val:4020585.48},
    {name:"ไอเดียสัน",    val:434868},
    {name:"พาร์มโลโก",   val:498669},
  ],
  byRep:[
    {name:"อุ๋ม",  color:"#a855f7",val:1096129.75},
    {name:"เมย์", color:"#ec4899",val:880264},
    {name:"ส้ม",  color:"#f97316",val:837501.5},
    {name:"กรีน", color:"#22c55e",val:824890.5},
    {name:"จุ๋ม",  color:"#3b82f6",val:770341.73},
    {name:"เบล",  color:"#14b8a6",val:544995},
  ],
};

// ─── Mock Data: ผลงานเซล ─────────────────────────────────
const PERF = {
  from:"06/01/2026",to:"06/30/2026",
  summary:{sales:4954122.48,bills:237,chats:8949},
  byRep:[
    {name:"อุ๋ม", newOld:"ใหม่ 778 / เก่า 651",chats:1429,slow:37,bills:49,sales:1096129.75,status:"ปกติ"},
    {name:"เมย์",newOld:"ใหม่ 908 / เก่า 560",chats:1468,slow:29,bills:38,sales:880264,    status:"ปกติ"},
    {name:"ส้ม", newOld:"ใหม่ 991 / เก่า 906",chats:1897,slow:57,bills:46,sales:837501.5,  status:"ปกติ"},
    {name:"กรีน",newOld:"ใหม่ 720 / เก่า 658",chats:1378,slow:19,bills:40,sales:824890.5,  status:"ต้องคุย"},
    {name:"จุ๋ม", newOld:"ใหม่ 694 / เก่า 655",chats:1349,slow:67,bills:35,sales:770341.73, status:"จับตา"},
    {name:"เบล", newOld:"ใหม่ 929 / เก่า 499",chats:1428,slow:41,bills:29,sales:544995,    status:"ต้องคุย"},
  ],
  leadBillWk:[
    {name:"จุ๋ม", d:[196,8, 173,11,198,5, 127,9]},
    {name:"กรีน",d:[145,8, 255,12,158,7, 162,8]},
    {name:"ส้ม", d:[285,9, 241,14,239,6, 226,14]},
    {name:"อุ๋ม", d:[240,6, 153,15,165,18,220,10]},
    {name:"เมย์",d:[226,9, 213,6, 209,10,260,10]},
    {name:"เบล", d:[236,4, 274,7, 199,8, 220,9]},
    {name:"รวม", d:[1328,44,1309,65,1168,54,1215,60]},
  ],
  repDetail:[
    {name:"อุ๋ม",  color:"#a855f7",status:"ปกติ",  chats:1429,newOld:"778/651",slow:37,bills:49,sales:1096129.75,
     facts:["ตอบช้า 12 ชม. 37 เคส จากแอกทั้งหมด 1,429 ครั้ง","เปิดบิล 49 รายการ (เฉลี่ยกัน 39.5 รายการ)","ยอดขายรวม ฿1,096,130 (เฉลี่ยกัน ฿825,687)"],
     points:["ยอดขายสูงสุดในทีม"],
     watch:["เปิดบิล 49 รายการ สูงกว่าเฉลี่ย 39.5 รายการ"],
     fix:["ตอบช้า 12 ชม. 37 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่"]},
    {name:"เมย์", color:"#ec4899",status:"ปกติ",  chats:1468,newOld:"908/560",slow:29,bills:38,sales:880264,
     facts:["ตอบช้า 12 ชม. 29 เคส จากแอกทั้งหมด 1,468 ครั้ง","เปิดบิล 38 รายการ (ต่ำกว่าเฉลี่ย 39.5 รายการ)","ยอดขายรวม ฿880,264 (เฉลี่ยกัน ฿825,687)"],
     points:[],
     watch:["เปิดบิล 38 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ ควรติดตามที่แล้วยังไม่ได้เปิดบิล"],
     fix:["ตอบช้า 12 ชม. 29 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่","เปิดบิล 38 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ — ให้เช็กว่าเคสที่แล้วยังไม่ได้เปิดบิลดีแล้ว ตรวจราคา แบบนอน หรือไม่ได้ติดตามหลังคลิกจน"]},
    {name:"ส้ม",  color:"#f97316",status:"ปกติ",  chats:1897,newOld:"991/906",slow:57,bills:46,sales:837501.5,
     facts:["ตอบช้า 12 ชม. 57 เคส จากแอกทั้งหมด 1,897 ครั้ง","เปิดบิล 46 รายการ (เฉลี่ยกัน 39.5 รายการ)","ยอดขายรวม ฿837,502 (เฉลี่ยกัน ฿825,687)","แอกทั้งหมด 1,897 ครั้ง มากกว่าค่าเฉลี่ย 1491.5 ครั้ง"],
     points:["ยอดเปิดบิล 46 รายการ สูงกว่าเฉลี่ย 39.5 รายการ","มีแอกมากสุดในทีม 1,897 ครั้ง"],
     watch:[],
     fix:["ตอบช้า 12 ชม. 57 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่"]},
    {name:"กรีน", color:"#22c55e",status:"ต้องคุย",chats:1378,newOld:"720/658",slow:19,bills:40,sales:824890.5,
     facts:["ตอบช้า 12 ชม. 19 เคส จากแอกทั้งหมด 1,378 ครั้ง","เปิดบิล 40 รายการ (เฉลี่ยกัน 39.5 รายการ)","ยอดขายรวม ฿824,891 ต่ำกว่าเฉลี่ยกัน ฿825,687"],
     points:["เปิดบิล 40 รายการ สูงกว่าเฉลี่ย 39.5 รายการ"],
     watch:["ยอดขายต่ำกว่าเฉลี่ยในช่วงนี้ ควรดูจำนวนเปิดบิลและยอดต่อบิล"],
     fix:["ตอบช้า 12 ชม. 19 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่","ยอดขาย ฿824,891 แม้เปิดบิล 40 รายการ — ให้ดูขนาดบิลต่อรายและลองเพิ่มยอดต่อบิล คิดเลขสูงขึ้น"]},
    {name:"จุ๋ม",  color:"#3b82f6",status:"จับตา", chats:1349,newOld:"694/655",slow:67,bills:35,sales:770341.73,
     facts:["ตอบช้า 12 ชม. 67 เคส สูงสุดในทีม","เปิดบิล 35 รายการ (ต่ำกว่าเฉลี่ย 39.5 รายการ)","ยอดขายรวม ฿770,342 ต่ำกว่าเฉลี่ยกัน ฿825,687"],
     points:[],
     watch:["ตอบช้า 12 ชม. 67 เคส สูงสุดในทีม ควรดูวันนี้เลย","เปิดบิล 35 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ ต้องดูกระบวนการปิดการขาย","ยอดขายต่ำกว่าเฉลี่ยในช่วงนี้"],
     fix:["ตอบช้า 12 ชม. 67 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่","เปิดบิล 35 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ — ให้เช็กว่าเคสที่แล้วยังไม่ได้เปิดบิล ตรวจราคา แบบนอน หรือไม่ได้ติดตามตามหลักจน","ยอดขาย ฿770,342 แม้เปิดบิล 35 รายการ — ให้ดูขนาดบิลต่อรายและลองเพิ่มยอดต่อบิล คิดเลขสูงขึ้น"]},
    {name:"เบล",  color:"#14b8a6",status:"ต้องคุย",chats:1428,newOld:"929/499",slow:41,bills:29,sales:544995,
     facts:["ตอบช้า 12 ชม. 41 เคส จากแอกทั้งหมด 1,428 ครั้ง","เปิดบิล 29 รายการ (ต่ำกว่าเฉลี่ย 39.5 รายการ)","ยอดขายรวม ฿544,995 ต่ำกว่าเฉลี่ยกัน ฿825,687"],
     points:[],
     watch:["เปิดบิล 29 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ ควรดูที่แล้วยังไม่ได้เปิดบิล","ยอดขายต่ำกว่าเฉลี่ยในช่วงนี้ ควรดูจำนวนเปิดบิลและยอดต่อบิล"],
     fix:["ตอบช้า 12 ชม. 41 เคส — ให้เช็กว่า/ช่วงเวลาที่หลุด และเคลียร์เคสค้างก่อนเริ่มเคสใหม่","เปิดบิล 29 รายการ ต่ำกว่าเฉลี่ย 39.5 รายการ — ให้เช็กว่าเคสที่แล้วยังไม่ได้เปิดบิล ตรวจราคา แบบนอน หรือไม่ได้ติดตามตามหลักจน","ยอดขาย ฿544,995 แม้เปิดบิล 29 รายการ — ให้ดูขนาดบิลต่อรายและลองเพิ่มยอดต่อบิล คิดเลขสูงขึ้น"]},
  ],
};

// ─── Mock Data: สถิติแชท ──────────────────────────────────
const CHAT = {
  period:"28 มิ.ย. 2026 – 4 ก.ค. 2026",
  total:294, slow12h:15,
  daily:[
    {date:"28 มิ.ย.",chats:42,slow:2},
    {date:"29 มิ.ย.",chats:38,slow:1},
    {date:"30 มิ.ย.",chats:55,slow:3},
    {date:"1 ก.ค.", chats:48,slow:4},
    {date:"2 ก.ค.", chats:62,slow:2},
    {date:"3 ก.ค.", chats:35,slow:1},
    {date:"4 ก.ค.", chats:14,slow:2},
  ],
  byRep:[
    {name:"ส้ม",  color:"#f97316",chats:62,slow:1, pct:1.6},
    {name:"อุ๋ม",  color:"#a855f7",chats:59,slow:2, pct:3.4},
    {name:"เมย์", color:"#ec4899",chats:55,slow:0, pct:0.0},
    {name:"เบล",  color:"#14b8a6",chats:50,slow:1, pct:2.0},
    {name:"จุ๋ม",  color:"#3b82f6",chats:37,slow:11,pct:29.7},
    {name:"กรีน", color:"#22c55e",chats:31,slow:0, pct:0.0},
  ],
};

// ─── Mock Data: ตรวจข้อมูล ───────────────────────────────
const AUDIT = {
  wk:"WK5 มิ.ย. 2026",updated:"2026-07-06 06:43:14",
  alerts:1,
  notices:[
    {type:"info",icon:"ℹ️",text:"ลูกค้าใหม่ (ลูกค้าใหม่ (Lead)) รวมของกันสัปดาห์นี้ = 0 — ระบบยังไม่ได้รับข้อมูลลูกค้าใหม่ (Lead) จาก ZAAPI สำหรับสัปดาห์นี้ (แจ้งให้ใช้แกรม ไม่ใช่ข้อผิดพลาด)"},
  ],
};

// ─── Mock Data: ผู้ดูแลระบบ ──────────────────────────────
const ADMIN = {
  version:"16D-impl-1", updated:"2026-07-06 06:43:14",
  source:"_SystemLog:weekly_auto", nextRun:"2026-07-06 06:43:13",
  latestWk:"WK5 มิ.ย. 2026 · 6 เซล",
  latestMonth:"2026-06 (เก่าสุด 2026-01)",
  monthData:"2026-06",
  repsCount:"6 เซล / 3 พร้อ",
  subsystems:[
    {name:"รายเดือน",      status:"ปกติ",   note:"6 เดือน"},
    {name:"รายพร้อ",       status:"ปกติ",   note:"3 พร้อ (เดือนล่าสุด)"},
    {name:"KPI เซล",       status:"ปกติ",   note:"6 เซล (เดือนล่าสุด)"},
    {name:"Weekly Insight", status:"ปกติ",   note:"สัปดาห์ล่าสุด: WK5 มิ.ย. 2026"},
    {name:"Lead/Forecast รายเดือน", status:"รอเชื่อมข้อมูล", note:"รอเชื่อม source รายเดือน/ZAAPI"},
  ],
  warnings:[
    "Lead/Forecast รายเดือนยังไม่มี source รายเดือน (สถานะ: pending)",
    "Weekly Insight เป็นข้อมูลสัปดาห์ล่าสุด ไม่ใช่รายเดือน",
    "เดือนที่ข้อมูลยังไม่มี (ปี *): 2026-05, 2026-06",
  ],
};

// ─── Utilities ───────────────────────────────────────────
const fmt  = n => Number(n).toLocaleString("th-TH");
const fmtB = n => "฿" + Number(n).toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2});
const sum  = a => a.reduce((t,v)=>t+v,0);

function statusBadge(s){
  const map={
    "ปกติ":"b-normal","มาตรฐาน":"b-normal","ปักษี":"b-normal","อิสระ":"b-free",
    "จับตา":"b-watch","น้อยมาก":"b-lo",
    "ต้องคุย":"b-talk","ต้องดูแล":"b-talk","ผิดปกติ":"b-talk","ไม่มีข้อมูล":"b-talk",
    "ควรติดตาม":"b-follow","เลือกดึง":"b-follow","รอเชื่อมข้อมูล":"b-follow",
  };
  return `<span class="badge ${map[s]||'b-watch'}">${s}</span>`;
}

// ─── Color helpers ─────────────────────────────────────────
// Bills/leads/sales: 0 = red, else normal class
function clsBill(v){ return v===0?'vr':'vg'; }
function clsLead(v){ return v===0?'vr':'vb'; }
function clsSales(v){ return v===0?'vr':''; }
// Conversion %: 0% = red, ≥5% = green, else orange
function clsPct(v){ return v===0?'vr':v>=5?'vg':'vo'; }
// Slow response: 0 = green (good!), 1–19 = normal, 20–39 = orange, ≥40 = red
function clsSlow(v){ return v===0?'vg':v>=40?'vr':v>=20?'vo':'vm'; }

function repCell(i){
  return `<div class="rep-cell"><span class="rdot" style="background:${REPS[i].color}"></span>${REPS[i].name}</div>`;
}

// ─── Page: ภาพรวม ─────────────────────────────────────────
let activeWk = "WK1";

function renderOverview(wkKey){
  const d = wkData[wkKey];
  const pg = document.getElementById("page-overview");
  const tl = trendData.find(t=>t.wk===wkKey);

  // Week tabs
  const tabs = ["WK1","WK2","WK3","WK4"].map(k=>
    `<button class="wk-tab${k===wkKey?" active":""}" data-wk="${k}">${wkData[k].tab}</button>`
  ).join("");

  // Daily leads table
  const dates = d.dates;
  const leadsRows = REPS.map((r,i)=>{
    const row = d.dailyLeads[i];
    const t = sum(row);
    const avg = (t/dates.length).toFixed(0);
    return `<tr>
      <td>${repCell(i)}</td>
      ${row.map(v=>`<td class="${v===0?'vr':'vb'}">${v}</td>`).join("")}
      <td><b>${fmt(t)}</b></td>
      <td>${avg}</td>
      <td>${d.target[i] != null ? d.target[i]+'%' : '—'}</td>
    </tr>`;
  }).join("");
  const colSums = dates.map((_,j)=>sum(d.dailyLeads.map(r=>r[j])));

  // Daily summary table
  const dailyRows = REPS.map((r,i)=>`<tr>
    <td>${repCell(i)}</td>
    <td>${d.daily.serving[i] ?? '—'}</td>
    <td>${fmt(d.daily.chatAll[i])}</td>
    <td>${d.daily.active[i] ?? '—'}</td>
    <td class="${clsLead(d.daily.newCust[i])}">${d.daily.newCust[i]}</td>
    <td class="${clsBill(d.daily.bills[i])}">${d.daily.bills[i]}</td>
    <td>${d.daily.pctNew[i]}%</td>
    <td>${statusBadge(d.daily.status[i])}</td>
  </tr>`).join("");

  // Lead/Bill table
  const lbRows = REPS.map((r,i)=>{
    const lb = d.leadBill[i];
    const bar = `<div class="conv-bar-wrap">
      <div class="conv-track"><div class="conv-fill" style="width:${Math.min(lb.pct*5,100)}%"></div></div>
      <span class="${clsPct(lb.pct)}">${lb.pct}%</span>
    </div>`;
    return `<tr>
      <td>${repCell(i)}</td>
      <td class="${clsLead(lb.leads)}">${fmt(lb.leads)}</td>
      <td class="${clsBill(lb.bills)}">${lb.bills}</td>
      <td class="${clsSales(lb.sales)}">${fmtB(lb.sales)}</td>
      <td>${bar}</td>
    </tr>`;
  }).join("");
  const totLB = d.leadBill.reduce((a,b)=>({leads:a.leads+b.leads,bills:a.bills+b.bills,sales:a.sales+b.sales}),{leads:0,bills:0,sales:0});

  // Trend
  const trendRows = trendData.map(t=>`
    <div class="trend-row">
      <div class="trend-wk">${t.wk}<br><small style="color:var(--text3)">${t.label}</small></div>
      <div class="trend-stat"><div class="trend-stat-label">LEAD</div><div class="trend-stat-val ${clsLead(t.leads)}">${fmt(t.leads)}</div></div>
      <div class="trend-stat"><div class="trend-stat-label">เปิดบิล</div><div class="trend-stat-val ${clsBill(t.bills)}">${t.bills}</div></div>
      <div class="trend-stat"><div class="trend-stat-label">ยอดเงิน</div><div class="trend-stat-val ${clsSales(t.sales)}">${fmtB(t.sales)}</div></div>
      <div class="trend-stat"><div class="trend-stat-label">LEAD→บิล</div><div class="trend-stat-val ${clsPct(t.pct)}">${t.pct}%</div></div>
      <div class="trend-badge"><span class="badge b-ok">ครบ</span></div>
    </div>`).join("");

  // Rep cards
  const repCards = REPS.map((r,i)=>{
    const lb = d.leadBill[i];
    const ins = d.repInsights[i];
    const bullets = ins.map((b,j)=>`<li class="${j===0?'':'arrow'}">${b}</li>`).join("");
    return `<div class="rep-card">
      <div class="rc-head">
        <div class="rc-name"><span class="rdot" style="background:${r.color}"></span>${r.name}</div>
        ${statusBadge(d.repStatus[i])}
      </div>
      <div class="rc-body">
        <div class="rc-stats">
          <div><div class="rc-stat-lbl">ลูกค้าใหม่ / Lead</div><div class="rc-stat-val ${clsLead(lb.leads)}">${fmt(lb.leads)} คน</div></div>
          <div><div class="rc-stat-lbl">เปิดบิล</div><div class="rc-stat-val ${clsBill(lb.bills)}">${lb.bills} บิล</div></div>
          <div><div class="rc-stat-lbl">ยอดขาย</div><div class="rc-stat-val ${clsSales(lb.sales)}">${fmtB(lb.sales)}</div></div>
          <div><div class="rc-stat-lbl">ตอบช้า 12 ชม.</div><div class="rc-stat-val ${clsSlow(d.wait12h[i])}">${d.wait12h[i]} เคส</div></div>
        </div>
        <ul class="rc-bullets">${bullets}</ul>
        <div class="rc-summary">ลูกค้าใหม่ ${fmt(lb.leads)} คน เปิดบิล ${lb.bills} บิล — ${d.repStatus[i]==="ปักษี"?"แคก":d.repStatus[i]==="ควรติดตาม"?"ต้องติดตาม":"แอก"}</div>
      </div>
    </div>`;
  }).join("");

  pg.innerHTML = `
    <div class="week-tabs" id="weekTabs">${tabs}</div>
    <div class="info-bar">${usingRealData ? '📊' : '✅'} ${d.info}</div>

    <div class="section">
      <div class="sec-title">ยอดทักลูกค้ารายวัน</div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr>
            <th>เซล</th>${dates.map(d=>`<th>${d}</th>`).join("")}
            <th>ทักทั้งหมด</th><th>เฉลี่ย/วัน</th><th>% เกินเป้า</th>
          </tr></thead>
          <tbody>${leadsRows}</tbody>
          <tfoot><tr><td>รวมทีมขาย</td>${colSums.map(v=>`<td>${v}</td>`).join("")}
            <td>${fmt(sum(colSums))}</td><td>${(sum(colSums)/dates.length).toFixed(0)}</td><td>—</td>
          </tr></tfoot>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">สรุปการทักและลูกค้าใหม่รายวัน</div>
      <div class="day-select-wrap"><span>วันที่ดู:</span>
        <select class="filter-select"><option>${dates[0]}</option>${dates.slice(1).map(x=>`<option>${x}</option>`).join("")}</select>
      </div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr>
            <th>เซล</th><th>เข้าเสิร์ฟ/วัน</th><th>ทักทั้งหมด</th><th>แอกทีฟ</th>
            <th>ลูกค้าใหม่</th><th>เปิดบิล</th><th>% ทักใหม่</th><th>สถานะ</th>
          </tr></thead>
          <tbody>${dailyRows}</tbody>
          <tfoot><tr>
            <td>รวมทีม</td>
            <td>${sum(d.daily.serving)}</td>
            <td>${fmt(sum(d.daily.chatAll))}</td>
            <td>${sum(d.daily.active)}</td>
            <td class="vb">${sum(d.daily.newCust)}</td>
            <td class="vg">${sum(d.daily.bills)}</td>
            <td>${(sum(d.daily.newCust)/sum(d.daily.chatAll)*100).toFixed(0)}%</td>
            <td>—</td>
          </tr></tfoot>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">การทักและการเปิดบิล
        <button class="btn-outline" style="margin-left:auto;font-size:.78rem;padding:3px 10px">ดูรายละเอียดรายวัน</button>
      </div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr>
            <th>เซล</th><th>ลูกค้าใหม่ / LEAD</th><th>เปิดบิล</th>
            <th>ยอดเงิน</th><th>เปิดบิลจากลูกค้าใหม่</th>
          </tr></thead>
          <tbody>${lbRows}</tbody>
          <tfoot><tr>
            <td>รวมทีมขาย</td>
            <td class="vb">${fmt(totLB.leads)}</td>
            <td class="vg">${totLB.bills}</td>
            <td>${fmtB(totLB.sales)}</td>
            <td>—</td>
          </tr></tfoot>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">สรุปทีม</div>
      <div class="team-row">
        <div class="team-stat">
          <div class="ts-val sv-b">${fmt(d.teamTotal.leads)}</div>
          <div class="ts-label">LEAD ทั้งสัปดาห์</div><div class="ts-unit">ครั้ง</div>
        </div>
        <div class="team-stat">
          <div class="ts-val sv-g">${d.teamTotal.bills}</div>
          <div class="ts-label">เปิดบิล</div><div class="ts-unit">บิล</div>
        </div>
        <div class="team-stat">
          <div class="ts-val">${fmtB(d.teamTotal.sales)}</div>
          <div class="ts-label">ยอดเงิน</div><div class="ts-unit">บาท</div>
        </div>
        <div class="team-stat">
          <div class="ts-val">—</div>
          <div class="ts-label">LEAD → เปิดบิล</div><div class="ts-unit">อัตราร่วมทีม</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">แนวโน้ม LEAD → เปิดบิล รายสัปดาห์
        <button class="btn-outline" style="margin-left:auto;font-size:.78rem;padding:3px 10px">ดูรายเซล</button>
      </div>
      <div style="font-size:.76rem;color:var(--text3);margin-bottom:12px;">หมายเหตุ: แนวโน้มนี้ใช้เปรียบเทียบผลรายสัปดาห์ · Lead จาก ZAAPI CustomerLabel · เปิดบิลจากข้อมูลออเดอร์จริง</div>
      ${trendRows}
    </div>

    <div class="section">
      <div class="sec-title">สิ่งที่ควรติดตามรายเซล</div>
      <div class="rep-cards-grid">${repCards}</div>
    </div>

    <div class="page-footer">หมายเหตุข้อมูล: ทักทั้งหมด = ZAAPI CustomerChatsByAgent · ลูกค้าใหม่ = ZAAPI CustomerLabel · แอกทีฟ = ทักทั้งหมด · ลูกค้าใหม่ = เปิดบิล = ข้อมูลออเดอร์จริง</div>
  `;

  // Week tab events
  document.getElementById("weekTabs").addEventListener("click",e=>{
    const btn = e.target.closest(".wk-tab");
    if(!btn) return;
    activeWk = btn.dataset.wk;
    renderOverview(activeWk);
  });
}

// ─── Page: ยอดขาย ─────────────────────────────────────────
function renderSales(){
  const max = Math.max(...SALES.byRep.map(r=>r.val));
  const maxT = Math.max(...SALES.byType.map(t=>t.val));

  const repBars = SALES.byRep.map(r=>{
    const w = (r.val/max*100).toFixed(1);
    return `<div class="hbar-row">
      <div class="hbar-label">${r.name}</div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${w}%;background:${r.color}">
        <span class="hbar-val">${fmtB(r.val)}</span>
      </div></div>
    </div>`;
  }).join("");

  const typeBars = SALES.byType.map(t=>{
    const w = (t.val/maxT*100).toFixed(1);
    return `<div class="hbar-row">
      <div class="hbar-label" style="width:80px">${t.name}</div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${w}%;background:var(--orange)">
        <span class="hbar-val">${fmtB(t.val)}</span>
      </div></div>
    </div>`;
  }).join("");

  const typeRows = SALES.byType.map(t=>`<tr>
    <td>${t.name}</td><td>${fmtB(t.val)}</td>
  </tr>`).join("");
  const repRows = SALES.byRep.map(r=>`<tr>
    <td>${r.name}</td><td>${fmtB(r.val)}</td>
  </tr>`).join("");

  document.getElementById("page-sales").innerHTML = `
    <div class="filter-row">
      <span class="filter-label">ปี</span>
      <select class="filter-select"><option>${SALES.year}</option></select>
      <span class="filter-label">เดือน</span>
      <select class="filter-select"><option>${SALES.month}</option></select>
      <span class="filter-label">ทีมกัน</span>
      <select class="filter-select"><option>เดือนก่อนหน้า</option></select>
      <button class="btn-orange">โหลดข้อมูลใหม่</button>
    </div>

    <div class="section">
      <div class="period-header">สาระสำคัญ <b>${SALES.year}-06</b></div>
      <div class="sum-cards" style="grid-template-columns:1fr">
        <div class="sum-card" style="max-width:220px">
          <div class="sum-label">ยอดขายรวม</div>
          <div class="sum-val sv-o">${fmtB(SALES.total)}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">สาขาพร้อมขาย รายแพ็จ / รายเซล</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;flex-wrap:wrap">
        <div>
          <div style="font-size:.8rem;color:var(--text3);margin-bottom:10px">ยอดขายรายแพ็จ</div>
          <div class="hbar-chart">${typeBars}</div>
        </div>
        <div>
          <div style="font-size:.8rem;color:var(--text3);margin-bottom:10px">ยอดขายรายเซล</div>
          <div class="hbar-chart">${repBars}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">ยอดขายรายแพ็จ</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th style="text-align:left">แพ็จ</th><th>ยอดขาย</th></tr></thead>
        <tbody>${typeRows}</tbody>
        <tfoot><tr><td>รวม</td><td>${fmtB(SALES.total)}</td></tr></tfoot>
      </table></div>
    </div>

    <div class="section">
      <div class="sec-title">ยอดขายรายเซล</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th style="text-align:left">เซล</th><th>ยอดขาย</th></tr></thead>
        <tbody>${repRows}</tbody>
        <tfoot><tr><td>รวม</td><td>${fmtB(SALES.total)}</td></tr></tfoot>
      </table></div>
    </div>

    <div class="page-footer">ข้อมูลจากระบบบัญชี (Freshbooks)</div>
  `;
}

// ─── Page: ผลงานเซล ──────────────────────────────────────
function renderPerformance(){
  const s = PERF.summary;
  const repRows = PERF.byRep.map(r=>`<tr>
    <td>${r.name}</td>
    <td style="font-size:.8rem">${r.newOld}</td>
    <td>${fmt(r.chats)}</td>
    <td class="${clsSlow(r.slow)}">${r.slow}</td>
    <td class="${clsBill(r.bills)}">${r.bills}</td>
    <td class="${clsSales(r.sales)}">${fmtB(r.sales)}</td>
    <td>${statusBadge(r.status)}</td>
  </tr>`).join("");

  const wkHeaders = ["WK1 LEAD","WK1 บิล","WK2 LEAD","WK2 บิล","WK3 LEAD","WK3 บิล","WK4 LEAD","WK4 บิล"];
  const lbRows = PERF.leadBillWk.map(r=>`<tr>
    <td>${r.name}</td>
    ${r.d.map((v,i)=>`<td class="${i%2===0?clsLead(v):clsBill(v)}">${fmt(v)}</td>`).join("")}
  </tr>`).join("");

  const detailCards = PERF.repDetail.map(r=>`
    <div class="rep-card">
      <div class="rc-head">
        <div class="rc-name"><span class="rdot" style="background:${r.color}"></span>${r.name}</div>
        ${statusBadge(r.status)}
      </div>
      <div class="rc-body">
        <div style="font-size:.8rem;color:var(--text3);margin-bottom:6px">
          แอก ${fmt(r.chats)} ครั้ง · ลูกค้าใหม่/เก่า ${r.newOld} · เปิดบิล <span class="${clsBill(r.bills)}">${r.bills} บิล</span> · ตอบช้า <span class="${clsSlow(r.slow)}">${r.slow} เคส</span>
        </div>
        <div style="font-size:.85rem;font-weight:700;margin-bottom:10px" class="${clsSales(r.sales)}">ยอดขาย ${fmtB(r.sales)}</div>
        <div style="font-size:.79rem;font-weight:600;color:var(--text3);margin-bottom:4px">หลักฐานจากตัวเลข</div>
        <ul class="rc-bullets">${r.facts.map(f=>`<li>${f}</li>`).join("")}</ul>
        ${r.points.length?`<div style="font-size:.79rem;font-weight:600;color:var(--text3);margin:8px 0 4px">จุดเด่น</div>
        <ul class="rc-bullets">${r.points.map(p=>`<li class="check">${p}</li>`).join("")}</ul>`:""}
        ${r.watch.length?`<div style="font-size:.79rem;font-weight:600;color:var(--text3);margin:8px 0 4px">สิ่งที่ควรติดตาม</div>
        <ul class="rc-bullets">${r.watch.map(w=>`<li>${w}</li>`).join("")}</ul>`:""}
        ${r.fix.length?`<div style="font-size:.79rem;font-weight:600;color:var(--text3);margin:8px 0 4px">แนวทางแก้ไข</div>
        <ul class="rc-bullets">${r.fix.map(f=>`<li class="arrow">${f}</li>`).join("")}</ul>`:""}
      </div>
    </div>`).join("");

  document.getElementById("page-performance").innerHTML = `
    <div class="filter-row">
      <span class="filter-label">ตั้งแต่</span>
      <input class="filter-input" type="date" value="${PERF.from}">
      <span class="filter-label">ถึง</span>
      <input class="filter-input" type="date" value="${PERF.to}">
      <span class="filter-label">เซล</span>
      <select class="filter-select"><option>ทุกคน</option>${REPS.map(r=>`<option>${r.name}</option>`).join("")}</select>
      <button class="btn-orange">ดูข้อมูล</button>
    </div>

    <div class="period-header" style="margin-bottom:14px">ผลงานช่วง <b>2026-06-01 – 2026-06-30</b></div>
    <div class="sum-cards">
      <div class="sum-card"><div class="sum-label">ยอดขายรวม</div><div class="sum-val sv-o">${fmtB(s.sales)}</div><div class="sum-unit">บาท</div></div>
      <div class="sum-card"><div class="sum-label">เปิดบิลรวม</div><div class="sum-val sv-g">${s.bills}</div><div class="sum-unit">บิล (ในช่วงวันที่เลือก)</div></div>
      <div class="sum-card"><div class="sum-label">แอกรวม</div><div class="sum-val">${fmt(s.chats)}</div><div class="sum-unit">ตอบช้า 12 ชม. 250 เคส</div></div>
    </div>

    <div class="section">
      <div class="sec-title">ผลงานรายคน</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr>
          <th>เซล</th><th>ลูกค้าใหม่/เก่า</th><th>แชท (ครั้ง)</th>
          <th>ตอบช้า 12 ชม.</th><th>เปิดบิล (บิล)</th><th>ยอดขาย (บาท)</th><th>สถานะ</th>
        </tr></thead>
        <tbody>${repRows}</tbody>
      </table></div>
      <div style="font-size:.74rem;color:var(--text3);margin-top:8px">count = จำนวนแอก/แชทที่ทีมกันรวมกันในช่วงระยะเวลา ไม่ใช่รายวัน</div>
    </div>

    <div class="section">
      <div class="sec-title">LEAD → เปิดบิล รายเซล</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr>
          <th>เซล</th>${wkHeaders.map(h=>`<th>${h}</th>`).join("")}
        </tr></thead>
        <tbody>${lbRows}</tbody>
      </table></div>
      <div style="font-size:.74rem;color:var(--text3);margin-top:8px">หมายเหตุ: ใช้ตัวแบ่งประมาณผลลัพธ์ตัวเลข · Lead จาก ZAAPI CustomerLabel · เปิดบิลจากข้อมูลออเดอร์จริง</div>
    </div>

    <div class="section">
      <div class="sec-title">จุดเด่นและสิ่งที่ควรติดตามรายคน</div>
      <div class="rep-cards-grid">${detailCards}</div>
      <div style="font-size:.74rem;color:var(--text3);margin-top:10px">ตาราง Lead ช่วยนี้ประมาณ ตอบช้า = จำนวนแชทที่ลูกค้าทีมได้ไม่ในช่วงเวลาตามมาตรฐาน · count = จำนวนแอก/แชทที่ทีมกันรวมกัน ไม่ใช่รายวัน</div>
      <div style="font-size:.74rem;color:var(--text3);margin-top:4px">ตาราง Lead ช่วยนี้ประมาณ Lead ช่วยนี้ประมาณ Lead ใน phase ต่อไป</div>
    </div>

    <div class="page-footer">ข้อมูลจากระบบบัญชี (Freshbooks)</div>
  `;
}

// ─── Page: สถิติแชท ───────────────────────────────────────
function renderChatStats(){
  const maxChats = Math.max(...CHAT.daily.map(d=>d.chats));
  const maxRep   = Math.max(...CHAT.byRep.map(r=>r.chats));
  const BAR_H = 80;

  const vBars = CHAT.daily.map(d=>{
    const h  = Math.max(2, Math.round(d.chats/maxChats*BAR_H));
    const hs = d.slow>0 ? Math.max(2, Math.round(d.slow/maxChats*BAR_H)) : 0;
    return `<div style="display:flex;flex-direction:column;align-items:center;flex:1;">
      <div style="width:100%;height:${BAR_H}px;display:flex;align-items:flex-end;justify-content:center;gap:3px;">
        <div style="width:18px;height:${h}px;background:var(--orange);border-radius:3px 3px 0 0;"></div>
        ${hs?`<div style="width:12px;height:${hs}px;background:var(--red);border-radius:3px 3px 0 0;"></div>`:""}
      </div>
      <div style="font-size:.68rem;color:var(--text3);white-space:nowrap;margin-top:4px;">${d.date}</div>
    </div>`;
  }).join("");

  const hBars = CHAT.byRep.map(r=>`
    <div class="hbar-row">
      <div class="hbar-label">${r.name}</div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${(r.chats/maxRep*100).toFixed(0)}%;background:${r.color}">
        <span class="hbar-val">${r.chats}</span>
      </div></div>
    </div>`).join("");

  const repTableRows = CHAT.byRep.map(r=>`<tr>
    <td><div class="rep-cell"><span class="rdot" style="background:${r.color}"></span>${r.name}</div></td>
    <td>${r.chats}</td>
    <td class="${clsSlow(r.slow)}">${r.slow}<br><small style="color:var(--text3)">${r.pct}%</small></td>
  </tr>`).join("");

  document.getElementById("page-chat-stats").innerHTML = `
    <div class="section">
      <div class="period-header">สถิติแชทคืนเอง · <b>${CHAT.period}</b></div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <button class="btn-orange">รอบประชุมล่าสุด</button>
        <button class="btn-outline">เดือนนี้</button>
        <button class="btn-outline">เลือกวันที่เอง</button>
        <select class="filter-select" style="margin-left:auto"><option>เซล ทั้งทีม</option>${REPS.map(r=>`<option>${r.name}</option>`).join("")}</select>
      </div>
      <div class="sum-cards">
        <div class="sum-card"><div class="sum-label">จำนวนแอกทั้งหมด</div><div class="sum-val">${CHAT.total}</div><div class="sum-unit">ครั้ง</div></div>
        <div class="sum-card"><div class="sum-label">ตอบช้ากัน 12 ชม.</div><div class="sum-val ${clsSlow(CHAT.slow12h)}">${CHAT.slow12h}</div><div class="sum-unit">เคส</div></div>
        <div class="sum-card"><div class="sum-label">ตอบใน 10 นาที</div><div class="sum-val" style="font-size:1.2rem;color:var(--text3)">รอเชื่อมข้อมูล</div></div>
        <div class="sum-card"><div class="sum-label">แอกที่ไม่ตอบหมายเหตุ</div><div class="sum-val" style="font-size:1.2rem;color:var(--text3)">รอเชื่อมข้อมูล</div></div>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">ยอดทักรายวัน</div>
      <div style="display:flex;align-items:flex-end;gap:4px;margin-bottom:8px;">${vBars}</div>
      <div style="display:flex;gap:12px;font-size:.76rem;color:var(--text3)">
        <span><span style="display:inline-block;width:10px;height:10px;background:var(--orange);border-radius:2px;margin-right:4px"></span>จำนวนแอก</span>
        <span><span style="display:inline-block;width:10px;height:10px;background:var(--red);border-radius:2px;margin-right:4px"></span>ตอบช้า 12 ชม.</span>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">ยอดทักรายเซล</div>
      <div class="hbar-chart">${hBars}</div>
    </div>

    <div class="section">
      <div class="sec-title">ตารางรายเซล</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th>เซล</th><th>จำนวนแอก</th><th>ตอบช้า 12 ชม. (เคส)</th></tr></thead>
        <tbody>${repTableRows}</tbody>
      </table></div>
      <div style="font-size:.74rem;color:var(--text3);margin-top:8px">% ตอบช้าเป็นข้อมูลสำรอง · ตอบใน 10 นาที และแอกที่ไม่ตอบหมายเหตุ: รอเชื่อมข้อมูล</div>
      <div style="margin-top:8px"><a href="#" class="nav-link" style="font-size:.8rem;color:var(--orange);border:none;padding:0;height:auto">ดูข้อมูลลีด / ตรวจรายเซล</a></div>
    </div>

    <div class="page-footer">ข้อมูลจาก ZAAPI CustomerChatsByAgent</div>
  `;
}

// ─── Page: ตรวจข้อมูล ─────────────────────────────────────
function renderAudit(){
  const notices = AUDIT.notices.map(n=>`
    <div class="notice-box ${n.type}">
      <span class="notice-icon">${n.icon}</span>
      <span>${n.text}</span>
    </div>`).join("");

  document.getElementById("page-audit").innerHTML = `
    <div class="audit-hero">
      <div class="audit-icon">🔍</div>
      <div>
        <div class="audit-title">ตรวจคุณภาพข้อมูล</div>
        <div class="audit-sub">สัปดาห์ ${AUDIT.wk} · อัปเดตล่าสุด ${AUDIT.updated}</div>
      </div>
      <div style="margin-left:auto">
        <span class="badge b-follow">มีข้อมูลแจ้งเตือน ${AUDIT.alerts} รายการ</span>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">รายการที่ควรตรวจ</div>
      <div style="font-size:.82rem;color:var(--text3);margin-bottom:12px">สรุปจากข้อมูลสรุปสัปดาห์ล่าสุด — เช่น จุดที่ Lead ใช้ข้อมูลสำรอง หรือมีลูกค้าที่ควรตรวจสอบเพิ่ม</div>
      ${notices}
    </div>

    <div class="section">
      <div class="sec-title">ทางลัด</div>
      <div class="shortcut-row">
        <button class="btn-outline">← ไปหน้าภาพรวม</button>
        <button class="btn-orange">โหลดข้อมูลใหม่</button>
      </div>
      <div style="font-size:.78rem;color:var(--text3);margin-top:8px">ข้อมูลโหลดมาจากสรุปสัปดาห์ล่าสุด (จำนวนเดียวเท่านั้น)</div>
    </div>

    <div class="page-footer">ข้อมูลจากระบบบัญชี · ปรับปรุงล่าสุด ${AUDIT.updated}</div>
  `;
}

// ─── Page: ผู้ดูแลระบบ ────────────────────────────────────
function renderAdmin(){
  const sysRows = ADMIN.subsystems.map(s=>`<tr>
    <td>${s.name}</td>
    <td>${statusBadge(s.status)}</td>
    <td style="color:var(--text3);font-size:.8rem">${s.note}</td>
  </tr>`).join("");

  const warnItems = ADMIN.warnings.map(w=>`<li style="margin-bottom:4px">${w}</li>`).join("");

  document.getElementById("page-admin").innerHTML = `
    <div class="section">
      <div class="sec-title">สถานะระบบ (SYSTEM STATUS)</div>
      <div class="sys-grid">
        <div class="sys-item"><div class="sys-item-label">เวอร์ชันระบบ</div><div class="sys-item-val">${ADMIN.version}</div></div>
        <div class="sys-item"><div class="sys-item-label">อัปเดตล่าสุด</div><div class="sys-item-val">${ADMIN.updated}</div></div>
        <div class="sys-item"><div class="sys-item-label">แหล่งอัปเดต</div><div class="sys-item-val">${ADMIN.source}</div></div>
        <div class="sys-item"><div class="sys-item-label">สัปดาห์หน้าเมีย</div><div class="sys-item-val">${ADMIN.nextRun}</div></div>
        <div class="sys-item"><div class="sys-item-label">สัปดาห์ล่าสุด (Weekly)</div><div class="sys-item-val">${ADMIN.latestWk}</div></div>
        <div class="sys-item"><div class="sys-item-label">เดือนล่าสุด (Monthly)</div><div class="sys-item-val">${ADMIN.latestMonth}</div></div>
        <div class="sys-item"><div class="sys-item-label">เดือนที่มีข้อมูล</div><div class="sys-item-val">${ADMIN.monthData}</div></div>
        <div class="sys-item"><div class="sys-item-label">จำนวนเซล / พร้อ (เดือนล่าสุด)</div><div class="sys-item-val">${ADMIN.repsCount}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="sec-title">สถานะระบบย่อย</div>
      <div class="tbl-wrap"><table class="dtbl">
        <thead><tr><th>ระบบย่อย</th><th>สถานะ</th><th>หมายเหตุ</th></tr></thead>
        <tbody>${sysRows}</tbody>
      </table></div>
    </div>

    <div class="section">
      <div class="sec-title">ข้อควรระวัง</div>
      <ul style="list-style:disc;padding-left:20px;font-size:.84rem;color:var(--text2);line-height:1.8">
        ${warnItems}
        <li style="color:var(--text3)">แอก/แอก/แชทที่แลกกันตามมาตรฐานยังรอตรวจสอบจาก logic ZAAPI</li>
      </ul>
    </div>

    <div class="section">
      <div class="sec-title">อัปเดตข้อมูล ZAAPI</div>
      <div style="font-size:.83rem;color:var(--text2);margin-bottom:12px">วางไฟล์ <code style="background:#f0f0ec;padding:2px 6px;border-radius:4px">zaapi.zip</code> ทับในโฟลเดอร์ ZAAPI Export แล้วกดปุ่มด้านล่างเพื่ออัปเดตข้อมูลให้เป็นปัจจุบัน</div>
      <button class="btn-orange">อัปเดตข้อมูล ZAAPI</button>
    </div>

    <div class="section">
      <div class="sec-title">ทางลัด</div>
      <div class="shortcut-row">
        <button class="btn-outline">ภาพรวม</button>
        <button class="btn-outline">ยอดขาย</button>
        <button class="btn-outline">สถิติเซล</button>
        <button class="btn-outline">ตรวจข้อมูล</button>
        <button class="btn-orange">โหลดสถานะใหม่</button>
      </div>
      <div style="font-size:.78rem;color:var(--text3);margin-top:8px">หน้านี้แสดงผลน้ำมาจากสรุปสัปดาห์ล่าสุด · ทำการทบทวน/แอก/แชทเพิ่มอีก — ดูทำการทบทวนระบบนี้ก่อน · ดูทำการทบทวน/ยืนยันระบบก่อนใช้งาน</div>
    </div>

    <div class="page-footer">ข้อมูลจากระบบบัญชี · ปรับปรุงล่าสุด ${ADMIN.updated}</div>
  `;
}

// ─── Navigation ───────────────────────────────────────────
function initNav(){
  const links = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  links.forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      links.forEach(l=>l.classList.remove("active"));
      pages.forEach(p=>p.classList.remove("active"));
      link.classList.add("active");
      const pg = document.getElementById("page-"+link.dataset.page);
      if(pg) pg.classList.add("active");
      document.getElementById("navLinks").classList.remove("open");
    });
  });

  document.getElementById("navToggle").addEventListener("click",()=>{
    document.getElementById("navLinks").classList.toggle("open");
  });
}

// ─── Init ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async ()=>{
  initNav();
  await tryLoadRealData();   // โหลด JSON จริง — ถ้าไม่มีใช้ mock ต่อ
  renderOverview(activeWk);
  renderSales();
  renderPerformance();
  renderChatStats();
  renderAudit();
  renderAdmin();
});
