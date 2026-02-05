# Shopping Cart Mobile App

A production-ready React Native Shopping Cart application built with Expo SDK 54, TypeScript, and React Navigation.

## Features

✨ **Core Features**
- 🏪 Browse products in a responsive grid layout
- 🛒 Add/remove items from shopping cart
- 🎨 Light and dark theme support with persistence
- 💾 Async storage for theme preferences
- 🔔 Toast notifications for user feedback
- 📱 Smooth animations and transitions
- ♿ Accessible error boundaries and safe area handling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemedView.tsx       # Theme-aware container
│   ├── ThemedText.tsx       # Theme-aware text
│   ├── PrimaryButton.tsx      # Primary action button
│   ├── ProductCard.tsx       # Product display card (memoized)
│   ├── CartItemRow.tsx       # Cart item row (memoized)
│   ├── EmptyState.tsx        # Empty state display
│   ├── ThemeToggle.tsx       # Theme toggle button
│   ├── Toast.tsx             # Toast notification component
│   └── AppErrorBoundary.tsx   # Error boundary wrapper
├── contexts/            # Context providers
│   ├── ThemeContext.tsx      # Light/dark mode with persistence
│   ├── ToastContext.tsx      # Toast notifications
│   └── CartContext.tsx       # Shopping cart business logic
├── screens/             # Screen components
│   ├── HomeScreen.tsx        # Product listing with FAB
│   ├── CartScreen.tsx        # Shopping cart view
│   ├── CheckoutScreen.tsx    # Checkout summary
│   └── index.ts              # Barrel export
├── navigation/          # Navigation setup
│   ├── RootNavigator.tsx     # Stack navigator configuration
│   └── types.ts              # Navigation type definitions
├── constants/           # Constants and mock data
│   ├── colors.ts             # Color palette definitions
│   ├── theme.ts              # Theme configuration
│   └── products.ts           # Mock product data
├── styles/              # Stylesheet definitions
│   ├── themedLayoutStyles.tsx     # Layout styles
│   ├── themedTypographyStyles.tsx # Typography styles
│   ├── primaryButtonStyles.tsx    # Button styles
│   ├── productCardStyles.tsx      # Product card styles
│   ├── cartItemStyles.tsx         # Cart item styles
│   ├── emptyStateStyles.tsx       # Empty state styles
│   ├── homeScreenStyles.tsx       # Home screen styles
│   ├── cartScreenStyles.tsx       # Cart screen styles
│   └── checkoutScreenStyles.tsx   # Checkout screen styles
└── utils/               # Utility functions
    └── format.ts             # Format helpers (price, etc.)
```

## Technology Stack

- **Framework**: React Native 0.81.5
- **Platform**: Expo SDK 54 (managed workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation 6 (Native Stack)
- **State Management**: React Context API with Hooks
- **Animations**: Animated API
- **Icons**: @expo/vector-icons (MaterialCommunityIcons)
- **Storage**: @react-native-async-storage/async-storage
- **Safe Area**: react-native-safe-area-context

## Getting Started

### Prerequisites

- Node.js ≥ 16.0
- npm or yarn
- Expo Go app (for physical device testing)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Architecture

### Theme System

- **ThemeContext**: Manages light/dark mode globally
- Persists theme preference to AsyncStorage
- Provides `useTheme()` hook for accessing current theme colors
- All components respond to theme changes in real-time

### Cart Management

- **CartContext**: Central cart state management
- Validates stock quantities (max 10 per item)
- Integrates with Toast for user feedback
- Computes derived values (totalItems, totalPrice) via useMemo
- Provides CRUD operations: addToCart, incrementItem, decrementItem, removeItem, clearCart

### Navigation

- Stack Navigator with three main screens
- Header includes theme toggle button
- Global navigation theme synced with app theme
- Android back button handling on Cart and Checkout screens

### UI Components

- **ThemedView**: Base container applying theme colors
- **ThemedText**: Text component with variants (title, subtitle, body, caption)
- **PrimaryButton**: Action button with loading state
- **ProductCard**: Memoized product display
- **CartItemRow**: Memoized cart item with quantity controls
- **Toast**: Animated notification with fade/slide effects
- **EmptyState**: Centered message for empty states

## Key Features Details

### Theme Persistence

Theme preference automatically saves to device storage and restores on app startup.

```typescript
// Automatic theme sync on mount
useEffect(() => {
  const loadTheme = async () => {
    const savedMode = await AsyncStorage.getItem(THEME_PERSIST_KEY);
    if (savedMode === 'dark') {
      setTheme(darkTheme);
    }
  };
  loadTheme();
}, []);
```

### Cart Validation

Stock limits enforced with clear user feedback:
- Maximum 10 items per product
- Stock validation before adding
- Alert when limit reached

### Toast Notifications

Animated toast for feedback:
- "Successfully Added" when items added
- "Successfully Removed" when items removed
- Auto-dismisses after 2 seconds

### Animations

- Toast slides up/down with opacity fade
- Smooth theme transitions
- Native stack transitions

## Development Guidelines

### Component Naming
- Functional components with hooks
- File names match component names
- Memoized list items (ProductCard, CartItemRow)

### Styling
- StyleSheet definitions in `src/styles/`
- Theme-aware styles via color tokens
- Minimal inline styles (only when necessary)

### TypeScript
- Explicit prop interfaces
- Generic context types
- Navigation type safety with RootStackParamList

### Error Handling
- AppErrorBoundary wraps entire app
- Graceful fallback UI
- Console logging for debugging

## Mock Data

10 sample products included with:
- Local asset images
- Varying stock levels
- Multiple categories
- Realistic pricing

## Performance Optimizations

- React.memo on list items (ProductCard, CartItemRow)
- useMemo for computed cart values
- useCallback for event handlers
- Lazy navigation transitions

## Browser Support

- Expo Go: Android 6+ and iOS 13+
- Web: Modern browsers (React Native Web)

## Running on Physical Devices

1. Download Expo Go app
2. Run `npm start` in project directory
3. Scan QR code with device camera
4. App loads in Expo Go

## Troubleshooting

**Dependencies not found**
```bash
npm install
```

**TypeScript errors**
```bash
npx tsc --noEmit
```

**Theme not persisting**
- Ensure AsyncStorage is initialized
- Check device storage permissions

**Navigation issues**
- Verify RootStackParamList matches screen names
- Check navigation.navigate() screen names

## Future Enhancements

- Search and filter products
- Product details screen
- User authentication
- Order history
- Wishlist functionality
- Payment integration
- Product reviews
- Inventory sync with backend

## License

This project is provided as-is for educational and development purposes.

## Support

For issues or questions, refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)
