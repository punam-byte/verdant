export interface ConservatoryEvent {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  pricePerPerson: number; // in Indian Rupees (₹)
  availableDays: string[];
  maxGroupSize: number;
  description: string;
  highlights: string[];
  instructor: string;
}

export const CONSERVATORY_EVENTS: ConservatoryEvent[] = [
  {
    id: 'canopy-glasshouse-tour',
    title: 'Victorian Glasshouse & Canopy Tour (Season 2026)',
    subtitle: 'Guided Architectural & Botanical Sensory Walk',
    duration: '75 Minutes',
    pricePerPerson: 499,
    availableDays: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    maxGroupSize: 12,
    description: 'Immerse yourself beneath the grand iron rib vaults of our sanctuary conservatory. Guided by resident botanists, discover sacred Ayurvedic plants, century-old palms, and rare specimen ferns.',
    highlights: [
      'Access to private upper iron catwalk viewing gallery',
      'Fresh botanical Krishna Tulsi & ginger herbal tisane tasting',
      'Complimentary potted nursery sapling in terracotta pot'
    ],
    instructor: 'Nitin Kushwaha & Resident Horticulturist Team'
  },
  {
    id: 'rare-aroid-propagation',
    title: 'Rare Foliage & Aroid Propagation Lab (2026 Batch)',
    subtitle: 'Hands-on Node Cutting & Chonk Rooting Workshop',
    duration: '2 Hours',
    pricePerPerson: 1499,
    availableDays: ['Saturday', 'Sunday'],
    maxGroupSize: 8,
    description: 'Master surgical propagation techniques for Variegated Monsteras, Pink Princess Philodendrons, and Ficus lyrata. Formulate customized chunky aroid potting mixes and master root aeration.',
    highlights: [
      'Take home 2 rooted rare collector cuttings with custom substrate',
      'Sterile scalpels and organic rooting hormone kit supplied',
      'Mastering humidity domes and coco propagation boxes'
    ],
    instructor: 'Julian Vance & Nitin Kushwaha'
  },
  {
    id: 'living-moss-terrarium',
    title: 'Living Moss & Biosphere Architecture Masterclass',
    subtitle: 'Craft a Self-Sustaining Closed Glass Ecosystem',
    duration: '90 Minutes',
    pricePerPerson: 1250,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    maxGroupSize: 10,
    description: 'Assemble a balanced miniature biosphere using handblown apothecary glass, volcanic basalt drainage stones, activated carbon filters, and lush live forest mosses.',
    highlights: [
      'Premium mouthblown 2.5L glass apothecary vessel included',
      'Diverse selection of live cushion mosses and miniature ferns',
      'Springtail bio-active micro-cleanup crew introduction'
    ],
    instructor: 'Maeve Lindqvist & Surat Nursery Guild'
  }
];
