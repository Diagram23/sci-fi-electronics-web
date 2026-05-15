@echo off
REM 🚀 SCI-FI ELECTRONICS - Setup Automático de Sanity (Windows)

echo ==========================================
echo 🚀 SCI-FI ELECTRONICS - SANITY SETUP
echo ==========================================
echo.

REM Paso 1: Instalar Sanity CLI
echo 📦 [1/4] Instalando Sanity CLI...
call npm install -g @sanity/cli
echo ✅ Sanity CLI instalado
echo.

REM Paso 2: Login
echo 🔐 [2/4] Autenticándote en Sanity...
echo ⚠️  Se abrirá tu navegador — haz login y vuelve aquí
call sanity login
echo ✅ Autenticación completa
echo.

REM Paso 3: Inicializar proyecto
echo ⚙️  [3/4] Inicializando proyecto...
echo ⚠️  Selecciona 'Electrónica de ciencia ficción' cuando pregunte
call sanity init --project ugm5oqf8 --dataset production
echo ✅ Proyecto inicializado
echo.

REM Paso 4: Levantar panel
echo 🎨 [4/4] Levantando panel de administración...
echo ✅ Abriendo en http://localhost:3333
echo.
echo ==========================================
echo ✅ SETUP COMPLETO
echo Panel admin: http://localhost:3333
echo ==========================================
call npm run sanity
