#!/usr/bin/env bash
# Gera o site estático e envia o resultado para o branch "publicado",
# que a Hostinger puxa para o public_html.
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE_URL="$(git remote get-url origin)"
rm -rf out .next
npx next build
TMP="$(mktemp -d)"
cp -a out/. "$TMP/"
cd "$TMP"
git init -q -b publicado
git add -A
git -c user.name="${GIT_AUTHOR_NAME:-Sávio Antonio Americano}" -c user.email="${GIT_AUTHOR_EMAIL:-savio3cartorio@gmail.com}" \
  commit -qm "Publicação: site gerado em $(date '+%Y-%m-%d %H:%M')"
git push -f "$REMOTE_URL" publicado
echo "Branch publicado atualizado. Agora puxe o repositório na Hostinger."
