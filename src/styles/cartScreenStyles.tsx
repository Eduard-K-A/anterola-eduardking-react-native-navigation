import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const cartScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingBottom: 200,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 24,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    totalPrice: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primary,
    },
  });
