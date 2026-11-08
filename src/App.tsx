import React, { useState } from 'react';
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
import { NotificationCenter, DispatchNotification } from './components/NotificationCenter';
import { GmailHubModal } from './components/GmailHubModal';
import { Plant, PLANTS_DATA } from './data/plants';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([
    { plant: PLANTS_DATA[2], quantity: 1 } // Pre-load 1 heirloom kitchen herb trio so bag is active and demonstrable
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isGmailHubOpen, setIsGmailHubOpen] = useState<boolean>(false);
  const [gmailPrefill, setGmailPrefill] = useState<{ recipient?: string; subject?: string; body?: string }>({
    recipient: 'majumderp937@gmail.com',
    subject: 'Order & Botanical Sanctuary Update - The Paradise Garden Service',
    body: '',
  });
  const [favorites, setFavorites] = useState<string[]>(['fiddle-leaf-fig']);

  // Botanical Sanctuary Member State initialized with Nitin Kushwaha's information
  const [user, setUser] = useState<UserProfile>({
    name: 'Nitin Kushwaha',
    phone: '9837652655',
    address: 'Mani Nagar, Pandesara, Surat',
    city: 'Surat',
    state: 'Gujarat',
    email: 'majumderp937@gmail.com',
    memberSinceYear: 2026,
    membershipTier: 'The Paradise Garden Society Fellow (2026)',
    isLoggedIn: true,
  });

  // Pre-seeded verified dispatches for phone 9837652655 and email majumderp937@gmail.com
  const [notifications, setNotifications] = useState<DispatchNotification[]>([
    {
      id: 'disp-sms-01',
      type: 'sms',
      recipient: '+91 9837652655',
      sender: 'The Paradise Garden Service (Surat Hub)',
      timestamp: 'Today at 10:15 AM',
      title: 'SMS Alert: Account & Sanctuary Pass Active',
      status: 'Delivered',
      content: `[The Paradise Garden Service - Surat]
Namaste Nitin Kushwaha,
Your botanical member profile is verified for 2026.
• Primary Contact: 9837652655
• Registered Email: majumderp937@gmail.com
• Regional Hub: Mani Nagar, Pandesara, Surat
Explore our heirloom specimens and raised bed designs anytime!
Helpline: +91 9837652655`,
    },
    {
      id: 'disp-email-01',
      type: 'email',
      recipient: 'majumderp937@gmail.com',
      sender: 'care@paradisegarden.in',
      timestamp: 'Today at 10:14 AM',
      subject: 'Welcome to The Paradise Garden Service (Surat Chapter - 2026)',
      title: 'Official Welcome & Verification Receipt',
      status: 'Delivered',
      content: `Dear Nitin Kushwaha (Sanctuary Member),

Thank you for choosing The Paradise Garden Service. Your account has been provisioned with full botanical privileges for 2026.

MEMBER PROFILE OVERVIEW:
------------------------------------------
• Lead Horticulturist: Nitin Kushwaha
• Cellular SMS: +91 9837652655
• Dispatched Email: majumderp937@gmail.com
• Registered Station: Mani Nagar, Pandesara, Surat, Gujarat 394221
• Currency: Indian Rupees (₹ INR)
• Year of Charter: 2026

SERVICES AVAILABLE:
1. Specimen Nursery with organic mycorrhizal root inoculation.
2. Companion Raised Bed Planner for Indian climates (Ayurvedic, Kitchen Spices, Terraces).
3. Victorian Conservatory Workshops & Glasshouse Masterclasses in Surat.

If you ever miss an external notification, all system communications are permanently indexed in your in-app Notification Center.

Warm regards,
The Paradise Garden Service Team
Mani Nagar, Pandesara, Surat, Gujarat`,
    },
  ]);

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

  // Dispatch Handlers
  const handleOrderPlaced = (order: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    items: string[];
    total: number;
    fulfillment: string;
    date: string;
  }) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSMS: DispatchNotification = {
      id: `disp-sms-${Date.now()}`,
      type: 'sms',
      recipient: `+91 ${order.customerPhone}`,
      sender: 'The Paradise Garden Service',
      timestamp: `Today at ${timeString}`,
      title: `Order ${order.orderId} Confirmed (₹${order.total.toLocaleString('en-IN')})`,
      status: 'Delivered',
      content: `[The Paradise Garden Service]
Order Confirmed: ${order.orderId}
Recipient: ${order.customerName}
Items: ${order.items.join(', ')}
Total Paid: ₹${order.total.toLocaleString('en-IN')}
Fulfillment: ${order.fulfillment} (${order.date})
Address: ${order.customerAddress}
Need assistance? Reach Nitin Kushwaha at 9837652655.`,
    };

    const newEmail: DispatchNotification = {
      id: `disp-email-${Date.now()}`,
      type: 'email',
      recipient: order.customerEmail || 'majumderp937@gmail.com',
      sender: 'orders@paradisegarden.in',
      timestamp: `Today at ${timeString}`,
      subject: `Order Receipt & Botanical Care Guide [${order.orderId}]`,
      title: `Order Confirmation #${order.orderId}`,
      status: 'Delivered',
      content: `Dear ${order.customerName},

Your specimen order ${order.orderId} has been successfully processed at The Paradise Garden Service Surat greenhouse.

ORDER SUMMARY:
------------------------------------------
Reference Number: ${order.orderId}
Scheduled Date: ${order.date}
Fulfillment Method: ${order.fulfillment}
Destination: ${order.customerAddress}
Total Amount: ₹${order.total.toLocaleString('en-IN')}

ITEMS RESERVED:
${order.items.map((it) => `• ${it}`).join('\n')}

All living specimens will arrive packed in our breathable cedar-shaving moisture cases with organic mycorrhizal root dip included.

Thank you for cultivating with The Paradise Garden Service (Est. 2026)!`,
    };

    setNotifications((prev) => [newSMS, newEmail, ...prev]);
  };

  const handleBookingConfirmed = (booking: {
    passCode: string;
    eventTitle: string;
    date: string;
    time: string;
    attendees: number;
    total: number;
    name: string;
    email: string;
  }) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSMS: DispatchNotification = {
      id: `disp-sms-booking-${Date.now()}`,
      type: 'sms',
      recipient: '+91 9837652655',
      sender: 'The Paradise Garden Service',
      timestamp: `Today at ${timeString}`,
      title: `Conservatory Pass Issued: ${booking.passCode}`,
      status: 'Delivered',
      content: `[The Paradise Garden Service - Pass Issued]
Pass Code: ${booking.passCode}
Event: ${booking.eventTitle}
Guest: ${booking.name} (${booking.attendees} seats)
Date: ${booking.date} at ${booking.time}
Total: ₹${booking.total.toLocaleString('en-IN')}
Pavilion Location: Mani Nagar, Pandesara, Surat. Show this SMS at the gate.`,
    };

    const newEmail: DispatchNotification = {
      id: `disp-email-booking-${Date.now()}`,
      type: 'email',
      recipient: booking.email || 'majumderp937@gmail.com',
      sender: 'workshops@paradisegarden.in',
      timestamp: `Today at ${timeString}`,
      subject: `Your Conservatory Access Pass: ${booking.passCode} - ${booking.eventTitle}`,
      title: `Conservatory Tour Reservation (${booking.passCode})`,
      status: 'Delivered',
      content: `Dear ${booking.name},

Your conservatory masterclass access pass has been officially issued.

RESERVATION DETAILS:
------------------------------------------
Pass Reference: ${booking.passCode}
Workshop: ${booking.eventTitle}
Date & Time: ${booking.date} at ${booking.time}
Attendees: ${booking.attendees} participants
Total Fee: ₹${booking.total.toLocaleString('en-IN')}

Location: Victorian Glasshouse Pavilion, The Paradise Garden Service, Mani Nagar, Pandesara, Surat.
Please show your digital pass code on arrival.`,
    };

    setNotifications((prev) => [newSMS, newEmail, ...prev]);
  };

  const handleResendSMS = () => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const freshSMS: DispatchNotification = {
      id: `disp-sms-manual-${Date.now()}`,
      type: 'sms',
      recipient: '+91 9837652655',
      sender: 'The Paradise Garden Service',
      timestamp: `Today at ${timeString}`,
      title: 'Manual Resend: Verified Mobile Notification',
      status: 'Delivered',
      content: `[The Paradise Garden Service Resend - ${timeString}]
Hello Nitin Kushwaha,
Your notification was resent on request to +91 9837652655.
Account: Mani Nagar, Pandesara, Surat.
Service: The Paradise Garden Service (2026).
All systems operating normally!`,
    };
    setNotifications((prev) => [freshSMS, ...prev]);
  };

  const handleResendEmail = () => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const freshEmail: DispatchNotification = {
      id: `disp-email-manual-${Date.now()}`,
      type: 'email',
      recipient: 'majumderp937@gmail.com',
      sender: 'care@paradisegarden.in',
      timestamp: `Today at ${timeString}`,
      subject: `Resent Notification: The Paradise Garden Service Status (${timeString})`,
      title: 'Resent Email Notification',
      status: 'Delivered',
      content: `Hello Nitin Kushwaha / Sanctuary Member,

This is a requested re-dispatch sent directly to majumderp937@gmail.com.

DISPATCH STATUS:
------------------------------------------
• Delivery Target: majumderp937@gmail.com
• Phone on File: +91 9837652655
• Time Dispatched: ${timeString}
• Regional Headquarters: Mani Nagar, Pandesara, Surat
• Currency: Indian Rupees (₹ INR)

All account activity, plant deliveries, and workshop reservations remain synchronized.

Warm regards,
The Paradise Garden Service
Surat, Gujarat`,
    };
    setNotifications((prev) => [freshEmail, ...prev]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleOpenGmailHub = (params?: { recipient?: string; subject?: string; body?: string }) => {
    if (params) {
      setGmailPrefill({
        recipient: params.recipient || 'majumderp937@gmail.com',
        subject: params.subject || 'The Paradise Garden Service Update',
        body: params.body || '',
      });
    }
    setIsGmailHubOpen(true);
  };

  const handleEmailSentNotice = (details: { to: string; subject: string; body: string; id: string }) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newDispatch: DispatchNotification = {
      id: `disp-gmail-${Date.now()}`,
      type: 'email',
      recipient: details.to,
      sender: 'majumderp937@gmail.com (Gmail API)',
      timestamp: `Today at ${timeString}`,
      subject: details.subject,
      title: `Gmail API Verified Transmission [ID: ${details.id.slice(0, 8)}]`,
      status: 'Delivered',
      content: details.body,
    };
    setNotifications((prev) => [newDispatch, ...prev]);
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
        openNotifications={() => setIsNotificationOpen(true)}
        openGmailHub={() => handleOpenGmailHub()}
        notificationCount={notifications.length}
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
          onBookingConfirmed={handleBookingConfirmed}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onOpenGmailHub={handleOpenGmailHub}
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
        onOrderPlaced={handleOrderPlaced}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenGmailHub={handleOpenGmailHub}
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

      {/* Interactive SMS & Email Notification Center Drawer */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onResendSMS={handleResendSMS}
        onResendEmail={handleResendEmail}
        onClearNotifications={handleClearNotifications}
      />

      {/* Official Google Workspace Gmail Hub Modal */}
      <GmailHubModal
        isOpen={isGmailHubOpen}
        onClose={() => setIsGmailHubOpen(false)}
        onEmailSentNotice={handleEmailSentNotice}
        defaultRecipient={gmailPrefill.recipient}
        defaultSubject={gmailPrefill.subject}
        defaultBody={gmailPrefill.body}
      />

      {/* Quiet Botanical Footer with Regional Office in Surat */}
      <Footer />
    </div>
  );
}
