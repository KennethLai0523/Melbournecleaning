export type PropertyType = 'apartment' | 'unit' | 'townhouse' | 'house' | 'studio';
export type Frequency = 'one-off' | 'weekly' | 'fortnightly' | 'monthly';

export interface CleaningItem {
  id: string;
  label: string;
  price: number;
  type: 'toggle' | 'quantity';
}

export const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'unit', label: 'Unit' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'house', label: 'House' },
  { value: 'studio', label: 'Studio' },
];

export const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 'one-off', label: 'One-off' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
];

export const cleaningItems: CleaningItem[] = [
  { id: 'bedroom', label: 'Bedroom cleaning', price: 35, type: 'quantity' },
  { id: 'bathroom', label: 'Bathroom cleaning', price: 45, type: 'quantity' },
  { id: 'toilet', label: 'Toilet cleaning', price: 20, type: 'quantity' },
  { id: 'living-room', label: 'Living room cleaning', price: 30, type: 'quantity' },
  { id: 'kitchen', label: 'Kitchen cleaning', price: 55, type: 'quantity' },
  { id: 'oven', label: 'Oven cleaning', price: 60, type: 'toggle' },
  { id: 'fridge', label: 'Fridge cleaning', price: 35, type: 'toggle' },
  { id: 'windows', label: 'Internal window cleaning', price: 12, type: 'quantity' },
  { id: 'balcony', label: 'Balcony cleaning', price: 28, type: 'toggle' },
];

export interface QuoteState {
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  kitchens: number;
  frequency: Frequency;
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
  items: {},
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateQuoteTotal(items: Record<string, number>): number {
  return cleaningItems.reduce((sum, item) => sum + (items[item.id] ?? 0) * item.price, 0);
}
