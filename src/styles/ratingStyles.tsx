import { StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

export default function createRatingStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starsRow: {
      flexDirection: 'row',
      marginRight: 8,
    },
    ratingText: {
      fontWeight: '600',
      marginRight: 6,
      color: theme.colors.text,
    },
    reviewCount: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });
}
