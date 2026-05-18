import { Stack } from 'expo-router';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { View, Platform } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  // Explicitly load vector-icon fonts so glyphs render on every page.
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

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
        50% { transform: translateY(-14px); }
      }
      @keyframes ott-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes ott-spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      @keyframes ott-pulse-glow {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.08); }
      }
      @keyframes ott-pulse-aura {
        0%, 100% { opacity: 0.35; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.18); }
      }
      @keyframes ott-twinkle {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      @keyframes ott-puzzle-wobble {
        0%, 100% { transform: rotate(-1.5deg) translate(-0.5px, -0.5px) scale(1); }
        25%       { transform: rotate(1.5deg)  translate(0.5px,  -0.5px) scale(1.02); }
        50%       { transform: rotate(1deg)    translate(0.5px,   0.5px) scale(1.04); }
        75%       { transform: rotate(-1deg)   translate(-0.5px,  0.5px) scale(1.02); }
      }
      @keyframes ott-orbit-tilt {
        0%, 100% { transform: rotateX(60deg) rotateZ(0deg); }
        50% { transform: rotateX(62deg) rotateZ(2deg); }
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
