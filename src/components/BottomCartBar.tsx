import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { formatTotal } from '../utils/format';

interface BottomCartBarProps {
  onPress: () => void;
}

export const BottomCartBar: React.FC<BottomCartBarProps> = ({ onPress }) => {
  const { theme } = useTheme();
  const { totalItems, totalPrice } = useCart();

  const isEmpty = totalItems === 0;

  return (
    <View
      accessible
      accessibilityRole="button"
      style={{
        backgroundColor: theme.colors.card,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
      }}
    >
      {isEmpty ? (
        <Pressable onPress={onPress} style={({ pressed }) => ({ paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, opacity: pressed ? 0.85 : 1 })}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={20}
              color={theme.colors.text}
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: '600', textAlign: 'center' }}>Your cart is empty</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            {
              backgroundColor: theme.colors.primary,
              borderRadius: 12,
              paddingVertical: 14,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={22}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: '600',
              }}
            >
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {formatTotal(totalPrice)}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
