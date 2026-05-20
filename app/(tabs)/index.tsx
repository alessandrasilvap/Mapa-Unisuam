import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { useSettings } from '../../hooks/useSettings';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


const { width } = Dimensions.get('window');


interface AppIcon {
  id: string;
  name: string;
  icon: string;
  route: string;
  description: string;
}


export default function HomeScreen() {
  const { colors, vibrate, isDark } = useSettings();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const appIcons: AppIcon[] = [
    {
      id: 'configuracao',
      name: 'Personalizar',
      icon: 'color-palette',
      route: '/configuracoes',
      description: 'Personalizar tema\ne cores'
    },
    {
      id: 'busca',
      name: 'Buscar',
      icon: 'search',
      route: '/mapa',
      description: 'Buscar salas no mapa'
    },
    {
      id: 'sobre',
      name: 'Sobre',
      icon: 'information-circle',
      route: '/detalhes',
      description: 'Informações do app'
    }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //"Ouvinte" do Firebase para saber o status do login em tempo real
  useEffect(() => {
    //onAuthStateChanged retorna uma função 'unsubscribe'
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //Usuário está logado
        setIsLoggedIn(true);
      } else {
        //Usuário não está logado
        setIsLoggedIn(false);
      }
    });

    //Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []); //O array vazio [] garante que isso rode apenas uma vez

  //Função de clique no ícone
  const handleUserAction = () => {
    vibrate();
    if (isLoggedIn) {
      //Se logado, mostra o Alerta
      Alert.alert(
        "Usuário Conectado",
        "Você já está devidamente logado no aplicativo."
      );
    } else {
      //Se não logado, vai para o login
      router.push('/login');
    }
  };

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.text + '80',
      textAlign: 'center',
      lineHeight: 20,
    },
    appName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 2,
    },
    appDescription: {
      fontSize: 11,
      color: colors.text + '80',
      textAlign: 'center',
      lineHeight: 14,
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    statusLoggedIn: {
      backgroundColor: colors.primary,
    },
    statusNotLoggedIn: {
      backgroundColor: colors.primary,
    },
  });

  return (
    <View style={[dynamicStyles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor={colors.background}
        translucent={true} 
      />

      {/*Botão de Usuário Inteligente*/}
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={styles.userButton}
          onPress={handleUserAction}
          activeOpacity={1}
        >
          <FontAwesome5 
            //O ícone agora muda com base no estado do Firebase
            name={isLoggedIn ? "user-check" : "user-times"} 
            size={25} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      </View>

      {/*Conteúdo principal*/}
      <View style={styles.scrollContent}>
        {/*Hero Section com introdução*/}
        <View style={styles.heroSection}>
          <View style={dynamicStyles.logoContainer}>
            <Ionicons name="school" size={60} color={colors.primary} />
          </View>

          <Text style={dynamicStyles.heroTitle}>Sistema de Navegação</Text>

          <Text style={dynamicStyles.heroSubtitle}>
            Explore o mapa da faculdade e encontre facilmente qualquer sala ou ambiente
          </Text>
        </View>

        {/*Grid de ícones como home de celular*/}
        <View style={styles.appsGrid}>
          {appIcons.map((app) => (
            <Link key={app.id} href={app.route as any} asChild>
              <TouchableOpacity 
                style={styles.appIcon}
                onPress={() => vibrate()}
                activeOpacity={1}
              >
                 {/*Cor do ícone vindo do tema*/}
                 <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
                   <Ionicons name={app.icon as any} size={32} color={colors.primary} />
                 </View>

                <Text style={dynamicStyles.appName}>{app.name}</Text>

                <Text style={dynamicStyles.appDescription}>{app.description}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>

      {/*BottomNav fixo no final*/}
      <BottomNav />
    </View>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  userButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statusContainer: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width:40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  statusLoggedIn: {
    backgroundColor: '#4CAF50',
  },
  statusNotLoggedIn: {
    backgroundColor: '#F44336',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  appIcon: {
    width: (width - 80) / 3, //3 colunas com espaçamento
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 35, // Totalmente redondo
    backgroundColor: '#E0E0E0', // Cinza claro
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  appDescription: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
  },
});