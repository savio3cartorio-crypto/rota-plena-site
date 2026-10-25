import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "../../db/cms";
import AuthorBlogGrid from "../components/AuthorBlogGrid";
import { PortalPage } from "../components/PortalChrome";


export const metadata: Metadata = {
  title: "Blog do Autor — Sávio Americano",
  description: "Textos, experiências e dicas de Sávio Americano sobre car camping, caravanismo, estradas, escolhas e a construção do projeto Rota Plena.",
};

export default async function AuthorPage() {
  const articles = await getPublishedArticles();
  const authorArticles = articles.filter((article) => !article.authorName || article.authorName.toLocaleLowerCase("pt-BR").includes("sávio") || article.authorName.toLocaleLowerCase("pt-BR").includes("savio"));

  return <PortalPage className="author-blog-page">
    <section className="author-hero">
      <div className="author-hero-copy"><p className="eyebrow">BLOG DO AUTOR</p><h1>A estrada também é feita do que a gente <em>aprende e compartilha.</em></h1><p>Textos pessoais, experiências possíveis e dicas práticas de quem está construindo o próprio caminho no caravanismo — começando com o carro que já tem, perto de casa e sem fingir que todas as respostas estão prontas.</p><nav><a href="#publicacoes" className="button primary">Ler publicações</a><Link href="/sobre" className="button ghost">Conhecer o projeto</Link></nav></div>
      <aside className="author-signature"><span>SA</span><div><small>POR</small><h2>Sávio Antonio Americano</h2><p>Criador do Rota Plena, caravanista em construção e defensor de informação que permanece disponível quando o feed já passou.</p></div></aside>
    </section>

    <section className="author-purpose">
      <header><p className="eyebrow dark">POR QUE ESCREVER</p><h2>Uma conversa honesta entre o sonho e a estrada real.</h2></header>
      <div><article><span>01</span><h3>Textos</h3><p>Reflexões sobre liberdade, tempo, escolhas, família e o sentido de viajar.</p></article><article><span>02</span><h3>Experiências</h3><p>O que funcionou, o que precisa mudar e o que cada saída ensina na prática.</p></article><article><span>03</span><h3>Dicas</h3><p>Orientações úteis sobre preparação, segurança, energia, equipamentos e destinos.</p></article></div>
    </section>

    <section className="author-intro-note"><blockquote>“Não escrevo a partir de uma estrada perfeita. Escrevo enquanto construo a possibilidade de percorrê-la.”</blockquote><p>Este espaço não pretende vender uma vida inalcançável. Ele acompanha a primeira fase do Rota Plena: aprender, organizar, testar perto e transformar cada descoberta em uma referência útil para outras pessoas.</p></section>

    <section className="author-publications" id="publicacoes"><AuthorBlogGrid articles={authorArticles} /></section>

    <section className="author-community-call"><div><p className="eyebrow">A CONVERSA CONTINUA</p><h2>Sua experiência também pode iluminar o caminho de alguém.</h2><p>Leia, questione, sugira correções e participe da comunidade. O Blog do Autor apresenta um olhar; o Rota Plena cresce quando muitos olhares se encontram com responsabilidade.</p></div><nav><Link href="/comunidade" className="button primary">Conhecer a comunidade</Link><Link href="/mapa" className="button ghost">Explorar o mapa</Link></nav></section>
  </PortalPage>;
}

