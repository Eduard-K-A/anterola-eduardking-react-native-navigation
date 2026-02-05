import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppErrorBoundary } from './src/components/AppErrorBoundary';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { CartProvider } from './src/contexts/CartContext';
import { RootNavigator } from './src/navigation/RootNavigator';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        style={theme.mode === 'dark' ? 'light' : 'dark'}
      />
      <RootNavigator />
    </>
  );
};

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
