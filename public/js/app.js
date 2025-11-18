import { APP_CONFIG } from './config/appConfig.js';
import { state, setProducts, setSupabaseClient } from './state/store.js';
import { initDomReferences, getDomReferences } from './utils/dom.js';
import { showUserMessage } from './utils/uiFeedback.js';
import { fetchProducts, createSupabaseClient, upsertLike } from './services/dataService.js';
import { renderProductList, updateCartActionButtonState, updateLikeButtonState } from './components/productList.js';
import { renderOrderItemsList, setupOrderPanelListeners } from './components/orderPanel.js';
import { setupProductModalListeners, showProductDetailsModal, closeProductDetailsModal } from './components/productModal.js';
import { setupHeroScrollListener, handleHeroOpacityOnScroll } from './components/hero.js';
import { toggleCartItem, sendOrderToWhatsApp } from './features/cart.js';
import { loadLocalLikes, loadRemoteLikes, ensureProductLikeEntry, toggleLike } from './features/likes.js';

let orderPanelHandlers = null;

function ensureEssentialDom(dom) {
  const requiredKeys = [
    'productListContainer',
    'orderPanel',
    'orderPanelHeader',
    'orderSummaryTextEl',
    'toggleOrderDetailsBtn',
    'orderItemsListEl',
    'sendOrderBtn',
    'productDetailsModal',
    'modalCloseBtn',
    'modalAddToCartBtn'
  ];

  const missing = requiredKeys.filter((key) => !dom[key]);
  if (missing.length === 0) {
    return true;
  }

  console.error('Elementos DOM ausentes:', missing.join(', '));
  const fallbackTarget = dom.productListContainer || document.querySelector('main') || document.body;
  if (fallbackTarget) {
    showUserMessage(fallbackTarget, APP_CONFIG.DEFAULT_ERROR_MESSAGE);
  }
  return false;
}

function handleToggleLike(productId) {
  const result = toggleLike(productId);
  if (!result) {
    return;
  }

  updateLikeButtonState(productId);
  if (state.supabase) {
    upsertLike(state.supabase, productId, result.totalLikes);
  }
}

function handleToggleCart(product, options = {}) {
  if (!product) {
    return;
  }

  const { itemWasAdded } = toggleCartItem(product);
  updateCartActionButtonState(product.id);
  if (orderPanelHandlers) {
    renderOrderItemsList(orderPanelHandlers);
  }

  if (options.closeModal && itemWasAdded) {
    closeProductDetailsModal();
  }
}

function handleRemoveItem(product) {
  handleToggleCart(product);
}

function handleShowDetails(productId, triggerElement) {
  showProductDetailsModal(productId, triggerElement);
}

async function loadProductsAndLikes() {
  let products = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    const dom = getDomReferences();
    const target = dom.productListContainer || document.querySelector('main') || document.body;
    showUserMessage(target, APP_CONFIG.PRODUCTS_LOAD_ERROR_MESSAGE);
    setProducts([]);
    return false;
  }

  setProducts(products);

  loadLocalLikes();
  state.products.forEach(({ id }) => ensureProductLikeEntry(id));

  try {
    await loadRemoteLikes(state.supabase);
  } catch (error) {
    console.error('Erro ao carregar likes remotos:', error);
  }

  state.products.forEach(({ id }) => ensureProductLikeEntry(id));
  return true;
}

async function initializeApp() {
  initDomReferences();
  const dom = getDomReferences();
  if (!ensureEssentialDom(dom)) {
    return;
  }

  orderPanelHandlers = {
    onRemoveItem: (product) => handleToggleCart(product),
    onSendOrder: () => sendOrderToWhatsApp()
  };

  const productListHandlers = {
    onToggleLike: handleToggleLike,
    onToggleCart: handleToggleCart,
    onShowDetails: handleShowDetails
  };

  setupOrderPanelListeners(orderPanelHandlers);
  setupProductModalListeners({
    onToggleCart: handleToggleCart
  });
  setupHeroScrollListener();
  handleHeroOpacityOnScroll();

  const supabaseClient = createSupabaseClient();
  setSupabaseClient(supabaseClient);

  const hasProducts = await loadProductsAndLikes();
  if (!hasProducts) {
    return;
  }

  renderProductList(productListHandlers);
  renderOrderItemsList(orderPanelHandlers);
  handleHeroOpacityOnScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp().catch((error) => {
    console.error('Erro inesperado na inicialização:', error);
  });
});
