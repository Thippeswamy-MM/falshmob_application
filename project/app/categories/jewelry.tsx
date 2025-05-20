import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const JewelryCategory = () => {
  const products = [
    {
      id: '1',
      name: 'Silver Necklace',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
      category: 'Necklaces',
    },
    {
      id: '2',
      name: 'Gold Earrings',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59',
      category: 'Earrings',
    },
    {
      id: '3',
      name: 'Diamond Ring',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
      category: 'Rings',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Jewelry Collection</Text>
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

export default JewelryCategory; 