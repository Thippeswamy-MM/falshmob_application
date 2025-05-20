import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Filter, ChevronDown, Check } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { categories, getProductsByCategory } from '@/data/products';
import { Product } from '@/types';

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'newest', label: 'Newest First' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'discount', label: 'Biggest Discount' }
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find(cat => cat.id === id);
  const products = getProductsByCategory(id || '');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleSortPress = () => {
    setSortModalVisible(true);
  };

  const handleSortSelect = (option: typeof sortOptions[0]) => {
    setSelectedSort(option);
    setSortModalVisible(false);
    
    // Sort the products
    const sorted = [...products];
    switch (option.id) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'discount':
        sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      // Default to most popular
      default:
        sorted.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(sorted);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={category?.name || 'Products'} 
        showBack 
        showSearch 
        showFilter
        onFilterPress={handleFilterPress}
      />
      
      {/* Sort bar */}
      <View style={styles.sortBar}>
        <Text style={styles.resultCount}>{filteredProducts.length} Results</Text>
        
        <TouchableOpacity style={styles.sortButton} onPress={handleSortPress}>
          <Text style={styles.sortButtonText}>Sort by: {selectedSort.label}</Text>
          <ChevronDown size={16} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>
      
      {/* Products grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsGrid}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <ProductCard product={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found in this category.</Text>
          </View>
        }
      />
      
      {/* Sort modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setSortModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setSortModalVisible(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
            
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={() => handleSortSelect(option)}
              >
                <Text style={[
                  styles.optionText,
                  selectedSort.id === option.id && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
                
                {selectedSort.id === option.id && (
                  <Check size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Filter modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={[styles.modalContainer, styles.filterModalContainer]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Products</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
            
            {/* Filter by price */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                {/* Price range filter would go here */}
                <Text style={styles.filterText}>Price filters coming soon</Text>
              </View>
            </View>
            
            {/* Filter by size */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Size</Text>
              <View style={styles.filtersRow}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <TouchableOpacity key={size} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Filter by color */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Color</Text>
              <View style={styles.filtersRow}>
                {['Black', 'White', 'Blue', 'Red', 'Green'].map((color) => (
                  <TouchableOpacity key={color} style={styles.filterChip}>
                    <Text style={styles.filterChipText}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Apply filters button */}
            <View style={styles.applyButtonContainer}>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  sortBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  resultCount: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
  },
  sortButtonText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
    marginRight: SPACING.xs,
  },
  productsGrid: {
    padding: SPACING.s,
    paddingBottom: SPACING.xxxl,
  },
  productCardContainer: {
    width: '50%',
  },
  emptyContainer: {
    padding: SPACING.l,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    padding: SPACING.l,
    maxHeight: '70%',
  },
  filterModalContainer: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  modalTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
  },
  modalClose: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.primary,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textDark,
  },
  selectedOptionText: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  filterSection: {
    marginBottom: SPACING.l,
  },
  filterSectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  priceRangeContainer: {
    padding: SPACING.m,
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  filterText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
    marginRight: SPACING.s,
    marginBottom: SPACING.s,
  },
  filterChipText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  applyButtonContainer: {
    paddingTop: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.white,
  },
});