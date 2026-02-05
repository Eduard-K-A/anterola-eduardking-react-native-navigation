import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, ThemeMode, lightTheme, darkTheme, THEME_PERSIST_KEY } from '../constants/theme';

interface ThemeContextValue {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(lightTheme);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_PERSIST_KEY);
        if (savedMode === 'dark') {
          setTheme(darkTheme);
        } else if (savedMode === 'light') {
          setTheme(lightTheme);
        }
      } catch (error) {
        console.warn('Failed to load theme:', error);
      } finally {
        setHydrated(true);
      }
    };

    loadTheme();
  }, []);

  const persistMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_PERSIST_KEY, mode);
    } catch (error) {
      console.warn('Failed to persist theme:', error);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    const newTheme = mode === 'dark' ? darkTheme : lightTheme;
    setTheme(newTheme);
    persistMode(mode);
  };

  const toggleTheme = () => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  // Avoid theme flash - don't render until hydrated
  if (!hydrated) {
    return null;
  }

  const value: ThemeContextValue = {
    theme,
    isDark: theme.mode === 'dark',
    toggleTheme,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
