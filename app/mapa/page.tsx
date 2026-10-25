import type { Metadata } from "next";
import MapExplorer from "../components/MapExplorer";
import { PortalPage } from "../components/PortalChrome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mapa de campings e pontos de apoio",
  description: "Explore campings, pernoites, natureza, cultura, alimentação, serviços e pontos de apoio para caravanismo no mapa Rota Plena.",
};

export default function MapaPage() {
  return <PortalPage className="map-page">
    <section className="map-page-head"><div><p className="eyebrow dark">MAPA ROTA PLENA</p><h1>Campings, natureza, cultura e apoios para escolher melhor.</h1></div><div className="map-page-intro"><p>Pesquise pelo destino ou pelo tipo de experiência. Os dados são colaborativos e podem mudar; confirme condições, regras e disponibilidade antes de seguir.</p><Link href="/guia-do-mapa">Ainda não conhece o mapa? Veja o guia →</Link></div></section>
    <section className="map-insight-strip" aria-label="Base cartográfica e rotas do Rota Plena">
      <div><small>BASE MESTRE CONECTADA</small><b>Mapa + 77 roteiros</b><span>Leste Paulista, Sul de Minas, Sul Fluminense e todo o Litoral de São Paulo.</span></div>
      <article><b>2.008</b><span>pontos ativos e geolocalizados</span></article>
      <article><b>77</b><span>roteiros com página própria</span></article>
      <article><b>4</b><span>grandes territórios conectados</span></article>
      <nav className="map-guide-links"><Link href="/guia-do-mapa">Como usar o mapa →</Link><Link href="/rotas">Explorar rotas →</Link><Link href="/destinos/vale-do-paraiba">Guia do Vale →</Link><Link href="/destinos/sul-de-minas">Sul de Minas →</Link></nav>
    </section>
    <MapExplorer />
  </PortalPage>;
}
