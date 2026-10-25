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
  return <aside className="cookie-notice" aria-label="Preferências de privacidade"><div><p>Sem cookies de rastreamento: o navegador guarda só suas preferências neste aparelho. <Link href="/privacidade/">Saiba mais</Link></p></div><div><button className="accept" onClick={() => choose("essential")}>Entendi</button></div></aside>;
}
