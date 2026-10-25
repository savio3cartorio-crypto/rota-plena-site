import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "../../db/cms";
import { getPublicDiaryEntries } from "../../db/diaries";
import { PortalPage } from "../components/PortalChrome";
import { cronicaSlugs } from "../data/editorial";
import { mailto } from "../site-config";

export const metadata: Metadata = {
  title: "Diário de estrada",
  description: "Relatos de viagem e crônicas de Sávio Antonio Americano sobre estrada, família, recomeço e liberdade depois dos 50.",
};

const formatDate = (value: string | null) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "";

export default async function DiarioPage() {
  const [entries, articles] = await Promise.all([getPublicDiaryEntries(), getPublishedArticles()]);
  const chronological = [...entries].sort((a, b) => (a.tripDate ?? "").localeCompare(b.tripDate ?? ""));
  const cronicas = cronicaSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);

  return <PortalPage className="public-diaries-page">
    <section className="public-diaries-hero"><div><p className="eyebrow">DIÁRIO DE ESTRADA</p><h1>A estrada também muda <em>quem viaja.</em></h1><p>Relatos de viagem e crônicas sobre família, recomeço, tempo e liberdade. É aqui que o Rota Plena deixa de ser só um guia e vira uma conversa.</p></div><aside><span>{chronological.length + cronicas.length}</span><b>textos publicados</b><small>Por Sávio Antonio Americano, de Taubaté.</small></aside></section>

    <section className="public-diaries-intro"><div><p className="eyebrow dark">RELATO DE VIAGEM</p><h2>Caraíva, janeiro de 2024.</h2><p>Uma viagem em família, escrita como cartas às filhas: dois dias de estrada e o primeiro amanhecer onde o rio encontra o mar.</p></div><Link href="/rotas/">Ver como roteiro →</Link></section>
    <section className="public-diary-grid">{chronological.map((entry, index) => <Link href={`/diarios/${entry.id}/`} className={index === 0 ? "public-diary-card lead" : "public-diary-card"} key={entry.id}><small>{formatDate(entry.tripDate)} · {entry.location}</small><h2>{entry.title}</h2><p>{entry.body.replace(/^## .*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 240)}…</p><footer><span>Dia {index + 1}</span><b>Ler capítulo →</b></footer></Link>)}</section>

    <section className="rp-section alt">
      <div className="portal-section-head"><div><p className="eyebrow dark">CRÔNICAS</p><h2>O que a estrada me ensinou.</h2><p>Textos curtos sobre o sentido de viajar, escritos entre uma saída e outra.</p></div></div>
      <div className="rp-cards">{cronicas.map((article) => <Link className="rp-card" key={article.slug} href={`/blog/${article.slug}/`}><small>{article.reading} de leitura</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Ler crônica →</b></Link>)}</div>
    </section>

    <section className="rp-section" id="historia">
      <p className="rp-quote">“Não escrevo a partir de uma estrada perfeita. Escrevo enquanto construo a possibilidade de percorrê-la.”</p>
      <p className="rp-signature">Também tem uma história de estrada para contar? Escreva para mim. Com a sua autorização, ela pode ser publicada aqui. <a href={mailto("minha história de estrada")}>Mandar minha história →</a></p>
    </section>
  </PortalPage>;
}
