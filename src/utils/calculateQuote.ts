import { getAllCleaningItems, getCleaningItemById } from '../data/pricing';
import type { QuoteBreakdown, QuoteFormState, QuoteLineItem, QuoteSelection } from '../types/quote';
import { defaultPropertyDetails, defaultQuoteSelection } from '../types/quote';

function buildLineItems(selection: QuoteSelection): QuoteLineItem[] {
  const items: QuoteLineItem[] = [];

  for (const item of getAllCleaningItems()) {
    const qty = selection.items[item.id] ?? 0;
    if (qty <= 0) continue;

    items.push({
      id: item.id,
      label: item.name,
      quantity: qty,
      unitPrice: item.unitPrice,
      amount: qty * item.unitPrice,
      unitLabel: item.unitLabel,
    });
  }

  return items;
}

/** Estimate = sum of (quantity × unit price) for selected cleaning items only */
export function calculateQuote(state: QuoteFormState): QuoteBreakdown {
  const lineItems = buildLineItems(state.quote);
  const total = lineItems.reduce((sum, i) => sum + i.amount, 0);

  return {
    items: lineItems,
    total,
    isEmpty: lineItems.length === 0,
  };
}

export function resetQuoteState(current: QuoteFormState): QuoteFormState {
  return {
    property: { ...current.property },
    quote: { items: {}, notes: '' },
  };
}

export function resetFullQuoteState(): QuoteFormState {
  return {
    property: { ...defaultPropertyDetails },
    quote: { ...defaultQuoteSelection },
  };
}

export function getFrequencyLabel(frequency: QuoteFormState['property']['frequency']): string {
  const labels: Record<QuoteFormState['property']['frequency'], string> = {
    'one-time': 'One-time',
    weekly: 'Weekly',
    fortnightly: 'Fortnightly',
    monthly: 'Monthly',
  };
  return labels[frequency];
}

export function getLineItemLabel(item: QuoteLineItem): string {
  const itemDef = getCleaningItemById(item.id);
  return itemDef?.name ?? item.label;
}
