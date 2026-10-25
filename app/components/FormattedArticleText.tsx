import type { ReactNode } from "react";

export function FormattedArticleText({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\+\+[^+]+\+\+)/g).filter(Boolean);
  return <>{tokens.map((token, index): ReactNode => {
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith("*") && token.endsWith("*")) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith("++") && token.endsWith("++")) return <u key={index}>{token.slice(2, -2)}</u>;
    return token;
  })}</>;
}

export function ArticleEditorPreview({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return <div className="cms-article-preview">{blocks.length ? blocks.map((block, index) => {
    if (block.startsWith("## ")) return <h2 key={index}><FormattedArticleText text={block.slice(3)} /></h2>;
    const image = block.match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/);
    if (image) return <figure key={index}><img src={image[2]} alt={image[1] || "Imagem do artigo"} />{image[3] && <figcaption>{image[3]}</figcaption>}</figure>;
    return <p key={index}><FormattedArticleText text={block} /></p>;
  }) : <p>Comece a escrever para visualizar o artigo.</p>}</div>;
}
