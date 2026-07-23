/**
 * Testimonials — replace placeholders with verified customer reviews before publishing.
 * Do NOT publish sample testimonials as genuine reviews.
 */

export interface Testimonial {
  id: string;
  isPlaceholder: boolean;
  quote: string;
  author?: string;
  location?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1',
    isPlaceholder: true,
    quote:
      'Sample testimonial — replace with a verified customer review before publishing.',
  },
  {
    id: 'placeholder-2',
    isPlaceholder: true,
    quote:
      'Sample testimonial — replace with a verified customer review before publishing.',
  },
  {
    id: 'placeholder-3',
    isPlaceholder: true,
    quote:
      'Sample testimonial — replace with a verified customer review before publishing.',
  },
];
