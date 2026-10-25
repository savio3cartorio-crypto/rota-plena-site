import { articles as fallbackArticles, type Article } from "../app/data/articles";
import cmsArticles from "../app/data/cms/articles.json";
import cmsSiteContent from "../app/data/cms/site_content.json";

type CmsArticleRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverKey: string | null;
  authorName: string;
  status: string;
  readingMinutes: number;
  featured: number;
  publishedAt: number | null;
  createdAt: number;
  updatedAt: number;
};

export function parseArticleBody(body: string): Article["content"] {
  const blocks = body.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const sections: Article["content"] = [];
  for (const block of blocks) {
    if (block.startsWith("## ")) {
      sections.push({ heading: block.slice(3).trim(), paragraphs: [] });
      continue;
    }
    const image = block.match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/);
    if (image) {
      const target = sections.length ? sections[sections.length - 1] : undefined;
      const imageData = { src: image[2], alt: image[1] || "Imagem do artigo", ...(image[3] ? { caption: image[3] } : {}) };
      if (target && !target.image) target.image = imageData;
      else sections.push({ paragraphs: [], image: imageData });
      continue;
    }
    if (!sections.length || sections[sections.length - 1].heading && sections[sections.length - 1].paragraphs.length > 0) {
      sections.push({ paragraphs: [block] });
    } else {
      sections[sections.length - 1].paragraphs.push(block);
    }
  }
  return sections.length ? sections : [{ paragraphs: [body] }];
}

type CmsRaw = { slug:string; title:string; excerpt:string; body:string; category:string; cover_key:string|null; author_name:string; reading_minutes:number; featured:number; published_at:number|null; updated_at:number };

export async function getPublishedArticles(): Promise<Article[]> {
  const rows = (cmsArticles as CmsRaw[]).slice().sort((a, b) => (b.featured - a.featured) || ((b.published_at ?? 0) - (a.published_at ?? 0)) || (b.updated_at - a.updated_at));
  if (!rows.length) return fallbackArticles;
  const databaseArticles = rows.map((row) => {
    const sourceArticle = fallbackArticles.find((article) => article.slug === row.slug);
    const parsedContent = parseArticleBody(row.body).map((section, index) => {
      const sourceSection = sourceArticle?.content.find((item) => item.heading && item.heading === section.heading) ?? sourceArticle?.content[index];
      return sourceSection?.image ? { ...section, image: sourceSection.image } : section;
    });
    return {
      slug: row.slug,
      category: row.category,
      title: row.title,
      excerpt: row.excerpt,
      date: new Date(row.published_at || row.updated_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      reading: `${row.reading_minutes || 5} min`,
      imagePosition: sourceArticle?.imagePosition ?? "center 55%",
      coverUrl: sourceArticle?.coverUrl,
      authorName: row.author_name,
      authorBlog: sourceArticle?.authorBlog,
      featured: Boolean(row.featured),
      series: sourceArticle?.series,
      content: parsedContent,
    };
  });
  const databaseSlugs = new Set(databaseArticles.map((article) => article.slug));
  return [...fallbackArticles.filter((article) => !databaseSlugs.has(article.slug)), ...databaseArticles];
}

export async function getSiteContent(key: string, fallback: { title: string; body: string }) {
  const row = (cmsSiteContent as Array<{ key: string; title: string; body: string; status: string }>).find((item) => item.key === key && item.status === "published");
  return row ? { title: row.title, body: row.body } : fallback;
}

export async function getPublishedSitePages(): Promise<Array<{ key: string; updatedAt: number }>> {
  return [];
}
