import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { ThemeColor, useAppTheme } from '../components/ThemeContext';


export default function Configuracoes() {
  const {
    isDark,
    themeColor,
    vibrationEnabled,
    colors,
    toggleTheme,
    setThemeColor,
    toggleVibration,
    vibrate,
  } = useAppTheme();
  
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = (callback: () => void) => {
    vibrate();
    callback();
  };

  //Cores reaproveitáveis para os Switches
  const trackFalse = isDark ? '#4A4A4A' : '#E0E0E0';
  const thumbActive = '#FFFFFF';
  const thumbInactive = isDark ? '#CCCCCC' : '#666666';

  //Componente CustomSwitch alternativo sem halo
  const CustomSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => {
    const [animatedValue] = React.useState(new Animated.Value(value ? 1 : 0));

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [value, animatedValue]);

    const thumbTranslateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 22], //Ajuste baseado no tamanho do switch
    });

    return (
      <TouchableOpacity
        onPress={() => handlePress(onToggle)}
        style={styles.customSwitchContainer}
        activeOpacity={0.7}
      >
        <View style={[
          styles.customSwitchTrack,
          { backgroundColor: value ? colors.primary : trackFalse }
        ]}>
          <Animated.View
            style={[
              styles.customSwitchThumb,
              {
                backgroundColor: value ? thumbActive : thumbInactive,
                transform: [{ translateX: thumbTranslateX }],
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const colorOptions: { color: ThemeColor; name: string; hex: string; fruit: string }[] = [
    { color: 'purple', name: 'Roxo', hex: '#7e57c2', fruit: '🍇' },
    { color: 'blue', name: 'Azul', hex: '#2196F3', fruit: '🫐' },
    { color: 'red', name: 'Vermelho', hex: '#F44336', fruit: '🍓' },
    { color: 'yellow', name: 'Amarelo', hex: '#FFC107', fruit: '🍌' },
    { color: 'green', name: 'Verde', hex: '#4CAF50', fruit: '🥝' },
  ];

  const SettingItem = ({
    icon,
    title,
    onPress,
    rightComponent,
  }: {
    icon: string;
    title: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableWithoutFeedback
      onPress={onPress ? () => handlePress(onPress) : undefined}
      disabled={!onPress}
    >
      <Animated.View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.settingLeft}>
          <Ionicons name={icon as any} size={24} color={colors.primary} />
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        </View>
        {rightComponent}
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor="#fff" //Cor do header estática (branca)
        translucent={true} 
      />

      {/*Header simples*/}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableWithoutFeedback onPress={() => { vibrate(); router.push('/'); }}>
          <View style={[styles.backButton, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="home" size={24} color={colors.primary} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Configurações</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/*Cor do Tema*/}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Cor do Tema</Text>
          <View style={styles.colorGrid}>
            {colorOptions.map((option) => (
              <TouchableWithoutFeedback
                key={option.color}
                onPress={() => handlePress(() => setThemeColor(option.color))}
              >
                <View
                  style={[
                    styles.colorOption,
                    {
                      backgroundColor: option.hex,
                      borderColor: themeColor === option.color ? colors.text : 'transparent',
                      borderWidth: themeColor === option.color ? 3 : 0,
                    },
                  ]}
                >
                  <Text style={styles.fruitIcon}>{option.fruit}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        {/*Vibração*/}
        <SettingItem
          icon="phone-portrait-outline"
          title="Vibração por Toque"
          rightComponent={<CustomSwitch value={vibrationEnabled} onToggle={toggleVibration} />}
        />

        {/*Modo Claro/Escuro*/}
        <SettingItem
          icon={isDark ? "moon" : "sunny"}
          title={isDark ? "Modo Escuro" : "Modo Claro"}
          rightComponent={<CustomSwitch value={isDark} onToggle={toggleTheme} />}
        />
      </ScrollView>

      {/*BottomNav*/}
      <BottomNav />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  scrollView: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  settingLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  settingTitle: { 
    fontSize: 16, 
    fontWeight: '500', 
    marginLeft: 12 
  },
  section: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 12 
  },
  colorGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  colorOption: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fruitIcon: { 
    fontSize: 20 
  },
  customSwitchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customSwitchTrack: {
    width: 45,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    position: 'relative',
  },
  customSwitchThumb: {
    width: 20,
    height: 20,
    borderRadius: 13,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});