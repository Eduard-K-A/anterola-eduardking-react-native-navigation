import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import createStockBadgeStyles from '../styles/stockBadgeStyles';

interface StockBadgeProps {
  stock: number;
}

const StockBadge: React.FC<StockBadgeProps> = ({ stock }) => {
  const { theme } = useTheme();
  const styles = createStockBadgeStyles(theme);

  const { label, color } = React.useMemo(() => {
    if (stock <= 0) return { label: 'Out of Stock', color: theme.colors.danger };
    if (stock <= 5) return { label: `Only ${stock} left`, color: '#FF9F0A' };
    return { label: 'In Stock', color: theme.colors.success };
  }, [stock, theme.colors]);

  return (
    <View style={styles.row} accessibilityRole="text" accessibilityLabel={label}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
export default React.memo(StockBadge);
