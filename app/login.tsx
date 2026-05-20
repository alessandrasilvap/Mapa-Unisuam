import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import BotaoCustomizado from '../components/buttons';
import { useSettings } from '../hooks/useSettings';
import { AppColors } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';


//Validações
const schema = yup.object({
  email: yup.string().email("E-mail inválido!").required("Informe seu e-mail."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos.").max(14, "Senha muito longa. Menos de 14 caracteres, por favor.").required("Informe sua senha."),
});


export default function telaLogin () {
  const router = useRouter();
  const { colors } = useSettings();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);
  const [isChecked, setItChecked] = useState(false);
  const [loadingAnon, setLoadingAnon] = useState(false); //Estado de loading para Anônimo

  /*Função para Login Anônimo*/
  async function handleAnonymousSignIn() {
      setLoadingAnon(true);
      try {
          await signInAnonymously(auth);
          setLoadingAnon(false);
          router.replace('/'); //Redireciona
      } catch (error: any) {
          setLoadingAnon(false);
          console.error("Erro no login anônimo:", error);
          Alert.alert("Erro", "Não foi possível entrar como usuário anônimo.");
      }
  }

  //Função de Login com E-mail/Senha
  async function handleSignIn(data: any) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      reset(); 
      router.replace('/'); 
    } catch (error: any) {
      setLoading(false);
      console.log('Erro no login:', error.code, error.message);
      if (error.code === 'auth/invalid-credential' || 
          error.code === 'auth/user-not-found' || 
          error.code === 'auth/wrong-password') {
        Alert.alert('Erro', 'E-mail ou senha inválidos. Verifique e tente novamente.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'O formato do e-mail é inválido.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
      }
    }
  }

  return (
    <View style={styles.containerPrincipal}>
      <LinearGradient
        colors={['#9560e1', '#005c83']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Image source={require("../assets/images/logotipo-coruja.png")} style={{
          alignSelf: 'center',
          width: 150, 
          height: 100,
          bottom: 50,
        }} />

        <Text style={styles.text}>Acesse sua conta</Text>

        {/*E-mail*/}
        <Controller control={control} name='email' render={({ field: {onChange, onBlur, value} }) => (
          <View style={[styles.inputContainer, {
            borderColor: errors.email ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="mail-outline" size={24} color={AppColors.textLight} style={styles.icon} />
            <TextInput style={styles.input} 
              onChangeText={onChange} 
              onBlur={onBlur} 
              value={value} 
              placeholder='Digite seu e-mail'
              placeholderTextColor={AppColors.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )} />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        {/*Senha*/}
        <Controller control={control} name='password' render={({ field: {onChange, onBlur, value} }) => (
          <View style={[styles.inputContainer, {
            borderColor: errors.password ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="lock-closed-outline" size={24} color={AppColors.textLight} style={styles.icon} />
            <TextInput style={styles.input} 
              onChangeText={onChange} 
              onBlur={onBlur} 
              value={value} 
              placeholder='Digite sua senha'
              placeholderTextColor={AppColors.textLight}
              secureTextEntry={true} 
            />
          </View>
        )} />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Switch 
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={isChecked ? colors.background : '#f4f3f4'}
              onValueChange={() => setItChecked((prev) => !prev)}
              value={isChecked}
            />
            <Text style={{color: AppColors.textLight, fontSize: 16, fontWeight: '500'}}>Lembrar-me</Text>
          </View>

          {/*<Link href={'/recuperarSenha'} asChild>
            <TouchableOpacity>
              <Text style={{color: AppColors.textLight, fontSize: 16, fontWeight: '500'}}>
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </Link>*/}
        </View>

        {/*Botão 'Acessar'*/}
        <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit(handleSignIn)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>

        {/*Botão 'Cadastrar'*/}
        <BotaoCustomizado title="Criar conta" onPress={() => router.push('/cadastro')} />

        {/*Divisor*/}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>
        
        {/*Botão para 'Anônimo'*/}
        <TouchableOpacity 
          style={[styles.googleButton, { backgroundColor: '#607d8b' }]} // Cor Cinza/Azul
          onPress={handleAnonymousSignIn} 
          disabled={loadingAnon}
        >
          {loadingAnon ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.googleButtonText, { color: '#fff' }]}>Entrar como Anônimo</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  text: { 
    textAlign: 'left',
    fontSize: 30,
    marginBottom: 16,
    fontWeight: '800',
    width: '100%',
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    width: '100%',
    borderColor: AppColors.border,
    borderWidth: 1,
    margin: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: AppColors.backgroundCard,
    opacity: 0.6,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    color: AppColors.textPrimary,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: 'rgba(126, 87, 194, 1.00)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#7e57c2',
    marginBottom: 8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  googleButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 10,
    fontWeight: '600',
  },
});