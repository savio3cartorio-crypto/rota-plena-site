"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "../data/articles";

export default function BlogGrid({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", "Comece aqui", "Segurança", "Família e pets", "Reflexões"];
  const visible = useMemo(() => {
    if (category === "Todos") return articles;
    if (category === "Reflexões") return articles.filter((article) => ["Manifesto", "Vida sobre rodas"].includes(article.category));
    return articles.filter((article) => article.category === category);
  }, [articles, category]);
  return <>
    <div className="content-toolbar"><div><b>Publicações Rota Plena</b><span>Informação confiável e inspiração responsável.</span></div><div>{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    <div className="magazine-grid">{visible.map((article, index) => <Link className={index === 0 || article.featured ? "magazine-card featured" : "magazine-card"} key={article.slug} href={`/blog/${article.slug}`}><div className="magazine-image" role="img" aria-label={`Imagem de capa: ${article.title}`} style={{ backgroundPosition: article.imagePosition, backgroundImage: article.coverUrl ? `url("${article.coverUrl}")` : undefined }} /><div><p>{article.category} · {article.reading}</p><h2>{article.title}</h2><span>{article.excerpt}</span><b>Ler artigo →</b></div></Link>)}</div>
    {visible.length === 0 && <p className="empty-content">Ainda não há publicações nesta categoria.</p>}
  </>;
}
