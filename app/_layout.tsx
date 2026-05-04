import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import ErrorBoundary from '../src/components/ErrorBoundary';
import { colors } from '../src/styles/commonStyles';

export const unstable_settings = {
  anchor: '(tabs)',
};

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    primary: colors.mintStrong,
    text: colors.text,
    border: colors.border,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ThemeProvider value={appTheme}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: colors.background },
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
              headerTitleStyle: { fontWeight: '900' },
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="spoon" options={{ headerShown: false }} />
            <Stack.Screen
              name="recipe"
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
          </Stack>
          <StatusBar backgroundColor={colors.background} style="dark" />
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
