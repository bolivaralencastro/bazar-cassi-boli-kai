import { APP_CONFIG } from '../config/appConfig.js';
import { ClarityService } from '../services/clarityService.js';
import { state, setUserLikedItems, updateProductLikesCount } from '../state/store.js';
import { getProductById } from '../utils/format.js';

export function loadLocalLikes() {
  const savedLikes = JSON.parse(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_LIKES_KEY)) || {};
  setUserLikedItems(savedLikes);
  return savedLikes;
}

export async function loadRemoteLikes(client) {
  if (!client) return;
  try {
    const { data, error } = await client.from('likes').select('product_id, count');
    if (error) throw error;
    const likesMap = (data || []).reduce((accumulator, { product_id, count }) => {
      accumulator[product_id] = count;
      return accumulator;
    }, {});
    updateProductLikesCount(likesMap);
  } catch (error) {
    console.error('Erro ao carregar likes do Supabase:', error);
  }
}

export function ensureProductLikeEntry(productId) {
  if (state.productLikesCount[productId] === undefined) {
    state.productLikesCount[productId] = 0;
  }
}

export function toggleLike(productId) {
  const product = getProductById(productId);
  if (!product) return { isLiked: false, totalLikes: 0 };

  const previouslyLiked = Boolean(state.userLikedItems[productId]);
  let currentTotalLikes = state.productLikesCount[productId] || 0;

  if (previouslyLiked) {
    delete state.userLikedItems[productId];
    currentTotalLikes = Math.max(0, currentTotalLikes - 1);
  } else {
    state.userLikedItems[productId] = true;
    currentTotalLikes += 1;
  }

  state.productLikesCount[productId] = currentTotalLikes;

  ClarityService.trackEventWithTags('ProductLikeToggled', {
    product_id: product.id,
    product_name: product.shortName,
    liked_status: !previouslyLiked
  });

  localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_LIKES_KEY, JSON.stringify(state.userLikedItems));

  return {
    isLiked: !previouslyLiked,
    totalLikes: currentTotalLikes
  };
}
