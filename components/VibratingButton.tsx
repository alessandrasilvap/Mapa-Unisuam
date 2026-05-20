import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useAppTheme } from './ThemeContext';

interface VibratingButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const VibratingButton: React.FC<VibratingButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  style,
  ...props
}) => {
  const { colors, vibrate } = useAppTheme();

  const handlePress = (event: any) => {
    vibrate();
    if (onPress) {
      onPress(event);
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, { backgroundColor: colors.primary }];
      case 'secondary':
        return [...baseStyle, { backgroundColor: colors.primaryLight }];
      case 'outline':
        return [...baseStyle, { 
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        }];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, { color: '#FFFFFF' }];
      case 'secondary':
        return [...baseStyle, { color: colors.text }];
      case 'outline':
        return [...baseStyle, { color: colors.primary }];
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      {...props}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});



