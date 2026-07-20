/** Quote estimator types — frontend-only, not confirmed final pricing. */

export type ServiceFrequency = 'one-time' | 'weekly' | 'fortnightly' | 'monthly';

/** Record-only — does not affect estimate calculation */
export interface PropertyDetails {
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  balconies: number;
  garageSpaces: number;
  frequency: ServiceFrequency;
}

/** Item-by-item cleaning selections — quantities × unit prices */
export interface QuoteSelection {
  /** Cleaning item id → quantity (0 = not selected) */
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
  unitLabel: string;
}

export interface QuoteBreakdown {
  items: QuoteLineItem[];
  total: number;
  isEmpty: boolean;
}

export const defaultPropertyDetails: PropertyDetails = {
  propertyType: 'house',
  bedrooms: 2,
  bathrooms: 1,
  toilets: 1,
  balconies: 0,
  garageSpaces: 0,
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
