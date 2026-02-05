import React, { memo } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../constants/products';
import { formatPrice } from '../utils/format';
import { productCardStyles } from '../styles/productCardStyles';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { theme } = useTheme();
  const styles = productCardStyles(theme.colors);
  const { addToCart } = useCart();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleModalAdd = (p: Product) => {
    addToCart(p);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={product.image} style={styles.image} />
        </Pressable>
        <View style={styles.content}>
          <Pressable onPress={() => setModalVisible(true)}>
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
      <ProductModal
        visible={modalVisible}
        product={product}
        theme={theme}
        onClose={() => setModalVisible(false)}
        onAdd={handleModalAdd}
      />
    </>
  );
});

ProductCard.displayName = 'ProductCard';
