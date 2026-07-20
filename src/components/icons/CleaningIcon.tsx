import type { ReactNode } from 'react';

export type CleaningIconName =
  | 'bedroom'
  | 'bathroom'
  | 'toilet'
  | 'living-room'
  | 'dining'
  | 'kitchen'
  | 'balcony'
  | 'garage'
  | 'window'
  | 'window-external'
  | 'door'
  | 'oven'
  | 'fridge'
  | 'microwave'
  | 'dishwasher'
  | 'cabinet'
  | 'carpet'
  | 'blinds'
  | 'laundry'
  | 'stairs'
  | 'sparkle'
  | 'wall-spot'
  | 'rangehood'
  | 'pantry'
  | 'wardrobe'
  | 'skirting'
  | 'fan'
  | 'light'
  | 'pet-hair'
  | 'grease'
  | 'mould'
  | 'cobweb'
  | 'upholstery'
  | 'patio'
  | 'calendar'
  | 'apartment'
  | 'unit'
  | 'townhouse'
  | 'house'
  | 'studio';

interface CleaningIconProps {
  name: CleaningIconName;
  size?: number;
  className?: string;
}

const paths: Record<CleaningIconName, ReactNode> = {
  bedroom: (
    <>
      <path d="M4 14V8l4-3 4 3v6H4z" strokeWidth="1.75" />
      <path d="M2 14h16M6 11h2M12 11h2" strokeWidth="1.75" />
    </>
  ),
  bathroom: (
    <>
      <path d="M5 10h10v5H5z" strokeWidth="1.75" />
      <path d="M7 10V7a2 2 0 0 1 4 0v3M4 15h12" strokeWidth="1.75" />
    </>
  ),
  toilet: (
    <>
      <path d="M8 4v3M6 7h4" strokeWidth="1.75" />
      <path d="M5 7h6c1 0 2 1.5 2 3.5S12 14 10 14H6C4 14 3 12.5 3 10.5S4 7 5 7z" strokeWidth="1.75" />
    </>
  ),
  'living-room': (
    <>
      <path d="M3 12h14v4H3z" strokeWidth="1.75" />
      <path d="M5 12V9h10v3" strokeWidth="1.75" />
    </>
  ),
  dining: (
    <>
      <ellipse cx="10" cy="9" rx="6" ry="3" strokeWidth="1.75" />
      <path d="M4 9v6M16 9v6M10 12v4" strokeWidth="1.75" />
    </>
  ),
  kitchen: (
    <>
      <rect x="4" y="5" width="12" height="10" rx="1" strokeWidth="1.75" />
      <path d="M4 9h12M8 5V3M12 5V3" strokeWidth="1.75" />
    </>
  ),
  balcony: (
    <>
      <path d="M3 14h14M5 14V8l5-3 5 3v6" strokeWidth="1.75" />
      <path d="M7 10h6" strokeWidth="1.75" />
    </>
  ),
  garage: (
    <>
      <path d="M3 14h14V9l7-5 7 5v5H3z" strokeWidth="1.75" transform="scale(0.85) translate(1.5 1)" />
      <rect x="8" y="10" width="4" height="4" strokeWidth="1.75" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="4" width="12" height="12" strokeWidth="1.75" />
      <path d="M4 10h12M10 4v12" strokeWidth="1.75" />
    </>
  ),
  'window-external': (
    <>
      <rect x="4" y="4" width="12" height="12" strokeWidth="1.75" />
      <path d="M4 10h12M10 4v12M7 7l6 6M13 7l-6 6" strokeWidth="1.5" />
    </>
  ),
  door: (
    <>
      <rect x="6" y="3" width="8" height="14" strokeWidth="1.75" />
      <circle cx="12" cy="10" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  oven: (
    <>
      <rect x="4" y="5" width="12" height="10" rx="1" strokeWidth="1.75" />
      <rect x="6" y="8" width="8" height="5" strokeWidth="1.75" />
    </>
  ),
  fridge: (
    <>
      <rect x="6" y="3" width="8" height="14" rx="1" strokeWidth="1.75" />
      <path d="M6 9h8" strokeWidth="1.75" />
    </>
  ),
  microwave: (
    <>
      <rect x="3" y="6" width="14" height="8" rx="1" strokeWidth="1.75" />
      <rect x="5" y="8" width="7" height="4" strokeWidth="1.5" />
    </>
  ),
  dishwasher: (
    <>
      <rect x="5" y="4" width="10" height="12" rx="1" strokeWidth="1.75" />
      <path d="M8 8h4M8 11h4" strokeWidth="1.5" />
    </>
  ),
  cabinet: (
    <>
      <rect x="3" y="5" width="14" height="10" strokeWidth="1.75" />
      <path d="M10 5v10M3 10h14" strokeWidth="1.75" />
    </>
  ),
  carpet: (
    <>
      <rect x="3" y="8" width="14" height="6" rx="1" strokeWidth="1.75" />
      <path d="M5 8V6h10v2" strokeWidth="1.75" />
    </>
  ),
  blinds: (
    <>
      <path d="M4 4h12M4 7h12M4 10h12M4 13h12" strokeWidth="1.5" />
    </>
  ),
  laundry: (
    <>
      <rect x="5" y="4" width="10" height="12" rx="1" strokeWidth="1.75" />
      <circle cx="10" cy="11" r="3" strokeWidth="1.75" />
    </>
  ),
  stairs: (
    <>
      <path d="M4 14h3V11h3V8h3V5h3" strokeWidth="1.75" />
    </>
  ),
  sparkle: (
    <>
      <path d="M10 3v4M10 13v4M3 10h4M13 10h4M5.5 5.5l2.8 2.8M11.7 11.7l2.8 2.8M14.5 5.5l-2.8 2.8M8.3 11.7l-2.8 2.8" strokeWidth="1.75" />
    </>
  ),
  'wall-spot': (
    <>
      <rect x="3" y="4" width="14" height="12" strokeWidth="1.75" />
      <circle cx="10" cy="10" r="2" strokeWidth="1.75" />
    </>
  ),
  rangehood: (
    <>
      <path d="M4 8h12l-1 4H5l-1-4z" strokeWidth="1.75" />
      <path d="M10 4v4" strokeWidth="1.75" />
    </>
  ),
  pantry: (
    <>
      <rect x="4" y="4" width="12" height="12" strokeWidth="1.75" />
      <path d="M4 8h12M4 12h12" strokeWidth="1.5" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="5" y="3" width="10" height="14" strokeWidth="1.75" />
      <path d="M10 3v14" strokeWidth="1.75" />
    </>
  ),
  skirting: (
    <>
      <rect x="3" y="4" width="14" height="10" strokeWidth="1.75" />
      <path d="M3 14h14" strokeWidth="2.5" />
    </>
  ),
  fan: (
    <>
      <circle cx="10" cy="10" r="2" strokeWidth="1.75" />
      <path d="M10 4v2M10 14v2M4 10h2M14 10h2M6 6l1.5 1.5M12.5 12.5L14 14M14 6l-1.5 1.5M6 14l1.5-1.5" strokeWidth="1.5" />
    </>
  ),
  light: (
    <>
      <path d="M10 3v2M7 14h6M8 11h4l-1-6H9l-1 6z" strokeWidth="1.75" />
    </>
  ),
  'pet-hair': (
    <>
      <circle cx="8" cy="9" r="2" strokeWidth="1.5" />
      <circle cx="13" cy="8" r="1.5" strokeWidth="1.5" />
      <path d="M5 13c1-2 3-3 5-3s4 1 5 3" strokeWidth="1.5" />
    </>
  ),
  grease: (
    <>
      <path d="M6 14c0-4 2-7 4-7s4 3 4 7" strokeWidth="1.75" />
      <path d="M8 7V5M12 7V5" strokeWidth="1.5" />
    </>
  ),
  mould: (
    <>
      <circle cx="10" cy="10" r="5" strokeWidth="1.75" />
      <path d="M7 10c0-2 1.5-3 3-3s3 1 3 3" strokeWidth="1.5" />
    </>
  ),
  cobweb: (
    <>
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
      <path d="M10 10V4M10 10l5 3M10 10l-5 3M10 10V16" strokeWidth="1.25" />
    </>
  ),
  upholstery: (
    <>
      <path d="M4 12h12v3H4z" strokeWidth="1.75" />
      <path d="M6 12V9c0-1 1.5-2 4-2s4 1 4 2v3" strokeWidth="1.75" />
    </>
  ),
  patio: (
    <>
      <path d="M3 14h14M5 14V9h10v5" strokeWidth="1.75" />
      <path d="M7 9V7h6v2" strokeWidth="1.75" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="12" height="11" rx="1" strokeWidth="1.75" />
      <path d="M4 9h12M8 3v3M12 3v3" strokeWidth="1.75" />
    </>
  ),
  apartment: (
    <>
      <rect x="5" y="3" width="10" height="14" strokeWidth="1.75" />
      <path d="M8 7h1M11 7h1M8 10h1M11 10h1M8 13h1M11 13h1" strokeWidth="1.5" />
    </>
  ),
  unit: (
    <>
      <rect x="6" y="5" width="8" height="12" strokeWidth="1.75" />
      <path d="M9 9h2M9 12h2" strokeWidth="1.5" />
    </>
  ),
  townhouse: (
    <>
      <path d="M3 14h6V8h4v6h6V6l-8-4-8 4v8z" strokeWidth="1.75" />
    </>
  ),
  house: (
    <>
      <path d="M3 14h14V8l7-5 7 5v6H3z" strokeWidth="1.75" />
      <rect x="9" y="10" width="4" height="4" strokeWidth="1.75" />
    </>
  ),
  studio: (
    <>
      <rect x="4" y="5" width="12" height="10" strokeWidth="1.75" />
      <path d="M4 10h12" strokeWidth="1.75" strokeDasharray="2 2" />
    </>
  ),
};

export function CleaningIcon({ name, size = 24, className = '' }: CleaningIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function getPropertyTypeIcon(id: string): CleaningIconName {
  const map: Record<string, CleaningIconName> = {
    apartment: 'apartment',
    unit: 'unit',
    townhouse: 'townhouse',
    house: 'house',
    studio: 'studio',
  };
  return map[id] ?? 'house';
}
