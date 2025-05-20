import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '@/constants/theme';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FLASHMOB</Text>
        <Text style={styles.subtitle}>Engineered for Elegance!!</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart-outline" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.m,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginTop: SPACING.m,
    paddingLeft: 10,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 28,
    color: COLORS.primary,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    transform: [{ scale: 1 }],
    paddingRight:18,
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.textMedium,
    marginTop: -15,
    letterSpacing: 0.5,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingLeft: -40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.l,
  },
  iconButton: {
    marginLeft: SPACING.m,
    padding: SPACING.xs,
  },
});

export default Header;