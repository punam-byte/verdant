export interface SeasonalTask {
  id: string;
  season: 'Early Spring' | 'High Summer' | 'Golden Autumn' | 'Deep Winter';
  title: string;
  category: 'Sowing & Propagation' | 'Soil & Nutrition' | 'Pruning & Shaping' | 'Protection & Pest Care';
  timeframe: string;
  technique: string;
  importance: 'Essential' | 'Recommended' | 'Pro Tip';
}

export const SEASONS_DATA: Record<string, {
  name: string;
  label: 'Early Spring' | 'High Summer' | 'Golden Autumn' | 'Deep Winter';
  tagline: string;
  temperatureRange: string;
  daylight: string;
  soilFocus: string;
  tasks: SeasonalTask[];
}> = {
  spring: {
    name: 'Early Spring',
    label: 'Early Spring',
    tagline: 'Vernal Awakening & Awakening Roots',
    temperatureRange: '50°F – 68°F (10°C – 20°C)',
    daylight: '11.5 – 13.5 Hours',
    soilFocus: 'Incorporate 2 inches of aged compost and test moisture before turning.',
    tasks: [
      {
        id: 'sp-1',
        season: 'Early Spring',
        title: 'Sow warm-season seeds under glass or indoor heat mats',
        category: 'Sowing & Propagation',
        timeframe: 'Weeks 1 – 3',
        technique: 'Maintain seed starting substrate at 72°F (22°C) with 14 hours of daily supplemental light.',
        importance: 'Essential'
      },
      {
        id: 'sp-2',
        season: 'Early Spring',
        title: 'Prune dead wood and structural dormant branches',
        category: 'Pruning & Shaping',
        timeframe: 'Weeks 2 – 4',
        technique: 'Make clean 45-degree angled cuts 1/4 inch above outward-facing vegetative buds.',
        importance: 'Essential'
      },
      {
        id: 'sp-3',
        season: 'Early Spring',
        title: 'Topdress garden beds with worm castings & compost',
        category: 'Soil & Nutrition',
        timeframe: 'Weeks 3 – 5',
        technique: 'Spread 1-2 inches over raised beds without disturbing delicate soil mycorrhizal networks.',
        importance: 'Recommended'
      },
      {
        id: 'sp-4',
        season: 'Early Spring',
        title: 'Harden off tender seedlings in dappled shade',
        category: 'Protection & Pest Care',
        timeframe: 'Weeks 5 – 7',
        technique: 'Expose plants outdoors incrementally: 2 hours on Day 1, ramping up to full days over 10 days.',
        importance: 'Pro Tip'
      }
    ]
  },
  summer: {
    name: 'High Summer',
    label: 'High Summer',
    tagline: 'Abundant Vigor & Moisture Preservation',
    temperatureRange: '75°F – 92°F (24°C – 33°C)',
    daylight: '14.5 – 15.5 Hours',
    soilFocus: 'Apply thick straw or shredded cedar mulch to insulate roots from heat waves.',
    tasks: [
      {
        id: 'su-1',
        season: 'High Summer',
        title: 'Deep early morning root irrigation',
        category: 'Soil & Nutrition',
        timeframe: 'Daily before 9:00 AM',
        technique: 'Water thoroughly at soil level rather than wetting foliage to prevent fungal blight and evaporation loss.',
        importance: 'Essential'
      },
      {
        id: 'su-2',
        season: 'High Summer',
        title: 'Pinch tomato suckers & stake indeterminate vines',
        category: 'Pruning & Shaping',
        timeframe: 'Weekly ongoing',
        technique: 'Remove vegetative axil shoots between main stem and side branches to focus sugar into fruit clusters.',
        importance: 'Essential'
      },
      {
        id: 'su-3',
        season: 'High Summer',
        title: 'Frequent deadheading of flowering perennials & herbs',
        category: 'Pruning & Shaping',
        timeframe: 'Bi-weekly',
        technique: 'Snip spent blooms right above foliage nodes to trigger repeat blooming cycles.',
        importance: 'Recommended'
      },
      {
        id: 'su-4',
        season: 'High Summer',
        title: 'Inspect leaf undersides for spider mites & thrips',
        category: 'Protection & Pest Care',
        timeframe: 'Twice weekly',
        technique: 'Blast persistent pests with sharp water jet or spray cold-pressed horticultural neem oil at twilight.',
        importance: 'Pro Tip'
      }
    ]
  },
  autumn: {
    name: 'Golden Autumn',
    label: 'Golden Autumn',
    tagline: 'Harvest Gratitude & Perennial Division',
    temperatureRange: '48°F – 64°F (9°C – 18°C)',
    daylight: '10.5 – 12 Hours',
    soilFocus: 'Plant winter rye or crimson clover cover crops to build rich biomass.',
    tasks: [
      {
        id: 'au-1',
        season: 'Golden Autumn',
        title: 'Divide crowded perennial crowns & rootstocks',
        category: 'Sowing & Propagation',
        timeframe: 'Weeks 1 – 3',
        technique: 'Lift overgrown crowns with a garden fork and slice cleanly into vigorous rooted divisions.',
        importance: 'Essential'
      },
      {
        id: 'au-2',
        season: 'Golden Autumn',
        title: 'Plant spring-flowering heirloom bulbs',
        category: 'Sowing & Propagation',
        timeframe: 'Weeks 3 – 6',
        technique: 'Plant bulbs at depth equal to roughly three times their diameter, pointy tip facing upward.',
        importance: 'Essential'
      },
      {
        id: 'au-3',
        season: 'Golden Autumn',
        title: 'Collect leaf mulch and aerate compost piles',
        category: 'Soil & Nutrition',
        timeframe: 'Ongoing',
        technique: 'Shred fallen deciduous leaves to create brown carbon layer for balanced winter composting.',
        importance: 'Recommended'
      },
      {
        id: 'au-4',
        season: 'Golden Autumn',
        title: 'Clean, oil, and sharpen forged carbon steel hand tools',
        category: 'Protection & Pest Care',
        timeframe: 'Late autumn',
        technique: 'Scrub rust with wire wool, hone cutting edges with whetstone, and seal handles with boiled linseed oil.',
        importance: 'Pro Tip'
      }
    ]
  },
  winter: {
    name: 'Deep Winter',
    label: 'Deep Winter',
    tagline: 'Restful Dormancy, Soil Restoration & Design',
    temperatureRange: '30°F – 48°F (-1°C – 9°C)',
    daylight: '9 – 10.5 Hours',
    soilFocus: 'Let soil rest under heavy mulch; avoid compacting saturated or frozen garden pathways.',
    tasks: [
      {
        id: 'wi-1',
        season: 'Deep Winter',
        title: 'Protect tender potted specimens from freeze cycles',
        category: 'Protection & Pest Care',
        timeframe: 'First hard frost',
        technique: 'Move sensitive terracotta pots into the conservatory, unheated garage, or wrap in breathable burlap.',
        importance: 'Essential'
      },
      {
        id: 'wi-2',
        season: 'Deep Winter',
        title: 'Dormant structural pruning of fruit trees and wisteria',
        category: 'Pruning & Shaping',
        timeframe: 'Mid to late winter',
        technique: 'Eliminate crossing, diseased, or rubbing branches to invite light into the interior framework.',
        importance: 'Recommended'
      },
      {
        id: 'wi-3',
        season: 'Deep Winter',
        title: 'Map crop rotation & order certified heirloom seeds',
        category: 'Sowing & Propagation',
        timeframe: 'January – February',
        technique: 'Rotate botanical families so heavy feeders (Solanaceae) follow nitrogen fixers (Fabaceae).',
        importance: 'Essential'
      },
      {
        id: 'wi-4',
        season: 'Deep Winter',
        title: 'Check stored tubers and dahlia root clamps',
        category: 'Protection & Pest Care',
        timeframe: 'Monthly',
        technique: 'Inspect stored bulbs in dry wood shavings; discard any showing mold or soft rot.',
        importance: 'Pro Tip'
      }
    ]
  }
};
