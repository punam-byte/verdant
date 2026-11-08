import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlantCatalog } from './components/PlantCatalog';
import { GardenBedPlanner } from './components/GardenBedPlanner';
import { SeasonalAlmanac } from './components/SeasonalAlmanac';
import { PlantClinic } from './components/PlantClinic';
import { ConservatoryBooking } from './components/ConservatoryBooking';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AuthModal, UserProfile } from './components/AuthModal';
import { Plant, PLANTS_DATA } from './data/plants';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([
    { plant: PLANTS_DATA[2], quantity: 1 } // Pre-load 1 heirloom kitchen herb trio so bag is active and demonstrable
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(['fiddle-leaf-fig']);

  // Botanical Sanctuary Member State initialized with Nitin Kushwaha's information
  const [user, setUser] = useState<UserProfile>({
    name: 'Nitin Kushwaha',
    phone: '9837652655',
    address: 'Mani Nagar, Pandesara, Surat',
    city: 'Surat',
    state: 'Gujarat',
    email: 'nitin.kushwaha@verdant.org',
    memberSinceYear: 2026,
    membershipTier: 'Certified Botanical Society Fellow (2026)',
    isLoggedIn: true,
  });

  // Total items in cart
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant: Plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { plant, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(plantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (plantId: string) => {
    setCart((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleFavorite = (plantId: string) => {
    setFavorites((prev) =>
      prev.includes(plantId) ? prev.filter((id) => id !== plantId) : [...prev, plantId]
    );
  };

  const handleLogin = (credentials: { name?: string; phone: string; address?: string }) => {
    setUser((prev) => ({
      ...prev,
      name: credentials.name || prev.name,
      phone: credentials.phone || prev.phone,
      address: credentials.address || prev.address,
      isLoggedIn: true,
    }));
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E2922] selection:bg-[#2D5A3F]/20 selection:text-[#13241B]">
      {/* Top Bar (§2 Top Bar Contract) */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openBookingModal={() => scrollTo('workshops')}
        openAuthModal={() => setIsAuthModalOpen(true)}
        userName={user.name}
        isLoggedIn={user.isLoggedIn}
      />

      <main className="flex-1">
        {/* 1. Hero Sanctuary Showcase */}
        <Hero
          onExplorePlants={() => scrollTo('collection')}
          onOpenPlanner={() => scrollTo('planner')}
        />

        {/* 2. Living Botanical Specimens & Heirloom Nursery Catalog */}
        <PlantCatalog
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 3. Interactive Raised Bed & Companion Planting Planner */}
        <GardenBedPlanner />

        {/* 4. Seasonal Phenological Almanac & Care Checklist */}
        <SeasonalAlmanac />

        {/* 5. Diagnostic Plant Clinic & Foliage Troubleshooter */}
        <PlantClinic />

        {/* 6. Conservatory Tours & Rare Specimen Masterclasses */}
        <ConservatoryBooking
          isOpen={false}
          onClose={() => {}}
        />
      </main>

      {/* Slide-over Plant Bag / Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
      />

      {/* Login / Botanical Member Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Quiet Botanical Footer with Regional Office in Surat */}
      <Footer />
    </div>
  );
}
