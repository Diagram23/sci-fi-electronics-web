#!/bin/bash

# 🚀 SCI-FI ELECTRONICS - Setup Automático de Sanity
# Este script configura Sanity completamente en 5 minutos

echo "=========================================="
echo "🚀 SCI-FI ELECTRONICS - SANITY SETUP"
echo "=========================================="
echo ""

# Paso 1: Instalar Sanity CLI
echo "📦 [1/4] Instalando Sanity CLI..."
npm install -g @sanity/cli
echo "✅ Sanity CLI instalado"
echo ""

# Paso 2: Login
echo "🔐 [2/4] Autenticándote en Sanity..."
echo "⚠️  Se abrirá tu navegador — haz login y vuelve aquí"
sanity login
echo "✅ Autenticación completa"
echo ""

# Paso 3: Inicializar proyecto
echo "⚙️  [3/4] Inicializando proyecto..."
echo "⚠️  Selecciona 'Electrónica de ciencia ficción' cuando pregunte"
sanity init --project ugm5oqf8 --dataset production
echo "✅ Proyecto inicializado"
echo ""

# Paso 4: Levantar panel
echo "🎨 [4/4] Levantando panel de administración..."
echo "✅ Abriendo en http://localhost:3333"
echo ""
echo "=========================================="
echo "✅ SETUP COMPLETO"
echo "Panel admin: http://localhost:3333"
echo "=========================================="
npm run sanity
