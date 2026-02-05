/**
 * Format price to currency string (USD)
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Format total price from cents/smallest unit
 */
export const formatTotal = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
