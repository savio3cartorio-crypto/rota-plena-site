import type { Metadata } from "next";
import Link from "next/link";
import RouteCatalog from "../components/RouteCatalog";
import { PortalPage } from "../components/PortalChrome";
import { getPublicDiaryEntries } from "../../db/diaries";
import { publishedRoutes } from "../data/routes";
import { mailto } from "../site-config";

export const metadata: Metadata = {
  title: "Roteiros percorridos",
  description: "Roteiros de viagem sobre rodas publicados só depois de percorridos: trajeto real, tempo, custos, onde dormir e o que eu faria diferente.",
};

export default async function RoutesPage() {
  const diaries = await getPublicDiaryEntries();
  const caraiva = [...diaries].sort((a, b) => (a.tripDate ?? "").localeCompare(b.tripDate ?? ""));
  return <PortalPage className="routes-portal-page">
    <section className="routes-hero">
      <div><p className="eyebrow">ROTEIROS</p><h1>Só publico o caminho<br /><em>que eu já fiz.</em></h1><p>Cada roteiro aqui foi percorrido de verdade: trajeto, tempo de estrada, onde dormir, quanto custou e o que eu faria diferente. Roteiros montados só no papel ficam guardados até serem testados na estrada.</p></div>
      <aside><span><b>{1 + publishedRoutes.length}</b> {publishedRoutes.length ? "roteiros percorridos" : "roteiro percorrido"}</span><span><b>100%</b> com estrada real</span><span><b>0</b> roteiros de escritório</span></aside>
    </section>

    <section className="route-phase-banner"><div><small>ROTEIRO PERCORRIDO · JANEIRO DE 2024</small><b>Taubaté → Vitória → Caraíva (BA)</b><span>Dois dias de estrada em família até a vila onde o rio encontra o mar, contados capítulo a capítulo no Diário de estrada.</span></div><nav>{caraiva.map((entry, index) => <Link key={entry.id} href={`/diarios/${entry.id}/`}>Dia {index + 1}</Link>)}</nav></section>

    {publishedRoutes.length > 0
      ? <RouteCatalog routes={publishedRoutes} />
      : <section className="route-transparency-band"><b>Próximos roteiros</b><p>Os próximos roteiros do Vale do Paraíba, da Mantiqueira e do Litoral Norte entram aqui depois de cada saída de campo, com data da viagem e fotos próprias. Enquanto isso, use o planejador para montar a sua primeira viagem perto de casa.</p><small><Link href="/planejar/">Abrir o planejador →</Link> · <a href={mailto("sugestão de roteiro")}>Sugerir um roteiro para eu fazer →</a></small></section>}
  </PortalPage>;
}
