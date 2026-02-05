import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '../constants/theme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  theme: AppTheme;
  onDismiss: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  isDanger?: boolean;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  theme,
  onDismiss,
  onConfirm,
  confirmText = 'OK',
  isDanger = false,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            padding: 24,
            width: '100%',
            maxWidth: 300,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Icon */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons
              name={isDanger ? 'alert-circle' : 'information'}
              size={48}
              color={isDanger ? theme.colors.danger : theme.colors.primary}
            />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: theme.colors.text,
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.textSecondary,
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 20,
            }}
          >
            {message}
          </Text>

          {/* Buttons */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: isDanger ? theme.colors.danger : theme.colors.primary,
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={handleConfirm}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
