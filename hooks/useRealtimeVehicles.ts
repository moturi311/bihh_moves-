import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { Car } from '../types';
import { CARS } from '../constants';
import { localVehicleStore } from '../utils/localVehicleStore';

/**
 * Custom hook for real-time vehicle management
 * Automatically syncs with Supabase and updates on any database changes
 * Falls back to local storage sync if database is not set up
 */
export const useRealtimeVehicles = (filterAvailable = false) => {
    const [vehicles, setVehicles] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);

    const refreshLocalData = useCallback(() => {
        const localData = localVehicleStore.getVehicles();
        if (filterAvailable) {
            setVehicles(localData.filter(v => v.status === 'available'));
        } else {
            setVehicles(localData);
        }
    }, [filterAvailable]);

    useEffect(() => {
        // Initial fetch
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                let query = supabase.from('vehicles').select('*');

                if (filterAvailable) {
                    query = query.eq('status', 'available');
                }

                const { data, error: fetchError } = await query.order('created_at', { ascending: false });

                if (fetchError) {
                    // Check for offline/not setup
                    console.warn('Database error, using localVehicleStore:', fetchError.message);
                    refreshLocalData();
                    setUsingFallback(true);
                } else {
                    setVehicles(data || []);
                    setUsingFallback(false);
                }
            } catch (err: any) {
                console.warn('Connection error, using localVehicleStore');
                refreshLocalData();
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();

        // Subscribe to real-time if not using fallback
        if (!usingFallback) {
            const channel = supabase
                .channel('vehicles-realtime')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'vehicles',
                    },
                    (payload) => {
                        if (payload.eventType === 'INSERT') {
                            const newVehicle = payload.new as Car;
                            if (!filterAvailable || newVehicle.status === 'available') {
                                setVehicles((prev) => [newVehicle, ...prev]);
                            }
                        } else if (payload.eventType === 'UPDATE') {
                            const updatedVehicle = payload.new as Car;
                            setVehicles((prev) =>
                                prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
                            );
                        } else if (payload.eventType === 'DELETE') {
                            setVehicles((prev) => prev.filter((v) => v.id !== payload.old.id));
                        }
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        } else {
            // If using fallback, listen for local cross-instance events
            return localVehicleStore.subscribe(refreshLocalData);
        }
    }, [filterAvailable, usingFallback, refreshLocalData]);

    // CRUD operations
    const addVehicle = async (vehicleData: Omit<Car, 'id'>) => {
        try {
            const { data, error: insertError } = await supabase
                .from('vehicles')
                .insert([vehicleData])
                .select()
                .single();

            if (insertError) {
                const newVehicle = localVehicleStore.addVehicle(vehicleData);
                return { data: newVehicle, error: null };
            }

            return { data, error: null };
        } catch (err: any) {
            const newVehicle = localVehicleStore.addVehicle(vehicleData);
            return { data: newVehicle, error: null };
        }
    };

    const updateVehicle = async (id: string, updates: Partial<Car>) => {
        try {
            const { data, error: updateError } = await supabase
                .from('vehicles')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (updateError) {
                const updated = localVehicleStore.updateVehicle(id, updates);
                return { data: updated, error: null };
            }

            return { data, error: null };
        } catch (err: any) {
            const updated = localVehicleStore.updateVehicle(id, updates);
            return { data: updated, error: null };
        }
    };

    const deleteVehicle = async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('vehicles')
                .delete()
                .eq('id', id);

            if (deleteError) {
                localVehicleStore.deleteVehicle(id);
                return { error: null };
            }

            return { error: null };
        } catch (err: any) {
            localVehicleStore.deleteVehicle(id);
            return { error: null };
        }
    };

    return {
        vehicles,
        loading,
        error,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        usingFallback
    };
};

