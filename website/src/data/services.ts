export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  image: string;
  category: 'residential' | 'commercial' | 'specialist';
  inclusions: string[];
  optionalAdditions: string[];
  customerTypes: string[];
  process: string[];
  faqs: ServiceFAQ[];
  relatedServiceIds: string[];
}

export const services: Service[] = [
  {
    id: 'regular-house-cleaning',
    slug: 'residential-cleaning',
    title: 'Regular House Cleaning',
    shortTitle: 'House Cleaning',
    description:
      'Keep your home fresh and comfortable with regular house cleaning tailored to your schedule and priorities. Our residential cleaning covers the tasks that matter most for day-to-day living.',
    shortDescription:
      'Scheduled home cleaning to maintain a clean, comfortable living space.',
    image: '/images/service-house-cleaning.jpg',
    category: 'residential',
    inclusions: [
      'Dusting accessible surfaces',
      'Vacuuming carpets and rugs',
      'Mopping hard floors',
      'Kitchen surface cleaning',
      'Bathroom cleaning',
      'Bedroom tidying and cleaning',
      'Living-area cleaning',
      'Rubbish removal from bins',
      'General tidying',
    ],
    optionalAdditions: [
      'Oven cleaning',
      'Internal window cleaning',
      'Fridge cleaning',
      'Balcony cleaning',
    ],
    customerTypes: [
      'Homeowners',
      'Renters',
      'Busy professionals',
      'Families',
      'Anyone seeking recurring home cleaning',
    ],
    process: [
      'Request a quote with your property details',
      'Confirm cleaning requirements and frequency',
      'Schedule your first clean',
      'Enjoy a consistently clean home',
    ],
    faqs: [
      {
        question: 'How often can I book house cleaning?',
        answer:
          'We offer one-time and recurring cleaning schedules including weekly, fortnightly and monthly options depending on availability.',
      },
      {
        question: 'Do I need to provide cleaning supplies?',
        answer:
          'Please let us know your preference when requesting a quote. Requirements may vary depending on the service and property.',
      },
    ],
    relatedServiceIds: ['deep-cleaning', 'end-of-lease-cleaning', 'carpet-cleaning'],
  },
  {
    id: 'deep-cleaning',
    slug: 'deep-cleaning',
    title: 'Deep Cleaning',
    shortTitle: 'Deep Cleaning',
    description:
      'A thorough deep clean goes beyond regular maintenance to address built-up grime, detailed areas and spaces that need extra attention. Ideal for seasonal refreshes or preparing a property for a special occasion.',
    shortDescription:
      'Detailed, thorough cleaning for homes that need extra attention.',
    image: '/images/service-deep-cleaning.jpg',
    category: 'residential',
    inclusions: [
      'Detailed dusting of accessible surfaces',
      'Thorough vacuuming and mopping',
      'Kitchen deep clean including surfaces and appliances (exterior)',
      'Bathroom deep clean including fixtures',
      'Skirting boards and accessible ledges',
      'Door handles and light switches',
      'Bedroom and living-area detailed cleaning',
    ],
    optionalAdditions: [
      'Oven cleaning',
      'Internal window cleaning',
      'Cabinet interior cleaning',
      'Fridge cleaning',
    ],
    customerTypes: [
      'Homeowners preparing for guests',
      'Renters before routine inspections',
      'Properties needing a seasonal refresh',
      'Anyone wanting a more detailed clean',
    ],
    process: [
      'Discuss your deep cleaning priorities',
      'Receive a tailored quote',
      'Schedule the deep clean appointment',
      'Detailed cleaning completed to agreed scope',
    ],
    faqs: [
      {
        question: 'How is deep cleaning different from regular cleaning?',
        answer:
          'Deep cleaning involves more detailed attention to areas that may not be covered in a standard maintenance clean, such as skirting boards, fixtures and built-up grime.',
      },
    ],
    relatedServiceIds: ['regular-house-cleaning', 'end-of-lease-cleaning', 'move-in-move-out-cleaning'],
  },
  {
    id: 'end-of-lease-cleaning',
    slug: 'end-of-lease-cleaning',
    title: 'End of Lease Cleaning',
    shortTitle: 'End of Lease',
    description:
      'Moving out? We help prepare your property for the final inspection with comprehensive end of lease cleaning. Results and bond outcomes remain subject to the property\'s condition, tenancy requirements and inspection.',
    shortDescription:
      'Comprehensive cleaning to help prepare your property for final inspection.',
    image: '/images/service-end-of-lease.jpg',
    category: 'residential',
    inclusions: [
      'Kitchen cleaning including surfaces and cupboards (exterior)',
      'Bathroom cleaning including fixtures',
      'Floors vacuumed and mopped',
      'Bedrooms and living areas cleaned',
      'Internal windows where selected',
      'General property tidying',
    ],
    optionalAdditions: [
      'Oven cleaning',
      'Carpet cleaning',
      'Internal window cleaning',
      'Balcony cleaning',
    ],
    customerTypes: ['Tenants moving out', 'Property managers', 'Landlords between tenancies'],
    process: [
      'Provide property details and inspection date',
      'Receive a quote based on property size and requirements',
      'Schedule the end of lease clean',
      'Property prepared for final inspection',
    ],
    faqs: [
      {
        question: 'Will I get my bond back?',
        answer:
          'We help prepare the property for the final inspection. Results and bond outcomes remain subject to the property\'s condition, tenancy requirements and inspection.',
      },
      {
        question: 'Can you clean the oven as part of end of lease cleaning?',
        answer: 'Yes, oven cleaning can be included as an optional addition. Please mention this when requesting your quote.',
      },
    ],
    relatedServiceIds: ['deep-cleaning', 'carpet-cleaning', 'window-cleaning'],
  },
  {
    id: 'office-cleaning',
    slug: 'office-cleaning',
    title: 'Office Cleaning',
    shortTitle: 'Office Cleaning',
    description:
      'Maintain a professional, hygienic workplace with regular office cleaning. We work around your business hours and operational requirements to minimise disruption.',
    shortDescription:
      'Regular office cleaning tailored to your workplace schedule.',
    image: '/images/service-office-cleaning.jpg',
    category: 'commercial',
    inclusions: [
      'Desk and workstation surface cleaning',
      'Common area cleaning',
      'Kitchen and break room cleaning',
      'Bathroom cleaning and restocking support',
      'Floor vacuuming and mopping',
      'Rubbish and recycling removal',
      'Reception and meeting room cleaning',
    ],
    optionalAdditions: [
      'Internal window cleaning',
      'Carpet cleaning',
      'After-hours scheduling',
    ],
    customerTypes: [
      'Small offices',
      'Corporate workplaces',
      'Co-working spaces',
      'Professional services firms',
    ],
    process: [
      'Site assessment or property details review',
      'Tailored cleaning plan and quote',
      'Schedule regular or one-time service',
      'Ongoing office cleaning support',
    ],
    faqs: [
      {
        question: 'Can cleaning be done outside business hours?',
        answer:
          'Yes, we offer flexible scheduling including early morning, evening and weekend appointments where available.',
      },
    ],
    relatedServiceIds: ['commercial-cleaning', 'window-cleaning', 'carpet-cleaning'],
  },
  {
    id: 'commercial-cleaning',
    slug: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    shortTitle: 'Commercial',
    description:
      'Dependable commercial cleaning for Melbourne workplaces of all sizes. Cleaning plans can be tailored to the site, schedule and operational requirements of your business.',
    shortDescription:
      'Tailored commercial cleaning for workplaces across Melbourne.',
    image: '/images/service-commercial.jpg',
    category: 'commercial',
    inclusions: [
      'Floor cleaning and maintenance',
      'Surface and fixture cleaning',
      'Bathroom and amenity cleaning',
      'Kitchen and staff area cleaning',
      'Rubbish removal',
      'Common area cleaning',
    ],
    optionalAdditions: [
      'Carpet cleaning',
      'Window cleaning',
      'Post-construction clean-up',
      'Custom cleaning schedules',
    ],
    customerTypes: [
      'Retail shops',
      'Showrooms',
      'Warehouses',
      'Real estate agencies',
      'Property managers',
      'Education facilities',
    ],
    process: [
      'Discuss your site and cleaning requirements',
      'Receive a tailored commercial quote',
      'Agree on schedule and scope',
      'Reliable ongoing commercial cleaning',
    ],
    faqs: [
      {
        question: 'Do you clean childcare premises?',
        answer:
          'We can provide cleaning for childcare premises. Please contact us to discuss your specific requirements and scheduling needs.',
      },
    ],
    relatedServiceIds: ['office-cleaning', 'strata-cleaning', 'post-construction-cleaning'],
  },
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    shortTitle: 'Carpet Cleaning',
    description:
      'Refresh your carpets with professional carpet cleaning for residential and commercial properties. Carpet cleaning can be booked as a standalone service or added to other cleaning packages.',
    shortDescription:
      'Professional carpet cleaning for homes and businesses.',
    image: '/images/service-carpet.jpg',
    category: 'specialist',
    inclusions: [
      'Carpet assessment',
      'Vacuuming preparation',
      'Carpet cleaning treatment',
      'Spot treatment where applicable',
    ],
    optionalAdditions: [
      'Upholstery cleaning',
      'Rug cleaning',
      'Combined with end of lease cleaning',
    ],
    customerTypes: ['Homeowners', 'Tenants', 'Offices', 'Retail spaces'],
    process: [
      'Describe your carpet cleaning needs',
      'Receive a quote based on area and condition',
      'Schedule the carpet cleaning appointment',
      'Carpets cleaned and refreshed',
    ],
    faqs: [
      {
        question: 'Is carpet cleaning included in regular house cleaning?',
        answer:
          'Carpet cleaning is typically a separate service. It can be added to your booking or end of lease clean upon request.',
      },
    ],
    relatedServiceIds: ['end-of-lease-cleaning', 'regular-house-cleaning', 'deep-cleaning'],
  },
  {
    id: 'window-cleaning',
    slug: 'window-cleaning',
    title: 'Window Cleaning',
    shortTitle: 'Window Cleaning',
    description:
      'Brighten your property with professional window cleaning. Internal and external window cleaning available depending on access and property requirements.',
    shortDescription:
      'Internal and external window cleaning for homes and businesses.',
    image: '/images/service-window.jpg',
    category: 'specialist',
    inclusions: [
      'Window glass cleaning',
      'Frame wiping where accessible',
      'Removal of visible marks and smudges',
    ],
    optionalAdditions: [
      'External window cleaning (where accessible)',
      'Screen cleaning',
      'Combined with regular cleaning',
    ],
    customerTypes: ['Homeowners', 'Offices', 'Retail shops', 'Strata properties'],
    process: [
      'Provide details about windows and access',
      'Receive a quote',
      'Schedule the window cleaning',
      'Windows cleaned to agreed scope',
    ],
    faqs: [
      {
        question: 'Do you clean external windows on multi-storey buildings?',
        answer:
          'External window cleaning depends on safe access. Please contact us with your property details so we can confirm what is possible.',
      },
    ],
    relatedServiceIds: ['regular-house-cleaning', 'commercial-cleaning', 'end-of-lease-cleaning'],
  },
  {
    id: 'airbnb-cleaning',
    slug: 'airbnb-cleaning',
    title: 'Airbnb and Short-Stay Cleaning',
    shortTitle: 'Airbnb Cleaning',
    description:
      'Keep your short-stay property guest-ready with reliable turnover cleaning between bookings. Flexible scheduling to align with your check-in and check-out times.',
    shortDescription:
      'Turnover cleaning for Airbnb and short-stay properties.',
    image: '/images/service-airbnb.jpg',
    category: 'residential',
    inclusions: [
      'Full property clean between guests',
      'Bathroom and kitchen cleaning',
      'Bed making and linen change (if linen provided)',
      'Floor cleaning',
      'General tidying and presentation',
      'Rubbish removal',
    ],
    optionalAdditions: [
      'Linen supply coordination',
      'Restocking essentials',
      'Same-day turnaround',
    ],
    customerTypes: ['Airbnb hosts', 'Short-stay property managers', 'Holiday rental owners'],
    process: [
      'Share your property and turnover schedule',
      'Set up a recurring cleaning arrangement',
      'Cleaning completed between each guest stay',
      'Property ready for the next arrival',
    ],
    faqs: [
      {
        question: 'Can you clean on the same day as checkout?',
        answer:
          'Same-day turnaround may be available depending on scheduling. Contact us with your checkout and check-in times to confirm.',
      },
    ],
    relatedServiceIds: ['regular-house-cleaning', 'deep-cleaning', 'carpet-cleaning'],
  },
  {
    id: 'move-in-move-out-cleaning',
    slug: 'move-in-move-out-cleaning',
    title: 'Move-In and Move-Out Cleaning',
    shortTitle: 'Move-In / Move-Out',
    description:
      'Start fresh in your new home or leave your previous property in good condition with move-in and move-out cleaning services tailored to your needs.',
    shortDescription:
      'Cleaning services for moving in or moving out of a property.',
    image: '/images/service-move-in-out.jpg',
    category: 'residential',
    inclusions: [
      'Kitchen cleaning',
      'Bathroom cleaning',
      'Floor vacuuming and mopping',
      'Bedroom and living-area cleaning',
      'Cupboard and surface cleaning (exterior)',
      'General property tidying',
    ],
    optionalAdditions: [
      'Oven cleaning',
      'Carpet cleaning',
      'Internal window cleaning',
      'Garage cleaning',
    ],
    customerTypes: ['Home buyers', 'Home sellers', 'Tenants', 'Landlords'],
    process: [
      'Share your moving timeline and property details',
      'Receive a tailored quote',
      'Schedule before or after your move',
      'Property cleaned and ready',
    ],
    faqs: [
      {
        question: 'Should I book move-out cleaning before or after moving furniture?',
        answer:
          'For the best results, we recommend booking after furniture has been removed. Contact us to discuss your specific situation.',
      },
    ],
    relatedServiceIds: ['end-of-lease-cleaning', 'deep-cleaning', 'carpet-cleaning'],
  },
  {
    id: 'post-construction-cleaning',
    slug: 'post-construction-cleaning',
    title: 'Post-Construction Cleaning',
    shortTitle: 'Post-Construction',
    description:
      'Remove construction dust and debris with post-construction and renovation cleaning. We help prepare your property for occupancy or handover after building work.',
    shortDescription:
      'Cleaning after construction or renovation work.',
    image: '/images/service-post-construction.jpg',
    category: 'commercial',
    inclusions: [
      'Dust removal from surfaces',
      'Floor cleaning',
      'Window and glass cleaning',
      'Fixture and fitting wipe-down',
      'Rubbish and debris removal (light)',
      'General property tidy',
    ],
    optionalAdditions: [
      'Multiple visit clean-up schedule',
      'Detailed fixture cleaning',
      'External area cleaning',
    ],
    customerTypes: [
      'Builders',
      'Developers',
      'Homeowners after renovation',
      'Commercial fit-out projects',
    ],
    process: [
      'Assess the scope of post-construction cleaning required',
      'Receive a detailed quote',
      'Schedule cleaning visits as needed',
      'Property prepared for handover or occupancy',
    ],
    faqs: [
      {
        question: 'When should post-construction cleaning be scheduled?',
        answer:
          'Post-construction cleaning is typically scheduled after major building work is complete and before furniture is moved in. We can discuss a multi-stage approach for larger projects.',
      },
    ],
    relatedServiceIds: ['commercial-cleaning', 'deep-cleaning', 'window-cleaning'],
  },
  {
    id: 'strata-cleaning',
    slug: 'strata-cleaning',
    title: 'Strata and Common Area Cleaning',
    shortTitle: 'Strata Cleaning',
    description:
      'Maintain shared spaces in apartment buildings and managed properties with strata and common area cleaning. Regular schedules can be tailored to body corporate requirements.',
    shortDescription:
      'Common area cleaning for strata and managed properties.',
    image: '/images/service-strata.jpg',
    category: 'commercial',
    inclusions: [
      'Lobby and entrance cleaning',
      'Hallway and corridor cleaning',
      'Lift cleaning (where applicable)',
      'Stairwell cleaning',
      'Common bathroom cleaning',
      'Rubbish area maintenance',
    ],
    optionalAdditions: [
      'Car park cleaning',
      'External common area cleaning',
      'Window cleaning',
    ],
    customerTypes: [
      'Body corporate managers',
      'Strata committees',
      'Property managers',
      'Building owners',
    ],
    process: [
      'Review common area requirements',
      'Propose a cleaning schedule and quote',
      'Agree on scope with strata representatives',
      'Ongoing common area maintenance',
    ],
    faqs: [
      {
        question: 'Can you provide cleaning for apartment building common areas?',
        answer:
          'Yes, we provide strata and common area cleaning. Contact us with your building details for a tailored quote.',
      },
    ],
    relatedServiceIds: ['commercial-cleaning', 'window-cleaning', 'office-cleaning'],
  },
];

const HIDDEN_SERVICE_IDS = new Set(['carpet-cleaning', 'window-cleaning']);

export function getPublicServices(): Service[] {
  return services.filter(
    (service) => service.category !== 'commercial' && !HIDDEN_SERVICE_IDS.has(service.id),
  );
}

export const serviceTypeOptions = getPublicServices().map((s) => ({
  value: s.id,
  label: s.title,
}));

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter(
      (s): s is Service =>
        s !== undefined && s.category !== 'commercial' && !HIDDEN_SERVICE_IDS.has(s.id),
    );
}
