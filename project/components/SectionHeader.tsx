import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SPACING } from '@/constants/theme';
import { Link } from 'expo-router';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  onViewAllPress?: () => void;
}

const SectionHeader = ({
  title,
  showViewAll = true,
  viewAllLink = '',
  onViewAllPress,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showViewAll && (
        viewAllLink ? (
          <Link href={viewAllLink} asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={onViewAllPress}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  title: {
    fontFamily: FONT.semiBold,
    fontSize: 24,
    color: COLORS.textDark,
  },
  viewAll: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default SectionHeader;