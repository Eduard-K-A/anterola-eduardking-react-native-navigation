import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { emptyStateStyles } from '../styles/emptyStateStyles';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'shopping-outline',
  title,
  message,
}) => {
  const { theme } = useTheme();
  const styles = emptyStateStyles(theme.colors);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon as any}
        size={64}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
