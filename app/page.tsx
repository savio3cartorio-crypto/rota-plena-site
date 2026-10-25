import Link from "next/link";
import Image from "next/image";
import { PortalFooter, PortalHeader } from "./components/PortalChrome";
import { getPublishedArticles } from "../db/cms";
import { getPublicDiaryEntries } from "../db/diaries";
import { cronicaSlugs, primeirosPassosSlugs } from "./data/editorial";
import { mailto } from "./site-config";

export default async function Home() {
  const [articles, diaries] = await Promise.all([getPublishedArticles(), getPublicDiaryEntries()]);
  const guias = primeirosPassosSlugs.slice(0, 3).map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);
  const cronicas = cronicaSlugs.slice(0, 2).map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);
  const firstDiary = [...diaries].sort((a, b) => (a.tripDate ?? "").localeCompare(b.tripDate ?? ""))[0];

  return (
    <main className="portal-page phase-one-home">
      <PortalHeader />

      <section className="portal-hero phase-one-hero">
        <div className="portal-hero-content">
          <p className="eyebrow">ROTA PLENA · VIAJAR PERTO, VIVER PLENO</p>
          <h1>A estrada começa perto.<br /><em>Eu fui antes, e te mostro como.</em></h1>
          <p>Guias para a primeira viagem com o carro que você já tem, lugares que eu visitei de verdade e relatos sobre o que a estrada ensina. Começando pelo Vale do Paraíba, pela Mantiqueira e pelo Litoral Norte.</p>
          <div className="phase-one-actions">
            <Link className="button button-primary" href="/comecar/">Quero começar <span>→</span></Link>
            <Link className="button button-ghost" href="/diario/">Ler o Diário de estrada</Link>
          </div>
          <div className="hero-trust"><span>• Só lugares visitados</span><span>• Informação com data</span><span>• Sem anúncios</span></div>
        </div>
        <figure className="portal-hero-logo">
          <Image src="/rota-plena-logo-320.webp" alt="Logotipo Rota Plena" width={320} height={320} priority unoptimized />
        </figure>
      </section>

      <section className="rp-section">
        <div className="portal-section-head"><div><p className="eyebrow dark">O QUE VOCÊ ENCONTRA AQUI</p><h2>Três coisas, bem feitas.</h2><p>Em vez de tentar mostrar o Brasil inteiro, o Rota Plena faz pouco e faz com cuidado.</p></div></div>
        <div className="rp-pillars">
          <article><span>01</span><h3>Começar perto</h3><p>Como fazer a primeira viagem com o carro que você já tem: onde dormir, o que levar, quanto custa e o que evitar.</p><Link href="/comecar/">Ver o plano de estreia →</Link></article>
          <article><span>02</span><h3>Lugares verificados</h3><p>Cidades, campings, mirantes e paradas que eu visitei, com o selo “eu fui”. Nada copiado de outros guias.</p><Link href="/destinos/">Ver os destinos →</Link></article>
          <article><span>03</span><h3>Estrada que transforma</h3><p>Relatos e crônicas sobre família, recomeço e liberdade depois dos 50. A estrada vista de dentro.</p><Link href="/diario/">Ler o diário →</Link></article>
        </div>
      </section>

      <section className="first-journey-path">
        <header>
          <div><p className="eyebrow dark">UM PASSO DE CADA VEZ</p><h2>Do sonho à primeira noite na estrada.</h2></div>
          <p>Uma jornada realista para quem trabalha durante a semana, tem um carro comum e quer começar sem dívidas nem equipamentos desnecessários.</p>
        </header>
        <div>
          <article><span>01</span><small>ENTENDA</small><h3>Descubra seu jeito</h3><p>Leia o guia de car camping e escolha uma saída curta para testar se essa forma de viajar combina com você.</p><Link href="/blog/car-camping-liberdade-porta-malas/">Ler o guia →</Link></article>
          <article><span>02</span><small>PREPARE</small><h3>Use o essencial</h3><p>Organize água, descanso, ventilação, alimentação e itens de segurança com o que você já tem.</p><Link href="/ferramentas/">Abrir o checklist →</Link></article>
          <article><span>03</span><small>ESCOLHA</small><h3>Viaje perto</h3><p>Comece pelo Vale do Paraíba, pela Mantiqueira ou pelo Litoral Norte, com plano alternativo e pernoite confirmado.</p><Link href="/destinos/">Ver os destinos →</Link></article>
          <article><span>04</span><small>CONTE</small><h3>Divida o que aprendeu</h3><p>Anote o que funcionou e o que faltou. Se quiser, mande a sua história: ela pode ajudar quem vem depois.</p><Link href="/sobre/#historia">Mandar minha história →</Link></article>
        </div>
      </section>

      <section className="rp-section alt">
        <div className="portal-section-head"><div><p className="eyebrow dark">GUIAS PARA A PRIMEIRA VIAGEM</p><h2>Leia antes de sair.</h2></div><Link href="/comecar/#guias">Todos os guias →</Link></div>
        <div className="rp-cards">{guias.map((article) => <Link className="rp-card" key={article.slug} href={`/blog/${article.slug}/`}><small>{article.category} · {article.reading}</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Ler o guia →</b></Link>)}</div>
      </section>

      <section className="rp-section">
        <div className="portal-section-head"><div><p className="eyebrow dark">DIÁRIO DE ESTRADA</p><h2>A estrada também muda quem viaja.</h2></div><Link href="/diario/">Ler o diário →</Link></div>
        <div className="rp-cards">
          {firstDiary && <Link className="rp-card" href={`/diarios/${firstDiary.id}/`}><small>Relato · {firstDiary.location}</small><h3>{firstDiary.title}</h3><p>Uma viagem em família até Caraíva, escrita como cartas às filhas.</p><b>Ler o relato →</b></Link>}
          {cronicas.map((article) => <Link className="rp-card" key={article.slug} href={`/blog/${article.slug}/`}><small>Crônica · {article.reading}</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Ler a crônica →</b></Link>)}
        </div>
      </section>

      <section className="rp-section alt">
        <div className="portal-section-head"><div><p className="eyebrow dark">DESTINOS</p><h2>Perto o bastante para voltar no mesmo dia.</h2></div><Link href="/mapa/">Lugares por onde passei →</Link></div>
        <div className="rp-cards">
          <Link className="rp-card" href="/destinos/vale-do-paraiba/"><small>Base do projeto</small><h3>Vale do Paraíba</h3><p>Taubaté e as cidades do Vale, com as portas de subida para a serra e para o mar.</p><b>Abrir o guia →</b></Link>
          <Link className="rp-card" href="/destinos/sul-de-minas/"><small>Serra e interior</small><h3>Mantiqueira e Sul de Minas</h3><p>Montanha, frio e pequenas cidades entre São Paulo e Minas Gerais.</p><b>Abrir o guia →</b></Link>
          <div className="rp-card muted"><small>Em preparação</small><h3>Litoral Norte</h3><p>Ubatuba, Caraguatatuba, São Sebastião e Ilhabela, depois das próximas saídas de campo.</p><b>Em breve</b></div>
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
