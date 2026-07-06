param(
    [string]$ExcelPath = "C:\Users\LENOVO\Downloads\ยอดขาย 2569.xlsx",
    [string]$Month     = "มิถุนายน 26",
    [string]$OutPath   = "$PSScriptRoot\..\data\sales.json"
)

$RepMap = @{}
$RepMap["เบลล์"] = "เบล"
$RepMap["จุ๋ม"]  = "จุ๋ม"
$RepMap["กรีน"]  = "กรีน"
$RepMap["ส้ม"]   = "ส้ม"
$RepMap["อุ๋ม"]   = "อุ๋ม"
$RepMap["เมย์"]  = "เมย์"
$ValidReps = @("จุ๋ม","กรีน","ส้ม","อุ๋ม","เมย์","เบล")

$CWK=2; $CDay=3; $CSale=4; $CAmt=6; $COpen=7; $CClose=8
$CPSuay=9; $CPIdea=10; $CPFarm=11; $CPMetal=12; $COld=13; $CNew=14

Write-Host "Opening Excel..."
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$byWkBySale  = @{}
$byDayBySale = @{}
$wkDayMap    = @{}

try {
    $wb = $excel.Workbooks.Open($ExcelPath)
    $sh = $wb.Sheets.Item($Month)
    $totalRows = 0; $skipped = 0

    for ($r = 4; $r -le 1500; $r++) {
        $wk = $sh.Cells.Item($r, $CWK).Text.Trim()
        if ($wk -eq "") { continue }
        if ($wk -notmatch "^WK\d+$") { continue }

        $rep = $sh.Cells.Item($r, $CSale).Text.Trim()
        if ($rep -eq "") { continue }
        if ($RepMap.ContainsKey($rep)) { $rep = $RepMap[$rep] }
        if ($ValidReps -notcontains $rep) { $skipped++; continue }

        $dayVal = $sh.Cells.Item($r, $CDay).Value2
        if ($dayVal -eq $null) { continue }
        $day = [int]$dayVal
        $dayKey = [string]$day

        $amtVal = $sh.Cells.Item($r, $CAmt).Value2
        $amt = if ($amtVal -ne $null) { [double]$amtVal } else { 0.0 }

        $open   = if ($sh.Cells.Item($r, $COpen).Text.Trim()   -eq "1") { 1 } else { 0 }
        $close  = if ($sh.Cells.Item($r, $CClose).Text.Trim()  -eq "1") { 1 } else { 0 }
        $pSuay  = if ($sh.Cells.Item($r, $CPSuay).Text.Trim()  -eq "1") { 1 } else { 0 }
        $pIdea  = if ($sh.Cells.Item($r, $CPIdea).Text.Trim()  -eq "1") { 1 } else { 0 }
        $pFarm  = if ($sh.Cells.Item($r, $CPFarm).Text.Trim()  -eq "1") { 1 } else { 0 }
        $pMetal = if ($sh.Cells.Item($r, $CPMetal).Text.Trim() -eq "1") { 1 } else { 0 }
        $oldC   = if ($sh.Cells.Item($r, $COld).Text.Trim()    -eq "1") { 1 } else { 0 }
        $newC   = if ($sh.Cells.Item($r, $CNew).Text.Trim()    -eq "1") { 1 } else { 0 }

        if (-not $byWkBySale.ContainsKey($wk))      { $byWkBySale[$wk] = @{} }
        if (-not $byWkBySale[$wk].ContainsKey($rep)) {
            $byWkBySale[$wk][$rep] = @{ sales=0.0; open=0; close=0; pSuay=0; pIdea=0; pFarm=0; pMetal=0; oldCust=0; newCust=0 }
        }
        $byWkBySale[$wk][$rep]["sales"]   += $amt
        $byWkBySale[$wk][$rep]["open"]    += $open
        $byWkBySale[$wk][$rep]["close"]   += $close
        $byWkBySale[$wk][$rep]["pSuay"]   += $pSuay
        $byWkBySale[$wk][$rep]["pIdea"]   += $pIdea
        $byWkBySale[$wk][$rep]["pFarm"]   += $pFarm
        $byWkBySale[$wk][$rep]["pMetal"]  += $pMetal
        $byWkBySale[$wk][$rep]["oldCust"] += $oldC
        $byWkBySale[$wk][$rep]["newCust"] += $newC

        if (-not $byDayBySale.ContainsKey($dayKey))       { $byDayBySale[$dayKey] = @{} }
        if (-not $byDayBySale[$dayKey].ContainsKey($rep))  {
            $byDayBySale[$dayKey][$rep] = @{ sales=0.0; open=0; close=0 }
        }
        $byDayBySale[$dayKey][$rep]["sales"] += $amt
        $byDayBySale[$dayKey][$rep]["open"]  += $open
        $byDayBySale[$dayKey][$rep]["close"] += $close

        if (-not $wkDayMap.ContainsKey($wk)) { $wkDayMap[$wk] = @() }
        if ($wkDayMap[$wk] -notcontains $day) { $wkDayMap[$wk] += $day }

        $totalRows++
    }
    $wb.Close($false)
    Write-Host "Read rows: $totalRows  skipped (non-sales): $skipped"
} finally {
    $excel.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
}

$weeks = @{}
foreach ($wk in ($wkDayMap.Keys | Sort-Object)) {
    $days = $wkDayMap[$wk] | Sort-Object
    $min = $days[0]; $max = $days[-1]
    $weeks[$wk] = @{ label = "${min}/6 - ${max}/6"; days = @($days) }
}

$out = [ordered]@{
    generated   = (Get-Date -Format "yyyy-MM-dd")
    source      = "ยอดขาย 2569.xlsx"
    sheet       = $Month
    month       = "มิถุนายน 2569"
    weeks       = $weeks
    byWkBySale  = $byWkBySale
    byDayBySale = $byDayBySale
}

$outDir = Split-Path $OutPath -Parent
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
$json = $out | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($OutPath, $json, (New-Object System.Text.UTF8Encoding($true)))
Write-Host "Written: $OutPath"

Write-Host ""
Write-Host "=== TOTALS ==="
$grand = 0.0; $gOpen = 0; $gClose = 0
foreach ($wk in ($byWkBySale.Keys | Sort-Object)) {
    $ws = 0.0; $wo = 0; $wc = 0
    foreach ($rep in $byWkBySale[$wk].Keys) {
        $ws += $byWkBySale[$wk][$rep]["sales"]
        $wo += $byWkBySale[$wk][$rep]["open"]
        $wc += $byWkBySale[$wk][$rep]["close"]
    }
    $wsF = "{0:N0}" -f $ws
    Write-Host "${wk}: sales=$wsF  open=$wo  close=$wc"
    $grand += $ws; $gOpen += $wo; $gClose += $wc
}
$grandF = "{0:N0}" -f $grand
Write-Host "TOTAL: sales=$grandF  open=$gOpen  close=$gClose"