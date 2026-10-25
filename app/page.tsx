import Link from "next/link";
import { PortalFooter, PortalHeader } from "./components/PortalChrome";
import { getPublishedArticles } from "../db/cms";
import { getPublicDiaryEntries } from "../db/diaries";
import { cronicaSlugs, primeirosPassosSlugs } from "./data/editorial";
import { mailto } from "./site-config";

export default async function Home() {
  const [articles, diaries] = await Promise.all([getPublishedArticles(), getPublicDiaryEntries()]);
  const guias = primeirosPassosSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);
  const cronicas = cronicaSlugs.slice(0, 3).map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);
  const firstDiary = [...diaries].sort((a, b) => (a.tripDate ?? "").localeCompare(b.tripDate ?? ""))[0];

  return (
    <main className="portal-page rp-home">
      <PortalHeader />

      <section className="rp-hero">
        <div className="rp-hero-content">
          <p className="eyebrow">ROTA PLENA · VIAJAR PERTO, VIVER PLENO</p>
          <h1>A estrada começa perto.<br /><em>Eu fui antes, e te mostro como.</em></h1>
          <p>Guias para a primeira viagem com o carro que você já tem, lugares que eu visitei de verdade e relatos sobre o que a estrada ensina.</p>
          <div className="rp-hero-actions">
            <Link className="button button-primary" href="/comecar/">Quero começar <span>→</span></Link>
            <Link className="button button-ghost" href="/diario/">Ler o Diário de estrada</Link>
          </div>
        </div>
        <p className="rp-hero-caption"><span className="rp-selo dark">Eu fui <small>jan 2024</small></span> Nascer do sol a caminho de Caraíva, visto de dentro do carro.</p>
      </section>

      <section className="rp-section rp-author">
        <div className="rp-author-mark" aria-hidden="true">SA</div>
        <div>
          <p className="eyebrow dark">QUEM ESCREVE</p>
          <p className="rp-author-text">Sou Sávio Antonio Americano, de Taubaté. Criei o Rota Plena para mostrar que viajar sobre rodas não começa com um motorhome caro: começa com o carro da garagem, uma noite perto de casa e vontade de aprender. Aqui eu conto o que testei, onde dormi, quanto gastei e o que eu faria diferente.</p>
          <Link className="text-link" href="/sobre/">Conhecer a história do projeto →</Link>
        </div>
      </section>

      <section className="rp-section rp-pillars-plain" aria-label="O que você encontra aqui">
        <article><span>01</span><h2>Começar perto</h2><p>O passo a passo da primeira viagem: onde dormir, o que levar, quanto custa e o que evitar.</p><Link href="/comecar/">Ver o plano de estreia →</Link></article>
        <article><span>02</span><h2>Lugares verificados</h2><p>Cidades, campings, mirantes e paradas com o selo “eu fui”. Nada copiado de outros guias.</p><Link href="/destinos/">Ver os destinos →</Link></article>
        <article><span>03</span><h2>Estrada que transforma</h2><p>Relatos e crônicas sobre família, recomeço e liberdade depois dos 50.</p><Link href="/diario/">Ler o diário →</Link></article>
      </section>

      {firstDiary && <section className="rp-feature">
        <div className="rp-feature-photo" role="img" aria-label="Fim de tarde no rio Caraíva, com barcos sobre a água" />
        <div className="rp-feature-copy">
          <p className="eyebrow dark">DO DIÁRIO DE ESTRADA</p>
          <span className="rp-selo">Eu fui <small>janeiro de 2024</small></span>
          <h2>Dois dias de estrada até onde o rio encontra o mar.</h2>
          <p>De Taubaté a Caraíva, na Bahia, em família: 679 km no primeiro dia, a parada em Vitória e a chegada à vila. Escrito como cartas às filhas.</p>
          <Link className="button button-primary" href={`/diarios/${firstDiary.id}/`}>Ler o primeiro capítulo →</Link>
          <ul className="rp-mini-list">{cronicas.map((article) => <li key={article.slug}><Link href={`/blog/${article.slug}/`}>{article.title}</Link><small>Crônica · {article.reading}</small></li>)}</ul>
        </div>
      </section>}

      <section className="rp-section">
        <div className="portal-section-head"><div><p className="eyebrow dark">GUIAS PARA A PRIMEIRA VIAGEM</p><h2>Leia antes de sair.</h2></div><Link href="/comecar/#guias">Todos os guias →</Link></div>
        <ol className="rp-list">{guias.map((article) => <li key={article.slug}><Link href={`/blog/${article.slug}/`}><small>{article.category}</small><b>{article.title}</b><span>{article.reading} de leitura →</span></Link></li>)}</ol>
      </section>

      <section className="rp-section alt">
        <div className="portal-section-head"><div><p className="eyebrow dark">DESTINOS</p><h2>Perto o bastante para voltar no mesmo dia.</h2></div><Link href="/mapa/">Lugares por onde passei →</Link></div>
        <div className="rp-tiles">
          <Link className="rp-tile photo" href="/destinos/sul-de-minas/"><small>Serra e interior</small><h3>Mantiqueira e Sul de Minas</h3><span>Abrir o guia →</span></Link>
          <Link className="rp-tile" href="/destinos/vale-do-paraiba/"><small>Base do projeto</small><h3>Vale do Paraíba</h3><span>Abrir o guia →</span></Link>
          <div className="rp-tile muted"><small>Em preparação</small><h3>Litoral Norte</h3><span>Depois das próximas saídas de campo</span></div>
        </div>
      </section>

      <section id="newsletter" className="rp-section deep">
        <div className="rp-newsletter">
          <div><p className="eyebrow">RECEBA POR E-MAIL</p><h2>Um relato, um lugar visitado e uma dica, a cada quinze dias.</h2><p>Sem propaganda e sem pressa. Para entrar na lista, mande um e-mail com o assunto “Quero receber”.</p></div>
          <nav><a className="button button-primary" href={mailto("Quero receber")}>Quero receber →</a><small>Para sair da lista, é só responder pedindo.</small></nav>
        </div>
      </section>
      <PortalFooter />
    </main>
  );
}
