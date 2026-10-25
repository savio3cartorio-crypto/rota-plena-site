export const SITE_URL = "https://rotaplena.com.br";
export const SITE_NAME = "Rota Plena";
export const SITE_DESCRIPTION =
  "Portal brasileiro de apoio ao caravanismo, com rotas, campings, pontos de apoio, mapas, ferramentas, guias e comunidade.";

// O site é publicado com barra final (/mapa/), então as URLs canônicas seguem o mesmo padrão.
export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const cut = normalized.search(/[?#]/);
  const pathname = cut === -1 ? normalized : normalized.slice(0, cut);
  const rest = cut === -1 ? "" : normalized.slice(cut);
  const withSlash = pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname) ? pathname : `${pathname}/`;
  return new URL(`${withSlash}${rest}`, SITE_URL).toString();
};

