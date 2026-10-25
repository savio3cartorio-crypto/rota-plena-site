"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { findValeCity, normalizeValeCity, valeCities, valeCitiesVerifiedAt, type ValeCityGuide } from "../data/vale-cities";
import { findSulMinasCity, normalizeSulMinas, sulMinasCities, sulMinasVerifiedAt, type SulMinasCityGuide } from "../data/sul-minas-cities";

type MapPlace = {
  id: string;
  nome: string;
  cidade: string;
  categoria: string;
  subcategoria: string;
  tipo: string;
  endereco: string;
  observacao: string;
  origem: string;
  link_referencia: string;
  aceita_rv: string;
  tem_estacionamento: string;
  tem_sanitario: string;
  tem_alimentacao: string;
  tem_rio_cachoeira: string;
  tem_trilha: string;
  revisar: string;
};

const valeRegions = ["Todas", "Vale da Fé", "Vale Histórico", "Rios do Vale", "Mantiqueira", "Vale Urbano"];
const sulMinasRegions = ["Todas", "Mantiqueira–Vale", "Terras Altas", "Circuito das Águas", "Serras Verdes"];
type CityGuide = ValeCityGuide | SulMinasCityGuide;

const placeKind = (place: MapPlace) => {
  const text = normalizeValeCity(`${place.nome} ${place.categoria} ${place.subcategoria} ${place.tipo}`);
  if (/restaurante|gastronomia|lanchonete|cafe|cervejaria|vinicola|alimentacao/.test(text)) return "food";
  if (/camping|apoio|posto|oficina|borracharia|estacionamento|servico|hospital|farmacia/.test(text)) return "support";
  if (/cachoeira|trilha|parque|mirante|montanha|rio|lago|represa|natureza|aventura/.test(text)) return "nature";
  return "interest";
};

const uniquePlaces = (items: MapPlace[]) => {
  const seen = new Set<string>();
  return items.filter((place) => {
    const key = normalizeValeCity(place.nome);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

function GuideList({ title, symbol, items }: { title: string; symbol: string; items: string[] }) {
  return <section className="vale-guide-list">
    <header><span aria-hidden="true">{symbol}</span><h3>{title}</h3></header>
    <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
  </section>;
}

function MapBaseHighlights({ city, places }: { city: CityGuide; places: MapPlace[] }) {
  const food = uniquePlaces(places.filter((place) => placeKind(place) === "food")).slice(0, 4);
  const support = uniquePlaces(places.filter((place) => placeKind(place) === "support")).slice(0, 4);
  const other = uniquePlaces(places.filter((place) => !["food", "support"].includes(placeKind(place)))).slice(0, 4);
  const groups = [
    { label: "Comer na base", items: food },
    { label: "Apoio na base", items: support },
    { label: "Outros pontos", items: other },
  ].filter((group) => group.items.length);

  return <section className="vale-map-base">
    <div className="vale-map-base-head">
      <div><small>NO MAPA AGORA</small><h3>{places.length} {places.length === 1 ? "ponto catalogado" : "pontos catalogados"}</h3></div>
      <Link href={`/mapa?busca=${encodeURIComponent(city.name)}`}>Ver no mapa →</Link>
    </div>
    {groups.length ? <div className="vale-base-groups">
      {groups.map((group) => <div key={group.label}><b>{group.label}</b>{group.items.map((place) =>
        <article key={place.id}>
          <span>{place.nome}</span>
          <small>{place.endereco || place.subcategoria?.replaceAll("_", " ") || "Informação da base colaborativa"}</small>
          {place.revisar === "SIM" && <em>Confirme antes de seguir</em>}
          {place.link_referencia?.startsWith("http") && <a href={place.link_referencia} target="_blank" rel="noreferrer">Fonte ↗</a>}
        </article>,
      )}</div>)}
    </div> : <p className="vale-empty-base">A cidade já tem guia editorial, mas seus pontos ainda precisam de mais validação comunitária.</p>}
  </section>;
}

export default function ValeCityDirectory({ area = "vale" }: { area?: "vale" | "sul-minas" }) {
  const isSulMinas = area === "sul-minas";
  const cities: CityGuide[] = isSulMinas ? sulMinasCities : valeCities;
  const regions = isSulMinas ? sulMinasRegions : valeRegions;
  const verifiedAt = isSulMinas ? sulMinasVerifiedAt : valeCitiesVerifiedAt;
  const normalize = isSulMinas ? normalizeSulMinas : normalizeValeCity;
  const findCity = isSulMinas ? findSulMinasCity : findValeCity;
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Todas");
  const [openCity, setOpenCity] = useState<string | null>(null);
  const [mapPlaces, setMapPlaces] = useState<MapPlace[]>([]);

  useEffect(() => {
    fetch("/lugares-visitados.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parsed = Papa.parse<MapPlace>(csv, { header: true, skipEmptyLines: true });
        setMapPlaces(parsed.data.filter((place) => Boolean(findCity(place.cidade))));
      })
      .catch(() => setMapPlaces([]));
    const hash = window.location.hash.replace("#", "");
    if (cities.some((city) => city.slug === hash)) window.setTimeout(() => setOpenCity(hash), 0);
  }, [cities, findCity]);

  const placesByCity = useMemo(() => {
    const grouped = new Map<string, MapPlace[]>();
    mapPlaces.forEach((place) => {
      const city = findCity(place.cidade);
      if (!city) return;
      grouped.set(city.slug, [...(grouped.get(city.slug) ?? []), place]);
    });
    return grouped;
  }, [mapPlaces, findCity]);

  const filteredCities = useMemo(() => {
    const normalized = normalize(query);
    return cities.filter((city) => {
      const matchesRegion = region === "Todas" || city.region === region;
      const text = normalize(`${city.name} ${city.region} ${city.summary} ${city.tourism.join(" ")} ${city.nature.join(" ")} ${city.food.join(" ")} ${city.festivals.join(" ")}`);
      return matchesRegion && (!normalized || text.includes(normalized));
    });
  }, [query, region, cities, normalize]);

  const toggleCity = (slug: string) => {
    const next = openCity === slug ? null : slug;
    setOpenCity(next);
    if (next) window.history.replaceState(null, "", `#${next}`);
  };

  return <div className="vale-directory">
    <section className="vale-directory-toolbar">
      <label>
        <span>Encontre uma cidade ou experiência</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: cachoeira, gastronomia, Aparecida..." />
      </label>
      <div aria-label="Filtrar por região">
        {regions.map((item) => <button type="button" key={item} className={region === item ? "active" : ""} onClick={() => setRegion(item)}>{item}</button>)}
      </div>
      <p><b>{filteredCities.length}</b> cidades encontradas · informações verificadas em {verifiedAt}</p>
    </section>

    <section className="vale-city-grid">
      {filteredCities.map((city) => {
        const places = placesByCity.get(city.slug) ?? [];
        const isOpen = openCity === city.slug;
        return <article className={`vale-city-card ${isOpen ? "open" : ""}`} id={city.slug} key={city.slug}>
          <button type="button" className="vale-city-summary" onClick={() => toggleCity(city.slug)} aria-expanded={isOpen}>
            <span><small>{city.region}</small><b>{city.name}</b><em>{places.length} pontos no mapa</em></span>
            <p>{city.summary}</p>
            <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
          </button>
          {isOpen && <div className="vale-city-detail">
            <div className="vale-guide-columns">
              <GuideList title="Pontos turísticos" symbol="◇" items={city.tourism} />
              <GuideList title="Natureza e aventura" symbol="⌁" items={city.nature} />
              <GuideList title="Restaurantes e sabores" symbol="♨" items={city.food} />
              <GuideList title="Serviços e apoio" symbol="⚙" items={city.support} />
              <GuideList title="Festas e calendário" symbol="✦" items={city.festivals} />
            </div>
            <MapBaseHighlights city={city} places={places} />
            <footer className="vale-city-sources">
              <div><b>Fontes consultadas</b><span>Horários, preços, acesso e datas podem mudar. Confirme diretamente antes da viagem.</span></div>
              <nav>{city.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</nav>
              <Link href="mailto:savio@rotaplena.com.br?subject=Rota%20Plena%20-%20sugest%C3%A3o%20de%20atualiza%C3%A7%C3%A3o">Sugerir atualização →</Link>
            </footer>
          </div>}
        </article>;
      })}
    </section>
  </div>;
}
