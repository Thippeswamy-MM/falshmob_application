import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  Platform
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, SPACING } from '@/constants/theme';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';
import Header from '@/components/Header';

export default function SummerCollectionScreen() {
  const router = useRouter();
  const summerProducts = getProductsByCategory('cat4'); // Using cat4 for dresses which includes summer collection

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      
      <SafeAreaView style={styles.safeArea}>
        <Header 
          showBack
          onBackPress={() => router.back()}
        />

        <FlatList
          data={summerProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.productsContainer}
          renderItem={({ item }) => (
            <View style={styles.productWrapper}>
              <ProductCard product={item} size="small" />
            </View>
          )}
          style={styles.flatList}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  productsContainer: {
    paddingHorizontal: SPACING.s,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.s,
    flexGrow: 1,
  },
  productWrapper: {
    width: '50%',
    padding: SPACING.s,
  },
  flatList: {
    flex: 1,
  },
}); 