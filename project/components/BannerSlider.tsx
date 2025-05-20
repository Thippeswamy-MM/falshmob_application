import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Dimensions, 
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent 
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import { Link } from 'expo-router';

const banners = [
  {
    id: 'banner1',
    title: 'Summer Collection',
    subtitle: 'Up to 50% off',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    link: '/category/summer-collection'
  },
  {
    id: 'banner2',
    title: 'New Arrivals',
    subtitle: 'Check out the latest trends',
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    link: '/new-arrivals'
  },
  {
    id: 'banner3',
    title: 'Accessories',
    subtitle: 'Complete your look',
    image: 'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg',
    link: '/category/cat6'
  },
];

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - (SPACING.l * 2);
const DOT_SIZE = 8;
const DOT_SPACING = 8;

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / BANNER_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * BANNER_WIDTH,
      animated: true,
    });
    setActiveIndex(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [activeIndex]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollToIndex(nextIndex);
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH}
        snapToAlignment="center"
        onTouchStart={stopAutoScroll}
        onTouchEnd={startAutoScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner) => (
          <Link key={banner.id} href={banner.link} asChild>
            <TouchableOpacity activeOpacity={0.9} style={styles.bannerContainer}>
              <Image source={{ uri: banner.image }} style={styles.bannerImage} />
              <View style={styles.textOverlay}>
                <Text style={styles.subtitle}>{banner.subtitle}</Text>
                <Text style={styles.title}>{banner.title}</Text>
                <View style={styles.shopButton}>
                  <Text style={styles.shopButtonText}>Shop Now</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
      
      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.paginationDotActive,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.l,
  },
  scrollContent: {
    paddingHorizontal: SPACING.l,
  },
  bannerContainer: {
    width: BANNER_WIDTH,
    height: 200,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    position: 'relative',
    marginRight: SPACING.m,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.m,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.white,
    marginBottom: SPACING.s,
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  shopButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
    alignSelf: 'flex-start',
    marginTop: SPACING.s,
  },
  shopButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  paginationDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: COLORS.textLight,
    marginHorizontal: DOT_SPACING / 2,
  },
  paginationDotActive: {
    backgroundColor: COLORS.primary,
    width: DOT_SIZE * 2,
  },
});

export default BannerSlider;