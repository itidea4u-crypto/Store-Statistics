// ===== Mock Data =====
const MOCK_SUMMARY = {
  totalLeads:      142,
  openBills:       18,
  conversionRate:  63.4,   // percent
  totalSales:      1_284_500,
};

const MOCK_SALES_REPS = [
  { name: "ทิตารัตน์",  leads: 38, closed: 25, sales: 342_000, active: true  },
  { name: "สมหญิง",    leads: 31, closed: 21, sales: 287_500, active: true  },
  { name: "กัญญา",     leads: 27, closed: 16, sales: 231_000, active: true  },
  { name: "วาสนา",     leads: 22, closed: 14, sales: 198_500, active: true  },
  { name: "รัตนา",     leads: 15, closed:  9, sales: 145_000, active: false },
  { name: "นิตยา",     leads:  9, closed:  5, sales:  80_500, active: true  },
];

// ===== Helpers =====
function formatNumber(n) {
  return n.toLocaleString("th-TH");
}

function formatDate(d) {
  return d.toLocaleDateString("th-TH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ===== Render Summary Cards =====
function renderSummary(data) {
  document.getElementById("total-leads").textContent      = formatNumber(data.totalLeads);
  document.getElementById("open-bills").textContent       = formatNumber(data.openBills);
  document.getElementById("conversion-rate").textContent  = data.conversionRate.toFixed(1) + "%";
  document.getElementById("total-sales").textContent      = formatNumber(data.totalSales);
  document.getElementById("last-updated").textContent     = formatDate(new Date());
}

// ===== Render Sales Rep Table =====
function renderSalesTable(reps) {
  const tbody = document.getElementById("sales-tbody");

  const sorted = [...reps].sort((a, b) => b.sales - a.sales);

  tbody.innerHTML = sorted.map((rep, i) => {
    const conv = rep.leads > 0 ? ((rep.closed / rep.leads) * 100) : 0;
    const statusClass = rep.active ? "status-active" : "status-inactive";
    const statusText  = rep.active ? "Active" : "Inactive";
    const barWidth    = Math.min(conv, 100).toFixed(0);

    return `
      <tr>
        <td class="rank">${i + 1}</td>
        <td class="rep-name">${rep.name}</td>
        <td>${formatNumber(rep.leads)}</td>
        <td>${formatNumber(rep.closed)}</td>
        <td>
          <div class="conv-bar-wrap">
            <div class="conv-bar">
              <div class="conv-bar-fill" style="width:${barWidth}%"></div>
            </div>
            <span class="conv-pct">${conv.toFixed(1)}%</span>
          </div>
        </td>
        <td>${formatNumber(rep.sales)}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      </tr>`;
  }).join("");
}

// ===== Init =====
function init() {
  renderSummary(MOCK_SUMMARY);
  renderSalesTable(MOCK_SALES_REPS);
}

document.addEventListener("DOMContentLoaded", init);
