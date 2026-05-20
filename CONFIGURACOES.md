# Sistema de Configurações do App

Este documento descreve o sistema completo de configurações implementado no app, incluindo vibração, temas de cores e modo claro/escuro.

## 🎯 Funcionalidades Implementadas

### 🔊 Vibração por Toque
- **API**: React Native Vibration
- **Persistência**: AsyncStorage
- **Integração**: Todos os TouchableOpacity, Pressable e Button do app vibram automaticamente quando habilitado
- **Componentes**: `VibratingButton`, `VibratingPressable`

### 🎨 Sistema de Cores de Tema
- **5 opções de cores**: Roxo (padrão), Azul, Vermelho, Amarelo, Verde
- **Mudança dinâmica**: Cores se aplicam instantaneamente em todo o app
- **Persistência**: AsyncStorage
- **Context API**: Gerenciamento global de estado

### 🌙 Modo Claro/Escuro
- **Alternância**: Switch para trocar entre modo claro e escuro
- **Combinação**: Funciona junto com as cores de tema
- **Persistência**: AsyncStorage
- **Aplicação**: Background, texto, componentes se adaptam automaticamente

## 📁 Arquivos Criados/Modificados

### Novos Arquivos
- `app/configuracoes.tsx` - Página principal de configurações
- `components/VibratingButton.tsx` - Botão com vibração integrada
- `components/VibratingPressable.tsx` - Pressable com vibração integrada
- `hooks/useSettings.ts` - Hook personalizado para configurações

### Arquivos Modificados
- `components/ThemeContext.tsx` - Context API expandido com todas as funcionalidades
- `app/_layout.tsx` - Adicionada rota de configurações
- `app/(tabs)/perfil.tsx` - Botão de navegação para configurações
- `app/(tabs)/index.tsx` - Integração com sistema de tema dinâmico
- `components/buttons.tsx` - Integração com vibração

## 🚀 Como Usar

### 1. Acessar Configurações
- Vá para a aba "Perfil"
- Toque em "Configurações do App"
- Ou acesse diretamente `/configuracoes`

### 2. Usar o Hook de Configurações
```typescript
import { useSettings } from '../hooks/useSettings';

const MyComponent = () => {
  const { 
    colors, 
    vibrate, 
    isDark, 
    themeColor,
    vibrationEnabled 
  } = useSettings();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Texto</Text>
      <TouchableOpacity onPress={vibrate}>
        <Text>Botão com vibração</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 3. Usar Componentes com Vibração
```typescript
import { VibratingButton, VibratingPressable } from '../components/VibratingButton';

// Botão com vibração automática
<VibratingButton 
  title="Meu Botão"
  onPress={() => console.log('Clicado!')}
  variant="primary"
/>

// Pressable com vibração automática
<VibratingPressable onPress={() => console.log('Pressionado!')}>
  <Text>Área clicável</Text>
</VibratingPressable>
```

## 🎨 Cores Disponíveis

| Cor | Código | Nome |
|-----|--------|------|
| 🟣 | #7e57c2 | Roxo (padrão) |
| 🔵 | #2196F3 | Azul |
| 🔴 | #F44336 | Vermelho |
| 🟡 | #FFC107 | Amarelo |
| 🟢 | #4CAF50 | Verde |

## 🔧 Estrutura do Context

```typescript
interface ThemeContextProps {
  // Estado atual
  isDark: boolean;
  themeColor: ThemeColor;
  vibrationEnabled: boolean;
  
  // Ações
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
  toggleVibration: () => void;
  
  // Cores dinâmicas
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    background: string;
    text: string;
    card: string;
    border: string;
  };
  
  // Função de vibração
  vibrate: () => void;
}
```

## 💾 Persistência de Dados

Todas as configurações são salvas automaticamente no AsyncStorage com a chave `appSettings`:

```typescript
{
  vibrationEnabled: boolean,
  themeColor: 'purple' | 'blue' | 'red' | 'yellow' | 'green',
  themeMode: 'light' | 'dark'
}
```

## ✨ Características da UI

- **Design moderno**: Interface minimalista com ícones e animações
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Contraste adequado e feedback tátil
- **Intuitivo**: Navegação clara e seções bem organizadas
- **Preview**: Visualização em tempo real das mudanças de tema

## 🔄 Integração Automática

O sistema foi projetado para ser totalmente integrado:

1. **Vibração**: Todos os botões existentes agora vibram automaticamente
2. **Tema**: Cores se aplicam dinamicamente em todo o app
3. **Persistência**: Configurações são mantidas entre sessões
4. **Performance**: Carregamento otimizado com Context API

## 🎯 Próximos Passos

Para expandir o sistema:

1. **Mais opções de cor**: Adicionar novas paletas
2. **Tamanhos de fonte**: Controle de acessibilidade
3. **Idiomas**: Sistema de internacionalização
4. **Notificações**: Configurações de push notifications
5. **Backup**: Sincronização com nuvem

---

**Desenvolvido com ❤️ para uma experiência de usuário excepcional!**



