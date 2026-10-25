# Como atualizar e publicar o Rota Plena

## Onde fica cada conteúdo
- Artigos do blog: `app/data/cms/articles.json` (texto com `## Subtítulo` e imagens em Markdown).
- Diários públicos: `app/data/cms/diaries.json`.
- Texto da página Sobre: `app/data/cms/site_content.json`.
- Pontos do mapa: `public/pontos-da-rota.csv`.
- Roteiros: `app/data/routes-catalog.json`.
- Notícias: `app/data/news.ts`.

## Gerar o site
```
npm install
npm run build
```
O resultado fica em `out/` (inclua o `.htaccess`).

## Publicar
1. `bash scripts/publicar.sh` gera o build e atualiza o branch `pacote` com `site.zip`.
2. Na Hostinger (pelo conector): puxar o branch `pacote` para a pasta `_deploy` do site ("Deploy website Git repository") e implantar `_deploy/site.zip` ("Deploy static site archive"). A implantação substitui todo o `public_html`, inclusive a pasta `_deploy`.

O `.htaccess` (HTTPS, cache, página 404, redirecionamentos de endereços antigos e bloqueio de `/.git`) fica em `public/.htaccess` e entra automaticamente no build.

## Publicar um roteiro
Acrescente o `slug` do roteiro em `app/data/roteiros-percorridos.ts`. Só roteiros percorridos entram no ar.

## Mapa
O mapa usa `public/lugares-visitados.csv`, apenas com lugares visitados (`visitado = SIM`). A planilha completa fica no backup original, fora do site.

## Fora desta versão
Login, área de membros, painel admin, diários privados e envio de depoimentos precisam de backend (PHP + MySQL no plano atual, ou Node.js nos planos Business/Cloud).
