import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";
import { getSiteContent } from "../../db/cms";

export const metadata: Metadata = {
  title: "Sobre o Rota Plena",
  description: "Por que o Rota Plena existe: conhecimento, liberdade e vida sobre rodas, a partir de Taubaté, São Paulo.",
};


export default async function SobrePage() {
  const content = await getSiteContent("sobre", {
    title: "Sobre o Rota Plena",
    body: "Queremos ajudar quem sonha, quem está começando e quem já vive o caravanismo a aprender, planejar, compartilhar e desenvolver sua autonomia.\n\nPor isso, o portal integra educação, preparação, manutenção, segurança, diretório qualificado, ferramentas pessoais e experiências reais.\n\nO projeto é conduzido por Sávio Antonio Americano, em Taubaté, São Paulo.",
  });
  return <PortalPage>
    <section className="portal-page-hero about-hero"><div><p className="eyebrow">POR QUE O ROTA PLENA EXISTE</p><h1>Caravanismo é liberdade. Informação é o que torna essa liberdade possível.</h1><p>O Rota Plena nasceu para reunir conhecimento confiável, ferramentas práticas, histórias e uma comunidade brasileira comprometida com a vida sobre rodas.</p></div></section>
    <section className="portal-inner about-story"><div><p className="eyebrow dark">NOSSO PROPÓSITO</p><h2>{content.title}</h2></div><div>{content.body.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    <section id="manifesto" className="about-manifesto">
      <div className="portal-inner">
        <header><p className="eyebrow">MANIFESTO ROTA PLENA</p><h2>O site é a nossa casa.<br />A estrada é a nossa razão.</h2></header>
        <div className="about-manifesto-body">
          <p className="manifesto-opening">Vivemos em um tempo em que muita informação aparece, chama atenção por alguns segundos e logo desaparece. Para quem viaja sobre rodas, porém, uma boa referência não pode depender do acaso de encontrá-la no feed.</p>
          <p>Uma informação sobre acesso, segurança, pernoite, abastecimento, manutenção ou estrutura pode transformar uma decisão e, em certos momentos, proteger uma família inteira. Por isso, o Rota Plena escolhe construir um portal: um lugar em que o conhecimento possa permanecer, ser localizado, compreendido, atualizado e compartilhado.</p>
          <p>As redes sociais podem ser pontes para novos encontros, mas não serão o centro do projeto. O centro é este espaço comum, onde cada caravanista pode pesquisar pontos de interesse, criar rotas, registrar descobertas, contribuir com informações e guardar seu diário de bordo. Aqui, uma experiência não termina quando deixa de aparecer na tela: ela pode se tornar referência para a próxima pessoa que passar pelo mesmo caminho.</p>
          <blockquote>O Rota Plena não foi criado para vender atenção. Foi criado para organizar conhecimento, fortalecer a comunidade e tornar a vida sobre rodas mais segura, consciente e plena.</blockquote>
          <p>Não temos interesse em transformar o portal em uma sequência de anúncios. Propagandas em excesso interrompem a leitura, confundem recomendação com interesse comercial e desviam o foco do que realmente importa. Se algum dia houver parceria, apoio ou conteúdo patrocinado, isso será claramente identificado, sem comprar opinião editorial, limitar informação essencial ou interferir na liberdade de escolha do viajante.</p>
          <p>Queremos uma comunidade construída com experiências reais e responsabilidade. Cada ponto registrado, rota compartilhada, correção enviada ou página de diário pode ajudar alguém a planejar melhor, evitar um risco, descobrir um lugar ou simplesmente viajar com mais tranquilidade.</p>
          <p className="manifesto-close">Porque liberdade não é viajar sem referência. É poder escolher o próprio caminho com conhecimento, segurança e confiança.</p>
        </div>
        <footer><span>Rota Plena</span><strong>Conhecimento, liberdade e vida sobre rodas.</strong></footer>
      </div>
    </section>
    <section id="principios" className="about-principles"><div className="portal-inner"><p className="eyebrow">PRINCÍPIOS EDITORIAIS</p><div><article><b>01</b><h3>Utilidade antes do ruído</h3><p>Conteúdo claro, aplicável, pesquisável e atualizado.</p></article><article><b>02</b><h3>Independência sem poluição</h3><p>Sem anúncios disputando atenção. Parcerias eventuais serão sempre identificadas.</p></article><article><b>03</b><h3>Segurança é essencial</h3><p>Informação crítica permanece acessível e será tratada com responsabilidade.</p></article><article><b>04</b><h3>Liberdade responsável</h3><p>Respeito à comunidade, às regras, às pessoas e à natureza.</p></article></div></div></section>
    <section id="privacidade" className="portal-inner privacy-block"><h2>Privacidade e comunidade</h2><p>Diários, fotos e vídeos respeitam a visibilidade escolhida pelo usuário: privado, comunidade ou público. O envio de mídia exige confirmação de autorização e respeito às pessoas identificáveis.</p><div className="legal-links"><a href="/privacidade">Política de Privacidade e LGPD</a><a href="/termos">Termos de Uso</a><a href="/cookies">Política de Cookies</a><a href="mailto:admin@rotaplena.com.br">admin@rotaplena.com.br</a></div></section>
  </PortalPage>;
}
