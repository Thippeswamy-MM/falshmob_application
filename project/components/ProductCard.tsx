import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { COLORS, FONT, SHADOWS, SIZES, SPACING } from '@/constants/theme';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

const ProductCard = ({ product, size = 'medium' }: ProductCardProps) => {
  const cardSize = {
    small: { width: 120, height: 180 },
    medium: { width: 170, height: 250 },
    large: { width: 200, height: 300 },
  };

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const toggleFavorite = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`} asChild>
      <TouchableOpacity style={[styles.container, SHADOWS.small, cardSize[size]]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.image} />
          
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
          
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Heart size={16} color={isFavorite ? COLORS.error : COLORS.textMedium} fill={isFavorite ? COLORS.error : 'none'} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    margin: SPACING.s,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    height: '65%',
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    padding: SPACING.m,
    height: '35%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  brand: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.textMedium,
    marginBottom: 4,
  },
  name: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 6,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.error,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  discountText: {
    fontFamily: FONT.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  newText: {
    fontFamily: FONT.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        cursor: 'pointer',
      },
    }),
  },
});

export default ProductCard;