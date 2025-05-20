import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const WomenCategory = () => {
  // Sample women's products data
  const products = [
    {
      id: '1',
      name: 'Floral Summer Dress',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      category: 'Dresses',
    },
    {
      id: '2',
      name: 'Casual Blouse',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8',
      category: 'Tops',
    },
    {
      id: '3',
      name: 'High-Waist Jeans',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
      category: 'Bottoms',
    },
    // Add more products as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Women's Collection</Text>
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

export default WomenCategory; 