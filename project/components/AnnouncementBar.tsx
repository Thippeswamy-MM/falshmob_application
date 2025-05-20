import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const AnnouncementBar = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startScrolling = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -screenWidth,
            duration: 15000,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: screenWidth,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startScrolling();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        <Text style={styles.text}>50% OFF on all products - Explore Now!</Text>
        <Text style={styles.text}>50% OFF on all products - Explore Now!</Text>
        <Text style={styles.text}>50% OFF on all products - Explore Now!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 25,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
    paddingBottom: -10,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONT.semiBold,
    fontSize: 13,
    color: COLORS.white,
    marginHorizontal: SPACING.l,
    textAlign: 'center',
  },
});

export default AnnouncementBar; 