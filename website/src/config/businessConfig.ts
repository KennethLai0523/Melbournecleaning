/**
 * Central contact and branding configuration.
 * Edit contact details here only — do not hardcode them in components.
 */

import { CONTACT_DETAILS } from './contact';

export const businessConfig = {
  name: CONTACT_DETAILS.businessName,
  tagline: 'Professional Cleaning Services You Can Rely On',
  heroSubtitle:
    'Reliable residential cleaning services across Melbourne, delivered with clear communication, flexible scheduling and careful attention to detail.',

  phone: {
    display: CONTACT_DETAILS.phoneDisplay,
    tel: `tel:${CONTACT_DETAILS.phoneInternational}`,
    raw: CONTACT_DETAILS.phoneInternational,
    internationalDisplay: '+61 483 744 926',
  },

  whatsapp: {
    number: '61483744926',
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
    street: '7 Barlyn Rd',
    suburb: 'Mount Waverley',
    state: 'VIC',
    postcode: '3149',
    city: 'Mount Waverley',
    country: 'Australia',
    display: '7 Barlyn Rd, Mount Waverley VIC 3149',
    mapsQuery: '7 Barlyn Rd, Mount Waverley VIC 3149, Australia',
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

  siteUrl: CONTACT_DETAILS.websiteUrl,
} as const;

export type BusinessConfig = typeof businessConfig;
export type ContactDetails = typeof CONTACT_DETAILS;
