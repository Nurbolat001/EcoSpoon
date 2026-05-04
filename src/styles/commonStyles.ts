import { Platform, StyleSheet } from 'react-native';

export const colors = {
  background: '#F7FAF8',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF7F1',
  mint: '#DFF7E8',
  mintStrong: '#1F9D5A',
  mintDark: '#137044',
  teal: '#167C80',
  sky: '#E6F2FF',
  skyStrong: '#2563EB',
  amber: '#FFF2D8',
  amberStrong: '#D97706',
  coral: '#FFE7E2',
  coralStrong: '#E85D4F',
  text: '#18221D',
  muted: '#5F6F67',
  softText: '#7A8A82',
  white: '#FFFFFF',
  border: '#DDE7E1',
  danger: '#D64545',
  disabled: '#D8E0DC',
  overlay: 'rgba(24, 34, 29, 0.16)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  card: 14,
  control: 16,
  sheet: 20,
  pill: 999,
};

export const shadow = Platform.select({
  web: {
    boxShadow: '0px 8px 18px rgba(21, 35, 27, 0.08)',
  },
  default: {
    shadowColor: '#15231B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
});

export const commonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '900',
    lineHeight: 37,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 25,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 27,
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
});
