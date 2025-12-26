import { Car } from '../types';
import { CARS } from '../constants';

const LOCAL_STORAGE_KEY = 'bihh_vehicles_fallback';
const SYNC_EVENT_NAME = 'bihh_vehicles_sync';

/**
 * Persistence helper for local development fallback
 */
export const localVehicleStore = {
    getVehicles: (): Car[] => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing local vehicles:', e);
            }
        }
        // Initialize with empty array if empty
        const initial: Car[] = [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
        return initial;
    },

    setVehicles: (vehicles: Car[]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vehicles));
        // Broadcast the change to other instances
        window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME));
    },

    addVehicle: (vehicle: Omit<Car, 'id'>) => {
        const vehicles = localVehicleStore.getVehicles();
        const newVehicle = { ...vehicle, id: `local-${Date.now()}`, created_at: new Date().toISOString() } as Car;
        localVehicleStore.setVehicles([newVehicle, ...vehicles]);
        return newVehicle;
    },

    updateVehicle: (id: string, updates: Partial<Car>) => {
        const vehicles = localVehicleStore.getVehicles();
        const updated = vehicles.map(v => v.id === id ? { ...v, ...updates } : v);
        localVehicleStore.setVehicles(updated);
        return updated.find(v => v.id === id);
    },

    deleteVehicle: (id: string) => {
        const vehicles = localVehicleStore.getVehicles();
        const filtered = vehicles.filter(v => v.id !== id);
        localVehicleStore.setVehicles(filtered);
    },

    subscribe: (callback: () => void) => {
        window.addEventListener(SYNC_EVENT_NAME, callback);
        return () => window.removeEventListener(SYNC_EVENT_NAME, callback);
    }
};
