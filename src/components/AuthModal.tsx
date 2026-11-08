import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, ShieldCheck, LogOut, Check, X, Lock, Mail, Edit3 } from 'lucide-react';

export interface UserProfile {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  email: string;
  memberSinceYear: number;
  membershipTier: string;
  isLoggedIn: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogin: (credentials: { name?: string; phone: string; address?: string }) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogin,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'profile'>('login');
  const [phoneInput, setPhoneInput] = useState(user.phone || '9837652655');
  const [nameInput, setNameInput] = useState(user.name || 'Nitin Kushwaha');
  const [addressInput, setAddressInput] = useState(user.address || 'Mani Nagar, Pandesara, Surat');
  const [emailInput, setEmailInput] = useState(user.email || 'majumderp937@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [isEditing, setIsEditing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  React.useEffect(() => {
    if (user.phone) setPhoneInput(user.phone);
    if (user.name) setNameInput(user.name);
    if (user.address) setAddressInput(user.address);
    if (user.email) setEmailInput(user.email);
  }, [user]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: nameInput || 'Nitin Kushwaha',
      phone: phoneInput || '9837652655',
      address: addressInput || 'Mani Nagar, Pandesara, Surat',
    });
    setSuccessToast(`Welcome back, ${nameInput || 'Nitin Kushwaha'}!`);
    setTimeout(() => {
      setSuccessToast(null);
      setMode('profile');
    }, 1200);
  };

  const handleQuickDemoLogin = () => {
    onLogin({
      name: 'Nitin Kushwaha',
      phone: '9837652655',
      address: 'Mani Nagar, Pandesara, Surat',
    });
    setNameInput('Nitin Kushwaha');
    setPhoneInput('9837652655');
    setAddressInput('Mani Nagar, Pandesara, Surat');
    setSuccessToast('Signed in as Nitin Kushwaha (Surat Sanctuary Member 2026)');
    setTimeout(() => {
      setSuccessToast(null);
      setMode('profile');
    }, 1200);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: nameInput,
      phone: phoneInput,
      address: addressInput,
      email: emailInput,
    });
    setIsEditing(false);
    setSuccessToast('Profile details updated successfully');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const showProfile = user.isLoggedIn && mode !== 'login' && mode !== 'register';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#DCE4DA] relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E7ECE4] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1A3828] text-white flex items-center justify-center font-serif text-sm font-bold">
              {user.isLoggedIn ? user.name.slice(0, 1) : 'P'}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#13241B]">
                {user.isLoggedIn ? 'The Paradise Member Portal' : 'Member Login & Sign In'}
              </h3>
              <p className="text-[11px] text-[#788E81] font-mono">
                Season 2026 · The Paradise Garden Service
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close portal"
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EAEFE8] border border-[#DCE4DA] flex items-center justify-center text-[#465A4F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="mx-6 mt-4 p-3 bg-[#EAEFE8] border border-[#2D5A3F]/30 rounded-xl text-xs text-[#1A3828] flex items-center gap-2">
            <Check className="w-4 h-4 text-[#2D5A3F]" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="p-6">
          {user.isLoggedIn ? (
            /* Logged-In Profile Dashboard */
            <div className="space-y-6">
              {/* Member Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A3828] to-[#254F39] text-white shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-[#A8C2B2] uppercase">
                    The Paradise Garden Fellow 2026
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#3B7252] text-[10px] font-mono font-bold">
                    Active 2026
                  </span>
                </div>

                <div className="text-xl font-serif font-bold text-[#FAF9F6] mb-1">
                  {user.name}
                </div>

                <div className="space-y-1.5 text-xs text-[#D2DFD6] pt-2 border-t border-white/10 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#88C5A0]" />
                    <span>+91 {user.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#88C5A0] shrink-0 mt-0.5" />
                    <span>{user.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#A8C2B2]">
                    <Calendar className="w-3.5 h-3.5 text-[#88C5A0]" />
                    <span>Enrolled Season: Year {user.memberSinceYear}</span>
                  </div>
                </div>
              </div>

              {/* Editing or View Mode */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3.5 pt-2">
                  <div className="text-xs font-semibold text-[#13241B] uppercase tracking-wider">
                    Edit Account & Address Information
                  </div>

                  <div>
                    <label className="text-[11px] text-[#55695C] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#55695C] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#55695C] block mb-1">Sanctuary Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 text-xs text-[#55695C] bg-[#F2F5F0] hover:bg-[#E5ECE3] rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-lg transition-colors shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7ECE4] text-xs space-y-2">
                    <div className="flex justify-between items-center text-[#788E81]">
                      <span>Member ID:</span>
                      <span className="font-mono font-bold text-[#13241B]">PGS-SURAT-2026</span>
                    </div>
                    <div className="flex justify-between items-center text-[#788E81]">
                      <span>Regional Chapter:</span>
                      <span className="font-semibold text-[#13241B]">Surat / Pandesara Hub</span>
                    </div>
                    <div className="flex justify-between items-center text-[#788E81]">
                      <span>Nursery Dispatch:</span>
                      <span className="text-[#2D5A3F] font-semibold">Priority 2026 Allocation</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex-1 py-2.5 text-xs font-semibold text-[#1A3828] bg-[#EAEFE8] hover:bg-[#DCE4DA] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Information</span>
                    </button>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="py-2.5 px-4 text-xs font-medium text-[#B91C1C] hover:bg-[#FDF2F2] rounded-xl border border-[#FCA5A5] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login & Sign In Form */
            <div className="space-y-5">
              {/* Quick Demo Login Preset Banner for Nitin Kushwaha */}
              <div className="p-4 rounded-2xl bg-[#F2F7F1] border border-[#DFECE0] space-y-2">
                <div className="text-xs font-semibold text-[#1A3828] flex items-center justify-between">
                  <span>Fast One-Click Member Sign In:</span>
                  <span className="text-[10px] font-mono bg-[#2D5A3F] text-white px-1.5 py-0.5 rounded">
                    2026 Certified
                  </span>
                </div>
                <div className="text-xs text-[#465A4F]">
                  <strong className="text-[#13241B]">Nitin Kushwaha</strong> · Mani Nagar, Pandesara, Surat
                  <div className="text-[11px] text-[#6B7D72] font-mono mt-0.5">
                    Phone: +91 9837652655 · Season 2026
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full mt-1 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Log In as Nitin Kushwaha</span>
                </button>
              </div>

              {/* Standard Login / Sign In Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                <div>
                  <label className="text-xs font-semibold text-[#13241B] block mb-1">
                    Member Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#788E81]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nitin Kushwaha"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13241B] block mb-1">
                    Registered Mobile / Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#788E81]" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9837652655"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13241B] block mb-1">
                    Garden Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#788E81]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mani Nagar, Pandesara, Surat"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#13241B] block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#788E81]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-all shadow-md active:scale-95"
                >
                  Sign In to Garden Account (Year 2026)
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
