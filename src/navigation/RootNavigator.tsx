import React from 'react';
import { Text } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from './types';
import { HomeScreen, CartScreen, CheckoutScreen } from '../screens';
import { ThemeToggle } from '../components/ThemeToggle';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { theme, isDark } = useTheme();

  // Create a navigation theme that matches the app theme
  const navigationTheme: Theme = isDark ? DarkTheme : DefaultTheme;
  const customTheme: Theme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: theme.colors.background,
      card: theme.colors.card,
      primary: theme.colors.primary,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerRight: () => <ThemeToggle />,
          headerTitle: (props: any) => (
            <Text
              style={{
                marginTop: 4,
                paddingVertical: 2,
                paddingHorizontal: 8,
                color: theme.colors.text,
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              {props.children}
            </Text>
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Shop',
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Shopping Cart',
            headerLargeTitle: false,
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            title: 'Checkout',
            headerLargeTitle: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
