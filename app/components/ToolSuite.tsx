"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const checklistGroups = [
  { title: "Veículo e condução", items: ["Pneus e estepe calibrados", "Óleo, fluidos e bateria verificados", "Luzes e sinalização funcionando", "Documentos do veículo e habilitação", "Assistência e contatos salvos"] },
  { title: "Casa e autonomia", items: ["Reservatório de água abastecido", "Bateria de serviço carregada", "Gás fechado e sem vazamentos", "Geladeira e bomba de água testadas", "Portas, janelas e objetos travados"] },
  { title: "Rota e segurança", items: ["Destino e primeira parada confirmados", "Alternativa de pernoite salva", "Previsão do tempo consultada", "Roteiro compartilhado com alguém", "Kit de emergência acessível"] },
];

type EnergyLoad = { id: number; name: string; watts: number; hours: number; quantity: number };

const initialEnergyLoads: EnergyLoad[] = [
  { id: 1, name: "Geladeira 12 V", watts: 45, hours: 8, quantity: 1 },
  { id: 2, name: "Iluminação", watts: 12, hours: 5, quantity: 1 },
  { id: 3, name: "Notebook", watts: 65, hours: 2, quantity: 1 },
  { id: 4, name: "Celular", watts: 20, hours: 2, quantity: 2 },
  { id: 5, name: "Ventilador", watts: 30, hours: 6, quantity: 1 },
];

type WeatherDay = {
  date: string;
  code: number;
  max: number;
  min: number;
  rain: number;
};

type WeatherSnapshot = {
  place: string;
  state: string;
  temperature: number;
  apparent: number;
  wind: number;
  code: number;
  days: WeatherDay[];
};

const weatherLabels: Record<number, { label: string; icon: string }> = {
  0: { label: "Céu limpo", icon: "☀" },
  1: { label: "Predomínio de sol", icon: "◐" },
  2: { label: "Parcialmente nublado", icon: "◒" },
  3: { label: "Nublado", icon: "☁" },
  45: { label: "Neblina", icon: "≋" },
  48: { label: "Neblina com geada", icon: "≋" },
  51: { label: "Garoa leve", icon: "⋰" },
  53: { label: "Garoa", icon: "⋰" },
  55: { label: "Garoa intensa", icon: "⋰" },
  61: { label: "Chuva leve", icon: "☂" },
  63: { label: "Chuva", icon: "☂" },
  65: { label: "Chuva forte", icon: "☂" },
  71: { label: "Neve leve", icon: "❄" },
  73: { label: "Neve", icon: "❄" },
  75: { label: "Neve forte", icon: "❄" },
  80: { label: "Pancadas leves", icon: "☂" },
  81: { label: "Pancadas de chuva", icon: "☂" },
  82: { label: "Pancadas fortes", icon: "☂" },
  95: { label: "Trovoadas", icon: "ϟ" },
  96: { label: "Trovoadas com granizo", icon: "ϟ" },
  99: { label: "Temporal com granizo", icon: "ϟ" },
};

const weatherInfo = (code: number) => weatherLabels[code] ?? { label: "Condição variável", icon: "◌" };

async function getWeather(place: string): Promise<WeatherSnapshot> {
  const geocodeUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
  geocodeUrl.search = new URLSearchParams({ name: place, count: "1", language: "pt", format: "json", countryCode: "BR" }).toString();
  const geocodeResponse = await fetch(geocodeUrl);
  if (!geocodeResponse.ok) throw new Error("Não foi possível localizar a cidade.");
  const geocode = await geocodeResponse.json() as { results?: Array<{ name: string; admin1?: string; latitude: number; longitude: number }> };
  const location = geocode.results?.[0];
  if (!location) throw new Error("Cidade não encontrada. Tente incluir o estado.");

  const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
  forecastUrl.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "4",
  }).toString();
  const forecastResponse = await fetch(forecastUrl);
  if (!forecastResponse.ok) throw new Error("A previsão está temporariamente indisponível.");
  const forecast = await forecastResponse.json() as {
    current: { temperature_2m: number; apparent_temperature: number; weather_code: number; wind_speed_10m: number };
    daily: { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[] };
  };
  return {
    place: location.name,
    state: location.admin1 ?? "Brasil",
    temperature: forecast.current.temperature_2m,
    apparent: forecast.current.apparent_temperature,
    wind: forecast.current.wind_speed_10m,
    code: forecast.current.weather_code,
    days: forecast.daily.time.map((date, index) => ({
      date,
      code: forecast.daily.weather_code[index],
      max: forecast.daily.temperature_2m_max[index],
      min: forecast.daily.temperature_2m_min[index],
      rain: forecast.daily.precipitation_probability_max[index],
    })),
  };
}

export default function ToolSuite() {
  const [active, setActive] = useState("combustivel");
  const [distance, setDistance] = useState(450);
  const [consumption, setConsumption] = useState(7.5);
  const [fuelPrice, setFuelPrice] = useState(6.15);
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(3);
  const [water, setWater] = useState(180);
  const [battery, setBattery] = useState(200);
  const [dailyEnergy, setDailyEnergy] = useState(55);
  const [checked, setChecked] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState({ current: 82000, nextOil: 85000, nextTire: 90000 });
  const [pernoite, setPernoite] = useState({ acesso: "Bom", iluminacao: "Boa", sinal: "Sim", autorizado: "Sim" });

  useEffect(() => {
    const saved = window.localStorage.getItem("rota-plena-checklist");
    if (saved) window.setTimeout(() => setChecked(JSON.parse(saved)), 0);
  }, []);

  const fuel = useMemo(() => {
    const liters = consumption > 0 ? distance / consumption : 0;
    return { liters, cost: liters * fuelPrice };
  }, [distance, consumption, fuelPrice]);
  const autonomy = useMemo(() => {
    const waterNeed = people * days * 18;
    const energyNeed = dailyEnergy * days;
    return {
      waterNeed,
      waterBalance: water - waterNeed,
      energyNeed,
      energyBalance: battery - energyNeed,
    };
  }, [people, days, water, battery, dailyEnergy]);

  function toggleCheck(item: string) {
    const next = checked.includes(item) ? checked.filter((entry) => entry !== item) : [...checked, item];
    setChecked(next);
    window.localStorage.setItem("rota-plena-checklist", JSON.stringify(next));
  }

  const tabs = [
    ["combustivel", "Combustível"],
    ["clima", "Clima"],
    ["autonomia", "Autonomia"],
    ["energia", "Energia solar"],
    ["checklist", "Checklist"],
    ["manutencao", "Manutenção"],
    ["pernoite", "Pernoite"],
    ["moedas", "Moedas"],
    ["conversores", "Medidas"],
  ];

  return <div className="tool-suite">
    <div className="tool-tabs" role="tablist">{tabs.map(([id, label]) => <button role="tab" aria-selected={active === id} className={active === id ? "active" : ""} key={id} onClick={() => setActive(id)}>{label}</button>)}</div>

    {active === "combustivel" && <section className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow dark">CALCULADORA DE COMBUSTÍVEL</p><h2>Quanto a estrada vai consumir?</h2><p>Uma estimativa para organizar o orçamento. Vento, relevo, peso, trânsito e modo de condução alteram o consumo real.</p></div><div className="tool-form">
      <label>Distância total (km)<input type="number" min="0" value={distance} onChange={(e) => setDistance(Number(e.target.value))} /></label>
      <label>Consumo médio (km/l)<input type="number" min="0.1" step="0.1" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} /></label>
      <label>Preço do combustível (R$/l)<input type="number" min="0" step="0.01" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} /></label>
      <div className="tool-result"><span>Combustível estimado<b>{fuel.liters.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} litros</b></span><span>Custo estimado<b>{fuel.cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b></span></div>
    </div></section>}

    {active === "clima" && <WeatherPanel />}

    {active === "autonomia" && <section className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow dark">ÁGUA E ENERGIA</p><h2>Seus recursos acompanham os dias de viagem?</h2><p>A água usa referência conservadora de 18 litros por pessoa/dia para higiene e consumo geral. Ajuste conforme a rotina real da sua família.</p></div><div className="tool-form grid-form">
      <label>Pessoas<input type="number" min="1" value={people} onChange={(e) => setPeople(Number(e.target.value))} /></label><label>Dias sem reabastecer<input type="number" min="1" value={days} onChange={(e) => setDays(Number(e.target.value))} /></label>
      <label>Água disponível (litros)<input type="number" min="0" value={water} onChange={(e) => setWater(Number(e.target.value))} /></label><label>Bateria útil (Ah)<input type="number" min="0" value={battery} onChange={(e) => setBattery(Number(e.target.value))} /></label>
      <label>Consumo elétrico diário (Ah)<input type="number" min="0" value={dailyEnergy} onChange={(e) => setDailyEnergy(Number(e.target.value))} /></label>
      <div className="tool-result wide"><span>Água necessária<b>{autonomy.waterNeed} litros</b><em className={autonomy.waterBalance >= 0 ? "ok" : "warn"}>{autonomy.waterBalance >= 0 ? `Sobra estimada: ${autonomy.waterBalance} l` : `Faltam ${Math.abs(autonomy.waterBalance)} l`}</em></span><span>Energia necessária<b>{autonomy.energyNeed} Ah</b><em className={autonomy.energyBalance >= 0 ? "ok" : "warn"}>{autonomy.energyBalance >= 0 ? `Reserva: ${autonomy.energyBalance} Ah` : `Déficit: ${Math.abs(autonomy.energyBalance)} Ah`}</em></span></div>
    </div></section>}

    {active === "energia" && <EnergyPlanner />}

    {active === "checklist" && <section className="tool-panel checklist-panel"><div className="tool-panel-copy"><p className="eyebrow dark">CHECKLIST DE SAÍDA</p><h2>Antes de girar a chave.</h2><p>Marque os itens conforme conclui. O progresso fica salvo neste dispositivo.</p><div className="check-progress"><b>{checked.length}/{checklistGroups.flatMap((g) => g.items).length}</b><span><i style={{ width: `${(checked.length / checklistGroups.flatMap((g) => g.items).length) * 100}%` }} /></span></div><button onClick={() => { setChecked([]); window.localStorage.removeItem("rota-plena-checklist"); }}>Limpar marcações</button></div><div className="check-groups">{checklistGroups.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)} /><span>{item}</span></label>)}</div>)}</div></section>}

    {active === "manutencao" && <section className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow dark">CONTROLE DE MANUTENÇÃO</p><h2>O próximo cuidado antes do próximo problema.</h2><p>Registre referências do seu veículo. As recomendações do fabricante e do profissional responsável sempre prevalecem.</p></div><div className="tool-form grid-form"><label>Quilometragem atual<input type="number" value={maintenance.current} onChange={(e) => setMaintenance({ ...maintenance, current: Number(e.target.value) })} /></label><label>Próxima troca de óleo<input type="number" value={maintenance.nextOil} onChange={(e) => setMaintenance({ ...maintenance, nextOil: Number(e.target.value) })} /></label><label>Próxima revisão de pneus<input type="number" value={maintenance.nextTire} onChange={(e) => setMaintenance({ ...maintenance, nextTire: Number(e.target.value) })} /></label><div className="tool-result wide"><span>Óleo em<b>{Math.max(0, maintenance.nextOil - maintenance.current).toLocaleString("pt-BR")} km</b></span><span>Pneus em<b>{Math.max(0, maintenance.nextTire - maintenance.current).toLocaleString("pt-BR")} km</b></span></div></div></section>}

    {active === "pernoite" && <section className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow dark">FICHA DE PERNOITE</p><h2>Uma leitura rápida antes de parar.</h2><p>Esta ficha ajuda a organizar sinais observáveis. Ela não substitui autorização, avaliação do entorno nem o seu plano alternativo.</p></div><div className="tool-form grid-form">{Object.entries(pernoite).map(([key, value]) => <label key={key}>{key === "acesso" ? "Acesso e manobra" : key === "iluminacao" ? "Iluminação" : key === "sinal" ? "Sinal de celular" : "Permanência autorizada"}<select value={value} onChange={(e) => setPernoite({ ...pernoite, [key]: e.target.value })}>{key === "acesso" || key === "iluminacao" ? <><option>Boa</option><option>Regular</option><option>Ruim</option></> : <><option>Sim</option><option>Não</option><option>Não confirmado</option></>}</select></label>)}<div className="pernoite-verdict"><b>{pernoite.autorizado === "Sim" && pernoite.acesso !== "Ruim" ? "Condições iniciais favoráveis" : "Pare e confirme antes de decidir"}</b><span>Mantenha uma segunda opção salva e reavalie se chegar à noite ou se as condições mudarem.</span></div></div></section>}

    {active === "moedas" && <CurrencyPanel />}
    {active === "conversores" && <ConverterPanel />}
  </div>;
}

function EnergyPlanner() {
  const [loads, setLoads] = useState<EnergyLoad[]>(initialEnergyLoads);
  const [stationWh, setStationWh] = useState(1024);
  const [reserve, setReserve] = useState(15);
  const [systemEfficiency, setSystemEfficiency] = useState(88);
  const [inverterWatts, setInverterWatts] = useState(1800);
  const [panelWatts, setPanelWatts] = useState(400);
  const [solarInputLimit, setSolarInputLimit] = useState(500);
  const [sunHours, setSunHours] = useState(4.5);
  const [solarEfficiency, setSolarEfficiency] = useState(75);

  const totals = useMemo(() => {
    const daily = loads.reduce((sum, item) => sum + Math.max(0, item.watts) * Math.max(0, item.hours) * Math.max(0, item.quantity), 0);
    const simultaneous = loads.reduce((sum, item) => sum + Math.max(0, item.watts) * Math.max(0, item.quantity), 0);
    const usable = Math.max(0, stationWh) * Math.max(0, 1 - reserve / 100) * Math.max(0, systemEfficiency / 100);
    const effectivePanel = Math.min(Math.max(0, panelWatts), solarInputLimit > 0 ? solarInputLimit : Math.max(0, panelWatts));
    const solarDaily = effectivePanel * Math.max(0, sunHours) * Math.max(0, solarEfficiency / 100);
    const panelNeeded = sunHours > 0 && solarEfficiency > 0 ? daily / (sunHours * (solarEfficiency / 100)) : 0;
    return {
      daily,
      simultaneous,
      usable,
      autonomy: daily > 0 ? usable / daily : 0,
      effectivePanel,
      solarDaily,
      balance: solarDaily - daily,
      panelNeeded,
      rechargeHours: effectivePanel > 0 && solarEfficiency > 0 ? Math.max(0, stationWh) / (effectivePanel * (solarEfficiency / 100)) : 0,
    };
  }, [loads, stationWh, reserve, systemEfficiency, panelWatts, solarInputLimit, sunHours, solarEfficiency]);

  const updateLoad = (id: number, field: keyof EnergyLoad, value: string | number) => setLoads((current) => current.map((item) => item.id === id ? { ...item, [field]: field === "name" ? value : Number(value) } : item));
  const addLoad = () => setLoads((current) => [...current, { id: Math.max(0, ...current.map((item) => item.id)) + 1, name: "Outro equipamento", watts: 0, hours: 1, quantity: 1 }]);
  const removeLoad = (id: number) => setLoads((current) => current.filter((item) => item.id !== id));
  const energy = (value: number) => value >= 1000 ? `${(value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} kWh` : `${Math.round(value).toLocaleString("pt-BR")} Wh`;

  return <section className="energy-planner" id="energia">
    <header className="energy-planner-head"><div><p className="eyebrow dark">DIMENSIONADOR OFF-GRID</p><h2>Consumo, estação e sol na mesma conta.</h2><p>Monte um dia de uso, informe a sua estação e simule a reposição pelos painéis. Faça também cenários de pouco sol e maior consumo.</p></div><Link href="/blog/estacao-energia-placas-solares-caravanismo">Entenda cada número no guia →</Link></header>

    <div className="energy-layout">
      <div className="energy-loads">
        <div className="energy-section-title"><div><small>ETAPA 1</small><h3>O que você pretende alimentar?</h3></div><button type="button" onClick={addLoad}>+ Adicionar equipamento</button></div>
        <div className="energy-load-head"><span>Equipamento</span><span>Potência</span><span>Horas/dia</span><span>Qtd.</span><span>Consumo</span><span /></div>
        {loads.map((item) => <div className="energy-load-row" key={item.id}>
          <label><span>Equipamento</span><input value={item.name} onChange={(event) => updateLoad(item.id, "name", event.target.value)} /></label>
          <label><span>Potência (W)</span><input type="number" min="0" value={item.watts} onChange={(event) => updateLoad(item.id, "watts", event.target.value)} /></label>
          <label><span>Horas/dia</span><input type="number" min="0" max="24" step="0.1" value={item.hours} onChange={(event) => updateLoad(item.id, "hours", event.target.value)} /></label>
          <label><span>Quantidade</span><input type="number" min="0" value={item.quantity} onChange={(event) => updateLoad(item.id, "quantity", event.target.value)} /></label>
          <b>{energy(item.watts * item.hours * item.quantity)}</b>
          <button type="button" onClick={() => removeLoad(item.id)} aria-label={`Remover ${item.name}`}>×</button>
        </div>)}
        <div className="energy-load-total"><span>Consumo estimado em 24 horas</span><b>{energy(totals.daily)}</b></div>
      </div>

      <div className="energy-config-grid">
        <section><div className="energy-section-title"><div><small>ETAPA 2</small><h3>Sua estação de energia</h3></div></div><div className="energy-fields">
          <label>Capacidade nominal (Wh)<input type="number" min="0" value={stationWh} onChange={(event) => setStationWh(Number(event.target.value))} /></label>
          <label>Potência contínua do inversor (W)<input type="number" min="0" value={inverterWatts} onChange={(event) => setInverterWatts(Number(event.target.value))} /></label>
          <label>Reserva desejada (%)<input type="number" min="0" max="80" value={reserve} onChange={(event) => setReserve(Number(event.target.value))} /></label>
          <label>Rendimento global estimado (%)<input type="number" min="1" max="100" value={systemEfficiency} onChange={(event) => setSystemEfficiency(Number(event.target.value))} /></label>
        </div></section>
        <section><div className="energy-section-title"><div><small>ETAPA 3</small><h3>Suas placas solares</h3></div></div><div className="energy-fields">
          <label>Potência total dos painéis (W)<input type="number" min="0" value={panelWatts} onChange={(event) => setPanelWatts(Number(event.target.value))} /></label>
          <label>Entrada solar máxima da estação (W)<input type="number" min="0" value={solarInputLimit} onChange={(event) => setSolarInputLimit(Number(event.target.value))} /></label>
          <label>Horas de sol-pico por dia<input type="number" min="0" max="12" step="0.1" value={sunHours} onChange={(event) => setSunHours(Number(event.target.value))} /></label>
          <label>Rendimento solar global (%)<input type="number" min="1" max="100" value={solarEfficiency} onChange={(event) => setSolarEfficiency(Number(event.target.value))} /></label>
        </div></section>
      </div>

      <section className="energy-results">
        <div className="energy-result-lead"><small>LEITURA DO SEU CENÁRIO</small><h3>{totals.balance >= 0 ? "A geração solar estimada cobre o consumo diário." : "A geração estimada ainda não repõe todo o consumo."}</h3><p>{totals.balance >= 0 ? `Margem teórica de ${energy(totals.balance)} em um dia com as condições informadas.` : `Déficit teórico de ${energy(Math.abs(totals.balance))} por dia. Reduza consumo, aumente geração compatível ou preveja outra recarga.`}</p></div>
        <div className="energy-metrics">
          <article><span>Consumo diário</span><b>{energy(totals.daily)}</b></article>
          <article><span>Capacidade útil estimada</span><b>{energy(totals.usable)}</b></article>
          <article><span>Autonomia sem sol</span><b>{totals.autonomy.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} dias</b></article>
          <article><span>Geração solar/dia</span><b>{energy(totals.solarDaily)}</b></article>
          <article><span>Painéis para compensar</span><b>{Math.ceil(totals.panelNeeded / 10) * 10} W</b></article>
          <article><span>Recarga solar teórica</span><b>{totals.rechargeHours ? `${totals.rechargeHours.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} h-sol` : "—"}</b></article>
        </div>
        <div className="energy-verdicts">
          <p className={totals.simultaneous <= inverterWatts ? "ok" : "warn"}><b>Potência simultânea: {Math.round(totals.simultaneous)} W</b><span>{totals.simultaneous <= inverterWatts ? `Dentro dos ${inverterWatts} W contínuos informados. Confirme também os picos de partida.` : `Acima dos ${inverterWatts} W contínuos. Os equipamentos não devem operar todos juntos nesse cenário.`}</span></p>
          <p className={totals.panelNeeded <= solarInputLimit ? "ok" : "warn"}><b>Entrada solar considerada: {Math.round(totals.effectivePanel)} W</b><span>{totals.panelNeeded <= solarInputLimit ? "A potência necessária cabe no limite informado, mas tensão e corrente ainda precisam ser verificadas." : "A potência calculada para compensar o dia supera a entrada solar máxima informada pela estação."}</span></p>
        </div>
      </section>
    </div>
    <footer className="energy-safety-note"><b>Compatibilidade elétrica não pode ser calculada apenas em watts.</b><span>Antes de conectar painéis, confira no manual a faixa de tensão, Voc máximo, corrente, conectores, polaridade e regras para série ou paralelo. A simulação não substitui o fabricante ou um profissional habilitado.</span></footer>
  </section>;
}

function WeatherPanel() {
  const [query, setQuery] = useState("Taubaté");
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(place: string) {
    setLoading(true);
    setError("");
    try {
      setWeather(await getWeather(place));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível consultar a previsão.");
    } finally {
      setLoading(false);
    }
  }

  const current = weatherInfo(weather?.code ?? 0);

  return <section className="tool-panel weather-panel">
    <div className="tool-panel-copy"><p className="eyebrow dark">CLIMA DA ROTA</p><h2>O tempo muda a experiência da parada.</h2><p>Consulte o destino antes de decidir estrada, trilha, pernoite e horário de chegada. Previsão é referência, não garantia.</p><a className="tool-source-link" href="https://open-meteo.com/" target="_blank" rel="noreferrer">Dados meteorológicos: Open-Meteo ↗</a></div>
    <div className="weather-widget">
      <form className="weather-search" onSubmit={(event) => { event.preventDefault(); void search(query); }}><label><span>Cidade brasileira</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Cunha, SP" /></label><button type="submit" disabled={loading}>{loading ? "Consultando…" : "Ver previsão"}</button></form>
      {error && <p className="tool-live-error" role="alert">{error}</p>}
      {weather && !error && <><div className="weather-now"><span className="weather-symbol" aria-hidden="true">{current.icon}</span><div><small>AGORA EM {weather.place.toLocaleUpperCase("pt-BR")}, {weather.state.toLocaleUpperCase("pt-BR")}</small><strong>{Math.round(weather.temperature)}°</strong><b>{current.label}</b></div><aside><span>Sensação<b>{Math.round(weather.apparent)}°C</b></span><span>Vento<b>{Math.round(weather.wind)} km/h</b></span></aside></div><div className="weather-days">{weather.days.map((day, index) => { const info = weatherInfo(day.code); return <article key={day.date}><small>{index === 0 ? "Hoje" : new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(`${day.date}T12:00:00`)).replace(".", "")}</small><span aria-hidden="true">{info.icon}</span><b>{Math.round(day.max)}° <i>{Math.round(day.min)}°</i></b><em>{day.rain}% chuva</em></article>; })}</div></>}
    </div>
  </section>;
}

const travelCurrencies = [
  ["BRL", "Real brasileiro"], ["USD", "Dólar americano"], ["EUR", "Euro"], ["ARS", "Peso argentino"],
  ["UYU", "Peso uruguaio"], ["CLP", "Peso chileno"], ["PYG", "Guarani paraguaio"], ["BOB", "Boliviano"], ["PEN", "Sol peruano"],
];

function CurrencyPanel() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("BRL");
  const [to, setTo] = useState("USD");
  const [rate, setRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function convert(base = from, quote = to) {
    setLoading(true);
    setError("");
    if (base === quote) { setRate(1); setRateDate(new Date().toISOString().slice(0, 10)); setLoading(false); return; }
    try {
      const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=${encodeURIComponent(base)}&quotes=${encodeURIComponent(quote)}`);
      if (!response.ok) throw new Error("Cotação temporariamente indisponível.");
      const data = await response.json() as Array<{ rate: number; date: string }>;
      if (!data[0]?.rate) throw new Error("Par de moedas não encontrado.");
      setRate(data[0].rate);
      setRateDate(data[0].date);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível consultar a cotação.");
    } finally {
      setLoading(false);
    }
  }

  const result = amount * (rate ?? 0);
  const swap = () => { const nextFrom = to; const nextTo = from; setFrom(nextFrom); setTo(nextTo); void convert(nextFrom, nextTo); };

  return <section className="tool-panel currency-panel">
    <div className="tool-panel-copy"><p className="eyebrow dark">CÂMBIO DE VIAGEM</p><h2>Uma referência antes de cruzar a fronteira.</h2><p>Conversão indicativa para orçamento. A cobrança efetiva pode incluir spread, impostos, tarifas e diferença entre dinheiro, cartão e casa de câmbio.</p><a className="tool-source-link" href="https://frankfurter.dev/" target="_blank" rel="noreferrer">Cotações de referência: Frankfurter ↗</a></div>
    <div className="currency-widget">
      <div className="currency-fields"><label><span>Valor</span><input type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label><label><span>De</span><select value={from} onChange={(event) => setFrom(event.target.value)}>{travelCurrencies.map(([code, name]) => <option value={code} key={code}>{code} · {name}</option>)}</select></label><button type="button" className="currency-swap" onClick={swap} aria-label="Inverter moedas">⇄</button><label><span>Para</span><select value={to} onChange={(event) => setTo(event.target.value)}>{travelCurrencies.map(([code, name]) => <option value={code} key={code}>{code} · {name}</option>)}</select></label></div>
      <button className="currency-action" type="button" onClick={() => void convert()} disabled={loading}>{loading ? "Atualizando…" : "Converter agora"}</button>
      {error && <p className="tool-live-error" role="alert">{error}</p>}
      {rate !== null && !error && <div className="currency-result"><small>{amount.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} {from} equivalem aproximadamente a</small><strong>{result.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span>{to}</span></strong><p>1 {from} = {rate.toLocaleString("pt-BR", { maximumFractionDigits: 6 })} {to}{rateDate && <> · referência de {new Intl.DateTimeFormat("pt-BR").format(new Date(`${rateDate}T12:00:00`))}</>}</p></div>}
    </div>
  </section>;
}

function ConverterPanel() {
  const [km, setKm] = useState(100);
  const [liters, setLiters] = useState(100);
  const [celsius, setCelsius] = useState(25);
  return <section className="tool-panel"><div className="tool-panel-copy"><p className="eyebrow dark">CONVERSORES RÁPIDOS</p><h2>Referências úteis no caminho.</h2><p>Para abastecimento, sinalização e materiais estrangeiros encontrados durante a viagem.</p></div><div className="converter-grid"><label>Quilômetros<input type="number" value={km} onChange={(e) => setKm(Number(e.target.value))} /><b>{(km * 0.621371).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} milhas</b></label><label>Litros<input type="number" value={liters} onChange={(e) => setLiters(Number(e.target.value))} /><b>{(liters * 0.264172).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} galões US</b></label><label>Temperatura °C<input type="number" value={celsius} onChange={(e) => setCelsius(Number(e.target.value))} /><b>{(celsius * 9 / 5 + 32).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} °F</b></label></div></section>;
}
