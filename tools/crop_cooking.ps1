# 料理図鑑画像の切り出し(ゲーム画面スクショ 1334x768 前提)
# 右パネルの料理を背景色との差で検出し、料理の中心を基準に「長辺+上下左右20px余白」の正方形で切り出す。
# 使い方: .\crop_cooking.ps1 -Source <スクショ.png> -Name <料理名>
param(
  [Parameter(Mandatory)] [string]$Source,
  [Parameter(Mandatory)] [string]$Name,
  [string]$OutDir = (Join-Path $PSScriptRoot '..\img\cooking'),
  [int]$Margin = 20,
  [int]$Threshold = 40
)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($Source)
try {
  # 右側の矢印ボタンは別の塊として除外する(スクショ幅で位置が変わるため、最長の連続列=料理を採用)
  $x0 = 700; $x1 = [Math]::Min($bmp.Width - 1, 1300); $y0 = 180; $y1 = 600
  $bg = $bmp.GetPixel($x0, $y0)
  $isFg = { param($p) ([Math]::Abs($p.R - $bg.R) + [Math]::Abs($p.G - $bg.G) + [Math]::Abs($p.B - $bg.B)) -gt $Threshold }
  $colHas = New-Object bool[] ($x1 + 1)
  for ($x = $x0; $x -lt $x1; $x++) {
    for ($y = $y0; $y -lt $y1; $y++) { if (& $isFg $bmp.GetPixel($x, $y)) { $colHas[$x] = $true; break } }
  }
  $bestS = -1; $bestE = -1; $s = -1; $gap = 0
  for ($x = $x0; $x -le $x1; $x++) {
    if ($x -lt $x1 -and $colHas[$x]) { if ($s -lt 0) { $s = $x }; $e = $x; $gap = 0 }
    elseif ($s -ge 0) {
      $gap++
      if ($gap -gt 8 -or $x -eq $x1) { if (($e - $s) -gt ($bestE - $bestS)) { $bestS = $s; $bestE = $e }; $s = -1; $gap = 0 }
    }
  }
  if ($bestS -lt 0) { throw "料理を検出できませんでした: $Source" }
  $minX = $bestS; $maxX = $bestE; $minY = [int]::MaxValue; $maxY = -1
  for ($y = $y0; $y -lt $y1; $y++) {
    for ($x = $minX; $x -le $maxX; $x++) {
      if (& $isFg $bmp.GetPixel($x, $y)) { if ($y -lt $minY) { $minY = $y }; $maxY = $y; break }
    }
  }
  $side = [Math]::Max($maxX - $minX + 1, $maxY - $minY + 1) + 2 * $Margin
  $left = [int][Math]::Round(($minX + $maxX) / 2 - $side / 2)
  $top = [int][Math]::Round(($minY + $maxY) / 2 - $side / 2)
  $dst = New-Object System.Drawing.Bitmap $side, $side
  $g = [System.Drawing.Graphics]::FromImage($dst)
  $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle 0, 0, $side, $side), (New-Object System.Drawing.Rectangle $left, $top, $side, $side), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  # 同名ファイルへの直接保存はGDI+エラーになり得るため一時ファイル経由
  $tmp = [System.IO.Path]::GetTempFileName() + '.png'
  $dst.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png); $dst.Dispose()
  Copy-Item $tmp (Join-Path $OutDir "$Name.png") -Force; Remove-Item $tmp
  "{0}: {1}x{1} 余白 L={2} R={3} T={4} B={5}" -f $Name, $side, ($minX - $left), ($left + $side - 1 - $maxX), ($minY - $top), ($top + $side - 1 - $maxY)
} finally { $bmp.Dispose() }
