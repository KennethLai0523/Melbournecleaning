/**
 * Central contact and branding configuration.
 * Edit contact details here only — do not hardcode them in components.
 */

export const CONTACT_DETAILS = {
  businessName: 'Melbourne Cleaning Group',
  email: 'enquiry.melbourecleaning@gmail.com',
  phoneDisplay: '0483 744 926',
  phoneInternational: '+61483744926',
  phoneInternationalDisplay: '+61 483 744 926',
  whatsappNumber: '61483744926',
  whatsappUrl: 'https://wa.me/61483744926',
} as const;

export const businessConfig = {
  name: CONTACT_DETAILS.businessName,
  tagline: 'Professional Cleaning Services You Can Rely On',
  heroSubtitle:
    'Reliable residential cleaning services across Melbourne, delivered with clear communication, flexible scheduling and careful attention to detail.',

  phone: {
    display: CONTACT_DETAILS.phoneDisplay,
    tel: `tel:${CONTACT_DETAILS.phoneInternational}`,
    raw: CONTACT_DETAILS.phoneInternational,
    internationalDisplay: CONTACT_DETAILS.phoneInternationalDisplay,
  },

  whatsapp: {
    number: CONTACT_DETAILS.whatsappNumber,
    baseUrl: CONTACT_DETAILS.whatsappUrl,
    defaultMessage:
      'Hi Melbourne Cleaning Group, I would like to request a cleaning quote.',
  },

  email: {
    address: CONTACT_DETAILS.email,
    mailto: `mailto:${CONTACT_DETAILS.email}`,
    isTemporary: false,
  },

  address: {
    city: 'Melbourne',
    state: 'Victoria',
  },

  serviceCoverageText: 'Serving Melbourne and surrounding suburbs',

  openingHours: {
    weekdays: 'Monday – Friday: 8:00 AM – 8:00 PM',
    saturday: 'Saturday: 8:00 AM – 6:00 PM',
    sunday: 'Sunday: 8:00 AM – 6:00 PM',
    display: 'Mon–Fri 8am–8pm | Sat & Sun 8am–6pm',
  },

  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  trustClaims: {
    fullyInsured: false,
    policeChecked: false,
    workingWithChildrenCheck: false,
    yearsOfExperience: null as number | null,
    customerCount: null as number | null,
    googleRating: null as number | null,
    bondBackGuarantee: false,
    familyOwned: false,
    industryMemberships: [] as string[],
    certifications: [] as string[],
    awards: [] as string[],
    foundingYear: null as number | null,
  },

  colors: {
    primaryRed: '#C8102E',
    darkRed: '#960018',
    charcoal: '#222222',
    white: '#FFFFFF',
    lightGrey: '#F5F5F5',
    borderGrey: '#E3E3E3',
    secondaryText: '#5F6368',
  },

  siteUrl: 'https://www.melbournecleaning.co',
} as const;

export type BusinessConfig = typeof businessConfig;
export type ContactDetails = typeof CONTACT_DETAILS;
