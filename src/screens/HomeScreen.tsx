import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';
import { BottomCartBar } from '../components/BottomCartBar';
import { PRODUCTS } from '../constants/products';
import { homeScreenStyles } from '../styles/homeScreenStyles';
import { RootStackScreenProps } from '../navigation/types';

export const HomeScreen: React.FC<RootStackScreenProps<'Home'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const { totalItems } = useCart();
  const styles = homeScreenStyles(theme.colors);

  // Hook for potential refresh logic when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Could add any refresh logic here
      return () => {};
    }, []),
  );

  // Organize products into 2 columns
  const numColumns = 2;
  const columnWrapperStyle = useMemo(() => ({ paddingHorizontal: 4 }), []);

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={columnWrapperStyle}
        contentContainerStyle={styles.listContent}
        scrollIndicatorInsets={{ right: 1 }}
      />
      <BottomCartBar onPress={handleCartPress} />
    </SafeAreaView>
  );
};
