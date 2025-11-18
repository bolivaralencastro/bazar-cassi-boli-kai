# Arquitetura do Bazar da Cassi, Boli e Kai

## 📋 Visão Geral

O aplicativo é uma **SPA (Single Page Application)** tradicional desenvolvida com HTML, CSS e JavaScript vanilla, sem frameworks. A estrutura de dados vem de um arquivo JSON local e integra opcionalmente com Supabase para contagem de likes.

---

## 🏗️ Hierarquia de Componentes

### 1. Camada de Apresentação (HTML)

```
<body>
├── Hero Section
│   └── <picture> (imagem responsiva)
│
├── <main>
│   ├── Welcome Card
│   │   ├── Título e descrição
│   │   └── Contador de vendidos
│   │
│   └── Product List Container (#productList)
│       └── [Product Cards - gerados dinamicamente]
│
├── Order Panel (Painel fixo inferior)
│   ├── Header (resumo + botão expandir)
│   ├── Items List (lista de itens)
│   └── Send Order Button
│
└── Product Details Modal
    ├── Header fixo (título + botão fechar)
    ├── Content scrollable
    │   ├── Imagem
    │   ├── Preço
    │   ├── Descrição
    │   ├── Especificações
    │   ├── Estado
    │   ├── Observações (condicional)
    │   └── Local de retirada
    └── Footer fixo (botões OLX e Adicionar)
```

### 2. Camada de Lógica (JavaScript)

O `script.js` está organizado em **módulos funcionais** usando um IIFE pattern:

```javascript
(function() {
    // Módulos organizados hierarquicamente:
    
    ├── ClarityService        // Tracking de analytics
    ├── APP_CONFIG           // Constantes da aplicação
    ├── state                // Estado global da aplicação
    ├── DOM                  // Referências aos elementos
    ├── Utils                // Funções auxiliares
    ├── DataService          // Carregamento de dados
    ├── UI                   // Renderização e interações visuais
    ├── Likes                // Gerenciamento de curtidas
    ├── Cart                 // Carrinho de compras
    └── App                  // Inicialização e orquestração
})();
```

---

## 🧩 Componentes Principais

### A. Product Card (gerado dinamicamente)

```
.product-list-item
├── .product-image-container
│   ├── <picture> (imagem responsiva)
│   └── .sold-overlay (se vendido)
│
└── .product-details
    ├── .product-info
    │   ├── Nome (h3)
    │   ├── Preço
    │   └── Descrição
    │
    └── .product-actions-toolbar
        ├── .like-section
        │   ├── Botão curtir (.btn-like)
        │   └── Contador de likes (.like-count)
        │
        └── .action-buttons
            ├── Botão "Info" (.details-btn)
            └── Botão "Adicionar/Remover" (.cart-action-btn)
```

**Funcionalidades:**
- Exibição de informações básicas do produto
- Sistema de curtidas (local + Supabase)
- Adição/remoção do carrinho
- Abertura do modal de detalhes
- Overlay visual para produtos vendidos

### B. Order Panel (painel de pedidos)

```
#orderPanel (.order-panel)
├── .order-panel-header
│   ├── #orderSummaryText (contador de itens)
│   └── #toggleOrderDetailsBtn (expandir/recolher)
│
├── #orderItemsList (.order-items-list)
│   └── [Lista de itens com botão remover]
│
└── #sendOrderBtn (.send-order-btn)
```

**Funcionalidades:**
- Painel fixo no rodapé (aparece quando há itens)
- Expansível/recolhível
- Lista de itens selecionados
- Remoção individual de itens
- Envio do pedido via WhatsApp

### C. Product Details Modal

```
.modal-overlay
└── .modal-dialog
    ├── .modal-header-fixed
    │   ├── #modalProductTitle
    │   └── #modalCloseBtn (×)
    │
    ├── .modal-content-scrollable
    │   ├── #modalImageContainer
    │   ├── Seção Valor (#modalProductPriceInfo)
    │   ├── Seção Descrição Geral
    │   ├── Seção Especificações
    │   ├── Seção Estado do Produto
    │   ├── Seção Observações (condicional)
    │   └── Seção Local de Retirada
    │
    └── .modal-footer-fixed
        ├── #modalOlxBtn (link externo)
        └── #modalAddToCartBtn
```

**Funcionalidades:**
- Exibição detalhada do produto
- Imagens responsivas
- Informações completas (specs, estado, observações)
- Link para OLX (quando disponível)
- Adição ao carrinho
- Gerenciamento de foco para acessibilidade
- Fechamento via ESC ou clique fora

---

## 🔄 Fluxo de Dados

```
1. Inicialização
   App.initialize()
   ↓
2. Carregamento de Dados
   DataService.loadProducts() → fetch('data/products.json')
   DataService.initializeSupabase()
   ↓
3. Carregamento de Likes
   Likes.initialize()
   ├── localStorage (likes do usuário)
   └── DataService.loadLikesFromSupabase() (contagem global)
   ↓
4. Renderização Inicial
   UI.renderProductList()
   UI.renderOrderItemsList()
   ↓
5. Interações do Usuário
   ├── Curtir produto
   │   └── Likes.toggle() → localStorage + Supabase
   │
   ├── Adicionar ao carrinho
   │   └── Cart.toggleItem() → UI.renderOrderItemsList()
   │
   ├── Ver detalhes
   │   └── UI.showProductDetailsModal()
   │
   └── Enviar pedido
       └── Cart.sendOrderToWhatsApp() → WhatsApp Web/API
```

---

## 📦 Estado Global

```javascript
state = {
    products: [],                    // Array de produtos carregados do JSON
    cartItems: [],                   // Itens adicionados ao carrinho
    userLikedItems: {},              // Likes do usuário (localStorage)
    productLikesCount: {},           // Contagem total de likes (Supabase)
    currentProductInModal: null,     // Produto sendo visualizado no modal
    supabase: null,                  // Cliente Supabase (se disponível)
    elementThatTriggeredModal: null  // Elemento que abriu o modal (a11y)
}
```

---

## 📁 Estrutura de Arquivos

```
bazar-cassi-boli-kai/
├── index.html              # Estrutura HTML principal
├── script.js              # Lógica da aplicação
├── style.css              # Estilos e responsividade
├── README.md              # Documentação do projeto
├── ARQUITETURA.md         # Este arquivo
│
├── data/
│   └── products.json      # Base de dados de produtos
│
├── icons/                 # Ícones SVG do Material Design
│   ├── add_shopping_cart.svg
│   ├── remove_shopping_cart.svg
│   ├── favorite.svg
│   ├── favorite_fill.svg
│   ├── info.svg
│   ├── shopping_bag.svg
│   ├── arrow_drop_down.svg
│   ├── check_circle.svg
│   └── block.svg
│
└── images/                # Imagens dos produtos e hero
    ├── background-pattern.svg
    ├── cassi-boli-kai-bazar-*.webp (200/400/700)
    └── [produto]-*.webp (200/400/700)
```

---

## 🎨 Recursos de UI/UX

### Responsividade
- **Imagens**: Múltiplas resoluções (200px, 400px, 700px) em formato WebP
- **Layout**: Breakpoints em 600px e 739px
- **Modal**: Full screen em mobile, centralizado em desktop

### Acessibilidade
- **ARIA labels**: Todos os botões interativos
- **Gerenciamento de foco**: Modal retorna foco ao elemento que o abriu
- **Atributos semânticos**: `aria-pressed`, `aria-hidden`, `aria-expanded`
- **Navegação por teclado**: ESC fecha modal, Enter/Space ativam ações

### Performance
- **Lazy loading**: Imagens carregadas sob demanda
- **Event delegation**: Listeners otimizados
- **Debouncing**: Scroll events com `passive: true`
- **Imagens responsivas**: `<picture>` com srcset e sizes

### Analytics
- **Microsoft Clarity**: Tracking de eventos e comportamento
- **Eventos rastreados**:
  - Visualização de detalhes do produto
  - Toggle de likes
  - Adição/remoção do carrinho
  - Tentativa de envio de pedido
  - Cliques em links OLX
  - Interação com produtos vendidos

### Persistência
- **LocalStorage**: Likes do usuário (chave: `bazarV2_userLikedItems`)
- **Supabase**: Contagem global de likes sincronizada

---

## 🔌 Integrações Externas

### 1. Supabase
- **Função**: Banco de dados para contagem global de likes
- **Tabela**: `likes` (product_id, count)
- **Operações**: Read (SELECT), Upsert (INSERT/UPDATE)
- **Fallback**: Funciona offline se Supabase indisponível

### 2. Microsoft Clarity
- **Função**: Analytics e heatmaps
- **ID**: `rvud1vnpxa`
- **Eventos customizados**: Via `ClarityService`

### 3. WhatsApp API
- **Função**: Envio de pedidos
- **Número**: `5548984138601`
- **Formato**: 
  - Mobile: `https://wa.me/[número]`
  - Desktop: `https://web.whatsapp.com/send?phone=[número]`

### 4. OLX
- **Função**: Links para anúncios dos produtos
- **Implementação**: Links diretos em `product.olxLink`

---

## 🛠️ Módulos JavaScript Detalhados

### ClarityService
```javascript
// Wrapper para Microsoft Clarity
├── _isClarityAvailable()      // Verifica disponibilidade
├── setCustomTag(key, value)   // Define tags customizadas
├── triggerEvent(eventName)    // Dispara eventos
└── trackEventWithTags(...)    // Evento + tags em uma chamada
```

### DataService
```javascript
├── loadProducts()              // Carrega products.json
├── initializeSupabase()        // Inicializa cliente Supabase
├── loadLikesFromSupabase()     // Busca contagem de likes
└── updateLikeInSupabase()      // Atualiza like no banco
```

### UI
```javascript
├── getProductPictureHTML()           // Gera HTML <picture> responsivo
├── updateLikeButtonState()           // Atualiza visual do botão de like
├── updateCartActionButtonState()     // Atualiza botão adicionar/remover
├── renderOrderItemsList()            // Renderiza lista do carrinho
├── updateOrderSummaryText()          // Atualiza contador de itens
├── toggleOrderPanelVisibility()      // Mostra/esconde painel
├── toggleOrderDetailsView()          // Expande/recolhe detalhes
├── showProductDetailsModal()         // Abre modal com detalhes
├── closeProductDetailsModal()        // Fecha modal
├── _createProductCardElement()       // Cria elemento de produto
├── renderProductList()               // Renderiza lista completa
└── handleHeroOpacityOnScroll()       // Efeito de fade no hero
```

### Likes
```javascript
├── initialize()     // Carrega likes do localStorage + Supabase
└── toggle()        // Adiciona/remove like
```

### Cart
```javascript
├── toggleItem()              // Adiciona/remove item do carrinho
└── sendOrderToWhatsApp()     // Gera mensagem e abre WhatsApp
```

### Utils
```javascript
├── parsePrice()                // Converte "R$ 1.234,56" → 1234.56
├── getProductImageBaseName()   // Extrai nome base da imagem
├── getProductById()            // Busca produto por ID
└── showUserMessage()           // Exibe mensagem de erro/info
```

---

## 📊 Estrutura de Dados (products.json)

```json
{
  "id": "string",                    // Identificador único
  "imageSrc": "string",              // Caminho da imagem principal
  "shortName": "string",             // Nome curto para listagem
  "fullName": "string",              // Nome completo
  "price": "string",                 // Formato: "R$ X.XXX,XX"
  "description": "string",           // Descrição breve
  "olxLink": "string",               // URL do anúncio OLX (opcional)
  "status": "disponivel|vendido",    // Status do produto
  "detailedInfo": {
    "valorOriginal": "string",       // Preço original (opcional)
    "localRetirada": "string",       // Local de retirada
    "descricaoGeral": "string",      // Descrição detalhada
    "especificacoesHTML": "string",  // HTML com specs (<ul><li>...)
    "estadoProduto": "string",       // Condição do item
    "observacoes": "string"          // Observações adicionais (opcional)
  }
}
```

---

## 🎯 Princípios de Design

### Separação de Responsabilidades
- **DOM**: Apenas referências
- **Utils**: Funções puras reutilizáveis
- **DataService**: Camada de dados isolada
- **UI**: Renderização e atualização visual
- **Lógica de negócio**: Módulos Likes e Cart

### Modularidade
- Cada módulo tem uma responsabilidade clara
- Facilita testes e manutenção
- Permite extensão sem modificar código existente

### Progressive Enhancement
- Funciona sem JavaScript (HTML semântico)
- Funciona sem Supabase (localStorage local)
- Funciona sem Clarity (degrada graciosamente)

### Mobile First
- Layout otimizado para mobile
- Media queries para desktop
- Touch-friendly (botões grandes, áreas de toque adequadas)

---

## 🔐 Segurança

- **Content Security Policy**: Comentado no HTML (pode ser ativado)
- **Supabase Row Level Security**: Configurado no backend
- **HTTPS**: Obrigatório para produção
- **Sanitização**: Nenhum `innerHTML` com dados de usuário

---

## 🚀 Performance

### Otimizações Implementadas
- Imagens WebP otimizadas (3 resoluções)
- Lazy loading nativo em imagens
- Eventos de scroll com `passive: true`
- Minimização de reflows/repaints
- Event delegation para elementos dinâmicos

### Métricas Alvo
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 100ms

---

## 🧪 Testes Recomendados

### Testes Manuais
- [ ] Adicionar/remover itens do carrinho
- [ ] Curtir/descurtir produtos
- [ ] Abrir/fechar modal de detalhes
- [ ] Expandir/recolher painel de pedidos
- [ ] Enviar pedido via WhatsApp
- [ ] Navegação por teclado
- [ ] Leitores de tela

### Testes de Responsividade
- [ ] Mobile (320px - 739px)
- [ ] Tablet (740px - 1023px)
- [ ] Desktop (1024px+)

### Testes de Integração
- [ ] Sincronização de likes com Supabase
- [ ] Eventos do Clarity sendo disparados
- [ ] Links do WhatsApp funcionando
- [ ] Links da OLX abrindo corretamente

---

## 📝 Notas de Implementação

### Por que Vanilla JS?
- Projeto pequeno, sem necessidade de framework
- Performance superior
- Zero dependências no frontend
- Código mais leve e rápido

### Por que Supabase?
- Backend as a Service gratuito
- PostgreSQL robusto
- Real-time capabilities (futuro)
- Row Level Security nativo

### Por que WebP?
- Redução de ~30% no tamanho vs JPEG
- Suporte amplo nos navegadores modernos
- Qualidade visual mantida

---

## 🔮 Possíveis Melhorias Futuras

1. **PWA** (Progressive Web App)
   - Service Worker para cache
   - Funcionamento offline
   - Instalável

2. **Real-time**
   - Atualização de produtos vendidos em tempo real
   - Contador de likes sincronizado

3. **Busca e Filtros**
   - Filtro por preço, categoria, status
   - Busca por nome/descrição

4. **Favoritos Persistentes**
   - Sincronizar likes com Supabase por usuário
   - Login social opcional

5. **Compartilhamento**
   - Compartilhar produtos via redes sociais
   - Links diretos para produtos específicos

6. **Admin Panel**
   - Adicionar/editar produtos via interface
   - Dashboard de analytics
   - Gerenciamento de pedidos

---

**Última atualização**: 18 de novembro de 2025
