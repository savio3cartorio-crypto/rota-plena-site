"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!window.localStorage.getItem("rota-plena-cookie-choice")) window.setTimeout(() => setVisible(true), 0);
  }, []);
  if (!visible) return null;
  function choose(value: "essential") {
    window.localStorage.setItem("rota-plena-cookie-choice", value);
    setVisible(false);
  }
  return <aside className="cookie-notice" aria-label="Preferências de privacidade"><div><b>Sua privacidade no caminho</b><p>O Rota Plena não usa cookies de rastreamento. O navegador guarda apenas, no seu aparelho, este aviso, o checklist e pesquisas recentes do planejador.</p><Link href="/privacidade">Política de Privacidade</Link></div><div><button className="accept" onClick={() => choose("essential")}>Entendi</button></div></aside>;
}
