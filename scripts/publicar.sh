#!/usr/bin/env bash
# Gera o site estático e atualiza o branch "pacote" (site.zip), sempre em avanço rápido.
# Na Hostinger: puxar o branch "pacote" para a pasta _deploy e implantar _deploy/site.zip como site estático.
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE_URL="$(git remote get-url origin)"
rm -rf out .next
npx next build
TMP="$(mktemp -d)"
git clone -q --depth 1 --branch pacote "$REMOTE_URL" "$TMP"
rm -f "$TMP/site.zip"
(cd out && zip -qr "$TMP/site.zip" .)
cd "$TMP"
git add -A
if git diff --cached --quiet; then echo "Nada mudou no pacote."; exit 0; fi
git -c user.name="${GIT_AUTHOR_NAME:-Claude}" -c user.email="${GIT_AUTHOR_EMAIL:-noreply@anthropic.com}" \
  commit -qm "Pacote: site gerado em $(date '+%Y-%m-%d %H:%M')"
git push -q origin pacote
echo "Branch pacote atualizado. Agora implante na Hostinger (pull em _deploy + implantação estática de _deploy/site.zip)."
