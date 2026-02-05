import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const themedLayoutStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
    },
  });
