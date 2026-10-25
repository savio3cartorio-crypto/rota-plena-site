import type { Metadata } from "next";
import RoutePlanner from "../components/RoutePlanner";
import { PortalFooter, PortalHeader } from "../components/PortalChrome";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Planejador de rotas",
  description: "Planeje sua viagem sobre rodas: origem, destino, paradas, perfil do veículo, sugestões ao longo do percurso e exportação em PDF, GPX, KML, CSV e GeoJSON.",
};

export default function PlanejarPage() {
  return (
    <main className="portal-page">
      <PortalHeader />
      <section className="planner-page-hero">
        <div>
          <p className="eyebrow">PLANEJADOR ROTA PLENA</p>
          <h1>Entre dois destinos, descubra a viagem inteira.</h1>
          <p>O Rota Plena analisa o percurso, distribui paradas úteis e combina pernoite, serviços, alimentação, natureza e cultura de acordo com o seu veículo e o jeito como deseja viajar.</p>
        </div>
      </section>
      <nav className="route-region-shortcuts" aria-label="Rotas regionais sugeridas">
        <span>Inspire o destino:</span>
        <Link href="/rotas/">Roteiros percorridos</Link>
        <a href="/planejar?origem=Taubaté%2C%20SP&destino=Itajubá%2C%20MG">Vale → Itajubá</a>
        <a href="/planejar?origem=Cruzeiro%2C%20SP&destino=Passa%20Quatro%2C%20MG">Cruzeiro → Passa Quatro</a>
        <a href="/planejar?origem=Taubaté%2C%20SP&destino=Gonçalves%2C%20MG">Vale → Gonçalves</a>
        <a href="/destinos/sul-de-minas">Guia do Sul de Minas</a>
      </nav>
      <RoutePlanner />
      <PortalFooter />
    </main>
  );
}
