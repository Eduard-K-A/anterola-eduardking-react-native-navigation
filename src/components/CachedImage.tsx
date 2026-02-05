import React from 'react';
import { Image, View, ActivityIndicator, ImageProps, ImageSourcePropType } from 'react-native';

interface CachedImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType;
  style?: ImageProps['style'];
}

export const CachedImage: React.FC<CachedImageProps> = ({ source, style, ...rest }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <View style={[{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }, style]}>
      {!loaded && (
        <ActivityIndicator size="small" style={{ position: 'absolute' }} />
      )}
      <Image
        {...rest}
        source={source}
        onLoad={() => setLoaded(true)}
        style={[{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, resizeMode: 'cover' }, style]}
      />
    </View>
  );
};

export default CachedImage;
