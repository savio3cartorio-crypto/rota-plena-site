import type { MetadataRoute } from "next";
import { getPublishedArticles } from "../db/cms";
import { publishedRoutes } from "./data/routes";
import { absoluteUrl } from "./site-config";
import { getPublicDiarySitemapEntries } from "../db/diaries";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, publicDiaries] = await Promise.all([getPublishedArticles(), getPublicDiarySitemapEntries()]);
  const publicRoutes = ["", "/comecar", "/destinos", "/destinos/vale-do-paraiba", "/destinos/sul-de-minas", "/rotas", "/diario", "/mapa", "/ferramentas", "/planejar", "/sobre", "/creditos-visuais", "/privacidade", "/termos", "/cookies"];
  return [
    ...publicRoutes.map((route) => ({ url: absoluteUrl(route || "/"), lastModified: new Date("2026-10-25"), changeFrequency: route === "" || route === "/diario" || route === "/comecar" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...publishedRoutes.map((route) => ({ url: absoluteUrl(`/rotas/${route.slug}`), lastModified: new Date("2026-08-03"), changeFrequency: "monthly" as const, priority: route.maturity === "com-alertas" ? .78 : .62 })),
    ...articles.map((article) => ({ url: absoluteUrl(`/blog/${article.slug}`), lastModified: new Date("2026-10-25"), changeFrequency: "monthly" as const, priority: .65 })),
    ...publicDiaries.map((entry) => ({ url: absoluteUrl(`/diarios/${entry.id}`), lastModified: new Date(entry.updatedAt), changeFrequency: "yearly" as const, priority: .6 })),
  ];
}
