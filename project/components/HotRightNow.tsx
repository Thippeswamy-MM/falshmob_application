import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';

const HotRightNow = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hot Right Now:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.textDark,
    paddingHorizontal: SPACING.m,
  },
});

export default HotRightNow; 