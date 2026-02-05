import React, { useState } from 'react';
import { FlatList, Alert, BackHandler, Text, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { PrimaryButton } from '../components/PrimaryButton';
import { CustomAlert } from '../components/CustomAlert';
import { EmptyState } from '../components/EmptyState';
import { formatPrice, formatTotal } from '../utils/format';
import { checkoutScreenStyles } from '../styles/checkoutScreenStyles';
import { RootStackScreenProps } from '../navigation/types';

export const CheckoutScreen: React.FC<RootStackScreenProps<'Checkout'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const styles = checkoutScreenStyles(theme.colors);

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

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert(
        'Cart is empty',
        'Your cart is empty.',
        [{ text: 'OK', style: 'default' }],
        { titleColor: theme.colors.text } as any
      );
      return;
    }

    setLoading(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSuccessVisible(true);
  };

  const handleSuccessConfirm = () => {
    setSuccessVisible(false);
    clearCart();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="cart-outline"
          title="Cart is Empty"
          message="Your cart doesn't have any items."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemQuantity}>
                Qty {item.quantity} × {formatPrice(item.product.price)}
              </Text>
            </View>
            <Text style={styles.itemTotal}>
              {formatPrice(item.product.price * item.quantity)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={[styles.contentContainer]}
        scrollIndicatorInsets={{ right: 1 }}
        ListHeaderComponent={
          <ThemedText variant="subtitle" style={{ marginBottom: 12 }}>
            Order Summary
          </ThemedText>
        }
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            {formatTotal(totalPrice)}
          </Text>
        </View>
        <PrimaryButton
          label="Complete Checkout"
          onPress={handleCheckout}
          loading={loading}
          disabled={loading}
        />
      </View>

      <CustomAlert
        visible={successVisible}
        title="Checkout Successful"
        message="Thank you for your purchase!"
        theme={theme}
        onDismiss={() => setSuccessVisible(false)}
        onConfirm={handleSuccessConfirm}
        confirmText="OK"
      />
    </SafeAreaView>
  );
};
