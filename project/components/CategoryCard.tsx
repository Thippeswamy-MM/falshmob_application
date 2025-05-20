import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONT, SHADOWS, SIZES, SPACING } from '@/constants/theme';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
}

const CategoryCard = ({ category, size = 'medium' }: CategoryCardProps) => {
  const cardSize = {
    small: { width: 120, height: 120 },
    medium: { width: 160, height: 200 },
    large: { width: 200, height: 250 },
  };

  return (
    <Link href={`/category/${category.id}`} asChild>
      <TouchableOpacity style={[styles.container, SHADOWS.medium, cardSize[size]]}>
        <Image source={{ uri: category.image }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{category.name}</Text>
          {category.description && size !== 'small' && (
            <Text style={styles.description}>{category.description}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    margin: SPACING.s,
    backgroundColor: COLORS.backgroundAlt,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING.m,
  },
  name: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 4,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default CategoryCard;