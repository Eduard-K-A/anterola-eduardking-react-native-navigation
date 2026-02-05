import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '../constants/theme';
import { Product } from '../constants/products';
import CachedImage from './CachedImage';

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  theme: AppTheme;
  onClose: () => void;
  onAdd?: (p: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ visible, product, theme, onClose, onAdd }) => {
  if (!product) return null;

  const { width } = Dimensions.get('window');
  const isWide = width >= 768;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'center', padding: 16 }}
        accessibilityLabel="Close product details"
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 16,
            maxHeight: '90%',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
          accessibilityViewIsModal
        >
          <View style={{ flexDirection: isWide ? 'row' : 'column' }}>
            <View style={{ flex: isWide ? 0.4 : 0, marginRight: isWide ? 12 : 0, height: isWide ? 240 : 300 }}>
              <CachedImage source={product.image} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 22, fontWeight: '700', color: theme.colors.text }}>{product.name}</Text>
                  {product.category && (
                    <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 }}>{product.category}</Text>
                  )}
                </View>
                <Pressable onPress={onClose} style={{ padding: 8 }} accessibilityLabel="Close">
                  <MaterialCommunityIcons name="close" size={22} color={theme.colors.text} />
                </Pressable>
              </View>

              <Text style={{ fontSize: 20, fontWeight: '800', color: theme.colors.primary, marginTop: 12 }}>${product.price.toFixed(2)}</Text>

              <View style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: theme.colors.textSecondary, marginRight: 4 }}>Brand:</Text>
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{product.brand}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <MaterialCommunityIcons name="star" size={16} color={theme.colors.primary} />
                  <Text style={{ color: theme.colors.text, fontWeight: '600', marginLeft: 4 }}>{product.rating.toFixed(1)}</Text>
                  <Text style={{ color: theme.colors.textSecondary, marginLeft: 4 }}>(4.2k reviews)</Text>
                </View>
                <Text style={{ color: theme.colors.textSecondary }}>Stock: {product.stock}</Text>
              </View>

              <ScrollView style={{ marginTop: 12, maxHeight: 160 }}>
                <Text style={{ color: theme.colors.text, lineHeight: 20 }}>{product.description}</Text>
              </ScrollView>

              <View style={{ flexDirection: isWide ? 'row' : 'column', marginTop: 16, gap: 8 }}>
                <Pressable
                  onPress={() => onAdd?.(product)}
                  style={({ pressed }) => ({
                    backgroundColor: theme.colors.primary,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    opacity: pressed ? 0.85 : 1,
                    marginRight: isWide ? 8 : 0,
                  })}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Add to Cart</Text>
                </Pressable>
                <Pressable onPress={onClose} style={({ pressed }) => ({ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, opacity: pressed ? 0.85 : 1 })}>
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Close</Text>
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
