import BotaoCustomizado from '@/components/buttons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../hooks/useSettings';


export default function TelaDetalhes() {
  const { colors } = useSettings();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.container}>
        <Text style={[styles.text, { color: colors.text }]}>Tela de Detalhes</Text>

        <BotaoCustomizado title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  text: { 
    fontSize: 24, 
    marginBottom: 16,
    textAlign: 'center',
  },
});