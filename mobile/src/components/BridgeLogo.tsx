import Svg, { Circle, Line } from 'react-native-svg';

export function BridgeLogo({ size = 56 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#234f77" />
      <Line x1="16" y1="42" x2="48" y2="42" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <Line x1="18" y1="42" x2="24" y2="20" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />
      <Line x1="46" y1="42" x2="40" y2="20" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />
      <Line x1="24" y1="20" x2="40" y2="20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <Line x1="28" y1="20" x2="28" y2="42" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="36" y1="20" x2="36" y2="42" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}
