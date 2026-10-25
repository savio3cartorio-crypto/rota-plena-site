#!/usr/bin/env bash
# Gera o site estático e acrescenta um commit ao branch "publicado"
# (sempre em avanço rápido, para a Hostinger conseguir fazer "pull").
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE_URL="$(git remote get-url origin)"
rm -rf out .next
npx next build
TMP="$(mktemp -d)"
git clone -q --depth 1 --branch publicado "$REMOTE_URL" "$TMP"
find "$TMP" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a out/. "$TMP/"
cd "$TMP"
git add -A
if git diff --cached --quiet; then echo "Nada mudou no site publicado."; exit 0; fi
git -c user.name="${GIT_AUTHOR_NAME:-Sávio Antonio Americano}" -c user.email="${GIT_AUTHOR_EMAIL:-savio3cartorio@gmail.com}" \
  commit -qm "Publicação: site gerado em $(date '+%Y-%m-%d %H:%M')"
git push -q origin publicado
echo "Branch publicado atualizado. Agora puxe o repositório na Hostinger."
