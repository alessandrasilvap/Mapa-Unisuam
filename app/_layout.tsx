import { Stack } from "expo-router";
import React from "react";
import { AppThemeProvider } from "../components/ThemeContext";


export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="mapa" options={{ headerShown: false }} />
        <Stack.Screen name="favoritas" options={{ headerShown: false }} />
        <Stack.Screen name="busca" options={{ headerShown: false }} />
        <Stack.Screen name="historico" options={{ headerShown: false }} />
        <Stack.Screen name="detalhes" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ headerShown: false }} />
        <Stack.Screen name="configuracoes" options={{ headerShown: false }} />
      </Stack>
    </AppThemeProvider>
  );
}