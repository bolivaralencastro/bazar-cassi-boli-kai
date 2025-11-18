# Bazar Cassi Boli Kai

![Bazar Cassi Boli Kai](docs/images/cassi-boli-kai-bazar-open-graph.webp)

## Sobre o Projeto

O **Bazar Cassi Boli Kai** é um marketplace online que criamos para vender itens que fizeram parte da nossa história familiar durante uma mudança de vida. Lançado em meados de junho, o site virou um verdadeiro bazar virtual do nosso lar em Florianópolis. Viajamos para São Paulo em julho, e, incrivelmente, todos os 24 itens foram vendidos!

Este projeto não apenas facilitou a transição, mas também capturou nossa criatividade em transformar uma necessidade prática em uma experiência acolhedora e interativa. Mesmo com tudo vendido, o site permanece como uma memória viva de como abordamos essa etapa com inovação, usando tecnologia simples para conectar pessoas e itens com novas histórias. Navegue, veja os detalhes e sinta a energia desse capítulo especial da nossa família.

## Instrução Técnica

O projeto foi desenvolvido com foco em modularidade, performance e manutenção. Optamos por **JavaScript ES Modules** para organizar o código em módulos separados (config, state, utils, services, components, features), facilitando a escalabilidade e testabilidade. Para o CSS, implementamos um **design system SCSS** enxuto, utilizando tokens para cores, espaçamentos e z-index, mixins para reutilização (como botões e layouts flexíveis), e uma estrutura organizada em abstracts, base, components e utilities. A compilação é feita com Sass via npm scripts, gerando arquivos otimizados na pasta `docs/` para deploy. A estrutura de pastas separa fontes (`src/`) de build (`docs/`), e o site é hospedado no GitHub Pages, com build automático via scripts. Escolhemos tecnologias leves como HTML5, CSS3 e JS vanilla para evitar dependências desnecessárias, priorizando acessibilidade e carregamento rápido.

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página.
- **SCSS/Sass**: Pré-processador para estilos modulares e eficientes.
- **JavaScript ES6+**: Lógica modular com módulos nativos.
- **GitHub Pages**: Hospedagem gratuita e simples para sites estáticos.

## Como Executar

### Pré-requisitos
- Node.js instalado (para compilar o SCSS).

### Instalação e Execução
1. Clone o repositório:
   ```bash
   git clone https://github.com/bolivaralencastro/bazar-cassi-boli-kai.git
   cd bazar-cassi-boli-kai
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile o CSS:
   ```bash
   npm run build:css
   ```

4. Abra o arquivo `docs/index.html` em um navegador ou use um servidor local:
   ```bash
   npx serve docs/
   ```

Para desenvolvimento, use o watch mode:
```bash
npm run watch:css
```

## Funcionalidades

- **Lista de Produtos**: Exibição dinâmica de produtos com imagens responsivas.
- **Carrinho de Compras**: Adicionar/remover itens e enviar pedido via WhatsApp.
- **Sistema de Likes**: Curtir produtos (armazenado localmente e remotamente via Supabase).
- **Modal de Detalhes**: Visualizar informações completas de um produto.
- **Responsividade**: Layout adaptável para desktop e mobile.

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou pull request para sugestões e melhorias.

## Licença

Este projeto está sob a licença ISC.