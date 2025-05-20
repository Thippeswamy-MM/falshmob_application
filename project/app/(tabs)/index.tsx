import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity, 
  StatusBar, 
  Platform,
  Dimensions 
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

import Header from '@/components/Header';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import VideoBanner from '@/components/VideoBanner';
import Popup from '@/components/Popup';
import AnnouncementBar from '@/components/AnnouncementBar';
import Categories from '@/components/Categories';
import HotRightNow from '@/components/HotRightNow';
import FreeDelivery from '@/components/FreeDelivery';
import FashionText from '@/components/FashionText';
import CustomerReviews from '@/components/CustomerReviews';
import ClothingContentSlider from '@/components/ClothingContentSlider';

import { getFeaturedProducts, getNewArrivals } from '@/data/products';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Header />
      <AnnouncementBar />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Banner Slider */}
        <View style={styles.fullWidthSection}>
          <BannerSlider />
        </View>

        {/* Categories */}
        <Categories />

        {/* Hot Right Now */}
        <HotRightNow />

        {/* Video Banner */}
        <View style={styles.fullWidthSection}>
          <VideoBanner />
        </View>
        
        {/* Featured Products */}
        <View style={styles.section}>
          <SectionHeader 
            title="Featured Products:" 
            viewAllLink="/featured" 
          />
          <FlatList
            data={featuredProducts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
            renderItem={({ item }) => (
              <ProductCard product={item} size="small" />
            )}
            style={styles.flatList}
            bounces={true}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={5}
          />
        </View>
        
        {/* New Arrivals */}
        <View style={styles.section}>
          <SectionHeader 
            title="New Arrivals:" 
            viewAllLink="/new-arrivals" 
          />
          <FlatList
            data={newArrivals}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
            renderItem={({ item }) => (
              <ProductCard product={item} size="small" />
            )}
            style={styles.flatList}
            bounces={true}
          />
        </View>

        {/* Customer Reviews */}
        <CustomerReviews />

        {/* Clothing Content Slider */}
        <ClothingContentSlider />

        {/* Free Delivery */}
        <FreeDelivery />

        {/* Fashion Text */}
        <FashionText />
      </ScrollView>

      <Popup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        title="Welcome to FLASHMOB!"
        message="Discover our latest collection of trendy fashion items. Shop now and get up to 50% off on selected items!"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.l,
  },
  fullWidthSection: {
    width: '100%',
    marginBottom: 0,
  },
  videoScrollView: {
    width: screenWidth,
  },
  section: {
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.l,
    ...SHADOWS.medium,
  },
  productsContainer: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.s,
  },
  flatList: {
    height: 260,
    width: '100%',
  },
});