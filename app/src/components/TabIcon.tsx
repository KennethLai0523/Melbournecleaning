import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

interface TabIconProps {
  name: 'home' | 'services' | 'quote' | 'areas' | 'account';
  color?: unknown;
  size?: number;
}

export function TabIcon({ name, color = colors.text, size = 22 }: TabIconProps) {
  const stroke = typeof color === 'string' ? color : colors.text;

  if (name === 'home') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1v-9.5Z" stroke={stroke} strokeWidth={1.8} strokeLinejoin="round" />
      </Svg>
    );
  }

  if (name === 'services') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="4" y="5" width="16" height="4" rx="1.2" stroke={stroke} strokeWidth={1.8} />
        <Rect x="4" y="10" width="16" height="4" rx="1.2" stroke={stroke} strokeWidth={1.8} />
        <Rect x="4" y="15" width="16" height="4" rx="1.2" stroke={stroke} strokeWidth={1.8} />
      </Svg>
    );
  }

  if (name === 'quote') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="5" y="3.5" width="14" height="17" rx="2" stroke={stroke} strokeWidth={1.8} />
        <Path d="M8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }

  if (name === 'areas') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" stroke={stroke} strokeWidth={1.8} strokeLinejoin="round" />
        <Circle cx="12" cy="10" r="2.5" stroke={stroke} strokeWidth={1.8} />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.5" stroke={stroke} strokeWidth={1.8} />
      <Path d="M5 20c.9-3.1 3.4-4.8 7-4.8s6.1 1.7 7 4.8" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
