import type { Metadata } from "next";
import Link from "next/link";
import RouteCatalog from "../components/RouteCatalog";
import { PortalPage } from "../components/PortalChrome";
import { curatedRoutes, routesUpdatedAt } from "../data/routes";

export const metadata: Metadata = {
  title: "Rotas para caravanismo",
  description: "Roteiros para caravanismo no Leste Paulista, Sul de Minas, Sul Fluminense e Litoral de São Paulo, com alertas, apoio e planejamento.",
};

export default function RoutesPage() {
  const withTechnicalScore = curatedRoutes.filter((route) => route.score !== null).length;
  return <PortalPage className="routes-portal-page">
    <section className="routes-hero">
      <div><p className="eyebrow">BIBLIOTECA DE ROTAS</p><h1>Comece perto.<br /><em>Expanda quando estiver pronto.</em></h1><p>Na primeira fase, destacamos Vale do Paraíba, Mantiqueira e Litoral Norte. A biblioteca completa permanece disponível como pesquisa editorial — sempre com o nível de maturidade e as confirmações necessárias à vista.</p></div>
      <aside><span><b>3</b> territórios prioritários</span><span><b>{curatedRoutes.length}</b> estudos na biblioteca</span><span><b>{withTechnicalScore}</b> análises técnicas</span></aside>
    </section>
    <section className="route-phase-banner"><div><small>PRIMEIRA VIAGEM?</small><b>Use primeiro os roteiros do território-piloto.</b><span>Menor distância facilita confirmação, retorno e aprendizado.</span></div><nav><Link href="/rotas/caragua-serra-mar">Litoral Norte</Link><Link href="/rotas/mantiqueira-integrada">Mantiqueira</Link><Link href="/destinos/vale-do-paraiba">Vale do Paraíba</Link></nav></section>
    <section className="route-transparency-band"><b>Transparência de estrada</b><p>“Planejamento” significa rota pesquisada, mas ainda não testada integralmente. “Com alertas” indica maior maturidade. “Em estudo” não deve ser executada como roteiro.</p><small>Base atualizada em {new Date(`${routesUpdatedAt}T12:00:00`).toLocaleDateString("pt-BR")}</small></section>
    <RouteCatalog routes={curatedRoutes} />
  </PortalPage>;
}
