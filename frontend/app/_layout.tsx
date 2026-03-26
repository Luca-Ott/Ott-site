import { Stack } from 'expo-router';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <SpeedInsights />
    </View>
  );
}
