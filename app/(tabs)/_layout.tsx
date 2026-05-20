// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { AppThemeProvider } from "../../components/ThemeContext";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ headerShown: false }} />
      </Stack>
    </AppThemeProvider>
  );
}
