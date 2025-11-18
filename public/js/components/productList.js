import { APP_CONFIG } from '../config/appConfig.js';
import { state } from '../state/store.js';
import { getDomReferences } from '../utils/dom.js';
import { getProductById, getProductImageBaseName, parsePrice } from '../utils/format.js';
import { showUserMessage } from '../utils/uiFeedback.js';

function getProductPictureHTML(product, imgClass = 'product-image', baseWidth = 400, baseHeight = 400) {
  const baseName = getProductImageBaseName(product.imageSrc);
  return `
    <picture>
      <source srcset="images/${baseName}-700.webp 700w, images/${baseName}-400.webp 400w, images/${baseName}-200.webp 200w" sizes="(max-width: 700px) 100vw, 700px" type="image/webp">
      <img src="images/${baseName}-${baseWidth}.webp" alt="Imagem de ${product.shortName}" class="${imgClass}" width="${baseWidth}" height="${baseHeight}" loading="lazy">
    </picture>
  `;
}

function createProductCard(product, handlers) {
  const { onToggleLike, onToggleCart, onShowDetails } = handlers;
  const itemElement = document.createElement('section');
  itemElement.className = 'product-list-item';
  itemElement.dataset.productId = product.id;
  itemElement.setAttribute('aria-labelledby', `product-name-${product.id}`);

  const isSold = product.status === 'vendido';
  if (isSold) {
    itemElement.classList.add('sold-item');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'product-image-container';
  imageContainer.innerHTML = getProductPictureHTML(product, 'product-image', 180, 180);
  if (isSold) {
    const soldOverlay = document.createElement('div');
    soldOverlay.className = 'sold-overlay';
    soldOverlay.innerHTML = '<span>VENDIDO</span>';
    imageContainer.appendChild(soldOverlay);
  }
  itemElement.appendChild(imageContainer);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'product-details';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'product-info';
  infoDiv.innerHTML = `
    <h3 class="name" id="product-name-${product.id}">${product.shortName}</h3>
    <p class="price">${product.price}</p>
    <p class="description">${product.description}</p>
  `;
  detailsDiv.appendChild(infoDiv);

  const actionsToolbarDiv = document.createElement('div');
  actionsToolbarDiv.className = 'product-actions-toolbar';

  const likeSectionDiv = document.createElement('div');
  likeSectionDiv.className = 'like-section';

  const likeButton = document.createElement('button');
  likeButton.className = 'btn-like';
  likeButton.dataset.productId = product.id;
  likeButton.setAttribute('aria-label', `Curtir ${product.shortName}`);
  likeButton.setAttribute('aria-pressed', 'false');
  likeButton.title = `Curtir ${product.shortName}`;
  likeButton.innerHTML = '<img src="icons/favorite.svg" alt="" class="icon-svg icon-svg--like">';
  likeButton.addEventListener('click', () => onToggleLike(product.id));

  const likeCountSpan = document.createElement('span');
  likeCountSpan.className = 'like-count';
  likeCountSpan.dataset.productId = product.id;

  likeSectionDiv.append(likeButton, likeCountSpan);
  actionsToolbarDiv.appendChild(likeSectionDiv);

  const actionButtonsDiv = document.createElement('div');
  actionButtonsDiv.className = 'action-buttons';

  const detailsButton = document.createElement('button');
  detailsButton.className = 'btn details-btn';
  detailsButton.title = `Mais detalhes sobre ${product.shortName}`;
  detailsButton.dataset.productId = product.id;
  detailsButton.innerHTML = '<img src="icons/info.svg" alt="" class="icon-svg"> Info';
  detailsButton.addEventListener('click', (event) => onShowDetails(product.id, event.currentTarget));

  const cartActionButton = document.createElement('button');
  cartActionButton.className = 'btn cart-action-btn';
  cartActionButton.dataset.productId = product.id;
  cartActionButton.innerHTML = '<img src="icons/add_shopping_cart.svg" alt="" class="icon-svg"><span>Adicionar</span>';
  if (!isSold) {
    cartActionButton.addEventListener('click', () => onToggleCart(product));
  } else {
    cartActionButton.disabled = true;
  }

  actionButtonsDiv.append(detailsButton, cartActionButton);
  actionsToolbarDiv.appendChild(actionButtonsDiv);
  detailsDiv.appendChild(actionsToolbarDiv);
  itemElement.appendChild(detailsDiv);

  return itemElement;
}

export function renderProductList(handlers) {
  const DOM = getDomReferences();
  if (!DOM.productListContainer) {
    return;
  }

  DOM.productListContainer.innerHTML = '';

  if (!state.products || state.products.length === 0) {
    showUserMessage(DOM.productListContainer, APP_CONFIG.NO_PRODUCTS_MESSAGE, false);
    return;
  }

  const sortedProducts = [...state.products].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  sortedProducts.forEach((product) => {
    const productElement = createProductCard(product, handlers);
    DOM.productListContainer.appendChild(productElement);
    updateCartActionButtonState(product.id);
    updateLikeButtonState(product.id);
  });

  if (DOM.welcomeProductsSoldInfo) {
    const vendidos = state.products.filter((product) => product.status === 'vendido').length;
    DOM.welcomeProductsSoldInfo.textContent = `${vendidos} de ${state.products.length} itens já foram vendidos!`;
  }
}

export function updateLikeButtonState(productId) {
  const DOM = getDomReferences();
  const product = getProductById(productId);
  if (!product || !DOM.productListContainer) return;

  const likeButton = DOM.productListContainer.querySelector(`.btn-like[data-product-id="${productId}"]`);
  const likeCountSpan = DOM.productListContainer.querySelector(`.like-count[data-product-id="${productId}"]`);
  if (!likeButton || !likeCountSpan) return;

  const isLiked = Boolean(state.userLikedItems[productId]);
  likeButton.classList.toggle('liked', isLiked);

  const iconImg = likeButton.querySelector('.icon-svg');
  if (iconImg) {
    iconImg.src = isLiked ? 'icons/favorite_fill.svg' : 'icons/favorite.svg';
    iconImg.alt = isLiked ? 'Descurtir' : 'Curtir';
  }

  likeButton.title = isLiked ? `Descurtir ${product.shortName}` : `Curtir ${product.shortName}`;
  likeButton.setAttribute('aria-pressed', String(isLiked));
  likeCountSpan.textContent = state.productLikesCount[productId] || 0;
}

export function updateCartActionButtonState(productId) {
  const DOM = getDomReferences();
  const product = getProductById(productId);
  if (!product || !DOM.productListContainer) return;

  const isInCart = state.cartItems.some((item) => item.id === productId);
  const isSold = product.status === 'vendido';

  const listButton = DOM.productListContainer.querySelector(
    `.product-list-item .cart-action-btn[data-product-id="${productId}"]`
  );

  if (listButton) {
    const iconImg = listButton.querySelector('.icon-svg');
    const textSpan = listButton.querySelector('span');

    listButton.disabled = false;
    listButton.classList.remove('add', 'remove', 'disabled');

    if (isSold) {
      listButton.classList.add('disabled');
      if (iconImg) iconImg.src = 'icons/block.svg';
      if (textSpan) textSpan.textContent = 'Vendido';
      listButton.disabled = true;
    } else if (isInCart) {
      listButton.classList.add('remove');
      if (iconImg) iconImg.src = 'icons/remove_shopping_cart.svg';
      if (textSpan) textSpan.textContent = 'Remover';
    } else {
      listButton.classList.add('add');
      if (iconImg) iconImg.src = 'icons/add_shopping_cart.svg';
      if (textSpan) textSpan.textContent = 'Adicionar';
    }
  }

  const { modalAddToCartBtn } = getDomReferences();
  if (modalAddToCartBtn && state.currentProductInModal && state.currentProductInModal.id === productId) {
    modalAddToCartBtn.disabled = false;
    let modalText = 'Adicionar ao Pedido';
    let modalIconSrc = 'icons/add_shopping_cart.svg';

    if (isSold) {
      modalText = 'Vendido';
      modalIconSrc = 'icons/block.svg';
      modalAddToCartBtn.disabled = true;
    } else if (isInCart) {
      modalText = 'No Pedido';
      modalIconSrc = 'icons/check_circle.svg';
      modalAddToCartBtn.disabled = true;
    }

    modalAddToCartBtn.innerHTML = `<img src="${modalIconSrc}" alt="" class="icon-svg icon-svg--modal-action"> ${modalText}`;
  }
}
