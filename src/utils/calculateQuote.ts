import { getAllCleaningItems, getCleaningItemById } from '../data/pricing';
import type { QuoteBreakdown, QuoteFormState, QuoteLineItem, QuoteSelection } from '../types/quote';
import { defaultPropertyDetails, defaultQuoteSelection } from '../types/quote';

function buildLineItems(selection: QuoteSelection): QuoteLineItem[] {
  const items: QuoteLineItem[] = [];

  for (const item of getAllCleaningItems()) {
    const value = selection.items[item.id] ?? 0;

    if (item.pricingMode === 'toggle') {
      if (value <= 0) continue;
      items.push({
        id: item.id,
        label: item.name,
        quantity: 1,
        unitPrice: item.unitPrice,
        amount: item.unitPrice,
        unitLabel: item.unitLabel,
        pricingMode: 'toggle',
      });
      continue;
    }

    if (value <= 0) continue;
    items.push({
      id: item.id,
      label: item.name,
      quantity: value,
      unitPrice: item.unitPrice,
      amount: value * item.unitPrice,
      unitLabel: item.unitLabel,
      pricingMode: 'quantity',
    });
  }

  return items;
}

/**
 * Estimated total = sum of selected cleaning items only.
 * Property record fields do not affect pricing.
 */
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

export function formatLineItemSummary(item: QuoteLineItem, formatCurrency: (n: number) => string): string {
  if (item.pricingMode === 'toggle') {
    return formatCurrency(item.amount);
  }
  return `${item.quantity} × ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.amount)}`;
}
