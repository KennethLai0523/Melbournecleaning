import { getPropertyTypeById } from '../data/pricing';
import { businessConfig } from '../config/businessConfig';
import { formatStartTimeLabel, type QuoteBreakdown, type QuoteFormState } from '../types/quote';
import { formatLineItemSummary, getFrequencyLabel, getLineItemLabel } from './calculateQuote';
import { formatCurrency } from './formatCurrency';
import { buildWhatsAppUrl } from './whatsapp';

export function buildQuoteWhatsAppMessage(
  state: QuoteFormState,
  breakdown: QuoteBreakdown,
): string {
  const propertyType = getPropertyTypeById(state.property.propertyType);

  const lines: string[] = [
    `Hi ${businessConfig.name}, I would like to request a cleaning quote.`,
    '',
    'Property information:',
    `Property type: ${propertyType?.name ?? (state.property.propertyType || 'Not selected')}`,
    `Bedrooms: ${state.property.bedrooms}`,
    `Bathrooms: ${state.property.bathrooms}`,
    `Toilets: ${state.property.toilets}`,
    `Living rooms: ${state.property.livingRooms}`,
    `Kitchens: ${state.property.kitchens}`,
    `Frequency: ${getFrequencyLabel(state.property.frequency)}`,
  ];

  if (breakdown.isEmpty) {
    lines.push('', 'Cleaning details:', '- No items selected yet');
  } else {
    lines.push('', 'Cleaning details:');
    for (const item of breakdown.items) {
      lines.push(
        `- ${getLineItemLabel(item)}: ${formatLineItemSummary(item, formatCurrency)}`,
      );
    }
    lines.push('', `Total: ${formatCurrency(breakdown.total)}`);
  }

  if (state.quote.preferredDate) {
    const date = new Date(`${state.quote.preferredDate}T12:00:00`);
    const dateLabel = Number.isNaN(date.getTime())
      ? state.quote.preferredDate
      : date.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
    lines.push('', 'Preferred schedule:');
    lines.push(`Date: ${dateLabel}`);
    if (state.quote.preferredTime) {
      lines.push(`Start time: ${formatStartTimeLabel(state.quote.preferredTime)}`);
    }
  }

  if (state.quote.notes.trim()) {
    lines.push('', `Notes: ${state.quote.notes.trim()}`);
  }

  return lines.join('\n');
}

export function buildQuoteWhatsAppUrl(state: QuoteFormState, breakdown: QuoteBreakdown): string {
  return buildWhatsAppUrl(buildQuoteWhatsAppMessage(state, breakdown));
}

export function canSendWhatsAppQuote(breakdown: QuoteBreakdown): boolean {
  return !breakdown.isEmpty && breakdown.total > 0;
}
