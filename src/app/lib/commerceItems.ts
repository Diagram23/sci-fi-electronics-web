import type { CartItem } from '@/app/context/CartContext';
import { getPluginById } from '@/app/data/pluginsData';
import { CHROMA, CTRL4FILTER } from '@/app/data/productsData';

export const COMPLETE_BUNDLE_PRODUCT_IDS = [
  'quantum-reverb',
  'fractal-delay',
  'spectral-gate',
  'plasma-distortion',
] as const;

export function isCompleteBundle(items: CartItem[]) {
  return COMPLETE_BUNDLE_PRODUCT_IDS.every((id) => items.some((item) => item.id === id));
}

export function getPluginCartItem(id: string): CartItem {
  const plugin = getPluginById(id);

  if (!plugin) {
    throw new Error(`Unknown plugin cart item: ${id}`);
  }

  return {
    id: plugin.id,
    name: plugin.name,
    price: plugin.price,
    gradient: plugin.gradient,
  };
}

export function getFractalDelayCartItem() {
  return getPluginCartItem('fractal-delay');
}

export function getCompleteBundleCartItems() {
  return COMPLETE_BUNDLE_PRODUCT_IDS.map((id) => getPluginCartItem(id));
}

export function getChromaCartItem(): CartItem {
  return {
    id: CHROMA.id,
    name: CHROMA.name,
    price: 29,
    gradient: 'from-[#1B6B5A] via-[#14B8A6] to-[#8B7355]',
  };
}

export function getCtrl4FilterCartItem(): CartItem {
  return {
    id: CTRL4FILTER.id,
    name: CTRL4FILTER.name.toUpperCase(),
    price: 89,
    gradient: 'from-[#C49A6C] via-[#8B7355] to-[#2A1D12]',
  };
}

export function getCatalogCartItems() {
  return [getCtrl4FilterCartItem(), getChromaCartItem()];
}
