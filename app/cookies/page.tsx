import type { Metadata } from "next";
import { PortalPage } from "../components/PortalChrome";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "O que o Rota Plena guarda no seu navegador e como apagar.",
};

export default function CookiesPage() {
  return <PortalPage><article className="legal-page"><header><p className="eyebrow dark">TRANSPARÊNCIA</p><h1>Política de Cookies e Armazenamento Local</h1><p>Última atualização: 25 de outubro de 2026.</p></header><section><h2>O que usamos</h2><p>O Rota Plena não usa cookies de rastreamento, publicidade nem métricas de audiência. O navegador guarda apenas, no seu próprio aparelho, a confirmação deste aviso, o andamento do checklist de saída e pesquisas recentes do planejador, para evitar consultas repetidas aos serviços de mapas.</p></section><section><h2>Serviços de terceiros</h2><p>Ao abrir o mapa, o planejador ou a previsão do tempo, o navegador conecta-se a serviços externos (OpenStreetMap, Nominatim, OSRM e serviço meteorológico público), e as fontes tipográficas são carregadas do Google Fonts. Esses serviços seguem as próprias políticas.</p></section><section><h2>Se no futuro houver métricas</h2><p>Qualquer métrica de audiência ou recurso opcional será identificado aqui e dependerá da sua escolha. Recusar não impedirá o acesso ao mapa, ao conteúdo nem às ferramentas.</p></section><section><h2>Como apagar</h2><p>Você pode apagar os dados do site nas configurações do navegador. Isso limpará o checklist e fará o aviso de privacidade reaparecer.</p></section><section><h2>Referência</h2><p>Consulte o <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais" target="_blank" rel="noreferrer">Guia Orientativo sobre Cookies da ANPD</a>.</p></section></article></PortalPage>;
}
