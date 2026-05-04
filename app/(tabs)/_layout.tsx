import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/src/components/navigation/HapticTab';
import { colors } from '@/src/styles/commonStyles';

type IconName = keyof typeof Ionicons.glyphMap;

const tabBarIcon = (outline: IconName, filled: IconName) => {
  function TabBarIcon({ color, focused }: { color: string; focused: boolean }) {
    return (
      <Ionicons color={color} name={focused ? filled : outline} size={24} />
    );
  }

  return TabBarIcon;
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = 64 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.mintStrong,
        tabBarInactiveTintColor: colors.softText,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: Math.max(insets.bottom, 8),
          height: tabBarHeight,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 8,
          borderTopWidth: 0,
          borderRadius: 18,
          borderColor: colors.border,
          borderWidth: 1,
          backgroundColor: colors.surface,
          elevation: 12,
          zIndex: 20,
          shadowColor: '#15231B',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 22,
          ...(Platform.OS === 'web'
            ? { boxShadow: '0px 12px 28px rgba(21, 35, 27, 0.12)' }
            : null),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Басты',
          tabBarIcon: tabBarIcon('home-outline', 'home'),
        }}
      />
      <Tabs.Screen
        name="plastic"
        options={{
          title: 'Пластик',
          tabBarIcon: tabBarIcon('warning-outline', 'warning'),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Есеп',
          tabBarIcon: tabBarIcon('stats-chart-outline', 'stats-chart'),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Сынақ',
          tabBarIcon: tabBarIcon('school-outline', 'school'),
        }}
      />
    </Tabs>
  );
}
