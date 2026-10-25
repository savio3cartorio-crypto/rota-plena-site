"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { findValeCity } from "../data/vale-cities";
import { findSulMinasCity } from "../data/sul-minas-cities";

type Place = {
  id: string;
  situacao: string;
  publicar: string;
  nome: string;
  categoria: string;
  subcategoria: string;
  tipo: string;
  uf: string;
  cidade: string;
  bairro_distrito: string;
  endereco: string;
  latitude: string;
  longitude: string;
  observacao: string;
  origem: string;
  link_referencia: string;
  aceita_rv: string;
  aceita_barraca: string;
  pet_friendly: string;
  tem_energia: string;
  tem_agua_quente: string;
  tem_sanitario: string;
  tem_estacionamento: string;
  tem_descarte_rv: string;
  tem_alimentacao: string;
  tem_rio_cachoeira: string;
  tem_trilha: string;
  visitado: string;
  revisar: string;
};

const experienceFilters = [
  { id: "todos", label: "Todos os pontos", pattern: /.*/ },
  { id: "camping-rv", label: "Camping e RV", pattern: /camping|apoio_rv|motorhome|trailer|aceita rv/ },
  { id: "natureza", label: "Natureza", pattern: /cachoeira|mirante|parque|agua_doce|paisagem|atrativo_natural/ },
  { id: "aventura", label: "Trilhas e aventura", pattern: /trilha|montanha|falésia|escalada|cicloturismo|aventura/ },
  { id: "cultura", label: "Cultura e história", pattern: /cultura|patrimonio|religioso|museu|ferroviária/ },
  { id: "gastronomia", label: "Gastronomia", pattern: /gastronomia|restaurante|café|vinícola|cervejaria|alambique/ },
  { id: "apoio", label: "Apoio e serviços", pattern: /posto|estacionamento|oficina|serviço|servico|guia_atividade|infraestrutura/ },
] as const;

const markerClass = (place: Place) => {
  const kind = `${place.categoria} ${place.subcategoria} ${place.tipo}`.toLocaleLowerCase("pt-BR");
  if (/camping|apoio_rv/.test(kind)) return "camp";
  if (/cultura|patrimonio|religioso/.test(kind)) return "culture";
  if (/gastronomia/.test(kind)) return "food";
  if (/oficina|serviço|servico|posto|estacionamento/.test(kind)) return "service";
  return "nature";
};

const normalizeSearch = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLocaleLowerCase("pt-BR");

const searchTerms = (value: string) => value
  .split(/\s*(?:\/|;|→|\|)\s*/)
  .map(normalizeSearch)
  .filter(Boolean);

const genericLocationWords = new Set([
  "centro", "central", "regiao", "arredores", "zona", "base", "continental",
  "norte", "sul", "leste", "oeste", "de", "da", "das", "do", "dos", "e", "em",
]);

const fallbackSearchTokens = (terms: string[]) => terms
  .flatMap((term) => term.split(/\s+/))
  .filter((term) => term.length >= 3 && !genericLocationWords.has(term));

export default function MapExplorer({ compact = false }: { compact?: boolean }) {
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayer = useRef<LeafletMarker[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [query, setQuery] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [category, setCategory] = useState("todos");
  const [onlyVisited, setOnlyVisited] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("busca");
    if (initialQuery) window.setTimeout(() => setQuery(initialQuery), 0);
    Promise.all([
      fetch("/pontos-da-rota.csv").then((response) => response.text()),
      Promise.resolve({ places: [] as Array<Record<string, unknown>> }),
    ]).then(([csv, cms]) => {
      const parsed = Papa.parse<Place>(csv, { header: true, skipEmptyLines: true });
      const cmsPlaces: Place[] = cms.places.map((place) => {
        let amenities: string[] = [];
        try { amenities = JSON.parse(String(place.amenities ?? "[]")) as string[]; } catch { amenities = []; }
        const has = (pattern: RegExp) => amenities.some((item) => pattern.test(item));
        return {
          id: `cms-${place.id}`,
          situacao: "ATIVO",
          publicar: "SIM",
          nome: String(place.name ?? ""),
          categoria: String(place.category ?? "apoio"),
          subcategoria: String(place.category ?? "apoio"),
          tipo: String(place.category ?? "apoio"),
          uf: String(place.state ?? ""),
          cidade: String(place.city ?? ""),
          bairro_distrito: "",
          endereco: String(place.address ?? ""),
          latitude: String(place.latitude ?? ""),
          longitude: String(place.longitude ?? ""),
          observacao: String(place.description ?? ""),
          origem: "CMS Rota Plena",
          link_referencia: String(place.source ?? ""),
          aceita_rv: has(/rv|motorhome|trailer/i) ? "SIM" : "",
          aceita_barraca: has(/barraca/i) ? "SIM" : "",
          pet_friendly: has(/pet/i) ? "SIM" : "",
          tem_energia: has(/energia|tomada/i) ? "SIM" : "",
          tem_agua_quente: has(/água quente|agua quente/i) ? "SIM" : "",
          tem_sanitario: has(/sanitário|sanitario|banheiro/i) ? "SIM" : "",
          tem_estacionamento: has(/estacionamento/i) ? "SIM" : "",
          tem_descarte_rv: has(/descarte/i) ? "SIM" : "",
          tem_alimentacao: has(/alimentação|alimentacao|restaurante|café|cafe/i) ? "SIM" : "",
          tem_rio_cachoeira: has(/cachoeira|rio|lago/i) ? "SIM" : "",
          tem_trilha: has(/trilha|montanha|escalada/i) ? "SIM" : "",
          visitado: "",
          revisar: "",
        };
      });
      const combined = [...cmsPlaces, ...parsed.data].filter((place) => Number(place.latitude) && Number(place.longitude) && place.publicar === "SIM" && place.situacao === "ATIVO");
      const seen = new Set<string>();
      setPlaces(combined.filter((place) => {
        const key = `${place.nome}|${Number(place.latitude).toFixed(4)}|${Number(place.longitude).toFixed(4)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }));
    });
  }, []);

  const filteredResult = useMemo(() => {
    const terms = searchTerms(query);
    const activeFilter = experienceFilters.find((item) => item.id === category) ?? experienceFilters[0];
    const candidates = places.filter((place) => {
      const kind = `${place.categoria} ${place.subcategoria} ${place.tipo} ${place.aceita_rv === "SIM" ? "aceita rv motorhome trailer" : ""}`.toLocaleLowerCase("pt-BR");
      const matchesCategory = activeFilter.pattern.test(kind);
      const matchesVisited = !onlyVisited || place.visitado === "SIM";
      return matchesCategory && matchesVisited;
    });
    if (terms.length === 0) return { places: candidates, expanded: false };

    const exactMatches = candidates.filter((place) => {
      const haystack = normalizeSearch(`${place.nome} ${place.cidade} ${place.bairro_distrito} ${place.uf} ${place.endereco} ${place.categoria} ${place.subcategoria} ${place.observacao}`);
      return terms.some((term) => haystack.includes(term));
    });
    if (exactMatches.length > 0) return { places: exactMatches, expanded: false };

    const fallbackTokens = fallbackSearchTokens(terms);
    if (fallbackTokens.length === 0) return { places: [], expanded: false };
    const expandedMatches = candidates.filter((place) => {
      const haystack = normalizeSearch(`${place.nome} ${place.cidade} ${place.bairro_distrito} ${place.uf} ${place.endereco} ${place.categoria} ${place.subcategoria} ${place.observacao}`);
      return fallbackTokens.every((term) => haystack.includes(term));
    });
    return { places: expandedMatches, expanded: expandedMatches.length > 0 };
  }, [places, query, category, onlyVisited]);
  const filtered = filteredResult.places;

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return;
    let disposed = false;
    import("leaflet").then((L) => {
      if (disposed || !mapNode.current) return;
      const map = L.map(mapNode.current, { zoomControl: false }).setView([-22.55, -46.2], 6);
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);
      mapRef.current = map;
      setMapReady(true);
    });
    return () => { disposed = true; };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      markerLayer.current.forEach((marker) => marker.remove());
      markerLayer.current = [];
      filtered.slice(0, compact ? 350 : 3000).forEach((place) => {
        const marker = L.marker([Number(place.latitude), Number(place.longitude)], {
          icon: L.divIcon({
            className: "rota-map-marker-wrap",
            html: `<span class="rota-map-marker ${markerClass(place)}"></span>`,
            iconSize: [22, 28],
            iconAnchor: [11, 24],
          }),
        }).addTo(mapRef.current!);
        marker.on("click", () => setSelected(place));
        markerLayer.current.push(marker);
      });
      if (query.trim() && filtered.length > 0) {
        const coordinates = filtered.map((place) => [Number(place.latitude), Number(place.longitude)] as [number, number]);
        if (coordinates.length === 1) mapRef.current!.setView(coordinates[0], 13);
        else mapRef.current!.fitBounds(L.latLngBounds(coordinates), { padding: [36, 36], maxZoom: 13 });
      }
    });
  }, [filtered, compact, mapReady, query]);

  return (
    <div className={`map-explorer ${compact ? "compact" : ""}`}>
      <aside className="map-sidebar">
        <div className="map-search">
          <label htmlFor={compact ? "home-map-search" : "map-search"}>Onde você quer parar?</label>
          <div><span>⌕</span><input id={compact ? "home-map-search" : "map-search"} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cidade, estado ou nome do local" /></div>
        </div>
        <button
          type="button"
          className="map-mobile-filter-toggle"
          aria-expanded={mobileFiltersOpen}
          onClick={() => setMobileFiltersOpen((current) => !current)}
        >
          <span><i className={`map-dot ${category}`} />Filtros do mapa</span>
          <b>{mobileFiltersOpen ? "Fechar" : "Abrir"}</b>
        </button>
        <div className={`map-mobile-controls ${mobileFiltersOpen ? "open" : ""}`}>
          <div className="map-category-list">
            {experienceFilters.map((item) => <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)}><i className={`map-dot ${item.id}`} />{item.label}</button>)}
          </div>
          <label className="visited-toggle"><input type="checkbox" checked={onlyVisited} onChange={(event) => setOnlyVisited(event.target.checked)} /> Somente locais já visitados</label>
          <div className="map-result-count"><b>{filtered.length.toLocaleString("pt-BR")}</b><span>pontos encontrados na base Rota Plena</span></div>
          {filteredResult.expanded && <p className="map-search-note">Não havia correspondência exata. Exibimos os pontos da localidade principal.</p>}
          {places.length > 0 && filtered.length === 0 && <div className="map-empty-state" role="status"><b>Nenhum ponto encontrado com esses filtros.</b><p>Tente pesquisar somente pela cidade ou pelo bairro, ou remova um dos filtros selecionados.</p><button type="button" onClick={() => { setQuery(""); setCategory("todos"); setOnlyVisited(false); }}>Limpar busca e filtros</button></div>}
        </div>
        {!compact && <div className="map-results">
          {filtered.slice(0, 12).map((place) => <button key={place.id} onClick={() => { setSelected(place); mapRef.current?.flyTo([Number(place.latitude), Number(place.longitude)], 13); }}><span>⌖</span><div><b>{place.nome}</b><small>{place.bairro_distrito || place.cidade || place.endereco || "Localização cadastrada"}{place.uf ? ` · ${place.uf}` : ""}</small></div></button>)}
        </div>}
      </aside>
      <div className="map-canvas" ref={mapNode} aria-label="Mapa interativo de pontos de apoio ao caravanismo" />
      <div className="map-legend"><span><i className="map-dot camping-rv" /> Camping/RV</span><span><i className="map-dot natureza" /> Natureza</span><span><i className="map-dot cultura" /> Cultura</span><span><i className="map-dot apoio" /> Apoio</span></div>
      {selected && <article className="map-place-card">
        <button className="map-card-close" onClick={() => setSelected(null)} aria-label="Fechar detalhe">×</button>
        <p>{(selected.subcategoria || selected.categoria || "Ponto da rota").replaceAll("_", " ")}</p>
        <h3>{selected.nome}</h3>
        <span>{selected.bairro_distrito || selected.cidade || selected.endereco}{selected.uf ? ` · ${selected.uf}` : ""}</span>
        {selected.observacao && <p className="map-place-description">{selected.observacao}</p>}
        <div>
          {selected.visitado === "SIM" && <b>✓ Visitado</b>}
          {selected.aceita_rv === "SIM" && <b>Aceita RV</b>}
          {selected.pet_friendly === "SIM" && <b>Pet friendly</b>}
          {selected.tem_energia === "SIM" && <b>Energia</b>}
          {selected.tem_sanitario === "SIM" && <b>Banheiro</b>}
          {selected.tem_estacionamento === "SIM" && <b>Estacionamento</b>}
          {selected.tem_alimentacao === "SIM" && <b>Alimentação</b>}
          {selected.tem_rio_cachoeira === "SIM" && <b>Água/natureza</b>}
          {selected.tem_trilha === "SIM" && <b>Trilha</b>}
          {selected.tem_descarte_rv === "SIM" && <b>Descarte RV</b>}
        </div>
        {selected.revisar === "SIM" && <small className="map-quality-note">⚠ Coordenada aproximada: confirme o acesso antes de viajar.</small>}
        <footer>
          <a href={`https://www.google.com/maps?q=${selected.latitude},${selected.longitude}`} target="_blank" rel="noreferrer">Abrir rota →</a>
          {findValeCity(selected.cidade)
            ? <a href={`/destinos/vale-do-paraiba#${findValeCity(selected.cidade)!.slug}`}>Conhecer a cidade</a>
            : findSulMinasCity(selected.cidade)
              ? <a href={`/destinos/sul-de-minas#${findSulMinasCity(selected.cidade)!.slug}`}>Conhecer a cidade</a>
              : null}
          <a href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20sugest%C3%A3o%20de%20atualiza%C3%A7%C3%A3o">Sugerir correção</a>
          {selected.link_referencia?.startsWith("http") && <a href={selected.link_referencia} target="_blank" rel="noreferrer">Ver fonte</a>}
        </footer>
      </article>}
    </div>
  );
}
