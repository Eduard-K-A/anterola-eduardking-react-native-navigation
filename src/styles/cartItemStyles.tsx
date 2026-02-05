import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const cartItemStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: colors.muted,
    },
    details: {
      flex: 1,
    },
    nameText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    priceText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    quantityButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
    },
    quantityText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 8,
      minWidth: 20,
      textAlign: 'center',
    },
    subtotal: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary,
      marginLeft: 12,
    },
  });
