import { StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

type Styles = ReturnType<typeof createProductModalStyles>;

export default function createProductModalStyles(theme: AppTheme, isWide: boolean) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      padding: 16,
    },
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      maxHeight: '90%',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    contentRow: {
      flexDirection: isWide ? 'row' : 'column',
    },
    imageWrapper: {
      flex: isWide ? 0.4 : 0,
      marginRight: isWide ? 12 : 0,
      height: isWide ? 240 : 300,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    rightColumn: {
      flex: 1,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.text,
    },
    category: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    closeButton: {
      padding: 8,
    },
    price: {
      fontSize: 20,
      fontWeight: '800',
      color: theme.colors.primary,
      marginTop: 12,
    },
    details: {
      marginTop: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailLabel: {
      color: theme.colors.textSecondary,
      marginRight: 4,
    },
    detailValue: {
      color: theme.colors.text,
      fontWeight: '600',
    },
    starText: {
      color: theme.colors.text,
      fontWeight: '600',
      marginLeft: 4,
    },
    reviewCount: {
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    stockText: {
      color: theme.colors.textSecondary,
    },
    descriptionScroll: {
      marginTop: 12,
      maxHeight: 160,
    },
    descriptionText: {
      color: theme.colors.text,
      lineHeight: 20,
    },
    actions: {
      flexDirection: isWide ? 'row' : 'column',
      marginTop: 16,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginRight: isWide ? 8 : 0,
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
    secondaryButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginTop: isWide ? 0 : 8,
    },
    secondaryButtonText: {
      color: theme.colors.text,
      fontWeight: '600',
    },
  });
}

export type ProductModalStyles = Styles;
