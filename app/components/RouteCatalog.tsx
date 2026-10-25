"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { routeMaturity, routeModuleLabel, type CuratedRoute } from "../data/routes";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

const journeys = [
  { id: "todas", label: "Todas", symbol: "◎", pattern: /.*/ },
  { id: "primeira", label: "Primeira viagem", symbol: "◌", pattern: /leve|escapada|tranquil|estreia|famil/ },
  { id: "natureza", label: "Natureza", symbol: "⌁", pattern: /natureza|parque|praia|serra|cachoeira|trilha|montanha/ },
  { id: "sabores", label: "Sabores e cultura", symbol: "◇", pattern: /gastronomia|cafe|vinho|cultura|historia|patrimonio|rural/ },
  { id: "expedicao", label: "Expedição", symbol: "↟", pattern: /expedicao|exigente|remot|autonomia/ },
];

export default function RouteCatalog({ routes }: { routes: CuratedRoute[] }) {
  const [query, setQuery] = useState("");
  const [journey, setJourney] = useState("todas");
  const [module, setModule] = useState("todos");
  const [level, setLevel] = useState("todos");

  const modules = useMemo(() => Array.from(new Set(routes.map((route) => routeModuleLabel(route.module)))), [routes]);
  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    const selectedJourney = journeys.find((item) => item.id === journey) ?? journeys[0];
    return routes.filter((route) => {
      const haystack = normalize(`${route.title} ${route.subtitle} ${route.region} ${route.sequence} ${route.profile} ${route.highlights.join(" ")} ${route.level} ${route.category}`);
      return (!needle || haystack.includes(needle))
        && (journey === "todas" || selectedJourney.pattern.test(haystack))
        && (module === "todos" || routeModuleLabel(route.module) === module)
        && (level === "todos" || normalize(route.level).includes(level));
    });
  }, [routes, query, journey, module, level]);

  const surprise = () => {
    const options = filtered.filter((route) => route.maturity !== "estudo");
    const route = options[Math.floor(Math.random() * options.length)];
    if (route) window.location.href = `/rotas/${route.slug}`;
  };

  return <section className="route-catalog-shell">
    <div className="route-playful-chooser">
      <div><p className="eyebrow dark">COMO VOCÊ QUER VIAJAR?</p><h2>Escolha pelo desejo, não apenas pelo destino.</h2></div>
      <div>{journeys.map((item) => <button key={item.id} type="button" className={journey === item.id ? "active" : ""} onClick={() => setJourney(item.id)}><span>{item.symbol}</span><b>{item.label}</b></button>)}</div>
    </div>

    <div className="route-catalog-toolbar">
      <label><span>Buscar rota, cidade ou experiência</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Ubatuba, café, serra, cachoeira..." /></label>
      <label><span>Território</span><select value={module} onChange={(event) => setModule(event.target.value)}><option value="todos">Todos os territórios</option>{modules.map((name) => <option key={name}>{name}</option>)}</select></label>
      <label><span>Nível operacional</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option value="todos">Todos os níveis</option><option value="leve">Leve</option><option value="moderado">Moderado</option><option value="exigente">Exigente</option></select></label>
      <button type="button" onClick={surprise}>✦ Surpreenda-me</button>
      <p><b>{filtered.length}</b> roteiros encontrados. Os selos indicam maturidade editorial, não substituem a confirmação das condições reais.</p>
    </div>

    <div className="route-catalog-grid">
      {filtered.map((route) => {
        const maturity = routeMaturity[route.maturity];
        return <article key={route.slug} className={`route-catalog-card ${route.maturity}`}>
          <header><span>{routeModuleLabel(route.module)}</span><b>{route.seal}</b></header>
          <div className="route-catalog-card-body">
            <p>{route.category} · {route.duration}</p>
            <h3>{route.title}</h3>
            <strong>{route.subtitle}</strong>
            <div className="route-card-path">{route.sequence}</div>
            <dl><div><dt>Nível</dt><dd>{route.level}</dd></div><div><dt>Melhor época</dt><dd>{route.bestSeason}</dd></div>{route.score !== null && <div><dt>Leitura técnica</dt><dd>{route.score}/100</dd></div>}</dl>
          </div>
          <footer><span className={`route-maturity ${route.maturity}`}>{maturity.symbol} {maturity.short}</span><Link href={`/rotas/${route.slug}`}>Abrir roteiro →</Link></footer>
        </article>;
      })}
    </div>
    {!filtered.length && <div className="route-catalog-empty"><span>⌕</span><h3>Nenhuma rota com essa combinação.</h3><p>Remova um filtro ou experimente buscar por uma experiência mais ampla.</p></div>}
  </section>;
}

