$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:3333/")
$listener.Start()
Write-Host "Serving at http://localhost:3333/"
$root = $PSScriptRoot
$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".ico"  = "image/x-icon"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = $ctx.Request.Url.LocalPath -replace "^/", ""
  if ($path -eq "" -or $path -eq "/") { $path = "index.html" }
  $file = Join-Path $root $path
  if (Test-Path $file -PathType Leaf) {
    $ext  = [System.IO.Path]::GetExtension($file)
    $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = $mime
    $ctx.Response.StatusCode  = 200
    $ctx.Response.SendChunked = $true
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $ctx.Response.StatusCode  = 404
    $ctx.Response.ContentType = "text/plain"
    $ctx.Response.SendChunked = $true
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.OutputStream.Close()
}
