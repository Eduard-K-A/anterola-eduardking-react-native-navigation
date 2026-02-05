import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const primaryButtonStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 32,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 48,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    disabled: {
      backgroundColor: colors.muted,
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    disabledText: {
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
