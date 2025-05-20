import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const WatchesCategory = () => {
  const products = [
    {
      id: '1',
      name: 'Classic Chronograph',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
      category: 'Luxury',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
      category: 'Smart',
    },
    {
      id: '3',
      name: 'Sports Watch',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0',
      category: 'Sports',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Watches Collection</Text>
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

export default WatchesCategory; 