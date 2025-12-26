/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import RoadtripCheckout from './components/RoadtripCheckout';
import WhatsAppButton from './components/WhatsAppButton';
import BrandShowcase from './components/BrandShowcase';
import { Car, JournalArticle, ViewState } from './types';

import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/DashboardOverview';
import BookingsList from './components/admin/BookingsList';
import VehiclesManager from './components/admin/VehiclesManager';
import RoadtripsManager from './components/admin/RoadtripsManager';
import BrandsManager from './components/admin/BrandsManager';
import CustomersManager from './components/admin/CustomersManager';
import PaymentsManager from './components/admin/PaymentsManager';
import VerificationManager from './components/admin/VerificationManager';
import SettingsManager from './components/admin/SettingsManager';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [bookedCars, setBookedCars] = useState<Car[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const bookCar = (car: Car) => {
    setBookedCars([...bookedCars, car]);
    setIsCartOpen(true);
  };

  const cancelBooking = (index: number) => {
    const newItems = [...bookedCars];
    newItems.splice(index, 1);
    setBookedCars(newItems);
  };

  // Check for admin route in URL on load (simple implementation)
  React.useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView({ type: 'admin-login' });
    }
  }, []);

  if (view.type === 'admin-login') {
    return <AdminLogin onLoginSuccess={() => setView({ type: 'admin-dashboard' })} />;
  }

  if (view.type === 'admin-dashboard' || view.type === 'admin-bookings' || view.type === 'admin-vehicles' ||
    view.type === 'admin-customers' || view.type === 'admin-payments' ||
    view.type === 'admin-verification' || view.type === 'admin-settings' ||
    view.type === 'admin-roadtrips' || view.type === 'admin-brands') {
    return (
      <AdminLayout
        onLogout={() => setView({ type: 'admin-login' })}
        currentView={view.type}
        onNavigate={(newView) => setView({ type: newView })}
      >
        {view.type === 'admin-dashboard' && <DashboardOverview />}
        {view.type === 'admin-bookings' && <BookingsList />}
        {view.type === 'admin-vehicles' && <VehiclesManager />}
        {view.type === 'admin-roadtrips' && <RoadtripsManager />}
        {view.type === 'admin-brands' && <BrandsManager />}
        {view.type === 'admin-customers' && <CustomersManager />}
        {view.type === 'admin-payments' && <PaymentsManager />}
        {view.type === 'admin-verification' && <VerificationManager />}
        {view.type === 'admin-settings' && <SettingsManager />}
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && view.type !== 'roadtrip-checkout' && (
        <Navbar
          onNavClick={handleNavClick}
          cartCount={bookedCars.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <BrandShowcase />
            <ProductGrid onProductClick={(p) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView({ type: 'product', product: p });
            }} />
            <About />
            <Journal
              onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
              }}
              onBookTrip={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'roadtrip-checkout', trip: a });
              }}
            />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail
            product={view.product}
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={bookCar}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail
            article={view.article}
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
          <Checkout
            items={bookedCars}
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'roadtrip-checkout' && (
          <RoadtripCheckout
            trip={view.trip}
            onBack={() => setView({ type: 'home' })}
          />
        )}
      </main>

      {view.type !== 'checkout' && view.type !== 'roadtrip-checkout' && <Footer onLinkClick={handleNavClick} />}

      <Assistant />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={bookedCars}
        onRemoveItem={cancelBooking}
        onCheckout={() => {
          setIsCartOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setView({ type: 'checkout' });
        }}
      />

      <WhatsAppButton />
    </div>
  );
}

export default App;
