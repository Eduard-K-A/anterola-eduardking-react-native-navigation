import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useTheme } from './ThemeContext';
import { Product } from '../constants/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const toast = useToast();
  const { theme } = useTheme();

  // Computed values
  const { totalItems, totalPrice } = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { totalItems: total, totalPrice: price };
  }, [items]);

  const showStockAlert = (product: Product) => {
    toast.showAlert(
      'Stock limit reached',
      `Only ${product.stock} units of "${product.name}" available.`,
      false,
    );
  };

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const addToCart = useCallback(
    (product: Product) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      const maxQty = Math.min(product.stock, product.stock); // Max is the stock count

      if (existingItem) {
        // Item exists, try to increment
        const nextQty = clamp(existingItem.quantity + 1, 1, maxQty);

        if (nextQty === existingItem.quantity) {
          // Can't add more
          showStockAlert(product);
          return;
        }

        setItems((prev) =>
          prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: nextQty } : item,
          ),
        );
        toast.show('Successfully Added');
      } else {
        // New item
        if (product.stock <= 0) {
          toast.showAlert('Out of stock', `"${product.name}" is not available.`, true);
          return;
        }

        setItems((prev) => [...prev, { product, quantity: 1 }]);
        toast.show('Successfully Added');
      }
    },
    [items, toast, theme],
  );

  const incrementItem = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      if (!item) return;

      const maxQty = item.product.stock;
      const nextQty = clamp(item.quantity + 1, 1, maxQty);

      if (nextQty === item.quantity) {
        showStockAlert(item.product);
        return;
      }

      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: nextQty } : i)),
      );
      toast.show('Successfully Added');
    },
    [items, toast, theme],
  );

  const decrementItem = useCallback(
    (productId: string) => {
      const item = items.find((i) => i.product.id === productId);
      if (!item) return;

      const nextQty = clamp(item.quantity - 1, 0, item.product.stock);

      if (nextQty === 0) {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
        toast.show('Successfully Removed');
      } else if (nextQty !== item.quantity) {
        setItems((prev) =>
          prev.map((i) => (i.product.id === productId ? { ...i, quantity: nextQty } : i)),
        );
        toast.show('Successfully Removed');
      }
    },
    [items, toast],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      toast.show('Successfully Removed');
    },
    [toast],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
