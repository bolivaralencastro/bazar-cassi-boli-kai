import { state } from '../state/store.js';

export function parsePrice(priceStr) {
  if (typeof priceStr !== 'string') return 0;
  return parseFloat(priceStr.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
}

export function getProductImageBaseName(imageSrc) {
  if (typeof imageSrc !== 'string') return '';
  return imageSrc.replace(/^images\//, '').replace(/(-[0-9]+)?\.(webp|png|jpg|jpeg)$/i, '');
}

export function getProductById(productId) {
  return state.products.find((product) => product.id === productId);
}
