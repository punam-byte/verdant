import React, { useState } from 'react';
import { Mail, Check, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#112419] text-[#E5EFE7] pt-16 pb-12 border-t border-[#1F3D2C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#1F3D2C]">
          {/* Col 1: Brand & Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#FAF9F6] text-[#13241B] flex items-center justify-center font-serif text-lg font-bold">
                V
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF9F6]">
                Verdant Sanctuary
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C8DCD0]">
              <ShieldCheck className="w-4 h-4 text-[#52A374]" />
              <span>Certified 100% Peat-Free Organic Nursery</span>
            </div>
          </div>

          {/* Col 2: Regional Center & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-base font-bold text-[#FAF9F6] mb-2">
              Regional Center & Liaison
            </h4>
            <div className="space-y-2 text-[#A8C2B2]">
              <div>
                <span className="text-[#FAF9F6] font-medium block">Nursery Lead & Coordinator</span>
                <span className="text-[#D2DFD6]">Nitin Kushwaha</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#52A374] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#FAF9F6] font-medium block">Sanctuary Regional Hub</span>
                  <span>Mani Nagar, Pandesara, Surat</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#52A374] shrink-0" />
                <span className="text-[#D2DFD6] font-mono">Helpline: +91 9837652655</span>
              </div>
            </div>
          </div>

          {/* Col 3: Field Notes Newsletter */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif text-base font-bold text-[#FAF9F6] mb-1">
              Sanctuary Field Notes
            </h4>
            <p className="text-[#A8C2B2] font-light leading-relaxed">
              Bi-weekly seasonal planting alerts, frost warnings, and rare specimen releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#1B3F2B] border border-[#2B5E41] text-xs text-[#A7F3D0] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34D399]" />
                <span>Subscribed to Field Notes!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#162F21] border border-[#2B4B37] rounded-lg text-white placeholder-[#789684] focus:outline-none focus:ring-1 focus:ring-[#52A374]"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold text-[#13241B] bg-[#FAF9F6] hover:bg-white rounded-lg transition-colors"
                >
                  Join Almanac Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9E88] gap-4 font-mono">
          <div>
            © 2026 Verdant Botanical Sanctuary & Nursery. Registered Hub: Mani Nagar, Pandesara, Surat.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Line: +91 9837652655</span>
            <span>·</span>
            <span>Season 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
