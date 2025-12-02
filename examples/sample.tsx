import React from 'react';
import Svg, { Circle, Rect, Path, G, Defs, LinearGradient, Stop, Text } from 'react-native-svg';

// Example 1: Simple Circle
export const SimpleCircle = () => (
  <Svg width={100} height={100} viewBox="0 0 100 100">
    <Circle cx={50} cy={50} r={40} fill="blue" stroke="black" strokeWidth={2} />
  </Svg>
);

// Example 2: Rectangle with rounded corners
export const RoundedRect = () => (
  <Svg width={200} height={100}>
    <Rect
      x={10}
      y={10}
      width={180}
      height={80}
      rx={15}
      ry={15}
      fill="#4CAF50"
      stroke="#2E7D32"
      strokeWidth={3}
    />
  </Svg>
);

// Example 3: Path with gradient
export const GradientPath = () => (
  <Svg width={200} height={200} viewBox="0 0 200 200">
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B6B" />
        <Stop offset="100%" stopColor="#4ECDC4" />
      </LinearGradient>
    </Defs>
    <Path
      d="M100 10 L190 80 L160 190 L40 190 L10 80 Z"
      fill="url(#grad)"
      stroke="#333"
      strokeWidth={2}
    />
  </Svg>
);

// Example 4: Heart icon
export const HeartIcon = () => (
  <Svg width={100} height={100} viewBox="0 0 24 24">
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#E91E63"
    />
  </Svg>
);

// Example 5: Complex icon with groups
export const SettingsIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 24 24">
    <G fill="none" stroke="#607D8B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={12} r={3} />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </G>
  </Svg>
);

// Example 6: Text element
export const SvgWithText = () => (
  <Svg width={200} height={100} viewBox="0 0 200 100">
    <Rect width={200} height={100} fill="#f0f0f0" />
    <Text
      x={100}
      y={55}
      fontSize={24}
      fontWeight="bold"
      fill="#333"
      textAnchor="middle"
    >
      Hello SVG!
    </Text>
  </Svg>
);
