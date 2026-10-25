import Link from "next/link";
import type { CuratedRoute } from "../data/routes";

type ScenicTheme = "coast" | "mountain" | "heritage" | "countryside";

const themeFor = (route: CuratedRoute): ScenicTheme => {
  const text = `${route.title} ${route.subtitle} ${route.profile} ${route.region} ${route.module}`.toLocaleLowerCase("pt-BR");
  if (/litoral|costa|ilha|praia|mar|travessia|lsp_/.test(text)) return "coast";
  if (/serra|montanha|canastra|mantiqueira|pico|sm_/.test(text)) return "mountain";
  if (/cafe|café|hist|imperial|patrimonio|patrimônio/.test(text)) return "heritage";
  return "countryside";
};

const themeLabels: Record<ScenicTheme, { scene: string; subtitle: string }> = {
  coast: { scene: "Costa, mata e mar", subtitle: "Entre enseadas, bases continentais e caminhos costeiros" },
  mountain: { scene: "Serras e horizontes", subtitle: "Um caminho desenhado entre vales, picos e cidades de altitude" },
  heritage: { scene: "Memória e paisagem", subtitle: "Estradas que conectam patrimônio, cultura e natureza" },
  countryside: { scene: "Estrada e interior", subtitle: "Uma travessia ilustrada por campos, rios e pequenas cidades" },
};

const compactLabel = (label: string) => label.length > 25 ? `${label.slice(0, 23).trim()}…` : label;

const sampledStops = (cities: string[]) => {
  const unique = cities.filter((city, index) => city && cities.indexOf(city) === index);
  if (unique.length <= 8) return unique;
  const indexes = [0, 1, 2, Math.floor(unique.length / 2), unique.length - 3, unique.length - 2, unique.length - 1];
  return indexes.map((index) => unique[index]).filter((city, index, list) => list.indexOf(city) === index);
};

export function RouteIllustratedMap({ route }: { route: CuratedRoute }) {
  const theme = themeFor(route);
  const labels = themeLabels[theme];
  const stops = sampledStops(route.cities.length ? route.cities : [route.region]);
  const points = stops.map((city, index) => ({
    city,
    x: stops.length === 1 ? 500 : 90 + (index * 820) / (stops.length - 1),
    y: 310 - Math.sin(index * 1.55) * 92 - (index % 2 ? 22 : 0),
  }));
  const road = points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const middle = (previous.x + point.x) / 2;
    return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
  }, points.length ? `M ${points[0].x} ${points[0].y}` : "");
  const mapQuery = route.cities.join(" / ") || route.region;

  return <section className={`route-art-map ${theme}`} aria-labelledby={`route-map-${route.slug}`}>
    <header>
      <div><p className="eyebrow">MAPA ILUSTRADO DA JORNADA</p><h2 id={`route-map-${route.slug}`}>{route.title}</h2><span>{labels.subtitle}</span></div>
      <aside><small>PAISAGEM</small><b>{labels.scene}</b></aside>
    </header>
    <div className="route-art-scroll" tabIndex={0} aria-label={`Percurso ilustrativo de ${route.title}. Deslize horizontalmente para explorar.`}>
      <svg viewBox="0 0 1000 500" role="img" aria-labelledby={`route-map-title-${route.slug} route-map-desc-${route.slug}`}>
        <title id={`route-map-title-${route.slug}`}>{`Mapa artístico do roteiro ${route.title}`}</title>
        <desc id={`route-map-desc-${route.slug}`}>{`Representação ilustrativa, fora de escala, passando por ${stops.join(", ")}.`}</desc>
        <defs>
          <linearGradient id={`sky-${route.slug}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cde9dd"/><stop offset="1" stopColor="#f7e8b6"/></linearGradient>
          <linearGradient id={`land-${route.slug}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#487d4f"/><stop offset="1" stopColor="#173f31"/></linearGradient>
          <linearGradient id={`water-${route.slug}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4ba6b0"/><stop offset="1" stopColor="#176f82"/></linearGradient>
          <filter id={`shadow-${route.slug}`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#082d20" floodOpacity=".3"/></filter>
        </defs>
        <rect width="1000" height="500" fill={`url(#sky-${route.slug})`}/>
        <circle cx="825" cy="92" r="46" fill="#f4ba36" opacity=".9"/>
        <path d="M0 245 Q115 125 250 245 T505 218 T755 240 T1000 175 V500 H0Z" fill="#7fa16a" opacity=".72"/>
        <path d="M0 310 Q125 185 270 318 T545 274 T785 302 T1000 248 V500 H0Z" fill={`url(#land-${route.slug})`}/>
        {theme === "coast" && <><path d="M0 402 Q170 367 350 409 T720 390 T1000 405 V500 H0Z" fill={`url(#water-${route.slug})`}/><path d="M0 405 Q170 370 350 412 T720 393 T1000 408" fill="none" stroke="#d7f2e7" strokeWidth="7" opacity=".8"/></>}
        {theme === "mountain" && <><path d="M20 303 L150 122 274 306Z" fill="#315e44" opacity=".92"/><path d="M105 185 L150 122 194 186" fill="#eef2df" opacity=".85"/><path d="M690 286 L805 132 940 294Z" fill="#284f3b" opacity=".9"/><path d="M764 187 L805 132 850 189" fill="#eef2df" opacity=".82"/></>}
        {theme === "heritage" && <g fill="#efd7a0" stroke="#725b31" strokeWidth="4"><path d="M90 365V280h88v85M106 280v-42h56v42M122 238v-27h23v27"/><path d="M815 350v-74h92v74M836 276v-34h50v34"/></g>}
        <g opacity=".82" fill="#184836">{[45,125,215,315,410,535,645,750,865,950].map((x, index) => <path key={x} d={`M${x} ${365 + (index % 3) * 15} l18 -42 18 42h-12l15 31h-48l15-31z`}/>)}</g>
        <path d={road} fill="none" stroke="#fff8df" strokeWidth="15" strokeLinecap="round" filter={`url(#shadow-${route.slug})`}/>
        <path d={road} fill="none" stroke="#d5a126" strokeWidth="6" strokeLinecap="round" strokeDasharray="4 13"/>
        {points.map((point, index) => <g key={`${point.city}-${index}`} transform={`translate(${point.x} ${point.y})`}>
          <circle r="25" fill="#073d2a" stroke="#fff" strokeWidth="7" filter={`url(#shadow-${route.slug})`}/>
          <text y="7" textAnchor="middle" fill="#f7c74c" fontSize="18" fontWeight="800">{String(index + 1).padStart(2, "0")}</text>
          <rect x="-79" y={index % 2 ? 39 : -79} width="158" height="34" rx="17" fill="#fff" opacity=".95"/>
          <text x="0" y={index % 2 ? 61 : -57} textAnchor="middle" fill="#173e2e" fontSize="13" fontWeight="700">{compactLabel(point.city)}</text>
        </g>)}
        <g transform="translate(870 425)" filter={`url(#shadow-${route.slug})`}><rect x="-52" y="-24" width="104" height="48" rx="12" fill="#fff"/><path d="M-32 8h64M-22 8l8-22h29l8 22M-27 8a8 8 0 1016 0M16 8a8 8 0 1016 0" fill="none" stroke="#073d2a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g>
      </svg>
    </div>
    <footer>
      <p><b>Leitura afetiva do percurso.</b> Ilustração fora de escala; confirme distâncias, acessos e condições no planejador.</p>
      <nav><Link href={`/mapa?busca=${encodeURIComponent(mapQuery)}`}>Ver pontos no mapa real</Link><Link href={`/planejar?origem=${encodeURIComponent(route.cities[0] || route.region)}&destino=${encodeURIComponent(route.cities[route.cities.length - 1] || route.region)}`}>Planejar esta viagem →</Link></nav>
    </footer>
  </section>;
}
