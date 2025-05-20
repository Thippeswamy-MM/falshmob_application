import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { LogOut, Package, Heart, MapPin, CreditCard, Settings, CircleHelp as HelpCircle, ChevronRight, User as UserIcon } from 'lucide-react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '@/constants/theme';

import Header from '@/components/Header';
import { user, orders } from '@/data/user';

const ProfileMenuItem = ({ 
  icon, 
  title, 
  onPress,
  showChevron = true
}: { 
  icon: React.ReactNode, 
  title: string, 
  onPress: () => void,
  showChevron?: boolean
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    {showChevron && <ChevronRight size={20} color={COLORS.textLight} />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Profile" showBack={false} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <UserIcon size={40} color={COLORS.textMedium} />
            </View>
          )}
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Orders</Text>
          {orders.length > 0 ? (
            <View>
              {orders.map((order, index) => (
                <TouchableOpacity key={order.id} style={styles.orderItem} activeOpacity={0.7}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>Order #{order.id}</Text>
                    <View style={[
                      styles.statusBadge,
                      {
                        backgroundColor: 
                          order.status === 'delivered' ? COLORS.success + '20' :
                          order.status === 'shipped' ? COLORS.primary + '20' :
                          order.status === 'processing' ? COLORS.warning + '20' :
                          COLORS.textLight + '20'
                      }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        {
                          color: 
                            order.status === 'delivered' ? COLORS.success :
                            order.status === 'shipped' ? COLORS.primary :
                            order.status === 'processing' ? COLORS.warning :
                            COLORS.textMedium
                        }
                      ]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderDate}>{order.date}</Text>
                    <Text style={styles.orderTotal}>${order.totalPrice.toFixed(2)}</Text>
                  </View>
                  
                  {order.items.map((item, i) => (
                    <View key={i} style={styles.orderProduct}>
                      <Image source={{ uri: item.product.images[0] }} style={styles.productImage} />
                      <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
                        <Text style={styles.productVariant}>
                          {item.color.name} · Size {item.size} · Qty {item.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}
                  
                  <TouchableOpacity style={styles.trackButton} activeOpacity={0.7}>
                    <Text style={styles.trackButtonText}>Track Order</Text>
                    <ChevronRight size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptySection}>
              <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
            </View>
          )}
        </View>
        
        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.menuContainer}>
            <ProfileMenuItem 
              icon={<Package size={20} color={COLORS.textMedium} />} 
              title="My Orders" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<Heart size={20} color={COLORS.textMedium} />} 
              title="Wishlist" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<MapPin size={20} color={COLORS.textMedium} />} 
              title="Addresses" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<CreditCard size={20} color={COLORS.textMedium} />} 
              title="Payment Methods" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<Settings size={20} color={COLORS.textMedium} />} 
              title="Settings" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<HelpCircle size={20} color={COLORS.textMedium} />} 
              title="Help & Support" 
              onPress={() => {}}
            />
            <ProfileMenuItem 
              icon={<LogOut size={20} color={COLORS.error} />} 
              title="Logout" 
              onPress={() => {}}
              showChevron={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.m,
  },
  name: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  email: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  editButton: {
    backgroundColor: COLORS.backgroundAlt,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius / 2,
  },
  editButtonText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  menuTitle: {
    flex: 1,
    fontFamily: FONT.medium,
    fontSize: 16,
    color: COLORS.textDark,
  },
  orderItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.m,
    padding: SPACING.m,
    marginHorizontal: SPACING.m,
    ...SHADOWS.small,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  orderNumber: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  statusBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    fontFamily: FONT.medium,
    fontSize: 12,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.m,
  },
  orderDate: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
  },
  orderTotal: {
    fontFamily: FONT.semiBold,
    fontSize: 16,
    color: COLORS.primary,
  },
  orderProduct: {
    flexDirection: 'row',
    marginBottom: SPACING.s,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius / 2,
    marginRight: SPACING.s,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textDark,
  },
  productVariant: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: COLORS.textMedium,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
    marginTop: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  trackButtonText: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 4,
  },
  emptySection: {
    backgroundColor: COLORS.white,
    padding: SPACING.l,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: SPACING.m,
    ...SHADOWS.small,
  },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
});