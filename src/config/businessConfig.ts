/**
 * Central business configuration — edit all contact and branding details here.
 * Items marked TEMPORARY must be replaced with verified information before launch.
 */

export const businessConfig = {
  name: 'Melbourne Premier Cleaning',
  tagline: 'Professional Cleaning Services You Can Rely On',
  heroSubtitle:
    'Reliable residential cleaning services across Melbourne, delivered with clear communication, flexible scheduling and careful attention to detail.',

  // Phone & WhatsApp — verified
  phone: {
    display: '+61 480 636 863',
    tel: 'tel:+61480636863',
    raw: '+61480636863',
  },

  whatsapp: {
    number: '61480636863',
    baseUrl: 'https://wa.me/61480636863',
    defaultMessage:
      'Hi Melbourne Premier Cleaning, I would like to request a cleaning quote.',
  },

  // TEMPORARY — replace with verified business email before launch
  email: {
    address: 'hello@melbournepremiercleaning.com.au',
    /** @temporary Not yet verified */
    isTemporary: true,
  },

  // TEMPORARY — replace with verified street address before launch
  address: {
    city: 'Melbourne',
    state: 'Victoria',
  },

  serviceCoverageText: 'Serving Melbourne and surrounding suburbs',

  openingHours: {
    weekdays: 'Monday – Friday: 7:00 AM – 6:00 PM',
    saturday: 'Saturday: 8:00 AM – 4:00 PM',
    sunday: 'Sunday: By appointment',
    display: 'Mon–Fri 7am–6pm | Sat 8am–4pm | Sun by appointment',
  },

  // Social media — leave empty until verified links are available
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  // Trust claims — disabled by default; enable only after verification
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

  siteUrl: 'https://www.melbournepremiercleaning.com.au',
} as const;

export type BusinessConfig = typeof businessConfig;
