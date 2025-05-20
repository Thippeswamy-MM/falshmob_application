import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { COLORS, FONT, SPACING, SHADOWS } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const Popup = ({ visible, onClose, title, message }: PopupProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: screenWidth * 0.98,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: SPACING.l,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.large,
  },
  content: {
    marginBottom: SPACING.m,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: 20,
    color: COLORS.textDark,
    marginBottom: SPACING.m,
    textAlign: 'center',
    width: '100%',
  },
  message: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
    lineHeight: 20,
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: FONT.semiBold,
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default Popup; 