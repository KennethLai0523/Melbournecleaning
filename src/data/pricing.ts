/**
 * TEMPORARY editable unit prices — require business confirmation before launch.
 * Edit cleaningQuoteItems[].unitPrice here only.
 */

import type { CleaningIconName } from '../components/icons/CleaningIcon';

export type CleaningCategory = 'rooms' | 'windows' | 'appliances' | 'additional';
export type CleaningPricingMode = 'quantity' | 'toggle';

export interface CleaningQuoteItem {
  id: string;
  name: string;
  description: string;
  icon: CleaningIconName;
  category: CleaningCategory;
  unitPrice: number;
  pricingMode: CleaningPricingMode;
  unitLabel?: string;
  defaultVisible: boolean;
  maxQuantity?: number;
}

export interface PropertyTypeOption {
  id: string;
  name: string;
  description: string;
  icon: CleaningIconName;
}

export const propertyTypes: PropertyTypeOption[] = [
  { id: 'apartment', name: 'Apartment', description: 'Multi-storey residential building', icon: 'apartment' },
  { id: 'unit', name: 'Unit', description: 'Compact self-contained residence', icon: 'unit' },
  { id: 'townhouse', name: 'Townhouse', description: 'Multi-level attached home', icon: 'townhouse' },
  { id: 'house', name: 'House', description: 'Standalone residential property', icon: 'house' },
  { id: 'studio', name: 'Studio', description: 'Open-plan compact residence', icon: 'studio' },
];

export const cleaningQuoteItems: CleaningQuoteItem[] = [
  // —— Quantity-based rooms ——
  {
    id: 'bedroom-cleaning',
    name: 'Bedroom cleaning',
    description: 'Dust, vacuum and tidy each selected bedroom',
    unitLabel: 'per bedroom',
    unitPrice: 25,
    icon: 'bedroom',
    category: 'rooms',
    pricingMode: 'quantity',
    defaultVisible: true,
    maxQuantity: 20,
  },
  {
    id: 'bathroom-cleaning',
    name: 'Bathroom cleaning',
    description: 'Clean fixtures, surfaces and floors per bathroom',
    unitLabel: 'per bathroom',
    unitPrice: 35,
    icon: 'bathroom',
    category: 'rooms',
    pricingMode: 'quantity',
    defaultVisible: true,
    maxQuantity: 20,
  },
  {
    id: 'toilet-cleaning',
    name: 'Toilet cleaning',
    description: 'Clean each separate toilet and surrounding area',
    unitLabel: 'per toilet',
    unitPrice: 20,
    icon: 'toilet',
    category: 'rooms',
    pricingMode: 'quantity',
    defaultVisible: true,
    maxQuantity: 20,
  },
  {
    id: 'bathroom-toilet-cleaning',
    name: 'Bathroom & toilet cleaning',
    description: 'Combined bathroom and toilet in the same room',
    unitLabel: 'per combined room',
    unitPrice: 45,
    icon: 'bathroom-toilet',
    category: 'rooms',
    pricingMode: 'quantity',
    defaultVisible: true,
    maxQuantity: 20,
  },
  // —— Toggle rooms ——
  {
    id: 'living-room-cleaning',
    name: 'Living room cleaning',
    description: 'Vacuum, dust and tidy the living room',
    unitPrice: 30,
    icon: 'living-room',
    category: 'rooms',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen cleaning',
    description: 'Clean surfaces, splashback and floors',
    unitPrice: 40,
    icon: 'kitchen',
    category: 'rooms',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'balcony-cleaning',
    name: 'Balcony cleaning',
    description: 'Sweep and clean balcony surfaces',
    unitPrice: 40,
    icon: 'balcony',
    category: 'rooms',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'dining-cleaning',
    name: 'Dining area cleaning',
    description: 'Clean dining table area and surrounding floors',
    unitPrice: 25,
    icon: 'dining',
    category: 'rooms',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'garage-cleaning',
    name: 'Garage cleaning',
    description: 'Sweep and tidy the garage space',
    unitPrice: 65,
    icon: 'garage',
    category: 'rooms',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  // —— Windows (keep per-panel quantity behaviour) ——
  {
    id: 'internal-windows',
    name: 'Internal window cleaning',
    description: 'Interior glass and accessible frames per panel',
    unitLabel: 'per window',
    unitPrice: 8,
    icon: 'window',
    category: 'windows',
    pricingMode: 'quantity',
    defaultVisible: true,
    maxQuantity: 50,
  },
  {
    id: 'external-windows',
    name: 'External window cleaning',
    description: 'Exterior glass where safely accessible',
    unitLabel: 'per window',
    unitPrice: 12,
    icon: 'window-external',
    category: 'windows',
    pricingMode: 'quantity',
    defaultVisible: false,
    maxQuantity: 50,
  },
  {
    id: 'sliding-door-cleaning',
    name: 'Sliding door cleaning',
    description: 'Clean glass and tracks on sliding doors',
    unitPrice: 35,
    icon: 'door',
    category: 'windows',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'wall-spots',
    name: 'Wall spot cleaning',
    description: 'Targeted mark treatment on walls',
    unitPrice: 45,
    icon: 'wall-spot',
    category: 'windows',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  // —— Appliances ——
  {
    id: 'oven',
    name: 'Oven cleaning',
    description: 'Interior oven clean and degrease',
    unitPrice: 55,
    icon: 'oven',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'fridge',
    name: 'Refrigerator interior',
    description: 'Interior fridge clean and wipe-down',
    unitPrice: 35,
    icon: 'fridge',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'carpet',
    name: 'Carpet cleaning',
    description: 'Carpet treatment for carpeted areas',
    unitPrice: 45,
    icon: 'carpet',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: true,
  },
  {
    id: 'microwave',
    name: 'Microwave interior',
    description: 'Interior microwave clean',
    unitPrice: 25,
    icon: 'microwave',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher interior',
    description: 'Interior clean and wipe-down',
    unitPrice: 30,
    icon: 'dishwasher',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'cabinets',
    name: 'Cabinet interiors',
    description: 'Interior cabinet cleaning',
    unitPrice: 60,
    icon: 'cabinet',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'blinds',
    name: 'Blinds cleaning',
    description: 'Dust and wipe accessible blinds',
    unitPrice: 50,
    icon: 'blinds',
    category: 'appliances',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  // —— Additional ——
  {
    id: 'rangehood',
    name: 'Rangehood cleaning',
    description: 'Exterior and filter area degrease',
    unitPrice: 45,
    icon: 'rangehood',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'laundry',
    name: 'Laundry cleaning',
    description: 'Laundry surfaces and fixtures',
    unitPrice: 45,
    icon: 'laundry',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'pantry-shelves',
    name: 'Pantry shelves',
    description: 'Shelf wipe-down and tidy',
    unitPrice: 40,
    icon: 'pantry',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'wardrobe-interiors',
    name: 'Wardrobe interiors',
    description: 'Interior wardrobe clean and wipe',
    unitPrice: 50,
    icon: 'wardrobe',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'skirting-boards',
    name: 'Skirting boards',
    description: 'Dust and wipe skirting boards',
    unitPrice: 55,
    icon: 'skirting',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'ceiling-fans',
    name: 'Ceiling fans',
    description: 'Dust and wipe ceiling fan blades',
    unitPrice: 40,
    icon: 'fan',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'light-fittings',
    name: 'Light fittings',
    description: 'Accessible light fixture dusting',
    unitPrice: 35,
    icon: 'light',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'sliding-door-tracks',
    name: 'Door tracks',
    description: 'Track clean and debris removal',
    unitPrice: 35,
    icon: 'door',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'doors-handles',
    name: 'Door and handle cleaning',
    description: 'Doors, handles and touch points',
    unitPrice: 35,
    icon: 'door',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'staircase',
    name: 'Staircase cleaning',
    description: 'Stairs vacuum and wipe',
    unitPrice: 50,
    icon: 'stairs',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'outdoor-patio',
    name: 'Patio cleaning',
    description: 'Patio sweep and surface clean',
    unitPrice: 55,
    icon: 'patio',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'cobweb-removal',
    name: 'Cobweb removal',
    description: 'Remove cobwebs from accessible areas',
    unitPrice: 30,
    icon: 'cobweb',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'upholstery-vacuum',
    name: 'Upholstery vacuuming',
    description: 'Vacuum upholstered furniture',
    unitPrice: 40,
    icon: 'upholstery',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'pet-hair',
    name: 'Pet-hair removal',
    description: 'Extra vacuuming for pet hair',
    unitPrice: 45,
    icon: 'pet-hair',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'heavy-grease',
    name: 'Heavy grease treatment',
    description: 'Targeted degreasing of surfaces',
    unitPrice: 65,
    icon: 'grease',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
  {
    id: 'mould-spots',
    name: 'Mould spot treatment',
    description: 'Targeted mould spot cleaning',
    unitPrice: 55,
    icon: 'mould',
    category: 'additional',
    pricingMode: 'toggle',
    defaultVisible: false,
  },
];

export function getPropertyTypeById(id: string): PropertyTypeOption | undefined {
  if (!id) return undefined;
  return propertyTypes.find((p) => p.id === id);
}

export function getCleaningItemById(id: string): CleaningQuoteItem | undefined {
  return cleaningQuoteItems.find((i) => i.id === id);
}

export function getDefaultVisibleItems(): CleaningQuoteItem[] {
  return cleaningQuoteItems.filter((i) => i.defaultVisible);
}

export function getExpandableItems(): CleaningQuoteItem[] {
  return cleaningQuoteItems.filter((i) => !i.defaultVisible);
}

export function getAllCleaningItems(): CleaningQuoteItem[] {
  return cleaningQuoteItems;
}
