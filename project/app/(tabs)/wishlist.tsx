import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { Link } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistScreen() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemoveFromWishlist = React.useCallback((id: string) => {
    if (!id) return;

    Alert.alert(
      "Remove from Wishlist",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            removeFromWishlist(id);
          },
          style: "destructive"
        }
      ]
    );
  }, [removeFromWishlist]);

  const handleAddToCart = React.useCallback((product: any) => {
    if (!product?.name) return;

    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart!`,
      [{ text: "OK" }]
    );
  }, []);

  const renderItem = React.useCallback(({ item }: { item: any }) => {
    if (!item?.id) return null;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveFromWishlist(item.id)}
        >
          <Heart size={20} color={COLORS.error} fill={COLORS.error} />
        </TouchableOpacity>
        
        <View style={styles.itemContent}>
          {item.images?.[0] && (
            <Image 
              source={{ uri: item.images[0] }} 
              style={styles.itemImage}
            />
          )}
          <View style={styles.itemDetails}>
            <View>
              <Text style={styles.brand}>{item.brand || 'Unknown Brand'}</Text>
              <Text style={styles.name}>{item.name || 'Unnamed Product'}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${(item.price || 0).toFixed(2)}</Text>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [handleRemoveFromWishlist, handleAddToCart]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Wishlist" showCart={true} />
      
      {wishlist?.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Heart size={64} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyDescription}>
            Save items you love to your wishlist and revisit them anytime.
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity>
              <Button 
                title="Discover Products" 
                onPress={() => {}} 
                size="large" 
                variant="primary"
              />
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.m,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  removeButton: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 120,
    height: 160,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  brand: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  name: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: SPACING.s,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  price: {
    fontFamily: FONT.bold,
    fontSize: 18,
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  originalPrice: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius / 2,
    alignItems: 'center',
  },
  addToCartText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 20,
    color: COLORS.textDark,
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  emptyDescription: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
});