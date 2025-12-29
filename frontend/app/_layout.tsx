import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

// Dynamic import of SpeedInsights - only loaded on web
const SpeedInsights = Platform.OS === 'web' 
  ? React.lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })))
  : null;

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {Platform.OS === 'web' && SpeedInsights && (
        <React.Suspense fallback={null}>
          <SpeedInsights />
        </React.Suspense>
      )}
    </>
  );
}
