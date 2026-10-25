import type { MetadataRoute } from "next";
import { getPublishedArticles } from "../db/cms";
import { curatedRoutes } from "./data/routes";
import { absoluteUrl } from "./site-config";
import { getPublicDiarySitemapEntries } from "../db/diaries";
import { newsArticles } from "./data/news";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, publicDiaries] = await Promise.all([getPublishedArticles(), getPublicDiarySitemapEntries()]);
  const publicRoutes = ["", "/comecar", "/mapa", "/guia-do-mapa", "/rotas", "/destinos/vale-do-paraiba", "/destinos/sul-de-minas", "/planejar", "/aprenda", "/ferramentas", "/noticias", "/blog", "/autor", "/diarios", "/comunidade", "/sobre", "/creditos-visuais", "/privacidade", "/termos", "/cookies"];
  return [
    ...publicRoutes.map((route) => ({ url: absoluteUrl(route || "/"), lastModified: new Date("2026-08-04"), changeFrequency: route === "" || route === "/mapa" || route === "/rotas" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...curatedRoutes.map((route) => ({ url: absoluteUrl(`/rotas/${route.slug}`), lastModified: new Date("2026-08-03"), changeFrequency: "monthly" as const, priority: route.maturity === "com-alertas" ? .78 : .62 })),
    ...articles.map((article) => ({ url: absoluteUrl(`/blog/${article.slug}`), lastModified: new Date("2026-07-31"), changeFrequency: "monthly" as const, priority: .65 })),
    ...newsArticles.map((article) => ({ url: absoluteUrl(`/noticias/${article.slug}`), lastModified: new Date(article.dateModified), changeFrequency: "weekly" as const, priority: .78 })),
    ...publicDiaries.map((entry) => ({ url: absoluteUrl(`/diarios/${entry.id}`), lastModified: new Date(entry.updatedAt), changeFrequency: "yearly" as const, priority: .6 })),
  ];
}
