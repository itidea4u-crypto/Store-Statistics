param(
    [string]$ZaapiDir = "C:\Users\LENOVO\AppData\Local\Temp\claude\zaapi_extract\zaapi",
    [string]$OutPath  = "$PSScriptRoot\..\data\zaapi.json"
)

# ---- ค่าคงที่ ----
$ValidReps = @("จุ๋ม","กรีน","ส้ม","อุ๋ม","เมย์","เบล")
$RepMap = @{}
$RepMap["อุ๋ม อารีรัตน์"] = "อุ๋ม"
$RepMap["เบลล์"]           = "เบล"

# Thai month abbr -> month number
$ThaiMonth = @{}
$ThaiMonth["ม.ค."]  = 1
$ThaiMonth["ก.พ."]  = 2
$ThaiMonth["มี.ค."] = 3
$ThaiMonth["เม.ย."] = 4
$ThaiMonth["พ.ค."]  = 5
$ThaiMonth["มิ.ย."] = 6
$ThaiMonth["ก.ค."]  = 7
$ThaiMonth["ส.ค."]  = 8
$ThaiMonth["ก.ย."]  = 9
$ThaiMonth["ต.ค."]  = 10
$ThaiMonth["พ.ย."]  = 11
$ThaiMonth["ธ.ค."]  = 12

function Get-CanonicalRep($name) {
    if ($script:RepMap.ContainsKey($name)) { return $script:RepMap[$name] }
    return $name
}

# แปลง "01 มิ.ย." -> "2026-06-01"  (ถ้าไม่ใช่มิ.ย. return $null)
function Parse-ThaiDateJune($s) {
    $s = $s.Trim()
    if ($s -match "^(\d{2})\s+(.+)$") {
        $day = [int]$Matches[1]
        $mon = $Matches[2].Trim()
        if ($script:ThaiMonth.ContainsKey($mon) -and $script:ThaiMonth[$mon] -eq 6) {
            return "2026-06-{0:D2}" -f $day
        }
    }
    return $null
}

# อ่าน ChatsByAgent / 12HrMissedByAgent  
# format: วันที่,AI Agent,Admin manager,กรีน,จุ๋ม,เบล,เมย์,ส้ม,อุ๋ม อารีรัตน์,จำนวนเงิน
function Read-AgentDailyFile($path, [hashtable]$target) {
    $lines = Get-Content $path -Encoding UTF8
    if ($lines.Count -lt 2) { return }
    $headers = ($lines[0] -split ",") | ForEach-Object { $_.Trim() }

    # build col index -> canonical rep name
    $colRep = @{}
    for ($c = 0; $c -lt $headers.Count; $c++) {
        $h = $headers[$c]
        if ($script:RepMap.ContainsKey($h)) { $h = $script:RepMap[$h] }
        if ($script:ValidReps -contains $h) { $colRep[$c] = $h }
    }

    for ($i = 1; $i -lt $lines.Count; $i++) {
        $line = $lines[$i].Trim()
        if ($line -eq "") { continue }
        $parts = $line -split ","
        $dateStr = Parse-ThaiDateJune $parts[0]
        if ($dateStr -eq $null) { continue }   # ข้ามวันที่ไม่ใช่มิ.ย.

        if (-not $target.ContainsKey($dateStr)) { $target[$dateStr] = @{} }
        foreach ($c in $colRep.Keys) {
            $rep = $colRep[$c]
            $val = 0
            if ($c -lt $parts.Count) {
                $v = $parts[$c].Trim()
                if ($v -match "^\d+$") { $val = [int]$v }
            }
            $target[$dateStr][$rep] = $val   # later file overwrites earlier
        }
    }
}

# อ่าน CustomerLabel
# format: แท็ก,2026-06-01,2026-06-02,...,จำนวนเงิน
function Read-CustomerLabelFile($path, [hashtable]$target) {
    $lines = Get-Content $path -Encoding UTF8
    if ($lines.Count -lt 2) { return }
    $headers = ($lines[0] -split ",") | ForEach-Object { $_.Trim() }

    # find date columns (only June 2026)
    $colDate = @{}
    for ($c = 1; $c -lt $headers.Count; $c++) {
        if ($headers[$c] -match "^2026-06-(\d{2})$") {
            $colDate[$c] = $headers[$c]
        }
    }
    if ($colDate.Count -eq 0) { return }

    for ($i = 1; $i -lt $lines.Count; $i++) {
        $line = $lines[$i].Trim()
        if ($line -eq "") { continue }
        $parts = $line -split ","
        $tag = $parts[0].Trim()
        if ($script:RepMap.ContainsKey($tag)) { $tag = $script:RepMap[$tag] }
        if ($script:ValidReps -notcontains $tag) { continue }

        foreach ($c in $colDate.Keys) {
            $dateStr = $colDate[$c]
            if (-not $target.ContainsKey($dateStr)) { $target[$dateStr] = @{} }
            $val = 0
            if ($c -lt $parts.Count) {
                $v = $parts[$c].Trim()
                if ($v -match "^\d+$") { $val = [int]$v }
            }
            $target[$dateStr][$tag] = $val
        }
    }
}

# ---- ประมวลผล ----
$chats    = @{}
$missed12h= @{}
$leads    = @{}

Write-Host "อ่านข้อมูลแชทรายวัน..."
$chatFiles = @(
    "CustomerChatsByAgent_data_points (6).csv",
    "CustomerChatsByAgent_data_points (7).csv",
    "CustomerChatsByAgent_data_points (8).csv",
    "CustomerChatsByAgent_data_points (9).csv",
    "CustomerChatsByAgent_data_points (10).csv"
)
foreach ($f in $chatFiles) {
    $fp = Join-Path $ZaapiDir $f
    if (Test-Path $fp) { Read-AgentDailyFile $fp $chats; Write-Host "  OK: $f" }
    else { Write-Host "  MISSING: $f" }
}

Write-Host "อ่านข้อมูลตอบช้า 12 ชม..."
$missedFiles = @(
    "12HrMissedChatsByAgent_data_points (6).csv",
    "12HrMissedChatsByAgent_data_points (7).csv",
    "12HrMissedChatsByAgent_data_points (8).csv",
    "12HrMissedChatsByAgent_data_points (9).csv",
    "12HrMissedChatsByAgent_data_points (10).csv"
)
foreach ($f in $missedFiles) {
    $fp = Join-Path $ZaapiDir $f
    if (Test-Path $fp) { Read-AgentDailyFile $fp $missed12h; Write-Host "  OK: $f" }
    else { Write-Host "  MISSING: $f" }
}

Write-Host "อ่านข้อมูล Lead (CustomerLabel)..."
$leadFiles = @(
    "CustomerLabel_data_points_08_06_2026 (6).csv",
    "CustomerLabel_data_points_09_06_2026.csv",
    "CustomerLabel_data_points_16_06_2026.csv",
    "CustomerLabel_data_points_22_06_2026.csv",
    "CustomerLabel_data_points_29_06_2026.csv"
)
foreach ($f in $leadFiles) {
    $fp = Join-Path $ZaapiDir $f
    if (Test-Path $fp) { Read-CustomerLabelFile $fp $leads; Write-Host "  OK: $f ($($leads.Count) dates so far)" }
    else { Write-Host "  MISSING: $f" }
}

# ---- เขียนไฟล์ ----
$out = [ordered]@{
    generated      = (Get-Date -Format "yyyy-MM-dd")
    source         = "zaapi.zip"
    month          = "มิถุนายน 2569"
    chatsByDay     = $chats
    missed12hByDay = $missed12h
    leadsByDay     = $leads
}

$outDir = Split-Path $OutPath -Parent
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
$json = $out | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($OutPath, $json, (New-Object System.Text.UTF8Encoding($true)))
Write-Host ""
Write-Host "เขียนไฟล์: $OutPath"

# ---- สรุปตรวจสอบ ----
Write-Host ""
Write-Host "=== วันที่มีข้อมูล ==="
Write-Host "แชท: $($chats.Count) วัน  ($($chats.Keys | Sort-Object | Select-Object -First 1) -> $($chats.Keys | Sort-Object | Select-Object -Last 1))"
Write-Host "ตอบช้า: $($missed12h.Count) วัน"
Write-Host "Lead: $($leads.Count) วัน  ($($leads.Keys | Sort-Object | Select-Object -First 1) -> $($leads.Keys | Sort-Object | Select-Object -Last 1))"

Write-Host ""
Write-Host "=== ยอดรายสัปดาห์ (แชท + Lead + ตอบช้า) ==="
$wkRanges = @{
    "WK1" = @{ from="2026-06-01"; to="2026-06-07" }
    "WK2" = @{ from="2026-06-08"; to="2026-06-15" }
    "WK3" = @{ from="2026-06-16"; to="2026-06-23" }
    "WK4" = @{ from="2026-06-24"; to="2026-06-30" }
}

foreach ($wk in @("WK1","WK2","WK3","WK4")) {
    $r = $wkRanges[$wk]
    $wkChats = 0; $wkMiss = 0; $wkLeads = 0
    foreach ($d in $chats.Keys) {
        if ($d -ge $r.from -and $d -le $r.to) {
            foreach ($rep in $chats[$d].Keys) { $wkChats += $chats[$d][$rep] }
        }
    }
    foreach ($d in $missed12h.Keys) {
        if ($d -ge $r.from -and $d -le $r.to) {
            foreach ($rep in $missed12h[$d].Keys) { $wkMiss += $missed12h[$d][$rep] }
        }
    }
    foreach ($d in $leads.Keys) {
        if ($d -ge $r.from -and $d -le $r.to) {
            foreach ($rep in $leads[$d].Keys) { $wkLeads += $leads[$d][$rep] }
        }
    }
    Write-Host "${wk}: แชทรวม=$wkChats  ตอบช้า=$wkMiss  Lead=$wkLeads"
}