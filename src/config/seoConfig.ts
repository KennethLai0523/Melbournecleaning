import { businessConfig } from './businessConfig';

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}

const baseUrl = businessConfig.siteUrl;
const defaultOgImage = `${baseUrl}/images/icon.png`;
const brand = businessConfig.name;

export const seoConfig: Record<string, PageSEO> = {
  home: {
    path: '/',
    title: `${brand} | Residential Cleaning in Melbourne`,
    description:
      'Professional residential cleaning services across Melbourne. Build an instant cleaning summary and contact Melbourne Cleaning Group by phone, email or WhatsApp.',
    ogImage: defaultOgImage,
  },
  services: {
    path: '/services',
    title: `Residential Cleaning Services Melbourne | ${brand}`,
    description:
      'Explore our residential cleaning services including house cleaning, end of lease cleaning, deep cleaning, carpet cleaning and more.',
    ogImage: defaultOgImage,
  },
  residentialCleaning: {
    path: '/residential-cleaning',
    title: `Residential House Cleaning Melbourne | ${brand}`,
    description:
      'Reliable home cleaning services across Melbourne. Regular cleans, deep cleaning and custom cleaning plans for your property.',
    ogImage: defaultOgImage,
  },
  commercialCleaning: {
    path: '/commercial-cleaning',
    title: `Commercial Cleaning Melbourne | ${brand}`,
    description:
      'Dependable commercial cleaning for offices, retail, warehouses and workplaces across Melbourne. Request a tailored quote.',
    ogImage: defaultOgImage,
  },
  endOfLeaseCleaning: {
    path: '/end-of-lease-cleaning',
    title: `End of Lease Cleaning Melbourne | ${brand}`,
    description:
      'End of lease cleaning to help prepare your property for final inspection. Flexible scheduling across Melbourne.',
    ogImage: defaultOgImage,
  },
  deepCleaning: {
    path: '/deep-cleaning',
    title: `Deep Cleaning Melbourne | ${brand}`,
    description:
      'Thorough deep cleaning for homes and properties across Melbourne. Request a quote for your deep clean requirements.',
    ogImage: defaultOgImage,
  },
  officeCleaning: {
    path: '/office-cleaning',
    title: `Office Cleaning Melbourne | ${brand}`,
    description:
      'Professional office cleaning services for Melbourne workplaces. Flexible schedules and tailored cleaning plans.',
    ogImage: defaultOgImage,
  },
  carpetCleaning: {
    path: '/carpet-cleaning',
    title: `Carpet Cleaning Melbourne | ${brand}`,
    description:
      'Carpet cleaning services for residential properties across Melbourne. Enquire for a quote.',
    ogImage: defaultOgImage,
  },
  windowCleaning: {
    path: '/window-cleaning',
    title: `Window Cleaning Melbourne | ${brand}`,
    description:
      'Internal and external window cleaning for homes across Melbourne. Request a quote today.',
    ogImage: defaultOgImage,
  },
  airbnbCleaning: {
    path: '/airbnb-cleaning',
    title: `Airbnb & Short-Stay Cleaning Melbourne | ${brand}`,
    description:
      'Turnover cleaning for Airbnb and short-stay properties across Melbourne. Flexible scheduling between guests.',
    ogImage: defaultOgImage,
  },
  moveInMoveOutCleaning: {
    path: '/move-in-move-out-cleaning',
    title: `Move-In & Move-Out Cleaning Melbourne | ${brand}`,
    description:
      'Move-in and move-out cleaning services across Melbourne. Prepare your property for the next chapter.',
    ogImage: defaultOgImage,
  },
  postConstructionCleaning: {
    path: '/post-construction-cleaning',
    title: `Post-Construction Cleaning Melbourne | ${brand}`,
    description:
      'Post-construction and renovation cleaning for residential sites across Melbourne.',
    ogImage: defaultOgImage,
  },
  strataCleaning: {
    path: '/strata-cleaning',
    title: `Strata & Common Area Cleaning Melbourne | ${brand}`,
    description:
      'Strata and common area cleaning for apartment buildings and managed properties across Melbourne.',
    ogImage: defaultOgImage,
  },
  serviceAreas: {
    path: '/service-areas',
    title: `Service Areas Melbourne | ${brand}`,
    description:
      `${brand} services Melbourne CBD, inner city and surrounding suburbs. Check availability for your area.`,
    ogImage: defaultOgImage,
  },
  about: {
    path: '/about',
    title: `About Us | ${brand}`,
    description:
      `Learn about ${brand} — residential cleaning services with dependable communication across Melbourne.`,
    ogImage: defaultOgImage,
  },
  contact: {
    path: '/contact',
    title: `Contact Us | ${brand}`,
    description:
      `Contact ${brand} by phone, WhatsApp or email. Serving Melbourne and surrounding suburbs.`,
    ogImage: defaultOgImage,
  },
  requestQuote: {
    path: '/request-a-quote',
    title: `Request a Free Quote | ${brand}`,
    description:
      `Request a free cleaning quote from ${brand}. Submit your details via WhatsApp or email.`,
    ogImage: defaultOgImage,
  },
  privacyPolicy: {
    path: '/privacy-policy',
    title: `Privacy Policy | ${brand}`,
    description: `Privacy policy for ${brand} website. Requires professional legal review before launch.`,
    ogImage: defaultOgImage,
  },
  termsAndConditions: {
    path: '/terms-and-conditions',
    title: `Terms and Conditions | ${brand}`,
    description: `Terms and conditions for ${brand} services. Requires professional legal review before launch.`,
    ogImage: defaultOgImage,
  },
  cancellationPolicy: {
    path: '/cancellation-policy',
    title: `Cancellation Policy | ${brand}`,
    description: `Cancellation policy for ${brand} services. Requires professional legal review before launch.`,
    ogImage: defaultOgImage,
  },
  notFound: {
    path: '/404',
    title: `Page Not Found | ${brand}`,
    description: 'The page you are looking for could not be found.',
    ogImage: defaultOgImage,
  },
};

export function getCanonicalUrl(path: string): string {
  const cleanPath = path === '/' ? '' : path;
  return `${baseUrl}${cleanPath}`;
}
