import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Booking } from '../types';

/**
 * Custom hook for real-time booking management
 * Automatically syncs with Supabase and updates on any database changes
 */
export const useRealtimeBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initial fetch with joined data
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('bookings')
                    .select(`
            *,
            customer:customers(*),
            vehicle:vehicles(*)
          `)
                    .order('created_at', { ascending: false });

                if (fetchError) throw fetchError;

                setBookings(data || []);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('bookings-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookings',
                },
                () => {
                    // Refetch to get joined data
                    fetchBookings();
                }
            )
            .subscribe();

        // Cleanup
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Create booking
    const createBooking = async (bookingData: {
        customer_id: string;
        vehicle_id: string;
        start_date: string;
        end_date: string;
        total_amount: number;
        special_requests?: string;
    }) => {
        try {
            const { data, error: insertError } = await supabase
                .from('bookings')
                .insert([bookingData])
                .select(`
          *,
          customer:customers(*),
          vehicle:vehicles(*)
        `)
                .single();

            if (insertError) throw insertError;

            return { data, error: null };
        } catch (err: any) {
            console.error('Error creating booking:', err);
            return { data: null, error: err.message };
        }
    };

    // Update booking status
    const updateBookingStatus = async (
        id: string,
        status: Booking['status']
    ) => {
        try {
            const { data, error: updateError } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            return { data, error: null };
        } catch (err: any) {
            console.error('Error updating booking status:', err);
            return { data: null, error: err.message };
        }
    };

    // Update payment status
    const updatePaymentStatus = async (
        id: string,
        payment_status: Booking['payment_status']
    ) => {
        try {
            const { data, error: updateError } = await supabase
                .from('bookings')
                .update({ payment_status })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            return { data, error: null };
        } catch (err: any) {
            console.error('Error updating payment status:', err);
            return { data: null, error: err.message };
        }
    };

    // Cancel booking
    const cancelBooking = async (id: string) => {
        return updateBookingStatus(id, 'cancelled');
    };

    // Check vehicle availability
    const checkAvailability = async (
        vehicleId: string,
        startDate: string,
        endDate: string
    ): Promise<boolean> => {
        try {
            const { data, error: checkError } = await supabase
                .from('bookings')
                .select('id')
                .eq('vehicle_id', vehicleId)
                .in('status', ['pending', 'confirmed', 'ongoing'])
                .or(`start_date.lte.${endDate},end_date.gte.${startDate}`);

            if (checkError) throw checkError;

            // If any bookings found, vehicle is not available
            return (data?.length || 0) === 0;
        } catch (err: any) {
            console.error('Error checking availability:', err);
            return false;
        }
    };

    return {
        bookings,
        loading,
        error,
        createBooking,
        updateBookingStatus,
        updatePaymentStatus,
        cancelBooking,
        checkAvailability,
    };
};
