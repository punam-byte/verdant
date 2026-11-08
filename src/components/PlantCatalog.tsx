import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sun, Droplets, ShieldCheck, Plus, Eye, X, Check, Heart } from 'lucide-react';
import { Plant, PLANTS_DATA } from '../data/plants';

interface PlantCatalogProps {
  onAddToCart: (plant: Plant) => void;
  favorites: string[];
  onToggleFavorite: (plantId: string) => void;
}

export const PlantCatalog: React.FC<PlantCatalogProps> = ({
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('All');
  const [selectedWatering, setSelectedWatering] = useState<string>('All');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);
  const [activeModalPlant, setActiveModalPlant] = useState<Plant | null>(null);
  const [modalTab, setModalTab] = useState<'care' | 'soil' | 'pruning' | 'companions'>('care');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    'All',
    'Ayurvedic & Sacred Indian',
    'Architectural Foliage',
    'Rare Specimens',
    'Heirloom Herbs',
    'Outdoor Perennials',
    'Low-Light Companions'
  ];

  const filteredPlants = useMemo(() => {
    return PLANTS_DATA.filter((plant) => {
      // Search
      const matchesSearch =
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === 'All' || plant.category === selectedCategory;

      // Sunlight
      const matchesSunlight =
        selectedSunlight === 'All' || plant.sunlight === selectedSunlight;

      // Watering
      const matchesWatering =
        selectedWatering === 'All' || plant.watering === selectedWatering;

      // Pet Friendly
      const matchesPet = !petFriendlyOnly || plant.petFriendly;

      return matchesSearch && matchesCategory && matchesSunlight && matchesWatering && matchesPet;
    });
  }, [searchQuery, selectedCategory, selectedSunlight, selectedWatering, petFriendlyOnly]);

  const handleAdd = (plant: Plant, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(plant);
    setAddedNotice(`Added "${plant.name}" to your plant bag`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <section id="collection" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E7ECE4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#52A374]"></span>
              <span>Found in 2026 Conservatory Catalog · Indian Rupees (₹)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#13241B]">
              Living Botanicals & All Types of Plants
            </h2>
          </div>
          <p className="text-sm text-[#5D7065] max-w-md font-light leading-relaxed">
            From revered Ayurvedic Tulsi and fragrant Mogra to rare Variegated Monsteras, every specimen
            is acclimated for Indian gardens and homes, priced in Indian Rupees (₹).
          </p>
        </div>

        {/* Notification Toast */}
        {addedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-[#1A3828] text-white text-sm flex items-center justify-between shadow-md transition-all">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#88C5A0]" />
              <span>{addedNotice}</span>
            </div>
            <button
              onClick={() => setAddedNotice(null)}
              className="text-[#B5D8C3] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter Bar & Search */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7ECE4] shadow-sm mb-10 space-y-4">
          {/* Category Tabs (Interactive Segmented Control - §1.A DO) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#1A3828] text-white shadow-sm'
                    : 'bg-[#F2F5F0] text-[#465A4F] hover:bg-[#E5ECE3] hover:text-[#13241B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-[#EEF2EB]">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#788E81]" />
              <input
                type="text"
                placeholder="Search by botanical or common name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] focus:border-[#2D5A3F] text-[#13241B]"
              />
            </div>

            {/* Sunlight Selector */}
            <div>
              <select
                aria-label="Filter by sunlight requirements"
                value={selectedSunlight}
                onChange={(e) => setSelectedSunlight(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
              >
                <option value="All">All Sunlight Levels</option>
                <option value="Full Sun">Full Sun (6h+ direct)</option>
                <option value="Bright Indirect">Bright Indirect</option>
                <option value="Dappled / Low Light">Dappled / Low Light</option>
              </select>
            </div>

            {/* Watering Selector */}
            <div>
              <select
                aria-label="Filter by watering schedule"
                value={selectedWatering}
                onChange={(e) => setSelectedWatering(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
              >
                <option value="All">All Watering Needs</option>
                <option value="Low">Low (Drought-tolerant)</option>
                <option value="Moderate">Moderate (Weekly)</option>
                <option value="Frequent">Frequent (Moist soil)</option>
              </select>
            </div>

            {/* Pet Friendly Toggle Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setPetFriendlyOnly(!petFriendlyOnly)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border transition-colors ${
                  petFriendlyOnly
                    ? 'bg-[#EAEFE8] border-[#2D5A3F] text-[#1A3828] font-medium'
                    : 'bg-[#FAF9F6] border-[#DCE4DA] text-[#465A4F] hover:bg-[#F0F4ED]'
                }`}
              >
                <span>Pet Non-Toxic Only</span>
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                  petFriendlyOnly ? 'bg-[#2D5A3F] border-[#2D5A3F] text-white' : 'border-[#9CAE9F]'
                }`}>
                  {petFriendlyOnly ? '✓' : ''}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-[#5D7065] mb-6">
          <div className="font-medium">
            Showing <span className="text-[#13241B] font-semibold">{filteredPlants.length}</span> curated specimens
          </div>
          {(searchQuery || selectedCategory !== 'All' || selectedSunlight !== 'All' || selectedWatering !== 'All' || petFriendlyOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSunlight('All');
                setSelectedWatering('All');
                setPetFriendlyOnly(false);
              }}
              className="text-[#2D5A3F] hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Plant Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-2xl border border-dashed border-[#DCE4DA]">
            <p className="font-serif text-xl text-[#13241B] mb-2">No botanical specimens matched your criteria</p>
            <p className="text-xs text-[#6B7D72] mb-4">Try adjusting your sunlight exposure, water frequency, or search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSunlight('All');
                setSelectedWatering('All');
                setPetFriendlyOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1A3828] rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => {
              const isFav = favorites.includes(plant.id);
              return (
                <div
                  key={plant.id}
                  onClick={() => setActiveModalPlant(plant)}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E7ECE4] hover:border-[#C8D6C4] transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  {/* Lead with Imagery (65-75% height proportion - §2.B E-Commerce) */}
                  <div className="relative aspect-[4/3] bg-[#F4F6F1] overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(plant.id);
                      }}
                      aria-label="Save to favorite plants"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#465A4F] hover:text-[#B91C1C] transition-colors shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B91C1C] text-[#B91C1C]' : ''}`} />
                    </button>

                    {/* Quick View Pill-Free Indicator */}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white py-1.5 px-3 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Botanical Care Guide</span>
                    </div>
                  </div>

                  {/* Card Content & Zero-Pill Unboxed Metadata (§1.A) */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata with Typographic Separator */}
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7D72] mb-1 font-mono tracking-tight">
                        <span>{plant.sunlight}</span>
                        <span aria-hidden="true">·</span>
                        <span>{plant.watering} Water</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#2D5A3F] font-semibold">2026 Batch</span>
                      </div>

                      {/* Plant Common Name & Botanical Name */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#13241B] group-hover:text-[#2D5A3F] transition-colors leading-snug">
                          {plant.name}
                        </h3>
                        {plant.hindiName && (
                          <span className="text-xs text-[#2D5A3F] font-medium shrink-0">
                            {plant.hindiName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs italic text-[#788E81] mb-3">
                        {plant.botanicalName}
                      </p>

                      <p className="text-xs text-[#55695C] line-clamp-2 leading-relaxed mb-4 font-light">
                        {plant.description}
                      </p>
                    </div>

                    {/* Price & Action Row (Indian Rupees ₹) */}
                    <div className="pt-3 border-t border-[#F0F4ED] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#788E81] block">Living Nursery Pot</span>
                        <span className="font-mono text-base font-bold text-[#13241B] tabular-nums">
                          ₹{plant.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAdd(plant, e)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#2A573F] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Plant Detail Modal */}
        {activeModalPlant && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={() => setActiveModalPlant(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#DCE4DA] relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalPlant(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Modal Visual Asset Column */}
                <div className="relative aspect-square md:aspect-auto bg-[#F4F6F1]">
                  <img
                    src={activeModalPlant.image}
                    alt={activeModalPlant.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-white/60 text-xs text-[#13241B]">
                    <span className="font-bold block">Specimen Origin:</span>
                    <span className="text-[#55695C]">{activeModalPlant.origin}</span>
                  </div>
                </div>

                {/* Modal Info Column */}
                <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#6B7D72] mb-1 font-mono">
                      <span>{activeModalPlant.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeModalPlant.difficulty}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#13241B]">
                      {activeModalPlant.name}
                    </h3>
                    <div className="text-sm italic text-[#55695C] mb-4">
                      {activeModalPlant.botanicalName}
                    </div>

                    <div className="flex items-center gap-4 py-3 border-y border-[#EEF2EB] text-xs text-[#33463B] mb-5">
                      <div>
                        <span className="text-[#788E81] block">Mature Height</span>
                        <span className="font-medium">{activeModalPlant.matureHeight}</span>
                      </div>
                      <div className="h-6 w-px bg-[#DCE4DA]" />
                      <div>
                        <span className="text-[#788E81] block">Container Size</span>
                        <span className="font-medium">{activeModalPlant.potSize}</span>
                      </div>
                      <div className="h-6 w-px bg-[#DCE4DA]" />
                      <div>
                        <span className="text-[#788E81] block">Toxicity</span>
                        <span className="font-medium">
                          {activeModalPlant.petFriendly ? 'Pet Non-Toxic' : 'Mildly Toxic'}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Tab Navigation */}
                    <div className="flex items-center gap-1 border-b border-[#EEF2EB] mb-4 text-xs">
                      <button
                        onClick={() => setModalTab('care')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-colors ${
                          modalTab === 'care'
                            ? 'border-[#1A3828] text-[#13241B]'
                            : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                        }`}
                      >
                        Care Protocol
                      </button>
                      <button
                        onClick={() => setModalTab('soil')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-colors ${
                          modalTab === 'soil'
                            ? 'border-[#1A3828] text-[#13241B]'
                            : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                        }`}
                      >
                        Soil Recipe
                      </button>
                      <button
                        onClick={() => setModalTab('pruning')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-colors ${
                          modalTab === 'pruning'
                            ? 'border-[#1A3828] text-[#13241B]'
                            : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                        }`}
                      >
                        Pruning & Growth
                      </button>
                      <button
                        onClick={() => setModalTab('companions')}
                        className={`pb-2 px-2 font-medium border-b-2 transition-colors ${
                          modalTab === 'companions'
                            ? 'border-[#1A3828] text-[#13241B]'
                            : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                        }`}
                      >
                        Companions
                      </button>
                    </div>

                    {/* Tab Panels */}
                    <div className="text-xs text-[#465A4F] leading-relaxed mb-6 min-h-[100px]">
                      {modalTab === 'care' && (
                        <div className="space-y-3">
                          <p>{activeModalPlant.description}</p>
                          <div className="p-3 rounded-xl bg-[#F4F7F2] border border-[#E2EAE0] space-y-1.5">
                            <div className="font-semibold text-[#1A3828]">Light & Watering Cadence:</div>
                            <div>• Light: {activeModalPlant.sunlight} exposure</div>
                            <div>• Water: {activeModalPlant.watering} schedule — check topsoil before watering</div>
                          </div>
                        </div>
                      )}
                      {modalTab === 'soil' && (
                        <div className="space-y-2">
                          <p className="font-semibold text-[#1A3828]">Horticultural Substrate Formulation:</p>
                          <p>{activeModalPlant.soilRecipe}</p>
                          <p className="text-[11px] text-[#788E81] italic">
                            All Verdant plants ship in 100% peat-free, responsibly sourced sustainable pine bark & coconut pith.
                          </p>
                        </div>
                      )}
                      {modalTab === 'pruning' && (
                        <div className="space-y-2">
                          <p className="font-semibold text-[#1A3828]">Pruning & Propagation Technique:</p>
                          <p>{activeModalPlant.pruningNotes}</p>
                        </div>
                      )}
                      {modalTab === 'companions' && (
                        <div>
                          <p className="font-semibold text-[#1A3828] mb-2">Recommended Plant Neighbors:</p>
                          <div className="flex flex-wrap gap-2">
                            {activeModalPlant.companionPlants.map((comp) => (
                              <span
                                key={comp}
                                className="px-2.5 py-1 rounded-md bg-[#EEF3EC] text-[#2D5A3F] text-xs font-medium"
                              >
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Purchase Footer */}
                  <div className="pt-4 border-t border-[#EEF2EB] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#788E81] block">Living Nursery Specimen · 2026 Batch</span>
                      <span className="font-mono text-xl font-bold text-[#13241B] tabular-nums">
                        ₹{activeModalPlant.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        handleAdd(activeModalPlant);
                        setActiveModalPlant(null);
                      }}
                      className="px-6 py-3 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Plant Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
