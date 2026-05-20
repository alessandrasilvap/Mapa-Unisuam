import React from 'react';
import { Pressable, PressableProps, TextStyle, ViewStyle } from 'react-native';
import { useAppTheme } from './ThemeContext';

interface VibratingPressableProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | (ViewStyle | TextStyle)[];
}

export const VibratingPressable: React.FC<VibratingPressableProps> = ({
  children,
  onPress,
  style,
  ...props
}) => {
  const { vibrate } = useAppTheme();

  const handlePress = (event: any) => {
    vibrate();
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      style={style}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Pressable>
  );
};



