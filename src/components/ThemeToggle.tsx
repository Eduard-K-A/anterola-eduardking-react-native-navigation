import React from 'react';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
        padding: 8,
      })}
    >
      <MaterialCommunityIcons
        name={theme.mode === 'light' ? ('moon-waning-crescent' as any) : ('white-balance-sunny' as any)}
        size={24}
        color={theme.colors.text}
      />
    </Pressable>
  );
};
