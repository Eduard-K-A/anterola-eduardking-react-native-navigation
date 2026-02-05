import React, { useEffect } from 'react';
import { FlatList, BackHandler, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ThemedView } from '../components/ThemedView';
import { CartItemRow } from '../components/CartItemRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { EmptyState } from '../components/EmptyState';
import { formatTotal } from '../utils/format';
import { cartScreenStyles } from '../styles/cartScreenStyles';
import { RootStackScreenProps } from '../navigation/types';

export const CartScreen: React.FC<RootStackScreenProps<'Cart'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const { items, totalPrice, clearCart } = useCart();
  const { showAlert } = useToast();
  const styles = cartScreenStyles(theme.colors);

  // Android back handler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [navigation]),
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      showAlert('Cart is empty', 'Please add items before checking out.');
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {items.length === 0 ? (
        <EmptyState
          icon="shopping-outline"
          title="Your Cart is Empty"
          message="Start shopping to add items to your cart!"
        />
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <CartItemRow item={item} />}
            keyExtractor={(item) => item.product.id}
            contentContainerStyle={styles.listContent}
            scrollIndicatorInsets={{ right: 1 }}
          />
          <ThemedView
            variant="card"
            style={styles.footer}
          >
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>
                {formatTotal(totalPrice)}
              </Text>
            </View>
            <PrimaryButton
              label="Proceed to Checkout"
              onPress={handleCheckout}
            />
          </ThemedView>
        </>
      )}
    </SafeAreaView>
  );
};
