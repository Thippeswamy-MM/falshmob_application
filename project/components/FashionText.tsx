import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FashionText = () => {
  const router = useRouter();

  const handleSocialPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.slogan}>REDEFINE YOUR</Text>
      <Text style={styles.highlight}>STYLE</Text>
      <Text style={styles.subText}>Fashion that speaks</Text>
      <Text style={styles.tagline}>Ready to make a statement?</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleSocialPress('https://www.facebook.com/flashmob')}
        >
          <FontAwesome name="facebook" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleSocialPress('https://www.instagram.com/flashmob')}
        >
          <FontAwesome name="instagram" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => handleSocialPress('https://www.youtube.com/@flashmob')}
        >
          <FontAwesome name="youtube-play" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.policyContainer}>
        <TouchableOpacity onPress={() => router.push('/privacy-policy')}>
          <Text style={styles.policyText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.policySeparator}>||</Text>
        <TouchableOpacity onPress={() => router.push('/returns-policy')}>
          <Text style={styles.policyText}>Returns Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.m,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  slogan: {
    fontFamily: FONT.bold,
    fontSize: 24,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  highlight: {
    fontFamily: FONT.bold,
    fontSize: 36,
    color: COLORS.primary,
    marginBottom: SPACING.m,
    textAlign: 'center',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  subText: {
    fontFamily: FONT.medium,
    fontSize: 22,
    color: COLORS.textDark,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: FONT.regular,
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    marginBottom: SPACING.l,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  iconButton: {
    padding: SPACING.s,
    marginHorizontal: SPACING.s,
  },
  policyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.l,
  },
  policyText: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textLight,
    textDecorationLine: 'underline',
  },
  policySeparator: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textLight,
    marginHorizontal: SPACING.s,
  },
});

export default FashionText; 