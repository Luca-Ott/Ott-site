import { Stack } from 'expo-router';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { View, Platform } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  // Inject global CSS (keyframes + body background) on web. Works in dev and prod.
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (typeof document === 'undefined') return;
    const id = 'ott-global-styles';
    if (document.getElementById(id)) return;
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.innerHTML = `
      html, body { background-color: #05060F; }
      body { overflow: visible !important; overflow-y: auto !important; }
      #root { overflow: visible !important; }
      ::selection { background: rgba(59, 130, 246, 0.4); color: #fff; }
      @keyframes ott-reveal {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes ott-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes ott-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#05060F' }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#05060F' } }} />
      <SpeedInsights />
    </View>
  );
}
