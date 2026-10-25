import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicDiaryEntry, getPublicDiaryEntries } from "../../../db/diaries";
import DiaryProse from "../../components/DiaryProse";
import { PortalPage } from "../../components/PortalChrome";
import { absoluteUrl } from "../../site-config";


const formatDate = (value: string | null) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "Data não informada";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublicDiaryEntries()).map((entry) => ({ id: String(entry.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entry = await getPublicDiaryEntry(Number(id));
  if (!entry) return {};
  const description = entry.body.replace(/^## .*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 160);
  return { title: entry.title, description, alternates: { canonical: absoluteUrl(`/diarios/${entry.id}`) }, openGraph: { type: "article", title: entry.title, description, url: absoluteUrl(`/diarios/${entry.id}`) } };
}

export default async function PublicDiaryEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getPublicDiaryEntry(Number(id));
  if (!entry) notFound();
  const allEntries = await getPublicDiaryEntries();
  const related = allEntries.filter((item) => item.id !== entry.id && item.title.startsWith("Caraíva 2024")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: entry.title, author: { "@type": "Person", name: entry.authorName }, datePublished: entry.tripDate || undefined, mainEntityOfPage: absoluteUrl(`/diarios/${entry.id}`), inLanguage: "pt-BR", publisher: { "@type": "Organization", name: "Rota Plena", url: absoluteUrl("/") } };
  return <PortalPage className="public-diary-entry-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="public-diary-entry">
      <header><Link href="/diario/">← Diário de estrada</Link><p className="eyebrow dark">DIÁRIO DE ESTRADA · CARAÍVA 2024</p><span className="rp-selo">Eu fui <small>{formatDate(entry.tripDate)}</small></span><h1>{entry.title}</h1><div><span>{formatDate(entry.tripDate)}</span><span>{entry.location}</span><span>Por {entry.authorName}</span></div></header>
      <aside><b>Nota do autor</b><p>Este relato foi escrito em janeiro de 2024 como uma carta às minhas filhas. Para a publicação no Rota Plena, foram corrigidos apenas erros evidentes de digitação e organizadas as seções, preservando o sentido, a memória familiar e a reflexão original.</p></aside>
      <DiaryProse body={entry.body} />
      <footer><span>Boa estrada. E que ela seja plena.</span><Link href="/diario/">Continuar no Diário de estrada →</Link></footer>
    </article>
    {related.length > 0 && <section className="public-diary-related"><header><p className="eyebrow dark">OUTROS DIAS DESTA VIAGEM</p><h2>Continue o caminho até Caraíva.</h2></header><div>{related.map((item) => <Link href={`/diarios/${item.id}`} key={item.id}><small>{formatDate(item.tripDate)}</small><h3>{item.title}</h3><b>Ler capítulo →</b></Link>)}</div></section>}
  </PortalPage>;
}

