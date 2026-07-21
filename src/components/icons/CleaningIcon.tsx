import type { ReactNode } from 'react';

export type CleaningIconName =
  | 'bedroom'
  | 'bathroom'
  | 'toilet'
  | 'bathroom-toilet'
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
  | 'booking-fee'
  | 'pricing'
  | 'coverage'
  | 'home'
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

/** Consistent stroke icons — viewBox 0 0 24 24 */
const paths: Record<CleaningIconName, ReactNode> = {
  bedroom: (
    <>
      <path d="M3 18V11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" strokeWidth="1.75" />
      <path d="M3 14h18" strokeWidth="1.75" />
      <path d="M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" strokeWidth="1.75" />
      <path d="M5 18v2M19 18v2" strokeWidth="1.75" />
    </>
  ),
  bathroom: (
    <>
      <path d="M5 12h14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5z" strokeWidth="1.75" />
      <path d="M8 12V8a4 4 0 0 1 8 0" strokeWidth="1.75" />
      <path d="M4 19h16" strokeWidth="1.75" />
      <path d="M12 4v2" strokeWidth="1.75" />
    </>
  ),
  toilet: (
    <>
      <path d="M9 4v3h6V4" strokeWidth="1.75" />
      <path d="M8 7h8a3 3 0 0 1 3 3v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-2a3 3 0 0 1 3-3z" strokeWidth="1.75" />
      <path d="M10 17v3h4v-3" strokeWidth="1.75" />
    </>
  ),
  'bathroom-toilet': (
    <>
      <path d="M3 13h8v4a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 3 17v-4z" strokeWidth="1.75" />
      <path d="M5 13V10a2.5 2.5 0 0 1 5 0" strokeWidth="1.75" />
      <path d="M14 5v2h4V5" strokeWidth="1.75" />
      <path d="M13.5 7h5a2 2 0 0 1 2 2v1.5a3.5 3.5 0 0 1-3.5 3.5h-2A3.5 3.5 0 0 1 11.5 10.5V9a2 2 0 0 1 2-2z" strokeWidth="1.75" />
    </>
  ),
  'living-room': (
    <>
      <path d="M4 14h16v4H4z" strokeWidth="1.75" />
      <path d="M6 14V11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" strokeWidth="1.75" />
      <path d="M4 18v2M20 18v2" strokeWidth="1.75" />
      <path d="M9 9V7h6v2" strokeWidth="1.75" />
    </>
  ),
  dining: (
    <>
      <ellipse cx="12" cy="10" rx="7" ry="3.5" strokeWidth="1.75" />
      <path d="M5 10v7M19 10v7M12 13.5V19" strokeWidth="1.75" />
      <path d="M8 19h8" strokeWidth="1.75" />
    </>
  ),
  kitchen: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="1.5" strokeWidth="1.75" />
      <path d="M4 11h16" strokeWidth="1.75" />
      <circle cx="8" cy="14.5" r="1.25" strokeWidth="1.5" />
      <circle cx="12" cy="14.5" r="1.25" strokeWidth="1.5" />
      <circle cx="16" cy="14.5" r="1.25" strokeWidth="1.5" />
      <path d="M8 6V4M16 6V4" strokeWidth="1.75" />
    </>
  ),
  balcony: (
    <>
      <path d="M4 20h16" strokeWidth="1.75" />
      <path d="M5 20V12l7-5 7 5v8" strokeWidth="1.75" />
      <path d="M5 16h14" strokeWidth="1.75" />
      <path d="M8 16v4M12 16v4M16 16v4" strokeWidth="1.75" />
    </>
  ),
  garage: (
    <>
      <path d="M3 20h18V11L12 5 3 11v9z" strokeWidth="1.75" />
      <path d="M6 20v-6h12v6" strokeWidth="1.75" />
      <path d="M6 16h12M6 18h12" strokeWidth="1.5" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" strokeWidth="1.75" />
      <path d="M4 12h16M12 3v18" strokeWidth="1.75" />
    </>
  ),
  'window-external': (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" strokeWidth="1.75" />
      <path d="M5 12h14M12 4v16" strokeWidth="1.75" />
      <path d="M2 8l3-2M2 16l3 2M22 8l-3-2M22 16l-3 2" strokeWidth="1.5" />
    </>
  ),
  door: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="1" strokeWidth="1.75" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  oven: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" strokeWidth="1.75" />
      <path d="M4 9h16" strokeWidth="1.75" />
      <rect x="7" y="11" width="10" height="6" rx="0.5" strokeWidth="1.75" />
      <circle cx="8" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="16" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  fridge: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="1.5" strokeWidth="1.75" />
      <path d="M6 10h12" strokeWidth="1.75" />
      <path d="M15 6v2M15 13v3" strokeWidth="1.75" />
    </>
  ),
  microwave: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="1.5" strokeWidth="1.75" />
      <rect x="5" y="9" width="10" height="6" rx="0.5" strokeWidth="1.75" />
      <circle cx="18" cy="10" r="1" strokeWidth="1.5" />
      <circle cx="18" cy="14" r="1" strokeWidth="1.5" />
    </>
  ),
  dishwasher: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" strokeWidth="1.75" />
      <path d="M5 8h14" strokeWidth="1.75" />
      <circle cx="12" cy="14" r="3.5" strokeWidth="1.75" />
      <path d="M12 12.5v3M10.5 14h3" strokeWidth="1.5" />
    </>
  ),
  cabinet: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" strokeWidth="1.75" />
      <path d="M12 4v16M3 12h18" strokeWidth="1.75" />
      <circle cx="8" cy="12" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  carpet: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1.5" strokeWidth="1.75" />
      <path d="M6 7V5h12v2M6 17v2h12v-2" strokeWidth="1.75" />
      <path d="M7 10h10M7 14h10" strokeWidth="1.25" strokeDasharray="2 2" />
    </>
  ),
  blinds: (
    <>
      <path d="M4 4h16" strokeWidth="1.75" />
      <path d="M5 4v16M19 4v16" strokeWidth="1.75" />
      <path d="M5 8h14M5 12h14M5 16h14" strokeWidth="1.5" />
    </>
  ),
  laundry: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" strokeWidth="1.75" />
      <path d="M4 8h16" strokeWidth="1.75" />
      <circle cx="12" cy="14" r="4" strokeWidth="1.75" />
      <circle cx="12" cy="14" r="1.5" strokeWidth="1.5" />
      <circle cx="8" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  stairs: (
    <>
      <path d="M3 20h5v-4h4v-4h4V8h5" strokeWidth="1.75" />
      <path d="M3 20V8" strokeWidth="1.5" />
    </>
  ),
  'wall-spot': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" strokeWidth="1.75" />
      <circle cx="10" cy="10" r="2.5" strokeWidth="1.75" />
      <circle cx="15" cy="15" r="1.5" strokeWidth="1.5" />
    </>
  ),
  rangehood: (
    <>
      <path d="M4 10h16l-2 6H6l-2-6z" strokeWidth="1.75" />
      <path d="M12 4v6" strokeWidth="1.75" />
      <path d="M8 4h8" strokeWidth="1.75" />
      <path d="M9 13h6" strokeWidth="1.5" />
    </>
  ),
  pantry: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="1" strokeWidth="1.75" />
      <path d="M5 7h14M5 12h14M5 17h14" strokeWidth="1.5" />
      <circle cx="15" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  wardrobe: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="1" strokeWidth="1.75" />
      <path d="M12 2v20" strokeWidth="1.75" />
      <circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  skirting: (
    <>
      <path d="M3 4h18v12H3z" strokeWidth="1.75" />
      <path d="M3 16h18v4H3z" strokeWidth="1.75" />
      <path d="M3 16h18" strokeWidth="2" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="2" strokeWidth="1.75" />
      <path d="M12 4c2 2 2 4 0 6M12 20c-2-2-2-4 0-6M4 12c2-2 4-2 6 0M20 12c-2 2-4 2-6 0" strokeWidth="1.75" />
    </>
  ),
  light: (
    <>
      <path d="M9 18h6" strokeWidth="1.75" />
      <path d="M10 21h4" strokeWidth="1.75" />
      <path d="M12 2a5 5 0 0 0-3 9c.5 1 .8 2 .8 3h4.4c0-1 .3-2 .8-3a5 5 0 0 0-3-9z" strokeWidth="1.75" />
    </>
  ),
  'pet-hair': (
    <>
      <circle cx="9" cy="10" r="3" strokeWidth="1.75" />
      <circle cx="16" cy="9" r="2.25" strokeWidth="1.75" />
      <path d="M4 18c1.5-3 4-4.5 8-4.5s6.5 1.5 8 4.5" strokeWidth="1.75" />
      <path d="M7 7l-1-2M11 7l1-2M14 6.5l.5-2" strokeWidth="1.5" />
    </>
  ),
  grease: (
    <>
      <path d="M8 20c0-5 2-9 4-9s4 4 4 9" strokeWidth="1.75" />
      <path d="M10 8V5M14 8V5M12 5V3" strokeWidth="1.75" />
      <path d="M7 14c1 .5 2 .5 3 0M14 14c1 .5 2 .5 3 0" strokeWidth="1.5" />
    </>
  ),
  mould: (
    <>
      <circle cx="9" cy="10" r="3" strokeWidth="1.75" />
      <circle cx="15" cy="13" r="2.5" strokeWidth="1.75" />
      <circle cx="14" cy="7" r="1.75" strokeWidth="1.5" />
      <path d="M4 19c2-2 5-3 8-3s6 1 8 3" strokeWidth="1.5" />
    </>
  ),
  cobweb: (
    <>
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <path d="M12 12V4M12 12l7 4M12 12l-7 4M12 12v8M12 12l7-4M12 12l-7-4" strokeWidth="1.5" />
      <path d="M8 6.5l8 4.5M8 17.5l8-4.5M5.5 12h13" strokeWidth="1.25" />
    </>
  ),
  upholstery: (
    <>
      <path d="M4 15h16v4H4z" strokeWidth="1.75" />
      <path d="M6 15V11c0-2 2-3.5 6-3.5s6 1.5 6 3.5v4" strokeWidth="1.75" />
      <path d="M4 19v2M20 19v2" strokeWidth="1.75" />
    </>
  ),
  patio: (
    <>
      <path d="M3 20h18" strokeWidth="1.75" />
      <path d="M5 20V12h14v8" strokeWidth="1.75" />
      <path d="M8 12V8h8v4" strokeWidth="1.75" />
      <path d="M12 8V5" strokeWidth="1.75" />
      <path d="M8 16h8" strokeWidth="1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.75" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeWidth="1.75" />
      <path d="M8 14h2M12 14h2M16 14h.01M8 17h2M12 17h2" strokeWidth="1.5" />
    </>
  ),
  'booking-fee': (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" strokeWidth="1.75" />
      <path d="M9 8h6M9 12h4" strokeWidth="1.5" />
      <circle cx="15.5" cy="16.5" r="4.5" strokeWidth="1.75" />
      <path d="M13.5 16.5h4" strokeWidth="1.5" />
      <path d="M13 14l5 5" strokeWidth="1.75" />
    </>
  ),
  pricing: (
    <>
      <path d="M12 2v20M17 6.5c0-2-2-3.5-5-3.5S7 4.5 7 6.5 9 9 12 9s5 1 5 3-2 3.5-5 3.5-5-1.5-5-3.5" strokeWidth="1.75" />
    </>
  ),
  coverage: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" strokeWidth="1.75" />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.75" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" strokeWidth="1.75" />
      <path d="M5 9.5V20h14V9.5" strokeWidth="1.75" />
      <path d="M10 20v-6h4v6" strokeWidth="1.75" />
    </>
  ),
  apartment: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="1" strokeWidth="1.75" />
      <path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2" strokeWidth="1.5" />
      <path d="M10 22v-3h4v3" strokeWidth="1.75" />
    </>
  ),
  unit: (
    <>
      <path d="M4 20h16V10L12 5 4 10v10z" strokeWidth="1.75" />
      <rect x="10" y="14" width="4" height="6" strokeWidth="1.75" />
      <path d="M8 12h2M14 12h2" strokeWidth="1.5" />
    </>
  ),
  townhouse: (
    <>
      <path d="M2 20h9V9l4.5-4L20 9v11h2" strokeWidth="1.75" />
      <path d="M11 20V9" strokeWidth="1.75" />
      <path d="M6 14h2M15 14h2M6 17h2M15 17h2" strokeWidth="1.5" />
    </>
  ),
  house: (
    <>
      <path d="M3 11.5 12 4l9 7.5" strokeWidth="1.75" />
      <path d="M5 10v10h14V10" strokeWidth="1.75" />
      <path d="M10 20v-5h4v5" strokeWidth="1.75" />
    </>
  ),
  studio: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" strokeWidth="1.75" />
      <path d="M3 12h18" strokeWidth="1.75" strokeDasharray="3 2" />
      <path d="M8 8h3M8 16h4" strokeWidth="1.5" />
    </>
  ),
};

export function CleaningIcon({ name, size = 24, className = '' }: CleaningIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
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
