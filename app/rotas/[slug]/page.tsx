import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalPage } from "../../components/PortalChrome";
import { RouteIllustratedMap } from "../../components/RouteIllustratedMap";
import { curatedRoutes, findCuratedRoute, routeMaturity, routeModuleLabel } from "../../data/routes";
import { absoluteUrl } from "../../site-config";

const dimensionLabels: Record<string, string> = {
  acesso: "Acesso", pernoite: "Pernoite", emergencia: "Emergência", infraestrutura: "Infraestrutura",
  rodovias: "Rodovias", rodovias_travessias: "Rodovias e travessias", autonomia: "Autonomia",
  sinal: "Sinal", sazonalidade: "Sazonalidade", validacao: "Validação",
};

const compatibilityLabels: Record<string, string> = {
  carro_barraca: "Carro + barraca", pickup_camper: "Pickup camper", van_camper: "Van camper",
  motorhome_ate_7m: "Motorhome até 7 m", motorhome_grande: "Motorhome grande", trailer: "Trailer",
  dependencia_validacao: "Dependência de validação", observacao: "Observação",
};

const detailLabels: Record<string, string> = {
  cadeia_local: "Rede local", polo_regional: "Polo regional", acionamento: "Acionamento", socorro_rodoviario: "Socorro rodoviário",
  risco_principal: "Risco principal", protocolo: "Protocolo", score_emergencia: "Leitura de emergência", status: "Situação",
  polos_tecnicos: "Polos técnicos", diesel_pesados: "Diesel e pesados", pneus_baterias: "Pneus e baterias", solar_offgrid: "Solar e off-grid",
  fallback: "Retaguarda", lacuna_critica: "Lacuna crítica", protocolo_pane: "Em caso de pane", score_infra: "Leitura de infraestrutura", maturidade: "Maturidade",
};

const plannerHref = (cities: string[]) => {
  if (!cities.length) return "/planejar";
  const params = new URLSearchParams();
  params.set("origem", cities[0]);
  params.set("destino", cities[cities.length - 1]);
  cities.slice(1, -1).slice(0, 5).forEach((city) => params.append("parada", city));
  return `/planejar?${params.toString()}`;
};

const safeHost = (source: string) => {
  try { return new URL(source).hostname.replace(/^www\./, ""); } catch { return "Fonte da rota"; }
};

export function generateStaticParams() {
  return curatedRoutes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = findCuratedRoute(slug);
  if (!route) return {};
  const url = absoluteUrl(`/rotas/${route.slug}`);
  return {
    title: route.title,
    description: route.subtitle,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: route.title, description: route.subtitle },
  };
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = findCuratedRoute(slug);
  if (!route) notFound();
  const maturity = routeMaturity[route.maturity];
  const planner = plannerHref(route.cities);
  const related = curatedRoutes.filter((item) => item.slug !== route.slug && (item.region === route.region || routeModuleLabel(item.module) === routeModuleLabel(route.module))).slice(0, 3);
  const emergencyEntries = Object.entries(route.emergency);
  const infrastructureEntries = Object.entries(route.infrastructure);
  const compatibilityEntries = Object.entries(route.compatibility);

  const routeSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: route.title,
    description: route.subtitle,
    url: absoluteUrl(`/rotas/${route.slug}`),
    touristType: "Caravanismo e viagem sobre rodas",
    itinerary: route.cities.map((city, index) => ({ "@type": "Place", name: city, position: index + 1 })),
    provider: { "@type": "Organization", name: "Rota Plena", url: absoluteUrl("/") },
  };

  return <PortalPage className="route-detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(routeSchema) }} />
    <section className={`route-detail-hero ${route.maturity}`}>
      <div><Link href="/rotas">← Todas as rotas</Link><p>{routeModuleLabel(route.module)} · {route.seal}</p><h1>{route.title}</h1><strong>{route.subtitle}</strong><span className={`route-maturity ${route.maturity}`}>{maturity.symbol} {maturity.label}</span></div>
      <aside><span><small>DURAÇÃO</small><b>{route.duration}</b></span><span><small>NÍVEL</small><b>{route.level}</b></span><span><small>MELHOR ÉPOCA</small><b>{route.bestSeason}</b></span>{route.score !== null && <span><small>LEITURA TÉCNICA</small><b>{route.score}/100</b></span>}</aside>
    </section>

    {route.maturity === "estudo" && <section className="route-study-warning"><span>!</span><div><b>Esta rota ainda não é um roteiro operacional.</b><p>A planilha a classifica como bloqueada até validação de campo. A página preserva o conceito e os riscos para transparência, mas não deve ser usada como instrução de viagem.</p></div></section>}

    <section className="route-detail-shell">
      <nav className="route-page-actions"><Link href={planner}>Traçar esta rota no planejador →</Link><Link href={`/mapa?busca=${encodeURIComponent(route.cities[0] || route.region)}`}>Explorar pontos no mapa</Link><span>O PDF completo é gerado depois que o trajeto for calculado.</span></nav>

      <RouteIllustratedMap route={route} />

      <section className="route-roadbook">
        <header><p className="eyebrow dark">CADERNO DE ROTA</p><h2>O caminho, etapa por etapa.</h2><p>{route.profile}</p></header>
        <ol>{route.cities.map((city, index) => <li key={`${city}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{city}</b><Link href={`/mapa?busca=${encodeURIComponent(city)}`}>Ver pontos próximos →</Link></div></li>)}</ol>
        <div className="route-roads"><b>Rodovias e acessos principais</b><p>{route.roads.join(" · ") || "Confirmar conforme o percurso escolhido"}</p></div>
      </section>

      <section className="route-essential-grid">
        <article><span>◇</span><small>EXPERIÊNCIA</small><h2>O que dá sentido à rota</h2><ul>{route.highlights.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span>⌁</span><small>VEÍCULO E CONDUÇÃO</small><h2>Compatibilidade</h2><p>{route.vehicle}</p><b>Nível operacional: {route.level}</b></article>
        <article><span>☾</span><small>PERNOITE</small><h2>Bases e cautelas</h2><p>{route.overnight}</p><b>Confirme acesso, vaga, energia e descarte diretamente com o local.</b></article>
        <article className="alert"><span>!</span><small>ATENÇÕES PARA RV</small><h2>Antes de seguir</h2><p>{route.alerts}</p><b>{route.publicationStatus}</b></article>
      </section>

      {route.score !== null && <section className="route-score-panel">
        <div><p className="eyebrow">LEITURA ROTA PLENA</p><b>{route.score}</b><span>/100</span><h2>{route.classification}</h2><p>{route.scoreNote}</p></div>
        <div>{Object.entries(route.scoreDimensions).map(([key, value]) => <article key={key}><span>{dimensionLabels[key] || key.replaceAll("_", " ")}</span><div><i style={{ width: `${Number(value) * 10}%` }} /></div><b>{value}/10</b></article>)}</div>
      </section>}

      {(emergencyEntries.length > 0 || infrastructureEntries.length > 0) && <section className="route-support-panels">
        {emergencyEntries.length > 0 && <article><header><span>✚</span><div><small>SOCORRO E EMERGÊNCIA</small><h2>Uma cadeia antes da urgência.</h2></div></header><dl>{emergencyEntries.map(([key, value]) => <div key={key}><dt>{detailLabels[key] || key.replaceAll("_", " ")}</dt><dd>{value}</dd></div>)}</dl><p>Em emergência, confirme o serviço competente e informe rodovia, km, sentido, último ponto conhecido e coordenadas quando disponíveis.</p></article>}
        {infrastructureEntries.length > 0 && <article><header><span>⚙</span><div><small>APOIO TÉCNICO</small><h2>Onde a viagem encontra retaguarda.</h2></div></header><dl>{infrastructureEntries.map(([key, value]) => <div key={key}><dt>{detailLabels[key] || key.replaceAll("_", " ")}</dt><dd>{value}</dd></div>)}</dl></article>}
      </section>}

      {compatibilityEntries.length > 0 && <section className="route-compatibility"><header><p className="eyebrow dark">QUAL É O SEU VEÍCULO?</p><h2>Compatibilidade sugerida para esta rota.</h2></header><div>{compatibilityEntries.map(([key, value]) => <article key={key} className={String(value).includes("NÃO") ? "avoid" : String(value).includes("CAUTELA") ? "caution" : "ok"}><span>{compatibilityLabels[key] || key}</span><b>{value}</b></article>)}</div></section>}

      {route.places.length > 0 && <section className="route-nearby-places"><header><div><p className="eyebrow dark">BASE CONECTADA</p><h2>Pontos relacionados ao caminho.</h2><p>{route.placeCount} registros publicáveis foram encontrados nas cidades desta rota. A seleção abaixo prioriza apoio, natureza, cultura e alimentação.</p></div><Link href={`/mapa?busca=${encodeURIComponent(route.cities[0] || route.region)}`}>Abrir no mapa →</Link></header><div>{route.places.slice(0, 9).map((place) => <article key={place.slug || place.nome}><small>{String(place.subcategoria || place.categoria || "Ponto").replaceAll("_", " ")}</small><h3>{place.nome}</h3><p>{place.cidade}{place.uf ? ` · ${place.uf}` : ""}</p>{place.observacao && <span>{place.observacao}</span>}<footer>{place.aceita_rv === "SIM" && <b>Aceita RV</b>}{place.tem_estacionamento === "SIM" && <b>Estacionamento</b>}{place.revisar === "SIM" && <b>Confirmar coordenada</b>}</footer></article>)}</div></section>}

      {route.crossings.length > 0 && <section className="route-crossings"><header><p className="eyebrow dark">TRAVESSIAS E TARIFAS</p><h2>Custos que mudam conforme o veículo.</h2></header><div>{route.crossings.map((crossing, index) => <article key={index}><b>{crossing.travessia}</b><span>{crossing.categoria_RV}</span><strong>R$ {Number(crossing["tarifa_base_R$"]).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong><small>{crossing.periodo} · {crossing.status}</small><p>{crossing.observacao}</p></article>)}</div><p>Tarifas são referências da data da base. Consulte a operadora antes da viagem.</p></section>}

      <section className="route-sources"><div><p className="eyebrow dark">FONTES E RESPONSABILIDADE</p><h2>Informação rastreável, decisão confirmada.</h2><p>As fontes abaixo sustentam a pesquisa inicial. Condições de estrada, tarifas, parques, campings, serviços e horários podem mudar.</p></div><nav>{route.sources.map((source) => <a key={source} href={source} target="_blank" rel="noreferrer">{safeHost(source)} ↗</a>)}</nav></section>

      <section className="route-related"><header><p className="eyebrow dark">CONTINUE EXPLORANDO</p><h2>Outras rotas deste território.</h2></header><div>{related.map((item) => <Link href={`/rotas/${item.slug}`} key={item.slug}><small>{routeModuleLabel(item.module)} · {item.duration}</small><h3>{item.title}</h3><span>{item.subtitle}</span><b>Abrir roteiro →</b></Link>)}</div></section>
    </section>
  </PortalPage>;
}
