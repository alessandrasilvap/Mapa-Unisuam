// hooks/useAvatar.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export function useAvatar() {
  const [avatar, setAvatar] = useState<any>(require("../assets/images/perfil.png"));

  useEffect(() => {
    const loadAvatar = async () => {
      const savedAvatar = await AsyncStorage.getItem("@user_avatar");
      if (savedAvatar) setAvatar({ uri: savedAvatar });
    };
    loadAvatar();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar({ uri });
      await AsyncStorage.setItem("@user_avatar", uri);
    }
  };

  return { avatar, pickImage };
}
