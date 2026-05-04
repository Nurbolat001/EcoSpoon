import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, shadow, spacing } from '../styles/commonStyles';

type CardVariant = 'default' | 'mint' | 'amber' | 'sky' | 'coral' | 'outline';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: CardVariant;
};

export default function Card({ children, style, variant = 'default' }: CardProps) {
  return <View style={[styles.card, styles[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow,
  },
  default: {
    backgroundColor: colors.surface,
  },
  mint: {
    borderColor: '#BFEBD0',
    backgroundColor: colors.mint,
  },
  amber: {
    borderColor: '#F5D99D',
    backgroundColor: colors.amber,
  },
  sky: {
    borderColor: '#C6DFFF',
    backgroundColor: colors.sky,
  },
  coral: {
    borderColor: '#F8C4BB',
    backgroundColor: colors.coral,
  },
  outline: {
    elevation: 0,
    boxShadow: 'none',
    backgroundColor: colors.surface,
  },
});
