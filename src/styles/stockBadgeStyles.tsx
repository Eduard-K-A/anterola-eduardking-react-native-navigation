import { StyleSheet } from 'react-native';
import { AppTheme } from '../constants/theme';

export default function createStockBadgeStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      marginRight: 8,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
  });
}
