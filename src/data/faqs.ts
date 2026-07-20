export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const homeFaqs: FAQ[] = [
  {
    id: 'areas',
    question: 'Which areas of Melbourne do you service?',
    answer:
      'We provide cleaning services across Melbourne CBD, inner city and surrounding suburbs including northern, eastern, south-eastern, western and bayside areas. Service availability may vary by location — contact us to confirm coverage for your suburb.',
  },
  {
    id: 'equipment',
    question: 'Do I need to provide cleaning equipment?',
    answer:
      'Please let us know your preference when requesting a quote. Equipment requirements may vary depending on the service type and property.',
  },
  {
    id: 'one-time',
    question: 'Can I request a one-time clean?',
    answer:
      'Yes, we offer one-time cleaning as well as recurring schedules. Mention your preference when requesting a quote.',
  },
  {
    id: 'recurring',
    question: 'Do you offer recurring cleaning?',
    answer:
      'Yes, recurring cleaning is available including weekly, fortnightly and monthly options depending on availability and your requirements.',
  },
  {
    id: 'quote',
    question: 'How do I request a quote?',
    answer:
      'You can request a quote by phone, WhatsApp or through our online quote form. We will respond with details based on your property and cleaning requirements.',
  },
  {
    id: 'customise',
    question: 'Can I customise the cleaning checklist?',
    answer:
      'Yes, cleaning plans can be tailored to your priorities. Let us know which areas and tasks are most important when you enquire.',
  },
  {
    id: 'end-of-lease',
    question: 'Do you provide end of lease cleaning?',
    answer:
      'Yes, we provide end of lease cleaning to help prepare your property for final inspection. Optional additions such as oven and carpet cleaning can be included.',
  },
  {
    id: 'booking-advance',
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking as early as possible, especially for end of lease cleans and larger residential jobs. Contact us to check availability for your preferred date.',
  },
  {
    id: 'reschedule',
    question: 'What happens if I need to reschedule?',
    answer:
      'If you need to reschedule, please contact us as soon as possible. We will do our best to accommodate a new appointment time subject to availability.',
  },
  {
    id: 'whatsapp',
    question: 'Can I enquire through WhatsApp?',
    answer:
      'Yes, you can contact us through WhatsApp for quotes and general enquiries. Use the WhatsApp button on our website to start a conversation.',
  },
  {
    id: 'carpet',
    question: 'Is carpet cleaning included?',
    answer:
      'Carpet cleaning is available as a separate service or optional addition. It is not typically included in standard house cleaning unless requested.',
  },
];
