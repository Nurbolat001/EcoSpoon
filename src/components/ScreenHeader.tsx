import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, commonStyles, radius, spacing } from '../styles/commonStyles';

type IconName = keyof typeof Ionicons.glyphMap;

type ScreenHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: IconName;
};

export default function ScreenHeader({ eyebrow, title, subtitle, icon }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {icon ? (
        <View style={styles.iconWrap}>
          <Ionicons color={colors.teal} name={icon} size={25} />
        </View>
      ) : null}
      <Text style={commonStyles.eyebrow}>{eyebrow}</Text>
      <Text style={commonStyles.title}>{title}</Text>
      {subtitle ? <Text style={commonStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sky,
  },
});
