import { businessConfig } from '../config/businessConfig';

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `${businessConfig.whatsapp.baseUrl}?text=${encoded}`;
}

export function getDefaultWhatsAppUrl(): string {
  return buildWhatsAppUrl(businessConfig.whatsapp.defaultMessage);
}

export function buildSuburbCheckWhatsAppUrl(suburb: string): string {
  const message = `Hi Melbourne Premier Cleaning, do you provide cleaning services in ${suburb}?`;
  return buildWhatsAppUrl(message);
}

export interface QuickEnquiryData {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  preferredDate: string;
  message: string;
}

export function buildQuickEnquiryWhatsAppMessage(data: QuickEnquiryData): string {
  const lines = [
    'Hi Melbourne Premier Cleaning, I would like to request a quote.',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Suburb: ${data.suburb}`,
    `Service: ${data.service}`,
    `Preferred date: ${data.preferredDate || 'Not specified'}`,
    `Details: ${data.message || 'None'}`,
  ];
  return lines.join('\n');
}

export interface DetailedQuoteData {
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyType: string;
  serviceType: string;
  bedrooms: string;
  bathrooms: string;
  propertySize: string;
  frequency: string;
  preferredDate: string;
  preferredTime: string;
  additionalServices: string[];
  notes: string;
  contactMethod: string;
}

export function buildDetailedQuoteWhatsAppMessage(data: DetailedQuoteData): string {
  const lines = [
    'Hi Melbourne Premier Cleaning, I would like to request a detailed cleaning quote.',
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
    `Notes: ${data.notes || 'None'}`,
    `Preferred contact: ${data.contactMethod}`,
  ];
  return lines.join('\n');
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function buildContactWhatsAppMessage(data: ContactFormData): string {
  const lines = [
    `Hi Melbourne Premier Cleaning, I have an enquiry.`,
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    `Message: ${data.message}`,
  ];
  return lines.join('\n');
}
