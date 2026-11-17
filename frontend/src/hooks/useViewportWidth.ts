import { useSyncExternalStore } from 'react';

const serverWidth = () => 0;
const browserWidth = () => typeof window === 'undefined' ? 0 : window.innerWidth;
const subscribe = (update: () => void) => {
  window.addEventListener('resize', update);
  return () => window.removeEventListener('resize', update);
};

// A mobile-first server snapshot; the browser synchronizes before displaying its layout.
export default function useViewportWidth() {
  return useSyncExternalStore(subscribe, browserWidth, serverWidth);
}
