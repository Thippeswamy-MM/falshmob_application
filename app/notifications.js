import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const notifications = [
  {
    id: '1',
    title: 'New Arrival',
    message: 'Check out our latest collection!',
    time: '2 hours ago'
  },
  {
    id: '2',
    title: 'Special Offer',
    message: 'Get 20% off on selected items',
    time: '1 day ago'
  },
  // Add more notifications as needed
];

export default function Notifications() {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.medium,
  },
  header: {
    fontSize: SIZES.extraLarge,
    ...FONTS.bold,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
  },
  notificationItem: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.base,
    marginBottom: SIZES.small,
    ...SHADOWS.light,
  },
  title: {
    fontSize: SIZES.medium,
    ...FONTS.bold,
    color: COLORS.black,
  },
  message: {
    fontSize: SIZES.font,
    ...FONTS.regular,
    color: COLORS.gray,
    marginTop: SIZES.base,
  },
  time: {
    fontSize: SIZES.small,
    ...FONTS.regular,
    color: COLORS.lightGray,
    marginTop: SIZES.base,
  },
}); 