import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support.
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            We use the information we collect to process your orders, communicate with you about your orders, and provide customer support.
          </Text>

          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.text}>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.
          </Text>

          <Text style={styles.sectionTitle}>4. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time.
          </Text>

          <Text style={styles.sectionTitle}>5. Security</Text>
          <Text style={styles.text}>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </Text>

          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us at support@flashmob.com
          </Text>
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
    fontSize: 28,
    color: COLORS.textDark,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  text: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textDark,
    lineHeight: 24,
    marginBottom: SPACING.m,
  },
});

export default PrivacyPolicy; 