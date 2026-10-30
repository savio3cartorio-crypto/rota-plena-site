// Organização editorial do Rota Plena.
// Crônicas e relatos pessoais vão para o "Diário de estrada"; o restante são guias práticos de "Comece aqui".
export const cronicaSlugs = [
  "liberdade-o-caminho-de-volta-para-nos-mesmos",
  "a-estrada-que-eu-queria-mostrar-a-clara",
  "viajar-depois-dos-50-a-vida-nao-precisa-esperar",
  "mudar-de-paisagem-mudar-por-dentro",
  "nao-era-longe-era-fora-do-automatico",
  "so-vai",
  "a-estrada-e-o-destino",
  "estrada-nao-e-fuga",
  "viajar-devagar",
];

// Guias da porta de entrada: começar com o carro que já tem.
export const primeirosPassosSlugs = [
  "car-camping-liberdade-porta-malas",
  "escolher-pernoite-seguro",
  "documentos-e-copias-offline",
  "viajar-com-pets",
  "estacao-energia-placas-solares-caravanismo",
  "primeira-viagem-motorhome",
];

export const isCronica = (slug: string) => cronicaSlugs.includes(slug);
