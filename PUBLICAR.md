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
1. Compactar o conteúdo de `out/` em `rota-plena-public_html.zip`.
2. Atualizar o branch `publicado` do repositório com o ZIP.
3. Na Hostinger: puxar o repositório para a pasta `_deploy` do site e implantar o ZIP como site estático (substitui o conteúdo do `public_html`).

## Fora desta versão
Login, área de membros, painel admin, diários privados e depoimentos com envio precisam de backend (PHP + MySQL no plano atual, ou Node.js nos planos Business/Cloud).
