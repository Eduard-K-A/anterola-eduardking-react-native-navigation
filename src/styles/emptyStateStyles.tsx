import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const emptyStateStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
      backgroundColor: colors.background,
    },
    icon: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    message: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
