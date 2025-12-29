import { Stack } from 'expo-router';
import { Analytics } from '@vercel/analytics/react';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {Platform.OS === 'web' && <Analytics />}
    </>
  );
}
