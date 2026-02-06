import React, { memo } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../constants/products';
import { formatPrice } from '../utils/format';
import { productCardStyles } from '../styles/productCardStyles';

interface ProductCardProps {
  product: Product;
  onPress?: (p: Product) => void;
}

export const ProductCard = memo(({ product, onPress }: ProductCardProps) => {
  const { theme } = useTheme();
  const styles = productCardStyles(theme.colors);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => onPress?.(product)}>
          <Image source={product.image} style={styles.image} />
        </Pressable>
        <View style={styles.content}>
          <Pressable onPress={() => onPress?.(product)}>
            <Text style={styles.nameText} numberOfLines={2}>
              {product.name}
            </Text>
            {product.description && (
              <Text style={styles.descriptionText} numberOfLines={2}>
                {product.description}
              </Text>
            )}
          </Pressable>
          <View style={styles.footer}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={styles.priceText}>
                {formatPrice(product.price)}
              </Text>
              <Text style={styles.stockText}>Stock: {product.stock}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleAddToCart}
            >
              <Text style={styles.addButtonText}>
                Add
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* Modal is lifted to parent for better performance and single-instance handling */}
    </>
  );
});

ProductCard.displayName = 'ProductCard';
