import React from 'react';
import { Stack } from 'expo-router';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="investor-inquiry" options={{ headerShown: false }} />
        <Stack.Screen name="research-development" options={{ headerShown: false }} />
        <Stack.Screen name="software-design" options={{ headerShown: false }} />
        <Stack.Screen name="software-development" options={{ headerShown: false }} />
        <Stack.Screen name="special-projects" options={{ headerShown: false }} />
      </Stack>
      <Analytics />
    </>
  );
}
