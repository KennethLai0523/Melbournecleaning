/** Quote estimator types — frontend-only, not confirmed final pricing. */

export type ServiceFrequency = 'one-time' | 'weekly' | 'fortnightly' | 'monthly';

/** Record-only — does not affect estimate calculation */
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
};

export const defaultQuoteState: QuoteFormState = {
  property: defaultPropertyDetails,
  quote: defaultQuoteSelection,
};
