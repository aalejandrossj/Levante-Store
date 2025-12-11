#!/bin/bash

# Script para probar la API de Saúl MCP Store
# Uso: ./test-api.sh [URL_BASE]

BASE_URL="${1:-http://localhost:5173}"
API_URL="${BASE_URL}/api"

echo "🧪 Testing Saúl MCP Store API"
echo "================================"
echo "Base URL: $API_URL"
echo ""

# Test 1: Listado completo
echo "1️⃣  GET /api/mcps.json"
echo "---"
curl -s "${API_URL}/mcps.json" | jq -r '.provider.name, "Servers: \(.servers | length)"'
echo ""

# Test 2: Headers HTTP
echo "2️⃣  Headers Check"
echo "---"
curl -I -s "${API_URL}/mcps.json" | grep -E "(cache-control|access-control|content-type)"
echo ""

# Test 3: Servidor específico
echo "3️⃣  GET /api/mcps/context7"
echo "---"
curl -s "${API_URL}/mcps/context7" | jq -r '"\(.name) - \(.description)"'
echo ""

# Test 4: Todos los servidores (resumen)
echo "4️⃣  All Servers Summary"
echo "---"
curl -s "${API_URL}/mcps.json" | jq -r '.servers[] | "[\(.category)] \(.name) - transport: \(.transport)"'
echo ""

# Test 5: Error 404
echo "5️⃣  404 Test (nonexistent server)"
echo "---"
curl -s "${API_URL}/mcps/nonexistent" | jq .
echo ""

# Test 6: Servidor con múltiples env vars
echo "6️⃣  GET /api/mcps/supabase (múltiples env vars)"
echo "---"
curl -s "${API_URL}/mcps/supabase" | jq -r '.env | keys[]'
echo ""

echo "✅ Tests completados!"
