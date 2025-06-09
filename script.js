// script.js - JS extraído do index.html

const products = [
    {
        id: "tv_lg_32",
        imageSrc: "images/tv-hd-400.webp",
        shortName: "Smart TV LG 32\"",
        fullName: "Smart TV LG 32\" HD com Wi-Fi, Bluetooth, HDR e AI ThinQ - Modelo 32LQ620BPSB",
        price: "R$ 850,00",
        description: "Perfeita para streaming e apps, com qualidade HD.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/tvs-e-video/tvs/smart-tv-lg-32-hd-com-wi-fi-bluetooth-hdr-e-ai-thinq-modelo-32lq620bpsb-1409672463?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 1.532,69",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Smart TV da LG com excelente desempenho para quem busca qualidade de imagem, conectividade e praticidade. Ideal para sala ou quarto.",
            especificacoesHTML: `
                <ul>
                    <li>Tamanho: 32 polegadas</li>
                    <li>Resolução: HD (1366 x 768)</li>
                    <li>Inteligência Artificial: ThinQ AI</li>
                    <li>Processador: α5 Gen5 AI</li>
                    <li>Assistentes de Voz: Suporte para Google Assistente, Alexa, Apple AirPlay</li>
                    <li>Conectividade: Wi-Fi e Bluetooth integrados</li>
                    <li>Imagem: HDR10 Pro para maior nitidez e contraste</li>
                    <li>Recursos Adicionais: Painel de Controle para Jogos, WebOS atualizado</li>
                    <li>Conexões: HDMI, USB, entrada AV</li>
                    <li>Peso sem base: 4,9kg</li>
                </ul>`,
            estadoProduto: "Usada, mas em perfeito funcionamento. Tela sem riscos, imagem limpa. Acompanha controle."
        }
    },
    {
        id: "adega_brastemp",
        imageSrc: "images/adega-400.webp",
        shortName: "Adega Brastemp",
        fullName: "Adega Brastemp 12 Garrafas com Painel Touch - Modelo BZC12BE",
        price: "R$ 800,00",
        description: "Conserve seus vinhos na temperatura ideal com estilo e praticidade.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/geladeiras-e-freezers/adega-brastemp-12-garrafas-com-painel-touch-modelo-bzc12be-1409697836?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 1.039,00",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Adega climatizada da Brastemp com capacidade para 12 garrafas, ideal para quem busca conservar e servir vinhos na temperatura ideal. Compacta, moderna e elegante, combina com qualquer ambiente.",
            especificacoesHTML: `
                <ul>
                    <li>Capacidade: 12 garrafas</li>
                    <li>Voltagem: 110V</li>
                    <li>Controle de temperatura: Painel eletrônico touch sensor</li>
                    <li>Iluminação interna: LED</li>
                    <li>Sistema de refrigeração: Eletrônico</li>
                    <li>Cor: Preto</li>
                    <li>Dimensões: 63,3 cm (A) x 28 cm (L) x 51 cm (P)</li>
                    <li>Peso: 12,2 kg</li>
                </ul>`,
            estadoProduto: "Usada, em ótimo estado de conservação. Nenhum dano aparente, funcionamento perfeito."
        }
    },
    {
        id: "maquina_lavar_electrolux",
        imageSrc: "images/maquina-de-lavar-400.webp",
        shortName: "Máquina Lavar Electrolux",
        fullName: "Máquina de Lavar Electrolux 8.5kg Essential Care",
        price: "R$ 750,00",
        description: "Lava suas roupas com cuidado e eficiência, economizando água.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/maquinas-de-lavar-e-secadoras/maquina-de-lavar-electrolux-8-5kg-essential-care-1409730468?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 1.699,00",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Máquina robusta e eficiente, ideal para famílias que buscam economia de água e ótimo desempenho na lavagem. Prática, silenciosa.",
            especificacoesHTML: `
                <ul>
                    <li>Capacidade: 8,5kg</li>
                    <li>Modelo: Essential Care LES09</li>
                    <li>Abertura: Superior (top load)</li>
                    <li>Programas de lavagem: 12 automáticos</li>
                    <li>Sistema de lavagem: Com turbo agitação</li>
                    <li>Recursos: Níveis de água ajustáveis, Filtro pega-fiapos, Dispenser multiuso</li>
                    <li>Tampa: Vidro temperado</li>
                    <li>Eficiência Energética: Classificação A</li>
                    <li>Voltagem: 127V</li>
                </ul>`,
            estadoProduto: "Usada, mas em excelente funcionamento. Limpa e bem conservada."
        }
    },
    { 
        id: "tripe_manfrotto_055",
        imageSrc: "images/tripe-manfroto-400.webp", 
        shortName: "Tripé Manfrotto 055 + Joystick 222",
        fullName: "Tripé Profissional Manfrotto MT055XPRO3 + Cabeça Joystick 222",
        price: "R$ 700,00",
        description: "Tripé profissional com cabeça joystick. Firme, preciso e resistente.",
        olxLink: "", 
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 3.200,00",
            localRetirada: "Rio Tavares – Florianópolis",
            descricaoGeral: "Tripé robusto com cabeça joystick. Ideal para fotógrafos e videomakers que buscam estabilidade e agilidade no ajuste da câmera.",
            especificacoesHTML: `
                <ul>
                    <li>Modelo: MT055XPRO3 com cabeça Manfrotto 222</li>
                    <li>Funcionalidade: Coluna central com movimento horizontal e vertical</li>
                    <li>Recursos: Travas Quick Power Lock, conector Easy Link, nível de bolha giratório</li>
                    <li>Altura máxima: 170 cm</li>
                    <li>Altura mínima: 9 cm</li>
                    <li>Peso aproximado: 2,88 kg</li>
                    <li>Material: Alumínio</li>
                    <li>Compatibilidade: Câmeras DSLR e mirrorless</li>
                </ul>`,
            estadoProduto: "Equipamento em ótimo estado. Pronto para uso profissional."
        }
    },
    {
        id: "geladeira_electrolux",
        imageSrc: "images/geladeira-400.webp",
        shortName: "Geladeira Electrolux",
        fullName: "Geladeira Electrolux RE31",
        price: "R$ 600,00",
        description: "Compacta e eficiente, ideal para quem busca praticidade na cozinha.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/geladeiras-e-freezers/geladeira-electrolux-re31-1409738827?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 1.799",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Geladeira Electrolux 1 Porta 261L (modelo CRA30FBBNA Branca). Ideal para quem busca uma solução prática e econômica.",
            especificacoesHTML: `
                <ul>
                    <li>Capacidade total: 261 litros</li>
                    <li>Cor: Branca</li>
                    <li>Tipo: 1 porta com prateleiras internas e porta-latas</li>
                    <li>Freezer: Compartimento freezer interno</li>
                    <li>Eficiência: Baixo consumo de energia</li>
                    <li>Design: Compacto, ideal para cozinhas menores</li>
                </ul>`,
            estadoProduto: "Usada por 3 anos, sempre em ambiente doméstico. Está funcionando perfeitamente, com exceção da tampa do freezer, que precisa de conserto simples. Por isso, o valor reduzido para venda rápida. Está limpa."
        }
    },
    {
        id: "bike_caloi_speed",
        imageSrc: "images/caloi-10-400.webp",
        shortName: "Bike Caloi Speed",
        fullName: "Bicicleta Caloi Speed",
        price: "R$ 550,00",
        description: "Performance e velocidade para seus treinos e passeios na cidade.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/ciclismo/bicicleta-caloi-speed-1409757466?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 2.700",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Modelo clássico com visual moderno, ideal para uso urbano ou treinos leves. Estrutura leve e rápida.",
            especificacoesHTML: `
                <ul>
                    <li>Quadro: Alumínio</li>
                    <li>Guidão: Drop estilo speed</li>
                    <li>Câmbio: Caloi</li>
                    <li>Aros: 700 com pneus finos</li>
                    <li>Marchas: 12</li>
                </ul>`,
            estadoProduto: "Precisa de manutenção no conjunto de pedalada e transmissão. A corrente, pedivela, coroas e pedais estão enferrujados pelo tempo sem uso e podem precisar de troca ou limpeza profunda. Ideal para quem busca um projeto de reforma ou quer montar uma bike de estrada a partir de uma base sólida. Preço abaixo do mercado justamente por isso.",
            observacoes: "Preço para vender rápido."
        }
    },
    {
        id: "aspirador_robo_oster",
        imageSrc: "images/robo-aspirador-400.webp",
        shortName: "Aspirador Robô Oster",
        fullName: "Aspirador Robô Oster Keep Clean",
        price: "R$ 400,00",
        description: "Deixe a limpeza da casa por conta dele, praticidade total.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/eletroportateis-para-cozinha-e-limpeza/aspirador-robo-oster-keep-clean-1409729011?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 899",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "O Oster Keep Clean é o parceiro ideal para manter sua casa limpa com praticidade e sem esforço. Com design compacto e eficiente, ele varre, aspira e limpa com autonomia, ideal para quem tem pets ou precisa manter o chão livre de poeira no dia a dia.",
            especificacoesHTML: `
                <ul>
                    <li>Autonomia: Até 90 minutos</li>
                    <li>Sensores: Anticolisão e antiqueda</li>
                    <li>Ideal para: Pisos frios, madeira, tapetes baixos e carpetes finos</li>
                    <li>Reservatório de pó: Lavável</li>
                    <li>Filtro: HEPA que retém partículas e alérgenos</li>
                    <li>Design: Slim (passa por baixo de móveis)</li>
                    <li>Carregamento: Direto na tomada</li>
                    <li>Nível de ruído: Baixo</li>
                </ul>`,
            estadoProduto: "Usado em ótimo estado, funcionando perfeitamente. Apenas pequenas marcas de uso na carcaça."
        }
    },
    {
        id: "ventilador_torre_wap",
        imageSrc: "images/ventilador-torre-400.webp",
        shortName: "Ventilador Torre WAP",
        fullName: "Ventilador Torre WAP Air Silence",
        price: "R$ 300,00",
        description: "Silencioso e potente, refresca o ambiente com design moderno.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/ventiladores-e-climatizadores/ventilador-torre-wap-air-silence-1409685583?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 649,90",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Ventilador de torre NOVO, nunca usado. Ideal para quartos e salas - muito silencioso e com excelente alcance de ventilação.",
            especificacoesHTML: `
                <ul>
                    <li>Design: Moderno e compacto</li>
                    <li>Controle: Remoto multifunções</li>
                    <li>Velocidades: 4 (baixa, média, alta e ECO)</li>
                    <li>Modos de vento: 3 (normal - contínuo, brisa - simula vento natural, noturno - mais suave)</li>
                    <li>Oscilação: Horizontal de 90º</li>
                    <li>Timer programável: 1h, 2h, 4h, 8h ou até 15h</li>
                    <li>Painel: Com LED indicador</li>
                    <li>Potência: 70W</li>
                    <li>Altura: 103 cm</li>
                    <li>Peso: 3,7 kg</li>
                    <li>Voltagem: 127V</li>
                </ul>`,
            estadoProduto: "NOVO - nunca foi utilizado. Acompanha controle remoto original."
        }
    },
    {
        id: "fritadeira_eos",
        imageSrc: "images/air-fryer-vermelha-400.webp",
        shortName: "Fritadeira EOS",
        fullName: "Fritadeira Elétrica EOS Chef Gourmet",
        price: "R$ 200,00",
        description: "Comidas crocantes e saudáveis sem usar óleo, fácil de limpar.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/fogoes-e-fornos/fritadeira-eletrica-eos-chef-gourmet-1409726359?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 399,00",
            localRetirada: "Campeche - Florianópolis",
            descricaoGeral: "Air fryer compacta, bonita e funcional. Ideal para preparar refeições mais saudáveis, sem uso de óleo. Excelente para porções individuais ou pequenas famílias.",
            especificacoesHTML: `
                <ul>
                    <li>Capacidade: 3,5 litros</li>
                    <li>Controle de temperatura: até 200°C</li>
                    <li>Timer: até 60 minutos com aviso sonoro</li>
                    <li>Cesto: Com revestimento antiaderente</li>
                    <li>Consumo: Baixo consumo de energia</li>
                    <li>Manuseio: Fácil de limpar e manusear</li>
                    <li>Design: Moderno na cor vermelha</li>
                </ul>`,
            estadoProduto: "Usada, mas em ótimo funcionamento. Sem arranhões ou danos."
        }
    },
    {
        id: "fritadeira_cadence",
        imageSrc: "images/airfyer-preta-400.webp",
        shortName: "Fritadeira Cadence",
        fullName: "Fritadeira Elétrica Cadence Super Light Fryer 3.2L - 1500W",
        price: "R$ 180,00",
        description: "Alimentos saborosos e mais saudáveis para toda a família.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/eletroportateis-para-cozinha-e-limpeza/fritadeira-eletrica-cadence-super-light-fryer-3-2l-1500w-1409737099?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 419",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Air Fryer potente e compacta, ideal para preparar refeições mais saudáveis com praticidade.",
            especificacoesHTML: `
                <ul>
                    <li>Capacidade: 3,2 litros</li>
                    <li>Potência: 1500W</li>
                    <li>Controle de temperatura: 80° a 200°C</li>
                    <li>Timer: Até 30 minutos</li>
                    <li>Indicadores: Luzes de funcionamento e aquecimento</li>
                    <li>Voltagem: 110V (127V)</li>
                    <li>Design: Moderno e fácil de limpar</li>
                </ul>`,
            estadoProduto: "Funcionando normalmente. Precisa trocar o botão do timer (custa no máximo R$ 30). A alça também pode ser trocada por uma nova (R$ 45), mas o encaixe pode ser resolvido com parafusos simples.",
            observacoes: "Ótima opção para quem quer economizar e resolver pequenos ajustes por conta própria. Ideal para quem gosta de pequenos consertos e quer economizar."
        }
    },
    {
        id: "cafeteira_3_coracoes",
        imageSrc: "images/cafeteira-400.webp",
        shortName: "Cafeteira 3 Corações",
        fullName: "Cafeteira TRES 3 Corações LOV Multibebidas",
        price: "R$ 150,00",
        description: "Seu café expresso ou multibebidas favorito ao toque de um botão.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/eletroportateis-para-cozinha-e-limpeza/cafeteira-tres-3-coracoes-lov-multibebidas-1410281152?lis=ad_card_user_profile",
        status: "vendido", // <--- ITEM MARCADO COMO VENDIDO
        detailedInfo: {
            valorOriginal: "R$400",
            localRetirada: "Campeche - Florianópolis",
            descricaoGeral: "Modelo compacto e elegante, compatível com cápsulas da linha TRES da 3 Corações. Ideal para quem quer praticidade no preparo de cafés espressos, bebidas cremosas, cafés filtrados e chás.",
            especificacoesHTML: `
                <ul>
                    <li>Modelo: LOV</li>
                    <li>Funcionalidade: Prepara diferentes tipos de bebida com apenas um botão</li>
                    <li>Recursos: Reservatório de cápsulas usadas acoplado, Três botões de preparo (espresso, filtrado e multibebidas), Reservatório de água grande, removível e fácil de limpar, Sistema de limpeza com cápsula de retrolavagem</li>
                    <li>Voltagem: 220V</li>
                    <li>Cor: Preta</li>
                    <li>Peso aproximado: 3kg</li>
                    <li>Acessórios: Acompanha a caixa original</li>
                </ul>`,
            estadoProduto: "Nunca foi usada. Ainda está com adesivos de caixa. Funciona perfeitamente."
        }
    },
    {
        id: "passadeira_wap",
        imageSrc: "images/passador-400.webp",
        shortName: "Passadeira WAP",
        fullName: "Passadeira a Vapor Portátil WAP Wapore Fast - 1250W",
        price: "R$ 100,00",
        description: "Roupas desamassadas rapidamente, ideal para viagens e dia a dia.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/eletroportateis-para-cozinha-e-limpeza/passadeira-a-vapor-portatil-wap-wapore-fast-1250w-1410282629?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 350",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Passadeira a vapor portátil da marca WAP, modelo Wapore Fast. Compacta, leve e muito prática para o dia a dia. Desamassa e higieniza as roupas com vapor quente em segundos - direto no cabide, sem precisar de tábua de passar!",
            especificacoesHTML: `
                <ul>
                    <li>Potência: 1250W</li>
                    <li>Tempo de Aquecimento: Pronta para uso em até 25 segundos</li>
                    <li>Base: Antiaderente</li>
                    <li>Temperatura de vapor: Até 160°C</li>
                    <li>Capacidade do reservatório: 200ml</li>
                    <li>Voltagem: 220V</li>
                    <li>Acessórios: Acompanha copo medidor</li>
                </ul>`,
            estadoProduto: "Produto em ótimo estado, usado só para teste.",
            observacoes: "Só vender mesmo porque estou me mudando."
        }
    },
    { 
        id: "cafeteira_oster_daylight",
        imageSrc: "images/cafeteira-oster-daylight-400.webp", 
        shortName: "Cafeteira Oster Day Light",
        fullName: "Cafeteira Digital Oster Day Light OCAF500 – 127V",
        price: "R$ 100,00",
        description: "Café pronto ao acordar. Moderna, prática e programável.",
        olxLink: "", 
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 289,00",
            localRetirada: "Rio Tavares – Florianópolis",
            descricaoGeral: "Modelo compacto e programável, ideal para quem deseja praticidade no preparo do café do dia a dia. Basta programar e acordar com café fresquinho.",
            especificacoesHTML: `
                <ul>
                    <li>Modelo: OCAF500</li>
                    <li>Funcionalidade: Timer programável até 24h</li>
                    <li>Recursos: Placa aquecedora, desligamento automático, jarra de 1,2L, filtro permanente lavável</li>
                    <li>Voltagem: 127V</li>
                    <li>Cor: Preta</li>
                    <li>Peso aproximado: 1,2kg</li>
                    <li>Acessórios: Acompanha copo medidor</li>
                </ul>`,
            estadoProduto: "Usada poucas vezes. Em ótimo estado e funcionamento perfeito."
        }
    },
    {
        id: "liquidificador_britania",
        imageSrc: "images/liquidificador-400.webp",
        shortName: "Liquidificador Britânia",
        fullName: "Liquidificador Britânia Diamante 900W - Potente e Prático",
        price: "R$ 90,00",
        description: "Prepare vitaminas, sucos e massas com potência e rapidez.",
        olxLink: "https://sc.olx.com.br/florianopolis-e-regiao/eletro/eletroportateis-para-cozinha-e-limpeza/liquidificador-britania-diamante-900w-potente-e-pratico-1410297464?lis=ad_card_user_profile",
        status: "disponivel",
        detailedInfo: {
            valorOriginal: "R$ 200",
            localRetirada: "Rio Tavares - Florianópolis",
            descricaoGeral: "Liquidificador Britânia Diamante 900W, ideal para sucos, vitaminas, molhos e muito mais.",
            especificacoesHTML: `
                <ul>
                    <li>Potência: 900W</li>
                    <li>Capacidade do copo: 2,65 litros</li>
                    <li>Velocidades: 4 velocidades + função pulsar</li>
                    <li>Funções Adicionais: Autolimpeza</li>
                    <li>Lâminas: Resistentes e afiadas</li>
                    <li>Copo: Com medidor e tampa com dosador</li>
                </ul>`,
            estadoProduto: "Usado, mas em ótimo funcionamento. Pode apresentar sinais leves de uso. Todas as peças e lâminas afiadas. Funciona perfeitamente."
        }
    }
];
let cartItems = [];
let userLikedItems = JSON.parse(localStorage.getItem('userLikedItemsBazarV2')) || {};
let productLikesCount = JSON.parse(localStorage.getItem('productLikesCountBazarV2')) || {};

const whatsappNumber = "5548984138601";
const productListContainer = document.getElementById('productList');
const orderPanel = document.getElementById('orderPanel');
const orderPanelHeader = document.getElementById('orderPanelHeader');
const orderSummaryTextEl = document.getElementById('orderSummaryText');
const toggleOrderDetailsBtn = document.getElementById('toggleOrderDetailsBtn');
const orderItemsListEl = document.getElementById('orderItemsList');
const sendOrderBtn = document.getElementById('sendOrderBtn');

// Modal elements
const productDetailsModal = document.getElementById('productDetailsModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductPriceInfo = document.getElementById('modalProductPriceInfo');
const modalProductGeneralDescription = document.getElementById('modalProductGeneralDescription');
const modalProductSpecifications = document.getElementById('modalProductSpecifications');
const modalProductState = document.getElementById('modalProductState');
const modalProductObservationsSection = document.getElementById('modalProductObservationsSection');
const modalProductObservations = document.getElementById('modalProductObservations');
const modalProductPickupLocation = document.getElementById('modalProductPickupLocation');
const modalOlxBtn = document.getElementById('modalOlxBtn');

// Supabase config
const SUPABASE_URL = "https://jkxohciuzlxdccfxxizy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreG9oY2l1emx4ZGNjZnh4aXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTUzOTksImV4cCI6MjA2NDg5MTM5OX0.gXGBTPT0dyxn6LH4JbTW8UUg6sb3dmomwHhZIfnr6zc";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadLikesFromSupabase() {
  const { data, error } = await supabase.from('likes').select('*');
  if (!error && data) {
    productLikesCount = {};
    data.forEach(row => {
      productLikesCount[row.product_id] = row.count;
    });
    products.forEach(product => updateLikeButtonState(product.id));
  }
}

async function updateLikeInSupabase(productId, newCount) {
  await supabase.from('likes').upsert({ product_id: productId, count: newCount });
}

function initializeProductLikes() {
    const storedLikes = JSON.parse(localStorage.getItem('productLikesCountBazarV2'));
    if (storedLikes) {
        productLikesCount = storedLikes;
    }
    products.forEach(product => {
        if (productLikesCount[product.id] === undefined) {
            productLikesCount[product.id] = 0;
        }
    });
}

function parsePrice(priceStr) { return parseFloat(String(priceStr).replace("R$ ", "").replace(/\./g, "").replace(",", ".")); }
products.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

function toggleOrderPanelVisibility() {
    if (cartItems.length > 0) {
        orderPanel.classList.add('visible');
        document.body.classList.add('order-panel-padding');
    } else {
        orderPanel.classList.remove('visible');
        orderPanel.classList.remove('expanded');
        const iconImg = toggleOrderDetailsBtn.querySelector('img.icon-svg');
        if (iconImg) {
            iconImg.style.transform = '';
        }
        document.body.classList.remove('order-panel-padding');
    }
}

function updateOrderSummaryText() {
    const itemCount = cartItems.length;
    orderSummaryTextEl.textContent = `Seu Pedido (${itemCount} item${itemCount !== 1 ? 's' : ''})`;
}

function renderOrderItemsList() {
    orderItemsListEl.innerHTML = '';
    if (cartItems.length > 0) {
         cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.shortName} (${item.price})`;
            orderItemsListEl.appendChild(li);
        });
    }
    updateOrderSummaryText();
    toggleOrderPanelVisibility();
}

function updateCartActionButtonState(productId) {
    const button = document.querySelector(`.cart-action-btn[data-product-id="${productId}"]`);
    if (!button) return;
    const iconImg = button.querySelector('.icon-svg');
    const textSpan = button.querySelector('span:not(.icon-svg)'); // Garante que pega o span correto
    
    // Verifica se o produto está vendido antes de verificar o carrinho
    const product = products.find(p => p.id === productId);
    if (product && product.status === 'vendido') {
        // Esta parte já é tratada em renderProductList, mas é uma segurança adicional
        if (iconImg) iconImg.src = 'icons/block.svg'; // Use um ícone apropriado para "vendido"
        if (iconImg) iconImg.alt = 'Vendido';
        if (textSpan) textSpan.textContent = 'Vendido';
        button.disabled = true;
        button.classList.add('disabled-btn', 'sold-cart-btn');
        button.classList.remove('add', 'remove');
        return;
    }

    if (cartItems.some(item => item.id === productId)) {
        button.classList.remove('add');
        button.classList.add('remove');
        if (iconImg) iconImg.src = 'icons/remove_shopping_cart.svg';
        if (iconImg) iconImg.alt = 'Remover do carrinho';
        if (textSpan) textSpan.textContent = 'Remover';
    } else {
        button.classList.remove('remove');
        button.classList.add('add');
        if (iconImg) iconImg.src = 'icons/add_shopping_cart.svg';
        if (iconImg) iconImg.alt = 'Adicionar ao carrinho';
        if (textSpan) textSpan.textContent = 'Adicionar';
    }
}

function toggleCartItem(product) {
    if (product.status === 'vendido') {
        alert("Este item já foi vendido e não pode ser adicionado ao pedido.");
        return; 
    }

    const productIndex = cartItems.findIndex(item => item.id === product.id);
    if (productIndex > -1) {
        cartItems.splice(productIndex, 1);
    } else {
        cartItems.push(product);
    }
    renderOrderItemsList();
    updateCartActionButtonState(product.id);
}

function sendOrderToWhatsApp() { 
    if (cartItems.length === 0) { 
        alert("Seu pedido está vazio!"); 
        return; 
    } 
    let message = "Olá! Tenho interesse nos seguintes itens do bazar:\n"; 
    let totalPrice = 0; 
    cartItems.forEach(item => { 
        message += `- ${item.fullName} (${item.price})\n`; 
        totalPrice += parsePrice(item.price); 
    }); 
    message += `\nValor Total Estimado: R$ ${totalPrice.toFixed(2).replace(".", ",")}`; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`; 
    window.open(whatsappUrl, '_blank'); 
}

function updateLikeButtonState(productId) {
    const likeButton = document.querySelector(`.like-btn[data-product-id="${productId}"]`);
    const likeCountSpan = document.querySelector(`.like-count[data-product-id="${productId}"]`);
    if (!likeButton || !likeCountSpan) return;

    if (userLikedItems[productId]) {
        likeButton.classList.add('liked');
    } else {
        likeButton.classList.remove('liked');
    }
    likeCountSpan.textContent = productLikesCount[productId] || 0;
}

function toggleLike(productId) {
    // Opcional: Impedir likes em itens vendidos
    // const product = products.find(p => p.id === productId);
    // if (product && product.status === 'vendido') {
    //     return;
    // }

    if (userLikedItems[productId]) {
        delete userLikedItems[productId];
        productLikesCount[productId] = Math.max(0, (productLikesCount[productId] || 1) - 1);
    } else {
        userLikedItems[productId] = true;
        productLikesCount[productId] = (productLikesCount[productId] || 0) + 1;
    }
    localStorage.setItem('userLikedItemsBazarV2', JSON.stringify(userLikedItems));
    updateLikeInSupabase(productId, productLikesCount[productId]);
    updateLikeButtonState(productId);
}

function toggleOrderDetailsView() {
    orderPanel.classList.toggle('expanded');
    const iconImg = toggleOrderDetailsBtn.querySelector('.icon-svg');
    if (iconImg) {
        if (orderPanel.classList.contains('expanded')) {
            iconImg.src = 'icons/arrow_drop_down.svg'; 
            iconImg.alt = 'Recolher detalhes';
            iconImg.style.transform = 'rotate(180deg)';
        } else {
            iconImg.src = 'icons/arrow_drop_down.svg'; 
            iconImg.alt = 'Expandir detalhes';
            iconImg.style.transform = '';
        }
    }
}

function getProductImageBaseName(imageSrc) {
    return imageSrc.replace(/^images\//, '').replace(/(-400|-200|-700)?\.(webp|png|jpg|jpeg)$/i, '');
}

function getProductPictureHTML(product, className = 'product-image', width = 400, height = 400) {
    const baseName = getProductImageBaseName(product.imageSrc);
    return `
        <picture>
            <source srcset="images/${baseName}-700.webp 700w, images/${baseName}-400.webp 400w, images/${baseName}-200.webp 200w" sizes="(max-width: 700px) 100vw, 700px">
            <img src="images/${baseName}-400.webp" alt="${product.shortName}" class="${className}" width="${width}" height="${height}" loading="lazy" />
        </picture>
    `;
}

// --- MODAL FUNCTIONS ---
function showProductDetailsModal(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) { 
        console.error("Produto não encontrado para o ID:", productId);
        return;
    }

    if (product.status === 'vendido') {
        console.log("Tentativa de ver detalhes de item vendido:", productId);
        // Opcional: alert("Este item já foi vendido.");
        return; 
    }

    if (!product.detailedInfo) {
        console.error("Detalhes do produto não encontrados para:", productId);
        return;
    }
    
    const modalImageContainer = document.getElementById('modalImageContainer');
    if (!modalImageContainer) {
        console.error("Elemento #modalImageContainer não encontrado no HTML do modal.");
        return;
    }
    modalImageContainer.innerHTML = getProductPictureHTML(product, 'modal-product-image', 400, 400);
    
    modalProductTitle.textContent = product.fullName;
    modalProductPriceInfo.innerHTML = `<strong>${product.price}</strong> <span class="original-price">${product.detailedInfo.valorOriginal}</span>`;
    modalProductGeneralDescription.textContent = product.detailedInfo.descricaoGeral;
    modalProductSpecifications.innerHTML = product.detailedInfo.especificacoesHTML;
    modalProductState.textContent = product.detailedInfo.estadoProduto;
    modalProductPickupLocation.textContent = product.detailedInfo.localRetirada;

    if (product.detailedInfo.observacoes) {
        modalProductObservations.textContent = product.detailedInfo.observacoes;
        modalProductObservationsSection.style.display = 'block';
    } else {
        modalProductObservationsSection.style.display = 'none';
    }
    modalOlxBtn.href = product.olxLink;
    productDetailsModal.classList.add('visible');
}

function closeProductDetailsModal() {
    productDetailsModal.classList.remove('visible');
}
// --- END MODAL FUNCTIONS ---

function renderProductList() {
    productListContainer.innerHTML = '';
    products.forEach(product => {
        const itemElement = document.createElement('section');
        itemElement.classList.add('product-list-item');
        itemElement.setAttribute('data-product-id', product.id);
        itemElement.setAttribute('data-clarity-section', 'product');
        itemElement.setAttribute('aria-label', product.shortName);

        const isSold = product.status === 'vendido';

        if (isSold) {
            itemElement.classList.add('sold-item');
        }

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image-container');
        imageContainer.innerHTML = getProductPictureHTML(product, 'product-image', 400, 400);

        if (isSold) {
            const soldOverlay = document.createElement('div');
            soldOverlay.classList.add('sold-overlay');
            soldOverlay.innerHTML = '<span>VENDIDO</span>';
            imageContainer.appendChild(soldOverlay);
        }
        itemElement.appendChild(imageContainer);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('product-details');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');
        infoDiv.innerHTML = ` <p class="name">${product.shortName}</p> <p class="price">${product.price}</p> <p class="description">${product.description}</p> `;
        detailsDiv.appendChild(infoDiv);

        const actionsToolbarDiv = document.createElement('div');
        actionsToolbarDiv.classList.add('product-actions-toolbar');

        const likeSectionDiv = document.createElement('div');
        likeSectionDiv.classList.add('like-section');
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.setAttribute('data-product-id', product.id);
        likeButton.setAttribute('data-clarity-event', 'like');
        likeButton.setAttribute('data-clarity-product', product.shortName);
        likeButton.title = "Curtir";
        likeButton.innerHTML = `<img src="icons/favorite.svg" alt="Curtir" class="icon-svg">`;
        likeButton.onclick = () => toggleLike(product.id);
        
        const likeCountSpan = document.createElement('span');
        likeCountSpan.classList.add('like-count');
        likeCountSpan.setAttribute('data-product-id', product.id);
        likeSectionDiv.appendChild(likeButton);
        likeSectionDiv.appendChild(likeCountSpan);
        actionsToolbarDiv.appendChild(likeSectionDiv);

        const actionButtonsDiv = document.createElement('div');
        actionButtonsDiv.classList.add('action-buttons');

        const detailsButton = document.createElement('button');
        detailsButton.classList.add('btn', 'details-btn');
        detailsButton.title = "Mais Detalhes do Produto";
        detailsButton.setAttribute('data-product-id', product.id);
        detailsButton.setAttribute('data-clarity-event', 'details');
        detailsButton.setAttribute('data-clarity-product', product.shortName);
        detailsButton.innerHTML = `<img src="icons/info.svg" alt="Info" class="icon-svg"> Info`;
        if (isSold) {
            detailsButton.disabled = true;
            detailsButton.classList.add('disabled-btn');
        } else {
            detailsButton.onclick = () => showProductDetailsModal(product.id);
        }
        actionButtonsDiv.appendChild(detailsButton);

        const cartActionButton = document.createElement('button');
        cartActionButton.classList.add('btn', 'cart-action-btn');
        cartActionButton.setAttribute('data-product-id', product.id);
        cartActionButton.setAttribute('data-clarity-event', 'cart');
        cartActionButton.setAttribute('data-clarity-product', product.shortName);
        
        if (isSold) {
            cartActionButton.innerHTML = `<img src="icons/block.svg" alt="Vendido" class="icon-svg"><span>Vendido</span>`; // Ícone para vendido
            cartActionButton.disabled = true;
            cartActionButton.classList.add('disabled-btn', 'sold-cart-btn');
        } else {
            cartActionButton.innerHTML = `<img src="icons/add_shopping_cart.svg" alt="Adicionar ao carrinho" class="icon-svg"><span>Adicionar</span>`;
            cartActionButton.onclick = () => toggleCartItem(product);
        }
        actionButtonsDiv.appendChild(cartActionButton);

        actionsToolbarDiv.appendChild(actionButtonsDiv);
        detailsDiv.appendChild(actionsToolbarDiv);
        itemElement.appendChild(detailsDiv);
        productListContainer.appendChild(itemElement);

        if (!isSold) {
            updateCartActionButtonState(product.id);
        }
        updateLikeButtonState(product.id);
    });
}

orderPanelHeader.addEventListener('click', (event) => {
    if (event.target === toggleOrderDetailsBtn || toggleOrderDetailsBtn.contains(event.target)) {
        return;
    }
    toggleOrderDetailsView();
});
toggleOrderDetailsBtn.addEventListener('click', toggleOrderDetailsView);
sendOrderBtn.onclick = sendOrderToWhatsApp;

// Modal event listeners
modalCloseBtn.addEventListener('click', closeProductDetailsModal);
productDetailsModal.addEventListener('click', (event) => { 
    if (event.target === productDetailsModal) {
        closeProductDetailsModal();
    }
});

initializeProductLikes();
renderProductList();
renderOrderItemsList();
loadLikesFromSupabase();

const heroSection = document.querySelector('.hero-section');
function handleHeroOpacityOnScroll() {
    if (window.scrollY > 10) {
        heroSection.classList.add('hero-hidden');
    } else {
        heroSection.classList.remove('hero-hidden');
    }
}
window.addEventListener('scroll', handleHeroOpacityOnScroll, { passive: true });
handleHeroOpacityOnScroll();