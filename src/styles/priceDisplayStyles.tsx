import { StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

export default function createPriceDisplayStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    price: {
      fontSize: 28,
      fontWeight: '800',
      marginRight: 8,
      color: theme.colors.accent,
    },
    original: {
      fontSize: 14,
      textDecorationLine: 'line-through',
      marginRight: 8,
      color: theme.colors.textSecondary,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.badge,
    },
    badgeText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 12,
    },
  });
}
