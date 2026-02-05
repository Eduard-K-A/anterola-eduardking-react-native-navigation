import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { themedLayoutStyles } from '../styles/themedLayoutStyles';

interface ThemedViewProps {
  variant?: 'container' | 'safeArea' | 'centered' | 'row' | 'spaceBetween' | 'card';
  children: React.ReactNode;
  style?: View['props']['style'];
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'container',
  children,
  style,
}) => {
  const { theme } = useTheme();
  const styles = themedLayoutStyles(theme.colors);

  return (
    <View style={[styles[variant], style]}>
      {children}
    </View>
  );
};
