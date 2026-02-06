import { StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

type Styles = ReturnType<typeof createProductModalStyles>;

export default function createProductModalStyles(theme: AppTheme, isWide: boolean) {
  return StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      zIndex: 1,
    },
    backdropPressArea: {
      ...StyleSheet.absoluteFillObject,
    },
    sheetContainer: {
      position: 'absolute',
      left: '5%',
      right: '5%',
      bottom: '3%',
      backgroundColor: theme.colors.card,
      borderRadius: 18,
      maxHeight: '85%',
      overflow: 'hidden',
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      zIndex: 10,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 6,
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.text,
    },
    brand: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    closeButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    contentScroll: {
      paddingHorizontal: 16,
    },
    contentContainer: {
      paddingBottom: 12,
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: 12,
    },
    heroImage: {
      width: '100%',
      aspectRatio: 4 / 3,
      borderRadius: 12,
      backgroundColor: '#f0f0f0',
      overflow: 'hidden',
    },
    infoSection: {
      marginTop: 12,
    },
    chipsRow: {
      flexDirection: 'row',
      marginTop: 12,
    },
    chip: {
      backgroundColor: theme.colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      color: theme.colors.text,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
    descriptionBlock: {
      marginTop: 12,
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text,
    },
    actionsRow: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    primaryButton: {
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: '800',
      fontSize: 16,
    },
  });
}

export type ProductModalStyles = Styles;
