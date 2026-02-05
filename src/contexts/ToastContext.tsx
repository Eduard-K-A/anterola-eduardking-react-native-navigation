import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { useTheme } from './ThemeContext';
import { AppTheme } from '../constants/theme';

type ToastRecord = { id: string; message: string; duration: number };

interface ToastContextValue {
  show: (message: string, duration?: number) => string;
  hide: (id?: string) => void;
  showAlert: (title: string, message: string, isDanger?: boolean, onConfirm?: () => void) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Only one toast at a time — showing a new one replaces the existing
  const [toast, setToast] = useState<ToastRecord | null>(null);
  const timersRef = useRef<Record<string, NodeJS.Timeout | null>>({});
  const { theme } = useTheme();

  // Alert modal state rendered here so it's theme-aware
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    title?: string;
    message?: string;
    isDanger?: boolean;
    onConfirm?: (() => void) | undefined;
  }>({ visible: false });

  const show = useCallback((message: string, duration: number = 4500) => {
    // Clear any existing toast timer
    if (toast?.id && timersRef.current[toast.id]) {
      clearTimeout(timersRef.current[toast.id] as NodeJS.Timeout);
      timersRef.current[toast.id] = null;
    }

    const id = `${Date.now()}-${Math.random()}`;
    const record: ToastRecord = { id, message, duration };
    setToast(record);

    // Auto-hide — replace previous timer
    const t = setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current));
      timersRef.current[id] = null;
    }, duration);

    timersRef.current[id] = t;
    return id;
  }, [toast]);

  const hide = useCallback((id?: string) => {
    // If an id provided, only hide that one; otherwise hide current
    const targetId = id ?? toast?.id;
    if (!targetId) return;
    if (timersRef.current[targetId]) {
      clearTimeout(timersRef.current[targetId] as NodeJS.Timeout);
      timersRef.current[targetId] = null;
    }
    setToast((current) => (current && current.id === targetId ? null : current));
  }, [toast]);

  const showAlert = useCallback((title: string, message: string, isDanger = false, onConfirm?: () => void) => {
    setAlertState({ visible: true, title, message, isDanger, onConfirm });
  }, []);

  const dismissAlert = useCallback(() => {
    setAlertState({ visible: false });
  }, []);

  const value: ToastContextValue = {
    show,
    hide,
    showAlert,
  };

  // Import ToastItem and CustomAlert dynamically to avoid circular deps
  const ToastItem = require('../components/Toast').ToastItem;
  const CustomAlert = require('../components/CustomAlert').CustomAlert;

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Render only the current toast (override behavior) */}
      {toast ? (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          theme={theme}
          index={0}
          onClose={() => hide(toast.id)}
        />
      ) : null}

      {/* Themed alert modal for critical messages (stock, checkout success etc.) */}
      <CustomAlert
        visible={alertState.visible}
        title={alertState.title || ''}
        message={alertState.message || ''}
        theme={theme}
        onDismiss={dismissAlert}
        onConfirm={() => {
          alertState.onConfirm?.();
          dismissAlert();
        }}
        confirmText="OK"
        isDanger={!!alertState.isDanger}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
