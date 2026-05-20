/**
 * Paleta de cores padronizada para o app
 * Baseada nas cores já utilizadas no projeto
 */

import { Platform } from 'react-native';

// Cores principais da paleta
export const AppColors = {
  // Cores primárias
  primary: '#7e57c2',        // Roxo principal
  primaryDark: '#5e3a9a',   // Roxo escuro
  primaryLight: '#9c7dd4',  // Roxo claro
  
  // Cores secundárias
  secondary: '#0097a7',      // Azul secundário
  secondaryDark: '#006064',  // Azul escuro
  secondaryLight: '#4dd0e1', // Azul claro
  
  // Cores de fundo
  background: '#F9F9F9',     // Fundo principal
  backgroundCard: '#FFFFFF', // Fundo dos cards
  backgroundDark: '#141414', // Fundo escuro
  
  // Cores de texto
  textPrimary: '#333333',   // Texto principal
  textSecondary: '#666666', // Texto secundário
  textLight: '#999999',     // Texto claro
  textWhite: '#FFFFFF',     // Texto branco
  
  // Cores de status
  success: '#4CAF50',       // Verde sucesso
  warning: '#FF9800',       // Laranja aviso
  error: '#F44336',         // Vermelho erro
  info: '#2196F3',          // Azul informação
  
  // Cores de borda e divisores
  border: '#E0E0E0',        // Borda padrão
  borderLight: '#F0F0F0',   // Borda clara
  divider: '#CCCCCC',       // Divisor
  
  // Cores de botão
  buttonPrimary: '#7e57c2',  // Botão primário
  buttonSecondary: '#0097a7', // Botão secundário
  buttonDisabled: '#9E9E9E', // Botão desabilitado
  
  // Cores de navegação
  tabActive: '#7e57c2',     // Aba ativa - mesmo roxo primário
  tabInactive: '#727272',   // Aba inativa
  
  // Cores de gradiente
  gradientStart: '#7e57c2',  // Início do gradiente
  gradientEnd: '#0097a7',    // Fim do gradiente
  gradientLogin: ['#9560e1', '#005c83'], // Gradiente login
};

const tintColorLight = AppColors.primary;
const tintColorDark = AppColors.textWhite;

export const Colors = {
  light: {
    text: AppColors.textPrimary,
    background: AppColors.background,
    tint: tintColorLight,
    icon: AppColors.textSecondary,
    tabIconDefault: AppColors.tabInactive,
    tabIconSelected: AppColors.tabActive,
  },
  dark: {
    text: AppColors.textWhite,
    background: AppColors.backgroundDark,
    tint: tintColorDark,
    icon: AppColors.textLight,
    tabIconDefault: AppColors.textLight,
    tabIconSelected: AppColors.tabActive,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
