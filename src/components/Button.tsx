import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radius, shadow, spacing } from '../styles/commonStyles';

type IconName = keyof typeof Ionicons.glyphMap;

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: IconName;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const textColorByVariant: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.teal,
  ghost: colors.text,
  danger: colors.danger,
};

export default function Button({
  title,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const contentColor = isDisabled ? colors.softText : textColorByVariant[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}>
      {loading ? <ActivityIndicator color={contentColor} size="small" /> : null}
      {!loading && icon ? <Ionicons color={contentColor} name={icon} size={22} /> : null}
      <Text style={[styles.text, { color: contentColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingVertical: 15,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.mintStrong,
    ...shadow,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.mint,
  },
  ghost: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  danger: {
    borderWidth: 1,
    borderColor: '#F6B3B3',
    backgroundColor: '#FFF1F1',
  },
  disabled: {
    borderColor: colors.disabled,
    backgroundColor: '#EDF2EF',
    elevation: 0,
    boxShadow: 'none',
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
