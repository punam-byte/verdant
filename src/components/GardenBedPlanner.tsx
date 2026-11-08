import React, { useState, useMemo } from 'react';
import {
  GARDEN_CROPS,
  GardenCrop,
  evaluateCompanionPlanting,
  PRESET_BEDS,
} from '../data/gardenPlanner';
import {
  Sprout,
  Sun,
  Droplets,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Printer,
  Compass,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';

export const GardenBedPlanner: React.FC = () => {
  // 4 rows x 6 cols grid initialized with Ayurvedic & Indian Kitchen Guild
  const initialGrid: (string | null)[][] = [
    ['marigold', 'tulsi', 'tulsi', 'marigold', 'coriander', 'coriander'],
    ['tulsi', 'tulsi', 'mint', 'coriander', 'coriander', 'marigold'],
    ['marigold', 'chili', 'tulsi', 'chili', 'bean', 'bean'],
    ['mint', 'coriander', 'marigold', 'rosemary', 'lavender', 'lavender']
  ];

  const [grid, setGrid] = useState<(string | null)[][]>(initialGrid);
  const [activePlanKey, setActivePlanKey] = useState<string>('ayurvedicSanctuary');
  const [selectedCropId, setSelectedCropId] = useState<string>('tulsi');
  const [sunOrientation, setSunOrientation] = useState<'South (Full 8h+)' | 'East (Morning 5h)' | 'Partial Shade'>('South (Full 8h+)');
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Evaluate current companion synergies and conflicts
  const evaluation = useMemo(() => {
    return evaluateCompanionPlanting(grid);
  }, [grid]);

  // Handle cell click: plant selected crop or remove if clicking same
  const handleCellClick = (r: number, c: number) => {
    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      if (copy[r][c] === selectedCropId) {
        copy[r][c] = null; // Dig up / remove
      } else {
        copy[r][c] = selectedCropId; // Plant
      }
      return copy;
    });
  };

  // Quick preset loading for All Types of Garden Plans
  const loadPreset = (presetKey: string) => {
    setActivePlanKey(presetKey);
    if (presetKey === 'clear') {
      setGrid([
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
      ]);
    } else if (PRESET_BEDS[presetKey]) {
      setGrid(PRESET_BEDS[presetKey].grid.map((r) => [...r]));
    }
  };

  // Crop count summary
  const cropCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell) {
          counts[cell] = (counts[cell] || 0) + 1;
        }
      });
    });
    return counts;
  }, [grid]);

  const totalPlantedCells = Object.values(cropCounts).reduce((a, b) => a + b, 0);

  return (
    <section id="planner" className="py-16 md:py-24 bg-[#F5F7F3] border-b border-[#E7ECE4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#2D5A3F]" />
              <span>Found in 2026 Collection · Raised Bed & Terrace Landscape Designer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#13241B]">
              Companion Garden Bed Planner (All Types of Plans)
            </h2>
          </div>
          <p className="text-sm text-[#5D7065] max-w-md font-light leading-relaxed">
            Choose from all types of garden blueprints: Ayurvedic medicinal potagers, urban terrace
            vegetable guilds, spice gardens, and drought-tolerant pollinator beds.
          </p>
        </div>

        {/* Toolbar: All Types of Plans Selector */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7ECE4] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEF2EB]">
            <span className="text-xs font-bold text-[#1A3828] uppercase tracking-wider flex items-center gap-1.5">
              <span>All Types of Garden Plans:</span>
              <span className="text-[10px] font-mono bg-[#E2EAE0] text-[#2D5A3F] px-1.5 py-0.5 rounded">
                2026 Edition
              </span>
            </span>
            <div className="flex items-center gap-2 text-xs text-[#788E81]">
              <span>Active Blueprint:</span>
              <strong className="text-[#13241B]">
                {PRESET_BEDS[activePlanKey]?.name || 'Custom Garden'}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => loadPreset('ayurvedicSanctuary')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activePlanKey === 'ayurvedicSanctuary'
                    ? 'bg-[#1A3828] text-white shadow-sm'
                    : 'bg-[#F2F5F0] text-[#13241B] hover:bg-[#E2EAE0]'
                }`}
              >
                1. Ayurvedic Sanctuary Plan
              </button>
              <button
                onClick={() => loadPreset('indianKitchenPotager')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activePlanKey === 'indianKitchenPotager'
                    ? 'bg-[#1A3828] text-white shadow-sm'
                    : 'bg-[#F2F5F0] text-[#13241B] hover:bg-[#E2EAE0]'
                }`}
              >
                2. Indian Kitchen & Spice Plan
              </button>
              <button
                onClick={() => loadPreset('terraceVegetable')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activePlanKey === 'terraceVegetable'
                    ? 'bg-[#1A3828] text-white shadow-sm'
                    : 'bg-[#F2F5F0] text-[#13241B] hover:bg-[#E2EAE0]'
                }`}
              >
                3. Urban Terrace Raised Bed Plan
              </button>
              <button
                onClick={() => loadPreset('pollinatorHaven')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activePlanKey === 'pollinatorHaven'
                    ? 'bg-[#1A3828] text-white shadow-sm'
                    : 'bg-[#F2F5F0] text-[#13241B] hover:bg-[#E2EAE0]'
                }`}
              >
                4. Aromatic Pollinator Plan
              </button>
              <button
                onClick={() => loadPreset('clear')}
                className="px-3 py-1.5 text-xs font-medium text-[#788E81] hover:text-[#B91C1C] hover:bg-[#FDF2F2] rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Bed</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-[#465A4F]">
                <Sun className="w-4 h-4 text-[#F59E0B]" />
                <span className="hidden sm:inline">Sun:</span>
                <select
                  aria-label="Select garden sun orientation"
                  value={sunOrientation}
                  onChange={(e) => setSunOrientation(e.target.value as any)}
                  className="px-2.5 py-1 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg text-[#13241B] focus:outline-none"
                >
                  <option value="South (Full 8h+)">South (Full 8h+ Sun)</option>
                  <option value="East (Morning 5h)">East (Morning Sun 5h)</option>
                  <option value="Partial Shade">Dappled Canopy Shade</option>
                </select>
              </div>

              <button
                onClick={() => setShowExportModal(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#1A3828] bg-[#EAEFE8] hover:bg-[#DCE4DA] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Blueprint</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Crop Palette */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E7ECE4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-[#13241B]">
                1. Select Plant Variety
              </h3>
              <span className="text-xs text-[#788E81]">Click to arm tool</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
              {Object.values(GARDEN_CROPS).map((crop) => {
                const isSelected = selectedCropId === crop.id;
                const count = cropCounts[crop.id] || 0;

                return (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2D5A3F] bg-[#F2F7F1] shadow-sm ring-1 ring-[#2D5A3F]'
                        : 'border-[#EEF2EB] bg-[#FAF9F6] hover:bg-[#F5F8F3] hover:border-[#DCE4DA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm shrink-0"
                        style={{ backgroundColor: crop.color }}
                      >
                        {crop.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#13241B]">{crop.name}</div>
                        <div className="text-[11px] text-[#6B7D72] flex items-center gap-1.5">
                          <span>{crop.sunNeeds}</span>
                          <span aria-hidden="true">·</span>
                          <span>{crop.daysToHarvest}d</span>
                        </div>
                      </div>
                    </div>

                    {count > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#E3EDE0] text-[#2D5A3F] font-mono text-[11px] font-bold">
                        {count} planted
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Crop Companion Quick Reference */}
            {GARDEN_CROPS[selectedCropId] && (
              <div className="mt-5 p-4 rounded-xl bg-[#FAF9F6] border border-[#E7ECE4] text-xs">
                <div className="font-semibold text-[#1A3828] mb-1">
                  {GARDEN_CROPS[selectedCropId].name} Biology:
                </div>
                <p className="text-[#55695C] leading-relaxed mb-2">
                  {GARDEN_CROPS[selectedCropId].perks}
                </p>
                <div className="text-[11px] text-[#788E81]">
                  <strong className="text-[#33463B]">Best Companions:</strong>{' '}
                  {GARDEN_CROPS[selectedCropId].beneficialCompanions
                    .map((id) => GARDEN_CROPS[id]?.name || id)
                    .join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 6x4 Raised Bed Interactive Grid & Live Feedback */}
          <div className="lg:col-span-8 space-y-6">
            {/* Visual Bed Grid Container */}
            <div className="bg-[#2C1D11] p-6 sm:p-8 rounded-3xl border-4 border-[#5E3B21] shadow-2xl relative overflow-hidden">
              {/* Soil Texture & Bed Marker */}
              <div className="flex items-center justify-between text-white/80 text-xs mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#52A374]"></span>
                  <span className="font-mono uppercase tracking-wider text-[11px]">
                    Raised Cedar Bed · 4ft x 6ft (24 Planting Squares)
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[#E8D6C3]">
                  {totalPlantedCells} / 24 Squares Planted
                </div>
              </div>

              {/* 6 Columns x 4 Rows Soil Grid */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3 bg-[#24170E] p-3 rounded-2xl border border-[#442B18]">
                {grid.map((row, r) =>
                  row.map((cellCropId, c) => {
                    const crop = cellCropId ? GARDEN_CROPS[cellCropId] : null;
                    const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        onMouseEnter={() => setHoveredCell({ r, c })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`aspect-square rounded-xl p-1 sm:p-2 flex flex-col items-center justify-center transition-all transform active:scale-95 relative group ${
                          crop
                            ? 'shadow-md border border-white/20'
                            : 'bg-[#1D120B] hover:bg-[#2F1E12] border border-dashed border-[#553822]'
                        }`}
                        style={{
                          backgroundColor: crop ? crop.color : undefined
                        }}
                      >
                        {crop ? (
                          <>
                            <span className="font-serif font-bold text-white text-xs sm:text-sm drop-shadow-sm leading-tight text-center">
                              {crop.name.split(' ')[0]}
                            </span>
                            <span className="text-[9px] text-white/80 font-mono mt-0.5 hidden sm:block">
                              {crop.daysToHarvest}d
                            </span>
                          </>
                        ) : (
                          <div className="text-[#6B4B32] text-xs font-mono group-hover:text-[#A77B57]">
                            + Plant
                          </div>
                        )}

                        {/* Cell Tooltip on Hover */}
                        {isHovered && crop && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-[#13241B] text-white rounded-lg shadow-xl text-[10px] pointer-events-none z-30 leading-snug">
                            <div className="font-bold text-[#88C5A0]">{crop.name}</div>
                            <div>Water: {crop.waterDemand}</div>
                            <div className="text-[9px] text-[#D2DFD6] mt-0.5">Click to dig up / remove</div>
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bed Footer Hint */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-[#D8C7B5]">
                <span>Tip: Click empty square to plant active variety; click planted square to remove.</span>
                <span className="font-mono">Rich Living Compost Medium</span>
              </div>
            </div>

            {/* Live Companion Biological Feedback Dashboard */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E7ECE4] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2EB]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold">
                    Real-Time Ecological Health
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#13241B]">
                    Companion Synergy Analysis
                  </h3>
                </div>

                {/* Score Dial */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-[#788E81] block">Garden Harmony</span>
                    <span className="font-mono text-xl font-bold text-[#1A3828] tabular-nums">
                      {evaluation.score} / 100
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#EAEFE8] flex items-center justify-center border-2 border-[#2D5A3F]">
                    <Sparkles className="w-5 h-5 text-[#2D5A3F]" />
                  </div>
                </div>
              </div>

              {/* Synergies & Conflicts Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* Positive Synergies */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A3828]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    <span>Active Synergies ({evaluation.synergies.length})</span>
                  </div>

                  {evaluation.synergies.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EEF2EB] text-xs text-[#788E81] italic">
                      Plant complementary neighbors (e.g. Basil beside Tomatoes or Marigolds beside Carrots) to ignite natural synergies.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {evaluation.synergies.map((syn, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#F2F7F0] border border-[#DFECE0] text-xs"
                        >
                          <div className="font-semibold text-[#1A3828] mb-0.5">
                            {syn.cropA} + {syn.cropB}
                          </div>
                          <p className="text-[#4E6657] text-[11px] leading-relaxed">
                            {syn.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Warnings / Antagonisms */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309]">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    <span>Incompatibilities & Advisories ({evaluation.conflicts.length})</span>
                  </div>

                  {evaluation.conflicts.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#F4F9F2] border border-[#DCEBD9] text-xs text-[#2E7D32]">
                      Zero competitive conflicts detected! Your root ecosystems and sun canopies are harmoniously balanced.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {evaluation.conflicts.map((conf, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs"
                        >
                          <div className="font-semibold text-[#92400E] mb-0.5">
                            {conf.cropA} vs {conf.cropB}
                          </div>
                          <p className="text-[#78350F] text-[11px] leading-relaxed">
                            {conf.warning}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ecological Summary Badges */}
              <div className="mt-6 pt-4 border-t border-[#EEF2EB] flex flex-wrap items-center gap-4 text-xs text-[#465A4F]">
                <div>
                  <span className="text-[#788E81]">Nitrogen-Fixing Legumes:</span>{' '}
                  <strong className="text-[#13241B] font-mono tabular-nums">
                    {evaluation.nitrogenFixingCount}
                  </strong>
                </div>
                <div className="h-4 w-px bg-[#DCE4DA]" />
                <div>
                  <span className="text-[#788E81]">Pollinator Attractions:</span>{' '}
                  <strong className="text-[#13241B] font-mono tabular-nums">
                    {evaluation.pollinatorAttractorCount}
                  </strong>
                </div>
                <div className="h-4 w-px bg-[#DCE4DA]" />
                <div>
                  <span className="text-[#788E81]">Sun Orientation:</span>{' '}
                  <strong className="text-[#13241B]">{sunOrientation}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export / Planting Blueprint Modal */}
        {showExportModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowExportModal(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#DCE4DA] relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowExportModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F2F5F0] hover:bg-[#E5ECE3] flex items-center justify-center text-[#465A4F]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1A3828] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#788E81]">
                    Verdant Botanical Sanctuary Field Guide
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#13241B]">
                    Custom Raised Bed Planting Blueprint
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#465A4F] mb-6">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7ECE4] flex items-center justify-between">
                  <div>
                    <span className="text-[#788E81] block">Estimated Garden Harmony Score</span>
                    <span className="font-serif text-xl font-bold text-[#1A3828]">
                      {evaluation.score} / 100
                    </span>
                  </div>
                  <div>
                    <span className="text-[#788E81] block">Sunlight Exposure</span>
                    <span className="font-semibold text-[#13241B]">{sunOrientation}</span>
                  </div>
                  <div>
                    <span className="text-[#788E81] block">Total Squares</span>
                    <span className="font-semibold text-[#13241B]">{totalPlantedCells} / 24</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#13241B] mb-2">Itemized Seed & Seedling Requirements:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(cropCounts).map(([cropId, count]) => {
                      const crop = GARDEN_CROPS[cropId];
                      if (!crop) return null;
                      return (
                        <div
                          key={cropId}
                          className="p-2.5 rounded-lg bg-[#F5F8F3] border border-[#E2EAE0] flex justify-between"
                        >
                          <span className="font-medium text-[#1A3828]">{crop.name}</span>
                          <span className="font-mono text-[#55695C]">{count} plants ({crop.daysToHarvest} days)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7ECE4] space-y-1">
                  <div className="font-bold text-[#13241B]">Soil Preparation Advice:</div>
                  <p>
                    Layer 3 inches of certified peat-free compost over well-aerated loam.
                    Water gently with liquid kelp extract 48 hours before transplanting.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EEF2EB]">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2.5 text-xs font-medium text-[#55695C] hover:bg-[#F2F5F0] rounded-xl transition-colors"
                >
                  Close Blueprint
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Planting Blueprint</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
