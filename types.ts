/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Car {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  pricePerDay: number;
  category: 'Saloon Car' | 'SUV' | 'Van' | '4x4' | 'Compact Car' | 'Luxury SUV';
  imageUrl: string;
  gallery?: string[];
  features: string[];
  specs: {
    range?: string;
    acceleration?: string;
    topSpeed?: string;
    seats: number;
  };
  status?: 'available' | 'booked' | 'maintenance';
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode;
  price: number;
  duration: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface Brand {
  id: string;
  name: string;
  logo: string; // Base64 or URL
  description?: string;
}

export type ViewState =
  | { type: 'home' }
  | { type: 'product'; product: Car }
  | { type: 'journal'; article: JournalArticle }
  | { type: 'checkout' }
  | { type: 'roadtrip-checkout'; trip: JournalArticle }
  | { type: 'admin-login' }
  | { type: 'admin-dashboard' }
  | { type: 'admin-bookings' }
  | { type: 'admin-vehicles' }
  | { type: 'admin-customers' }
  | { type: 'admin-payments' }
  | { type: 'admin-verification' }
  | { type: 'admin-settings' }
  | { type: 'admin-roadtrips' }
  | { type: 'admin-brands' };

export interface Admin {
  id: string;
  email: string;
  role: 'super_admin' | 'support_agent';
}

export interface Booking {
  id: string;
  customer_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  vehicle?: Car; // Joined data
  customer?: {
    full_name: string;
    email: string;
    phone: string;
  };
}

