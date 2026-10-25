import Link from "next/link";
import type { ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";

export function PortalHeader() {
  return (
    <>
      <div className="utility-bar">
        <span>Conhecimento, liberdade e vida sobre rodas.</span>
        <div><Link href="/autor">Blog do Autor</Link><Link href="/sobre">Sobre o projeto</Link><a href="mailto:admin@rotaplena.com.br">Contato</a></div>
      </div>
      <header className="portal-header">
        <Link className="portal-brand" href="/" aria-label="Rota Plena — início">
          <img src="/rota-plena-logo-320.webp" alt="Logotipo Rota Plena" width="50" height="50" />
          <span><b>Rota Plena</b><small>Portal do caravanismo brasileiro</small></span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/comecar">Comece aqui</Link>
          <Link href="/mapa">Mapa</Link>
          <Link href="/rotas">Rotas</Link>
          <Link href="/planejar">Planejar</Link>
          <Link href="/aprenda">Aprenda</Link>
          <Link href="/noticias">Notícias</Link>
          <Link href="/ferramentas">Ferramentas</Link>
          <Link href="/comunidade">Comunidade</Link>
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
            <span><b>Rota Plena</b><small>Conhecimento, liberdade e vida sobre rodas.</small></span>
          </Link>
          <p>Um portal brasileiro que começa perto, aprende na prática e transforma cada experiência em referência para viajar com mais segurança, autonomia e liberdade.</p>
        </div>
        <div><b>Primeiros passos</b><Link href="/comecar">Comece por aqui</Link><Link href="/planejar">Primeira viagem</Link><Link href="/ferramentas">Checklist e ferramentas</Link><Link href="/guia-do-mapa">Como usar o mapa</Link><Link href="/destinos/vale-do-paraiba">Vale do Paraíba</Link><Link href="/destinos/sul-de-minas">Mantiqueira e Sul de Minas</Link><Link href="/mapa">Mapa de apoio</Link><Link href="/rotas">Biblioteca de rotas</Link></div>
        <div><b>Conteúdo</b><Link href="/noticias">Notícias & Estrada</Link><Link href="/autor">Blog do Autor</Link><Link href="/blog">Revista Rota Plena</Link><Link href="/aprenda">Guias práticos</Link><Link href="/diarios">Diários públicos</Link><Link href="/comunidade">Comunidade</Link></div>
        <div><b>Rota Plena</b><Link href="/sobre">Sobre</Link><a href="mailto:admin@rotaplena.com.br">Contato</a><Link href="/sobre#principios">Princípios editoriais</Link><Link href="/creditos-visuais">Créditos visuais</Link><Link href="/privacidade">Privacidade e LGPD</Link><Link href="/termos">Termos de Uso</Link></div>
      </div>
      <div className="portal-footer-bottom"><span>© 2026 Rota Plena — Sávio Antonio Americano · Taubaté, SP</span><span>Informação para viajar com responsabilidade.</span></div>
    </footer>
  );
}

export function PortalPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`portal-page ${className}`}><PortalHeader />{children}<PortalFooter /></main>;
}
