import React, { useEffect } from 'react';
import { Animated, View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '../constants/theme';

interface ToastItemProps {
  id: string | number;
  message: string;
  theme: AppTheme;
  onClose: (id: string | number) => void;
  index: number;
}

// Single toast item, animated sliding in from the right
export const ToastItem: React.FC<ToastItemProps> = ({ id, message, theme, onClose, index }) => {
  const opacityRef = React.useRef(new Animated.Value(0));
  const translateXRef = React.useRef(new Animated.Value(80));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityRef.current, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(translateXRef.current, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacityRef.current, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateXRef.current, { toValue: 80, duration: 200, useNativeDriver: true }),
    ]).start(() => onClose(id));
  };

  const topOffset = 90 + index * 70; // 80-100px clearance

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: topOffset,
        right: 16,
        zIndex: 9999,
        opacity: opacityRef.current,
        transform: [{ translateX: translateXRef.current }],
        minWidth: 240,
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.colors.text, flex: 1, marginRight: 12 }}>{message}</Text>
        <Pressable onPress={handleClose} style={({ pressed }) => ({ padding: 4, opacity: pressed ? 0.6 : 1 })} accessible accessibilityLabel="Close notification">
          <MaterialCommunityIcons name="close" size={18} color={theme.colors.text} />
        </Pressable>
      </View>
    </Animated.View>
  );
};
