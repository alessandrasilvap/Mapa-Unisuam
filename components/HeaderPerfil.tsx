import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// AppColors removido - usando cores dinâmicas
import { useAvatar } from "../hooks/useAvatar";

interface HeaderPerfilProps {
  saudacao?: string;
  showAvatar?: boolean;
  title?: string;
}

export default function HeaderPerfil({ 
  saudacao = "Olá Coruja", 
  showAvatar = true, 
  title 
}: HeaderPerfilProps) {
  const { avatar, pickImage } = useAvatar();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* Texto removido - header vazio */}
      </View>
      {showAvatar && (
        <TouchableOpacity onPress={pickImage}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    shadowColor: '#7e57c2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  leftSection: {
    flex: 1,
  },
  saudacao: {
    fontSize: 20,
    fontWeight: "600",
    color: '#333333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
});
