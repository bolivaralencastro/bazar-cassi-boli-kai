import { APP_CONFIG } from '../config/appConfig.js';

export async function fetchProducts() {
  const response = await fetch(APP_CONFIG.PRODUCTS_JSON_PATH);
  if (!response.ok) {
    throw new Error(`Falha ao carregar produtos: ${response.status}`);
  }
  return response.json();
}

export function createSupabaseClient() {
  if (!window.supabase || APP_CONFIG.SUPABASE_URL === '__SUPABASE_URL__') {
    if (!window.supabase && APP_CONFIG.SUPABASE_URL !== '__SUPABASE_URL__') {
      console.warn('Supabase client (window.supabase) não encontrado. Likes online desabilitados.');
    } else if (APP_CONFIG.SUPABASE_URL === '__SUPABASE_URL__') {
      console.info('Placeholders de Supabase. Funcionalidade de likes online será ativada no deploy.');
    }
    return null;
  }

  try {
    return window.supabase.createClient(APP_CONFIG.SUPABASE_URL, APP_CONFIG.SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Falha ao inicializar o client Supabase:', error);
    return null;
  }
}

export async function fetchLikes(client) {
  if (!client) return [];
  const { data, error } = await client.from('likes').select('product_id, count');
  if (error) {
    throw error;
  }
  return data || [];
}

export async function upsertLike(client, productId, newCount) {
  if (!client) return;
  try {
    const { error } = await client
      .from('likes')
      .upsert({ product_id: productId, count: newCount }, { onConflict: 'product_id' });
    if (error) {
      console.error('DataService.updateLikeInSupabase error:', error.message);
    }
  } catch (error) {
    console.error('Exceção em DataService.updateLikeInSupabase:', error);
  }
}
