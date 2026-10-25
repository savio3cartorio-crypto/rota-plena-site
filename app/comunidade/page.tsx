import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";

export const metadata: Metadata = {
  title: "Comunidade",
  description: "Como contribuir com o Rota Plena: atualizar locais, enviar diários e fazer perguntas com responsabilidade.",
};

export default function ComunidadePage() {
  return <PortalPage><section className="portal-page-hero community-hero"><div><p className="eyebrow">COMUNIDADE ROTA PLENA</p><h1>Informação ganha valor quando vira cuidado com o outro.</h1><p>Um espaço para trocar experiências, atualizar locais, contar histórias e construir confiança sem transformar opinião em verdade absoluta.</p></div></section><section className="portal-inner community-page-grid"><article><span>⌖</span><h2>Atualize um local</h2><p>Informe condições observadas, data da visita, estrutura e mudanças importantes.</p><a href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20atualiza%C3%A7%C3%A3o%20de%20local">Contribuir com o mapa →</a></article><article><span>▤</span><h2>Envie um diário</h2><p>Compartilhe uma experiência completa; ela será lida e, com sua autorização, publicada.</p><a href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20meu%20di%C3%A1rio">Enviar um diário →</a></article><article><span>?</span><h2>Faça uma pergunta</h2><p>Escreva com respeito e receba respostas baseadas em experiências reais.</p><a href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20pergunta">Enviar uma pergunta →</a></article></section><section className="community-principles"><div><p className="eyebrow">NOSSO ACORDO</p><h2>Confiança se constrói com transparência.</h2></div><ul><li>Identifique publicidade, parceria e interesse comercial.</li><li>Informe a data e as condições da experiência relatada.</li><li>Respeite pessoas, propriedades, regras locais e natureza.</li><li>Não exponha dados pessoais ou imagens sem autorização.</li></ul></section></PortalPage>;
}

