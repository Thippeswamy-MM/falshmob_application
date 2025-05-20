import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star, Truck, ArrowRight } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

import Header from '@/components/Header';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { getProductById, getRelatedProducts } from '@/data/products';
import { Product, Color } from '@/types';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width;
const DOT_SIZE = 8;
const DOT_SPACING = 8;

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id || '') as Product;
  const relatedProducts = getRelatedProducts(product);

  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAddToCart = () => {
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart!`,
      [{ text: "OK" }]
    );
  };

  const renderSizeButton = (size: string) => (
    <TouchableOpacity
      key={size}
      style={[
        styles.sizeButton,
        selectedSize === size && styles.selectedSizeButton
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text
        style={[
          styles.sizeButtonText,
          selectedSize === size && styles.selectedSizeButtonText
        ]}
      >
        {size}
      </Text>
    </TouchableOpacity>
  );

  const renderColorButton = (color: Color) => (
    <TouchableOpacity
      key={color.name}
      style={[
        styles.colorButton,
        selectedColor.name === color.name && styles.selectedColorButton
      ]}
      onPress={() => setSelectedColor(color)}
    >
      <View 
        style={[
          styles.colorDot, 
          { backgroundColor: color.code },
          color.name === 'White' && styles.whiteDot
        ]} 
      />
      <Text
        style={[
          styles.colorButtonText,
          selectedColor.name === color.name && styles.selectedColorButtonText
        ]}
      >
        {color.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={product.brand} transparent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const offset = e.nativeEvent.contentOffset.x;
            const index = Math.round(offset / IMAGE_WIDTH);
            setActiveImageIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {/* Image Dots */}
        <View style={styles.pagination}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeImageIndex === index && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
        
        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  color={star <= Math.floor(product.rating) ? COLORS.warning : COLORS.border}
                  fill={star <= Math.floor(product.rating) ? COLORS.warning : 'none'}
                />
              ))}
            </View>
            <Text style={styles.rating}>{product.rating} ({product.reviews} reviews)</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <View style={styles.discountContainer}>
                <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
              </View>
            )}
          </View>
          
          {/* Description */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
              {product.description}
            </Text>
            {product.description.length > 150 && (
              <TouchableOpacity 
                style={styles.expandButton} 
                onPress={() => setExpanded(!expanded)}
              >
                <Text style={styles.expandButtonText}>
                  {expanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Colors */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorsContainer}>
              {product.colors.map(renderColorButton)}
            </View>
          </View>
          
          {/* Sizes */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizesContainer}>
              {product.sizes.map(renderSizeButton)}
            </View>
          </View>
          
          {/* Shipping */}
          <View style={styles.shippingContainer}>
            <Truck size={20} color={COLORS.textMedium} />
            <View style={styles.shippingInfo}>
              <Text style={styles.shippingTitle}>Free Shipping & Returns</Text>
              <Text style={styles.shippingText}>Free shipping on orders over $50</Text>
            </View>
          </View>
          
          {/* Related Products */}
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>You May Also Like</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedProductsContainer}
            >
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  size="small" 
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      
      {/* Add to Cart */}
      <View style={styles.bottomBar}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          title="Add to Cart" 
          onPress={handleAddToCart} 
          icon={<ArrowRight size={18} color={COLORS.white} />}
          iconPosition="right"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  productImage: {
    width: IMAGE_WIDTH,
    height: 450,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -SPACING.l,
    marginBottom: SPACING.m,
  },
  paginationDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: DOT_SPACING / 2,
  },
  paginationDotActive: {
    backgroundColor: COLORS.white,
    width: DOT_SIZE * 2,
  },
  productInfo: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    marginTop: -SIZES.radius * 2,
    paddingTop: SPACING.l,
    paddingHorizontal: SPACING.l,
    paddingBottom: 100, // For bottom bar
  },
  brand: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  stars: {
    flexDirection: 'row',
    marginRight: SPACING.s,
  },
  rating: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  price: {
    fontFamily: FONT.bold,
    fontSize: 24,
    color: COLORS.primary,
    marginRight: SPACING.s,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
    marginRight: SPACING.s,
  },
  discountBadge: {
    backgroundColor: COLORS.error + '20',
    paddingHorizontal: SPACING.s,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.error,
  },
  sectionContainer: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
    lineHeight: 22,
  },
  expandButton: {
    marginTop: SPACING.xs,
  },
  expandButtonText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.s,
    borderRadius: SIZES.radius / 2,
    marginRight: SPACING.s,
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedColorButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.xs,
  },
  whiteDot: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  colorButtonText: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.textDark,
  },
  selectedColorButtonText: {
    color: COLORS.primary,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius / 2,
    marginRight: SPACING.s,
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSizeButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  sizeButtonText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  selectedSizeButtonText: {
    color: COLORS.primary,
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.l,
  },
  shippingInfo: {
    marginLeft: SPACING.m,
  },
  shippingTitle: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  shippingText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.textMedium,
  },
  relatedContainer: {
    marginBottom: SPACING.l,
  },
  relatedTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
  },
  relatedProductsContainer: {
    paddingRight: SPACING.l,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.m,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: SIZES.radius / 2,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
  },
  quantityText: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    minWidth: 30,
    textAlign: 'center',
  },
});