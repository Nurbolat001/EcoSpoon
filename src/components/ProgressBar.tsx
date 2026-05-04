import { StyleSheet, View } from 'react-native';

import { colors, radius } from '../styles/commonStyles';

type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(value, 100));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${safeValue}%` as `${number}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    overflow: 'hidden',
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.mintStrong,
  },
});
