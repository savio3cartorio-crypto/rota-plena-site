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
1. Gerar o build e copiar o conteúdo de `out/` para o branch `publicado` (ele contém só o site pronto).
2. Enviar o branch `publicado` ao GitHub.
3. Na Hostinger, a pasta do site puxa esse branch ("Deploy website Git repository"); cada nova publicação é um "pull" do mesmo branch.

O `.htaccess` (HTTPS, cache, página 404 e bloqueio de `/.git`) fica em `public/.htaccess` e entra automaticamente no build.

## Fora desta versão
Login, área de membros, painel admin, diários privados e depoimentos com envio precisam de backend (PHP + MySQL no plano atual, ou Node.js nos planos Business/Cloud).
