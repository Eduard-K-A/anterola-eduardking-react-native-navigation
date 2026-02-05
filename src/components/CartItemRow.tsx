import React, { memo } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../contexts/CartContext';
import { formatPrice } from '../utils/format';
import { cartItemStyles } from '../styles/cartItemStyles';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow = memo(({ item }: CartItemRowProps) => {
  const { theme } = useTheme();
  const styles = cartItemStyles(theme.colors);
  const { incrementItem, decrementItem } = useCart();

  const subtotal = item.product.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image source={item.product.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.nameText}>{item.product.name}</Text>
        <Text style={styles.priceText}>
          {formatPrice(item.product.price)} each
        </Text>
        <View style={styles.quantityRow}>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => decrementItem(item.product.id)}
          >
            <MaterialCommunityIcons
              name="minus"
              size={16}
              color={theme.colors.text}
            />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => incrementItem(item.product.id)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={16}
              color={theme.colors.text}
            />
          </Pressable>
        </View>
      </View>
      <Text style={styles.subtotal}>
        {formatPrice(subtotal)}
      </Text>
    </View>
  );
});

CartItemRow.displayName = 'CartItemRow';
