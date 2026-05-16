import React, { useEffect, useRef, useState } from 'react';
import { Text, TextStyle, Platform } from 'react-native';

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  startDelay?: number;
  style?: TextStyle | TextStyle[];
};

export default function AnimatedCounter({ to, duration = 1800, suffix = '', prefix = '', startDelay = 400, style }: Props) {
  // Start at the target value so SSR / non-animating environments still show real numbers.
  const [value, setValue] = useState(to);
  const startedRef = useRef(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (startedRef.current) return;
    startedRef.current = true;

    // Reset to 0 and animate up so the counter visually "ticks"
    setValue(0);
    const t = setTimeout(() => {
      const startTime = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => clearTimeout(t);
  }, [to, duration, startDelay]);

  return (
    <Text style={style as any}>{prefix}{value}{suffix}</Text>
  );
}
