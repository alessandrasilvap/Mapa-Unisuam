// components/ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Vibration } from 'react-native';

// Tipos para as configurações
export type ThemeColor = 'purple' | 'blue' | 'red' | 'yellow' | 'green';
export type ThemeMode = 'light' | 'dark';

export interface AppSettings {
  vibrationEnabled: boolean;
  themeColor: ThemeColor;
  themeMode: ThemeMode;
}

interface ThemeContextProps {
  // Estado atual
  isDark: boolean;
  themeColor: ThemeColor;
  vibrationEnabled: boolean;
  
  // Ações
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleVibration: () => void;
  
  // Cores dinâmicas baseadas no tema
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    background: string;
    text: string;
    card: string;
    border: string;
  };
  
  // Função para vibrar (se habilitado)
  vibrate: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

// Paleta de cores para cada tema
const colorPalettes = {
  purple: {
    primary: '#7e57c2',
    primaryDark: '#5e3a9a',
    primaryLight: '#9c7dd4',
  },
  blue: {
    primary: '#2196F3',
    primaryDark: '#1976D2',
    primaryLight: '#64B5F6',
  },
  red: {
    primary: '#F44336',
    primaryDark: '#D32F2F',
    primaryLight: '#EF5350',
  },
  yellow: {
    primary: '#FFC107',
    primaryDark: '#F57F17',
    primaryLight: '#FFD54F',
  },
  green: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#66BB6A',
  },
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>({
    vibrationEnabled: true,
    themeColor: 'purple',
    themeMode: 'light',
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar configurações do AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('appSettings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Salvar configurações no AsyncStorage
  const saveSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem('appSettings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  // Computar cores dinâmicas
  const currentPalette = colorPalettes[settings.themeColor];
  const isDark = settings.themeMode === 'dark';
  
  const colors = {
    primary: currentPalette.primary,
    primaryDark: currentPalette.primaryDark,
    primaryLight: currentPalette.primaryLight,
    background: isDark ? '#141414' : '#F9F9F9',
    text: isDark ? '#FFFFFF' : '#333333',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    border: isDark ? '#333333' : '#E0E0E0',
  };

  // Debug: Log das cores quando mudam
  console.log('Theme updated:', { themeColor: settings.themeColor, isDark, colors });

  const toggleTheme = () => {
    const newMode = settings.themeMode === 'light' ? 'dark' : 'light';
    saveSettings({ themeMode: newMode });
  };

  const setThemeColor = (color: ThemeColor) => {
    saveSettings({ themeColor: color });
  };

  const toggleVibration = () => {
    saveSettings({ vibrationEnabled: !settings.vibrationEnabled });
  };

  const vibrate = () => {
    if (settings.vibrationEnabled) {
      Vibration.vibrate(50); // Vibração de 50ms
    }
  };

  const contextValue: ThemeContextProps = {
    isDark,
    themeColor: settings.themeColor,
    vibrationEnabled: settings.vibrationEnabled,
    toggleTheme,
    setThemeColor,
    toggleVibration,
    colors,
    vibrate,
  };

  // Não renderizar até as configurações serem carregadas
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme deve ser usado dentro do AppThemeProvider");
  return context;
};
