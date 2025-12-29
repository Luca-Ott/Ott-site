import { Stack } from 'expo-router';
import { Analytics } from '@vercel/analytics/react';
import { Platform, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {Platform.OS === 'web' && <Analytics />}
    </View>
  );
}
