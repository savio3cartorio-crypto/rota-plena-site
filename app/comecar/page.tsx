import Link from "next/link";
import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";
import { getPublishedArticles } from "../../db/cms";
import { cronicaSlugs, primeirosPassosSlugs } from "../data/editorial";

export const metadata: Metadata = {
  title: "Comece aqui: sua primeira viagem sobre rodas",
  description: "Como fazer a primeira viagem de car camping com o carro que você já tem: plano em sete passos, o mínimo necessário e guias práticos.",
};

const essentials = [
  ["Dormir", "Colchonete ou solução que você já tenha, roupa de cama adequada e teste prévio de espaço."],
  ["Ventilar", "Telas, abertura segura das janelas e atenção absoluta à renovação do ar. Nunca durma com o motor ligado."],
  ["Hidratar", "Água para beber, cozinhar e higiene, com uma reserva compatível com o tempo fora."],
  ["Organizar", "Tudo preso e acomodado. Em uma freada, objeto solto pode se tornar um risco grave."],
  ["Comunicar", "Avise alguém sobre o plano, leve o celular carregado e salve contatos e endereços essenciais."],
  ["Alternativa", "Tenha um plano B de pernoite e dinheiro reservado para retornar ou buscar hospedagem."],
];

export default async function StartPage() {
  const articles = await getPublishedArticles();
  const primeiros = primeirosPassosSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter((article) => article !== undefined);
  const motorhome = articles.filter((article) => !cronicaSlugs.includes(article.slug) && !primeirosPassosSlugs.includes(article.slug)).sort((a, b) => (a.series?.order ?? 99) - (b.series?.order ?? 99));
  return <PortalPage className="start-page">
    <section className="start-hero">
      <div><p className="eyebrow">COMECE SEM PRESSA</p><h1>A primeira viagem não precisa provar nada.</h1><p>Ela só precisa ser curta, segura e suficiente para você descobrir como se sente dormindo, cozinhando e vivendo por algumas horas com o carro como apoio.</p><nav><Link className="button button-primary" href="#plano">Ver o plano simples →</Link><Link className="button button-ghost" href="/blog/car-camping-liberdade-porta-malas">Entender o car camping</Link></nav></div>
      <aside><small>PRINCÍPIO DA PRIMEIRA FASE</small><blockquote>“Não compre para imaginar. Experimente para descobrir do que realmente precisa.”</blockquote></aside>
    </section>

    <section className="start-reality-check">
      <header><p className="eyebrow dark">ANTES DE SAIR</p><h2>Começar pequeno é uma decisão inteligente.</h2></header>
      <div><article><b>Até 150 km</b><span>Prefira um destino próximo, conhecido e com retorno fácil.</span></article><article><b>Uma noite</b><span>O bastante para testar conforto, rotina e organização.</span></article><article><b>Local confirmado</b><span>Camping ou apoio autorizado, contatado antes da viagem.</span></article><article><b>Sem dívida</b><span>Use o que possui e mantenha uma reserva para imprevistos.</span></article></div>
    </section>

    <section className="start-plan" id="plano">
      <header><p className="eyebrow dark">PLANO DE ESTREIA</p><h2>Sete passos para sair do papel.</h2><p>Você pode fazer cada etapa no seu tempo. Se uma delas não estiver segura, adie a viagem — não o sonho.</p></header>
      <ol>
        <li><span>01</span><div><small>EM CASA</small><h3>Meça o carro</h3><p>Rebata os bancos, simule a cama e permaneça deitado por alguns minutos. Verifique altura, comprimento, acesso e pontos de ventilação.</p></div></li>
        <li><span>02</span><div><small>SEM COMPRAS</small><h3>Faça uma noite-teste</h3><p>Durma no carro em garagem ou local privado e seguro. Anote calor, luz, ruído, conforto e tudo o que sentiu falta.</p></div></li>
        <li><span>03</span><div><small>ESCOLHA</small><h3>Defina um destino próximo</h3><p>Prefira estrutura conhecida, estrada simples, sinal de celular e possibilidade de retorno no mesmo dia.</p></div></li>
        <li><span>04</span><div><small>CONFIRMAÇÃO</small><h3>Fale com o pernoite</h3><p>Confirme acesso, horário, banheiro, segurança, regras para pets, energia e valor diretamente com o responsável.</p></div></li>
        <li><span>05</span><div><small>PREPARAÇÃO</small><h3>Revise carro e documentos</h3><p>Pneus, estepe, fluidos, iluminação, combustível, habilitação, documento do veículo e assistência disponível.</p></div></li>
        <li><span>06</span><div><small>PLANO B</small><h3>Proteja a liberdade</h3><p>Leve dinheiro para uma hospedagem ou retorno antecipado. Liberdade também é poder mudar de ideia sem se colocar em risco.</p></div></li>
        <li><span>07</span><div><small>APRENDIZADO</small><h3>Registre a experiência</h3><p>Anote o que usou, o que sobrou e o que faltou. Só depois avalie se algum equipamento realmente merece seu investimento.</p></div></li>
      </ol>
    </section>

    <section className="start-essentials">
      <header><p className="eyebrow">O MÍNIMO RESPONSÁVEL</p><h2>Seis necessidades, não uma lista de compras.</h2></header>
      <div>{essentials.map(([title, copy]) => <article key={title}><span>✓</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>


    <section className="rp-section alt" id="guias">
      <div className="portal-section-head"><div><p className="eyebrow dark">GUIAS PRÁTICOS</p><h2>Primeiros passos com o carro que você já tem.</h2><p>Leia antes da primeira saída. Tudo aqui parte da experiência real, sem lista de compras.</p></div></div>
      <div className="rp-cards">{primeiros.map((article) => <Link className="rp-card" key={article.slug} href={`/blog/${article.slug}/`}><small>{article.category} · {article.reading}</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Ler o guia →</b></Link>)}</div>
    </section>

    <section className="rp-section">
      <div className="portal-section-head"><div><p className="eyebrow dark">QUANDO O SONHO CRESCER</p><h2>Do carro ao motorhome, sem pressa.</h2><p>Uma série para quem já testou a estrada e começa a pensar em um veículo adaptado: escolha, layout, energia, água, custos e a primeira viagem-teste.</p></div></div>
      <div className="rp-cards">{motorhome.map((article) => <Link className="rp-card" key={article.slug} href={`/blog/${article.slug}/`}><small>{article.series ? `Parte ${article.series.order} de ${article.series.total}` : article.category} · {article.reading}</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Ler →</b></Link>)}</div>
    </section>

    <section className="start-territory" id="territorio">
      <div><p className="eyebrow dark">TERRITÓRIO-PILOTO</p><h2>Por que começamos perto de Taubaté?</h2><p>Porque proximidade permite conferir melhor, corrigir mais rápido e transformar informação em experiência real. Vale do Paraíba, Mantiqueira e Litoral Norte formam um laboratório natural diverso, com serra, costa, cidades históricas e serviços acessíveis por viagens curtas.</p></div>
      <aside><Link href="/destinos/vale-do-paraiba/"><b>Vale do Paraíba</b><span>Base, serviços e cultura →</span></Link><Link href="/destinos/sul-de-minas/"><b>Mantiqueira</b><span>Serra, natureza e interior →</span></Link><Link href="/destinos/"><b>Litoral Norte</b><span>Guia em preparação →</span></Link></aside>
    </section>

    <section className="start-next-action">
      <div><p className="eyebrow">SEU PRÓXIMO PASSO</p><h2>Monte uma viagem que caiba no próximo fim de semana.</h2><p>Escolha um destino próximo, confira um local de pernoite e salve o plano. O objetivo não é ir longe: é começar bem.</p></div>
      <nav><Link className="button button-primary" href="/planejar">Planejar primeira rota →</Link><Link className="button button-ghost" href="/ferramentas">Abrir checklist</Link></nav>
    </section>
  </PortalPage>;
}
