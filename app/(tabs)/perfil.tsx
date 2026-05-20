import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { useAppTheme } from '../../components/ThemeContext';
import { auth, db } from '../../firebaseConfig'; //<-- Apenas auth e db
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore'; //<-- Apenas doc e getDoc


const { width } = Dimensions.get('window');


//Tipo de dados
type UserDataState = {
  email: string | null;
  name: string;
  phone: string;
  uid: string | null;
};


export default function TelaPerfil() {
  const [userData, setUserData] = useState<UserDataState>({
    email: "Carregando...",
    name: "Carregando...",
    phone: "Carregando...",
    uid: null,
  });
  
  //Estados de avatar e upload REMOVIDOS
  const { isDark, toggleTheme, vibrate, colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  
  //Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  //useEffect (busca dados do Auth e Firestore)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(prevData => ({
          ...prevData,
          email: user.email,
          uid: user.uid,
        }));
        
        //Função para buscar dados (nome e telefone)
        const fetchUserData = async (userId: string) => {
          try {
            const userDocRef = doc(db, "users", userId); 
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              
              setUserData(prevData => ({
                ...prevData,
                name: `${data.firstname} ${data.lastname}`, 
                phone: data.phone,
              }));

            } else {
              console.log("Documento não encontrado no Firestore!");
              setUserData(prevData => ({
                ...prevData,
                name: "Nome não cadastrado",
                phone: "Telefone não cadastrado",
              }));
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            //Lidar com erro (ex: mostrar "Não foi possível carregar")
            setUserData(prevData => ({
                ...prevData,
                name: "Erro ao carregar",
                phone: "Erro ao carregar",
              }));
          }
        };
        fetchUserData(user.uid);

      } else {
        //Se não há usuário, volta para o login
        router.replace('/login');
      }
    });

    //Animações de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    //Limpa o "ouvinte" ao desmontar o componente
    return () => unsubscribe();
  }, [router]);

  //Função para o alerta ao clicar no avatar
  const handleAvatarPress = () => {
    triggerHaptic('medium');
    Alert.alert(
      "Função Indisponível",
      "No momento, a função de alterar a foto de perfil não está disponível."
    );
  };

  //Função para feedback háptico
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (Platform.OS !== 'web') {
      const duration = type === 'light' ? 50 : type === 'medium' ? 100 : 200;
      Vibration.vibrate(duration);
    }
  };

  //Componente OptionItem (sem alteração)
  const OptionItem = ({ icon, label, color = "#fff", rightElement, onPress, subtitle }: {
    icon: string;
    label: string;
    color?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    subtitle?: string;
  }) => {
    const itemScaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      triggerHaptic('light');
      Animated.spring(itemScaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(itemScaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
      if (onPress) {
        triggerHaptic('medium');
        onPress();
      }
    };

    return (
      <Animated.View style={{ 
        transform: [{ scale: itemScaleAnim }, { translateY: slideAnim }], 
        width: '100%',
        opacity: fadeAnim,
      }}>
        <TouchableOpacity
          style={styles.optionRow}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={icon as any} size={22} color={color} style={{ marginRight: 10 }} />

            <View style={styles.optionTextContainer}>
              <Text style={[dynamicStyles.optionText, { color }]}>{label}</Text>
              {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {rightElement && rightElement}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  //Componente PersonalInfoSection (agora com dados dinâmicos)
  const PersonalInfoSection = () => (
    <Animated.View style={[styles.sectionCard, { opacity: fadeAnim }]}>
      <Text style={dynamicStyles.sectionTitle}>Informações Pessoais</Text>
      
      <OptionItem
        icon="person-outline"
        label="Nome Completo"
        subtitle={userData.name}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="mail-outline"
        label="E-mail"
        subtitle={userData.email || 'N/A'}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="call-outline"
        label="Telefone"
        subtitle={userData.phone}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
    </Animated.View>
  );

  //Função de Logout (com Firebase)
  const handleLogout = async () => {
    triggerHaptic('heavy');
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/login');
            } catch (error) {
              console.log("Erro ao fazer logout:", error);
              Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
            }
          }
        },
      ]
    );
  };

  //Estilos dinâmicos (baseados no tema)
  const dynamicStyles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    email: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 25,
      fontWeight: '500',
    },
    optionText: {
      fontSize: 16,
      color: colors.text,
    },
    menuItemText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      marginLeft: 4,
    },
  });

  return (
    <View style={dynamicStyles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={dynamicStyles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/*Bloco do Avatar*/}
            <View style={styles.avatarWrapper}>
              {/*O TouchableOpacity agora chama o alerta*/}
              <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.8}>
                <LinearGradient colors={[colors.card, colors.border]} style={styles.avatarBorder}>
                  {/*Ícone padrão para todos os usuários*/}
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person-circle-outline" size={105} color="rgba(255,255,255,0.7)" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/*Email dinâmico*/}
            <Text style={dynamicStyles.email}>{userData.email}</Text>

            {/*Resto do menu*/}
            <View style={styles.menuContainer}>
              <View style={styles.menuSection}>
                <Text style={dynamicStyles.sectionTitle}>Perfil</Text>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setShowPersonalInfo(!showPersonalInfo);
                    triggerHaptic('medium');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="person" size={22} color="#fff" />
                    <Text style={dynamicStyles.menuItemText}>Informações Pessoais</Text>
                  </View>
                  <Ionicons 
                    name={showPersonalInfo ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#fff" 
                  />
                </TouchableOpacity>
                {showPersonalInfo && <PersonalInfoSection />}
              </View>

              <View style={styles.menuSection}>
                <Text style={dynamicStyles.sectionTitle}>Configurações</Text>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    vibrate();
                    router.push('/configuracoes');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="settings" size={22} color="#fff" />
                    <Text style={dynamicStyles.menuItemText}>Configurações do App</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.menuSection}>
                <Text style={dynamicStyles.sectionTitle}>Conta</Text>
                
                <TouchableOpacity 
                  style={[styles.menuItem, styles.logoutMenuItem]}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="log-out" size={22} color="#FF4444" />
                    <Text style={[dynamicStyles.menuItemText, styles.logoutText]}>Sair da Conta</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <BottomNav />
    </View>
  );
}


//Estilos
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: { 
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 15,
  },
  avatarBorder: {
    padding: 3,
    width: 116,
    height: 116,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { 
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0008',
    borderRadius: 20,
    padding: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 25,
    fontWeight: '500',
  },
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    minHeight: 56,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  statsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    marginBottom: 20,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 8,
    minHeight: 56,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  sectionCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutMenuItem: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#FF4444',
    fontWeight: '600',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 8,
    width: 90,
    justifyContent: 'space-between',
  },
  fontSizeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  switchWrapper: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});