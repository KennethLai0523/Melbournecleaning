export type PropertyType = 'apartment' | 'unit' | 'townhouse' | 'house' | 'studio';
export type Frequency = 'one-off' | 'weekly' | 'fortnightly' | 'monthly';
export type CleaningCategory = 'rooms' | 'windows' | 'appliances' | 'additional';

export interface CleaningItem {
  id: string;
  label: string;
  description: string;
  price: number;
  type: 'toggle' | 'quantity';
  icon: string;
  category: CleaningCategory;
  defaultVisible: boolean;
  maxQuantity?: number;
}

export const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'unit', label: 'Unit' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'house', label: 'House' },
  { value: 'studio', label: 'Studio' },
];

export const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 'one-off', label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
];

// Mirrors website/src/data/pricing.ts. Keep IDs, descriptions, prices and visibility aligned.
export const cleaningItems: CleaningItem[] = [
  { id: 'bedroom-cleaning', label: 'Bedroom cleaning', description: 'Dust, vacuum and tidy each selected bedroom', price: 25, type: 'quantity', icon: 'bedroom', category: 'rooms', defaultVisible: true, maxQuantity: 20 },
  { id: 'bathroom-cleaning', label: 'Bathroom cleaning', description: 'Clean fixtures, surfaces and floors per bathroom', price: 35, type: 'quantity', icon: 'bathroom', category: 'rooms', defaultVisible: true, maxQuantity: 20 },
  { id: 'toilet-cleaning', label: 'Toilet cleaning', description: 'Clean each separate toilet and surrounding area', price: 20, type: 'quantity', icon: 'toilet', category: 'rooms', defaultVisible: true, maxQuantity: 20 },
  { id: 'bathroom-toilet-cleaning', label: 'Bathroom & toilet cleaning', description: 'Combined bathroom and toilet in the same room', price: 45, type: 'quantity', icon: 'bathroom-toilet', category: 'rooms', defaultVisible: true, maxQuantity: 20 },
  { id: 'living-room-cleaning', label: 'Living room cleaning', description: 'Vacuum, dust and tidy the living room', price: 30, type: 'toggle', icon: 'living-room', category: 'rooms', defaultVisible: true },
  { id: 'kitchen-cleaning', label: 'Kitchen cleaning', description: 'Clean surfaces, splashback and floors', price: 40, type: 'toggle', icon: 'kitchen', category: 'rooms', defaultVisible: true },
  { id: 'balcony-cleaning', label: 'Balcony cleaning', description: 'Sweep and clean balcony surfaces', price: 40, type: 'toggle', icon: 'balcony', category: 'rooms', defaultVisible: true },
  { id: 'dining-cleaning', label: 'Dining area cleaning', description: 'Clean dining table area and surrounding floors', price: 25, type: 'toggle', icon: 'dining', category: 'rooms', defaultVisible: false },
  { id: 'garage-cleaning', label: 'Garage cleaning', description: 'Sweep and tidy the garage space', price: 65, type: 'toggle', icon: 'garage', category: 'rooms', defaultVisible: false },
  { id: 'internal-windows', label: 'Internal window cleaning', description: 'Interior glass and accessible frames per panel', price: 8, type: 'quantity', icon: 'window', category: 'windows', defaultVisible: true, maxQuantity: 50 },
  { id: 'external-windows', label: 'External window cleaning', description: 'Exterior glass where safely accessible', price: 12, type: 'quantity', icon: 'window-external', category: 'windows', defaultVisible: false, maxQuantity: 50 },
  { id: 'sliding-door-cleaning', label: 'Sliding door cleaning', description: 'Clean glass and tracks on sliding doors', price: 35, type: 'toggle', icon: 'door', category: 'windows', defaultVisible: false },
  { id: 'wall-spots', label: 'Wall spot cleaning', description: 'Targeted mark treatment on walls', price: 45, type: 'toggle', icon: 'wall-spot', category: 'windows', defaultVisible: false },
  { id: 'oven', label: 'Oven cleaning', description: 'Interior oven clean and degrease', price: 55, type: 'toggle', icon: 'oven', category: 'appliances', defaultVisible: true },
  { id: 'fridge', label: 'Refrigerator interior', description: 'Interior fridge clean and wipe-down', price: 35, type: 'toggle', icon: 'fridge', category: 'appliances', defaultVisible: true },
  { id: 'carpet', label: 'Carpet cleaning', description: 'Carpet treatment for carpeted areas', price: 45, type: 'toggle', icon: 'carpet', category: 'appliances', defaultVisible: true },
  { id: 'microwave', label: 'Microwave interior', description: 'Interior microwave clean', price: 25, type: 'toggle', icon: 'microwave', category: 'appliances', defaultVisible: false },
  { id: 'dishwasher', label: 'Dishwasher interior', description: 'Interior clean and wipe-down', price: 30, type: 'toggle', icon: 'dishwasher', category: 'appliances', defaultVisible: false },
  { id: 'cabinets', label: 'Cabinet interiors', description: 'Interior cabinet cleaning', price: 60, type: 'toggle', icon: 'cabinet', category: 'appliances', defaultVisible: false },
  { id: 'blinds', label: 'Blinds cleaning', description: 'Dust and wipe accessible blinds', price: 50, type: 'toggle', icon: 'blinds', category: 'appliances', defaultVisible: false },
  { id: 'rangehood', label: 'Rangehood cleaning', description: 'Exterior and filter area degrease', price: 45, type: 'toggle', icon: 'rangehood', category: 'additional', defaultVisible: false },
  { id: 'laundry', label: 'Laundry cleaning', description: 'Laundry surfaces and fixtures', price: 45, type: 'toggle', icon: 'laundry', category: 'additional', defaultVisible: false },
  { id: 'pantry-shelves', label: 'Pantry shelves', description: 'Shelf wipe-down and tidy', price: 40, type: 'toggle', icon: 'pantry', category: 'additional', defaultVisible: false },
  { id: 'wardrobe-interiors', label: 'Wardrobe interiors', description: 'Interior wardrobe clean and wipe', price: 50, type: 'toggle', icon: 'wardrobe', category: 'additional', defaultVisible: false },
  { id: 'skirting-boards', label: 'Skirting boards', description: 'Dust and wipe skirting boards', price: 55, type: 'toggle', icon: 'skirting', category: 'additional', defaultVisible: false },
  { id: 'ceiling-fans', label: 'Ceiling fans', description: 'Dust and wipe ceiling fan blades', price: 40, type: 'toggle', icon: 'fan', category: 'additional', defaultVisible: false },
  { id: 'light-fittings', label: 'Light fittings', description: 'Accessible light fixture dusting', price: 35, type: 'toggle', icon: 'light', category: 'additional', defaultVisible: false },
  { id: 'sliding-door-tracks', label: 'Door tracks', description: 'Track clean and debris removal', price: 35, type: 'toggle', icon: 'door', category: 'additional', defaultVisible: false },
  { id: 'doors-handles', label: 'Door and handle cleaning', description: 'Doors, handles and touch points', price: 35, type: 'toggle', icon: 'door', category: 'additional', defaultVisible: false },
  { id: 'staircase', label: 'Staircase cleaning', description: 'Stairs vacuum and wipe', price: 50, type: 'toggle', icon: 'stairs', category: 'additional', defaultVisible: false },
  { id: 'outdoor-patio', label: 'Patio cleaning', description: 'Patio sweep and surface clean', price: 55, type: 'toggle', icon: 'patio', category: 'additional', defaultVisible: false },
  { id: 'cobweb-removal', label: 'Cobweb removal', description: 'Remove cobwebs from accessible areas', price: 30, type: 'toggle', icon: 'cobweb', category: 'additional', defaultVisible: false },
  { id: 'upholstery-vacuum', label: 'Upholstery vacuuming', description: 'Vacuum upholstered furniture', price: 40, type: 'toggle', icon: 'upholstery', category: 'additional', defaultVisible: false },
  { id: 'pet-hair', label: 'Pet-hair removal', description: 'Extra vacuuming for pet hair', price: 45, type: 'toggle', icon: 'pet-hair', category: 'additional', defaultVisible: false },
  { id: 'heavy-grease', label: 'Heavy grease treatment', description: 'Targeted degreasing of surfaces', price: 65, type: 'toggle', icon: 'grease', category: 'additional', defaultVisible: false },
  { id: 'mould-spots', label: 'Mould spot treatment', description: 'Targeted mould spot cleaning', price: 55, type: 'toggle', icon: 'mould', category: 'additional', defaultVisible: false },
];

export interface QuoteState {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  kitchens: number;
  frequency: Frequency;
  preferredDate: string;
  preferredTime: string;
  items: Record<string, number>;
}

export const defaultQuoteState: QuoteState = {
  propertyType: 'apartment',
  bedrooms: 2,
  bathrooms: 1,
  toilets: 1,
  livingRooms: 1,
  kitchens: 1,
  frequency: 'one-off',
  preferredDate: '',
  preferredTime: '',
  items: {},
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount);
}

export function calculateQuoteTotal(items: Record<string, number>): number {
  return cleaningItems.reduce((sum, item) => sum + (items[item.id] ?? 0) * item.price, 0);
}
