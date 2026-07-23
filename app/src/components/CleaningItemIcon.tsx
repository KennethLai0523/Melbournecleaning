import type { ReactNode } from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

export function CleaningItemIcon({ name, active = false }: { name: string; active?: boolean }) {
  const stroke = active ? '#fff' : colors.primary;
  const line = { stroke, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let artwork: ReactNode;

  if (name.includes('window')) {
    artwork = <><Rect x={4} y={3} width={16} height={18} rx={1} {...line} /><Path d="M4 12h16M12 3v18" {...line} /></>;
  } else if (name === 'bedroom') {
    artwork = <><Path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18" {...line} /><Path d="M7 9V7h10v2M5 18v2M19 18v2" {...line} /></>;
  } else if (name === 'bathroom' || name === 'bathroom-toilet') {
    artwork = <><Path d="M5 12h14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Z" {...line} /><Path d="M8 12V8a4 4 0 0 1 8 0M4 19h16" {...line} /></>;
  } else if (name === 'toilet') {
    artwork = <><Path d="M9 4v3h6V4M8 7h8a3 3 0 0 1 3 3v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-2a3 3 0 0 1 3-3Z" {...line} /><Path d="M10 17v3h4v-3" {...line} /></>;
  } else if (['living-room', 'upholstery'].includes(name)) {
    artwork = <><Path d="M4 14h16v4H4zM6 14v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M4 18v2M20 18v2" {...line} /></>;
  } else if (name === 'dining') {
    artwork = <><Ellipse cx={12} cy={10} rx={7} ry={3.5} {...line} /><Path d="M5 10v7M19 10v7M12 13.5V19M8 19h8" {...line} /></>;
  } else if (name === 'kitchen' || name === 'rangehood') {
    artwork = <><Rect x={4} y={6} width={16} height={12} rx={1.5} {...line} /><Path d="M4 11h16M8 6V4M16 6V4M8 15h8" {...line} /></>;
  } else if (name === 'balcony' || name === 'patio') {
    artwork = <><Path d="M4 20h16M5 20v-8l7-5 7 5v8M5 16h14M8 16v4M12 16v4M16 16v4" {...line} /></>;
  } else if (name === 'garage') {
    artwork = <><Path d="M3 20h18v-9L12 5l-9 6v9ZM6 20v-6h12v6M6 17h12" {...line} /></>;
  } else if (name === 'door' || name === 'wardrobe' || name === 'pantry' || name === 'cabinet') {
    artwork = <><Rect x={5} y={2} width={14} height={20} rx={1} {...line} /><Path d="M12 2v20" {...line} /><Circle cx={9} cy={12} r={0.8} fill={stroke} /></>;
  } else if (name === 'oven' || name === 'microwave') {
    artwork = <><Rect x={4} y={4} width={16} height={16} rx={2} {...line} /><Path d="M4 9h16M8 6.5h.01M12 6.5h.01M8 12h8v5H8z" {...line} /></>;
  } else if (name === 'dishwasher' || name === 'laundry') {
    artwork = <><Rect x={5} y={3} width={14} height={18} rx={2} {...line} /><Path d="M5 8h14" {...line} /><Circle cx={12} cy={14} r={4} {...line} /></>;
  } else if (name === 'fridge') {
    artwork = <><Rect x={6} y={2} width={12} height={20} rx={2} {...line} /><Path d="M6 10h12M15 6v2M15 13v3" {...line} /></>;
  } else if (name === 'carpet' || name === 'blinds') {
    artwork = <><Rect x={3} y={6} width={18} height={12} rx={1.5} {...line} /><Path d="M6 10h12M6 14h12M6 6V4h12v2" {...line} /></>;
  } else if (name === 'fan') {
    artwork = <><Circle cx={12} cy={12} r={2} {...line} /><Path d="M12 4c2 2 2 4 0 6M12 20c-2-2-2-4 0-6M4 12c2-2 4-2 6 0M20 12c-2 2-4 2-6 0" {...line} /></>;
  } else if (name === 'light') {
    artwork = <><Path d="M9 18h6M10 21h4M12 2a5 5 0 0 0-3 9c.5 1 .8 2 .8 3h4.4c0-1 .3-2 .8-3a5 5 0 0 0-3-9Z" {...line} /></>;
  } else if (name === 'stairs') {
    artwork = <Path d="M3 20h5v-4h4v-4h4V8h5" {...line} />;
  } else if (name === 'cobweb') {
    artwork = <><Circle cx={12} cy={12} r={1.2} fill={stroke} /><Path d="M12 12V4M12 12l7 4M12 12l-7 4M12 12v8M12 12l7-4M12 12l-7-4M5.5 12h13" {...line} /></>;
  } else {
    artwork = <><Circle cx={12} cy={12} r={8} {...line} /><Path d="m8.5 12 2.2 2.2 4.8-5" {...line} /></>;
  }

  return <Svg width={27} height={27} viewBox="0 0 24 24" fill="none">{artwork}</Svg>;
}
