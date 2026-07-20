/**
 * TEMPORARY editable unit prices — require business confirmation before launch.
 * Edit all cleaning item unit prices here; do not duplicate in components.
 */

import type { CleaningIconName } from '../components/icons/CleaningIcon';

export type CleaningCategory = 'rooms' | 'windows' | 'appliances' | 'additional';

export interface CleaningQuoteItem {
  id: string;
  name: string;
  description: string;
  unitLabel: string;
  unitPrice: number;
  icon: CleaningIconName;
  category: CleaningCategory;
  defaultVisible: boolean;
  maxQuantity?: number;
}

export interface PropertyTypeOption {
  id: string;
  name: string;
  description: string;
  icon: CleaningIconName;
}

export const pricingDisclaimer =
  'This is an initial estimate only. Final pricing may vary depending on the property\'s condition, access, location and specific cleaning requirements.';

export const propertyTypes: PropertyTypeOption[] = [
  { id: 'apartment', name: 'Apartment', description: 'Multi-storey residential building', icon: 'apartment' },
  { id: 'unit', name: 'Unit', description: 'Compact self-contained residence', icon: 'unit' },
  { id: 'townhouse', name: 'Townhouse', description: 'Multi-level attached home', icon: 'townhouse' },
  { id: 'house', name: 'House', description: 'Standalone residential property', icon: 'house' },
  { id: 'studio', name: 'Studio', description: 'Open-plan compact residence', icon: 'studio' },
];

/** All cleaning quote items — quantity × unitPrice = line total */
export const cleaningQuoteItems: CleaningQuoteItem[] = [
  // —— Rooms (default visible) ——
  {
    id: 'bedroom-cleaning',
    name: 'Bedroom cleaning',
    description: 'Dust, vacuum and tidy each selected bedroom',
    unitLabel: 'per bedroom',
    unitPrice: 25,
    icon: 'bedroom',
    category: 'rooms',
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
    defaultVisible: true,
    maxQuantity: 20,
  },
  {
    id: 'living-room-cleaning',
    name: 'Living room cleaning',
    description: 'Vacuum, dust and tidy each living room',
    unitLabel: 'per living room',
    unitPrice: 30,
    icon: 'living-room',
    category: 'rooms',
    defaultVisible: true,
    maxQuantity: 10,
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen cleaning',
    description: 'Clean surfaces, splashback and floors per kitchen',
    unitLabel: 'per kitchen',
    unitPrice: 40,
    icon: 'kitchen',
    category: 'rooms',
    defaultVisible: true,
    maxQuantity: 5,
  },
  {
    id: 'balcony-cleaning',
    name: 'Balcony cleaning',
    description: 'Sweep and clean balcony surfaces',
    unitLabel: 'per balcony',
    unitPrice: 40,
    icon: 'balcony',
    category: 'rooms',
    defaultVisible: true,
    maxQuantity: 10,
  },
  // —— Rooms (expandable) ——
  {
    id: 'dining-cleaning',
    name: 'Dining area cleaning',
    description: 'Clean dining table area and surrounding floors',
    unitLabel: 'per area',
    unitPrice: 25,
    icon: 'dining',
    category: 'rooms',
    defaultVisible: false,
    maxQuantity: 10,
  },
  {
    id: 'garage-cleaning',
    name: 'Garage cleaning',
    description: 'Sweep and tidy each garage space',
    unitLabel: 'per garage',
    unitPrice: 65,
    icon: 'garage',
    category: 'rooms',
    defaultVisible: false,
    maxQuantity: 5,
  },
  // —— Windows & surfaces ——
  {
    id: 'internal-windows',
    name: 'Internal window cleaning',
    description: 'Interior glass and accessible frames per panel',
    unitLabel: 'per window',
    unitPrice: 8,
    icon: 'window',
    category: 'windows',
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
    defaultVisible: false,
    maxQuantity: 50,
  },
  {
    id: 'sliding-door-cleaning',
    name: 'Sliding door cleaning',
    description: 'Clean glass and tracks per sliding door',
    unitLabel: 'per door',
    unitPrice: 35,
    icon: 'door',
    category: 'windows',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'wall-spots',
    name: 'Wall spot cleaning',
    description: 'Targeted mark treatment per area or zone',
    unitLabel: 'per area',
    unitPrice: 45,
    icon: 'wall-spot',
    category: 'windows',
    defaultVisible: false,
    maxQuantity: 20,
  },
  // —— Appliances & extras (default visible where matching old presets) ——
  {
    id: 'oven',
    name: 'Oven cleaning',
    description: 'Interior oven clean and degrease',
    unitLabel: 'per oven',
    unitPrice: 55,
    icon: 'oven',
    category: 'appliances',
    defaultVisible: true,
    maxQuantity: 5,
  },
  {
    id: 'fridge',
    name: 'Refrigerator interior',
    description: 'Interior fridge clean and wipe-down',
    unitLabel: 'per refrigerator',
    unitPrice: 35,
    icon: 'fridge',
    category: 'appliances',
    defaultVisible: true,
    maxQuantity: 5,
  },
  {
    id: 'carpet',
    name: 'Carpet cleaning',
    description: 'Carpet treatment per room',
    unitLabel: 'per room',
    unitPrice: 45,
    icon: 'carpet',
    category: 'appliances',
    defaultVisible: true,
    maxQuantity: 20,
  },
  // —— Appliances (expandable) ——
  {
    id: 'microwave',
    name: 'Microwave interior',
    description: 'Interior microwave clean',
    unitLabel: 'per microwave',
    unitPrice: 25,
    icon: 'microwave',
    category: 'appliances',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher interior',
    description: 'Interior clean and wipe-down',
    unitLabel: 'per dishwasher',
    unitPrice: 30,
    icon: 'dishwasher',
    category: 'appliances',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'cabinets',
    name: 'Cabinet interiors',
    description: 'Interior cabinet cleaning per zone',
    unitLabel: 'per area',
    unitPrice: 60,
    icon: 'cabinet',
    category: 'appliances',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'blinds',
    name: 'Blinds cleaning',
    description: 'Dust and wipe accessible blinds',
    unitLabel: 'per blind',
    unitPrice: 50,
    icon: 'blinds',
    category: 'appliances',
    defaultVisible: false,
    maxQuantity: 30,
  },
  // —— Additional (expandable) ——
  {
    id: 'rangehood',
    name: 'Rangehood cleaning',
    description: 'Exterior and filter area degrease',
    unitLabel: 'per rangehood',
    unitPrice: 45,
    icon: 'rangehood',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'laundry',
    name: 'Laundry cleaning',
    description: 'Laundry surfaces and fixtures',
    unitLabel: 'per laundry',
    unitPrice: 45,
    icon: 'laundry',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'pantry-shelves',
    name: 'Pantry shelves',
    description: 'Shelf wipe-down and tidy',
    unitLabel: 'per pantry',
    unitPrice: 40,
    icon: 'pantry',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'wardrobe-interiors',
    name: 'Wardrobe interiors',
    description: 'Interior wardrobe clean and wipe',
    unitLabel: 'per wardrobe',
    unitPrice: 50,
    icon: 'wardrobe',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 15,
  },
  {
    id: 'skirting-boards',
    name: 'Skirting boards',
    description: 'Dust and wipe skirting boards',
    unitLabel: 'per room',
    unitPrice: 55,
    icon: 'skirting',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'ceiling-fans',
    name: 'Ceiling fans',
    description: 'Dust and wipe ceiling fan blades',
    unitLabel: 'per fan',
    unitPrice: 40,
    icon: 'fan',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'light-fittings',
    name: 'Light fittings',
    description: 'Accessible light fixture dusting',
    unitLabel: 'per fitting',
    unitPrice: 35,
    icon: 'light',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 30,
  },
  {
    id: 'sliding-door-tracks',
    name: 'Door tracks',
    description: 'Track clean and debris removal',
    unitLabel: 'per track',
    unitPrice: 35,
    icon: 'door',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'doors-handles',
    name: 'Door and handle cleaning',
    description: 'Doors, handles and touch points',
    unitLabel: 'per room',
    unitPrice: 35,
    icon: 'door',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'staircase',
    name: 'Staircase cleaning',
    description: 'Stairs vacuum and wipe',
    unitLabel: 'per flight',
    unitPrice: 50,
    icon: 'stairs',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 10,
  },
  {
    id: 'outdoor-patio',
    name: 'Patio cleaning',
    description: 'Patio sweep and surface clean',
    unitLabel: 'per patio',
    unitPrice: 55,
    icon: 'patio',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 5,
  },
  {
    id: 'cobweb-removal',
    name: 'Cobweb removal',
    description: 'Remove cobwebs from accessible areas',
    unitLabel: 'per room',
    unitPrice: 30,
    icon: 'cobweb',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'upholstery-vacuum',
    name: 'Upholstery vacuuming',
    description: 'Vacuum upholstered furniture',
    unitLabel: 'per item',
    unitPrice: 40,
    icon: 'upholstery',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'pet-hair',
    name: 'Pet-hair removal',
    description: 'Extra vacuuming for pet hair',
    unitLabel: 'per room',
    unitPrice: 45,
    icon: 'pet-hair',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 20,
  },
  {
    id: 'heavy-grease',
    name: 'Heavy grease treatment',
    description: 'Targeted degreasing of surfaces',
    unitLabel: 'per area',
    unitPrice: 65,
    icon: 'grease',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 10,
  },
  {
    id: 'mould-spots',
    name: 'Mould spot treatment',
    description: 'Targeted mould spot cleaning',
    unitLabel: 'per area',
    unitPrice: 55,
    icon: 'mould',
    category: 'additional',
    defaultVisible: false,
    maxQuantity: 10,
  },
];

export function getPropertyTypeById(id: string): PropertyTypeOption | undefined {
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
