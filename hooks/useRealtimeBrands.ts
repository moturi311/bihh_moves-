import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { Brand } from '../types';
import { localBrandStore } from '../utils/localBrandStore';

/**
 * Custom hook for real-time car brand management
 */
export const useRealtimeBrands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingFallback, setUsingFallback] = useState(false);

    const refreshLocalData = useCallback(() => {
        setBrands(localBrandStore.getBrands());
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('brands')
                    .select('*')
                    .order('name');

                if (fetchError) {
                    console.warn('Database error, using localBrandStore:', fetchError.message);
                    refreshLocalData();
                    setUsingFallback(true);
                } else {
                    setBrands(data || []);
                    setUsingFallback(false);
                }
            } catch (err: any) {
                console.warn('Connection error, using localBrandStore');
                refreshLocalData();
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();

        if (!usingFallback) {
            const channel = supabase
                .channel('brands-realtime')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'brands' },
                    () => fetchBrands()
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        } else {
            return localBrandStore.subscribe(refreshLocalData);
        }
    }, [usingFallback, refreshLocalData]);

    const addBrand = async (brandData: Omit<Brand, 'id'>) => {
        try {
            const { data, error: insertError } = await supabase
                .from('brands')
                .insert([brandData])
                .select()
                .single();

            if (insertError) {
                const newBrand = localBrandStore.addBrand(brandData);
                setUsingFallback(true);
                refreshLocalData();
                return { data: newBrand, error: null };
            }

            return { data, error: null };
        } catch (err: any) {
            const newBrand = localBrandStore.addBrand(brandData);
            setUsingFallback(true);
            refreshLocalData();
            return { data: newBrand, error: null };
        }
    };

    const deleteBrand = async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('brands')
                .delete()
                .eq('id', id);

            if (deleteError) {
                localBrandStore.deleteBrand(id);
                setUsingFallback(true);
                refreshLocalData();
                return { error: null };
            }

            return { error: null };
        } catch (err: any) {
            localBrandStore.deleteBrand(id);
            setUsingFallback(true);
            refreshLocalData();
            return { error: null };
        }
    };

    return {
        brands,
        loading,
        error,
        addBrand,
        deleteBrand,
        usingFallback
    };
};
