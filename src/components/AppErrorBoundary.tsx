import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AppErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} />
      );
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  // We can't use useTheme in error boundary, so we'll use a basic fallback
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        Something went wrong
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#666',
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        {error?.message || 'An unexpected error occurred.'}
      </Text>
    </View>
  );
};
