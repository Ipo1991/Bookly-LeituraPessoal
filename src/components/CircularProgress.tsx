import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  bgColor?: string;
  children?: ReactNode;
};

export default function CircularProgress({
  size = 56,
  strokeWidth = 6,
  progress = 0,
  color = "#1976d2",
  bgColor = "#e3e7ef",
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={bgColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
        {children}
      </View>
    </View>
  );
}