import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
// AppColors removido - usando cores dinâmicas
import { useAppTheme } from './ThemeContext';


type BotaoCustomizadoProps = {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>; // Estilo para o container do botão (o Pressable)
    textStyle?: StyleProp<TextStyle>; // Estilo para o texto dentro do botão
    disabled?: boolean;
};


const BotaoCustomizado: React.FC<BotaoCustomizadoProps> = ({ title, onPress, style, textStyle, disabled }) => {
  const { vibrate } = useAppTheme();

  const handlePress = () => {
    vibrate();
    onPress();
  };

  return (
    // Agora o 'style' é aplicado diretamente ao Pressable, que é a área clicável.
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        disabled && styles.buttonDisabled, // Estilo quando desabilitado
        pressed && styles.buttonPressed, // Estilo quando pressionado
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
    <Text style={[styles.text, textStyle]}>
        {title}
    </Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7e57c2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    shadowColor: '#7e57c2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonPressed: {
    opacity: 0.8,
  }
});


export default BotaoCustomizado;