import type { Metadata } from "next";
import ToolSuite from "../components/ToolSuite";
import { PortalPage } from "../components/PortalChrome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ferramentas",
  description: "Estimativas de combustível, clima, autonomia de água e energia, checklist de saída e apoio à avaliação do pernoite.",
};

export default function FerramentasPage() {
  return <PortalPage><section className="portal-page-hero tools-hero"><div><p className="eyebrow">FERRAMENTAS ROTA PLENA</p><h1>Organização prática para viajar com mais autonomia.</h1><p>Consulte o clima, converta moedas, calcule recursos, acompanhe manutenção, avalie pernoites e leve um checklist que não depende da memória.</p></div></section><nav className="regional-tools-callout" aria-label="Ferramentas territoriais"><div><small>NOVA INTELIGÊNCIA TERRITORIAL</small><b>Sul de Minas agora conversa com o Vale do Paraíba.</b><span>Conheça 27 cidades e abra os trajetos sugeridos diretamente no planejador.</span></div><Link href="/destinos/sul-de-minas">Explorar a região →</Link><Link href="/planejar?origem=Taubaté&destino=Itajubá">Planejar Taubaté–Itajubá →</Link></nav><section className="portal-inner"><ToolSuite /><p className="tools-disclaimer"><b>Atenção:</b> previsões, cotações e cálculos são referências para planejamento. Condições reais, taxas contratadas, manual do veículo, orientações do fabricante, normas locais e avaliação profissional prevalecem.</p></section></PortalPage>;
}
