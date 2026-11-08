export interface PlantSymptom {
  id: string;
  symptomName: string;
  affectedPart: 'Leaves' | 'Stems' | 'Soil' | 'Whole Plant';
  summary: string;
  likelyCauses: string[];
  immediateAction: string;
  preventativeRoutine: string;
  severity: 'Mild' | 'Moderate' | 'Critical';
}

export const PLANT_SYMPTOMS: PlantSymptom[] = [
  {
    id: 'yellow-lower-leaves',
    symptomName: 'Yellowing Lower Leaves (Chlorosis)',
    affectedPart: 'Leaves',
    summary: 'Older leaves at base turn pale yellow while upper foliage remains green, often accompanied by soft, mushy soil.',
    likelyCauses: [
      'Overwatering causing root oxygen starvation and fungal asphyxiation',
      'Nitrogen deficiency in exhausted potting substrate',
      'Dense soil compaction hindering drainage'
    ],
    immediateAction: 'Withhold watering immediately. Insert a clean wood skewer to bottom of pot; if it emerges damp or dark, let the top 50% dry before touching again.',
    preventativeRoutine: 'Amend medium with 20% coarse perlite or pumice. Always discard drain saucer standing water after 20 minutes.',
    severity: 'Moderate'
  },
  {
    id: 'crispy-brown-tips',
    symptomName: 'Crispy Brown Edges & Foliage Tips',
    affectedPart: 'Leaves',
    summary: 'Leaf margins become papery, brittle, or develop dry tan borders with a yellow halo.',
    likelyCauses: [
      'Low indoor ambient humidity (< 40%) from heating or air conditioning',
      'High chlorine, chloramines, or fluoride in municipal tap water',
      'Under-watering or hydrophobic dry soil pockets'
    ],
    immediateAction: 'Snip brown tips with clean sharp shears leaving a microscopic sliver of brown to avoid cutting live tissue. Deeply bottom-water for 30 minutes.',
    preventativeRoutine: 'Switch to collected rainwater or filtered water. Group plants together atop a wide pebble tray filled with water.',
    severity: 'Mild'
  },
  {
    id: 'drooping-stems',
    symptomName: 'Drooping, Limp Foliage & Stems',
    affectedPart: 'Stems',
    summary: 'Loss of turgor pressure; plant looks wilted despite the soil feeling damp or conversely bone dry.',
    likelyCauses: [
      'Severe root drought (soil shrunk away from pot edges)',
      'Advanced root rot (damaged roots cannot draw water upward)',
      'Thermal shock from cold window draft or direct HVAC vent'
    ],
    immediateAction: 'Gently unpot plant to inspect root system. Healthy roots are firm and white/cream; rotted roots are dark brown, mushy, and smell sour.',
    preventativeRoutine: 'Trim all black mushy roots with sterilized shears, rinse healthy roots with diluted 3% hydrogen peroxide, and repot in fresh airy mix.',
    severity: 'Critical'
  },
  {
    id: 'powdery-mildew',
    symptomName: 'White Powdery Coating on Leaf Surfaces',
    affectedPart: 'Leaves',
    summary: 'Dusty, flour-like white patches appearing on top surface of leaves, curling tender new growth.',
    likelyCauses: [
      'Stagnant humid air combined with cool nocturnal temperatures',
      'Overhead watering wetting leaf surfaces in evening hours',
      'Crowded canopy restricting internal air ventilation'
    ],
    immediateAction: 'Isolate plant from companions. Wipe infected leaves with a solution of 1 teaspoon baking soda and 1/2 teaspoon mild castile soap per quart of water.',
    preventativeRoutine: 'Increase ambient air circulation with a small oscillating fan. Always irrigate directly onto root soil line early in the morning.',
    severity: 'Moderate'
  },
  {
    id: 'soil-gnats',
    symptomName: 'Tiny Flying Insects & Soil Gnats',
    affectedPart: 'Soil',
    summary: 'Small black gnats hovering around the soil surface when disturbed, with larvae feeding on microscopic root hairs.',
    likelyCauses: [
      'Persistent soggy topsoil with decaying organic matter',
      'Commercial bagged soil containing unhatched gnat eggs',
      'Lack of bottom drainage or oversized pot holding stagnant moisture'
    ],
    immediateAction: 'Allow the top 2 inches of soil to dry completely. Place yellow sticky cards at soil level to trap breeding adult insects.',
    preventativeRoutine: 'Apply biological Bacillus thuringiensis israelensis (BTI mosquito bits tea) during routine watering to neutralize larvae organically.',
    severity: 'Mild'
  },
  {
    id: 'pale-leggy-growth',
    symptomName: 'Leggy, Spindly Stems with Small Leaves',
    affectedPart: 'Whole Plant',
    summary: 'Long exaggerated gaps between leaf nodes, stems stretching sideways towards windows, washed-out foliage color.',
    likelyCauses: [
      'Insufficient photosynthetic active radiation (PAR light levels)',
      'Placement too deep in room interior (> 8 feet from natural window)'
    ],
    immediateAction: 'Gradually transition plant closer to an east or south-facing window, or install a 24W full-spectrum horticultural LED bulb 12 inches above canopy.',
    preventativeRoutine: 'Rotate container 90 degrees every time you water to ensure 360-degree balanced light exposure.',
    severity: 'Mild'
  }
];
