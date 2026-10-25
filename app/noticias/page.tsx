import type { Metadata } from "next";
import Link from "next/link";
import { PortalPage } from "../components/PortalChrome";
import { newsArticles } from "../data/news";
import { absoluteUrl } from "../site-config";

export const metadata: Metadata = {
  title: "Notícias do caravanismo",
  description: "Notícias verificadas sobre caravanismo, motorhomes, campings, infraestrutura, destinos, encontros e políticas que afetam quem vive a estrada.",
  alternates: { canonical: absoluteUrl("/noticias") },
  openGraph: {
    title: "Notícias & Estrada | Rota Plena",
    description: "O que muda, por que importa e como isso chega à sua próxima viagem.",
    url: absoluteUrl("/noticias"),
    images: [{ url: "/rota-plena-hero.jpg", alt: "Rota Plena — notícias do caravanismo brasileiro" }],
  },
};

export default function NewsPage() {
  const [lead, ...others] = newsArticles;
  return <PortalPage className="news-page">
    <section className="news-hero">
      <div>
        <p className="eyebrow">ROTA PLENA · NOTÍCIAS & ESTRADA</p>
        <h1>O que acontece no caravanismo — e o que isso muda na sua viagem.</h1>
        <p>Notícias verificadas, contexto e leitura prática sobre destinos, campings, encontros, associações e infraestrutura para quem sonha, começa ou já vive sobre rodas.</p>
      </div>
      <aside aria-label="Compromisso editorial">
        <span>01</span><div><b>Fonte identificada</b><small>Links diretos para a origem da informação.</small></div>
        <span>02</span><div><b>Contexto, não reprodução</b><small>Explicamos por que o fato merece atenção.</small></div>
        <span>03</span><div><b>Utilidade para a estrada</b><small>Conectamos notícia, planejamento e autonomia.</small></div>
      </aside>
    </section>

    <section className="news-desk">
      <header>
        <div><p className="eyebrow dark">EDIÇÃO DE ABERTURA · 13 AGO 2026</p><h2>Duas notícias, uma mesma mudança de rota.</h2></div>
        <p>O poder público começa a reconhecer o turismo sobre rodas enquanto a comunidade se organiza para ganhar representatividade, infraestrutura e informação.</p>
      </header>
      <div className="news-grid">
        <Link className="news-lead-card" href={`/noticias/${lead.slug}`}>
          <div className="news-card-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(2,34,24,.62),rgba(2,34,24,.04)),url('${lead.coverUrl}')` }}>
            <span>DESTAQUE</span>
          </div>
          <div><p>{lead.category} · {lead.reading}</p><h2>{lead.title}</h2><span>{lead.excerpt}</span><b>Ler análise completa →</b></div>
        </Link>
        {others.map((article) => <Link className="news-side-card" href={`/noticias/${article.slug}`} key={article.slug}>
          <div className="news-card-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(2,34,24,.45),transparent),url('${article.coverUrl}')` }} />
          <div><p>{article.category} · {article.reading}</p><h2>{article.title}</h2><span>{article.excerpt}</span><b>Continuar lendo →</b></div>
        </Link>)}
      </div>
    </section>

    <section className="news-bridge">
      <div><p className="eyebrow">DA NOTÍCIA PARA A DECISÃO</p><h2>Informação só ganha valor quando ajuda você a seguir melhor.</h2></div>
      <nav aria-label="Recursos relacionados às notícias">
        <Link href="/mapa"><span>⌖</span><div><b>Confira pontos no mapa</b><small>Veja a base disponível e confirme diretamente com o local.</small></div><i>→</i></Link>
        <Link href="/rotas"><span>↟</span><div><b>Transforme destinos em rota</b><small>Consulte roteiros, distâncias e níveis de verificação.</small></div><i>→</i></Link>
        <Link href="/aprenda"><span>▤</span><div><b>Entenda antes de partir</b><small>Guias práticos para planejar com mais autonomia.</small></div><i>→</i></Link>
      </nav>
    </section>
  </PortalPage>;
}
