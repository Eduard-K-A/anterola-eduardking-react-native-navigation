import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import createPriceDisplayStyles from '../styles/priceDisplayStyles';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discount?: number; // percent
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, originalPrice, discount }) => {
  const { theme } = useTheme();
  const styles = createPriceDisplayStyles(theme);

  return (
    <View style={styles.row}>
      <Text style={styles.price} accessibilityRole="text">
        ${price.toFixed(2)}
      </Text>

      {originalPrice && originalPrice > price && (
        <Text style={styles.original}>${originalPrice.toFixed(2)}</Text>
      )}

      {discount && discount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{discount}%</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(PriceDisplay);
