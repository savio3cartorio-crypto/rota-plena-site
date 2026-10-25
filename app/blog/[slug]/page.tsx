import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalPage } from "../../components/PortalChrome";
import { getPublishedArticles } from "../../../db/cms";
import { absoluteUrl } from "../../site-config";
import { FormattedArticleText } from "../../components/FormattedArticleText";
import { isCronica } from "../../data/editorial";


export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublishedArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = absoluteUrl(`/blog/${article.slug}`);
  const images = article.coverUrl ? [{ url: article.coverUrl, alt: article.title }] : undefined;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    authors: [{ name: article.authorName || "Sávio Antonio Americano" }],
    openGraph: { type: "article", url, title: article.title, description: article.excerpt, images },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getPublishedArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const seriesArticles = article.series
    ? articles.filter((item) => item.series?.name === article.series?.name).sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0))
    : [];
  const seriesIndex = seriesArticles.findIndex((item) => item.slug === article.slug);
  const previousArticle = seriesIndex > 0 ? seriesArticles[seriesIndex - 1] : undefined;
  const nextArticle = seriesIndex >= 0 && seriesIndex < seriesArticles.length - 1 ? seriesArticles[seriesIndex + 1] : undefined;
  const returnToDiary = isCronica(article.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: article.authorName || "Sávio Antonio Americano" },
    publisher: { "@type": "Organization", name: "Rota Plena", url: absoluteUrl("/") },
    ...(article.coverUrl ? { image: absoluteUrl(article.coverUrl) } : {}),
  };
  return <PortalPage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <article className="article-page">
      <header><Link href={returnToDiary ? "/diario/" : "/comecar/#guias"}>← {returnToDiary ? "Diário de estrada" : "Guias práticos"}</Link><p>{article.category}{article.series ? ` · ${article.series.name} ${String(article.series.order).padStart(2, "0")}/${article.series.total}` : ""} · {article.reading}</p><h1>{article.title}</h1><div>{article.excerpt}</div><small>Por {article.authorName || "Sávio Antonio Americano"} · {article.date}</small></header>
      <div className="article-cover" role="img" aria-label={`Imagem de capa: ${article.title}`} style={{ backgroundPosition: article.imagePosition, backgroundImage: article.coverUrl ? `url("${article.coverUrl}")` : undefined }} />
      <div className="article-body">
        {article.content.map((section, index) => <section key={index} className={section.heading === "Dica Rota Plena" ? "article-tip" : undefined}>{section.heading && <h2><FormattedArticleText text={section.heading} /></h2>}{section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${index}-${paragraphIndex}`}><FormattedArticleText text={paragraph} /></p>)}{section.image && <figure className="article-inline-image"><img src={section.image.src} alt={section.image.alt} loading="lazy" />{section.image.caption && <figcaption>{section.image.caption}</figcaption>}</figure>}</section>)}
        {article.slug === "car-camping-liberdade-porta-malas" && <>
          <nav className="article-next-steps" aria-label="Próximos passos para começar no car camping">
            <p>CONTINUE SUA ROTA</p>
            <h2>Da inspiração ao primeiro fim de semana.</h2>
            <div>
              <Link href="/destinos/"><span>01</span><b>Escolher um destino perto</b><small>Vale do Paraíba, Mantiqueira e Litoral Norte.</small></Link>
              <Link href="/planejar"><span>02</span><b>Planejar a primeira rota</b><small>Organize ritmo, paradas, custos e alternativas.</small></Link>
              <Link href="/ferramentas"><span>03</span><b>Preparar o carro</b><small>Use checklist, autonomia e ficha de pernoite.</small></Link>
            </div>
          </nav>
          <section className="article-sources">
            <h2>Fontes oficiais e atualização</h2>
            <p>As regras podem mudar e cada adaptação precisa ser analisada conforme o veículo e o projeto. Consulte o <a href="https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm" target="_blank" rel="noreferrer">Código de Trânsito Brasileiro</a>, a <a href="https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9162022ANEXO.pdf" target="_blank" rel="noreferrer">Resolução CONTRAN nº 916/2022 e seus anexos</a> e o procedimento do órgão de trânsito do seu Estado. Em São Paulo, veja o serviço oficial de <a href="https://servicos.sp.gov.br/fcarta/164A8FA3-1786-4544-981D-30E0C543EAF4" target="_blank" rel="noreferrer">autorização prévia para modificações</a>.</p>
          </section>
        </>}
        {article.slug === "estacao-energia-placas-solares-caravanismo" && <>
          <nav className="article-next-steps energy-next-steps" aria-label="Calcular o sistema de energia da viagem">
            <p>LEVE O TEXTO PARA A SUA ROTINA</p>
            <h2>Dimensione antes de comprar.</h2>
            <div>
              <Link href="/ferramentas"><span>01</span><b>Calcular consumo e autonomia</b><small>Informe seus aparelhos, estação e placas solares.</small></Link>
              <Link href="/planejar"><span>02</span><b>Relacionar energia e viagem</b><small>Considere dias, ritmo, paradas e formas de recarga.</small></Link>
              <Link href="/blog/documentos-e-copias-offline"><span>03</span><b>Preparar o plano alternativo</b><small>Leve informações e contatos mesmo sem sinal.</small></Link>
            </div>
          </nav>
          <section className="article-sources">
            <h2>Fontes técnicas consultadas</h2>
            <p>As especificações variam entre modelos e versões. Consulte sempre o manual do seu equipamento. Este guia utilizou como referências as fichas oficiais da <a href="https://br.bluettipower.com/products/ac50b-estacao-de-energia-portatil" target="_blank" rel="noreferrer">Bluetti AC50B</a> e da <a href="https://br.ecoflow.com/products/delta-2-solar-generator-ecoflow-pv400w" target="_blank" rel="noreferrer">EcoFlow DELTA 2</a>; as orientações de associação e limites fotovoltaicos da <a href="https://www.victronenergy.com/media/pg/Manual_BlueSolar_MPPT_75-10_up_to_100-20/en/installation.html" target="_blank" rel="noreferrer">documentação MPPT da Victron Energy</a>; o <a href="https://labren.ccst.inpe.br/atlas_2017.html" target="_blank" rel="noreferrer">Atlas Brasileiro de Energia Solar do INPE</a>; e o modelo de geração e perdas do <a href="https://pvwatts.nrel.gov/version_8.php" target="_blank" rel="noreferrer">PVWatts, do NREL</a>.</p>
          </section>
        </>}
        {article.slug === "viajar-depois-dos-50-a-vida-nao-precisa-esperar" && <>
          <nav className="article-next-steps" aria-label="Primeiros passos para começar a viajar">
            <p>TRANSFORME A VONTADE EM CAMINHO</p>
            <h2>Sua primeira rota pode começar perto.</h2>
            <div>
              <Link href="/mapa"><span>01</span><b>Encontrar um destino próximo</b><small>Explore lugares, campings e pontos de apoio.</small></Link>
              <Link href="/planejar"><span>02</span><b>Planejar uma viagem possível</b><small>Organize distâncias, pausas, custos e alternativas.</small></Link>
              <Link href="/ferramentas"><span>03</span><b>Preparar a saída</b><small>Use os checklists e recursos do Rota Plena.</small></Link>
            </div>
          </nav>
          <section className="article-sources">
            <h2>Fonte consultada</h2>
            <p>O dado sobre a duração das viagens foi consultado na <a href="https://www.gov.br/turismo/pt-br/acesso-a-informacao/acoes-e-programas/rede-inteligencia-mercado/revista-tendencias-2026-v02_compressed.pdf" target="_blank" rel="noreferrer">Revista Tendências do Turismo 2026, do Ministério do Turismo</a>.</p>
          </section>
        </>}
        {article.series && <nav className="article-series-navigation" aria-label={`Navegação da série ${article.series.name}`}>
          <header><span>SÉRIE EDITORIAL</span><b>{article.series.name}</b><small>Matéria {String(article.series.order).padStart(2, "0")} de {article.series.total}</small></header>
          <div>
            {previousArticle ? <Link href={`/blog/${previousArticle.slug}`} className="previous"><small>← Matéria anterior</small><b>{previousArticle.title}</b></Link> : <span className="series-edge"><small>Você está no começo</small><b>O sonho começa por aqui.</b></span>}
            {nextArticle ? <Link href={`/blog/${nextArticle.slug}`} className="next"><small>Próxima matéria →</small><b>{nextArticle.title}</b></Link> : <Link href="/comecar/#guias" className="next"><small>Série concluída</small><b>Voltar aos guias →</b></Link>}
          </div>
        </nav>}
        {article.slug === "a-estrada-que-eu-queria-mostrar-a-clara" ? <aside><b>Sobre este relato</b><p>Uma experiência pessoal de Sávio Americano e sua família, preservada como memória de estrada e parte da origem do projeto Rota Plena.</p></aside> : <aside><b>Nota editorial Rota Plena</b><p>Conteúdo de segurança e manutenção deve ser conferido com o fabricante, profissional habilitado ou fonte oficial aplicável ao seu veículo e à sua viagem.</p></aside>}
      </div>
    </article>
  </PortalPage>;
}
