import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { JournalArticle } from '../types';
import { localRoadtripStore } from '../utils/localRoadtripStore';

/**
 * Custom hook for real-time roadtrip/journal management
 */
export const useRealtimeRoadtrips = () => {
    const [roadtrips, setRoadtrips] = useState<JournalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);

    const refreshLocalData = useCallback(() => {
        setRoadtrips(localRoadtripStore.getRoadtrips());
    }, []);

    useEffect(() => {
        const fetchRoadtrips = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('roadtrips')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (fetchError) {
                    console.warn('Database error, using localRoadtripStore:', fetchError.message);
                    refreshLocalData();
                    setUsingFallback(true);
                } else {
                    // Map legacy image_url to image if needed
                    const formattedData = (data || []).map((r: any) => ({
                        ...r,
                        image: r.image_url || r.image // Handling both database and local schema
                    }));
                    setRoadtrips(formattedData);
                    setUsingFallback(false);
                }
            } catch (err: any) {
                console.warn('Connection error, using localRoadtripStore');
                refreshLocalData();
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadtrips();

        if (!usingFallback) {
            const channel = supabase
                .channel('roadtrips-realtime')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'roadtrips' },
                    () => fetchRoadtrips() // Simpler to refetch for complexity of mapping
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        } else {
            return localRoadtripStore.subscribe(refreshLocalData);
        }
    }, [usingFallback, refreshLocalData]);

    const addRoadtrip = async (tripData: Omit<JournalArticle, 'id'>) => {
        try {
            // Map image to image_url for DB
            const dbData = {
                title: tripData.title,
                excerpt: tripData.excerpt,
                content: tripData.content,
                image_url: tripData.image,
                price: tripData.price,
                duration: tripData.duration,
                date: tripData.date
            };

            const { data, error: insertError } = await supabase
                .from('roadtrips')
                .insert([dbData])
                .select()
                .single();

            if (insertError) {
                console.warn('Supabase insert failed, using fallback');
                const newTrip = localRoadtripStore.addRoadtrip(tripData);
                setUsingFallback(true);
                refreshLocalData();
                return { data: newTrip, error: null };
            }

            return { data, error: null };
        } catch (err: any) {
            console.warn('Add roadtrip exception, using fallback');
            const newTrip = localRoadtripStore.addRoadtrip(tripData);
            setUsingFallback(true);
            refreshLocalData();
            return { data: newTrip, error: null };
        }
    };

    const deleteRoadtrip = async (id: number | string) => {
        try {
            const { error: deleteError } = await supabase
                .from('roadtrips')
                .delete()
                .eq('id', id);

            if (deleteError) {
                if (typeof id === 'number') {
                    localRoadtripStore.deleteRoadtrip(id);
                    setUsingFallback(true);
                    refreshLocalData();
                }
                return { error: null };
            }

            return { error: null };
        } catch (err: any) {
            if (typeof id === 'number') {
                localRoadtripStore.deleteRoadtrip(id);
                setUsingFallback(true);
                refreshLocalData();
            }
            return { error: null };
        }
    };

    return {
        roadtrips,
        loading,
        error,
        addRoadtrip,
        deleteRoadtrip,
        usingFallback
    };
};
