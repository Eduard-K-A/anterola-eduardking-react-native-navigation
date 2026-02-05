import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { themedTypographyStyles } from '../styles/themedTypographyStyles';

interface ThemedTextProps {
  variant?: 'titleLarge' | 'title' | 'subtitle' | 'body' | 'caption';
  children: React.ReactNode;
  style?: Text['props']['style'];
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  children,
  style,
}) => {
  const { theme } = useTheme();
  const styles = themedTypographyStyles(theme.colors);

  return (
    <Text style={[styles[variant], style]}>
      {children}
    </Text>
  );
};
