import routeCatalog from "./routes-catalog.json";

export type RoutePlace = {
  slug?: string | null;
  nome?: string | null;
  categoria?: string | null;
  subcategoria?: string | null;
  cidade?: string | null;
  uf?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  observacao?: string | null;
  link_referencia?: string | null;
  aceita_rv?: string | null;
  pet_friendly?: string | null;
  tem_energia?: string | null;
  tem_sanitario?: string | null;
  tem_estacionamento?: string | null;
  tem_descarte_rv?: string | null;
  tem_alimentacao?: string | null;
  revisar?: string | null;
};

export type CuratedRoute = {
  id: string;
  slug: string;
  title: string;
  seal: string;
  subtitle: string;
  category: string;
  duration: string;
  priority: string;
  region: string;
  module: string;
  sequence: string;
  cities: string[];
  profile: string;
  bestSeason: string;
  level: string;
  vehicle: string;
  overnight: string;
  highlights: string[];
  roads: string[];
  alerts: string;
  editorialStrategy: string;
  status: string;
  publicationStatus: string;
  maturity: "com-alertas" | "planejamento" | "estudo";
  score: number | null;
  classification: string | null;
  scoreNote: string | null;
  scoreDimensions: Record<string, number>;
  emergency: Record<string, string | number>;
  infrastructure: Record<string, string | number>;
  compatibility: Record<string, string | number>;
  crossings: Array<Record<string, string | number | null>>;
  places: RoutePlace[];
  placeCount: number;
  sources: string[];
};

export const curatedRoutes = routeCatalog.routes as unknown as CuratedRoute[];
export const routesUpdatedAt = routeCatalog.updatedAt;

export const routeModuleLabel = (module: string) => {
  if (module.startsWith("SM_")) return "Sul de Minas";
  if (module.startsWith("SF_")) return "Sul Fluminense";
  if (module.startsWith("LSP_")) return "Litoral de São Paulo";
  if (module.includes("LESTE")) return "Leste Paulista";
  return "Rotas regionais";
};

export const routeMaturity = {
  "com-alertas": { label: "Publicável com alertas", short: "Com alertas", symbol: "✓" },
  planejamento: { label: "Roteiro em planejamento", short: "Em planejamento", symbol: "◇" },
  estudo: { label: "Estudo — não executar", short: "Em estudo", symbol: "!" },
} as const;

export const findCuratedRoute = (slug: string) => curatedRoutes.find((route) => route.slug === slug);

