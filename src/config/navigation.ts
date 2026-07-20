export interface NavItem {
  label: string;
  path: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Residential', path: '/residential-cleaning' },
  { label: 'Service Areas', path: '/service-areas' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const quoteCtaPath = '/#quote-builder';
export const quoteCtaLabel = 'Build Your Quote';

/** Top red-bar WhatsApp CTA — pre-encoded message */
export const topBarWhatsAppUrl =
  'https://wa.me/61480636863?text=Hi%20Melbourne%20Cleaning%2C%20I%20would%20like%20to%20request%20a%20cleaning%20quote.';

export const footerResidentialLinks: NavItem[] = [
  { label: 'Residential Cleaning', path: '/residential-cleaning' },
  { label: 'Deep Cleaning', path: '/deep-cleaning' },
  { label: 'End of Lease Cleaning', path: '/end-of-lease-cleaning' },
  { label: 'Move-In / Move-Out Cleaning', path: '/move-in-move-out-cleaning' },
  { label: 'Airbnb Cleaning', path: '/airbnb-cleaning' },
  { label: 'Carpet Cleaning', path: '/carpet-cleaning' },
  { label: 'Window Cleaning', path: '/window-cleaning' },
];

export const footerPopularServices: NavItem[] = [
  { label: 'All Services', path: '/services' },
  { label: 'Service Areas', path: '/service-areas' },
  { label: 'Build Your Quote', path: '/#quote-builder' },
  { label: 'Contact', path: '/contact' },
];

export const footerLegalLinks: NavItem[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms and Conditions', path: '/terms-and-conditions' },
  { label: 'Cancellation Policy', path: '/cancellation-policy' },
  { label: 'Sitemap', path: '/sitemap.xml' },
];

/** Commercial routes redirect to residential */
export const commercialRedirectSlugs = [
  'commercial-cleaning',
  'office-cleaning',
  'post-construction-cleaning',
  'strata-cleaning',
] as const;
