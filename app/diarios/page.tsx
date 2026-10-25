import type { Metadata } from "next";
import Link from "next/link";
import { getPublicDiaryEntries } from "../../db/diaries";
import { PortalPage } from "../components/PortalChrome";


export const metadata: Metadata = {
  title: "Diários Públicos de Bordo",
  description: "Relatos reais de viagens, descobertas e aprendizados compartilhados pela comunidade Rota Plena.",
};

const formatDate = (value: string | null) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "Data não informada";

export default async function PublicDiariesPage() {
  const entries = await getPublicDiaryEntries();
  return <PortalPage className="public-diaries-page">
    <section className="public-diaries-hero"><div><p className="eyebrow">DIÁRIOS PÚBLICOS</p><h1>A estrada contada por quem <em>esteve nela.</em></h1><p>Relatos pessoais, aprendizados e memórias compartilhados com autorização de seus autores. Aqui, a experiência não desaparece no feed: torna-se referência e companhia para outras viagens.</p></div><aside><span>{entries.length}</span><b>{entries.length === 1 ? "registro público" : "registros públicos"}</b><small>Cada autor escolhe o que deseja compartilhar.</small></aside></section>
    <section className="public-diaries-intro"><div><p className="eyebrow dark">PRIMEIRO DIÁRIO ROTA PLENA</p><h2>Caraíva, janeiro de 2024.</h2><p>Uma viagem em família, escrita originalmente como cartas às filhas: dois dias de estrada e o primeiro amanhecer onde o rio encontra o mar.</p></div><a href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20meu%20di%C3%A1rio">Quero enviar meu diário →</a></section>
    <section className="public-diary-grid">{entries.map((entry, index) => <Link href={`/diarios/${entry.id}`} className={index === 0 ? "public-diary-card lead" : "public-diary-card"} key={entry.id}><small>{formatDate(entry.tripDate)} · {entry.location}</small><h2>{entry.title}</h2><p>{entry.body.replace(/^## .*$/gm, "").replace(/\s+/g, " ").trim().slice(0, 260)}…</p><footer><span>Por {entry.authorName}</span><b>Ler capítulo →</b></footer></Link>)}</section>
    <section className="public-diary-ethics"><p className="eyebrow dark">MEMÓRIA COM CONSENTIMENTO</p><h2>Quem escreve continua no controle.</h2><p>O autor define cada registro como privado, exclusivo da comunidade ou público. Somente conteúdos autorizados e aprovados aparecem nesta biblioteca. Fotos, vídeos e pessoas identificáveis exigem cuidado adicional.</p><Link href="/privacidade">Entender privacidade e LGPD →</Link></section>
  </PortalPage>;
}

