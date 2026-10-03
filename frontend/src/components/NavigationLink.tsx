import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Link, type Href } from 'expo-router';

type Props = TouchableOpacityProps & { href: Href; replace?: boolean };

// Preserve the existing button/card layout while exposing an actual <a href> on web.
export default function NavigationLink({ href, replace, children, ...props }: Props) {
  return (
    <Link href={href} replace={replace} asChild>
      <TouchableOpacity {...props}>{children}</TouchableOpacity>
    </Link>
  );
}
