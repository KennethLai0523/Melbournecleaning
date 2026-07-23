export interface ValidationError {
  field: string;
  message: string;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.length < 8) return 'Please enter a valid phone number';
  return null;
}

export interface QuickEnquiryFields {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  preferredDate: string;
  message: string;
}

export function validateQuickEnquiry(fields: QuickEnquiryFields): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateRequired(fields.name, 'Full name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const emailError = validateEmail(fields.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const suburbError = validateRequired(fields.suburb, 'Suburb');
  if (suburbError) errors.push({ field: 'suburb', message: suburbError });

  const serviceError = validateRequired(fields.service, 'Service type');
  if (serviceError) errors.push({ field: 'service', message: serviceError });

  return errors;
}

export interface DetailedQuoteFields {
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyType: string;
  serviceType: string;
  frequency: string;
  contactMethod: string;
  privacyConsent: boolean;
}

export function validateDetailedQuote(fields: DetailedQuoteFields): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateRequired(fields.name, 'Full name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const emailError = validateEmail(fields.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const addressError = validateRequired(fields.address, 'Property address or suburb');
  if (addressError) errors.push({ field: 'address', message: addressError });

  const propertyError = validateRequired(fields.propertyType, 'Property type');
  if (propertyError) errors.push({ field: 'propertyType', message: propertyError });

  const serviceError = validateRequired(fields.serviceType, 'Service type');
  if (serviceError) errors.push({ field: 'serviceType', message: serviceError });

  const frequencyError = validateRequired(fields.frequency, 'Service frequency');
  if (frequencyError) errors.push({ field: 'frequency', message: frequencyError });

  const contactError = validateRequired(fields.contactMethod, 'Preferred contact method');
  if (contactError) errors.push({ field: 'contactMethod', message: contactError });

  if (!fields.privacyConsent) {
    errors.push({ field: 'privacyConsent', message: 'You must agree to the privacy policy' });
  }

  return errors;
}

export interface ContactFormFields {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function validateContactForm(fields: ContactFormFields): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateRequired(fields.name, 'Full name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.push({ field: 'phone', message: phoneError });

  const emailError = validateEmail(fields.email);
  if (emailError) errors.push({ field: 'email', message: emailError });

  const messageError = validateRequired(fields.message, 'Message');
  if (messageError) errors.push({ field: 'message', message: messageError });

  return errors;
}
