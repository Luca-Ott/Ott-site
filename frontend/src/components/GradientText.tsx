import React, { PropsWithChildren } from 'react';
import { Text, Platform, TextStyle } from 'react-native';

type Props = PropsWithChildren<{
  style?: TextStyle | TextStyle[];
  colors?: string[];
}>;

/** Gradient text — uses background-clip on web, falls back to first color on native */
export default function GradientText({ children, style, colors = ['#60A5FA', '#A855F7', '#22D3EE'] }: Props) {
  if (Platform.OS === 'web') {
    return (
      <Text
        style={[
          style as any,
          {
            backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          } as any,
        ]}
      >
        {children}
      </Text>
    );
  }
  return <Text style={[style as any, { color: colors[0] }]}>{children}</Text>;
}
