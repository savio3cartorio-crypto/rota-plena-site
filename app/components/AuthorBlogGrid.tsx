"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "../data/articles";

type AuthorLane = "Textos" | "Experiências" | "Dicas";

const laneFor = (article: Article): AuthorLane => {
  const value = `${article.category} ${article.title}`.toLocaleLowerCase("pt-BR");
  if (/experi|diário|diario|relato|na estrada|viagem vivida/.test(value)) return "Experiências";
  if (/manifesto|reflex|crônica|cronica|opinião|opiniao|texto autoral|vida sobre rodas/.test(value)) return "Textos";
  return "Dicas";
};

export default function AuthorBlogGrid({ articles }: { articles: Article[] }) {
  const [lane, setLane] = useState<"Todos" | AuthorLane>("Todos");
  const lanes: Array<"Todos" | AuthorLane> = ["Todos", "Textos", "Experiências", "Dicas"];
  const counts = useMemo(() => Object.fromEntries(lanes.map((item) => [item, item === "Todos" ? articles.length : articles.filter((article) => laneFor(article) === item).length])), [articles]);
  const visible = useMemo(() => lane === "Todos" ? articles : articles.filter((article) => laneFor(article) === lane), [articles, lane]);

  return <>
    <div className="author-blog-toolbar">
      <div><p className="eyebrow dark">CADERNOS DO AUTOR</p><h2>Escolha como quer seguir.</h2></div>
      <nav aria-label="Filtrar publicações do autor">{lanes.map((item) => <button type="button" key={item} className={lane === item ? "active" : ""} onClick={() => setLane(item)}><span>{item}</span><small>{counts[item]}</small></button>)}</nav>
    </div>
    <div className="author-post-grid">
      {visible.map((article, index) => <Link className={index === 0 && lane === "Todos" ? "author-post-card lead" : "author-post-card"} href={`/blog/${article.slug}`} key={article.slug}>
        <div className="author-post-cover" role="img" aria-label={`Imagem de capa: ${article.title}`} style={{ backgroundPosition: article.imagePosition, backgroundImage: article.coverUrl ? `linear-gradient(0deg, rgba(3,41,29,.34), transparent), url("${article.coverUrl}")` : undefined }}><span>{article.series ? `${article.series.name} · ${String(article.series.order).padStart(2, "0")}/${article.series.total}` : laneFor(article)}</span></div>
        <div className="author-post-copy"><small>{article.category} · {article.reading}</small><h3>{article.title}</h3><p>{article.excerpt}</p><footer><span>Por {article.authorName || "Sávio Antonio Americano"}</span><b>Ler texto →</b></footer></div>
      </Link>)}
    </div>
    {!visible.length && <div className="author-empty"><span>◇</span><h3>Este caderno começa na próxima estrada.</h3><p>Os primeiros conteúdos desta categoria ainda estão sendo preparados.</p></div>}
  </>;
}
