import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

// Sample cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    price: 29.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 59.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100'
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
  },
  header: {
    fontSize: SIZES.extraLarge,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    marginBottom: SIZES.small,
    ...SHADOWS.light,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.base,
  },
  itemDetails: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  itemName: {
    fontSize: SIZES.medium,
    ...FONTS.bold,
    color: COLORS.black,
  },
  itemPrice: {
    fontSize: SIZES.font,
    ...FONTS.medium,
    color: COLORS.primary,
    marginTop: SIZES.base,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  quantityButton: {
    fontSize: SIZES.large,
    ...FONTS.bold,
    color: COLORS.primary,
    paddingHorizontal: SIZES.base,
  },
  quantity: {
    fontSize: SIZES.medium,
    ...FONTS.medium,
    marginHorizontal: SIZES.base,
  },
  removeButton: {
    padding: SIZES.base,
  },
  removeButtonText: {
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
  footer: {
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  total: {
    fontSize: SIZES.large,
    ...FONTS.bold,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    ...FONTS.bold,
  },
}); 