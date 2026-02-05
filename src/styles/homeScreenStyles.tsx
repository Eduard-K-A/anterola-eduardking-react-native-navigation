import { StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/colors';

export const homeScreenStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
  });
