import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const themedTypographyStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    titleLarge: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.text,
      lineHeight: 40,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.textSecondary,
      lineHeight: 16,
    },
  });
