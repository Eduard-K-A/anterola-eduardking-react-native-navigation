import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import createRatingStyles from '../styles/ratingStyles';

interface RatingProps {
  rating: number; // 0-5
  reviewCount?: number;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount = 0, size = 16 }) => {
  const { theme } = useTheme();
  const styles = createRatingStyles(theme);

  const stars = useMemo(() => {
    const out: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) out.push('full');
      else if (rating >= i - 0.5) out.push('half');
      else out.push('empty');
    }
    return out;
  }, [rating]);

  return (
    <View style={styles.row} accessible accessibilityRole="text" accessibilityLabel={`Rating ${rating} out of 5`}>
      <View style={styles.starsRow}>
        {stars.map((s, idx) => (
          <MaterialCommunityIcons
            key={idx}
            name={s === 'full' ? 'star' : s === 'half' ? 'star-half-full' : 'star-outline'}
            size={size}
            color={theme.colors.primary}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>{rating.toFixed(1)}/5</Text>
      {typeof reviewCount === 'number' && (
        <Text style={styles.reviewCount}>({reviewCount.toLocaleString()} reviews)</Text>
      )}
    </View>
  );
};


export default React.memo(Rating);
