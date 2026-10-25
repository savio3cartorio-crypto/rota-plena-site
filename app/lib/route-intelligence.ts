export type SuggestionKind = "pernoite" | "apoio" | "alimentacao" | "natureza" | "cultura";

export type SupportPlace = {
  id: string;
  situacao?: string;
  publicar?: string;
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
  telefone_1: string;
  whatsapp: string;
  observacao: string;
  origem: string;
  link_referencia: string;
  aceita_rv: string;
  tem_energia: string;
  tem_sanitario: string;
  tem_estacionamento: string;
  tem_descarte_rv: string;
  tem_alimentacao: string;
  tem_rio_cachoeira: string;
  tem_trilha: string;
  pet_friendly: string;
  visitado: string;
  revisar: string;
};

export type PriceBand = {
  id: "economica" | "moderada" | "especial" | "nao-informada";
  label: string;
  detail: string;
};

export type RouteSuggestion = SupportPlace & {
  kind: SuggestionKind;
  kindLabel: string;
  symbol: string;
  routeDistance: number;
  routeProgress: number;
  score: number;
  reason: string;
  priceBand: PriceBand | null;
};

type SuggestionOptions = {
  vehicle: string;
  profile: string;
  maxDetour: number;
  interests: SuggestionKind[];
  foodBudget: string;
  travelingWithPet: boolean;
};

const kindMeta: Record<SuggestionKind, { label: string; symbol: string }> = {
  pernoite: { label: "Pernoite", symbol: "☾" },
  apoio: { label: "Apoio e serviços", symbol: "⚙" },
  alimentacao: { label: "Alimentação", symbol: "♨" },
  natureza: { label: "Natureza e aventura", symbol: "⌁" },
  cultura: { label: "Cultura e interesse", symbol: "◇" },
};

const normalize = (value: string) =>
  String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

export const distanceKm = (a: [number, number], b: [number, number]) => {
  const toRadians = (value: number) => value * Math.PI / 180;
  const earthRadius = 6371;
  const dLat = toRadians(b[1] - a[1]);
  const dLon = toRadians(b[0] - a[0]);
  const lat1 = toRadians(a[1]);
  const lat2 = toRadians(b[1]);
  const h = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export const classifyPlace = (place: SupportPlace): SuggestionKind => {
  const structured = normalize(`${place.nome} ${place.categoria} ${place.subcategoria} ${place.tipo}`);
  if (/camping|apoio_rv|hospedagem|pousada|hotel|pernoite/.test(structured)) return "pernoite";
  if (/gastronomia|restaurante|lanchonete|cafe|vinicola|cervejaria|alambique|alimentacao/.test(structured)) return "alimentacao";
  if (/oficina|posto|estacionamento|borracharia|mecanica|servico|infraestrutura|descarte/.test(structured)) return "apoio";
  if (/cachoeira|montanha|trilha|mirante|parque|praia|rio|lago|caverna|natureza|aventura|paisagem/.test(structured)) return "natureza";
  return "cultura";
};

export const foodPriceBand = (place: SupportPlace, kind: SuggestionKind): PriceBand | null => {
  if (kind !== "alimentacao") return null;
  const amounts = [...place.observacao.matchAll(/R\$\s*(\d+(?:[.,]\d{1,2})?)/gi)]
    .map((match) => Number(match[1].replace(",", ".")))
    .filter((amount) => Number.isFinite(amount));
  if (!amounts.length) {
    return { id: "nao-informada", label: "Faixa não confirmada", detail: "O ponto ainda não possui preço de referência datado." };
  }
  const reference = amounts[0];
  if (reference <= 45) return { id: "economica", label: "Faixa econômica", detail: `Referência publicada encontrada: R$ ${reference.toLocaleString("pt-BR")}.` };
  if (reference <= 100) return { id: "moderada", label: "Faixa moderada", detail: `Referência publicada encontrada: R$ ${reference.toLocaleString("pt-BR")}.` };
  return { id: "especial", label: "Experiência especial", detail: `Referência publicada encontrada: R$ ${reference.toLocaleString("pt-BR")}.` };
};

const suggestionReason = (place: SupportPlace, kind: SuggestionKind, routeDistance: number) => {
  const parts = [`a ${routeDistance.toFixed(1)} km da linha da rota`];
  if (place.visitado === "SIM") parts.push("registrado como visitado");
  if (place.aceita_rv === "SIM") parts.push("indica atendimento a RV");
  if (place.tem_estacionamento === "SIM") parts.push("estacionamento informado");
  if (place.tem_sanitario === "SIM") parts.push("banheiro informado");
  if (kind === "natureza" && place.tem_trilha === "SIM") parts.push("trilha catalogada");
  if (kind === "alimentacao" && place.tem_alimentacao === "SIM") parts.push("alimentação confirmada na base");
  return parts.join(" · ");
};

const pickDistributed = (candidates: RouteSuggestion[], limit: number) => {
  if (candidates.length <= limit) return candidates;
  const selected: RouteSuggestion[] = [];
  const used = new Set<string>();
  const segmentCount = Math.min(limit, 5);
  for (let segment = 0; segment < segmentCount && selected.length < limit; segment += 1) {
    const start = segment / segmentCount;
    const end = (segment + 1) / segmentCount;
    const best = candidates
      .filter((item) => item.routeProgress >= start && (segment === segmentCount - 1 ? item.routeProgress <= end : item.routeProgress < end))
      .sort((a, b) => b.score - a.score)[0];
    if (best) {
      selected.push(best);
      used.add(best.id);
    }
  }
  candidates
    .filter((item) => !used.has(item.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, limit - selected.length))
    .forEach((item) => selected.push(item));
  return selected;
};

export function buildRouteSuggestions(
  places: SupportPlace[],
  routeCoordinates: [number, number][],
  options: SuggestionOptions,
) {
  if (!routeCoordinates.length) return [];
  const sampleRate = Math.max(1, Math.ceil(routeCoordinates.length / 420));
  const sampled = routeCoordinates
    .map((coordinate, originalIndex) => ({ coordinate, originalIndex }))
    .filter((_, index) => index % sampleRate === 0);
  if (sampled.at(-1)?.originalIndex !== routeCoordinates.length - 1) {
    sampled.push({ coordinate: routeCoordinates.at(-1)!, originalIndex: routeCoordinates.length - 1 });
  }

  const deduplicated = new Map<string, RouteSuggestion>();
  places.forEach((place) => {
    const longitude = Number(place.longitude);
    const latitude = Number(place.latitude);
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return;
    let nearestDistance = Number.POSITIVE_INFINITY;
    let nearestOriginalIndex = 0;
    sampled.forEach(({ coordinate, originalIndex }) => {
      const candidateDistance = distanceKm([longitude, latitude], coordinate);
      if (candidateDistance < nearestDistance) {
        nearestDistance = candidateDistance;
        nearestOriginalIndex = originalIndex;
      }
    });
    if (nearestDistance > options.maxDetour) return;
    const kind = classifyPlace(place);
    if (!options.interests.includes(kind)) return;
    const priceBand = foodPriceBand(place, kind);
    const budgetMatch = kind !== "alimentacao"
      || options.foodBudget === "tanto-faz"
      || priceBand?.id === options.foodBudget
      || priceBand?.id === "nao-informada";
    let score = 100 - nearestDistance * 3.5;
    if (place.visitado === "SIM") score += 12;
    if (/PLANILHA_CONSOLIDADA|MAPA_PESSOAL/.test(place.origem)) score += 5;
    if (place.revisar === "SIM") score -= 7;
    if (/Motorhome|Trailer/.test(options.vehicle) && place.aceita_rv === "SIM") score += 9;
    if (options.travelingWithPet && place.pet_friendly === "SIM") score += 10;
    if (!budgetMatch) score -= 14;
    if (priceBand && options.foodBudget !== "tanto-faz" && priceBand.id === options.foodBudget) score += 10;
    const meta = kindMeta[kind];
    const suggestion: RouteSuggestion = {
      ...place,
      kind,
      kindLabel: meta.label,
      symbol: meta.symbol,
      routeDistance: nearestDistance,
      routeProgress: nearestOriginalIndex / Math.max(1, routeCoordinates.length - 1),
      score,
      reason: suggestionReason(place, kind, nearestDistance),
      priceBand,
    };
    const key = `${normalize(place.nome)}|${latitude.toFixed(4)}|${longitude.toFixed(4)}`;
    const current = deduplicated.get(key);
    if (!current || suggestion.score > current.score) deduplicated.set(key, suggestion);
  });

  const perKindLimit = options.profile === "Essencial" ? 2 : options.profile === "Descoberta" ? 5 : 3;
  const candidates = [...deduplicated.values()];
  const selected = options.interests.flatMap((kind) =>
    pickDistributed(candidates.filter((item) => item.kind === kind), perKindLimit),
  );
  return selected.sort((a, b) => a.routeProgress - b.routeProgress || b.score - a.score);
}

export const suggestionKindMeta = kindMeta;
