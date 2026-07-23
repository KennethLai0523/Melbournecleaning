import { businessConfig } from '../config/businessConfig';
import type { QuickEnquiryData, DetailedQuoteData, ContactFormData } from './whatsapp';

export function buildMailtoLink(
  subject: string,
  body: string,
  email?: string,
): string {
  const to = email ?? businessConfig.email.address;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildQuickEnquiryMailto(data: QuickEnquiryData): string {
  const body = [
    'Cleaning Quote Enquiry',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Suburb: ${data.suburb}`,
    `Service: ${data.service}`,
    `Preferred date: ${data.preferredDate || 'Not specified'}`,
    '',
    'Details:',
    data.message || 'None',
  ].join('\n');

  return buildMailtoLink('Cleaning Quote Enquiry', body);
}

export function buildDetailedQuoteMailto(data: DetailedQuoteData): string {
  const body = [
    'Detailed Cleaning Quote Request',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Address/Suburb: ${data.address}`,
    `Property type: ${data.propertyType}`,
    `Service: ${data.serviceType}`,
    `Bedrooms: ${data.bedrooms || 'N/A'}`,
    `Bathrooms: ${data.bathrooms || 'N/A'}`,
    `Property size: ${data.propertySize || 'N/A'}`,
    `Frequency: ${data.frequency}`,
    `Preferred date: ${data.preferredDate || 'Flexible'}`,
    `Preferred time: ${data.preferredTime || 'Flexible'}`,
    `Additional services: ${data.additionalServices.length > 0 ? data.additionalServices.join(', ') : 'None'}`,
    '',
    'Notes:',
    data.notes || 'None',
    '',
    `Preferred contact method: ${data.contactMethod}`,
  ].join('\n');

  return buildMailtoLink('Detailed Cleaning Quote Request', body);
}

export function buildContactMailto(data: ContactFormData): string {
  const body = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    '',
    data.message,
  ].join('\n');

  return buildMailtoLink(data.subject || 'Website Enquiry', body);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
