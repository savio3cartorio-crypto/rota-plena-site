import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";
import { getSiteContent } from "../../db/cms";
import { CONTACT_EMAIL, mailto } from "../site-config";

export const metadata: Metadata = {
  title: "Sobre o Rota Plena e contato",
  description: "Quem faz o Rota Plena, por que ele existe, como receber os novos relatos por e-mail e como mandar a sua história de estrada.",
};


export default async function SobrePage() {
  const content = await getSiteContent("sobre", {
    title: "Sobre o Rota Plena",
    body: "Queremos ajudar quem sonha, quem está começando e quem já vive o caravanismo a aprender, planejar, compartilhar e desenvolver sua autonomia.\n\nPor isso, o portal integra educação, preparação, manutenção, segurança, diretório qualificado, ferramentas pessoais e experiências reais.\n\nO projeto é conduzido por Sávio Antonio Americano, em Taubaté, São Paulo.",
  });
  return <PortalPage>
    <section className="portal-page-hero about-hero"><div><p className="eyebrow">QUEM FAZ O ROTA PLENA</p><h1>Um guia feito por uma pessoa que foi antes e conta como foi.</h1><p>Eu sou Sávio Antonio Americano, de Taubaté (SP). Criei o Rota Plena para mostrar que a estrada pode começar perto, com o carro que a gente já tem, e para dividir o que aprendo em cada saída.</p></div></section>
    <section className="portal-inner about-story"><div><p className="eyebrow dark">NOSSO PROPÓSITO</p><h2>{content.title}</h2></div><div>{content.body.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    <section id="manifesto" className="about-manifesto">
      <div className="portal-inner">
        <header><p className="eyebrow">MANIFESTO ROTA PLENA</p><h2>O site é a nossa casa.<br />A estrada é a nossa razão.</h2></header>
        <div className="about-manifesto-body">
          <p className="manifesto-opening">Vivemos em um tempo em que muita informação aparece, chama atenção por alguns segundos e logo desaparece. Para quem viaja sobre rodas, porém, uma boa referência não pode depender do acaso de encontrá-la no feed.</p>
          <p>Uma informação sobre acesso, segurança, pernoite, abastecimento, manutenção ou estrutura pode transformar uma decisão e, em certos momentos, proteger uma família inteira. Por isso, o Rota Plena escolhe construir um portal: um lugar em que o conhecimento possa permanecer, ser localizado, compreendido, atualizado e compartilhado.</p>
          <p>As redes sociais podem ser pontes para novos encontros, mas não serão o centro do projeto. O centro é este espaço, onde quem está começando encontra guias práticos, lugares visitados de verdade, roteiros percorridos e relatos de estrada. Aqui, uma experiência não termina quando deixa de aparecer na tela: ela pode se tornar referência para a próxima pessoa que passar pelo mesmo caminho.</p>
          <blockquote>O Rota Plena não foi criado para vender atenção. Foi criado para organizar conhecimento, fortalecer a comunidade e tornar a vida sobre rodas mais segura, consciente e plena.</blockquote>
          <p>Não temos interesse em transformar o portal em uma sequência de anúncios. Propagandas em excesso interrompem a leitura, confundem recomendação com interesse comercial e desviam o foco do que realmente importa. Se algum dia houver parceria, apoio ou conteúdo patrocinado, isso será claramente identificado, sem comprar opinião editorial, limitar informação essencial ou interferir na liberdade de escolha do viajante.</p>
          <p>Queremos uma comunidade construída com experiências reais e responsabilidade. Cada ponto registrado, rota compartilhada, correção enviada ou página de diário pode ajudar alguém a planejar melhor, evitar um risco, descobrir um lugar ou simplesmente viajar com mais tranquilidade.</p>
          <p className="manifesto-close">Porque liberdade não é viajar sem referência. É poder escolher o próprio caminho com conhecimento, segurança e confiança.</p>
        </div>
        <footer><span>Rota Plena</span><strong>Conhecimento, liberdade e vida sobre rodas.</strong></footer>
      </div>
    </section>
    <section id="principios" className="about-principles"><div className="portal-inner"><p className="eyebrow">PRINCÍPIOS EDITORIAIS</p><div><article><b>01</b><h3>Utilidade antes do ruído</h3><p>Conteúdo claro, aplicável, pesquisável e atualizado.</p></article><article><b>02</b><h3>Independência sem poluição</h3><p>Sem anúncios disputando atenção. Parcerias eventuais serão sempre identificadas.</p></article><article><b>03</b><h3>Segurança é essencial</h3><p>Informação crítica permanece acessível e será tratada com responsabilidade.</p></article><article><b>04</b><h3>Liberdade responsável</h3><p>Respeito à comunidade, às regras, às pessoas e à natureza.</p></article></div></div></section>
    <section id="newsletter" className="rp-section deep"><div className="rp-newsletter"><div><p className="eyebrow">RECEBA POR E-MAIL</p><h2>Um relato, um lugar visitado e uma dica, a cada quinze dias.</h2><p>Sem propaganda e sem pressa. Para entrar na lista, mande um e-mail com o assunto “Quero receber”. Para sair, é só responder pedindo.</p></div><nav><a className="button button-primary" href={mailto("Quero receber")}>Quero receber →</a><small>Seu e-mail é usado só para enviar o Rota Plena. Veja a Política de Privacidade.</small></nav></div></section>
    <section id="historia" className="rp-section"><div className="portal-section-head"><div><p className="eyebrow dark">MANDE SUA HISTÓRIA</p><h2>Sua primeira viagem pode ajudar a de outra pessoa.</h2><p>Conte uma viagem, um lugar que merece visita ou uma correção. Nada é publicado sem a sua autorização.</p></div></div><div className="rp-cards"><a className="rp-card" href={mailto("minha história de estrada")}><small>Relato</small><h3>Contar uma viagem</h3><p>Como foi, onde dormiu, quanto gastou e o que aprendeu.</p><b>Escrever →</b></a><a className="rp-card" href={mailto("sugestão de lugar")}><small>Lugar</small><h3>Sugerir um lugar</h3><p>Camping, mirante, cachoeira ou parada que vale a visita.</p><b>Sugerir →</b></a><a className="rp-card" href={mailto("correção")}><small>Correção</small><h3>Avisar uma mudança</h3><p>Preço, acesso ou regra que mudou desde a minha visita.</p><b>Avisar →</b></a></div></section>
    <section id="contato" className="portal-inner privacy-block"><h2>Contato</h2><p>Para qualquer assunto: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p><div className="legal-links"><a href="/privacidade/">Política de Privacidade e LGPD</a><a href="/termos/">Termos de Uso</a><a href="/cookies/">Política de Cookies</a></div></section>
  </PortalPage>;
}
