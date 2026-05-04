import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, commonStyles, radius, spacing } from '../styles/commonStyles';

type IconName = keyof typeof Ionicons.glyphMap;

type EmptyStateProps = {
  icon?: IconName;
  title: string;
  text: string;
};

export default function EmptyState({ icon = 'leaf-outline', title, text }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons color={colors.teal} name={icon} size={28} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={[commonStyles.body, styles.text]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: radius.sheet,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
