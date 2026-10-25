"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import type { LayerGroup, Map as LeafletMap, Polyline } from "leaflet";
import {
  buildRouteSuggestions,
  suggestionKindMeta,
  type RouteSuggestion,
  type SuggestionKind,
  type SupportPlace,
} from "../lib/route-intelligence";

type GeoPoint = {
  label: string;
  lat: number;
  lon: number;
};

type RouteResult = {
  points: GeoPoint[];
  coordinates: [number, number][];
  distanceMeters: number;
  durationSeconds: number;
};

type OsrmResponse = {
  code: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
  }>;
};

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character);

const safeFileName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "minha-rota";

const downloadBlob = (contents: BlobPart, type: string, fileName: string) => {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
};

const formatDuration = (seconds: number) => {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes ? ` ${minutes}min` : ""}`;
};

const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const interestOptions: Array<{ id: SuggestionKind; label: string; symbol: string }> = [
  { id: "pernoite", label: "Pernoite", symbol: "☾" },
  { id: "apoio", label: "Apoio e serviços", symbol: "⚙" },
  { id: "alimentacao", label: "Alimentação", symbol: "♨" },
  { id: "natureza", label: "Natureza", symbol: "⌁" },
  { id: "cultura", label: "Cultura", symbol: "◇" },
];

export default function RoutePlanner() {
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const routeLayerRef = useRef<Polyline | null>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);
  const [origin, setOrigin] = useState("Taubaté, SP");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState("Motorhome");
  const [profile, setProfile] = useState("Equilibrada");
  const [consumption, setConsumption] = useState(7.5);
  const [fuelPrice, setFuelPrice] = useState(6.15);
  const [maxDetour, setMaxDetour] = useState(15);
  const [interests, setInterests] = useState<SuggestionKind[]>(["pernoite", "apoio", "alimentacao", "natureza", "cultura"]);
  const [foodBudget, setFoodBudget] = useState("tanto-faz");
  const [travelingWithPet, setTravelingWithPet] = useState(false);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [basePlaces, setBasePlaces] = useState<SupportPlace[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const nearbySupports = useMemo(() => {
    if (!route || !basePlaces.length) return [] as RouteSuggestion[];
    return buildRouteSuggestions(basePlaces, route.coordinates, {
      vehicle,
      profile,
      maxDetour,
      interests,
      foodBudget,
      travelingWithPet,
    });
  }, [route, basePlaces, vehicle, profile, maxDetour, interests, foodBudget, travelingWithPet]);

  const displayedStatus = route
    ? nearbySupports.length
      ? `Rota Plena pronta: ${nearbySupports.length} sugestões distribuídas ao longo do caminho.`
      : "Rota calculada, mas a base atual ainda não possui pontos compatíveis com estes filtros ao longo do caminho."
    : status;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    window.setTimeout(() => {
      setOrigin(params.get("origem") || "Taubaté, SP");
      setDestination(params.get("destino") || "");
      setStops(params.getAll("parada").slice(0, 6));
    }, 0);

    fetch("/pontos-da-rota.csv")
      .then((response) => response.text())
      .then((csv) => {
        const parsed = Papa.parse<SupportPlace>(csv, { header: true, skipEmptyLines: true });
        setBasePlaces(parsed.data.filter((place) => Number(place.latitude) && Number(place.longitude) && place.publicar === "SIM" && place.situacao === "ATIVO"));
      })
      .catch(() => setBasePlaces([]));
  }, []);

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
    });
    return () => { disposed = true; };
  }, []);

  useEffect(() => {
    if (!route || !mapRef.current) return;
    import("leaflet").then((L) => {
      routeLayerRef.current?.remove();
      markerLayerRef.current?.remove();
      const latLngs = route.coordinates.map(([lon, lat]) => [lat, lon] as [number, number]);
      const routeLine = L.polyline(latLngs, { color: "#d99f19", weight: 6, opacity: 0.92 }).addTo(mapRef.current!);
      routeLayerRef.current = routeLine;
      const markerLayer = L.layerGroup();
      route.points.forEach((point, index) => {
        L.marker([point.lat, point.lon], {
          icon: L.divIcon({
            className: "route-number-marker-wrap",
            html: `<span class="route-number-marker">${index + 1}</span>`,
            iconSize: [30, 36],
            iconAnchor: [15, 32],
          }),
        }).bindTooltip(point.label).addTo(markerLayer);
      });
      nearbySupports.slice(0, 24).forEach((place) => {
        L.marker([Number(place.latitude), Number(place.longitude)], {
          icon: L.divIcon({
            className: "route-suggestion-marker-wrap",
            html: `<span class="route-suggestion-marker ${place.kind}">${place.symbol}</span>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          }),
        }).bindTooltip(`${place.kindLabel}: ${place.nome}`).addTo(markerLayer);
      });
      markerLayer.addTo(mapRef.current!);
      markerLayerRef.current = markerLayer;
      mapRef.current!.fitBounds(routeLine.getBounds(), { padding: [32, 32] });
    });
  }, [route, nearbySupports]);

  const distance = route ? route.distanceMeters / 1000 : 0;
  const liters = consumption > 0 ? distance / consumption : 0;
  const fuelCost = liters * fuelPrice;
  const suggestedDays = Math.max(1, Math.ceil(distance / (profile === "Descoberta" ? 250 : profile === "Essencial" ? 500 : 350)));

  const routeName = useMemo(
    () => `${origin || "Origem"} — ${destination || "Destino"}`,
    [origin, destination],
  );

  const geocode = async (label: string): Promise<GeoPoint> => {
    const cacheKey = `rota-plena:geocode:${label.trim().toLocaleLowerCase("pt-BR")}`;
    try {
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached) as GeoPoint;
    } catch {}
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(label)}`,
      { headers: { "Accept-Language": "pt-BR,pt;q=0.9" } },
    );
    if (!response.ok) throw new Error(`Não foi possível pesquisar “${label}”.`);
    const matches = await response.json() as Array<{ lat: string; lon: string; display_name: string }>;
    if (!matches.length) throw new Error(`Local não encontrado: “${label}”. Tente incluir cidade e estado.`);
    const result = {
      label: matches[0].display_name.split(",").slice(0, 3).join(","),
      lat: Number(matches[0].lat),
      lon: Number(matches[0].lon),
    };
    try { window.localStorage.setItem(cacheKey, JSON.stringify(result)); } catch {}
    return result;
  };

  const traceRoute = async () => {
    if (!origin.trim() || !destination.trim()) {
      setStatus("Informe a origem e o destino para traçar a rota.");
      return;
    }
    setBusy(true);
    setStatus("Localizando os pontos e calculando o caminho...");
    setDownloadOpen(false);
    try {
      const labels = [origin, ...stops.filter((stop) => stop.trim()), destination];
      const points: GeoPoint[] = [];
      for (const label of labels) {
        points.push(await geocode(label.trim()));
        if (points.length < labels.length) await delay(1100);
      }
      const coordinatesParam = points.map((point) => `${point.lon},${point.lat}`).join(";");
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinatesParam}?overview=full&geometries=geojson&steps=false`,
      );
      if (!response.ok) throw new Error("O serviço de rotas não respondeu. Tente novamente em instantes.");
      const data = await response.json() as OsrmResponse;
      const selectedRoute = data.routes?.[0];
      if (data.code !== "Ok" || !selectedRoute) throw new Error("Não foi possível ligar todos os pontos por uma rota rodoviária.");
      const nextRoute: RouteResult = {
        points,
        coordinates: selectedRoute.geometry.coordinates,
        distanceMeters: selectedRoute.distance,
        durationSeconds: selectedRoute.duration,
      };
      setRoute(nextRoute);
      setStatus("Rota traçada. O Rota Plena está organizando as melhores paradas ao longo do caminho.");

      const params = new URLSearchParams();
      params.set("origem", origin);
      params.set("destino", destination);
      stops.filter(Boolean).forEach((stop) => params.append("parada", stop));
      window.history.replaceState(null, "", `/planejar?${params.toString()}`);
    } catch (error) {
      setRoute(null);
      setStatus(error instanceof Error ? error.message : "Não foi possível traçar a rota.");
    } finally {
      setBusy(false);
    }
  };

  const groupedSuggestions = useMemo(() => {
    return interests.map((kind) => ({
      kind,
      ...suggestionKindMeta[kind],
      items: nearbySupports.filter((place) => place.kind === kind),
    })).filter((group) => group.items.length);
  }, [interests, nearbySupports]);

  const toggleInterest = (kind: SuggestionKind) => {
    setInterests((current) => current.includes(kind)
      ? current.filter((item) => item !== kind)
      : [...current, kind]);
  };

  const exportGpx = () => {
    if (!route) return;
    const trackPoints = route.coordinates
      .map(([lon, lat]) => `<trkpt lat="${lat}" lon="${lon}"></trkpt>`)
      .join("");
    const waypoints = nearbySupports.map((place) => `<wpt lat="${place.latitude}" lon="${place.longitude}"><name>${escapeXml(place.nome)}</name><type>${escapeXml(place.kindLabel)}</type><desc>${escapeXml(place.reason)}</desc></wpt>`).join("");
    const gpx = `<?xml version="1.0" encoding="UTF-8"?><gpx version="1.1" creator="Rota Plena" xmlns="http://www.topografix.com/GPX/1/1"><metadata><name>${escapeXml(routeName)}</name></metadata>${waypoints}<trk><name>${escapeXml(routeName)}</name><trkseg>${trackPoints}</trkseg></trk></gpx>`;
    downloadBlob(gpx, "application/gpx+xml;charset=utf-8", `${safeFileName(routeName)}.gpx`);
  };

  const exportKml = () => {
    if (!route) return;
    const coordinates = route.coordinates.map(([lon, lat]) => `${lon},${lat},0`).join(" ");
    const placemarks = nearbySupports.map((place) => `<Placemark><name>${escapeXml(place.nome)}</name><description>${escapeXml(`${place.kindLabel} · ${place.reason}`)}</description><Point><coordinates>${place.longitude},${place.latitude},0</coordinates></Point></Placemark>`).join("");
    const kml = `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>${escapeXml(routeName)}</name><Placemark><name>${escapeXml(routeName)}</name><Style><LineStyle><color>ff199fd9</color><width>5</width></LineStyle></Style><LineString><tessellate>1</tessellate><coordinates>${coordinates}</coordinates></LineString></Placemark>${placemarks}</Document></kml>`;
    downloadBlob(kml, "application/vnd.google-earth.kml+xml;charset=utf-8", `${safeFileName(routeName)}.kml`);
  };

  const exportCsv = () => {
    if (!route) return;
    const rows = [
      "tipo,ordem,latitude,longitude,nome,categoria,distancia_da_rota_km",
      ...route.coordinates.map(([lon, lat], index) => `tracado,${index + 1},${lat},${lon},,,`),
      ...nearbySupports.map((place, index) => `sugestao,${index + 1},${place.latitude},${place.longitude},"${place.nome.replaceAll('"', '""')}","${place.kindLabel}",${place.routeDistance.toFixed(1)}`),
    ].join("\n");
    downloadBlob(rows, "text/csv;charset=utf-8", `${safeFileName(routeName)}.csv`);
  };

  const exportGeoJson = () => {
    if (!route) return;
    const geoJson = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {
          name: routeName,
          distance_km: Number(distance.toFixed(1)),
          vehicle,
          profile,
        },
        geometry: { type: "LineString", coordinates: route.coordinates },
      }, ...nearbySupports.map((place) => ({
        type: "Feature",
        properties: {
          name: place.nome,
          category: place.kindLabel,
          detour_km: Number(place.routeDistance.toFixed(1)),
          progress_percent: Math.round(place.routeProgress * 100),
          price_band: place.priceBand?.label ?? null,
        },
        geometry: { type: "Point", coordinates: [Number(place.longitude), Number(place.latitude)] },
      }))],
    };
    downloadBlob(JSON.stringify(geoJson, null, 2), "application/geo+json;charset=utf-8", `${safeFileName(routeName)}.geojson`);
  };

  const exportPdf = async () => {
    if (!route) return;
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210;
    const margin = 18;
    const contentWidth = 174;
    const pageBottom = 276;
    const kindIntroductions: Record<SuggestionKind, string> = {
      pernoite: "Locais para descanso e permanência. Confirme acesso, reserva, horário de chegada, estrutura e capacidade para o seu veículo.",
      apoio: "Serviços úteis para abastecimento, manutenção, estacionamento e apoio ao veículo durante o percurso.",
      alimentacao: "Paradas de alimentação encontradas ao longo da rota. Faixas de preço são referências neutras e devem ser confirmadas.",
      natureza: "Cachoeiras, trilhas, mirantes, parques e experiências ao ar livre. Verifique clima, acesso, taxas e nível de dificuldade.",
      cultura: "Patrimônio, história, religiosidade, produtores locais e outros pontos que ajudam a compreender e viver melhor cada destino.",
    };
    const clean = (value: string) => String(value || "").replace(/\s+/g, " ").trim();
    const lineHeight = (fontSize: number, factor = 1.45) => fontSize * 0.3528 * factor;
    const wrapped = (text: string, width = contentWidth) => pdf.splitTextToSize(clean(text), width) as string[];
    let y = 0;

    const drawInnerHeader = (title: string) => {
      pdf.setFillColor(7, 61, 42);
      pdf.rect(0, 0, pageWidth, 25, "F");
      pdf.setTextColor(255, 208, 89);
      pdf.setFont("times", "bold");
      pdf.setFontSize(17);
      pdf.text("Rota Plena", margin, 16);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(title, pageWidth - margin, 16, { align: "right", maxWidth: 100 });
      y = 35;
    };
    const ensureSpace = (height: number, continuation = "Guia da viagem") => {
      if (y + height <= pageBottom) return;
      pdf.addPage();
      drawInnerHeader(continuation);
    };
    const writeLines = (
      text: string,
      options: {
        size?: number;
        color?: [number, number, number];
        style?: "normal" | "bold" | "italic";
        width?: number;
        x?: number;
        gapAfter?: number;
        continuation?: string;
      } = {},
    ) => {
      const size = options.size ?? 10.5;
      const height = lineHeight(size);
      const lines = wrapped(text, options.width ?? contentWidth);
      pdf.setFont("helvetica", options.style ?? "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(...(options.color ?? [58, 77, 67]));
      lines.forEach((line) => {
        ensureSpace(height + 2, options.continuation);
        pdf.text(line, options.x ?? margin, y);
        y += height;
      });
      y += options.gapAfter ?? 2.5;
      return lines.length;
    };
    const featureList = (place: RouteSuggestion) => [
      place.visitado === "SIM" ? "Visitado" : "",
      place.aceita_rv === "SIM" ? "Aceita RV" : "",
      place.tem_energia === "SIM" ? "Energia" : "",
      place.tem_sanitario === "SIM" ? "Sanitário" : "",
      place.tem_estacionamento === "SIM" ? "Estacionamento" : "",
      place.tem_descarte_rv === "SIM" ? "Descarte RV" : "",
      place.tem_alimentacao === "SIM" ? "Alimentação" : "",
      place.tem_rio_cachoeira === "SIM" ? "Rio ou cachoeira" : "",
      place.tem_trilha === "SIM" ? "Trilha" : "",
      place.pet_friendly === "SIM" ? "Pet friendly" : "",
    ].filter(Boolean);

    pdf.setFillColor(7, 61, 42);
    pdf.rect(0, 0, pageWidth, 44, "F");
    pdf.setTextColor(255, 208, 89);
    pdf.setFont("times", "bolditalic");
    pdf.setFontSize(25);
    pdf.text("Rota Plena", margin, 19);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("Conhecimento, liberdade e vida sobre rodas.", margin, 29);
    pdf.setFont("times", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(24, 53, 43);
    const routeTitleLines = wrapped(routeName);
    pdf.text(routeTitleLines, margin, 57);
    y = 57 + routeTitleLines.length * lineHeight(20, 1.15) + 3;

    pdf.setFillColor(239, 243, 236);
    pdf.roundedRect(margin, y, contentWidth, 27, 2, 2, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(36, 87, 59);
    pdf.text(`Veículo: ${vehicle}`, margin + 5, y + 8);
    pdf.text(`Estilo: ${profile}`, 106, y + 8);
    pdf.text(`Distância: ${distance.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`, margin + 5, y + 17);
    pdf.text(`Direção: ${formatDuration(route.durationSeconds)}`, 106, y + 17);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(74, 91, 81);
    pdf.text(`Combustível estimado: ${liters.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} l`, margin + 5, y + 24);
    pdf.text(`Custo estimado: ${fuelCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`, 106, y + 24);
    y += 34;

    const mapX = 18;
    const mapY = y;
    const mapW = 174;
    const mapH = 66;
    pdf.setFillColor(243, 239, 226);
    pdf.roundedRect(mapX, mapY, mapW, mapH, 2, 2, "F");
    pdf.setDrawColor(214, 220, 210);
    for (let i = 1; i < 5; i += 1) {
      pdf.line(mapX + mapW * i / 5, mapY, mapX + mapW * i / 5, mapY + mapH);
      pdf.line(mapX, mapY + mapH * i / 5, mapX + mapW, mapY + mapH * i / 5);
    }
    const lons = route.coordinates.map(([lon]) => lon);
    const lats = route.coordinates.map(([, lat]) => lat);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const lonRange = Math.max(maxLon - minLon, 0.01);
    const latRange = Math.max(maxLat - minLat, 0.01);
    const projected = route.coordinates.map(([lon, lat]) => ({
      x: mapX + 6 + ((lon - minLon) / lonRange) * (mapW - 12),
      y: mapY + mapH - 6 - ((lat - minLat) / latRange) * (mapH - 12),
    }));
    pdf.setDrawColor(217, 159, 25);
    pdf.setLineWidth(1.1);
    for (let index = 1; index < projected.length; index += 1) {
      pdf.line(projected[index - 1].x, projected[index - 1].y, projected[index].x, projected[index].y);
    }
    pdf.setFillColor(7, 61, 42);
    [projected[0], projected[projected.length - 1]].forEach((point) => pdf.circle(point.x, point.y, 2.2, "F"));
    pdf.setTextColor(76, 92, 81);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.text("Mapa esquemático - consulte a navegação atualizada antes de dirigir.", mapX, mapY + mapH + 6);

    pdf.setTextColor(24, 53, 43);
    pdf.setFont("times", "bold");
    pdf.setFontSize(16);
    y = mapY + mapH + 17;
    pdf.text("Etapas da viagem", margin, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.5);
    y += 9;
    route.points.forEach((point, index) => {
      ensureSpace(13, "Etapas da viagem");
      pdf.setFillColor(238, 177, 38);
      pdf.circle(21, y - 1, 3, "F");
      pdf.setTextColor(7, 61, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.text(String(index + 1), 20.1, y);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10.5);
      const pointLines = wrapped(point.label, 158);
      pdf.text(pointLines, 28, y);
      y += Math.max(10, pointLines.length * lineHeight(10.5) + 2);
    });

    pdf.addPage();
    drawInnerHeader("Guia completo da viagem");
    pdf.setTextColor(24, 53, 43);
    pdf.setFont("times", "bold");
    pdf.setFontSize(21);
    pdf.text("Sua Rota Plena", margin, y);
    y += 9;
    writeLines(
      `Este guia reúne ${nearbySupports.length} sugestões distribuídas ao longo do caminho, organizadas por interesse e selecionadas conforme o veículo, o estilo da viagem e o desvio máximo de ${maxDetour} km.`,
      { size: 11, gapAfter: 6 },
    );
    pdf.setFillColor(246, 240, 219);
    pdf.roundedRect(margin, y, contentWidth, 22, 2, 2, "F");
    y += 7;
    writeLines(
      "Antes de sair: confirme acesso, horários, reservas, preços, restrições para veículos recreativos, clima e condições locais. Leve uma alternativa para pernoite e apoio.",
      { size: 10, color: [109, 81, 18], x: margin + 5, width: contentWidth - 10, gapAfter: 8 },
    );

    let globalIndex = 0;
    interests.forEach((kind) => {
      const meta = suggestionKindMeta[kind];
      const items = nearbySupports.filter((place) => place.kind === kind);
      ensureSpace(34, meta.label);
      pdf.setFillColor(7, 61, 42);
      pdf.roundedRect(margin, y, contentWidth, 15, 2, 2, "F");
      pdf.setTextColor(255, 208, 89);
      pdf.setFont("times", "bold");
      pdf.setFontSize(16);
      pdf.text(meta.label, margin + 5, y + 10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(`${items.length} ${items.length === 1 ? "sugestão" : "sugestões"}`, pageWidth - margin - 5, y + 10, { align: "right" });
      y += 21;
      writeLines(kindIntroductions[kind], { size: 10.5, gapAfter: 5, continuation: meta.label });

      if (!items.length) {
        writeLines(
          "Nenhum ponto compatível foi encontrado nesta categoria com os filtros atuais. Considere ampliar o desvio máximo ou consultar o mapa completo.",
          { size: 10.5, style: "italic", color: [102, 116, 107], gapAfter: 9, continuation: meta.label },
        );
        return;
      }

      items.forEach((place) => {
        globalIndex += 1;
        ensureSpace(36, meta.label);
        pdf.setDrawColor(213, 220, 211);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 7;
        writeLines(
          `${globalIndex}. ${place.nome}`,
          { size: 13.5, style: "bold", color: [24, 53, 43], gapAfter: 1.5, continuation: meta.label },
        );
        const location = [
          clean(place.endereco),
          clean(place.bairro_distrito),
          clean(place.cidade),
          clean(place.uf),
        ].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(" - ");
        if (location) writeLines(location, { size: 10, color: [94, 108, 100], gapAfter: 1.5, continuation: meta.label });
        writeLines(
          `${Math.round(place.routeProgress * 100)}% do percurso - desvio estimado de ${place.routeDistance.toFixed(1)} km - ${place.reason}`,
          { size: 10, color: [139, 99, 13], gapAfter: 2, continuation: meta.label },
        );
        if (clean(place.observacao)) {
          writeLines(place.observacao, { size: 10.5, color: [55, 73, 63], gapAfter: 2, continuation: `${meta.label} - continuação` });
        }
        const features = featureList(place);
        if (features.length) {
          writeLines(`Estrutura informada: ${features.join(", ")}.`, { size: 10, style: "bold", color: [43, 101, 69], gapAfter: 1.5, continuation: meta.label });
        }
        if (place.priceBand) {
          writeLines(
            `${place.priceBand.label}: ${place.priceBand.detail}`,
            { size: 10, style: "bold", color: [123, 88, 13], gapAfter: 1.5, continuation: meta.label },
          );
        }
        const contacts = [
          clean(place.telefone_1) ? `Telefone: ${clean(place.telefone_1)}` : "",
          clean(place.whatsapp) ? `WhatsApp: ${clean(place.whatsapp)}` : "",
        ].filter(Boolean);
        if (contacts.length) writeLines(contacts.join(" - "), { size: 10, color: [68, 86, 76], gapAfter: 1.5, continuation: meta.label });
        ensureSpace(9, meta.label);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(38, 101, 68);
        pdf.textWithLink("Abrir localização no mapa", margin, y, {
          url: `https://www.google.com/maps?q=${place.latitude},${place.longitude}`,
        });
        y += 9;
      });
      y += 3;
    });

    pdf.addPage();
    drawInnerHeader("Orientações finais");
    pdf.setTextColor(24, 53, 43);
    pdf.setFont("times", "bold");
    pdf.setFontSize(20);
    pdf.text("Viaje com liberdade e responsabilidade", margin, y);
    y += 12;
    writeLines(
      "O Rota Plena organiza referências para ajudar no planejamento, mas não substitui navegação atualizada, sinalização viária, contato direto com os locais ou avaliação das condições no momento da viagem.",
      { size: 11, gapAfter: 5 },
    );
    [
      "Confira altura, peso, comprimento, largura e autonomia do seu veículo.",
      "Valide pavimento, inclinação, pontes, túneis, pedágios e restrições a trailers ou motorhomes.",
      "Confirme pernoites e horários antes da chegada, especialmente em feriados e alta temporada.",
      "Em natureza e aventura, verifique previsão do tempo, dificuldade, equipamentos e necessidade de guia.",
      "Respeite propriedades, comunidades locais, regras ambientais e descarte correto de resíduos.",
      "Mantenha um plano alternativo para pernoite, abastecimento, manutenção e atendimento de saúde.",
    ].forEach((item) => {
      ensureSpace(13, "Orientações finais");
      pdf.setFillColor(238, 177, 38);
      pdf.circle(margin + 2, y - 1, 1.7, "F");
      writeLines(item, { size: 10.5, x: margin + 7, width: contentWidth - 7, gapAfter: 2 });
    });

    const totalPages = pdf.getNumberOfPages();
    for (let page = 1; page <= totalPages; page += 1) {
      pdf.setPage(page);
      pdf.setDrawColor(216, 222, 214);
      pdf.line(margin, 281, pageWidth - margin, 281);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(98, 112, 103);
      pdf.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")} por rotaplena.com.br`, margin, 287);
      pdf.text(`Página ${page} de ${totalPages}`, pageWidth - margin, 287, { align: "right" });
    }
    pdf.save(`${safeFileName(routeName)}.pdf`);
  };

  return (
    <section className="route-builder" aria-label="Planejador e exportador de rotas">
      <div className="route-builder-form">
        <div className="route-builder-title">
          <div>
            <p className="eyebrow dark">MONTE O CAMINHO</p>
            <h2>Origem, paradas e destino.</h2>
          </div>
          <span>Até 6 paradas</span>
        </div>
        <div className="route-place-fields">
          <label><b>1</b><span>Origem<input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Cidade, estado ou endereço" /></span></label>
          {stops.map((stop, index) => (
            <label key={`stop-${index}`}><b>{index + 2}</b><span>Parada intermediária<input value={stop} onChange={(event) => setStops((current) => current.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="Ex.: Cunha, SP" /></span><button type="button" onClick={() => setStops((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remover parada ${index + 1}`}>×</button></label>
          ))}
          <label><b>{stops.length + 2}</b><span>Destino<input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Ex.: Paraty, RJ" /></span></label>
        </div>
        <button className="add-stop" type="button" disabled={stops.length >= 6} onClick={() => setStops((current) => [...current, ""])}>＋ Adicionar parada</button>
        <div className="route-preferences">
          <label>Veículo<select value={vehicle} onChange={(event) => setVehicle(event.target.value)}><option>Motorhome</option><option>Trailer</option><option>Camper</option><option>Carro com barraca</option></select></label>
          <label>Estilo da rota<select value={profile} onChange={(event) => setProfile(event.target.value)}><option>Essencial</option><option>Equilibrada</option><option>Descoberta</option></select></label>
          <label>Desvio máximo<select value={maxDetour} onChange={(event) => setMaxDetour(Number(event.target.value))}><option value={5}>Até 5 km</option><option value={15}>Até 15 km</option><option value={25}>Até 25 km</option></select></label>
          <label>Faixa de alimentação<select value={foodBudget} onChange={(event) => setFoodBudget(event.target.value)}><option value="tanto-faz">Todas as faixas</option><option value="economica">Econômica</option><option value="moderada">Moderada</option><option value="especial">Experiência especial</option></select></label>
          <label>Consumo (km/l)<input type="number" min="0.1" step="0.1" value={consumption} onChange={(event) => setConsumption(Number(event.target.value))} /></label>
          <label>Combustível (R$/l)<input type="number" min="0" step="0.01" value={fuelPrice} onChange={(event) => setFuelPrice(Number(event.target.value))} /></label>
        </div>
        <fieldset className="route-interest-options">
          <legend>O que deseja encontrar pelo caminho?</legend>
          <div>{interestOptions.map((item) => <label key={item.id} className={interests.includes(item.id) ? "selected" : ""}><input type="checkbox" checked={interests.includes(item.id)} onChange={() => toggleInterest(item.id)} /><span>{item.symbol}</span>{item.label}</label>)}</div>
          <label className="route-pet-option"><input type="checkbox" checked={travelingWithPet} onChange={(event) => setTravelingWithPet(event.target.checked)} /> Viajando com pet</label>
        </fieldset>
        <button className="button button-primary trace-route" type="button" onClick={traceRoute} disabled={busy}>{busy ? "Analisando o caminho..." : "Gerar minha Rota Plena →"}</button>
        {displayedStatus && <p className={`route-status ${route ? "success" : ""}`} role="status">{displayedStatus}</p>}
        <p className="route-privacy">Privacidade: a rota não é salva pelo Rota Plena. Os endereços pesquisados ficam armazenados somente neste dispositivo para reduzir consultas repetidas aos serviços abertos de mapas.</p>
      </div>

      <div className="route-builder-map">
        <div className="route-live-map" ref={mapNode} aria-label="Mapa da rota planejada" />
        {!route && <div className="route-map-empty"><span>⌖</span><b>Seu caminho aparecerá aqui</b><small>Informe a origem e o destino para começar.</small></div>}
      </div>

      {route && (
        <div className="route-results">
          <div className="route-metrics">
            <span>Distância<b>{distance.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km</b></span>
            <span>Tempo de direção<b>{formatDuration(route.durationSeconds)}</b></span>
            <span>Combustível<b>{liters.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} litros</b></span>
            <span>Custo estimado<b>{fuelCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b></span>
            <span>Ritmo sugerido<b>{suggestedDays} {suggestedDays === 1 ? "dia" : "dias"}</b></span>
          </div>
          <div className="route-downloads">
            <div>
              <p className="eyebrow dark">LEVE A ROTA COM VOCÊ</p>
              <h2>Baixe para imprimir ou usar em outros aplicativos.</h2>
              <p>O PDF reúne mapa esquemático, etapas, estimativas e a seleção Rota Plena. GPX, KML, CSV e GeoJSON agora levam também os pontos sugeridos.</p>
            </div>
            <div className="download-menu">
              <button className="button button-primary" type="button" onClick={() => setDownloadOpen((current) => !current)}>Baixar a rota <span>⌄</span></button>
              {downloadOpen && <div>
                <button type="button" onClick={exportPdf}><b>PDF</b><span>Guia visual para imprimir</span></button>
                <button type="button" onClick={exportGpx}><b>GPX</b><span>Navegadores e apps de rota</span></button>
                <button type="button" onClick={exportKml}><b>KML</b><span>Google Earth e mapas</span></button>
                <button type="button" onClick={exportCsv}><b>CSV</b><span>Planilha de coordenadas</span></button>
                <button type="button" onClick={exportGeoJson}><b>GeoJSON</b><span>Dados geográficos abertos</span></button>
              </div>}
            </div>
          </div>
          <section className="route-intelligence">
            <header>
              <div><p className="eyebrow dark">SUA ROTA PLENA</p><h2>Paradas escolhidas pelo caminho, não apenas pela proximidade.</h2><p>O sistema considera desvio, posição no percurso, estilo da viagem, veículo, preferências e qualidade disponível na base. As sugestões são distribuídas para formar uma viagem equilibrada.</p></div>
              <aside><b>{nearbySupports.length}</b><span>sugestões selecionadas</span><small>em até {maxDetour} km da rota</small></aside>
            </header>
            {groupedSuggestions.length ? <div className="route-itinerary">{groupedSuggestions.map((group) => (
              <section key={group.kind} className={`route-suggestion-group ${group.kind}`}>
                <div className="route-group-title"><span>{group.symbol}</span><div><p>{group.label}</p><small>{group.items.length} {group.items.length === 1 ? "sugestão" : "sugestões"} ao longo do percurso</small></div></div>
                <div className="route-suggestion-list">{group.items.map((place) => (
                  <article key={`${place.id}-${place.latitude}-${place.longitude}`}>
                    <div className="route-progress"><i style={{ width: `${Math.max(3, Math.round(place.routeProgress * 100))}%` }} /><span>{Math.round(place.routeProgress * 100)}% do percurso</span></div>
                    <p>{place.subcategoria?.replaceAll("_", " ") || place.kindLabel}</p>
                    <h3>{place.nome}</h3>
                    <span>{place.bairro_distrito || place.cidade || place.endereco}{place.uf ? ` · ${place.uf}` : ""}</span>
                    {place.observacao && <small className="route-place-note">{place.observacao}</small>}
                    <div className="route-reason">{place.reason}</div>
                    {place.priceBand && <div className={`route-price-band ${place.priceBand.id}`}><b>{place.priceBand.label}</b><small>{place.priceBand.detail}</small></div>}
                    <div className="route-place-flags">
                      {place.visitado === "SIM" && <b>✓ Visitado</b>}
                      {place.aceita_rv === "SIM" && <b>Aceita RV</b>}
                      {travelingWithPet && place.pet_friendly === "SIM" && <b>Pet friendly</b>}
                      {place.revisar === "SIM" && <b className="review">Localização a validar</b>}
                    </div>
                    <a href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`} target="_blank" rel="noreferrer">Ver no mapa e confirmar acesso →</a>
                  </article>
                ))}</div>
              </section>
            ))}</div> : <p className="empty-content">Nenhum ponto compatível foi encontrado com os filtros escolhidos. Amplie o desvio máximo ou selecione outras categorias.</p>}
            <div className="route-price-method"><b>Como tratamos preços de alimentação</b><p>As faixas são referências neutras, não avaliações do estabelecimento: econômica, moderada, experiência especial ou não confirmada. Só classificamos quando há valor publicado na base; confirme cardápio, data e condições diretamente com o local.</p></div>
          </section>
          <p className="route-disclaimer">A rota é uma referência de planejamento. O cálculo rodoviário não considera, necessariamente, altura, peso, comprimento, tipo de pavimento, restrições a trailers ou motorhomes, obras, clima, fronteiras e condições em tempo real. Antes de sair, confira todo o percurso em um navegador atualizado e valide os pontos diretamente com os responsáveis.</p>
        </div>
      )}
    </section>
  );
}
