import Link from "next/link";
import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";

export const metadata: Metadata = {
  title: "Como usar o mapa | Rota Plena",
  description: "Guia simples e visual para pesquisar cidades, aplicar filtros, interpretar pontos e planejar viagens com o mapa Rota Plena.",
};

const steps = [
  { number: "01", icon: "⌕", title: "Busque uma localidade", text: "Digite uma cidade, bairro, estado ou o nome de um estabelecimento. Para começar, prefira uma busca simples, como “Taubaté” ou “Caraguatatuba”." },
  { number: "02", icon: "☰", title: "Abra os filtros", text: "No celular, toque em “Filtros do mapa”. No computador, as opções já aparecem ao lado esquerdo do mapa." },
  { number: "03", icon: "◉", title: "Escolha uma experiência", text: "Veja todos os pontos ou concentre a busca em camping e RV, natureza, aventura, cultura, gastronomia ou apoio e serviços." },
  { number: "04", icon: "⌖", title: "Toque em um ponto", text: "Selecione um marcador no mapa ou um resultado da lista para abrir a ficha resumida do local." },
  { number: "05", icon: "✓", title: "Leia a ficha com atenção", text: "Confira localização, observações, estrutura informada, aviso de coordenada aproximada e fonte de referência, quando disponível." },
  { number: "06", icon: "↝", title: "Confirme antes de seguir", text: "Abra a rota, verifique acesso, horário, preço, regras, clima e disponibilidade diretamente com o local. O mapa orienta; a confirmação protege." },
];

const categories = [
  { className: "camp", label: "Camping e RV", text: "Campings, estruturas para motorhome, trailer e apoio de pernoite." },
  { className: "nature", label: "Natureza", text: "Parques, cachoeiras, mirantes, praias e paisagens naturais." },
  { className: "adventure", label: "Trilhas e aventura", text: "Montanhas, trilhas, escalada, cicloturismo e atividades ao ar livre." },
  { className: "culture", label: "Cultura e história", text: "Museus, patrimônio, igrejas, memória ferroviária e atrações culturais." },
  { className: "food", label: "Gastronomia", text: "Restaurantes, cafés, vinícolas, cervejarias, alambiques e sabores locais." },
  { className: "service", label: "Apoio e serviços", text: "Postos, oficinas, estacionamentos, guias e infraestrutura de viagem." },
];

export default function MapGuidePage() {
  return <PortalPage className="map-guide-page">
    <section className="map-guide-hero">
      <div>
        <p className="eyebrow">GUIA DO MAPA ROTA PLENA</p>
        <h1>Encontre o que precisa.<br /><em>Entenda antes de seguir.</em></h1>
        <p>O mapa reúne pontos de apoio, pernoite, natureza, cultura, alimentação e serviços. Este guia mostra como pesquisar, interpretar e transformar informação em uma decisão mais segura.</p>
        <nav><Link className="button button-primary" href="#passo-a-passo">Aprender em 6 passos →</Link><Link className="button button-ghost" href="/mapa">Abrir o mapa agora</Link></nav>
      </div>
      <aside aria-label="Princípio de uso do mapa">
        <span>⌖</span><small>REGRA DE OURO</small>
        <blockquote>O mapa indica possibilidades. A confirmação atualiza a realidade.</blockquote>
      </aside>
    </section>

    <section className="map-guide-quick-test">
      <div><p className="eyebrow dark">EXPERIMENTE AGORA</p><h2>Qual cidade você quer explorar?</h2><p>Digite somente o nome da cidade. A busca será aberta no mapa e os pontos encontrados serão aproximados automaticamente.</p></div>
      <form action="/mapa"><label htmlFor="guide-city">Cidade, bairro ou local</label><div><span>⌕</span><input id="guide-city" name="busca" placeholder="Ex.: Taubaté, Cunha, Ubatuba..." required /><button type="submit">Buscar no mapa →</button></div></form>
    </section>

    <section className="map-guide-steps" id="passo-a-passo">
      <header><div><p className="eyebrow dark">PASSO A PASSO</p><h2>Do desejo ao ponto certo.</h2></div><p>Você não precisa dominar mapas. Siga esta ordem e use apenas os filtros que realmente ajudam na decisão daquele momento.</p></header>
      <div>{steps.map((step) => <article key={step.number}><span className="map-step-number">{step.number}</span><i aria-hidden="true">{step.icon}</i><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    </section>

    <section className="map-guide-anatomy">
      <div className="map-guide-anatomy-copy">
        <p className="eyebrow">COMO LER UM PONTO</p><h2>A ficha reúne pistas para sua decisão.</h2><p>Ao tocar em um marcador, o mapa abre um cartão. Leia de cima para baixo e não trate a presença de um selo como promessa de funcionamento.</p>
        <ol><li><b>Categoria</b><span>Mostra a finalidade principal do ponto.</span></li><li><b>Nome e localização</b><span>Permitem conferir se é o lugar desejado.</span></li><li><b>Observação</b><span>Resume informações úteis já catalogadas.</span></li><li><b>Selos de estrutura</b><span>Indicam recursos informados, como banheiro, energia ou pet friendly.</span></li><li><b>Avisos e fonte</b><span>Mostram quando a coordenada é aproximada e de onde veio a referência.</span></li></ol>
      </div>
      <div className="map-place-demo" aria-label="Exemplo ilustrativo de ficha de ponto">
        <header><small>CAMPING E RV</small><span>×</span></header><h3>Exemplo de ponto de apoio</h3><p>Centro · SP</p><div className="map-place-demo-note">Exemplo didático: confirme funcionamento, acesso e regras antes da viagem.</div><section><b>✓ Visitado</b><b>Aceita RV</b><b>Pet friendly</b><b>Energia</b><b>Banheiro</b></section><aside>⚠ Coordenada aproximada: confirme o acesso antes de viajar.</aside><footer><span>Abrir rota →</span><span>Ver fonte</span><span>Sugerir correção</span></footer>
      </div>
    </section>

    <section className="map-guide-categories">
      <header><p className="eyebrow dark">CORES E CATEGORIAS</p><h2>Use a cor como atalho, não como conclusão.</h2><p>Os marcadores ajudam a reconhecer o tipo de experiência. Abra a ficha para entender o ponto de verdade.</p></header>
      <div>{categories.map((item) => <article key={item.label}><span className={`guide-pin ${item.className}`}><i /></span><div><h3>{item.label}</h3><p>{item.text}</p></div></article>)}</div>
    </section>

    <section className="map-guide-mobile">
      <div><p className="eyebrow">NO CELULAR</p><h2>Três gestos resolvem quase tudo.</h2><p>A experiência foi organizada para uso na estrada: busca grande, filtros recolhidos e ficha do ponto sobre o mapa.</p></div>
      <div className="phone-map-flow"><article><span>1</span><i>⌕</i><b>Digite a cidade</b><small>Comece com poucas palavras.</small></article><article><span>2</span><i>☰</i><b>Abra os filtros</b><small>Escolha uma categoria por vez.</small></article><article><span>3</span><i>⌖</i><b>Toque no marcador</b><small>Leia a ficha e abra a rota.</small></article></div>
    </section>

    <section className="map-guide-problems">
      <header><p className="eyebrow dark">SE NÃO APARECER NADA</p><h2>O ponto pode existir, mas a busca estar específica demais.</h2></header>
      <div><article><span>01</span><h3>Retire “Centro” e complementos</h3><p>Em vez de “Bertioga Centro”, tente apenas “Bertioga”.</p></article><article><span>02</span><h3>Remova um filtro</h3><p>Volte para “Todos os pontos” e veja a base completa da cidade.</p></article><article><span>03</span><h3>Procure a cidade próxima</h3><p>Alguns locais usam o município ou distrito vizinho no endereço.</p></article><article><span>04</span><h3>Conte para a comunidade</h3><p>Se souber de um local ausente, envie uma sugestão para ampliar o mapa.</p></article></div>
    </section>

    <section className="map-guide-safety">
      <div><p className="eyebrow">ANTES DE VIAJAR</p><h2>Faça a confirmação de cinco minutos.</h2></div>
      <ul><li><span>✓</span>O local está aberto na data da viagem?</li><li><span>✓</span>O acesso comporta seu veículo e as condições do tempo?</li><li><span>✓</span>O pernoite é permitido e precisa de reserva?</li><li><span>✓</span>Água, energia, banheiro e descarte estão realmente disponíveis?</li><li><span>✓</span>Preço, horários, regras para pets e contato foram confirmados?</li></ul>
    </section>

    <section className="map-guide-community">
      <div><p className="eyebrow">MAPA COLABORATIVO</p><h2>Quem confirma uma informação abre caminho para todos.</h2><p>Encontrou um ponto novo, uma coordenada incorreta ou uma estrutura que mudou? Compartilhe a atualização. A qualidade do mapa cresce com relatos claros, recentes e responsáveis.</p></div>
      <nav><Link className="button button-primary" href="mailto:admin@rotaplena.com.br?subject=Rota%20Plena%20-%20sugest%C3%A3o%20de%20atualiza%C3%A7%C3%A3o">Sugerir uma atualização →</Link><Link className="button button-ghost" href="/mapa">Explorar o mapa</Link></nav>
    </section>
  </PortalPage>;
}
