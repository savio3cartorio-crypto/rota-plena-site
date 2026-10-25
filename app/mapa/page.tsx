import type { Metadata } from "next";
import Link from "next/link";
import MapExplorer from "../components/MapExplorer";
import { PortalPage } from "../components/PortalChrome";
import { mailto } from "../site-config";

export const metadata: Metadata = {
  title: "Lugares por onde passei",
  description: "Mapa dos lugares visitados pelo Rota Plena: cidades, parques, cachoeiras, mirantes, pontos de apoio e paradas reais de viagem.",
};

export default function MapaPage() {
  return <PortalPage className="map-page">
    <section className="map-page-head"><div><p className="eyebrow dark">SELO “EU FUI”</p><h1>Só entra neste mapa o lugar por onde eu passei.</h1></div><div className="map-page-intro"><p>Em vez de milhares de pontos copiados de outros guias, um mapa menor e honesto: cidades, parques, cachoeiras, mirantes e paradas que visitei. Condições mudam com o tempo; confirme funcionamento e acesso antes de seguir.</p><Link href="/destinos/">Ver os destinos da região →</Link></div></section>
    <section className="map-insight-strip" aria-label="O que este mapa mostra">
      <div><small>MAPA PESSOAL</small><b>Lugares visitados</b><span>Do Vale do Paraíba e da Mantiqueira a outras estradas do Brasil.</span></div>
      <article><b>183</b><span>lugares com selo “eu fui”</span></article>
      <article><b>0</b><span>pontos copiados de outros guias</span></article>
      <article><b>1</b><span>pessoa conferindo tudo</span></article>
      <nav className="map-guide-links"><Link href="/destinos/vale-do-paraiba/">Vale do Paraíba →</Link><Link href="/destinos/sul-de-minas/">Mantiqueira →</Link><Link href="/planejar/">Planejar uma viagem →</Link><a href={mailto("sugestão de lugar")}>Sugerir um lugar →</a></nav>
    </section>
    <MapExplorer />
  </PortalPage>;
}
