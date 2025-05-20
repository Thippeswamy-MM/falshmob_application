import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

import Header from '@/components/Header';
import CartItemComponent from '@/components/CartItem';
import Button from '@/components/Button';
import { cartItems, getCartTotal } from '@/data/cart';
import { CartItem } from '@/types';

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = (item: CartItem) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            setItems(items.filter(i => i.product.id !== item.product.id));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    setItems(items.map(i => {
      if (i.product.id === item.product.id) {
        return { ...i, quantity };
      }
      return i;
    }));
  };

  const handleCheckout = () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Order Placed",
        "Your order has been successfully placed!",
        [{ text: "OK" }]
      );
    }, 2000);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shopping Cart" showCart={false} />
      
      {items.length > 0 ? (
        <>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.itemsContainer}>
              {items.map((item) => (
                <CartItemComponent 
                  key={item.product.id} 
                  item={item} 
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </View>
            
            {/* Coupon Code */}
            <View style={styles.couponContainer}>
              <Text style={styles.couponTitle}>Add Coupon Code</Text>
              <TouchableOpacity style={styles.couponButton}>
                <Text style={styles.couponButtonText}>Apply Coupon</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          {/* Checkout Section */}
          <View style={styles.checkoutContainer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${calculateTotal().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>$4.99</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${(calculateTotal() * 0.08).toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${(calculateTotal() + 4.99 + (calculateTotal() * 0.08)).toFixed(2)}
                </Text>
              </View>
            </View>
            
            <Button 
              title="Proceed to Checkout" 
              onPress={handleCheckout} 
              fullWidth 
              loading={loading}
              icon={<ArrowRight size={18} color={COLORS.white} />}
              iconPosition="right"
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDescription}>
            Looks like you haven't added any products to your cart yet.
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Button 
                title="Start Shopping" 
                onPress={() => {}} 
                size="large" 
                variant="primary"
              />
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  itemsContainer: {
    padding: SPACING.m,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  couponTitle: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  couponButton: {
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
  },
  couponButtonText: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  checkoutContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  summaryContainer: {
    marginBottom: SPACING.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  summaryLabel: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  summaryValue: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  totalRow: {
    marginTop: SPACING.s,
    paddingTop: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  totalValue: {
    fontFamily: FONT.bold,
    fontSize: 18,
    color: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 20,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  emptyDescription: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});