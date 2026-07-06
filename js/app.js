// ===== Config =====
const REPS   = ["จุ๋ม","กรีน","ส้ม","อุ๋ม","เมย์","เบล"];
const DAYS   = ["จ.","อ.","พ.","พฤ.","ศ.","ส.","อา."];
const COLORS = ["#3b82f6","#22c55e","#f97316","#a855f7","#ec4899","#14b8a6"];

// ===== Mock Data =====
const DATA = {
  WK1: {
    label: "30 มิ.ย. – 6 ก.ค. 2569",
    leads: [
      [8,12,7,15,10,6,4],
      [6,9,11,8,13,7,3],
      [11,7,14,9,8,5,2],
      [5,13,6,12,9,8,1],
      [9,8,10,6,11,4,5],
      [7,6,9,11,7,3,2],
    ],
    bills: [
      [3,5,2,7,4,2,1],
      [2,4,5,3,6,3,1],
      [5,3,6,4,3,2,1],
      [2,6,2,5,4,3,0],
      [4,3,4,2,5,1,2],
      [3,2,4,5,3,1,0],
    ],
    sales:     [342000,287500,231000,198500,165000,120000],
    openBills: [3,2,4,1,2,3],
  },
  WK2: {
    label: "23 – 29 มิ.ย. 2569",
    leads: [
      [9,10,8,13,11,5,3],
      [7,8,10,9,12,6,2],
      [10,8,13,8,9,4,3],
      [6,12,7,11,8,7,2],
      [8,9,9,7,10,5,4],
      [6,7,8,10,8,2,1],
    ],
    bills: [
      [4,4,3,6,5,2,1],
      [3,3,5,4,5,2,1],
      [4,3,6,3,4,2,1],
      [2,5,3,5,3,2,0],
      [3,4,4,3,4,2,1],
      [2,3,3,4,3,1,0],
    ],
    sales:     [318000,265000,218000,182000,155000,112000],
    openBills: [2,3,3,2,1,4],
  },
  WK3: {
    label: "16 – 22 มิ.ย. 2569",
    leads: [
      [7,11,8,12,9,5,3],
      [5,8,10,7,11,6,2],
      [10,6,12,8,7,4,2],
      [4,11,5,10,8,6,1],
      [8,7,9,5,10,3,4],
      [6,5,8,9,6,2,1],
    ],
    bills: [
      [3,4,3,5,4,2,1],
      [2,3,4,3,5,2,1],
      [4,2,5,3,3,1,1],
      [1,5,2,4,3,2,0],
      [3,3,4,2,4,1,2],
      [2,2,3,4,2,1,0],
    ],
    sales:     [295000,242000,198000,168000,142000,98000],
    openBills: [4,2,3,3,2,2],
  },
  WK4: {
    label: "9 – 15 มิ.ย. 2569",
    leads: [
      [7,10,6,11,9,4,3],
      [5,7,9,7,10,5,2],
      [9,6,11,7,7,3,2],
      [4,10,5,9,7,5,1],
      [7,7,8,5,9,3,3],
      [5,5,7,8,6,2,1],
    ],
    bills: [
      [3,4,2,5,3,2,1],
      [2,3,4,3,4,2,1],
      [4,2,5,3,3,1,1],
      [1,4,2,4,3,2,0],
      [3,3,3,2,4,1,1],
      [2,2,3,3,2,1,0],
    ],
    sales:     [276000,228000,185000,155000,132000,89000],
    openBills: [2,3,2,4,1,3],
  },
};

const WEEKS = ["WK1","WK2","WK3","WK4"];
let activeWk = "WK1";

// ===== Helpers =====
const fmt = n => n.toLocaleString("th-TH");
const sum = arr => arr.reduce((a,b) => a+b, 0);
const pct = (a,b) => b > 0 ? ((a/b)*100).toFixed(1)+"%" : "—";

function convClass(p) {
  if (p >= 50) return "badge-hi";
  if (p >= 40) return "badge-mid";
  return "badge-lo";
}

// ===== Render summary cards =====
function renderCards(wk) {
  const d = DATA[wk];
  const totalLeads = d.leads.reduce((a,r) => a+sum(r), 0);
  const totalBills = d.bills.reduce((a,r) => a+sum(r), 0);
  const totalSales = d.sales.reduce((a,b) => a+b, 0);
  const conv = (totalBills/totalLeads*100).toFixed(1);

  document.getElementById("summaryCards").innerHTML = `
    <div class="sum-card c-blue">
      <div class="sum-label">รวมทัก (Leads)</div>
      <div class="sum-value">${fmt(totalLeads)}</div>
      <div class="sum-note">รายการทักทั้งหมดสัปดาห์นี้</div>
    </div>
    <div class="sum-card c-green">
      <div class="sum-label">รวมเปิดบิล</div>
      <div class="sum-value">${fmt(totalBills)}</div>
      <div class="sum-note">บิลที่เปิดจากลีดสัปดาห์นี้</div>
    </div>
    <div class="sum-card c-orange">
      <div class="sum-label">Conversion</div>
      <div class="sum-value">${conv}%</div>
      <div class="sum-note">อัตราเปิดบิลจากลีดทีม</div>
    </div>
    <div class="sum-card c-purple">
      <div class="sum-label">ยอดขายรวม</div>
      <div class="sum-value">${fmt(totalSales)}</div>
      <div class="sum-note">บาท — ทุกเซลรวมกัน</div>
    </div>`;
}

// ===== Render daily table (leads or bills) =====
function renderDailyTable(tableId, matrix, showConv, leadsMatrix) {
  const tbl = document.getElementById(tableId);

  // Header
  let head = `<thead><tr>
    <th>เซล</th>${DAYS.map(d=>`<th>${d}</th>`).join("")}
    <th>รวม</th>${showConv ? '<th>Conv%</th>' : ''}
  </tr></thead>`;

  // Body
  let body = "<tbody>";
  const colTotals = Array(7).fill(0);
  let grandLeads = 0, grandBills = 0;

  REPS.forEach((rep, i) => {
    const row   = matrix[i];
    const rowSum = sum(row);
    const lSum   = leadsMatrix ? sum(leadsMatrix[i]) : rowSum;
    const convVal = showConv ? (lSum > 0 ? (rowSum/lSum*100) : 0) : null;
    const convStr = showConv ? pct(rowSum, lSum) : "";
    const cClass  = showConv && convVal !== null ? convClass(convVal) : "";

    row.forEach((v,j) => colTotals[j] += v);
    if (showConv) { grandBills += rowSum; grandLeads += lSum; }

    body += `<tr>
      <td class="td-name">
        <span class="rep-dot" style="background:${COLORS[i]}"></span>${rep}
      </td>
      ${row.map(v=>`<td>${v}</td>`).join("")}
      <td><b>${rowSum}</b></td>
      ${showConv ? `<td class="${cClass}">${convStr}</td>` : ""}
    </tr>`;
  });
  body += "</tbody>";

  // Footer
  const footConv = showConv ? `<td class="${convClass(grandBills/grandLeads*100)}">${pct(grandBills,grandLeads)}</td>` : "";
  let foot = `<tfoot><tr>
    <td>รวม</td>
    ${colTotals.map(v=>`<td>${v}</td>`).join("")}
    <td>${sum(colTotals)}</td>
    ${footConv}
  </tr></tfoot>`;

  tbl.innerHTML = head + body + foot;
}

// ===== Render chat+bill comparison =====
function renderChatBill(wk) {
  const d = DATA[wk];
  const tbl = document.getElementById("chatBillTable");

  let head = `<thead><tr>
    <th>เซล</th><th>ทักรวม</th><th>เปิดบิล</th>
    <th>Conv%</th><th>ยอดขาย (บาท)</th><th>บิลค้าง</th>
  </tr></thead>`;

  let body = "<tbody>";
  let tL=0, tB=0, tS=0, tO=0;

  REPS.forEach((rep,i) => {
    const l = sum(d.leads[i]);
    const b = sum(d.bills[i]);
    const s = d.sales[i];
    const o = d.openBills[i];
    const cv = l > 0 ? (b/l*100) : 0;
    const cvStr = pct(b,l);
    const cCls  = convClass(cv);
    const oCls  = o >= 4 ? "open-high" : o >= 3 ? "open-warn" : "open-ok";
    tL+=l; tB+=b; tS+=s; tO+=o;

    const barW = Math.min(cv,100).toFixed(0);
    body += `<tr>
      <td class="td-name"><span class="rep-dot" style="background:${COLORS[i]}"></span>${rep}</td>
      <td>${l}</td><td>${b}</td>
      <td>
        <div class="conv-wrap">
          <div class="conv-bar"><div class="conv-fill" style="width:${barW}%"></div></div>
          <span class="conv-val ${cCls}">${cvStr}</span>
        </div>
      </td>
      <td>${fmt(s)}</td>
      <td><span class="rep-open-bill ${oCls}">${o} บิล</span></td>
    </tr>`;
  });
  body += "</tbody>";

  const tConv = tL > 0 ? (tB/tL*100).toFixed(1)+"%" : "—";
  let foot = `<tfoot><tr>
    <td>รวมทีม</td><td>${tL}</td><td>${tB}</td>
    <td><b>${tConv}</b></td><td>${fmt(tS)}</td>
    <td><b>${tO} บิล</b></td>
  </tr></tfoot>`;

  tbl.innerHTML = head + body + foot;
}

// ===== Render team summary =====
function renderTeam(wk) {
  const d = DATA[wk];
  const tL = d.leads.reduce((a,r) => a+sum(r), 0);
  const tB = d.bills.reduce((a,r) => a+sum(r), 0);
  const tS = d.sales.reduce((a,b) => a+b, 0);
  const tO = d.openBills.reduce((a,b) => a+b, 0);
  const cv = (tB/tL*100).toFixed(1);

  document.getElementById("teamSummary").innerHTML = `
    <div class="team-summary-row">
      <div class="team-stat">
        <div class="team-stat-label">รวมทัก</div>
        <div class="team-stat-value">${fmt(tL)}</div>
        <div class="team-stat-sub">ลีดทั้งสัปดาห์</div>
      </div>
      <div class="team-stat">
        <div class="team-stat-label">รวมเปิดบิล</div>
        <div class="team-stat-value">${fmt(tB)}</div>
        <div class="team-stat-sub">บิลที่เปิดใหม่</div>
      </div>
      <div class="team-stat">
        <div class="team-stat-label">Conv% ทีม</div>
        <div class="team-stat-value">${cv}%</div>
        <div class="team-stat-sub">อัตราปิดงาน</div>
      </div>
      <div class="team-stat">
        <div class="team-stat-label">ยอดขายรวม</div>
        <div class="team-stat-value">${fmt(tS)}</div>
        <div class="team-stat-sub">บาท</div>
      </div>
      <div class="team-stat">
        <div class="team-stat-label">บิลค้างรวม</div>
        <div class="team-stat-value">${tO}</div>
        <div class="team-stat-sub">บิลที่ยังค้างอยู่</div>
      </div>
    </div>`;
}

// ===== Render trend table =====
function renderTrend() {
  const tbl = document.getElementById("trendTable");
  let head = `<thead><tr>
    <th>สัปดาห์</th><th>ช่วงเวลา</th>
    <th>รวมทัก</th><th>รวมเปิดบิล</th><th>Conv%</th><th>เปลี่ยนแปลง</th>
  </tr></thead>`;

  let body = "<tbody>";
  let prevConv = null;

  WEEKS.forEach((wk,i) => {
    const d  = DATA[wk];
    const tL = d.leads.reduce((a,r) => a+sum(r), 0);
    const tB = d.bills.reduce((a,r) => a+sum(r), 0);
    const cv = tL > 0 ? (tB/tL*100) : 0;
    const cvStr = cv.toFixed(1)+"%";
    const isActive = wk === activeWk;

    let changeHtml = "—";
    if (prevConv !== null) {
      const diff = (cv - prevConv).toFixed(1);
      const cls  = diff >= 0 ? "trend-up" : "trend-down";
      const arrow = diff >= 0 ? "▲" : "▼";
      changeHtml = `<span class="${cls}">${arrow} ${Math.abs(diff)}%</span>`;
    }
    prevConv = cv;

    const style = isActive ? ' style="background:#eff6ff;font-weight:700;"' : '';
    body += `<tr${style}>
      <td>${wk}${isActive ? ' <span style="font-size:.7rem;background:#3b82f6;color:#fff;padding:1px 6px;border-radius:20px;font-weight:600;">ปัจจุบัน</span>' : ''}</td>
      <td>${d.label}</td>
      <td>${fmt(tL)}</td>
      <td>${fmt(tB)}</td>
      <td>${cvStr}</td>
      <td>${changeHtml}</td>
    </tr>`;
  });
  body += "</tbody>";
  tbl.innerHTML = head + body;
}

// ===== Render rep cards =====
function renderRepCards(wk) {
  const d = DATA[wk];
  let html = "";

  REPS.forEach((rep,i) => {
    const l  = sum(d.leads[i]);
    const b  = sum(d.bills[i]);
    const s  = d.sales[i];
    const o  = d.openBills[i];
    const cv = l > 0 ? (b/l*100) : 0;
    const cvStr = pct(b,l);
    const cCls  = convClass(cv);
    const oCls  = o >= 4 ? "open-high" : o >= 3 ? "open-warn" : "open-ok";
    const initial = rep.charAt(0);

    html += `
      <div class="rep-card">
        <div class="rep-card-header" style="background:${COLORS[i]}">
          <div class="rep-card-avatar">${initial}</div>
          <span>${rep}</span>
        </div>
        <div class="rep-card-body">
          <div class="rep-row">
            <span class="rep-row-label">ทัก (Leads)</span>
            <span class="rep-row-value">${l}</span>
          </div>
          <div class="rep-row">
            <span class="rep-row-label">เปิดบิล</span>
            <span class="rep-row-value">${b}</span>
          </div>
          <div class="rep-row">
            <span class="rep-row-label">Conversion</span>
            <span class="rep-row-value ${cCls}">${cvStr}</span>
          </div>
          <div class="rep-row">
            <span class="rep-row-label">ยอดขาย</span>
            <span class="rep-row-value val-green">${fmt(s)} ฿</span>
          </div>
          <div class="rep-row">
            <span class="rep-row-label">บิลค้าง</span>
            <span class="rep-open-bill ${oCls}">${o} บิล</span>
          </div>
        </div>
      </div>`;
  });

  document.getElementById("repCards").innerHTML = html;
}

// ===== Render latest summary =====
function renderLatestSummary(wk) {
  const d    = DATA[wk];
  const prev = DATA[WEEKS[WEEKS.indexOf(wk)+1]] || null;
  const tS   = d.sales.reduce((a,b) => a+b, 0);
  const tL   = d.leads.reduce((a,r) => a+sum(r), 0);
  const tB   = d.bills.reduce((a,r) => a+sum(r), 0);
  const tO   = d.openBills.reduce((a,b) => a+b, 0);
  const cv   = (tB/tL*100).toFixed(1);

  let salesCmp = "";
  if (prev) {
    const pS   = prev.sales.reduce((a,b) => a+b, 0);
    const diff = (((tS-pS)/pS)*100).toFixed(1);
    const cls  = diff >= 0 ? "cmp-up" : "cmp-down";
    const arrow = diff >= 0 ? "+" : "";
    salesCmp = `<span class="latest-compare ${cls}">${arrow}${diff}%</span>`;
  }

  document.getElementById("latestSummary").innerHTML = `
    <div class="latest-list">
      <div class="latest-item">
        <span class="latest-label">ยอดขายสัปดาห์นี้</span>
        <span class="latest-val">${fmt(tS)} ฿ ${salesCmp}</span>
      </div>
      <div class="latest-item">
        <span class="latest-label">รวมทัก</span>
        <span class="latest-val">${fmt(tL)} ครั้ง</span>
      </div>
      <div class="latest-item">
        <span class="latest-label">รวมเปิดบิล</span>
        <span class="latest-val">${fmt(tB)} บิล</span>
      </div>
      <div class="latest-item">
        <span class="latest-label">Conv% ทีม</span>
        <span class="latest-val">${cv}%</span>
      </div>
      <div class="latest-item">
        <span class="latest-label">บิลค้างรวม</span>
        <span class="latest-val">${tO} บิล</span>
      </div>
    </div>`;
}

// ===== Render watchlist =====
function renderWatchList(wk) {
  const d = DATA[wk];
  const items = [];

  // Conv alerts per rep
  REPS.forEach((rep,i) => {
    const l  = sum(d.leads[i]);
    const b  = sum(d.bills[i]);
    const cv = l > 0 ? (b/l*100) : 0;
    const o  = d.openBills[i];

    if (cv < 40) {
      items.push({ type:"alert", icon:"🔴", text:`<b>${rep}</b> — Conv ต่ำ ${cv.toFixed(1)}% (ต่ำกว่าเกณฑ์ทีม)` });
    }
    if (o >= 4) {
      items.push({ type:"alert", icon:"🔴", text:`<b>${rep}</b> — บิลค้างสูง ${o} บิล` });
    } else if (o >= 3) {
      items.push({ type:"warn", icon:"🟡", text:`<b>${rep}</b> — บิลค้าง ${o} บิล` });
    }
  });

  // Best performer
  const bestIdx = d.sales.indexOf(Math.max(...d.sales));
  const bestL   = sum(d.leads[bestIdx]);
  const bestB   = sum(d.bills[bestIdx]);
  const bestCv  = (bestB/bestL*100).toFixed(1);
  items.push({ type:"good", icon:"🟢", text:`<b>${REPS[bestIdx]}</b> — ยอดขายสูงสุด ฿${fmt(d.sales[bestIdx])} · Conv ${bestCv}%` });

  // Day with highest leads
  const dailyTotal = DAYS.map((_,j) =>
    d.leads.reduce((a,row) => a+row[j], 0)
  );
  const maxDay = dailyTotal.indexOf(Math.max(...dailyTotal));
  items.push({ type:"info", icon:"📅", text:`วัน<b>${DAYS[maxDay]}</b> ทักสูงสุดสัปดาห์นี้ รวม ${dailyTotal[maxDay]} ครั้ง` });

  const html = items.map(it =>
    `<div class="watch-item ${it.type}">
      <span class="watch-icon">${it.icon}</span>
      <span class="watch-text">${it.text}</span>
    </div>`
  ).join("");

  document.getElementById("watchList").innerHTML = `<div class="watch-list">${html}</div>`;
}

// ===== Render everything for a week =====
function renderAll(wk) {
  const d = DATA[wk];
  document.getElementById("periodLabel").textContent = d.label;

  renderCards(wk);
  renderDailyTable("leadsTable", d.leads, false, null);
  renderDailyTable("billsTable", d.bills, true,  d.leads);
  renderChatBill(wk);
  renderTeam(wk);
  renderTrend();
  renderRepCards(wk);
  renderLatestSummary(wk);
  renderWatchList(wk);
}

// ===== Navigation =====
function initNav() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      link.classList.add("active");
      document.getElementById("page-" + link.dataset.page)?.classList.add("active");
      // close mobile menu
      document.getElementById("navMenu").classList.remove("open");
    });
  });

  document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("open");
  });
}

// ===== Week tabs =====
function initWeekTabs() {
  document.getElementById("weekTabs").addEventListener("click", e => {
    const btn = e.target.closest(".wk-tab");
    if (!btn) return;
    document.querySelectorAll(".wk-tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    activeWk = btn.dataset.wk;
    renderAll(activeWk);
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initWeekTabs();
  renderAll(activeWk);
});
