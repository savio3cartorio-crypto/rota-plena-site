export type SulMinasRegion = "Mantiqueira–Vale" | "Terras Altas" | "Circuito das Águas" | "Serras Verdes";

export type SulMinasCityGuide = {
  slug: string;
  name: string;
  aliases?: string[];
  region: SulMinasRegion;
  summary: string;
  tourism: string[];
  nature: string[];
  food: string[];
  support: string[];
  festivals: string[];
  sources: { label: string; url: string }[];
};

export const sulMinasVerifiedAt = "31 de julho de 2026";

const minas = (slug: string) => `https://www.minasgerais.com.br/pt/destinos/${slug}`;
const serrasVerdes = "https://serrasverdes.com.br/sobre-o-circuito/";
const aguas = "https://circuitodasaguasmg.com.br/o-circuito/";

export const sulMinasCities: SulMinasCityGuide[] = [
  {
    slug: "delfim-moreira", name: "Delfim Moreira", region: "Mantiqueira–Vale",
    summary: "Portal mineiro diretamente ligado ao Vale do Paraíba, com araucárias, cachoeiras, ferrovia, trutas e estradas rurais de montanha.",
    tourism: ["Antiga Estação e patrimônio ferroviário", "Antiga fábrica CICA e memória do marmelo", "Mirante do Santo Cruzeiro e centro histórico"],
    nature: ["Cachoeiras do Itagyba, do Salto e do Areião", "Matas de araucária e paisagens rurais da Mantiqueira", "Trilhas e acessos serranos que exigem consulta sobre piso e clima"],
    food: ["Trutas e peixes de água doce", "Doces de marmelo e frutas de clima temperado", "Pinhão e cozinha rural de montanha"],
    support: ["Serviços essenciais concentrados no centro", "Confirmar acesso, porteiras e estacionamento nos atrativos rurais", "Abastecer e baixar o mapa antes de estradas com sinal instável"],
    festivals: ["Festa de Nossa Senhora da Soledade — tradicionalmente entre dezembro e janeiro", "Exposição Agropecuária", "Carnaval e calendário comunitário"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("delfim-moreira") }],
  },
  {
    slug: "wenceslau-braz", name: "Wenceslau Braz", region: "Mantiqueira–Vale",
    summary: "Cidade pequena entre Itajubá e a divisa paulista, atravessada por caminhos de romaria e cercada por vales, cachoeiras e memória rural.",
    tourism: ["Centro, igreja matriz e memória ferroviária regional", "Ruínas, fontes e referências da ocupação rural", "Trechos de caminhos de peregrinação rumo a Aparecida"],
    nature: ["Cachoeiras, grutas e trilhas da Serra da Mantiqueira", "Paisagens rurais e mirantes naturais", "Rotas para caminhada, bicicleta e cavalgada"],
    food: ["Quitandas, padarias e refeições simples no centro", "Produtos agrícolas e cozinha caseira", "Estrutura gastronômica pequena: confirme dias e horários"],
    support: ["Comércio essencial em escala municipal", "Planejar combustível e conectividade antes dos bairros rurais", "Veículos longos devem confirmar raio de giro e condição das estradas"],
    festivals: ["Romarias e manifestações ligadas ao Caminho da Fé", "Festas religiosas e cavalgadas", "Aniversário municipal — confirmar programação anual"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("wenceslau-braz") }],
  },
  {
    slug: "marmelopolis", name: "Marmelópolis", region: "Mantiqueira–Vale",
    summary: "Base de montanha próxima aos picos dos Marins e Itaguaré, com cachoeiras, campings e uma identidade ligada ao cultivo do marmelo.",
    tourism: ["Igreja Matriz de Nossa Senhora Aparecida", "Capelas rurais e memória da produção do marmelo", "Pequeno centro com ritmo de cidade serrana"],
    nature: ["Picos dos Marins, Marinzinho e Itaguaré", "Cachoeiras dos Padres, do Mingú e Santa Bárbara", "Travessias e montanhismo somente com logística, clima e equipamento adequados"],
    food: ["Doces e produtos de marmelo", "Cozinha mineira e cafés locais", "Refeições simples; combine alimentação para travessias longas"],
    support: ["Campings já catalogados no mapa Rota Plena", "Pouca estrutura fora do centro: leve água, combustível e plano de comunicação", "Contrate condutor quando a atividade ou o acesso exigir"],
    festivals: ["Festinmar — festival de inverno local", "Festas religiosas das comunidades", "Aniversário municipal e agenda cultural"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("marmelopolis") }],
  },
  {
    slug: "itajuba", name: "Itajubá", region: "Mantiqueira–Vale",
    summary: "Principal base urbana deste corredor, útil para abastecimento, manutenção, saúde e cultura antes de seguir às estradas serranas.",
    tourism: ["Centro histórico, mercado e equipamentos culturais", "Memória de Wenceslau Braz e patrimônio urbano", "Ambiente universitário, científico e tecnológico"],
    nature: ["Reserva Biológica Serra dos Toledos — regras de conservação", "Pedras Aguda e da Princesa", "Parques, rios e roteiros de cicloturismo no entorno"],
    food: ["Rede ampla de restaurantes, mercados e cafés", "Doces, queijos e cozinha sul-mineira", "Boa cidade para recompor despensa antes da serra"],
    support: ["Hospitais, oficinas, autopeças, supermercados e combustível", "Serviços para veículos e conectividade urbana", "Use como base técnica antes de Delfim Moreira, Piranguçu e Brazópolis"],
    festivals: ["Festival de Inverno", "Itajubeer e eventos gastronômicos", "Agenda universitária, cultural e tecnológica"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("itajuba") }],
  },
  {
    slug: "pirangucu", name: "Piranguçu", region: "Mantiqueira–Vale",
    summary: "Município na conexão com Campos do Jordão e São Bento do Sapucaí, conhecido por trilhas, cachoeiras, cavalgadas e cultura rural.",
    tourism: ["Gruta de Nossa Senhora de Lourdes e Igreja Matriz", "Usina de São Bernardo", "Capelas e manifestações religiosas nos bairros rurais"],
    nature: ["Cachoeira São Bernardo", "Pedra e Mirante da Boa Vista", "Represa Vila Maria, Serra do Coelho e rotas de voo livre"],
    food: ["Quitandas, roscas, pinhão e doces caseiros", "Cachaça e produção rural", "Restaurantes e pesqueiros de pequeno porte"],
    support: ["Mirante da Boa Vista já localizado no mapa", "Acessos rurais variam entre asfalto, terra e trechos íngremes", "Confirme entrada, estacionamento e condição para trailers"],
    festivals: ["Festa do Doce", "Festival de Inverno e festas juninas", "Exposição agropecuária, rodeio e Festa de Nossa Senhora Aparecida"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("pirangucu") }],
  },
  {
    slug: "brazopolis", name: "Brazópolis", aliases: ["Brasópolis"], region: "Mantiqueira–Vale",
    summary: "Cidade de montanha e astronomia, com patrimônio do século XIX, observatório e rotas de aventura entre Itajubá e Paraisópolis.",
    tourism: ["Observatório do Pico dos Dias — visitação depende de agenda", "Igreja Matriz de São Caetano e Castelinho", "Patrimônio urbano e artesanato em fibra de bananeira"],
    nature: ["Pedra da Baleia e Mirante Vó Cotinha", "Cicloturismo Caminhos da Mantiqueira", "Cachoeiras, picos e estradas rurais"],
    food: ["Doces, quitandas e produtos rurais", "Restaurantes cotidianos no centro", "Combine alimentação em passeios ao observatório e bairros afastados"],
    support: ["Comércio essencial e combustível no eixo urbano", "Visitas técnicas e astronômicas exigem reserva e confirmação", "Sinal e piso podem variar nos acessos de altitude"],
    festivals: ["Festival de Inverno", "Festa do Doce", "Romaria de Santa Cruz, Semana Santa e Folia de Reis"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("brasopolis") }],
  },
  {
    slug: "maria-da-fe", name: "Maria da Fé", region: "Mantiqueira–Vale",
    summary: "Destino frio da Mantiqueira reconhecido por azeites, oliveiras, artesanato em fibra de bananeira e paisagens rurais.",
    tourism: ["Estação ferroviária e centro cultural", "Ateliês e artesanato em fibra de bananeira", "Experiências de olivicultura mediante agendamento"],
    nature: ["Olivais, estradas rurais e mirantes de altitude", "Paisagens de araucárias e geadas no inverno", "Caminhadas e cicloturismo entre propriedades"],
    food: ["Azeites de oliva da Mantiqueira", "Cafés, queijos, doces e cozinha mineira", "Degustações e visitas a produtores devem ser reservadas"],
    support: ["Campings e apoio RV já presentes no mapa", "Centro com abastecimento e comércio essencial", "No inverno, acompanhe temperatura, neblina e condição da estrada"],
    festivals: ["Festival da Viola", "Programação de inverno e eventos ligados ao azeite", "Folia de Reis, catira e festa do peão"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("maria-da-fe") }],
  },
  {
    slug: "itamonte", name: "Itamonte", region: "Terras Altas",
    summary: "Uma das portas mineiras do Parque Nacional do Itatiaia e da Serra Fina, com forte vocação para montanhismo e natureza.",
    tourism: ["Centro, igreja matriz e patrimônio local", "Bairros rurais no corredor da BR-354", "Experiências de turismo rural e de montanha"],
    nature: ["Acessos à parte alta do Parque Nacional do Itatiaia", "Serra Fina, Brejo da Lapa e vales do Rio Aiuruoca", "Cachoeiras e trilhas: consulte parque, tempo e estrada"],
    food: ["Truta, pinhão, queijos e cozinha de montanha", "Restaurantes de estrada e refeições caseiras", "Planeje alimentação para travessias e áreas remotas"],
    support: ["Diversos campings e apoios RV catalogados", "Base de montanhismo com guias e hospedagens", "BR-354 tem serra, neblina e circulação de caminhões"],
    festivals: ["Eventos de montanha e temporada de inverno", "Exposição agropecuária e festas religiosas", "Calendário municipal — confirmar edição"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("itamonte") }, { label: "ICMBio — Itatiaia", url: "https://www.gov.br/icmbio/pt-br/assuntos/biodiversidade/unidade-de-conservacao/unidades-de-biomas/mata-atlantica/lista-de-ucs/parna-do-itatiaia" }],
  },
  {
    slug: "passa-quatro", name: "Passa Quatro", region: "Terras Altas",
    summary: "Estância hidromineral de casario preservado, fontes, trem turístico e acesso clássico às montanhas da Serra Fina.",
    tourism: ["Maria Fumaça e Estação Ferroviária", "Casario, praças e fontes de água mineral", "Túnel da Mantiqueira e memória da Revolução de 1932"],
    nature: ["Floresta Nacional de Passa Quatro", "Serra Fina e acesso à Toca do Lobo", "Cachoeiras e caminhos rurais"],
    food: ["Cozinha mineira, cafés, doces e queijos", "Restaurantes no centro e na zona rural", "Refeições de apoio para caminhantes e ciclistas"],
    support: ["Campings e apoio RV já mapeados", "Contrate logística responsável para a Serra Fina", "Alta temporada e feriados pedem reserva"],
    festivals: ["Festival de Inverno", "Eventos ferroviários e culturais", "Festas religiosas e calendário municipal"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("passa-quatro") }, { label: "Circuito das Águas", url: aguas }],
  },
  {
    slug: "itanhandu", name: "Itanhandu", region: "Terras Altas",
    summary: "Cidade aos pés da Mantiqueira, entre Passa Quatro e São Lourenço, com trilhas, nascentes e boa posição logística.",
    tourism: ["Centro, praças e patrimônio religioso", "Bairros rurais e vivências de produção local", "Caminhos entre Terras Altas e Circuito das Águas"],
    nature: ["Alto das Posses e nascente do Rio Verde", "Trilhas da Barrocada, Condado e Bom Sucesso", "Serra Fina e Pico dos Três Estados — expedição técnica"],
    food: ["Comida de fogão a lenha e café caipira", "Produtos rurais e cozinha mineira", "Restaurantes urbanos para apoio de rota"],
    support: ["Estrutura urbana intermediária e camping catalogado", "Acessos ao Alto das Posses podem exigir veículo alto", "Nunca trate trilhas longas como passeio sem planejamento"],
    festivals: ["Festas religiosas e rurais", "Cavalgadas e encontros tradicionais", "Agenda municipal — confirmar datas"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("itanhandu") }],
  },
  {
    slug: "pouso-alto", name: "Pouso Alto", region: "Terras Altas",
    summary: "Parada tranquila no eixo da BR-354, com história bandeirante, clima de montanha e acesso a áreas rurais.",
    tourism: ["Igreja Matriz de Nossa Senhora da Conceição", "Centro histórico e memória dos antigos pousos", "Artesanato local"],
    nature: ["Vales e serras no entorno da BR-354", "Cachoeiras e caminhos rurais", "Conexões com Itamonte, São Lourenço e São Sebastião do Rio Verde"],
    food: ["Cozinha caseira, quitandas e produtos locais", "Restaurantes de estrada", "Comércio alimentar concentrado no centro"],
    support: ["Combustível e apoio no corredor rodoviário", "Camping de montanha já catalogado", "Atenção a neblina e trânsito pesado na BR-354"],
    festivals: ["Encenação da Paixão de Cristo", "Festa da padroeira", "Festas rurais e aniversário municipal"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("pouso-alto") }, { label: "Circuito das Águas", url: aguas }],
  },
  {
    slug: "sao-lourenco", name: "São Lourenço", region: "Circuito das Águas",
    summary: "Principal centro turístico do Circuito das Águas, com parque, trem, comércio e estrutura urbana completa para a viagem.",
    tourism: ["Parque das Águas", "Trem das Águas até Soledade de Minas", "Memorial Tancredo Neves, teleférico e Ilha dos Amores"],
    nature: ["Parque, jardins e águas minerais", "Paisagens do vale do Rio Verde", "Passeios rurais e cicloturismo regional"],
    food: ["Rede ampla de restaurantes, cafés e mercados", "Doces, queijos, café e cozinha mineira", "Opções do cotidiano a experiências gastronômicas"],
    support: ["Hospitais, oficinas, supermercados, combustível e turismo receptivo", "Campings e apoios RV já catalogados", "Boa base para reorganizar a rota e reabastecer"],
    festivals: ["Programação de inverno", "Eventos do Trem das Águas e calendário cultural", "Festas religiosas e gastronômicas"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("sao-lourenco") }, { label: "Circuito das Águas", url: aguas }],
  },
  {
    slug: "caxambu", name: "Caxambu", region: "Circuito das Águas",
    summary: "Estância histórica de águas minerais, jardins e arquitetura, adequada para uma parada urbana tranquila e bem estruturada.",
    tourism: ["Parque das Águas e conjunto de fontes", "Teleférico e Morro de Caxambu", "Praça 16 de Setembro e Centro de Artesanato"],
    nature: ["Horto Florestal", "Jardins, fontes e paisagem serrana", "Fazendas e experiências equestres no entorno"],
    food: ["Cozinha mineira, doces, queijos e cafés", "Restaurantes no centro turístico", "Mercados e refeições práticas para viajantes"],
    support: ["Centro de convenções e apoios RV presentes no mapa", "Combustível, comércio, saúde e hospedagem", "Confirme regras de estacionamento e pernoite"],
    festivals: ["Festival de Inverno e eventos culturais", "Exposições ligadas ao cavalo Mangalarga Marchador", "Calendário religioso e municipal"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("caxambu") }, { label: "Circuito das Águas", url: aguas }],
  },
  {
    slug: "baependi", name: "Baependi", region: "Circuito das Águas",
    summary: "Destino de fé e natureza, conhecido pelo Santuário de Nhá Chica e pelo acesso à Serra do Papagaio.",
    tourism: ["Santuário de Nhá Chica", "Centro histórico e igrejas", "Artesanato e memória religiosa"],
    nature: ["Parque Estadual da Serra do Papagaio", "Cachoeiras do entorno e trilhas de montanha", "Estradas rurais que exigem confirmação de piso"],
    food: ["Comida mineira, doces e quitandas", "Refeições caseiras e produtos rurais", "Combine alimentação antes de atividades longas"],
    support: ["Campings já presentes no mapa", "Estrutura urbana essencial no centro", "Consulte regras do parque, guias e previsão do tempo"],
    festivals: ["Celebrações e romarias de Nhá Chica", "Festas religiosas tradicionais", "Eventos culturais do Circuito das Águas"],
    sources: [{ label: "Circuito das Águas", url: aguas }, { label: "IEF — Serra do Papagaio", url: "https://www.ief.mg.gov.br/component/content/article/3306-nova-categoria/1760-parque-estadual-da-serra-do-papagaio" }],
  },
  {
    slug: "lambari", name: "Lambari", region: "Circuito das Águas",
    summary: "Estância hidromineral de ritmo tranquilo, com parque, lago, cachoeiras, doces e queijos.",
    tourism: ["Parque das Águas e conjunto hidroterápico", "Cassino, Igreja Matriz e patrimônio urbano", "Lago Guanabara e teleférico — confirmar operação"],
    nature: ["Cachoeiras João Gonçalves, Sete Quedas e Roncador", "Parque Estadual Nova Baden", "Lago, matas e estradas rurais"],
    food: ["Doces, queijos e cozinha mineira", "Restaurantes e cafés no centro", "Produtos artesanais em madeira, couro e fibras"],
    support: ["Campings e RV park já catalogados", "Serviços urbanos essenciais", "Confirme acesso, cobrança e estacionamento nas cachoeiras"],
    festivals: ["Programação de inverno", "Festas de Nossa Senhora da Saúde", "Eventos culturais e do Circuito das Águas"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("lambari") }, { label: "Circuito das Águas", url: aguas }],
  },
  {
    slug: "paraisopolis", name: "Paraisópolis", region: "Serras Verdes",
    summary: "Base de serviços entre Itajubá e Gonçalves, ligada ao Caminho da Fé, ao cicloturismo e às paisagens do Machadão.",
    tourism: ["Ponte de Ferro e patrimônio urbano", "Referências culturais de Amílcar de Castro e Carlos Gonzaga", "Trechos do Caminho da Fé"],
    nature: ["Pico do Machadão", "Parque Ecológico Brejo Grande", "Voo livre, trilhas e cicloturismo"],
    food: ["Rede urbana de restaurantes e mercados", "Cozinha mineira, cafés e produtos rurais", "Boa parada para abastecer antes de Gonçalves"],
    support: ["Combustível, oficinas, saúde e comércio regional", "Pontos de apoio e camping no mapa", "Planeje manobra e estacionamento em vias centrais"],
    festivals: ["Festas religiosas e etapas do Caminho da Fé", "Eventos culturais e esportivos", "Calendário municipal — confirmar datas"],
    sources: [{ label: "Serras Verdes", url: serrasVerdes }, { label: "Turismo de Minas Gerais", url: "https://www.minasgerais.com.br/pt/blog/artigo/conheca-20-cidades-imperdiveis-da-serra-mantiqueira" }],
  },
  {
    slug: "goncalves", name: "Gonçalves", aliases: ["Goncalves"], region: "Serras Verdes",
    summary: "Destino de montanha consolidado, com cachoeiras, pedras, produtores artesanais, campings e gastronomia diversa.",
    tourism: ["Centro, Igreja de Nossa Senhora das Dores e ateliês", "Bairros rurais com casas de pau a pique", "Produtores, cervejarias, alambiques e vinícola já catalogados"],
    nature: ["Pedras do Forno, Chanfrada e São Domingos", "Cachoeiras das Sete Quedas, Cruzeiro e Simão", "Trilhas, mirantes e estradas de araucárias"],
    food: ["Comida mineira, bistrôs e cafés de montanha", "Queijos, geleias, mel, cerveja, cachaça e vinhos", "Faixa ampla de experiências; consulte cardápio e preço publicado"],
    support: ["Grande concentração regional de campings no mapa", "Reserve em fins de semana e inverno", "Muitos acessos são estreitos, de terra e inadequados a conjuntos longos"],
    festivals: ["Festival de Inverno", "Eventos gastronômicos e de produtores", "Festas religiosas e calendário rural"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("goncalves") }, { label: "Serras Verdes", url: serrasVerdes }],
  },
  {
    slug: "sapucai-mirim", name: "Sapucaí-Mirim", region: "Serras Verdes",
    summary: "Vizinha de São Bento do Sapucaí e Santo Antônio do Pinhal, com turismo rural, cachoeiras e pedras em remanescentes de Mata Atlântica.",
    tourism: ["Centro e comunidades rurais", "Vivências de fazenda e cultura do campo", "Conexões cênicas com o Vale do Paraíba"],
    nature: ["Pedras do Jair e do Campestre", "Cachoeiras da Pedra do Peão, Amizade e Posses", "Trekking, mountain bike e estradas de montanha"],
    food: ["Cozinha mineira e produtos das fazendas", "Restaurantes pequenos no centro e bairros", "Confirme funcionamento fora de fins de semana"],
    support: ["Serviços essenciais e operadores de ecoturismo", "Leve alternativa de comunicação nas áreas rurais", "Cheque largura, inclinação e piso antes de entrar com RV"],
    festivals: ["Festas religiosas e rurais", "Eventos de inverno", "Cavalgadas e encontros esportivos — confirmar agenda"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("sapucai-mirim") }, { label: "Serras Verdes", url: serrasVerdes }],
  },
  {
    slug: "camanducaia-monte-verde", name: "Camanducaia e Monte Verde", aliases: ["Camanducaia", "Monte Verde"], region: "Serras Verdes",
    summary: "Município cortado pela Fernão Dias cujo distrito de Monte Verde concentra hospedagem, gastronomia e trilhas de altitude.",
    tourism: ["Avenida Monte Verde, galerias e artesanato", "Igrejas e centro de Camanducaia", "Orquidários, cervejarias e experiências privadas"],
    nature: ["Pedras Redonda e Partida, Chapéu do Bispo e Pico do Selado", "Trilha do Pinheiro Velho e bosques", "Rio Jaguari e paisagens de araucária"],
    food: ["Cozinha de montanha, truta, fondue, chocolates e cervejas", "Grande variação de preço e proposta", "Consulte cardápios e faça reserva na alta temporada"],
    support: ["Campings e estacionamentos RV já mapeados", "Monte Verde tem tráfego e vagas limitadas em datas concorridas", "A Fernão Dias oferece apoio rodoviário; o distrito exige planejamento local"],
    festivals: ["Temporada de inverno e Amor nas Montanhas", "Natal Cultural de Monte Verde", "Festas religiosas e eventos de Camanducaia"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("camanducaia") }, { label: "Monte Verde", url: minas("monte-verde") }],
  },
  {
    slug: "corrego-do-bom-jesus", name: "Córrego do Bom Jesus", region: "Serras Verdes",
    summary: "Cidade-santuário próxima a Cambuí, com serras, cachoeiras, voo livre e forte identidade de peregrinação.",
    tourism: ["Santuário do Senhor Bom Jesus", "Centro e patrimônio religioso", "Caminhos de peregrinação e comunidades rurais"],
    nature: ["Pico de São Domingos", "Pico da Raposa e rampa de voo livre", "Cachoeira Três Irmãos e vales da Mantiqueira"],
    food: ["Comida mineira e refeições em pousadas", "Quitandas, cafés e produtos rurais", "Poucas opções fora do centro: confirme abertura"],
    support: ["Campings e apoios RV presentes no mapa", "Subidas íngremes podem impedir veículos pesados", "Confirme autorização e estacionamento nos picos"],
    festivals: ["Festa do Padroeiro Senhor Bom Jesus", "Semana Santa e peregrinações", "Fest Fly e eventos de voo livre"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("corrego-do-bom-jesus") }, { label: "Serras Verdes", url: serrasVerdes }],
  },
  {
    slug: "bom-repouso", name: "Bom Repouso", region: "Serras Verdes",
    summary: "Cidade de altitude, morangos e peregrinação, marcada pelo Santuário de Nossa Senhora das Graças e por paisagens agrícolas.",
    tourism: ["Santuário e monumento de Nossa Senhora das Graças", "Caminho das Graças", "Centro e comunidades produtoras"],
    nature: ["Mirantes de altitude e paisagens de lavouras", "Caminhadas e cicloturismo regional", "Nascentes e serras do extremo sul mineiro"],
    food: ["Morangos e derivados", "Comida mineira, doces e quitandas", "Venda direta de produtores — confirme visita"],
    support: ["Campings já catalogados", "Estradas agrícolas podem ter barro, máquinas e tráfego local", "Planeje combustível e descarte antes de áreas rurais"],
    festivals: ["Romarias e Festa de Nossa Senhora das Graças", "Caminho das Graças na Semana Santa", "Festas do morango e calendário rural — confirmar edição"],
    sources: [{ label: "Caminho das Graças", url: "https://serrasverdes.com.br/caminho-das-gracas/" }, { label: "Serras Verdes", url: serrasVerdes }],
  },
  {
    slug: "bueno-brandao", name: "Bueno Brandão", region: "Serras Verdes",
    summary: "A chamada Terra das Cachoeiras reúne dezenas de quedas d'água, campings, produtores e atividades de aventura perto da divisa paulista.",
    tourism: ["Igreja Matriz, Praça Virgílio de Melo Franco e Casa do Artesão", "Roteiros rurais e produtores", "Experiências de jipe, cavalgada e aventura"],
    nature: ["Cachoeiras dos Félix, Machado e Sossego", "Mirantes e trilhas da Mantiqueira", "Rapel, canyoning e outras atividades com operadores"],
    food: ["Queijos, geleias, doces, vinhos e cervejas artesanais", "Comida mineira em fogão a lenha", "Restaurantes rurais com dias específicos"],
    support: ["Mais de vinte pontos e campings presentes na base", "Confirme day use, estacionamento e acesso de RV em cada cachoeira", "Chuvas alteram rapidamente estradas de terra"],
    festivals: ["Minas Santa e Semana Santa", "Festival de Inverno e eventos rurais", "Festas religiosas e aniversário municipal"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("bueno-brandao") }, { label: "Serras Verdes", url: serrasVerdes }],
  },
  {
    slug: "munhoz", name: "Munhoz", region: "Serras Verdes",
    summary: "Destino rural de cachoeiras, serras e campings, interessante para quem busca tranquilidade e estradas menos movimentadas.",
    tourism: ["Centro, igreja matriz e comunidades rurais", "Artesanato e cultura local", "Roteiros entre Bueno Brandão, Toledo e Itapeva"],
    nature: ["Cachoeira do Espraiado", "Cachoeira dos Nazários e Pedra Vermelha", "Trilhas, corredeiras e paredões"],
    food: ["Comida mineira e produtos rurais", "Refeições em pousadas e pequenos restaurantes", "Leve plano alimentar fora dos fins de semana"],
    support: ["Campings e ecoparque no mapa", "Comércio e combustível limitados em comparação aos polos regionais", "Confirme piso e passagem para conjuntos grandes"],
    festivals: ["Festa do Peão e Arraiá de Munhoz", "Festas religiosas", "Eventos esportivos e rurais"],
    sources: [{ label: "Serras Verdes", url: serrasVerdes }, { label: "Turismo na Mantiqueira", url: "https://www.minasgerais.com.br/pt/blog/artigo/conheca-20-cidades-imperdiveis-da-serra-mantiqueira" }],
  },
  {
    slug: "itapeva", name: "Itapeva", region: "Serras Verdes",
    summary: "Cidade de vales e montanhas junto à Fernão Dias, com cachoeiras, ciclismo e acesso rápido desde São Paulo.",
    tourism: ["Centro, igreja matriz e tradições locais", "Produção rural e artesanato", "Roteiros do Circuito Serras Verdes"],
    nature: ["Pedra Chata e vistas panorâmicas", "Cachoeiras e vales rurais", "Cicloturismo e trilhas de montanha"],
    food: ["Cozinha mineira e cafés de estrada", "Produtos agrícolas e quitandas", "Opções práticas no centro e na Fernão Dias"],
    support: ["Postos rodoviários e camping já no mapa", "Boa conexão com Extrema e Camanducaia", "Acessos rurais devem ser confirmados após chuva"],
    festivals: ["Festa do Peão de Boiadeiro", "Semana Santa", "Festas juninas e calendário municipal"],
    sources: [{ label: "Serras Verdes", url: serrasVerdes }, { label: "Turismo na Mantiqueira", url: "https://www.minasgerais.com.br/pt/blog/artigo/conheca-20-cidades-imperdiveis-da-serra-mantiqueira" }],
  },
  {
    slug: "extrema", name: "Extrema", region: "Serras Verdes",
    summary: "Primeira grande base mineira pela Fernão Dias, com serviços completos, parques, Serra do Lopo e atividades no Rio Jaguari.",
    tourism: ["Santuário de Santa Rita, praças e feira", "Ateliês, produção associada e cultura local", "Parques municipais e equipamentos de visitação"],
    nature: ["Serra do Lopo e Pedra das Flores", "Parques Cachoeira do Salto e Cachoeira do Jaguari", "Rafting, voo livre e trilhas com operadores"],
    food: ["Rede extensa de restaurantes, cafés e mercados", "Cachaça, produtos rurais e cozinha mineira", "Opções acessíveis, intermediárias e experiências — consulte preço público"],
    support: ["Hospitais, oficinas, autopeças, combustível e supermercados", "Campings e apoio RV catalogados", "Base mais completa para revisar veículo antes da Mantiqueira"],
    festivals: ["Extremamente Caipira", "Extrema Mostra de Teatro", "Festas de Santa Rita, São Cristóvão e São Benedito"],
    sources: [{ label: "Turismo de Minas Gerais", url: minas("extrema") }, { label: "Portal Extrema Turismo", url: "https://www.extrematur.com.br/" }],
  },
  {
    slug: "cambui", name: "Cambuí", region: "Serras Verdes",
    summary: "Base urbana da Fernão Dias para quem segue a Córrego do Bom Jesus, Gonçalves e Bom Repouso.",
    tourism: ["Centro, Igreja Matriz de Nossa Senhora do Carmo e praças", "Patrimônio e comércio tradicional", "Ponto de partida do Caminho das Graças"],
    nature: ["Paisagens rurais e serras no entorno", "Cicloturismo Serras Verdes", "Conexão rodoviária com trilhas e picos dos municípios vizinhos"],
    food: ["Rede urbana de restaurantes, padarias e mercados", "Cozinha mineira e refeições de estrada", "Boa parada de abastecimento alimentar"],
    support: ["Hospitais, oficinas, combustível e comércio regional", "Acesso direto pela Fernão Dias", "Recomponha água, gás e mantimentos antes das cidades menores"],
    festivals: ["Festa de Nossa Senhora do Carmo", "Aniversário municipal e corrida tradicional", "Festas juninas e eventos culturais"],
    sources: [{ label: "Serras Verdes", url: serrasVerdes }, { label: "Caminho das Graças", url: "https://serrasverdes.com.br/caminho-das-gracas/" }],
  },
  {
    slug: "senador-amaral", name: "Senador Amaral", region: "Serras Verdes",
    summary: "Um dos municípios mais altos de Minas, de vocação agrícola e paisagens frias, entre Cambuí, Munhoz e Bom Repouso.",
    tourism: ["Centro e igreja matriz", "Comunidades agrícolas de altitude", "Roteiros cênicos do Circuito Serras Verdes"],
    nature: ["Serras, mirantes e estradas de altitude", "Trilhas e cicloturismo", "Paisagens de morango, batata e araucárias"],
    food: ["Morangos, hortaliças e produtos agrícolas", "Quitandas e comida mineira", "Poucas opções: confirme funcionamento e leve reserva"],
    support: ["Serviços básicos no centro", "Frio, neblina e estradas rurais pedem condução conservadora", "Planeje combustível e manutenção em Cambuí ou Extrema"],
    festivals: ["Festa do Peão e eventos rurais", "Semana Santa e Paixão de Cristo", "Corridas e festas comunitárias"],
    sources: [{ label: "Serras Verdes", url: serrasVerdes }, { label: "Turismo na Mantiqueira", url: "https://www.minasgerais.com.br/pt/blog/artigo/inverno-na-regiao-da-mantiqueira" }],
  },
];

export function normalizeSulMinas(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function findSulMinasCity(value: string) {
  const normalized = normalizeSulMinas(value);
  return sulMinasCities.find((city) => [city.name, ...(city.aliases ?? [])].some((name) => normalizeSulMinas(name) === normalized));
}
