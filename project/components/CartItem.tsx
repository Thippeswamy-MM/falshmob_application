import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Trash, Plus, Minus } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types';
import { COLORS, FONT, SHADOWS, SIZES, SPACING } from '@/constants/theme';

interface CartItemProps {
  item: CartItemType;
  onRemove?: (item: CartItemType) => void;
  onQuantityChange?: (item: CartItemType, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(item, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(item, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove?.(item);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.images[0] }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.brand}>{item.product.brand}</Text>
          <Text style={styles.name}>{item.product.name}</Text>
          
          <View style={styles.variantContainer}>
            <View 
              style={[
                styles.colorDot, 
                { backgroundColor: item.color.code },
                item.color.name === 'White' && styles.whiteDot,
              ]} 
            />
            <Text style={styles.variantText}>{item.color.name}</Text>
            <Text style={styles.variantSeparator}>•</Text>
            <Text style={styles.variantText}>Size: {item.size}</Text>
          </View>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus size={16} color={quantity <= 1 ? COLORS.textLight : COLORS.textDark} />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncrement}
            >
              <Plus size={16} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>${(item.product.price * quantity).toFixed(2)}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
        <Trash size={18} color={COLORS.textLight} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: SIZES.radius / 2,
    marginRight: SPACING.m,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productDetails: {
    flex: 1,
  },
  brand: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  name: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 6,
  },
  variantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
  },
  whiteDot: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  variantText: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.textMedium,
  },
  variantSeparator: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.textMedium,
    marginHorizontal: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: SIZES.radius / 2,
    paddingVertical: 4,
    paddingHorizontal: SPACING.xs,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: COLORS.textDark,
    minWidth: 24,
    textAlign: 'center',
  },
  price: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.primary,
  },
  removeButton: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartItem;