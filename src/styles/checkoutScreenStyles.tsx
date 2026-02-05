import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const checkoutScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      paddingBottom: 120,
    },
    summarySection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    itemQuantity: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    itemTotal: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary,
      marginLeft: 12,
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
