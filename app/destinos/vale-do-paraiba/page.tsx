import type { Metadata } from "next";
import ValeCityDirectory from "../../components/ValeCityDirectory";
import { PortalPage } from "../../components/PortalChrome";
import { valeCities } from "../../data/vale-cities";

export const metadata: Metadata = {
  title: "Guia do Vale do Paraíba",
  description: "Cidades do Vale do Paraíba com turismo, natureza, gastronomia, apoio ao caravanista, serviços e festas tradicionais.",
};

export default function ValeDoParaibaPage() {
  return <PortalPage className="vale-page">
    <header className="vale-hero">
      <div>
        <p className="eyebrow">GUIA TERRITORIAL ROTA PLENA</p>
        <h1>Vale do Paraíba,<br />cidade por cidade.</h1>
        <p>Uma leitura prática para combinar estrada, cultura, natureza, sabores e apoio. Cada guia conecta curadoria editorial, fontes públicas e os pontos já presentes no mapa.</p>
      </div>
      <aside>
        <span><b>{valeCities.length}</b> cidades com pontos no mapa</span>
        <span><b>5</b> territórios de experiência</span>
        <span><b>6</b> camadas úteis para decidir a parada</span>
      </aside>
    </header>

    <section className="vale-method">
      <div><span>01</span><b>Informação com origem</b><p>Fontes oficiais, portais de turismo e canais dos próprios estabelecimentos quando disponíveis.</p></div>
      <div><span>02</span><b>Preço sem rótulo injusto</b><p>O portal descreve o perfil da experiência e só exibe faixa de preço quando houver referência pública e datada.</p></div>
      <div><span>03</span><b>Atualização viva</b><p>A comunidade pode sugerir correções; a publicação depende de revisão e preserva a data da consulta.</p></div>
    </section>

    <ValeCityDirectory />

    <section className="vale-editorial-note">
      <p className="eyebrow dark">COMO USAR ESTE GUIA</p>
      <h2>Escolha a cidade. Depois confirme a viagem real.</h2>
      <p>O Rota Plena ajuda a reduzir incertezas, mas não transforma informação histórica em garantia atual. Antes de sair, confirme funcionamento, preço, condição da estrada, tamanho aceito, estacionamento, autorização de pernoite e regras ambientais. Em festas e feriados, planeje uma segunda opção.</p>
      <a href="/planejar">Montar uma Rota Plena →</a>
    </section>
  </PortalPage>;
}
