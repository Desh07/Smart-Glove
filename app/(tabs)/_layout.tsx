import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
          borderTopWidth: 1,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="language"
        options={{
          title: 'Language',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="globe" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="accessibility"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}
