import React from 'react';
import { ShoppingBag, Calendar, Compass, Bell, Mail } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  openBookingModal: () => void;
  openAuthModal: () => void;
  openNotifications: () => void;
  openGmailHub: () => void;
  notificationCount: number;
  userName?: string;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
  openBookingModal,
  openAuthModal,
  openNotifications,
  openGmailHub,
  notificationCount,
  userName,
  isLoggedIn,
}) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7ECE4] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => scrollTo('hero')}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <span className="w-8 h-8 rounded-full bg-[#1A3828] text-[#F7F9F6] flex items-center justify-center font-serif text-lg font-bold">
            P
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#13241B] whitespace-nowrap shrink-0 group-hover:text-[#2D5A3F] transition-colors">
            The Paradise Garden Service
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#465A4F]">
          <button
            onClick={() => scrollTo('collection')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#13241B] pb-1 border-b-2 ${
              activeSection === 'collection' ? 'border-[#2D5A3F] text-[#13241B] font-semibold' : 'border-transparent'
            }`}
          >
            Living Botanicals
          </button>
          <button
            onClick={() => scrollTo('planner')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#13241B] pb-1 border-b-2 ${
              activeSection === 'planner' ? 'border-[#2D5A3F] text-[#13241B] font-semibold' : 'border-transparent'
            }`}
          >
            Garden Bed Planner
          </button>
          <button
            onClick={() => scrollTo('almanac')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#13241B] pb-1 border-b-2 ${
              activeSection === 'almanac' ? 'border-[#2D5A3F] text-[#13241B] font-semibold' : 'border-transparent'
            }`}
          >
            Seasonal Almanac
          </button>
          <button
            onClick={() => scrollTo('clinic')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#13241B] pb-1 border-b-2 ${
              activeSection === 'clinic' ? 'border-[#2D5A3F] text-[#13241B] font-semibold' : 'border-transparent'
            }`}
          >
            Plant Clinic
          </button>
          <button
            onClick={() => scrollTo('workshops')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#13241B] pb-1 border-b-2 ${
              activeSection === 'workshops' ? 'border-[#2D5A3F] text-[#13241B] font-semibold' : 'border-transparent'
            }`}
          >
            Conservatory Tours
          </button>
        </nav>

        {/* Zone 3: 1 primary action & member auth */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Gmail Integration Hub Trigger */}
          <button
            onClick={openGmailHub}
            aria-label="Open Gmail integration hub"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#13241B] bg-white hover:bg-[#F2F5F0] border border-[#DCE4DA] transition-all shadow-xs"
            title="Open Gmail Workspace Integration (majumderp937@gmail.com)"
          >
            <div className="w-4 h-4 rounded-full bg-[#EA4335] text-white flex items-center justify-center text-[9px] font-bold">
              M
            </div>
            <span className="hidden sm:inline">Gmail</span>
          </button>

          {/* Notification Center Trigger */}
          <button
            onClick={openNotifications}
            aria-label="View SMS and email notifications"
            className="relative p-2 rounded-lg text-[#465A4F] hover:text-[#13241B] hover:bg-[#F2F5F0] transition-colors border border-transparent hover:border-[#DCE4DA]"
            title="View Dispatched SMS (9837652655) & Email (majumderp937@gmail.com)"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#1A3828] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={openAuthModal}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isLoggedIn
                ? 'bg-[#EAEFE8] text-[#1A3828] hover:bg-[#DCE4DA]'
                : 'text-[#465A4F] hover:text-[#13241B] hover:bg-[#F2F5F0]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#1A3828] text-white flex items-center justify-center text-[10px]">
              {isLoggedIn && userName ? userName.slice(0, 1) : '👤'}
            </span>
            <span className="hidden sm:inline">
              {isLoggedIn ? (userName || 'Nitin Kushwaha') : 'Login'}
            </span>
          </button>

          <button
            onClick={openBookingModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1A3828] bg-[#EAEFE8] hover:bg-[#DCE4DA] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>

          <button
            onClick={openCart}
            aria-label="View plant bag"
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1A3828] hover:bg-[#254F39] rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Plant Bag</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#44825D] text-white text-[11px] font-bold rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
