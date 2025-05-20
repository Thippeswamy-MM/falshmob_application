import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '@/constants/theme';
import { Search as SearchIcon, X } from 'lucide-react-native';

import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { products, categories } from '@/data/products';

const popularSearches = [
  'Summer Collection', 'Dresses', 'T-Shirts', 'Jeans', 'Accessories', 
  'Jackets', 'Sale', 'New Arrivals'
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.length > 2) {
      setIsSearching(true);
      // Filter products based on search
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.brand.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search" showSearch={false} />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color={COLORS.textMedium} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.textLight}
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color={COLORS.textMedium} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {searchResults.length} results for "{searchQuery}"
          </Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.searchResultsList}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <ProductCard product={item} />
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No products found</Text>
                <Text style={styles.noResultsSubtext}>Try searching for different terms</Text>
              </View>
            }
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Popular Searches */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <View style={styles.popularSearchesContainer}>
              {popularSearches.map((term, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.tagButton}
                  onPress={() => handlePopularSearch(term)}
                >
                  <Text style={styles.tagText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Browse Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              renderItem={({ item }) => (
                <CategoryCard category={item} size="small" />
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: SPACING.m,
    backgroundColor: COLORS.white,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textDark,
    height: '100%',
  },
  clearButton: {
    padding: SPACING.xs,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.m,
  },
  resultsText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textMedium,
    marginVertical: SPACING.m,
  },
  searchResultsList: {
    paddingBottom: SPACING.xxxl,
  },
  productCardContainer: {
    width: '70%',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  noResultsText: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  noResultsSubtext: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
  section: {
    marginTop: SPACING.l,
    paddingHorizontal: SPACING.m,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
  },
  popularSearchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    backgroundColor: COLORS.backgroundAlt,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.s,
    marginBottom: SPACING.s,
  },
  tagText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  categoriesContainer: {
    paddingRight: SPACING.m,
  },
});