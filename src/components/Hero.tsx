import React from 'react';
import { ArrowDown, Sprout, Grid3X3, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplorePlants: () => void;
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePlants, onOpenPlanner }) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Hero Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#DCE4DA] bg-[#112419] text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-end">
          {/* Background Conservatory Image with Rich Gradient Scrim */}
          <img
            src="/src/assets/images/hero_botanical_sanctuary_1794124721668.jpg"
            alt="Historic Victorian glasshouse conservatory filled with tropical palms and tree ferns"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.02] filter brightness-[0.88]"
          />

          {/* Measured Dark Scrim for Perfect 4.5:1+ WCAG Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1811] via-[#0B1811]/60 to-black/25" />

          {/* Editorial Content Overlay */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B5D8C3] font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#52A374]"></span>
              <span>Found in 2026 Collection · All Types of Plants in Indian Rupees (₹)</span>
            </div>

            <h1
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-[#FAF9F6] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Cultivating living sanctuaries: all types of plants & companion garden plans.
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={onExplorePlants}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#13241B] bg-[#FAF9F6] hover:bg-white rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sprout className="w-4 h-4 text-[#2D5A3F]" />
                <span>Explore All Types of Plants (₹ INR)</span>
              </button>

              <button
                onClick={onOpenPlanner}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#1A3828]/80 hover:bg-[#1A3828] backdrop-blur-md border border-[#446A55] rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Grid3X3 className="w-4 h-4 text-[#88C5A0]" />
                <span>All Types of Garden Plans</span>
              </button>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Adjacency Bar (§1.H) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white rounded-2xl border border-[#E7ECE4] shadow-sm">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3828] tabular-nums">
              450+
            </div>
            <div className="text-xs sm:text-sm text-[#465A4F] mt-1">
              Plants in Indian Rupees (₹)
            </div>
            <div className="text-[11px] text-[#788E81] mt-0.5">Ayurvedic, Foliage & Kitchen species</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3828] tabular-nums">
              2026
            </div>
            <div className="text-xs sm:text-sm text-[#465A4F] mt-1">
              Found in 2026 Collection
            </div>
            <div className="text-[11px] text-[#788E81] mt-0.5">Certified 2026 propagation season</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3828] tabular-nums">
              All Types
            </div>
            <div className="text-xs sm:text-sm text-[#465A4F] mt-1">
              Garden Plans & Blueprints
            </div>
            <div className="text-[11px] text-[#788E81] mt-0.5">Ayurvedic, terrace, kitchen & balcony</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1A3828] tabular-nums">
              Surat Hub
            </div>
            <div className="text-xs sm:text-sm text-[#465A4F] mt-1">
              Nitin Kushwaha (Lead)
            </div>
            <div className="text-[11px] text-[#788E81] mt-0.5">Mani Nagar, Pandesara · 9837652655</div>
          </div>
        </div>
      </div>
    </section>
  );
};
