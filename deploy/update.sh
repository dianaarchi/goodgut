#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# goodgut — deploy updates to the server
# Run on the server as goodgut after pushing commits:
#   ssh -i ~/.ssh/id_ed25519 goodgut@78.47.89.123
#   cd ~/goodgut && bash deploy/update.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SERVICE_NAME="goodgut"

echo "──────────────────────────────────────────"
echo " goodgut update — $(date)"
echo "──────────────────────────────────────────"

echo "[1/4] Pulling latest code..."
git pull origin main

echo "[2/4] Installing dependencies..."
npm install --omit=dev

echo "[3/4] Restarting service..."
sudo systemctl restart "${SERVICE_NAME}"

echo "[4/4] Checking status..."
systemctl status "${SERVICE_NAME}" --no-pager

echo ""
echo " Update complete. Tail logs with:"
echo "   journalctl -u ${SERVICE_NAME} -f"
echo ""
