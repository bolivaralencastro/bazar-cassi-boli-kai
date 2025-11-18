import { APP_CONFIG } from '../config/appConfig.js';
import { ClarityService } from '../services/clarityService.js';
import { state } from '../state/store.js';
import { parsePrice } from '../utils/format.js';
import { getWhatsAppBaseUrl } from '../utils/device.js';

export function toggleCartItem(product) {
  if (!product) {
    console.warn('Tentativa de adicionar produto nulo ao carrinho.');
    return { itemWasAdded: false, product: null };
  }

  if (product.status === 'vendido') {
    alert('Este item já foi vendido.');
    ClarityService.trackEventWithTags('SoldItemInteraction', {
      product_id: product.id,
      product_name: product.shortName,
      interaction_type: 'add_to_cart_attempt'
    });
    return { itemWasAdded: false, product };
  }

  const productIndex = state.cartItems.findIndex((item) => item.id === product.id);
  let itemWasAdded = false;

  if (productIndex > -1) {
    state.cartItems.splice(productIndex, 1);
  } else {
    state.cartItems.push(product);
    itemWasAdded = true;
  }

  const eventName = itemWasAdded ? 'ItemAddedToCart' : 'ItemRemovedFromCart';
  const tags = {
    product_id: product.id,
    product_name: product.shortName,
    cart_action_type: itemWasAdded ? 'added' : 'removed'
  };

  if (itemWasAdded) {
    tags.product_price = parsePrice(product.price);
  }

  ClarityService.trackEventWithTags(eventName, tags);

  return { itemWasAdded, product };
}

export function sendOrderToWhatsApp() {
  if (state.cartItems.length === 0) {
    alert('Seu pedido está vazio!');
    ClarityService.triggerEvent('OrderSubmissionAttemptedEmptyCart');
    return;
  }

  let message = 'Olá! Tenho interesse nos seguintes itens do bazar:\n';
  let totalPrice = 0;
  state.cartItems.forEach((item) => {
    message += `- ${item.fullName} (${item.price})\n`;
    totalPrice += parsePrice(item.price);
  });
  message += `\nValor Total Estimado: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  ClarityService.trackEventWithTags('OrderSubmissionAttempted', {
    item_count: state.cartItems.length,
    total_value: totalPrice.toFixed(2)
  });

  const baseUrl = getWhatsAppBaseUrl();
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl =
    baseUrl === 'https://wa.me/'
      ? `${baseUrl}${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`
      : `${baseUrl}${APP_CONFIG.WHATSAPP_NUMBER}&text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
