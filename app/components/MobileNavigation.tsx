"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuLinks = [
  { href: "/comecar/", label: "Comece aqui", icon: "①" },
  { href: "/destinos/", label: "Destinos", icon: "◈" },
  { href: "/rotas/", label: "Roteiros", icon: "↟" },
  { href: "/diario/", label: "Diário de estrada", icon: "✎" },
  { href: "/mapa/", label: "Lugares por onde passei", icon: "⌖" },
  { href: "/ferramentas/", label: "Ferramentas", icon: "✓" },
  { href: "/planejar/", label: "Planejador de rotas", icon: "↝" },
  { href: "/sobre/", label: "Sobre e contato", icon: "○" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-portal-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
        <b>{open ? "Fechar" : "Menu"}</b>
      </button>

      {open && <button type="button" className="mobile-menu-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} />}

      {open && <aside id="mobile-portal-menu" className="mobile-menu-drawer open">
        <div className="mobile-menu-heading">
          <div><span>Rota Plena</span><small>Escolha para onde seguir</small></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">×</button>
        </div>
        <nav aria-label="Navegação móvel">
          {menuLinks.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href || pathname === item.href.replace(/\/$/, "") ? "active" : ""} onClick={() => setOpen(false)}>
              <span aria-hidden="true">{item.icon}</span>
              <b>{item.label}</b>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-legal">
          <Link href="/privacidade" onClick={() => setOpen(false)}>Privacidade e LGPD</Link>
          <Link href="/termos" onClick={() => setOpen(false)}>Termos de Uso</Link>
        </div>
      </aside>}

      <nav className="mobile-bottom-nav" aria-label="Atalhos principais">
        <Link href="/" className={pathname === "/" ? "active" : ""}><span aria-hidden="true">⌂</span><b>Início</b></Link>
        <Link href="/comecar/" className={pathname.startsWith("/comecar") ? "active" : ""}><span aria-hidden="true">①</span><b>Começar</b></Link>
        <Link href="/destinos/" className={pathname.startsWith("/destinos") ? "active" : ""}><span aria-hidden="true">◈</span><b>Destinos</b></Link>
        <Link href="/diario/" className={pathname.startsWith("/diario") ? "active" : ""}><span aria-hidden="true">✎</span><b>Diário</b></Link>
        <button type="button" className={open ? "active" : ""} onClick={() => setOpen((current) => !current)} aria-expanded={open}>
          <span aria-hidden="true">☰</span><b>Menu</b>
        </button>
      </nav>
    </>
  );
}
