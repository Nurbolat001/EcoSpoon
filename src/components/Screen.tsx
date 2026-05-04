import type { ReactNode } from 'react';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import {
  ScrollView,
  type ScrollViewProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { commonStyles, spacing } from '../styles/commonStyles';

type ScreenProps = {
  children: ReactNode;
  centered?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
};

export default function Screen({
  children,
  centered = false,
  contentStyle,
  keyboardShouldPersistTaps,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;
  const bottomPadding = tabBarHeight + insets.bottom + spacing.xl;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={[
          commonStyles.scrollContent,
          { paddingBottom: bottomPadding },
          centered ? commonStyles.centerContent : null,
          contentStyle,
        ]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});
