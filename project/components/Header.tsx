import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashmob Clothing</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('notifications' as any)}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('cart' as any)}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: SIZES.medium,
    padding: SIZES.base,
  },
});