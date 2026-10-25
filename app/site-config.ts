export const SITE_URL = "https://rotaplena.com.br";
export const SITE_NAME = "Rota Plena";
export const SITE_DESCRIPTION =
  "Guia de quem quer começar a viver a estrada perto de casa, com o carro que já tem: car camping, lugares visitados no Vale do Paraíba, na Mantiqueira e no Litoral Norte, roteiros e relatos de Sávio Antonio Americano.";
export const CONTACT_EMAIL = "savio@rotaplena.com.br";
export const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Rota Plena - ${subject}`)}`;

// O site é publicado com barra final (/mapa/), então as URLs canônicas seguem o mesmo padrão.
export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const cut = normalized.search(/[?#]/);
  const pathname = cut === -1 ? normalized : normalized.slice(0, cut);
  const rest = cut === -1 ? "" : normalized.slice(cut);
  const withSlash = pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname) ? pathname : `${pathname}/`;
  return new URL(`${withSlash}${rest}`, SITE_URL).toString();
};

