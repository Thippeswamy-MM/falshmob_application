import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { SPACING } from '../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const VideoBanner = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % 3; // Cycle through 3 videos
      scrollViewRef.current?.scrollTo({
        x: currentIndex.current * screenWidth,
        animated: true
      });
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollContainer}
      >
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: 'https://videos.pexels.com/video-files/3917742/3917742-sd_960_506_25fps.mp4' }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
          />
        </View>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: 'https://videos.pexels.com/video-files/4407731/4407731-sd_640_360_30fps.mp4' }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
          />
        </View>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: 'https://videos.pexels.com/video-files/10667657/10667657-sd_960_506_25fps.mp4' }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
  },
  scrollContainer: {
    width: screenWidth,
  },
  videoContainer: {
    width: screenWidth,
    height: '100%',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoBanner; 