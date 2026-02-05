import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { primaryButtonStyles } from '../styles/primaryButtonStyles';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const { theme } = useTheme();
  const styles = primaryButtonStyles(theme.colors);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isDisabled ? styles.disabled : styles.primary,
        pressed && !isDisabled && { opacity: 0.8 },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[styles.text, isDisabled && styles.disabledText]}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          label
        )}
      </Text>
    </Pressable>
  );
};
