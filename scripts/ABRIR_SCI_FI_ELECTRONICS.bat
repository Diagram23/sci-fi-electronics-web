@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js no esta disponible. Instala Node.js o abre esta carpeta con un servidor local.
  pause
  exit /b 1
)
node "%~dp0server.mjs" "%~dp0" 5179
endlocal
