import type { Metadata } from "next";
import Link from "next/link";
import { PortalPage } from "./components/PortalChrome";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PortalPage>
      <section className="portal-page-hero">
        <div>
          <p className="eyebrow">ERRO 404</p>
          <h1>Esta estrada não existe, ou mudou de lugar.</h1>
          <p>O endereço pode ter sido digitado errado ou o conteúdo foi reorganizado. Escolha um novo ponto de partida.</p>
        </div>
      </section>
      <section className="portal-inner">
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "40px 0" }}>
          <Link className="button button-primary" href="/">Voltar ao início</Link>
          <Link className="button button-primary" href="/comecar/">Comece aqui</Link>
          <Link className="button button-primary" href="/destinos/">Destinos</Link>
          <Link className="button button-primary" href="/diario/">Diário de estrada</Link>
        </nav>
      </section>
    </PortalPage>
  );
}
