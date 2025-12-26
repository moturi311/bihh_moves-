import { Brand } from '../types';

const LOCAL_STORAGE_KEY = 'bihh_brands_fallback';
const SYNC_EVENT_NAME = 'bihh_brands_sync';

/**
 * Persistence helper for brands in local development fallback
 */
export const localBrandStore = {
    getBrands: (): Brand[] => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing local brands:', e);
            }
        }
        const initial: Brand[] = [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
        return initial;
    },

    setBrands: (brands: Brand[]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(brands));
        window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
    },

    addBrand: (brand: Omit<Brand, 'id'>) => {
        const brands = localBrandStore.getBrands();
        const newBrand = {
            ...brand,
            id: `brand-${Date.now()}`
        } as Brand;
        localBrandStore.setBrands([...brands, newBrand]);
        return newBrand;
    },

    deleteBrand: (id: string) => {
        const brands = localBrandStore.getBrands();
        const filtered = brands.filter(b => b.id !== id);
        localBrandStore.setBrands(filtered);
    },

    subscribe: (callback: () => void) => {
        window.addEventListener(SYNC_EVENT_NAME, callback);
        return () => window.removeEventListener(SYNC_EVENT_NAME, callback);
    }
};
