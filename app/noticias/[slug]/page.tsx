import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortalPage } from "../../components/PortalChrome";
import { FormattedArticleText } from "../../components/FormattedArticleText";
import { getNewsArticle, newsArticles } from "../../data/news";
import { absoluteUrl } from "../../site-config";

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  const url = absoluteUrl(`/noticias/${article.slug}`);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    authors: [{ name: "Rota Plena — Redação" }],
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      section: article.category,
      images: [{ url: article.coverUrl, alt: article.coverAlt }],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();
  const related = newsArticles.find((item) => item.slug !== article.slug);
  const articleUrl = absoluteUrl(`/noticias/${article.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: articleUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "pt-BR",
    articleSection: article.category,
    image: absoluteUrl(article.coverUrl),
    author: { "@type": "Organization", name: "Rota Plena — Redação" },
    publisher: { "@type": "Organization", name: "Rota Plena", url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/rota-plena-logo.png") } },
  };

  return <PortalPage className="news-article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="news-article article-page">
      <header>
        <Link href="/noticias">← Voltar para Notícias</Link>
        <p>ROTA PLENA · NOTÍCIAS & ESTRADA · {article.category} · {article.reading}</p>
        <h1>{article.title}</h1>
        <div>{article.excerpt}</div>
        <small>Por Rota Plena — Redação · {article.date} · Conteúdo baseado em fontes identificadas</small>
      </header>
      <figure className="news-article-cover">
        <Image src={article.coverUrl} alt={article.coverAlt} width={1120} height={630} priority unoptimized />
        <figcaption>{article.coverCaption}</figcaption>
      </figure>
      <div className="article-body news-article-body">
        {article.content.map((section, index) => <section key={index}>
          {section.heading && <h2><FormattedArticleText text={section.heading} /></h2>}
          {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${index}-${paragraphIndex}`}><FormattedArticleText text={paragraph} /></p>)}
          {section.callout && <aside className="news-callout"><b>{section.callout.title}</b><p>{section.callout.body}</p></aside>}
        </section>)}

        <section className="news-sources">
          <p className="eyebrow dark">TRANSPARÊNCIA EDITORIAL</p>
          <h2>Fontes consultadas</h2>
          <p>Os fatos, datas e números desta matéria foram conferidos nas fontes abaixo. Links externos abrem a publicação original.</p>
          <ol>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><b>{source.label}</b><span>{source.detail}</span><i>Ver fonte original ↗</i></a></li>)}</ol>
        </section>

        {related && <aside className="news-related">
          <small>CONTINUE ACOMPANHANDO</small>
          <h2>{related.title}</h2>
          <p>{related.excerpt}</p>
          <Link href={`/noticias/${related.slug}`}>Ler a próxima notícia →</Link>
        </aside>}
      </div>
    </article>
  </PortalPage>;
}
