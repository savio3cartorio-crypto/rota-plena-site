import Link from "next/link";
import Image from "next/image";
import MapExplorer from "./components/MapExplorer";
import { PortalFooter, PortalHeader } from "./components/PortalChrome";
import { getPublishedArticles } from "../db/cms";
import { curatedRoutes, routeMaturity, routeModuleLabel } from "./data/routes";
import { newsArticles } from "./data/news";

const quickLinks = [
  { icon: "①", title: "Comece por aqui", text: "Uma primeira viagem possível, sem grandes compras.", href: "/comecar" },
  { icon: "⌖", title: "Explore perto", text: "Vale, Mantiqueira e Litoral Norte primeiro.", href: "/mapa" },
  { icon: "✓", title: "Prepare o carro", text: "Checklist simples de segurança e autonomia.", href: "/ferramentas" },
  { icon: "↝", title: "Monte sua viagem", text: "Origem, destino, paradas e interesses.", href: "/planejar" },
];

const firstPhaseRoutes = ["caragua-serra-mar", "mantiqueira-integrada", "costa-caicara-de-ubatuba"];


export default async function Home() {
  const featuredRoutes = firstPhaseRoutes
    .map((slug) => curatedRoutes.find((route) => route.slug === slug))
    .filter((route) => route !== undefined);
  const articles = await getPublishedArticles();
  const leadArticle = articles[0];
  const [leadNews, secondNews] = newsArticles;

  return (
    <main className="portal-page phase-one-home">
      <PortalHeader />

      <section className="portal-hero phase-one-hero">
        <div className="portal-hero-content">
          <p className="eyebrow">ROTA PLENA · PRIMEIRA FASE</p>
          <h1>Sua primeira rota começa perto.<br /><em>Com o carro que você já tem.</em></h1>
          <p>Não é preciso esperar um motorhome, comprar tudo ou atravessar o país. O Rota Plena começa ajudando você a fazer uma viagem curta, segura e possível — e aprende junto, estrada por estrada.</p>
          <div className="phase-one-actions">
            <Link className="button button-primary" href="/comecar">Quero começar <span>→</span></Link>
            <Link className="button button-ghost" href="/planejar">Planejar minha primeira rota</Link>
          </div>
          <form action="/mapa" className="hero-search"><span>⌕</span><input name="busca" aria-label="Buscar perto de você" placeholder="Busque uma cidade ou ponto de apoio" /><button>Buscar no mapa →</button></form>
          <div className="hero-trust"><span>• Começo regional</span><span>• Status de verificação visível</span><span>• Sem anúncios</span></div>
        </div>
        <figure className="portal-hero-logo">
          <Image src="/rota-plena-logo-320.webp" alt="Logotipo Rota Plena" width={320} height={320} priority unoptimized />
        </figure>
      </section>

      <section className="portal-shortcuts phase-one-shortcuts">
        {quickLinks.map((item) => <Link key={item.title} href={item.href}><span>{item.icon}</span><div><b>{item.title}</b><small>{item.text}</small></div><i>→</i></Link>)}
      </section>

      <section className="first-journey-path">
        <header>
          <div><p className="eyebrow dark">UM PASSO DE CADA VEZ</p><h2>Do sonho à primeira noite na estrada.</h2></div>
          <p>Uma jornada realista para quem trabalha durante a semana, tem um carro comum e quer começar sem dívidas ou equipamentos desnecessários.</p>
        </header>
        <div>
          <article><span>01</span><small>ENTENDA</small><h3>Descubra seu jeito</h3><p>Leia o guia de car camping e escolha uma saída curta para testar se essa forma de viajar combina com você.</p><Link href="/blog/car-camping-liberdade-porta-malas">Ler o guia →</Link></article>
          <article><span>02</span><small>PREPARE</small><h3>Use o essencial</h3><p>Organize água, descanso, ventilação, alimentação e itens de segurança com o que você já possui.</p><Link href="/ferramentas">Abrir checklist →</Link></article>
          <article><span>03</span><small>ESCOLHA</small><h3>Viaje perto</h3><p>Comece por Vale do Paraíba, Mantiqueira ou Litoral Norte, com plano alternativo e pernoite confirmado.</p><Link href="/rotas">Ver rotas prioritárias →</Link></article>
          <article><span>04</span><small>COMPARTILHE</small><h3>Transforme experiência em referência</h3><p>Registre o que encontrou, o que funcionou e o que deve ser confirmado por quem vier depois.</p><Link href="/diarios">Ler diários de bordo →</Link></article>
        </div>
      </section>

      <section className="phase-territories">
        <div className="portal-section-head"><div><p className="eyebrow dark">TERRITÓRIO-PILOTO</p><h2>Profundidade antes de quantidade.</h2><p>A primeira fase concentra energia onde é possível pesquisar, visitar, confirmar e atualizar com responsabilidade.</p></div><Link href="/comecar#territorio">Entenda o recorte →</Link></div>
        <div className="phase-territory-grid">
          <Link href="/destinos/vale-do-paraiba"><small>BASE DO PROJETO</small><h3>Vale do Paraíba</h3><p>Cidades, serviços, apoio, cultura e conexões próximas de Taubaté.</p><b>Explorar o Vale →</b></Link>
          <Link href="/destinos/sul-de-minas"><small>SERRA E INTERIOR</small><h3>Mantiqueira</h3><p>Montanha, natureza, pequenas cidades e travessias para o Sul de Minas.</p><b>Explorar a serra →</b></Link>
          <Link href="/rotas/caragua-serra-mar"><small>MAR E DESCIDA DE SERRA</small><h3>Litoral Norte</h3><p>Escapadas costeiras com atenção a acesso, sazonalidade e pernoite.</p><b>Começar por Caraguá →</b></Link>
        </div>
      </section>

      <section className="home-route-discovery phase-route-discovery">
        <div className="portal-section-head"><div><p className="eyebrow dark">TRÊS CAMINHOS PARA COMEÇAR</p><h2>Rotas próximas, com limites claros.</h2><p>Os roteiros são referências de planejamento. Antes de sair, confirme acesso, clima, funcionamento e pernoite diretamente com cada local.</p></div><Link href="/rotas">Consultar a biblioteca completa →</Link></div>
        <div>{featuredRoutes.map((route) => <Link href={`/rotas/${route.slug}`} key={route.slug}><header><span>{routeModuleLabel(route.module)}</span><b>{route.duration}</b></header><p>{route.category} · {route.level}</p><h3>{route.title}</h3><strong>{route.subtitle}</strong><small>{route.sequence}</small><footer><span className={`route-maturity ${route.maturity}`}>{routeMaturity[route.maturity].symbol} {routeMaturity[route.maturity].short}</span><b>Abrir roteiro →</b></footer></Link>)}</div>
      </section>

      <section className="home-map-section">
        <div className="portal-section-head">
          <div><p className="eyebrow dark">MAPA ROTA PLENA</p><h2>Consulte. Confirme. Depois, siga.</h2><p>O mapa organiza a base disponível, mas cada ponto possui um nível de maturidade. Informação comunitária ajuda a decidir; confirmação direta protege a viagem.</p></div>
          <Link href="/mapa">Abrir o mapa completo →</Link>
        </div>
        <MapExplorer compact />
      </section>

      <section className="phase-truth-band">
        <div><p className="eyebrow">COMPROMISSO ROTA PLENA</p><h2>Não fingiremos conhecer a estrada que ainda não percorremos.</h2></div>
        <p>A base ampla continuará disponível como pesquisa. A primeira fase, porém, dará destaque ao que pode ser aprofundado, conferido e melhorado pela experiência real. Quando algo ainda for planejamento, isso estará escrito com clareza.</p>
      </section>

      <section className="portal-content-band">
        <div className="portal-section-head light"><div><p className="eyebrow">APRENDA SEM COMPRAR POR IMPULSO</p><h2>Conhecimento antes de equipamento.</h2><p>Conteúdo prático para começar pequeno, entender suas necessidades e investir apenas quando a experiência justificar.</p></div><Link href="/aprenda">Ver toda a biblioteca →</Link></div>
        <div className="learning-paths">
          <Link href="/blog/car-camping-liberdade-porta-malas"><span>01</span><div><small>COMECE COM O QUE TEM</small><h3>Car camping</h3><p>A liberdade que já cabe no porta-malas.</p></div></Link>
          <Link href="/blog/escolher-pernoite-seguro"><span>02</span><div><small>SEGURANÇA</small><h3>Escolhendo o pernoite</h3><p>Critérios para avaliar acesso, entorno e estrutura.</p></div></Link>
          <Link href="/ferramentas"><span>03</span><div><small>ORGANIZAÇÃO</small><h3>Checklist de saída</h3><p>Veículo, documentos, água e vida a bordo.</p></div></Link>
        </div>
      </section>

      <section className="home-news-section">
        <div className="portal-section-head"><div><p className="eyebrow dark">NOTÍCIAS & ESTRADA</p><h2>O que muda no caravanismo — com contexto para a sua rota.</h2><p>Fatos verificados sobre destinos, infraestrutura, encontros e decisões que chegam à vida de quem viaja sobre rodas.</p></div><Link href="/noticias">Abrir a editoria →</Link></div>
        <div className="home-news-grid">
          <Link className="home-news-lead" href={`/noticias/${leadNews.slug}`}>
            <div style={{ backgroundImage: `linear-gradient(0deg,rgba(3,38,27,.72),rgba(3,38,27,.02)),url('${leadNews.coverUrl}')` }}><span>DESTAQUE · {leadNews.category}</span></div>
            <article><small>{leadNews.date} · {leadNews.reading}</small><h3>{leadNews.title}</h3><p>{leadNews.excerpt}</p><b>Ler análise →</b></article>
          </Link>
          <Link className="home-news-secondary" href={`/noticias/${secondNews.slug}`}>
            <div style={{ backgroundImage: `url('${secondNews.coverUrl}')` }} />
            <article><small>{secondNews.category} · {secondNews.reading}</small><h3>{secondNews.title}</h3><p>{secondNews.excerpt}</p><b>Continuar lendo →</b></article>
          </Link>
        </div>
      </section>

      {leadArticle && <section className="portal-articles phase-journal">
        <div className="portal-section-head"><div><p className="eyebrow dark">CADERNO DE CONSTRUÇÃO</p><h2>O projeto também vai mostrar o próprio começo.</h2><p>Aprendizados, testes e decisões contados com honestidade — inclusive o que não funcionar.</p></div><Link href="/blog">Ir para o Blog →</Link></div>
        <div className="portal-article-grid">
          <Link className="lead-article" href={`/blog/${leadArticle.slug}`}><div className="article-photo" role="img" aria-label={`Imagem de capa: ${leadArticle.title}`} style={{ backgroundPosition: leadArticle.imagePosition, backgroundImage: leadArticle.coverUrl ? `url("${leadArticle.coverUrl}")` : undefined }} /><div><p>{leadArticle.category} · {leadArticle.reading}</p><h3>{leadArticle.title}</h3><span>{leadArticle.excerpt}</span><b>Continuar lendo →</b></div></Link>
          <div className="phase-journal-note"><span>“</span><h3>Uma rota plena não nasce pronta.</h3><p>Ela se torna confiável quando pesquisa, experiência e comunidade se encontram. Esta primeira fase será construída sem pressa artificial e sem esconder os limites do projeto.</p><Link href="/sobre#manifesto">Conheça nossos princípios →</Link></div>
        </div>
      </section>}

      <section className="portal-community-call phase-community-call">
        <div><p className="eyebrow">COMUNIDADE EM CONSTRUÇÃO</p><h2>Sua primeira descoberta pode ajudar a próxima família.</h2><p>Leia os diários, sugira correções e conte o que encontrou na estrada. A comunidade crescerá junto com a confiança.</p><div><Link className="button button-primary" href="/comunidade">Conhecer a comunidade →</Link><a className="text-link" href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20sugest%C3%A3o">Enviar uma sugestão</a></div></div>
        <aside><b>1</b><span>região por vez</span><b>3</b><span>territórios prioritários</span><b>0</b><span>anúncios desviando o foco</span></aside>
      </section>
      <PortalFooter />
    </main>
  );
}
