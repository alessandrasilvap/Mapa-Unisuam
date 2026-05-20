import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppTheme } from './ThemeContext';

interface ProfileActionButtonProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  variant?: 'default' | 'danger' | 'success';
  disabled?: boolean;
}

const ProfileActionButton = memo<ProfileActionButtonProps>(({
  icon,
  title,
  subtitle,
  onPress,
  variant = 'default',
  disabled = false,
}) => {
  const { colors, vibrate } = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: '#FF4444',
          textColor: '#FF4444',
          backgroundColor: 'rgba(255, 68, 68, 0.1)',
        };
      case 'success':
        return {
          iconColor: '#4CAF50',
          textColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
        };
      default:
        return {
          iconColor: colors.primary,
          textColor: colors.text,
          backgroundColor: colors.background,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const handlePress = () => {
    if (!disabled) {
      vibrate();
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: colors.border,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={icon as any} 
          size={22} 
          color={variantStyles.iconColor} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: variantStyles.textColor }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.text + '80' }]}>
            {subtitle}
          </Text>
        )}
      </View>
      
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={variantStyles.iconColor + '60'} 
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
});

ProfileActionButton.displayName = 'ProfileActionButton';

export default ProfileActionButton;


