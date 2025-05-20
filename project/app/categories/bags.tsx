import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const BagsCategory = () => {
  const products = [
    {
      id: '1',
      name: 'Leather Tote Bag',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      category: 'Totes',
    },
    {
      id: '2',
      name: 'Crossbody Bag',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
      category: 'Crossbody',
    },
    {
      id: '3',
      name: 'Backpack',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      category: 'Backpacks',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Bags Collection</Text>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.m,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 24,
    color: COLORS.textDark,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  productGrid: {
    paddingBottom: SPACING.l,
  },
});

export default BagsCategory; 