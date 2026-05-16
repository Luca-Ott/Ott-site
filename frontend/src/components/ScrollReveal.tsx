import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  duration?: number;
  style?: ViewStyle | ViewStyle[];
}>;

// Pure pass-through. Content is always visible.
export default function ScrollReveal({ children, style }: Props) {
  return <View style={style as any}>{children}</View>;
}
