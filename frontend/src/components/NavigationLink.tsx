import React from 'react';
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Link, type Href } from 'expo-router';

type Props = TouchableOpacityProps & { href: Href; replace?: boolean };

// Preserve the existing button/card layout while exposing an actual <a href> on web.
export default function NavigationLink({ href, replace, children, style, ...props }: Props) {
  return (
    <Link href={href} replace={replace} asChild>
      {/* Link's slot merges style objects, so flatten the child's native style arrays first. */}
      <TouchableOpacity {...props} style={StyleSheet.flatten(style)}>{children}</TouchableOpacity>
    </Link>
  );
}
