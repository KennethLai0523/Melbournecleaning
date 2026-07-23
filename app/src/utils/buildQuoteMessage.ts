import { CONTACT_DETAILS } from '../config/contact';
import {
  cleaningItems,
  type QuoteState,
  formatCurrency,
  calculateQuoteTotal,
} from '../data/quote';

export function buildQuoteMessage(state: QuoteState): string {
  const total = calculateQuoteTotal(state.items);
  const lines = [
    `Hi ${CONTACT_DETAILS.businessName}, I would like to request a cleaning quote.`,
    '',
    'Property information:',
    `Property type: ${state.propertyType}`,
    `Bedrooms: ${state.bedrooms}`,
    `Bathrooms: ${state.bathrooms}`,
    `Toilets: ${state.toilets}`,
    `Living rooms: ${state.livingRooms}`,
    `Kitchens: ${state.kitchens}`,
    `Frequency: ${state.frequency}`,
    '',
    'Cleaning details:',
  ];

  const selected = cleaningItems.filter((item) => (state.items[item.id] ?? 0) > 0);
  if (selected.length === 0) {
    lines.push('- No items selected yet');
  } else {
    for (const item of selected) {
      const qty = state.items[item.id] ?? 0;
      lines.push(`- ${item.label}: ${qty} x ${formatCurrency(item.price)}`);
    }
  }

  lines.push('', `Estimated total: ${formatCurrency(total)}`);
  return lines.join('\n');
}
