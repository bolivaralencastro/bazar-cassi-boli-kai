const DOM = {};

export function initDomReferences() {
  DOM.productListContainer = document.getElementById('productList');
  DOM.heroSection = document.querySelector('.hero-section');
  DOM.orderPanel = document.getElementById('orderPanel');
  DOM.orderPanelHeader = document.getElementById('orderPanelHeader');
  DOM.orderSummaryTextEl = document.getElementById('orderSummaryText');
  DOM.toggleOrderDetailsBtn = document.getElementById('toggleOrderDetailsBtn');
  DOM.orderItemsListEl = document.getElementById('orderItemsList');
  DOM.sendOrderBtn = document.getElementById('sendOrderBtn');
  DOM.productDetailsModal = document.getElementById('productDetailsModal');
  DOM.modalCloseBtn = document.getElementById('modalCloseBtn');
  DOM.modalImageContainer = document.getElementById('modalImageContainer');
  DOM.modalProductTitle = document.getElementById('modalProductTitle');
  DOM.modalProductPriceInfo = document.getElementById('modalProductPriceInfo');
  DOM.modalProductGeneralDescription = document.getElementById('modalProductGeneralDescription');
  DOM.modalProductSpecifications = document.getElementById('modalProductSpecifications');
  DOM.modalProductState = document.getElementById('modalProductState');
  DOM.modalProductObservationsSection = document.getElementById('modalProductObservationsSection');
  DOM.modalProductObservations = document.getElementById('modalProductObservations');
  DOM.modalProductPickupLocation = document.getElementById('modalProductPickupLocation');
  DOM.modalOlxBtn = document.getElementById('modalOlxBtn');
  DOM.modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
  DOM.welcomeProductsSoldInfo = document.getElementById('produtosVendidosInfo');
  return DOM;
}

export function getDomReferences() {
  return DOM;
}
