import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const productCardStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      margin: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 220,
      backgroundColor: colors.muted,
    },
    content: {
      padding: 14,
    },
    nameText: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
      lineHeight: 20,
    },
    descriptionText: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 18,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceText: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.primary,
    },
    addButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 48,
      minHeight: 44,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    stockText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 4,
      fontWeight: '600',
    },
  });
