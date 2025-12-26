import { useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

interface NotificationOptions {
    title: string;
    body: string;
    icon?: string;
    tag?: string;
}

/**
 * Custom hook for browser notifications
 * Requests permission and shows notifications for real-time events
 */
export const useNotifications = () => {
    // Request notification permission on mount
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    // Show notification
    const showNotification = useCallback((options: NotificationOptions) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(options.title, {
                body: options.body,
                icon: options.icon || '/assets/logo.jpg',
                tag: options.tag,
                badge: '/assets/logo.jpg',
            });
        }
    }, []);

    // Subscribe to new bookings (for admin)
    const subscribeToNewBookings = useCallback(() => {
        const channel = supabase
            .channel('new-bookings-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bookings',
                },
                (payload) => {
                    showNotification({
                        title: 'New Booking Received! 🚗',
                        body: `Booking ID: ${payload.new.id}`,
                        tag: 'new-booking',
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [showNotification]);

    // Subscribe to payment confirmations (for admin)
    const subscribeToPayments = useCallback(() => {
        const channel = supabase
            .channel('payment-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'bookings',
                    filter: 'payment_status=eq.paid',
                },
                (payload) => {
                    showNotification({
                        title: 'Payment Received! 💰',
                        body: `KSh ${payload.new.total_amount} for booking ${payload.new.id}`,
                        tag: 'payment-received',
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [showNotification]);

    // Subscribe to driver verifications (for admin)
    const subscribeToVerifications = useCallback(() => {
        const channel = supabase
            .channel('verification-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'driver_verifications',
                },
                (payload) => {
                    showNotification({
                        title: 'New Driver Verification 📄',
                        body: `${payload.new.driver_name} submitted documents`,
                        tag: 'new-verification',
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [showNotification]);

    return {
        showNotification,
        subscribeToNewBookings,
        subscribeToPayments,
        subscribeToVerifications,
    };
};
