import type { Metadata } from "next";
import ValeCityDirectory from "../../components/ValeCityDirectory";
import { PortalPage } from "../../components/PortalChrome";
import { sulMinasCities } from "../../data/sul-minas-cities";

export const metadata: Metadata = {
  title: "Sul de Minas conectado ao Vale do Paraíba",
  description: "Guia territorial do Sul de Minas próximo à divisa com São Paulo: Mantiqueira, Serras Verdes, Terras Altas e Circuito das Águas.",
};

export default function SulDeMinasPage() {
  return <PortalPage className="vale-page sul-minas-page">
    <header className="vale-hero sul-minas-hero">
      <div>
        <p className="eyebrow">GUIA TERRITORIAL ROTA PLENA</p>
        <h1>Sul de Minas,<br />conectado ao Vale.</h1>
        <p>Uma travessia entre a Serra da Mantiqueira, a divisa paulista, as águas minerais e as pequenas cidades: natureza, cultura, sabores e apoio pensados para quem viaja sobre rodas.</p>
      </div>
      <aside>
        <span><b>{sulMinasCities.length}</b> cidades prioritárias</span>
        <span><b>4</b> territórios de viagem</span>
        <span><b>5</b> dimensões por cidade</span>
      </aside>
    </header>

    <section className="sul-minas-connections">
      <article><small>PELO VALE DO PARAÍBA</small><b>Taubaté → Campos do Jordão → Piranguçu → Itajubá</b><p>Ligação serrana para veículos compatíveis com curvas, aclives e mudanças rápidas de clima.</p></article>
      <article><small>PELA GARGANTA DO EMBAÚ</small><b>Cruzeiro → Passa Quatro → Circuito das Águas</b><p>História, ferrovia, fontes minerais e bases úteis ao longo da Mantiqueira.</p></article>
      <article><small>PELA FERNÃO DIAS</small><b>São Paulo → Extrema → Cambuí → Serras Verdes</b><p>Corredor com mais serviços para alcançar cachoeiras, campings e cidades de altitude.</p></article>
    </section>

    <section className="vale-method">
      <div><span>01</span><b>Origem identificada</b><p>Curadoria baseada no portal oficial de Minas Gerais, circuitos regionais, órgãos ambientais e base Rota Plena.</p></div>
      <div><span>02</span><b>Leitura para RV</b><p>O guia destaca serra, estrada rural, reserva, conectividade, abastecimento e limites de acesso.</p></div>
      <div><span>03</span><b>Sem promessa indevida</b><p>Horário, preço, pernoite e passagem de veículos grandes devem ser confirmados diretamente.</p></div>
    </section>

    <ValeCityDirectory area="sul-minas" />

    <section className="vale-editorial-note">
      <p className="eyebrow dark">A ESTRADA MUDA COM O TEMPO</p>
      <h2>Use a curadoria para decidir. Confirme antes de entrar.</h2>
      <p>No Sul de Minas, chuva, neblina, obra, porteira, evento e estrada de terra podem alterar completamente o acesso. Antes de seguir, confirme funcionamento, regras, tamanho aceito, estacionamento, pernoite e condição do trecho. Para travessias e montanhas, consulte os órgãos responsáveis e profissionais locais.</p>
      <a href="/planejar">Planejar uma rota entre o Vale e Minas →</a>
    </section>
  </PortalPage>;
}
