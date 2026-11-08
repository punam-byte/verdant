export interface GardenCrop {
  id: string;
  name: string;
  hindiName?: string;
  botanicalFamily: string;
  iconName: string;
  color: string;
  sunNeeds: 'Full Sun' | 'Partial Sun' | 'Shade';
  waterDemand: 'Low' | 'Moderate' | 'High';
  daysToHarvest: number;
  spacingInches: number;
  beneficialCompanions: string[];
  antagonisticCompanions: string[];
  perks: string;
  flavorTip: string;
}

export const GARDEN_CROPS: Record<string, GardenCrop> = {
  tulsi: {
    id: 'tulsi',
    name: 'Sacred Tulsi',
    hindiName: 'तुलसी',
    botanicalFamily: 'Lamiaceae',
    iconName: 'Sparkles',
    color: '#1E5128',
    sunNeeds: 'Full Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 30,
    spacingInches: 10,
    beneficialCompanions: ['tomato', 'chili', 'marigold', 'coriander'],
    antagonisticCompanions: ['fennel'],
    perks: 'Adaptogenic aromatic oils deter mosquitoes, whiteflies, and aphids naturally.',
    flavorTip: 'Essential for Ayurvedic herbal infusions and traditional ginger-tulsi chai.'
  },
  chili: {
    id: 'chili',
    name: 'Green Chili (Mirchi)',
    hindiName: 'हरी मिर्च',
    botanicalFamily: 'Solanaceae',
    iconName: 'Flame',
    color: '#15803D',
    sunNeeds: 'Full Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 60,
    spacingInches: 12,
    beneficialCompanions: ['basil', 'marigold', 'tulsi', 'tomato'],
    antagonisticCompanions: ['fennel', 'bean'],
    perks: 'Capsaicin emissions deter leaf-chewing caterpillars and soil pests.',
    flavorTip: 'Rich in vitamin C; thrives under warm sun and well-draining vermicompost.'
  },
  coriander: {
    id: 'coriander',
    name: 'Fresh Coriander (Dhania)',
    hindiName: 'धनिया',
    botanicalFamily: 'Apiaceae',
    iconName: 'Leaf',
    color: '#16A34A',
    sunNeeds: 'Partial Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 35,
    spacingInches: 4,
    beneficialCompanions: ['tulsi', 'chili', 'carrot', 'marigold'],
    antagonisticCompanions: ['fennel'],
    perks: 'Attracts beneficial hoverflies and predatory parasitic wasps that hunt aphids.',
    flavorTip: 'Harvest outer sprigs at dawn for maximum aroma in chutneys and garnishes.'
  },
  tomato: {
    id: 'tomato',
    name: 'Heirloom Tomato',
    hindiName: 'टमाटर',
    botanicalFamily: 'Solanaceae',
    iconName: 'Apple',
    color: '#D9483B',
    sunNeeds: 'Full Sun',
    waterDemand: 'High',
    daysToHarvest: 75,
    spacingInches: 18,
    beneficialCompanions: ['basil', 'marigold', 'carrot', 'tulsi', 'chili'],
    antagonisticCompanions: ['fennel', 'cabbage', 'mint'],
    perks: 'Basil and Tulsi enhance tomato sweetness and confuse predatory hornworms.',
    flavorTip: 'Deep, rich umami when grown near companion herbs and drenched in warm sunshine.'
  },
  basil: {
    id: 'basil',
    name: 'Sweet Basil',
    hindiName: 'तुलसी / बेसिल',
    botanicalFamily: 'Lamiaceae',
    iconName: 'Sparkles',
    color: '#2E7D32',
    sunNeeds: 'Full Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 35,
    spacingInches: 10,
    beneficialCompanions: ['tomato', 'chili', 'marigold'],
    antagonisticCompanions: ['rue', 'sage'],
    perks: 'Aromatic essential oils confuse aphids, thrips, and hornworm moths.',
    flavorTip: 'Pinch flower buds weekly to keep essential oils concentrated in tender leaves.'
  },
  marigold: {
    id: 'marigold',
    name: 'Marigold (Genda)',
    hindiName: 'गेंदा',
    botanicalFamily: 'Asteraceae',
    iconName: 'Sun',
    color: '#F59E0B',
    sunNeeds: 'Full Sun',
    waterDemand: 'Low',
    daysToHarvest: 50,
    spacingInches: 8,
    beneficialCompanions: ['tomato', 'bean', 'strawberry', 'carrot', 'tulsi', 'chili', 'brinjal'],
    antagonisticCompanions: [],
    perks: 'Roots exude alpha-terthienyl, naturally eradicating damaging nematodes.',
    flavorTip: 'Golden petals used for sacred rituals, festive garlands, and pollinator magnets.'
  },
  brinjal: {
    id: 'brinjal',
    name: 'Heritage Eggplant (Baingan)',
    hindiName: 'बैंगन',
    botanicalFamily: 'Solanaceae',
    iconName: 'Egg',
    color: '#7C3AED',
    sunNeeds: 'Full Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 70,
    spacingInches: 16,
    beneficialCompanions: ['marigold', 'bean', 'tulsi'],
    antagonisticCompanions: ['fennel'],
    perks: 'Marigolds keep flea beetles and root parasites away from glossy brinjal fruit.',
    flavorTip: 'Tender purple varieties roasted with garlic and mustard oil for traditional bharta.'
  },
  bean: {
    id: 'bean',
    name: 'French Bush Bean',
    hindiName: 'बीन्स / फली',
    botanicalFamily: 'Fabaceae',
    iconName: 'Wheat',
    color: '#4B7B3B',
    sunNeeds: 'Full Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 55,
    spacingInches: 6,
    beneficialCompanions: ['rosemary', 'marigold', 'carrot', 'strawberry', 'brinjal'],
    antagonisticCompanions: ['chili', 'fennel'],
    perks: 'Rhizobia root nodules fix atmospheric nitrogen directly into surrounding soil.',
    flavorTip: 'Enriches soil beds naturally, feeding subsequent heavy-feeder harvests.'
  },
  carrot: {
    id: 'carrot',
    name: 'Sweet Carrot (Gajar)',
    hindiName: 'गाजर',
    botanicalFamily: 'Apiaceae',
    iconName: 'Nut',
    color: '#EA580C',
    sunNeeds: 'Partial Sun',
    waterDemand: 'Moderate',
    daysToHarvest: 68,
    spacingInches: 4,
    beneficialCompanions: ['rosemary', 'tomato', 'bean', 'coriander'],
    antagonisticCompanions: ['dill', 'fennel'],
    perks: 'Deep taproots aerate subsoil, welcoming earthworms and shallow rooted companions.',
    flavorTip: 'Sweet, crisp and high in beta-carotene for winter salads and halwa.'
  },
  mint: {
    id: 'mint',
    name: 'Spearmint (Pudina)',
    hindiName: 'पुदीना',
    botanicalFamily: 'Lamiaceae',
    iconName: 'Leaf',
    color: '#059669',
    sunNeeds: 'Partial Sun',
    waterDemand: 'High',
    daysToHarvest: 40,
    spacingInches: 12,
    beneficialCompanions: ['marigold', 'coriander'],
    antagonisticCompanions: ['tomato', 'bean'],
    perks: 'Potent menthol aroma drives away rodents, whiteflies, and garden ants.',
    flavorTip: 'Best positioned in container corners to contain spreading underground runners.'
  },
  rosemary: {
    id: 'rosemary',
    name: 'Tuscan Rosemary',
    hindiName: 'रोज़मेरी',
    botanicalFamily: 'Lamiaceae',
    iconName: 'Trees',
    color: '#15803D',
    sunNeeds: 'Full Sun',
    waterDemand: 'Low',
    daysToHarvest: 90,
    spacingInches: 14,
    beneficialCompanions: ['bean', 'carrot', 'lavender'],
    antagonisticCompanions: ['basil'],
    perks: 'Potent camphor fragrance deters cabbage loopers and beetles.',
    flavorTip: 'Extremely drought-hardy woody perennial; loves dry, sunny borders.'
  },
  lavender: {
    id: 'lavender',
    name: 'English Lavender',
    hindiName: 'लैवेंडर',
    botanicalFamily: 'Lamiaceae',
    iconName: 'Flower2',
    color: '#8B5CF6',
    sunNeeds: 'Full Sun',
    waterDemand: 'Low',
    daysToHarvest: 100,
    spacingInches: 16,
    beneficialCompanions: ['rosemary', 'marigold'],
    antagonisticCompanions: [],
    perks: 'Major nectar station attracting honeybees, bumblebees, and hoverflies.',
    flavorTip: 'Floral aroma for fragrant herb pouches and relaxation oils.'
  }
};

export interface CompanionFeedback {
  synergies: Array<{
    cropA: string;
    cropB: string;
    description: string;
  }>;
  conflicts: Array<{
    cropA: string;
    cropB: string;
    warning: string;
  }>;
  score: number; // 0 to 100
  nitrogenFixingCount: number;
  pollinatorAttractorCount: number;
}

export function evaluateCompanionPlanting(grid: (string | null)[][]): CompanionFeedback {
  const rows = grid.length;
  const cols = grid[0].length;
  const synergies: Array<{ cropA: string; cropB: string; description: string }> = [];
  const conflicts: Array<{ cropA: string; cropB: string; warning: string }> = [];
  const recordedSynergyKeys = new Set<string>();
  const recordedConflictKeys = new Set<string>();

  let totalPlaced = 0;
  let nitrogenFixingCount = 0;
  let pollinatorAttractorCount = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cropId = grid[r][c];
      if (!cropId) continue;
      totalPlaced++;

      if (cropId === 'bean') nitrogenFixingCount++;
      if (cropId === 'marigold' || cropId === 'lavender' || cropId === 'tulsi') pollinatorAttractorCount++;

      const crop = GARDEN_CROPS[cropId];
      if (!crop) continue;

      // Check adjacent cells
      const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
      ];

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const neighborId = grid[nr][nc];
          if (!neighborId || neighborId === cropId) continue;

          const neighbor = GARDEN_CROPS[neighborId];
          if (!neighbor) continue;

          const pairKey = [cropId, neighborId].sort().join(':');

          // Check beneficial
          if (crop.beneficialCompanions.includes(neighborId)) {
            if (!recordedSynergyKeys.has(pairKey)) {
              recordedSynergyKeys.add(pairKey);
              synergies.push({
                cropA: crop.name,
                cropB: neighbor.name,
                description: `${crop.name} & ${neighbor.name} share beneficial ecology: ${crop.perks}`
              });
            }
          }

          // Check antagonistic
          if (crop.antagonisticCompanions.includes(neighborId)) {
            if (!recordedConflictKeys.has(pairKey)) {
              recordedConflictKeys.add(pairKey);
              conflicts.push({
                cropA: crop.name,
                cropB: neighbor.name,
                warning: `${crop.name} & ${neighbor.name} compete for root nutrients or release inhibitory bio-compounds.`
              });
            }
          }
        }
      }
    }
  }

  // Calculate score
  let score = 50;
  if (totalPlaced > 0) {
    score += synergies.length * 12;
    score -= conflicts.length * 18;
    if (nitrogenFixingCount > 0) score += 8;
    if (pollinatorAttractorCount > 0) score += 8;
  }
  score = Math.max(10, Math.min(100, score));

  return {
    synergies,
    conflicts,
    score: totalPlaced === 0 ? 0 : score,
    nitrogenFixingCount,
    pollinatorAttractorCount
  };
}

// All Types of Garden Plans (2026 Collection)
export const PRESET_BEDS: Record<string, {
  name: string;
  planType: string;
  description: string;
  grid: (string | null)[][];
}> = {
  ayurvedicSanctuary: {
    name: 'Ayurvedic Medicinal Sanctuary Plan',
    planType: 'Medicinal & Adaptogenic Herb Guild',
    description: 'Vastu-aligned sacred healing potager featuring Krishna Tulsi, Pudina, fresh Dhania, and pest-shielding Genda.',
    grid: [
      ['marigold', 'tulsi', 'tulsi', 'marigold', 'coriander', 'coriander'],
      ['tulsi', 'tulsi', 'mint', 'coriander', 'coriander', 'marigold'],
      ['marigold', 'chili', 'tulsi', 'chili', 'bean', 'bean'],
      ['mint', 'coriander', 'marigold', 'rosemary', 'lavender', 'lavender']
    ]
  },
  indianKitchenPotager: {
    name: 'Indian Kitchen Garden & Spice Plan',
    planType: 'Daily Kitchen Culinary Potager',
    description: 'High-yield spicy essentials: fresh green chilies, juicy tomatoes, aromatic dhania, and hearty brinjal.',
    grid: [
      ['marigold', 'tomato', 'tulsi', 'chili', 'marigold', 'coriander'],
      ['chili', 'tomato', 'basil', 'brinjal', 'bean', 'coriander'],
      ['marigold', 'brinjal', 'tomato', 'chili', 'bean', 'marigold'],
      ['mint', 'coriander', 'marigold', 'carrot', 'carrot', 'tulsi']
    ]
  },
  terraceVegetable: {
    name: 'Urban Terrace & Rooftop Raised Bed Plan',
    planType: 'High-Density Terrace Veggie Guild',
    description: 'Heavy nitrogen-fixing legumes paired with deep taproot carrots and pest-repelling marigolds.',
    grid: [
      ['marigold', 'tomato', 'basil', 'tomato', 'marigold', 'carrot'],
      ['marigold', 'bean', 'tomato', 'bean', 'bean', 'carrot'],
      ['carrot', 'tomato', 'basil', 'tomato', 'bean', 'marigold'],
      ['chili', 'chili', 'marigold', 'rosemary', 'lavender', 'lavender']
    ]
  },
  pollinatorHaven: {
    name: 'Aromatic Pollinator & Honeybee Plan',
    planType: 'Low-Maintenance Pollinator Haven',
    description: 'Drought-hardy fragrant perennials designed to welcome bees, butterflies, and natural predators.',
    grid: [
      ['lavender', 'rosemary', 'rosemary', 'lavender', 'tulsi', 'tulsi'],
      ['basil', 'basil', 'marigold', 'marigold', 'chili', 'chili'],
      ['marigold', 'marigold', 'coriander', 'carrot', 'carrot', 'marigold'],
      ['mint', 'coriander', 'coriander', 'tulsi', 'lavender', 'lavender']
    ]
  }
};
