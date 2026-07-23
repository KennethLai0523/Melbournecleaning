/** Quote estimator types — frontend-only, not confirmed final pricing. */

export type ServiceFrequency = 'one-time' | 'weekly' | 'fortnightly' | 'monthly';

/** Record-only — does not affect total calculation */
export interface PropertyDetails {
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  kitchens: number;
  frequency: ServiceFrequency;
}

/**
 * Cleaning selections.
 * Quantity items: value = quantity (0 = off)
 * Toggle items: value = 1 selected, 0 or absent = not selected
 */
export interface QuoteSelection {
  items: Record<string, number>;
  notes: string;
  /** Preferred service date (YYYY-MM-DD) — scheduling only, not pricing */
  preferredDate: string;
  /** Preferred start time (HH:mm), e.g. "09:30" */
  preferredTime: string;
}

export interface QuoteFormState {
  property: PropertyDetails;
  quote: QuoteSelection;
}

export interface QuoteLineItem {
  id: string;
  label: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  unitLabel?: string;
  pricingMode: 'quantity' | 'toggle';
}

export interface QuoteBreakdown {
  items: QuoteLineItem[];
  total: number;
  /** True when no cleaning items are selected */
  isEmpty: boolean;
}

export const defaultPropertyDetails: PropertyDetails = {
  propertyType: '',
  bedrooms: 2,
  bathrooms: 1,
  toilets: 1,
  livingRooms: 1,
  kitchens: 1,
  frequency: 'one-time',
};

export const defaultQuoteSelection: QuoteSelection = {
  items: {},
  notes: '',
  preferredDate: '',
  preferredTime: '',
};

export const defaultQuoteState: QuoteFormState = {
  property: defaultPropertyDetails,
  quote: defaultQuoteSelection,
};

/** Available start times in 30-minute steps (8:00 AM – 8:00 PM) */
export const START_TIME_OPTIONS: string[] = Array.from({ length: 25 }, (_, i) => {
  const totalMinutes = 8 * 60 + i * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

export function formatStartTimeLabel(time: string): string {
  if (!time) return 'Not selected';
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
}
