export const state = {
  products: [],
  cartItems: [],
  userLikedItems: {},
  productLikesCount: {},
  currentProductInModal: null,
  supabase: null,
  elementThatTriggeredModal: null
};

export function setProducts(products) {
  state.products = Array.isArray(products) ? products : [];
}

export function setSupabaseClient(client) {
  state.supabase = client ?? null;
}

export function setUserLikedItems(likedItems) {
  state.userLikedItems = likedItems || {};
}

export function updateProductLikesCount(newCounts) {
  state.productLikesCount = newCounts || {};
}

export function setCurrentProductInModal(product){
  state.currentProductInModal = product;
}

export function setModalTriggerElement(element){
  state.elementThatTriggeredModal = element ?? null;
}
