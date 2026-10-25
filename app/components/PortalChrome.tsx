import Link from "next/link";
import type { ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";
import { CONTACT_EMAIL, mailto } from "../site-config";

export const mainNavigation = [
  { href: "/comecar/", label: "Comece aqui" },
  { href: "/destinos/", label: "Destinos" },
  { href: "/rotas/", label: "Roteiros" },
  { href: "/diario/", label: "Diário de estrada" },
  { href: "/ferramentas/", label: "Ferramentas" },
  { href: "/sobre/", label: "Sobre" },
];

export function PortalHeader() {
  return (
    <>
      <div className="utility-bar">
        <span>A estrada começa perto. Eu fui antes, e te mostro como.</span>
        <div><Link href="/mapa/">Lugares por onde passei</Link><Link href="/sobre/#newsletter">Receber por e-mail</Link><a href={mailto("Contato pelo site")}>Contato</a></div>
      </div>
      <header className="portal-header">
        <Link className="portal-brand" href="/" aria-label="Rota Plena — início">
          <img src="/rota-plena-marca.svg" alt="" width="46" height="46" />
          <span><b>Rota Plena</b><small>Viajar perto, viver pleno</small></span>
        </Link>
        <nav aria-label="Navegação principal">
          {mainNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <MobileNavigation />
      </header>
    </>
  );
}

export function PortalFooter() {
  return (
    <footer className="portal-footer">
      <div className="portal-footer-main">
        <div className="footer-about">
          <Link className="portal-brand footer-logo" href="/">
            <img src="/rota-plena-logo-320.webp" alt="Logotipo Rota Plena" width="45" height="45" loading="lazy" />
            <span><b>Rota Plena</b><small>Viajar perto, viver pleno.</small></span>
          </Link>
          <p>O guia de quem quer começar a viver a estrada perto de casa, com o carro que já tem. Feito por Sávio Antonio Americano, a partir de Taubaté, com lugares e relatos de quem esteve lá.</p>
        </div>
        <div><b>Começar</b><Link href="/comecar/">Comece aqui</Link><Link href="/comecar/#guias">Guias práticos</Link><Link href="/ferramentas/">Checklist e ferramentas</Link><Link href="/planejar/">Planejador de rotas</Link></div>
        <div><b>Estrada</b><Link href="/destinos/">Destinos</Link><Link href="/destinos/vale-do-paraiba/">Vale do Paraíba</Link><Link href="/destinos/sul-de-minas/">Mantiqueira e Sul de Minas</Link><Link href="/rotas/">Roteiros</Link><Link href="/mapa/">Lugares por onde passei</Link><Link href="/diario/">Diário de estrada</Link></div>
        <div><b>Rota Plena</b><Link href="/sobre/">Sobre</Link><Link href="/sobre/#historia">Mande sua história</Link><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><Link href="/creditos-visuais/">Créditos visuais</Link><Link href="/privacidade/">Privacidade e LGPD</Link><Link href="/termos/">Termos de Uso</Link></div>
      </div>
      <div className="portal-footer-bottom"><span>© 2026 Rota Plena — Sávio Antonio Americano · Taubaté, SP</span><span>Lugares visitados, informação com data, sem anúncios.</span></div>
    </footer>
  );
}

export function PortalPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`portal-page ${className}`}><PortalHeader />{children}<PortalFooter /></main>;
}
