import { getPropertyTypeById } from '../data/pricing';
import type { QuoteBreakdown, QuoteFormState } from '../types/quote';
import { getFrequencyLabel, getLineItemLabel } from './calculateQuote';
import { formatCurrency } from './formatCurrency';
import { buildWhatsAppUrl } from './whatsapp';

export function buildQuoteWhatsAppMessage(
  state: QuoteFormState,
  breakdown: QuoteBreakdown,
): string {
  const propertyType = getPropertyTypeById(state.property.propertyType);

  const lines: string[] = [
    'Hi Melbourne Cleaning, I would like to request a residential cleaning quote.',
    '',
    'Property information:',
    `Property type: ${propertyType?.name ?? state.property.propertyType}`,
    `Bedrooms: ${state.property.bedrooms}`,
    `Bathrooms: ${state.property.bathrooms}`,
    `Toilets: ${state.property.toilets}`,
    `Balconies: ${state.property.balconies}`,
    `Garage spaces: ${state.property.garageSpaces}`,
    `Frequency: ${getFrequencyLabel(state.property.frequency)}`,
  ];

  if (breakdown.isEmpty) {
    lines.push('', 'Cleaning details:', '- No items selected yet');
  } else {
    lines.push('', 'Cleaning details:');
    for (const item of breakdown.items) {
      lines.push(
        `- ${getLineItemLabel(item)}: ${item.quantity} × ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.amount)}`,
      );
    }
    lines.push('', `Estimated total: ${formatCurrency(breakdown.total)}`);
  }

  if (state.quote.notes.trim()) {
    lines.push('', `Notes: ${state.quote.notes.trim()}`);
  }

  lines.push(
    '',
    'I understand this is an initial estimate and may change after confirming the property\'s condition and exact cleaning requirements.',
  );

  return lines.join('\n');
}

export function buildQuoteWhatsAppUrl(state: QuoteFormState, breakdown: QuoteBreakdown): string {
  return buildWhatsAppUrl(buildQuoteWhatsAppMessage(state, breakdown));
}

export function canSendWhatsAppQuote(breakdown: QuoteBreakdown): boolean {
  return !breakdown.isEmpty && breakdown.total > 0;
}
