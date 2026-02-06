import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Product } from '../constants/products';
import CachedImage from './CachedImage';
import createProductModalStyles from '../styles/productModalStyles';

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd?: (p: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ visible, product, onClose, onAdd }) => {
  if (!product) return null;

  const { width } = Dimensions.get('window');
  const isWide = width >= 768;

  const { theme } = useTheme();

  const styles = createProductModalStyles(theme, isWide);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.overlay} accessibilityLabel="Close product details">
        <Pressable onPress={() => {}} style={styles.container} accessibilityViewIsModal>
          <View style={styles.contentRow}>
            <View style={styles.imageWrapper}>
              <CachedImage source={product.image} style={styles.image} />
            </View>
            <View style={styles.rightColumn}>
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{product.name}</Text>
                  {product.category && <Text style={styles.category}>{product.category}</Text>}
                </View>
                <Pressable onPress={onClose} style={styles.closeButton} accessibilityLabel="Close">
                  <MaterialCommunityIcons name="close" size={22} color={theme.colors.text} />
                </Pressable>
              </View>

              <Text style={styles.price}>${product.price.toFixed(2)}</Text>

              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Brand:</Text>
                  <Text style={styles.detailValue}>{product.brand}</Text>
                </View>

                <View style={styles.detailRow}>
                  <MaterialCommunityIcons name="star" size={16} color={theme.colors.primary} />
                  <Text style={styles.starText}>{product.rating.toFixed(1)}</Text>
                  <Text style={styles.reviewCount}>(4.2k reviews)</Text>
                </View>

                <Text style={styles.stockText}>Stock: {product.stock}</Text>
              </View>

              <ScrollView style={styles.descriptionScroll}>
                <Text style={styles.descriptionText}>{product.description}</Text>
              </ScrollView>

              <View style={styles.actions}>
                <Pressable onPress={() => onAdd?.(product)} style={({ pressed }) => ({ ...styles.primaryButton, opacity: pressed ? 0.85 : 1 })}>
                  <Text style={styles.primaryButtonText}>Add to Cart</Text>
                </Pressable>
                <Pressable onPress={onClose} style={({ pressed }) => ({ ...styles.secondaryButton, opacity: pressed ? 0.85 : 1 })}>
                  <Text style={styles.secondaryButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ProductModal;
