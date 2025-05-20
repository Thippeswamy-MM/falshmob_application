import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const MenCategory = () => {
  // Sample men's products data
  const products = [
    {
      id: '1',
      name: 'Classic White Shirt',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
      category: 'Shirts',
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      category: 'Bottoms',
    },
    {
      id: '3',
      name: 'Casual Blazer',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0',
      category: 'Outerwear',
    },
    // Add more products as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Men's Collection</Text>
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

export default MenCategory; 