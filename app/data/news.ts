export type NewsArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  datePublished: string;
  dateModified: string;
  reading: string;
  coverUrl: string;
  coverAlt: string;
  coverCaption: string;
  featured?: boolean;
  content: {
    heading?: string;
    paragraphs: string[];
    callout?: { title: string; body: string };
  }[];
  sources: { label: string; detail: string; url: string }[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "sao-paulo-motorhome-nova-forma-turismo",
    category: "Destinos & infraestrutura",
    title: "São Paulo começa a enxergar o motorhome como parte de uma nova forma de fazer turismo",
    excerpt: "Ao colocar viajantes, pontos de apoio e destinos paulistas no centro de uma pauta oficial, a Setur-SP reconhece um movimento que já é realidade nas estradas — e evidencia o que ainda falta para o caravanismo avançar.",
    date: "13 de agosto de 2026",
    datePublished: "2026-08-13",
    dateModified: "2026-08-13",
    reading: "7 min",
    coverUrl: "/rota-plena-hero.jpg",
    coverAlt: "Motorhome em mirante de serra ao pôr do sol, imagem editorial Rota Plena",
    coverCaption: "Imagem editorial Rota Plena. A pauta reúne destinos paulistas citados pela Secretaria de Turismo e Viagens do Estado.",
    featured: true,
    content: [
      { paragraphs: [
        "Viajar de motorhome deixou há muito tempo de ser uma curiosidade restrita a poucos aventureiros. Em maio de 2026, a Secretaria de Turismo e Viagens do Estado de São Paulo (Setur-SP) dedicou uma reportagem inteira a essa forma de viajar, reunindo histórias de motorhomeiros e apresentando destinos que começam a compreender o potencial do turismo sobre rodas.",
        "O movimento é importante porque sinaliza um reconhecimento institucional de algo que os viajantes já percebem na prática: motorhomes, trailers, campers e vans fazem parte de um segmento turístico próprio, com necessidades específicas e capacidade real de movimentar economias locais.",
        "A pauta oficial percorre experiências em diferentes regiões do estado e mostra uma São Paulo que vai muito além dos roteiros tradicionais. Três Fronteiras, Indiaporã, Pontes Gestal, Ribeirão Pires, Bertioga, Paranapiacaba e diversos municípios do noroeste aparecem sob o olhar de quem viaja levando a própria casa. O que conecta esses destinos não é apenas a paisagem: é a possibilidade de chegar, permanecer, abastecer, descansar e seguir viagem com alguma segurança.",
      ] },
      { heading: "Três Fronteiras: quando o destino percebe o valor de receber quem viaja sobre rodas", paragraphs: [
        "Um dos exemplos destacados pela Setur-SP é Três Fronteiras, no noroeste paulista, município conhecido pelo Parque Ecoturístico da Areia Branca, às margens do rio Paraná. Em março de 2025, o local recebeu o Encontro Nacional dos Bodes de Motorhome. Segundo a secretaria, o evento reuniu 70 veículos e aproximadamente 200 motorhomeiros vindos de mais de 20 estados brasileiros.",
        "O número é especialmente relevante quando analisado do ponto de vista de uma pequena cidade. Um encontro com dezenas de veículos não movimenta apenas o local onde ocorre o pernoite. Os viajantes consomem combustível, alimentação, manutenção, mercados, farmácias, passeios e serviços. Quando permanecem por mais de um dia, essa circulação se espalha pela economia local.",
      ], callout: {
        title: "A lógica econômica do caravanismo",
        body: "O viajante sobre rodas procura infraestrutura básica para permanecer com autonomia, mas continua consumindo na cidade: supermercados, restaurantes, combustível, oficinas, atrações, lavanderias, farmácias e serviços.",
      } },
      { heading: "Ponto de apoio não é estacionamento: é infraestrutura turística", paragraphs: [
        "Um dos trechos mais importantes da publicação da Setur-SP é o reconhecimento da função dos pontos de apoio. Para o caravanista, estacionar é apenas uma parte da necessidade. Uma estrutura realmente útil precisa considerar pernoite seguro, fornecimento de água potável, energia elétrica e local adequado para descarte de águas servidas e dejetos sanitários.",
        "É justamente aqui que aparece uma das principais lacunas brasileiras. Existem excelentes campings e pontos de apoio espalhados pelo país, mas as informações ainda são fragmentadas, desatualizadas ou pouco padronizadas. Um local pode anunciar que ‘recebe motorhomes’ e, na prática, ter acesso incompatível com veículos maiores, energia inadequada, piso ruim em dias de chuva ou ausência de descarte. Para quem está na estrada, esse tipo de informação não é detalhe: pode definir se a parada será tranquila ou problemática.",
      ] },
      { heading: "O interior paulista aparece como território promissor", paragraphs: [
        "As experiências reunidas pela Setur-SP dão grande destaque ao interior. O noroeste paulista, com represas, prainhas e cidades menores, surge como uma região particularmente interessante. Entre as indicações apresentadas pelos viajantes aparecem Riolândia, Pontes Gestal, Cardoso, Mira Estrela, Indiaporã, Santa Fé do Sul, Santa Clara d’Oeste, Sales, Mendonça, Adolfo, Buritama, Santa Albertina, Rubinéia, Ilha Solteira e Pereira Barreto.",
        "Esse mapa espontâneo revela uma oportunidade importante. Muitos desses municípios não são os primeiros nomes lembrados por turistas tradicionais, mas possuem exatamente aquilo que o caravanista procura: natureza, tranquilidade, água, espaço, hospitalidade e possibilidade de permanecer alguns dias com ritmo mais lento. Quando uma cidade acrescenta um ponto de apoio bem planejado a esse conjunto, passa a integrar uma rota que antes poderia simplesmente atravessá-la.",
      ] },
      { heading: "O litoral: desejo de viajar e dificuldades para permanecer", paragraphs: [
        "A reportagem também evidencia um contraste conhecido dos caravanistas. O litoral paulista está entre os destinos mais desejados, mas algumas cidades ainda apresentam restrições ou dificuldades para a permanência de veículos de recreação. Ao mesmo tempo, há exemplos de municípios percebidos pelos viajantes como mais receptivos. Bertioga é citada positivamente por uma das entrevistadas, enquanto Ubatuba, São Sebastião, Guarujá, Cananéia e Ilhabela aparecem como lugares de forte interesse.",
        "Esse contraste mostra por que o debate precisa ir além de simplesmente permitir ou proibir estacionamento. É necessário distinguir circulação, parada, estacionamento, acampamento e ocupação irregular, criando regras claras que protejam o espaço público sem tratar todo veículo de recreação como problema.",
      ] },
      { heading: "Um mercado que já não pode ser tratado como modismo", paragraphs: [
        "A Setur-SP afirma que o mercado brasileiro de veículos adaptados vem crescendo e relaciona essa expansão ao turismo independente, aos nômades digitais e ao caravanismo. A publicação cita estimativas de movimentação de aproximadamente R$ 1,5 bilhão em 2023 e cerca de 48 mil veículos entre motorhomes, kombi homes, trailers e motorcasas em circulação no país. Como se trata de estimativa apresentada pela própria secretaria, os números devem ser lidos como referência de dimensão do setor, e não como um censo definitivo.",
        "Ainda assim, a tendência é clara: a presença desses veículos aumentou, os encontros cresceram, novos fabricantes surgiram e a internet ampliou o acesso a informações antes restritas a pequenos grupos. Há aposentados, famílias com crianças, casais, pessoas que trabalham remotamente e viajantes solo. Cada perfil utiliza o veículo de uma forma diferente, mas todos dependem de informação confiável para decidir por onde passar e onde permanecer.",
      ] },
      { heading: "A oportunidade para o Rota Plena", paragraphs: [
        "É exatamente nessa lacuna que o Rota Plena pode assumir um papel relevante. A publicação oficial mostra destinos e histórias; a plataforma pode acrescentar a camada operacional que o viajante precisa antes de sair: localização validada, acesso, tipo de piso, comprimento máximo recomendado, energia, água potável, descarte de água cinza e negra, segurança, sinal de internet, política para pets, custo, atrações próximas, oficinas e serviços de emergência.",
        "Mais do que criar uma lista de campings, o desafio é construir inteligência de rota. Quantos quilômetros faltam até o apoio? O acesso é seguro à noite? Há posto de combustível e mercado próximos? A estrada de chegada aceita um veículo grande? O local continua funcionando? Há relatos recentes? São essas respostas que transformam um mapa em uma ferramenta de decisão.",
      ], callout: {
        title: "Um possível selo Rota Plena",
        body: "Locais cadastrados podem receber níveis de verificação por critérios objetivos: acesso, água, energia, descarte, piso, segurança, conectividade e confirmação recente de funcionamento. Não para dar nota à beleza, mas para informar se a estrutura atende cada tipo de veículo.",
      } },
      { heading: "São Paulo tem escala para se tornar uma grande rota do caravanismo", paragraphs: [
        "Poucos estados brasileiros reúnem, em distâncias relativamente manejáveis, tanta diversidade de experiências quanto São Paulo: litoral, serras, represas, cidades históricas, áreas rurais, circuitos gastronômicos, grandes centros urbanos e pequenas cidades do interior. Essa diversidade já existe. O que falta é conectá-la por uma rede mais clara de infraestrutura e informação voltada ao turismo sobre rodas.",
        "Quando uma secretaria estadual começa a falar diretamente sobre motorhomes, o significado vai além de uma matéria institucional. O segmento passa a ocupar espaço na narrativa oficial do turismo. O próximo passo é fazer com que essa visibilidade se traduza em pontos de apoio bem concebidos, municípios preparados, regras proporcionais e informação de qualidade.",
        "Para quem vive a estrada, isso significa mais liberdade para escolher o caminho. Para as cidades, significa a possibilidade de receber um turista que não precisa de grandes obras para chegar, mas precisa sentir que existe um lugar seguro e adequado para permanecer. E para o Rota Plena, significa ajudar a construir a ponte entre esses dois lados.",
      ] },
    ],
    sources: [
      { label: "Setur-SP", detail: "‘São Paulo de motorhome: a casa no carro e o carro na estrada’, publicada em 21/05/2026 — fonte principal dos destinos, relatos e estimativas citados.", url: "https://www.turismo.sp.gov.br/wcm/connect/sec_turismo_content/sec_turismo/noticias/sao-paulo-motorhome-casa-no-carro-carro-estrada" },
      { label: "ANACAMP", detail: "Página institucional da Associação Nacional de Campistas — referência complementar sobre o ecossistema do campismo e caravanismo no Brasil.", url: "https://anacamp.com/sobre-nos/" },
    ],
  },
  {
    slug: "anacamp-10-anos-caravanismo-brasileiro",
    category: "Caravanismo brasileiro",
    title: "ANACAMP chega aos 10 anos levando a celebração para as estradas do Brasil",
    excerpt: "Encontros simultâneos em 11 unidades da federação mostram que o campismo deixou de ser apenas uma forma de viajar: tornou-se uma comunidade organizada e cada vez mais relevante para o turismo nacional.",
    date: "13 de agosto de 2026",
    datePublished: "2026-08-13",
    dateModified: "2026-08-13",
    reading: "5 min",
    coverUrl: "/assets/visual/camping-real-cc0.webp",
    coverAlt: "Camping em área aberta cercada por montanhas, com barracas, carros e veículo recreativo",
    coverCaption: "Imagem ilustrativa de área de camping. A celebração da ANACAMP reúne encontros regionais em diferentes estruturas pelo Brasil.",
    content: [
      { paragraphs: [
        "Nos dias 15 e 16 de agosto de 2026, campistas e caravanistas de várias partes do país terão um motivo especial para estacionar, montar acampamento e celebrar juntos: a Associação Nacional de Campistas (ANACAMP) comemora uma década de existência com encontros simultâneos no formato VQQ — ‘Vai Quem Quer’.",
        "Fundada em 18 de agosto de 2016, originalmente como Associação Brasileira de Campismo Casa sobre Rodas, a ANACAMP consolidou ao longo desses anos uma atuação voltada à promoção do campismo, à representação dos viajantes e ao fortalecimento do setor turístico ligado a barracas, trailers, motorhomes, campers, kombis e vans. A comemoração traduz esse percurso de forma coerente: em vez de concentrar tudo em um único grande evento, a entidade espalhou a celebração pelas estradas.",
      ] },
      { heading: "Uma comemoração nacional e descentralizada", paragraphs: [
        "A programação oficial reúne encontros em 11 unidades da federação: Rio Grande do Sul, Santa Catarina, Paraná, Mato Grosso do Sul, São Paulo, Rio de Janeiro, Minas Gerais, Espírito Santo, Distrito Federal, Goiás e Ceará. Cada encontro será conduzido por representantes regionais e realizado em campings, fazendas, pontos de apoio ou espaços preparados para receber a comunidade campista.",
        "Em São Paulo, a programação foi transferida da AMMA, em Pirassununga, para o Parque Ecológico das Nações, em Cravinhos. Em Minas Gerais, a concentração será no Camping Tiradentes. No Rio de Janeiro, no Camping Lídice Adventure, em Rio Claro. No Paraná, no Camping No Sol, em Campo Largo. A diversidade dos locais revela uma característica essencial do caravanismo brasileiro: o ecossistema é formado por estruturas diferentes que, juntas, tornam a viagem possível.",
      ], callout: {
        title: "Informação atualizada em 13/08/2026",
        body: "A ANACAMP alterou o encontro paulista para o Parque Ecológico das Nações, em Cravinhos. O texto original recebido pelo Rota Plena ainda mencionava a AMMA, em Pirassununga; a matéria foi corrigida com base na atualização oficial de 05/08/2026.",
      } },
      { heading: "O gesto simbólico dos 10 anos", paragraphs: [
        "No sábado, 15 de agosto, às 20h, participantes dos encontros previstos nos diferentes estados cantarão simultaneamente os parabéns pelos dez anos da ANACAMP. Mais do que uma comemoração, o momento pretende reforçar a sensação de uma comunidade nacional conectada pela estrada.",
      ] },
      { heading: "O que mudou no caravanismo brasileiro em uma década", paragraphs: [
        "A celebração também funciona como fotografia de uma transformação maior. O caravanismo brasileiro ganhou visibilidade, novos fabricantes, grupos de viajantes, encontros regionais, criadores de conteúdo, pontos de apoio e uma comunidade muito mais conectada.",
        "Ao mesmo tempo, continuam presentes desafios conhecidos: infraestrutura desigual, dificuldade para descarte adequado de resíduos, escassez de pontos seguros de pernoite em algumas regiões e normas municipais que nem sempre compreendem as particularidades dos veículos de recreação.",
        "Nesse cenário, associações nacionais e regionais cumprem papel que vai além da confraternização. Elas ajudam a organizar informações, representar demandas, estabelecer interlocução com o poder público e aproximar viajantes de campings, prestadores de serviços e destinos turísticos.",
      ] },
      { heading: "CADCAMPBR: conhecer o tamanho real de quem está na estrada", paragraphs: [
        "Um dos componentes mais estratégicos da comemoração será a divulgação do CADCAMPBR — Cadastro Nacional do Campismo e Caravanismo Brasileiro. Segundo a ANACAMP, a iniciativa busca construir uma base mais representativa sobre a comunidade campista do país e atingiu a marca de 3 mil registros em 21 de julho de 2026.",
        "Dados confiáveis são decisivos para um setor que pretende dialogar com prefeituras, secretarias de turismo, empresas, campings e investidores. Saber quantas pessoas viajam, quais veículos utilizam, quais regiões percorrem e quais estruturas procuram permite substituir percepções genéricas por evidências — elemento importante na discussão de políticas públicas, pontos de apoio e destinos preparados para o turismo sobre rodas.",
      ] },
      { heading: "Por que isso interessa diretamente ao viajante", paragraphs: [
        "Para quem está começando, encontros desse tipo representam uma oportunidade rara de aprender com quem já percorreu muitos quilômetros. É nesses ambientes que circulam informações difíceis de encontrar em manuais: como avaliar um camping, escolher equipamentos, organizar autonomia de energia e água, planejar descarte, identificar estradas problemáticas e compreender as diferenças entre viajar de trailer, motorhome, camper ou van.",
        "Para quem já vive a estrada há mais tempo, os encontros funcionam como pontos de reencontro, troca de rotas e atualização de referências. A lógica VQQ preserva uma característica valiosa dessa cultura: espontaneidade. Vai quem quer, chega quem pode, compartilha quem deseja — mas todos se reconhecem em uma mesma paixão pela liberdade de deslocamento e pela convivência.",
      ] },
      { heading: "O olhar do Rota Plena", paragraphs: [
        "Para o Rota Plena, a celebração dos dez anos da ANACAMP aponta para algo maior do que uma agenda de eventos. Ela mostra a necessidade de conectar, em um só ambiente, os elementos que fazem a viagem acontecer: campings, pontos de apoio, locais de pernoite, oficinas, abastecimento de água, energia, descarte, segurança, atrações e informações sobre as condições reais de cada rota.",
        "O futuro do caravanismo não depende apenas de mais veículos nas estradas. Depende de informação de qualidade e de destinos preparados para recebê-los. Uma plataforma construída a partir da experiência prática dos viajantes pode complementar o trabalho institucional das associações, ajudando a transformar informação dispersa em orientação confiável.",
      ], callout: {
        title: "Para acompanhar no Rota Plena",
        body: "A cobertura de encontros e campings pode evoluir para fichas verificadas de infraestrutura: piso, energia, água potável, descarte de água cinza e negra, segurança, tamanho máximo do veículo, acesso, conectividade, política para pets e experiência recente de viajantes.",
      } },
      { heading: "Dez anos depois, a estrada continua chamando", paragraphs: [
        "Há algo especialmente coerente em celebrar uma associação de campistas sem tirar a comunidade da estrada. Os encontros de agosto não representam apenas um aniversário institucional. Eles materializam uma rede de pessoas que escolheu viajar de maneira diferente, valorizando autonomia, convivência, natureza e liberdade.",
        "Se o caravanismo brasileiro está entrando em uma nova etapa, ela provavelmente será marcada por mais infraestrutura, organização e informação. Mas a essência continuará a mesma: escolher um caminho, preparar o veículo, encontrar um lugar para parar e descobrir que muitas vezes a melhor parte da viagem estava no percurso e nas pessoas encontradas pelo caminho.",
      ] },
    ],
    sources: [
      { label: "ANACAMP", detail: "‘Anacamp celebrará 10 anos com encontros em vários Estados’ — programação oficial, publicada em 15/07 e atualizada em 05/08/2026.", url: "https://anacamp.com/noticia/anacamp-celebrara-10-anos-com-encontros-em-varios-estados/" },
      { label: "ANACAMP", detail: "Página institucional — histórico, missão e data de fundação da associação.", url: "https://anacamp.com/sobre-nos/" },
      { label: "ANACAMP", detail: "‘Cadastro Nacional atinge 3 mil registros’ — publicado em 21/07/2026.", url: "https://anacamp.com/noticia/cadastro-nacional-atinge-3-mil-registros/" },
      { label: "CADCAMPBR", detail: "Página oficial do Cadastro Nacional do Campismo e Caravanismo Brasileiro.", url: "https://www.cadcampbr.com.br/" },
    ],
  },
];

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}
