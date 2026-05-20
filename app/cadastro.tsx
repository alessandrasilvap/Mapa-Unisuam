import BotaoCustomizado from '@/components/buttons';
import { Ionicons } from '@expo/vector-icons'; //Ícone de check
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'; // NOVO: Importa o 'Alert'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useSettings } from '../hooks/useSettings';
import { AppColors } from '../constants/theme';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';


//Validações
const schema = yup.object({
  firstname: yup.string().required("Informe seu primeiro nome."),
  lastname: yup.string().required("Informe seu sobrenome."),
  email: yup.string().email("E-mail inválido!").required("Informe seu e-mail."),
  phone: yup.string().required("Informe seu telefone."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos.").max(14, "Senha muito longa. Menos de 14 caracteres, por favor.").required("Informe sua senha."),
  confirmpass: yup.string().oneOf([yup.ref('password')], "As senhas devem ser iguais.").required("Confirme sua senha.")
});


export default function telaCadastro() {
  const { colors } = useSettings();
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  //Função de envio
  async function handleSignIn(data: any) {
    setLoading(true);

    try {
      //INÍCIO DA LÓGICA DO FIREBASE
      //Criar o usuário no Authentication (só e-mail e senha)
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      //Salvar os dados extras (nome, telefone) no Firestore
      //Remove 'password' e 'confirmpass' dos dados antes de salvar no DB
      const userData = {
        uid: user.uid,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email.toLowerCase() //Salvar e-mail em minúsculas
      };

      //Cria um documento na coleção "users" usando o ID do usuário como nome
      await setDoc(doc(db, "users", user.uid), userData);
      //FIM DA LÓGICA DO FIREBASE

      //Se chegou aqui, o cadastro deu certo!
      setLoading(false);
      reset(); //Limpa os campos
      setShowSuccess(true);
      
      //Redireciona para o login após 4 segundos
      setTimeout(() => {
        router.replace('/login');
      }, 4000);

    } catch (error: any) { //Tratamento de erros do Firebase
      console.log('Erro ao fazer cadastro:', error.code, error.message);
      setLoading(false);

      //Mostra um alerta amigável para o usuário
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro no cadastro', 'Este endereço de e-mail já está sendo usado por outra conta.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro no cadastro', 'A senha é muito fraca. Tente uma senha com pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro no cadastro', 'O endereço de e-mail fornecido é inválido.');
      } else {
        Alert.alert('Erro no cadastro', 'Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  } 

  return (
    <View style={styles.containerPrincipal}>
      <LinearGradient
        colors={['#9560e1', '#005c83']}
        style={styles.gradient} />

      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <Image source={require("../assets/images/logotipo-coruja.png")} style={styles.img} />

        <Text style={styles.title}>Crie sua conta!</Text>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            {/*Nome*/}
            <Controller control={control} name='firstname' render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.inputFieldWrapper, {
                borderColor: errors.firstname ? '#ff375b' : 'transparent'
              }]}>
                <Ionicons name="person-outline" size={24} style={styles.icon} />
                <TextInput style={styles.input} 
                  onChangeText={onChange} 
                  onBlur={onBlur}
                  value={value}
                  placeholder='Primeiro nome'
                  placeholderTextColor={AppColors.textLight} />
              </View>
            )} />
            {errors.firstname && <Text style={styles.labelError}>{errors.firstname?.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            {/*Sobrenome*/}
            <Controller control={control} name='lastname' render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.inputFieldWrapper, {
                borderColor: errors.lastname ? '#ff375b' : 'transparent'
              }]}>
                <Ionicons name="person-outline" size={24} style={styles.icon} />
                <TextInput style={styles.input} 
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Sobrenome'
                  placeholderTextColor={AppColors.textLight} />
              </View>
            )} />
            {errors.lastname && <Text style={styles.labelError}>{errors.lastname?.message}</Text>}
          </View>
        </View>

        {/*E-mail*/}
        <Controller control={control} name='email' render={({ field: {onChange, onBlur, value} }) => (
          <View style={[styles.inputFieldWrapper, {
            borderColor: errors.email ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="mail-outline" size={24} style={styles.icon} />
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

        {/*Telefone*/}
        <Controller control={control} name='phone' render={({ field: {onChange, onBlur, value} }) => (
          <View style={[styles.inputFieldWrapper, {
            borderColor: errors.phone ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="call-outline" size={24} style={styles.icon} />
            <TextInput style={styles.input} 
              onChangeText={onChange} 
              onBlur={onBlur}
              value={value} 
              placeholder='Digite seu telefone'
              placeholderTextColor={AppColors.textLight}
              keyboardType="phone-pad"
            />
          </View>
        )} />
        {errors.phone && <Text style={styles.labelError}>{errors.phone?.message}</Text>}

        {/*Senha*/}
        <Controller control={control} name='password' render={({ field: {onChange, onBlur, value} }) => (
          <View style={[styles.inputFieldWrapper, {
            borderColor: errors.password ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="lock-closed-outline" size={24} style={styles.icon} />
            <TextInput style={styles.input} 
              onChangeText={onChange} 
              onBlur={onBlur} 
              value={value} 
              placeholder='Crie uma senha'
              placeholderTextColor={AppColors.textLight}
              secureTextEntry={true} />
          </View>
        )} />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        {/*Confirmação senha*/}
        <Controller control={control} name='confirmpass' render={({ field: { onChange, onBlur, value } }) => (
          <View style={[styles.inputFieldWrapper, {
            borderColor: errors.confirmpass ? '#ff375b' : 'transparent',
          }]}>
            <Ionicons name="lock-closed-outline" size={24} style={styles.icon} />
            <TextInput style={styles.input} 
              onChangeText={onChange} 
              onBlur={onBlur}
              value={value}
              placeholder='Confirme a senha'
              placeholderTextColor={AppColors.textLight}
              secureTextEntry={true} />
          </View>
        )} />
        {errors.confirmpass && <Text style={styles.labelError}>{errors.confirmpass?.message}</Text>}

        {/*Botão 'Acessar'*/}
        <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit(handleSignIn)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar conta</Text>
          )}
        </TouchableOpacity>

        {/*Botão 'Voltar'*/}
        <BotaoCustomizado title="Voltar" onPress={() => router.back()} />

        {/*Modal de confirmação de cadastro*/}
        <Modal visible={showSuccess} animationType="fade" transparent onRequestClose={() => setShowSuccess(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Ionicons name='checkmark-circle' size={100}marginBottom={15} color={colors.primary}/>

              <Text style={styles.modalText}>Conta criada com sucesso!</Text>
              <Text style={styles.modalSubtext}>Você será redirecionado para o login em alguns segundos...</Text>

              <TouchableOpacity style={styles.modalButton} onPress={() => { setShowSuccess(false); router.replace('/login');}}>
                <Text style={styles.modalButtonText}>Ir para Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  img: {
    alignSelf: 'center',
    width: 150, 
    height: 100,
    bottom: 50,
  },
  title: {
    fontSize: 34,
    marginBottom: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10, 
  },
  inputContainer: {
    flex: 1, 
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundCard,
    borderRadius: 10, 
    width: '100%',
    marginBottom: 12, 
    paddingHorizontal: 10, 
    opacity: 0.6, 
    borderWidth: 1, 
    borderColor: 'transparent', 
  },
  input: {
    flex: 1, 
    color: AppColors.textPrimary, 
    fontSize: 18, 
    paddingVertical: 10, 
  },
  icon: {
    marginRight: 10,
    color: AppColors.textLight, 
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0 , 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 25,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 13,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4900EB',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 90,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});