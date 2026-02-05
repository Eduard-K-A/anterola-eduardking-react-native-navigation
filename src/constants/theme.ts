import { lightColors, darkColors, ThemeColors } from './colors';

export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: lightColors,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkColors,
};

export const THEME_PERSIST_KEY = '@shopping_cart_theme';
