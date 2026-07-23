import { businessConfig } from './businessConfig';

export interface NavItem {
  label: string;
  path: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Area We Clean', path: '/service-areas' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const quoteCtaPath = '/#journey-choose-service';
export const quoteCtaLabel = 'Build Your Quote';

/** Top red-bar WhatsApp CTA — uses central WhatsApp config */
export const topBarWhatsAppUrl = `${businessConfig.whatsapp.baseUrl}?text=${encodeURIComponent(businessConfig.whatsapp.defaultMessage)}`;

export const footerResidentialLinks: NavItem[] = [
  { label: 'Residential Cleaning', path: '/residential-cleaning' },
  { label: 'Deep Cleaning', path: '/deep-cleaning' },
  { label: 'End of Lease Cleaning', path: '/end-of-lease-cleaning' },
  { label: 'Move-In / Move-Out Cleaning', path: '/move-in-move-out-cleaning' },
  { label: 'Airbnb Cleaning', path: '/airbnb-cleaning' },
];

export const footerPopularServices: NavItem[] = [
  { label: 'All Services', path: '/services' },
  { label: 'Area We Clean', path: '/service-areas' },
  { label: 'Build Your Quote', path: '/#journey-choose-service' },
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
