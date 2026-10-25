import type { Metadata } from "next";
import Link from "next/link";
import { PortalPage } from "../components/PortalChrome";
import { mailto } from "../site-config";

export const metadata: Metadata = {
  title: "Destinos perto de casa",
  description: "Vale do Paraíba, Serra da Mantiqueira e Litoral Norte: cidades, lugares visitados e dicas para a primeira viagem sobre rodas perto de São Paulo.",
};

export default function DestinosPage() {
  return <PortalPage>
    <section className="portal-page-hero"><div><p className="eyebrow">DESTINOS</p><h1>Três regiões perto de casa, contadas por quem passa por elas.</h1><p>Serra, mar e cidades históricas a poucas horas de São Paulo e do Vale. Aqui entram cidades e lugares que eu conheço, com data da visita e o que vale saber antes de ir.</p></div></section>

    <section className="rp-section">
      <div className="portal-section-head"><div><p className="eyebrow dark">ESCOLHA POR ONDE COMEÇAR</p><h2>Perto o bastante para voltar no mesmo dia.</h2><p>Começar perto permite testar o carro, a rotina e a barraca sem arriscar uma viagem inteira.</p></div><Link href="/mapa/">Ver os lugares por onde passei →</Link></div>
      <div className="rp-cards">
        <Link className="rp-card" href="/destinos/vale-do-paraiba/"><small>Base do projeto</small><h3>Vale do Paraíba</h3><p>Taubaté e as cidades do Vale: serviços, cultura caipira, igrejas, cachoeiras e as portas de subida para a serra e o mar.</p><b>Abrir o guia do Vale →</b></Link>
        <Link className="rp-card" href="/destinos/sul-de-minas/"><small>Serra e interior</small><h3>Mantiqueira e Sul de Minas</h3><p>Montanha, frio, pequenas cidades e estradas de serra entre São Paulo e Minas Gerais.</p><b>Abrir o guia da serra →</b></Link>
        <div className="rp-card muted"><small>Em preparação</small><h3>Litoral Norte</h3><p>Ubatuba, Caraguatatuba, São Sebastião e Ilhabela. O guia entra no ar depois das próximas saídas de campo.</p><b>Em breve</b></div>
      </div>
    </section>

    <section className="rp-section alt">
      <div className="portal-section-head"><div><p className="eyebrow dark">COMO UM DESTINO ENTRA AQUI</p><h2>Primeiro a estrada, depois a página.</h2></div></div>
      <div className="rp-steps">
        <article><h3>1. Eu vou</h3><p>Visito a cidade, durmo, acampo ou paro onde indico. Sem visita, o lugar não entra.</p></article>
        <article><h3>2. Conto com data</h3><p>Cada lugar ganha o selo “eu fui”, a data da visita, fotos próprias e o que eu faria diferente.</p></article>
        <article><h3>3. Atualizo</h3><p>Preços, acessos e regras mudam. Quando volto ou recebo um aviso confiável, a página é revisada.</p></article>
      </div>
    </section>

    <section className="rp-section">
      <p className="rp-quote">Conhece um lugar que merece estar aqui?</p>
      <p className="rp-signature">Mande a sugestão. Se fizer sentido, ele entra no roteiro da próxima saída de campo. <a href={mailto("sugestão de destino")}>Sugerir um destino →</a></p>
    </section>
  </PortalPage>;
}
