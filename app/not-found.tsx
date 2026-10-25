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
          <Link className="button button-primary" href="/mapa/">Abrir o mapa</Link>
          <Link className="button button-primary" href="/rotas/">Ver as rotas</Link>
          <Link className="button button-primary" href="/blog/">Ler a revista</Link>
        </nav>
      </section>
    </PortalPage>
  );
}
