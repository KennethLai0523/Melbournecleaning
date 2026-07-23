import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

export function CleaningItemIcon({ name, active = false }: { name: string; active?: boolean }) {
  const stroke = active ? '#fff' : colors.primary;
  const common = { stroke, strokeWidth: 1.7 };

  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
      {name.includes('window') ? (
        <>
          <Rect x={4} y={3} width={16} height={18} rx={1} {...common} />
          <Path d="M4 12h16M12 3v18" {...common} />
        </>
      ) : name === 'bedroom' ? (
        <>
          <Path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18" {...common} />
          <Path d="M7 9V7h10v2M5 18v2M19 18v2" {...common} />
        </>
      ) : name === 'oven' || name === 'microwave' || name === 'dishwasher' ? (
        <>
          <Rect x={4} y={4} width={16} height={16} rx={2} {...common} />
          <Path d="M4 9h16M8 6.5h.01M12 6.5h.01M8 12h8v5H8z" {...common} />
        </>
      ) : name === 'fridge' ? (
        <>
          <Rect x={6} y={2} width={12} height={20} rx={2} {...common} />
          <Path d="M6 10h12M15 6v2M15 13v3" {...common} />
        </>
      ) : (
        <>
          <Circle cx={12} cy={12} r={8} {...common} />
          <Path d="m8.5 12 2.2 2.2 4.8-5" {...common} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </Svg>
  );
}
