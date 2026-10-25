import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";

export const metadata: Metadata = {
  title: "Créditos visuais",
  description: "Origem, autoria e condições de uso das imagens do Rota Plena.",
};

const realImages = [
  {
    use: "Estrada e planejamento",
    description: "Rodovia BR-267 em Aiuruoca, Minas Gerais",
    author: "Py4nf",
    license: "Domínio público",
    source: "https://commons.wikimedia.org/wiki/File:Rodovia_br267_aiuruoca.jpg",
  },
  {
    use: "Território e manifesto",
    description: "Vista de Tabuleiro, Minas Gerais, próxima à MG-133",
    author: "Py4nf",
    license: "Domínio público",
    source: "https://commons.wikimedia.org/wiki/File:Tabuleiro_mg.jpg",
  },
  {
    use: "Camping e pernoite",
    description: "Camping com veículos, barracas e montanha",
    author: "Lex Sirikiat",
    license: "CC0 1.0 — dedicação ao domínio público",
    source: "https://commons.wikimedia.org/wiki/File:Campground_with_cars_and_tents_(Unsplash).jpg",
  },
];

const createdImages = [
  ["Car camping", "Capa do guia e destaques editoriais"],
  ["Preparação", "Aprenda, ferramentas e documentos offline"],
  ["Comunidade e diário", "Convivência, memória e vida sobre rodas"],
  ["Viagem com pets", "Transporte responsável e bem-estar animal"],
];

export default function VisualCreditsPage() {
  return <PortalPage>
    <article className="legal-page visual-credits-page">
      <header><p className="eyebrow dark">TRANSPARÊNCIA EDITORIAL</p><h1>Créditos visuais</h1><p>Origem, licença e finalidade das imagens utilizadas pelo Rota Plena.</p></header>
      <section>
        <h2>Nossa política de imagens</h2>
        <p>Fotografias reais são utilizadas somente quando a origem e a licença podem ser registradas. Evitamos pessoas identificáveis, placas legíveis e marcas em destaque. Quando uma cena editorial não pode ser obtida com segurança jurídica e coerência visual, criamos uma imagem específica para o portal.</p>
      </section>
      <section>
        <h2>Fotografias reais</h2>
        <div className="visual-credit-grid">{realImages.map((image) => <article key={image.source}><small>{image.use}</small><h3>{image.description}</h3><p>Autor: {image.author}<br />Licença: {image.license}</p><a href={image.source} target="_blank" rel="noreferrer">Consultar arquivo e licença →</a></article>)}</div>
      </section>
      <section>
        <h2>Imagens criadas para o Rota Plena</h2>
        <p>As cenas abaixo foram geradas com inteligência artificial sob direção editorial do Rota Plena. Não representam um lugar, pessoa, empresa ou veículo específico e não devem ser interpretadas como registro geográfico ou recomendação de equipamento.</p>
        <div className="visual-credit-grid generated">{createdImages.map(([title, use]) => <article key={title}><small>IMAGEM AUTORAL ASSISTIDA POR IA</small><h3>{title}</h3><p>{use}</p></article>)}</div>
      </section>
      <section>
        <h2>Imagens da comunidade</h2>
        <p>Fotos enviadas por leitores só são publicadas com autorização expressa do autor. O Rota Plena não reutiliza uma imagem fora da finalidade autorizada e pode solicitar comprovação de autoria ou consentimento.</p>
      </section>
    </article>
  </PortalPage>;
}
