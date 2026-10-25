import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";
import BlogGrid from "../components/BlogGrid";
import { getPublishedArticles } from "../../db/cms";


export const metadata: Metadata = {
  title: "Blog e Revista",
  description: "Textos autorais, guias práticos e experiências sobre caravanismo, car camping, segurança, autonomia e vida sobre rodas.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return <PortalPage>
    <section className="portal-page-hero editorial-hero"><div><p className="eyebrow">BLOG E REVISTA ROTA PLENA</p><h1>Conhecimento, histórias e vida sobre rodas.</h1><p>Textos autorais de Sávio Americano, guias práticos e experiências da comunidade para ler sem pressa e usar na estrada.</p></div></section>
    <section className="portal-inner"><BlogGrid articles={articles} /></section>
  </PortalPage>;
}
