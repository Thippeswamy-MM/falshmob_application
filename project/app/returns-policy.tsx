import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import Header from '@/components/Header';

const ReturnsPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Returns Policy</Text>
          
          <Text style={styles.sectionTitle}>1. Return Window</Text>
          <Text style={styles.text}>
            You have 30 days from the date of delivery to initiate a return. All items must be in their original condition with tags attached.
          </Text>

          <Text style={styles.sectionTitle}>2. Return Process</Text>
          <Text style={styles.text}>
            To initiate a return, please contact our customer service team. You will receive a return label and instructions for sending back your items.
          </Text>

          <Text style={styles.sectionTitle}>3. Refund Policy</Text>
          <Text style={styles.text}>
            Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds will be issued to your original payment method.
          </Text>

          <Text style={styles.sectionTitle}>4. Exchanges</Text>
          <Text style={styles.text}>
            We offer free exchanges for different sizes or colors of the same item. Please note that exchanges are subject to availability.
          </Text>

          <Text style={styles.sectionTitle}>5. Return Shipping</Text>
          <Text style={styles.text}>
            Return shipping is free for items that arrived damaged or defective. For other returns, shipping costs will be deducted from your refund.
          </Text>

          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about our returns policy, please contact us at returns@flashmob.com
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

export default ReturnsPolicy; 