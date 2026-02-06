import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  description?: string;
  category?: string;
  stock: number;
  brand: string;
  rating: number; // 0-5
}

export const PRODUCTS: Product[] = [
  {
    id: 'wireless-headphones',
    name: 'Xbox Controller',
    price: 129.99,
    image: require('../../assets/wireless_headphones.jpeg'),
    description: 'Premium Xbox controller with wireless connectivity and ergonomic design',
    category: 'Electronics',
    stock: 15,
    brand: 'GameTech',
    rating: 4.5,
  },
  {
    id: 'smartwatch-pro',
    name: 'SmartWatch Pro',
    price: 299.99,
    image: require('../../assets/smartwatchpro.jpeg'),
    description: 'Advanced fitness tracking and notifications',
    category: 'Electronics',
    stock: 8,
    brand: 'TechPulse',
    rating: 4.7,
  },
  {
    id: 'minimal-backpack',
    name: 'Minimal Backpack',
    price: 79.99,
    image: require('../../assets/minimal_backpack.jpeg'),
    description: 'Stylish and durable everyday backpack',
    category: 'Bags',
    stock: 20,
    brand: 'UrbanGear',
    rating: 4.3,
  },
  {
    id: 'running-sneakers',
    name: 'Running Sneakers',
    price: 119.99,
    image: require('../../assets/running_sneakers.jpeg'),
    description: 'Lightweight and comfortable running shoes',
    category: 'Footwear',
    stock: 12,
    brand: 'ActiveStep',
    rating: 4.6,
  },
  {
    id: 'ceramic-mug-set',
    name: 'Ceramic Mug Set',
    price: 34.99,
    image: require('../../assets/ceramic-mug-set.jpeg'),
    description: 'Set of 4 beautiful ceramic mugs',
    category: 'Home',
    stock: 25,
    brand: 'HomeBliss',
    rating: 4.2,
  },
  {
    id: 'desk-lamp',
    name: 'Desk Lamp',
    price: 49.99,
    image: require('../../assets/desk-lamp.jpeg'),
    description: 'LED desk lamp with adjustable brightness',
    category: 'Home',
    stock: 18,
    brand: 'LightWorks',
    rating: 4.4,
  },
  {
    id: 'leather-wallet',
    name: 'Leather Wallet',
    price: 89.99,
    image: require('../../assets/leatherwallet.jpeg'),
    description: 'Premium leather wallet with RFID protection',
    category: 'Accessories',
    stock: 10,
    brand: 'ClassicCarry',
    rating: 4.8,
  },
  {
    id: 'bluetooth-speaker',
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: require('../../assets/bluetooth_speaker.jpeg'),
    description: 'Portable speaker with 360° sound',
    category: 'Electronics',
    stock: 14,
    brand: 'AcousticHub',
    rating: 4.5,
  },
  {
    id: 'yoga-mat',
    name: 'Yoga Mat',
    price: 39.99,
    image: require('../../assets/yoga-mat.jpeg'),
    description: 'Non-slip eco-friendly yoga mat. Can be used for all types of yoga and exercise.',
    category: 'Sports',
    stock: 22,
    brand: 'ZenFlow',
    rating: 4.6,
  },
  {
    id: 'scented-candle',
    name: 'Scented Candle',
    price: 24.99,
    image: require('../../assets/scented-candle.png'),
    description: 'Natural soy wax scented candle',
    category: 'Home',
    stock: 30,
    brand: 'AromaLife',
    rating: 4.1,
  },
];
