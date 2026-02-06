
import React, { useEffect, useRef, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  PanResponder,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Product } from '../constants/products';
import CachedImage from './CachedImage';
import Rating from './Rating';
import PriceDisplay from './PriceDisplay';
import StockBadge from './StockBadge';
import createProductModalStyles from '../styles/productModalStyles';

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd?: (p: Product) => void;
}

const SCREEN = Dimensions.get('window');

export const ProductModal: React.FC<ProductModalProps> = ({ visible, product, onClose, onAdd }) => {
  const { theme } = useTheme();
  const isWide = SCREEN.width >= 768;
  const styles = createProductModalStyles(theme, isWide);

  const scrollY = useRef<number>(0);
  const translateY = useRef(new Animated.Value(SCREEN.height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Pan responder for swipe-to-dismiss from handle only.
  // NOTE: Attaching only to the handle ensures ScrollView and buttons remain interactive.
  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Only capture vertical downward drags (dy > 0 and dominant over horizontal)
        return Math.abs(dy) > Math.abs(dx) && dy > 6;
      },
      onPanResponderMove: (_evt, gesture) => {
        if (gesture.dy > 0) {
          pan.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_evt, gesture) => {
        const shouldDismiss = gesture.vy > 1.2 || gesture.dy > SCREEN.height * 0.25;
        if (shouldDismiss) {
          Animated.parallel([
            Animated.timing(backdropOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: SCREEN.height, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          ]).start(() => {
            pan.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    }),
  ).current;

  const openAnim = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, speed: 20, bounciness: 6, useNativeDriver: true }),
    ]).start();
  }, [backdropOpacity, translateY]);

  const closeModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: SCREEN.height, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      onClose();
    });
  }, [backdropOpacity, translateY, onClose]);

  useEffect(() => {
    if (visible) {
      // reset
      pan.setValue(0);
      translateY.setValue(SCREEN.height);
      backdropOpacity.setValue(0);
      // small delay so modal mounts
      requestAnimationFrame(() => openAnim());
    }
  }, [visible, openAnim, pan, translateY, backdropOpacity]);

  if (!product) return null;

  return (
    <Modal visible={visible} transparent onRequestClose={closeModal} animationType="none">
      {/* Backdrop only participates in interactions when visible (Modal handles blocking) */}
      <Animated.View 
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents="box-none"
      >
        <Pressable 
          style={styles.backdropPressArea} 
          onPress={closeModal} 
          accessibilityLabel="Close product details" 
          pointerEvents="auto"
        />
      </Animated.View>

      {/* Sheet container: do NOT attach pan responder here, only to the handle */}
      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY: Animated.add(translateY, pan) }] },
        ]}
        accessibilityViewIsModal
        accessibilityLiveRegion="polite"
      >
      

        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {product.name}
            </Text>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>

          <TouchableOpacity onPress={closeModal} accessibilityLabel="Close" accessibilityRole="button" style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces
          overScrollMode="never"
          onScroll={({ nativeEvent }) => {
            scrollY.current = nativeEvent.contentOffset.y;
          }}
          onScrollEndDrag={({ nativeEvent }) => {
            // Allow fast swipe-down from top of content to dismiss
            const velocityY = (nativeEvent as any).velocity?.y ?? 0;
            if (scrollY.current <= 0 && velocityY > 1.2) {
              closeModal();
            }
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.imageContainer}>
            <CachedImage source={product.image} style={styles.heroImage} />
          </View>

          <View style={styles.infoSection}>
            <Rating rating={product.rating} reviewCount={(product as any).reviewCount ?? 0} />
            <PriceDisplay price={product.price} originalPrice={(product as any).originalPrice} discount={(product as any).discount} />
            <StockBadge stock={product.stock} />

            {product.category && <View style={styles.chipsRow}><Text style={styles.chip}>{product.category}</Text></View>}

            <View style={styles.descriptionBlock}>
              {product.description ? (
                <Text style={styles.descriptionText} accessibilityLabel="Product description">
                  {product.description}
                </Text>
              ) : (
                <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>No description available.</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => onAdd?.(product)}
            style={({ pressed }) => [
              styles.primaryButton,
              { opacity: pressed ? 0.85 : 1, backgroundColor: product.stock > 0 ? theme.colors.primary : theme.colors.muted },
            ]}
            accessibilityRole="button"
            accessibilityLabel={product.stock > 0 ? 'Add to cart' : 'Out of stock'}
            disabled={product.stock <= 0}
          >
            <Text style={styles.primaryButtonText}>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ProductModal;
