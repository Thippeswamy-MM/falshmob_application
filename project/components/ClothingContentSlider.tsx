import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { COLORS, FONT, SPACING, SHADOWS } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;

const clothingContent = [
  {
    id: '1',
    title: 'Keep it cool, keep it classic',
    description: 'Discover our latest summer collection featuring lightweight fabrics and vibrant colors.',
    image: 'https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Trendy Collections'
  },
  {
    id: '2',
    title: 'Casual Comfort',
    description: 'Stay comfortable and stylish with our new casual wear collection.',
    image: 'https://images.pexels.com/photos/871494/pexels-photo-871494.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Casual Wears'
  },
  {
    id: '3',
    title: 'Evening Elegance',
    description: 'Make a statement with our elegant evening wear collection.',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    category: 'Evening Wears'
  }
];

const ClothingContentSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  let currentIndex = 0;

  const startAutoScroll = () => {
    const scroll = () => {
      currentIndex = (currentIndex + 1) % clothingContent.length;
      scrollViewRef.current?.scrollTo({
        x: currentIndex * (CARD_WIDTH + SPACING.m),
        animated: true
      });
    };

    const interval = setInterval(scroll, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const cleanup = startAutoScroll();
    return cleanup;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dress how you want to be addressed..</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + SPACING.m}
        snapToAlignment="center"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {clothingContent.map((content, index) => (
          <Animated.View
            key={content.id}
            style={[
              styles.contentCard,
              { width: CARD_WIDTH }
            ]}
          >
            <Image source={{ uri: content.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.category}>{content.category}</Text>
              <Text style={styles.contentTitle}>{content.title}</Text>
              <Text style={styles.description}>{content.description}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.l,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  contentContainer: {
    paddingHorizontal: SPACING.m,
    paddingRight: SPACING.l,
  },
  contentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginRight: SPACING.m,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    padding: SPACING.m,
    backgroundColor: COLORS.white,
  },
  category: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  contentTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 20,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
    lineHeight: 20,
  },
});

export default ClothingContentSlider; 