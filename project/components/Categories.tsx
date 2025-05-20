import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { COLORS, FONT, SPACING, SHADOWS } from '@/constants/theme';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.3;
const ITEM_HEIGHT = ITEM_WIDTH * 1.1;

const categories = [
  {
    id: '1',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    route: '/categories/women',
  },
  {
    id: '2',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
    route: '/categories/men',
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    route: '/categories/accessories',
  },
  {
    id: '4',
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    route: '/categories/footwear',
  },
  {
    id: '5',
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    route: '/categories/bags',
  },
  {
    id: '6',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
    route: '/categories/jewelry',
  },
  {
    id: '7',
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    route: '/categories/watches',
  },
  {
    id: '8',
    name: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8',
    route: '/categories/sunglasses',
  }
] as const;

const Categories = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => router.push(category.route)}
          >
            <Image source={{ uri: category.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
    paddingHorizontal: SPACING.m,
  },
  scrollContent: {
    paddingHorizontal: SPACING.m,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: SPACING.s,
    borderRadius: 8,
    overflow: 'hidden',
    ...SHADOWS.medium,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: SPACING.xs,
  },
  categoryName: {
    fontFamily: FONT.semiBold,
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default Categories; 