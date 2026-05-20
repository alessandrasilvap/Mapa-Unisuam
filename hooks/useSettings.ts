import { useAppTheme } from '../components/ThemeContext';

/**
 * Hook personalizado para facilitar o acesso às configurações do app
 * Fornece uma interface simplificada para usar as configurações em qualquer componente
 */
export const useSettings = () => {
  const theme = useAppTheme();

  return {
    // Estado atual
    isDark: theme.isDark,
    themeColor: theme.themeColor,
    vibrationEnabled: theme.vibrationEnabled,
    
    // Cores dinâmicas
    colors: theme.colors,
    
    // Ações
    toggleDarkMode: theme.toggleTheme,
    changeThemeColor: theme.setThemeColor,
    toggleVibration: theme.toggleVibration,
    
    // Função de vibração
    vibrate: theme.vibrate,
    
    // Utilitários
    isLightMode: !theme.isDark,
    primaryColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    textColor: theme.colors.text,
  };
};



