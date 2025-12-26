import { JournalArticle } from '../types';

const LOCAL_STORAGE_KEY = 'bihh_roadtrips_fallback';
const SYNC_EVENT_NAME = 'bihh_roadtrips_sync';

/**
 * Persistence helper for roadtrips in local development fallback
 */
export const localRoadtripStore = {
    getRoadtrips: (): JournalArticle[] => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing local roadtrips:', e);
            }
        }
        const initial: JournalArticle[] = [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
        return initial;
    },

    setRoadtrips: (roadtrips: JournalArticle[]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roadtrips));
        window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
    },

    addRoadtrip: (roadtrip: Omit<JournalArticle, 'id'>) => {
        const roadtrips = localRoadtripStore.getRoadtrips();
        const newRoadtrip = {
            ...roadtrip,
            id: Date.now(), // JournalArticle uses number as ID in types
            created_at: new Date().toISOString()
        } as JournalArticle;
        localRoadtripStore.setRoadtrips([newRoadtrip, ...roadtrips]);
        return newRoadtrip;
    },

    updateRoadtrip: (id: number, updates: Partial<JournalArticle>) => {
        const roadtrips = localRoadtripStore.getRoadtrips();
        const updated = roadtrips.map(r => r.id === id ? { ...r, ...updates } : r);
        localRoadtripStore.setRoadtrips(updated);
        return updated.find(r => r.id === id);
    },

    deleteRoadtrip: (id: number) => {
        const roadtrips = localRoadtripStore.getRoadtrips();
        const filtered = roadtrips.filter(r => r.id !== id);
        localRoadtripStore.setRoadtrips(filtered);
    },

    subscribe: (callback: () => void) => {
        window.addEventListener(SYNC_EVENT_NAME, callback);
        return () => window.removeEventListener(SYNC_EVENT_NAME, callback);
    }
};
