// js/script.js
(function () {
    "use strict"; // Ajuda a pegar erros comuns

    // --- CONFIGURAÇÕES GLOBAIS DA APLICAÇÃO ---
    const APP_CONFIG = {
        WHATSAPP_NUMBER: "5548984138601",
        SUPABASE_URL: "__SUPABASE_URL__",
        SUPABASE_ANON_KEY: "__SUPABASE_ANON_KEY__",
        LOCAL_STORAGE_LIKES_KEY: 'bazarV2_userLikedItems',
        PRODUCTS_JSON_PATH: 'data/products.json',
        DEFAULT_ERROR_MESSAGE: "<p class=\"error-message\">Desculpe, algo deu errado. Por favor, tente recarregar a página.</p>",
        PRODUCTS_LOAD_ERROR_MESSAGE: "<p class=\"error-message\">Desculpe, não foi possível carregar os produtos no momento. Por favor, tente recarregar a página.</p>",
        NO_PRODUCTS_MESSAGE: "<p>Nenhum produto disponível no momento.</p>"
    };

    // --- ESTADO DA APLICAÇÃO (Escopo do Módulo) ---
    let state = {
        products: [],
        cartItems: [],
        userLikedItems: {}, // productId: true
        productLikesCount: {}, // productId: count
        currentProductInModal: null,
        supabase: null
    };

    // --- SELETORES DO DOM (Constantes) ---
    const DOM = {
        productListContainer: document.getElementById('productList'),
        heroSection: document.querySelector('.hero-section'),
        orderPanel: document.getElementById('orderPanel'),
        orderPanelHeader: document.getElementById('orderPanelHeader'),
        orderSummaryTextEl: document.getElementById('orderSummaryText'),
        toggleOrderDetailsBtn: document.getElementById('toggleOrderDetailsBtn'),
        orderItemsListEl: document.getElementById('orderItemsList'),
        sendOrderBtn: document.getElementById('sendOrderBtn'),
        productDetailsModal: document.getElementById('productDetailsModal'),
        modalCloseBtn: document.getElementById('modalCloseBtn'),
        modalImageContainer: document.getElementById('modalImageContainer'),
        modalProductTitle: document.getElementById('modalProductTitle'),
        modalProductPriceInfo: document.getElementById('modalProductPriceInfo'),
        modalProductGeneralDescription: document.getElementById('modalProductGeneralDescription'),
        modalProductSpecifications: document.getElementById('modalProductSpecifications'),
        modalProductState: document.getElementById('modalProductState'),
        modalProductObservationsSection: document.getElementById('modalProductObservationsSection'),
        modalProductObservations: document.getElementById('modalProductObservations'),
        modalProductPickupLocation: document.getElementById('modalProductPickupLocation'),
        modalOlxBtn: document.getElementById('modalOlxBtn'),
        modalAddToCartBtn: document.getElementById('modalAddToCartBtn')
    };

    // --- MÓDULO DE UTILIDADES ---
    const Utils = {
        parsePrice: (priceStr) => {
            if (typeof priceStr !== 'string') return 0;
            return parseFloat(priceStr.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
        },
        getProductImageBaseName: (imageSrc) => {
            if (typeof imageSrc !== 'string') return '';
            return imageSrc.replace(/^images\//, '').replace(/(-[0-9]+)?\.(webp|png|jpg|jpeg)$/i, '');
        },
        getProductById: (productId) => state.products.find(p => p.id === productId),
        showUserMessage: (element, message, isError = true) => {
            if (element) {
                element.innerHTML = message;
                if (isError) element.classList.add('error-container'); // Adicionar uma classe para estilizar erros
            }
        }
    };

    // --- MÓDULO DE API E DADOS ---
    const DataService = {
        loadProducts: async () => {
            try {
                const response = await fetch(APP_CONFIG.PRODUCTS_JSON_PATH);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, ao buscar ${APP_CONFIG.PRODUCTS_JSON_PATH}`);
                }
                state.products = await response.json();
            } catch (error) {
                console.error("DataService.loadProducts error:", error);
                Utils.showUserMessage(DOM.productListContainer, APP_CONFIG.PRODUCTS_LOAD_ERROR_MESSAGE);
                state.products = [];
            }
        },
        initializeSupabase: () => {
            if (window.supabase && APP_CONFIG.SUPABASE_URL !== "__SUPABASE_URL__") {
                try {
                    state.supabase = window.supabase.createClient(APP_CONFIG.SUPABASE_URL, APP_CONFIG.SUPABASE_ANON_KEY);
                } catch (e) {
                    console.error("Falha ao inicializar o client Supabase:", e);
                    state.supabase = null;
                }
            } else {
                if (APP_CONFIG.SUPABASE_URL === "__SUPABASE_URL__") {
                    console.warn("Placeholders de configuração do Supabase. Likes online desabilitados.");
                } else {
                    console.warn("Supabase client não encontrado. Likes online desabilitados.");
                }
            }
        },
        loadLikesFromSupabase: async () => {
            if (!state.supabase) return;
            try {
                const { data, error } = await state.supabase.from('likes').select('product_id, count');
                if (error) throw error; // Será pego pelo catch externo
                if (data) {
                    state.productLikesCount = data.reduce((acc, row) => {
                        acc[row.product_id] = row.count;
                        return acc;
                    }, {});
                }
            } catch (error) {
                console.error("DataService.loadLikesFromSupabase error:", error.message);
            }
        },
        updateLikeInSupabase: async (productId, newCount) => {
            if (!state.supabase) return;
            try {
                const { error } = await state.supabase.from('likes').upsert({ product_id: productId, count: newCount }, { onConflict: 'product_id' });
                if (error) console.error("DataService.updateLikeInSupabase error:", error.message);
            } catch (error) {
                console.error("Exceção em DataService.updateLikeInSupabase:", error);
            }
        }
    };

    // --- MÓDULO DE UI (Renderização e Manipulação do DOM) ---
    const UI = {
        getProductPictureHTML: (product, imgClass = 'product-image', baseWidth = 400, baseHeight = 400) => {
            const baseName = Utils.getProductImageBaseName(product.imageSrc);
            // Considerar adicionar alt text mais descritivo ou permitir passar como parâmetro
            return `
                <picture>
                    <source srcset="images/${baseName}-700.webp 700w, images/${baseName}-400.webp 400w, images/${baseName}-200.webp 200w" sizes="(max-width: 700px) 100vw, 700px" type="image/webp">
                    <img src="images/${baseName}-${baseWidth}.webp" alt="Imagem de ${product.shortName}" class="${imgClass}" width="${baseWidth}" height="${baseHeight}" loading="lazy" />
                </picture>
            `;
        },
        updateLikeButtonState: (productId) => {
            const product = Utils.getProductById(productId);
            if (!product || !DOM.productListContainer) return;

            const likeButton = DOM.productListContainer.querySelector(`.btn-like[data-product-id="${productId}"]`);
            const likeCountSpan = DOM.productListContainer.querySelector(`.like-count[data-product-id="${productId}"]`);
            
            if (!likeButton || !likeCountSpan) return;

            const isLiked = state.userLikedItems[productId];
            likeButton.classList.toggle('liked', isLiked);
            const iconImg = likeButton.querySelector('.icon-svg');
            if (iconImg) {
                iconImg.src = isLiked ? 'icons/favorite_fill.svg' : 'icons/favorite.svg';
                iconImg.alt = isLiked ? 'Descurtir' : 'Curtir'; // Alt text para acessibilidade
            }
            likeButton.title = isLiked ? `Descurtir ${product.shortName}` : `Curtir ${product.shortName}`;
            likeButton.setAttribute('aria-pressed', isLiked);
            likeCountSpan.textContent = state.productLikesCount[productId] || 0;
        },
        updateCartActionButtonState: (productId) => {
            const product = Utils.getProductById(productId);
            if (!product || !DOM.productListContainer) return;

            const isInCart = state.cartItems.some(item => item.id === productId);
            const isSold = product.status === 'vendido';

            // Botão na lista de produtos
            const listButton = DOM.productListContainer.querySelector(`.product-list-item .cart-action-btn[data-product-id="${productId}"]`);
            if (listButton) {
                const iconImg = listButton.querySelector('.icon-svg');
                const textSpan = listButton.querySelector('span');
                listButton.disabled = false;
                listButton.classList.remove('btn-add', 'btn-danger', 'btn-secondary', 'disabled');

                if (isSold) {
                    listButton.classList.add('btn-secondary', 'disabled');
                    if (iconImg) iconImg.src = 'icons/block.svg';
                    if (textSpan) textSpan.textContent = 'Vendido';
                    listButton.disabled = true;
                } else if (isInCart) {
                    listButton.classList.add('btn-danger');
                    if (iconImg) iconImg.src = 'icons/remove_shopping_cart.svg';
                    if (textSpan) textSpan.textContent = 'Remover';
                } else {
                    listButton.classList.add('btn-add');
                    if (iconImg) iconImg.src = 'icons/add_shopping_cart.svg';
                    if (textSpan) textSpan.textContent = 'Adicionar';
                }
            }

            // Botão no modal
            if (DOM.modalAddToCartBtn && state.currentProductInModal && state.currentProductInModal.id === productId) {
                DOM.modalAddToCartBtn.disabled = false;
                DOM.modalAddToCartBtn.classList.remove('btn-primary', 'btn-secondary', 'disabled');
                const modalIcon = DOM.modalAddToCartBtn.querySelector('.icon-svg'); // Re-seleciona para garantir
                let modalText = "Adicionar ao Pedido";
                let modalIconSrc = "icons/add_shopping_cart.svg";
                let btnClass = 'btn-primary';

                if (isSold) {
                    modalText = "Vendido";
                    modalIconSrc = "icons/block.svg";
                    DOM.modalAddToCartBtn.disabled = true;
                    btnClass = 'btn-secondary disabled';
                } else if (isInCart) {
                    modalText = "No Pedido";
                    modalIconSrc = "icons/check_circle.svg";
                    DOM.modalAddToCartBtn.disabled = true; // Usuário não pode adicionar de novo
                    btnClass = 'btn-primary disabled'; // Mantém primário, mas desabilitado
                }
                DOM.modalAddToCartBtn.className = `btn modal-action-btn ${btnClass}`; // Reseta e aplica classes
                DOM.modalAddToCartBtn.innerHTML = `<img src="${modalIconSrc}" alt="" class="icon-svg icon-svg--modal-action"> ${modalText}`;
            }
        },
        renderOrderItemsList: () => {
            if (!DOM.orderItemsListEl) return;
            DOM.orderItemsListEl.innerHTML = '';
            if (state.cartItems.length > 0) {
                state.cartItems.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.shortName} (${item.price})`;
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-order-item-btn btn icon-only'; // Adiciona classes de botão
                    removeBtn.title = `Remover ${item.shortName} do pedido`;
                    removeBtn.setAttribute('aria-label', `Remover ${item.shortName}`);
                    removeBtn.innerHTML = `<img src="icons/remove_shopping_cart.svg" alt="" class="icon-svg">`;
                    removeBtn.onclick = () => Cart.toggleItem(item);
                    li.appendChild(removeBtn);
                    DOM.orderItemsListEl.appendChild(li);
                });
            }
            UI.updateOrderSummaryText();
            UI.toggleOrderPanelVisibility();
        },
        updateOrderSummaryText: () => {
            if (!DOM.orderSummaryTextEl) return;
            const itemCount = state.cartItems.length;
            DOM.orderSummaryTextEl.textContent = `Seu Pedido (${itemCount} item${itemCount !== 1 ? 's' : ''})`;
        },
        toggleOrderPanelVisibility: () => {
            if (!DOM.orderPanel) return;
            const shouldBeVisible = state.cartItems.length > 0;
            DOM.orderPanel.classList.toggle('visible', shouldBeVisible);
            DOM.orderPanel.setAttribute('aria-hidden', String(!shouldBeVisible));
            document.body.classList.toggle('order-panel-padding', shouldBeVisible);
            if (!shouldBeVisible && DOM.orderPanel.classList.contains('expanded')) {
                UI.toggleOrderDetailsView(false);
            }
        },
        toggleOrderDetailsView: (forceState) => {
            if (!DOM.orderPanel || !DOM.toggleOrderDetailsBtn) return;
            const isExpanded = typeof forceState === 'boolean' ? forceState : !DOM.orderPanel.classList.contains('expanded');
            DOM.orderPanel.classList.toggle('expanded', isExpanded);
            DOM.orderPanel.setAttribute('aria-expanded', String(isExpanded));
            DOM.toggleOrderDetailsBtn.setAttribute('aria-expanded', String(isExpanded));
        },
        showProductDetailsModal: (productId) => {
            const product = Utils.getProductById(productId);
            if (!product || !DOM.productDetailsModal || product.status === 'vendido' || !product.detailedInfo) {
                console.warn("Não é possível abrir modal para produto:", productId, product);
                return;
            }
            state.currentProductInModal = product;

            if(DOM.modalImageContainer) DOM.modalImageContainer.innerHTML = UI.getProductPictureHTML(product, 'modal-product-image', 280, 280);
            if(DOM.modalProductTitle) DOM.modalProductTitle.textContent = product.fullName;
            if(DOM.modalProductPriceInfo) DOM.modalProductPriceInfo.innerHTML = `<strong>${product.price}</strong> <span class="original-price">${product.detailedInfo.valorOriginal || ''}</span>`;
            if(DOM.modalProductGeneralDescription) DOM.modalProductGeneralDescription.textContent = product.detailedInfo.descricaoGeral || 'Não informado.';
            if(DOM.modalProductSpecifications) DOM.modalProductSpecifications.innerHTML = product.detailedInfo.especificacoesHTML || '<p>Não informado.</p>';
            if(DOM.modalProductState) DOM.modalProductState.textContent = product.detailedInfo.estadoProduto || 'Não informado.';
            if(DOM.modalProductPickupLocation) DOM.modalProductPickupLocation.textContent = product.detailedInfo.localRetirada || 'Não informado.';

            const obsSectionVisible = product.detailedInfo.observacoes;
            if(DOM.modalProductObservationsSection) DOM.modalProductObservationsSection.style.display = obsSectionVisible ? 'block' : 'none';
            if(DOM.modalProductObservations && obsSectionVisible) DOM.modalProductObservations.textContent = product.detailedInfo.observacoes;
            
            if (DOM.modalOlxBtn) {
                DOM.modalOlxBtn.style.display = product.olxLink ? '' : 'none';
                if(product.olxLink) DOM.modalOlxBtn.href = product.olxLink;
            }
            
            UI.updateCartActionButtonState(product.id);
            DOM.productDetailsModal.classList.add('visible');
            DOM.productDetailsModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            if(DOM.modalCloseBtn) DOM.modalCloseBtn.focus();
        },
        closeProductDetailsModal: () => {
            if (!DOM.productDetailsModal) return;
            DOM.productDetailsModal.classList.remove('visible');
            DOM.productDetailsModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            state.currentProductInModal = null;
        },
        _createProductCardElement: (product) => { // Helper privado para renderProductList
            const itemElement = document.createElement('section');
            itemElement.className = 'product-list-item';
            itemElement.dataset.productId = product.id;
            itemElement.setAttribute('aria-labelledby', `product-name-${product.id}`);

            const isSold = product.status === 'vendido';
            if (isSold) itemElement.classList.add('sold-item');

            // Image Container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'product-image-container';
            imageContainer.innerHTML = UI.getProductPictureHTML(product, 'product-image', 180, 180);
            if (isSold) {
                const soldOverlay = document.createElement('div');
                soldOverlay.className = 'sold-overlay';
                soldOverlay.innerHTML = '<span>VENDIDO</span>';
                imageContainer.appendChild(soldOverlay);
            }
            itemElement.appendChild(imageContainer);

            // Details Container
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'product-details';

            // Product Info
            const infoDiv = document.createElement('div');
            infoDiv.className = 'product-info';
            infoDiv.innerHTML = `
                <h3 class="name" id="product-name-${product.id}">${product.shortName}</h3>
                <p class="price">${product.price}</p>
                <p class="description">${product.description}</p>`;
            detailsDiv.appendChild(infoDiv);

            // Actions Toolbar
            const actionsToolbarDiv = document.createElement('div');
            actionsToolbarDiv.className = 'product-actions-toolbar';

            // Like Section
            const likeSectionDiv = document.createElement('div');
            likeSectionDiv.className = 'like-section';
            const likeButton = document.createElement('button');
            likeButton.className = 'btn-like btn icon-only'; // Classes de botão
            likeButton.dataset.productId = product.id;
            likeButton.setAttribute('aria-label', `Curtir ${product.shortName}`);
            likeButton.innerHTML = `<img src="icons/favorite.svg" alt="" class="icon-svg icon-svg--like">`;
            likeButton.onclick = () => Likes.toggle(product.id);
            const likeCountSpan = document.createElement('span');
            likeCountSpan.className = 'like-count';
            likeCountSpan.dataset.productId = product.id;
            likeSectionDiv.append(likeButton, likeCountSpan);
            actionsToolbarDiv.appendChild(likeSectionDiv);

            // Action Buttons
            const actionButtonsDiv = document.createElement('div');
            actionButtonsDiv.className = 'action-buttons';
            const detailsButton = document.createElement('button');
            detailsButton.className = 'btn btn-secondary details-btn';
            detailsButton.title = `Mais detalhes sobre ${product.shortName}`;
            detailsButton.dataset.productId = product.id;
            detailsButton.innerHTML = `<img src="icons/info.svg" alt="" class="icon-svg"> Info`;
            if (isSold) detailsButton.disabled = true;
            else detailsButton.onclick = () => UI.showProductDetailsModal(product.id);
            
            const cartActionButton = document.createElement('button');
            cartActionButton.className = 'btn cart-action-btn'; // Classes base, estado será via JS
            cartActionButton.dataset.productId = product.id;
            cartActionButton.innerHTML = `<img src="icons/add_shopping_cart.svg" alt="" class="icon-svg"><span>Adicionar</span>`; // Placeholder
            if (!isSold) cartActionButton.onclick = () => Cart.toggleItem(product);
            else cartActionButton.disabled = true;

            actionButtonsDiv.append(detailsButton, cartActionButton);
            actionsToolbarDiv.appendChild(actionButtonsDiv);
            detailsDiv.appendChild(actionsToolbarDiv);
            itemElement.appendChild(detailsDiv);
            
            return itemElement;
        },
        renderProductList: () => {
            if (!DOM.productListContainer) return;
            DOM.productListContainer.innerHTML = '';

            if (!state.products || state.products.length === 0) {
                Utils.showUserMessage(DOM.productListContainer, APP_CONFIG.NO_PRODUCTS_MESSAGE, false);
                return;
            }
            const sortedProducts = [...state.products].sort((a, b) => Utils.parsePrice(b.price) - Utils.parsePrice(a.price));
            sortedProducts.forEach(product => {
                const productElement = UI._createProductCardElement(product);
                DOM.productListContainer.appendChild(productElement);
                UI.updateCartActionButtonState(product.id);
                UI.updateLikeButtonState(product.id);
            });
        },
        handleHeroOpacityOnScroll: () => {
            if (!DOM.heroSection) return;
            DOM.heroSection.classList.toggle('hero-hidden', window.scrollY > 10);
        }
    };

    // --- MÓDULO DE LIKES ---
    const Likes = {
        initialize: async () => {
            state.userLikedItems = JSON.parse(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_LIKES_KEY)) || {};
            await DataService.loadLikesFromSupabase(); // Carrega contagens totais
            // Garante que todos os produtos tenham uma contagem no estado local, mesmo que 0
            state.products.forEach(product => {
                if (state.productLikesCount[product.id] === undefined) {
                    state.productLikesCount[product.id] = 0;
                }
                UI.updateLikeButtonState(product.id); // Atualiza UI após carregar contagens
            });
        },
        toggle: (productId) => {
            const product = Utils.getProductById(productId);
            if (!product) return;

            const previouslyLiked = state.userLikedItems[productId];
            let currentTotalLikes = state.productLikesCount[productId] || 0;

            if (previouslyLiked) {
                delete state.userLikedItems[productId];
                currentTotalLikes = Math.max(0, currentTotalLikes - 1);
            } else {
                state.userLikedItems[productId] = true;
                currentTotalLikes += 1;
            }
            state.productLikesCount[productId] = currentTotalLikes;
            localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_LIKES_KEY, JSON.stringify(state.userLikedItems));
            DataService.updateLikeInSupabase(productId, currentTotalLikes);
            UI.updateLikeButtonState(productId);
        }
    };

    // --- MÓDULO DO CARRINHO ---
    const Cart = {
        toggleItem: (product) => {
            if (!product || product.status === 'vendido') {
                if(product && product.status === 'vendido') alert("Este item já foi vendido.");
                return false;
            }
            const productIndex = state.cartItems.findIndex(item => item.id === product.id);
            let itemWasAdded = false;
            if (productIndex > -1) {
                state.cartItems.splice(productIndex, 1);
            } else {
                state.cartItems.push(product);
                itemWasAdded = true;
            }
            UI.renderOrderItemsList();
            UI.updateCartActionButtonState(product.id);
            return itemWasAdded;
        },
        sendOrderToWhatsApp: () => {
            if (state.cartItems.length === 0) {
                alert("Seu pedido está vazio!");
                return;
            }
            let message = "Olá! Tenho interesse nos seguintes itens do bazar:\n";
            let totalPrice = 0;
            state.cartItems.forEach(item => {
                message += `- ${item.fullName} (${item.price})\n`;
                totalPrice += Utils.parsePrice(item.price);
            });
            message += `\nValor Total Estimado: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
            const whatsappUrl = `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // --- MÓDULO PRINCIPAL DA APLICAÇÃO ---
    const App = {
        checkDOMExists: () => {
            const essentialElements = Object.values(DOM); // Pega todos os valores do objeto DOM
            if (essentialElements.some(el => !el)) { // Verifica se algum é null ou undefined
                console.error("Um ou mais elementos DOM essenciais não foram encontrados. Verifique IDs/classes.");
                Utils.showUserMessage(document.body, APP_CONFIG.DEFAULT_ERROR_MESSAGE); // Mostra erro no body se productListContainer não existir
                return false;
            }
            return true;
        },
        setupEventListeners: () => {
            if (DOM.orderPanelHeader) {
                DOM.orderPanelHeader.addEventListener('click', (event) => {
                    if (DOM.toggleOrderDetailsBtn && (event.target === DOM.toggleOrderDetailsBtn || DOM.toggleOrderDetailsBtn.contains(event.target))) return;
                    UI.toggleOrderDetailsView();
                });
                DOM.orderPanelHeader.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        if (DOM.toggleOrderDetailsBtn && (event.target === DOM.toggleOrderDetailsBtn || DOM.toggleOrderDetailsBtn.contains(event.target))) return;
                        UI.toggleOrderDetailsView(); event.preventDefault();
                    }
                });
            }
            if (DOM.toggleOrderDetailsBtn) DOM.toggleOrderDetailsBtn.addEventListener('click', () => UI.toggleOrderDetailsView());
            if (DOM.sendOrderBtn) DOM.sendOrderBtn.addEventListener('click', Cart.sendOrderToWhatsApp);
            if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', UI.closeProductDetailsModal);
            if (DOM.productDetailsModal) {
                DOM.productDetailsModal.addEventListener('click', (event) => { if (event.target === DOM.productDetailsModal) UI.closeProductDetailsModal(); });
                DOM.productDetailsModal.addEventListener('keydown', (event) => { if (event.key === 'Escape') UI.closeProductDetailsModal(); });
            }
            if (DOM.modalAddToCartBtn) {
                DOM.modalAddToCartBtn.addEventListener('click', () => {
                    if (state.currentProductInModal) {
                        const itemWasAdded = Cart.toggleItem(state.currentProductInModal);
                        if (itemWasAdded) setTimeout(() => UI.closeProductDetailsModal(), 300);
                    }
                });
            }
            window.addEventListener('scroll', UI.handleHeroOpacityOnScroll, { passive: true });
        },
        initialize: async () => {
            if (!App.checkDOMExists()) {
                console.error("Inicialização abortada: Elementos DOM essenciais ausentes.");
                return;
            }
            DataService.initializeSupabase();
            await DataService.loadProducts();

            if (state.products && state.products.length > 0) {
                await Likes.initialize(); // Inicializa likes após produtos carregados
                UI.renderProductList();
                UI.renderOrderItemsList(); // Inicializa o painel de pedidos
            } else {
                 // Mensagem de erro/sem produtos já tratada em loadProducts ou renderProductList
                 console.warn("Nenhum produto para renderizar ou erro ao carregar.")
            }
            App.setupEventListeners();
            UI.handleHeroOpacityOnScroll();
        }
    };

    // --- PONTO DE ENTRADA DA APLICAÇÃO ---
    document.addEventListener('DOMContentLoaded', App.initialize);

})();