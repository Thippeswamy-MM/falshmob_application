import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const FootwearCategory = () => {
  // Sample footwear products data
  const products = [
    {
      id: '1',
      name: 'Running Shoes',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      category: 'Sports',
    },
    {
      id: '2',
      name: 'Leather Boots',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      category: 'Boots',
    },
    {
      id: '3',
      name: 'Casual Sneakers',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
      category: 'Sneakers',
    },
    // Add more products as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Footwear Collection</Text>
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

export default FootwearCategory; 