#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# goodgut — first-time server provisioning
# Run as root on a fresh Hetzner Ubuntu 24.04 server:
#   ssh -i ~/.ssh/id_ed25519 root@78.47.89.123
#   bash /root/setup.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_SSH_URL="git@github.com:dianaarchi/goodgut.git"
APP_USER="goodgut"
APP_DIR="/home/${APP_USER}/goodgut"
SERVICE_NAME="goodgut"

echo "──────────────────────────────────────────"
echo " goodgut setup — $(date)"
echo "──────────────────────────────────────────"

# 1. System update
echo "[1/9] Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq

# 2. Install Node.js 20 via NodeSource
echo "[2/9] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
echo "  node $(node --version), npm $(npm --version)"

# 3. Create app user
echo "[3/9] Creating '${APP_USER}' user..."
if id "${APP_USER}" &>/dev/null; then
  echo "  User '${APP_USER}' already exists, skipping."
else
  useradd -m -s /bin/bash "${APP_USER}"
fi

# 4. Copy SSH authorized_keys so you can login as goodgut directly
echo "[4/9] Copying SSH authorized_keys to ${APP_USER}..."
mkdir -p "/home/${APP_USER}/.ssh"
if [[ -f /root/.ssh/authorized_keys ]]; then
  cp /root/.ssh/authorized_keys "/home/${APP_USER}/.ssh/authorized_keys"
  chmod 700 "/home/${APP_USER}/.ssh"
  chmod 600 "/home/${APP_USER}/.ssh/authorized_keys"
  chown -R "${APP_USER}:${APP_USER}" "/home/${APP_USER}/.ssh"
  echo "  Done — you can now ssh as ${APP_USER}@$(hostname -I | awk '{print $1}')"
else
  echo "  WARNING: /root/.ssh/authorized_keys not found. Set up SSH manually."
fi

# 5. Generate a GitHub deploy key for the app user
echo "[5/9] Generating GitHub deploy key..."
DEPLOY_KEY="/home/${APP_USER}/.ssh/deploy_key"
if [[ ! -f "${DEPLOY_KEY}" ]]; then
  sudo -u "${APP_USER}" ssh-keygen -t ed25519 -C "${APP_USER}@hetzner" \
    -f "${DEPLOY_KEY}" -N ""
fi

# Configure SSH to use the deploy key for GitHub
cat > "/home/${APP_USER}/.ssh/config" <<EOF
Host github.com
  IdentityFile ${DEPLOY_KEY}
  StrictHostKeyChecking no
EOF
chown "${APP_USER}:${APP_USER}" "/home/${APP_USER}/.ssh/config"
chmod 600 "/home/${APP_USER}/.ssh/config"

echo ""
echo "  ┌─────────────────────────────────────────────────────┐"
echo "  │  ACTION REQUIRED — add this deploy key to GitHub:   │"
echo "  │  Repo → Settings → Deploy keys → Add deploy key     │"
echo "  │  Title: hetzner-goodgut  (read-only is fine)        │"
echo "  └─────────────────────────────────────────────────────┘"
echo ""
cat "${DEPLOY_KEY}.pub"
echo ""
read -r -p "  Press Enter once the deploy key is added to GitHub..."

# 6. Clone repo
echo "[6/9] Cloning repo into ${APP_DIR}..."
if [[ -d "${APP_DIR}" ]]; then
  echo "  Directory exists, pulling latest instead..."
  sudo -u "${APP_USER}" git -C "${APP_DIR}" pull
else
  sudo -u "${APP_USER}" git clone "${REPO_SSH_URL}" "${APP_DIR}"
fi

# 7. Install Node dependencies
echo "[7/9] Installing npm dependencies..."
sudo -u "${APP_USER}" npm --prefix "${APP_DIR}" install --omit=dev

# 8. Install and enable systemd service
echo "[8/9] Setting up systemd service..."
cp "${APP_DIR}/deploy/${SERVICE_NAME}.service" "/etc/systemd/system/${SERVICE_NAME}.service"

# Allow goodgut user to restart the service without a password
echo "${APP_USER} ALL=(ALL) NOPASSWD: /bin/systemctl restart ${SERVICE_NAME}" \
  > "/etc/sudoers.d/${APP_USER}"
chmod 440 "/etc/sudoers.d/${APP_USER}"

systemctl daemon-reload
systemctl enable "${SERVICE_NAME}"

# 9. Start service (will fail gracefully if .env not yet populated)
echo "[9/9] Starting ${SERVICE_NAME} service..."
systemctl start "${SERVICE_NAME}" || true
systemctl status "${SERVICE_NAME}" --no-pager || true

echo ""
echo "──────────────────────────────────────────"
echo " Setup complete!"
echo "──────────────────────────────────────────"
echo ""
echo " NEXT STEPS:"
echo " 1. Populate the environment file:"
echo "      cp ${APP_DIR}/.env.example ${APP_DIR}/.env"
echo "      nano ${APP_DIR}/.env          # fill in all API keys"
echo "      chmod 600 ${APP_DIR}/.env"
echo ""
echo " 2. Restart the service after setting .env:"
echo "      systemctl restart ${SERVICE_NAME}"
echo "      journalctl -u ${SERVICE_NAME} -f"
echo ""
echo " ⚠  REMINDER: Instagram access token expires in 60 days."
echo "    Refresh it before expiry to avoid posting failures."
echo ""
echo " SSH access as ${APP_USER}:"
echo "   ssh -i ~/.ssh/id_ed25519 ${APP_USER}@$(hostname -I | awk '{print $1}')"
echo ""
