# 🦉 Mapa UNISUAM

Aplicativo mobile de navegação interna para a **UNISUAM**. Com ele, alunos e visitantes encontram salas e ambientes da faculdade direto no celular: basta buscar pelo nome da sala e o app mostra no mapa onde ela fica.

Projeto desenvolvido em grupo para a faculdade, com **React Native + Expo** e **Firebase**.

<img width="1359" alt="Telas do app Mapa UNISUAM" src="https://github.com/user-attachments/assets/93e68805-da15-4e1f-bb84-ffb3d25ca834" />

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

---

## 💡 O problema

Quem chega à faculdade pela primeira vez (ou precisa ir a um bloco que não conhece) costuma perder tempo procurando salas. O **Mapa UNISUAM** resolve isso reunindo o mapeamento das salas em um só lugar, com busca rápida e navegação simples.

---

## ✨ Funcionalidades

### 🗺️ Mapa e busca de salas
- Busca com **sugestões automáticas** enquanto você digita
- Mapeamento das salas dos **blocos C, D e E**, além do auditório e banheiros
- Ao selecionar uma sala, o mapa mostra a imagem com a localização dela
- **Zoom com pinça** e arraste para explorar o mapa, com limites para a imagem não "sumir" da tela
- Botão para voltar ao mapa geral

### 🔐 Conta de usuário
- **Cadastro** com nome, sobrenome, e-mail, telefone e senha
- **Login** com e-mail e senha, ou **entrada anônima** para quem só quer consultar o mapa
- Validação dos formulários com **React Hook Form + Yup** e mensagens de erro em português
- Dados do usuário salvos no **Cloud Firestore**
- Tela de **perfil** com as informações pessoais e opção de sair da conta

### 🎨 Personalização
- **Modo claro e escuro**
- **5 cores de tema**: roxo (padrão), azul, vermelho, amarelo e verde
- **Vibração ao toque**, que pode ser ligada ou desligada
- Preferências salvas no aparelho com **AsyncStorage**, então continuam valendo da próxima vez que o app for aberto

> Os detalhes técnicos do sistema de configurações estão documentados em [`CONFIGURACOES.md`](./CONFIGURACOES.md).

---

## 🛠️ Tecnologias

| Categoria | Ferramentas |
|-----------|-------------|
| Base | React Native 0.81, Expo SDK 54, TypeScript |
| Navegação | Expo Router (rotas baseadas em arquivos) |
| Back-end | Firebase Authentication, Cloud Firestore |
| Formulários | React Hook Form, Yup |
| Gestos e animação | React Native Gesture Handler, Animated API |
| Armazenamento local | AsyncStorage |
| Estado global | Context API (`ThemeContext`) |
| Interface | Expo Vector Icons, Expo Linear Gradient |

---

## 🚀 Como executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- App **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) ou um emulador

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/Mapa-Unisuam.git
cd Mapa-Unisuam

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npx expo start
```

Depois, escaneie o QR Code que aparece no terminal com o **Expo Go** (Android) ou com a câmera do celular (iOS). Também dá para abrir no emulador pressionando `a` (Android) ou `i` (iOS) no terminal.

### Configurando o Firebase

Para o login e o cadastro funcionarem, preencha o arquivo `firebaseConfig.js` com os dados de um projeto seu no [Firebase Console](https://console.firebase.google.com/), com **Authentication** (provedores E-mail/Senha e Anônimo) e **Cloud Firestore** ativados.

---

## 📁 Estrutura do projeto

```
Mapa-Unisuam/
├── app/                    # Telas (Expo Router)
│   ├── (tabs)/
│   │   ├── index.tsx       # Tela inicial
│   │   └── perfil.tsx      # Perfil do usuário
│   ├── mapa.tsx            # Mapa com busca, zoom e arraste
│   ├── login.tsx           # Login (e-mail/senha ou anônimo)
│   ├── cadastro.tsx        # Cadastro de usuário
│   └── configuracoes.tsx   # Tema, cores e vibração
├── components/             # Componentes reutilizáveis (SearchBar, BottomNav, ThemeContext…)
├── hooks/                  # Hooks personalizados (useSettings, useAvatar…)
├── constants/              # Cores e tema
├── assets/images/          # Ícones, logo e imagens do mapeamento das salas
├── firebaseConfig.js       # Conexão com o Firebase
└── CONFIGURACOES.md        # Documentação do sistema de configurações
```

---

## 📄 Apresentação

A apresentação do projeto está disponível em PDF: [APP Mapa UNI.pdf](https://github.com/user-attachments/files/28055405/APP.Mapa.UNI.pdf)

---

## 👥 Equipe

| Nome | GitHub |
|------|--------|
| Alessandra | https://github.com/alessandrasilvap |
| Bryan | https://github.com/Bryan22890 |
| Eric | https://github.com/Eric-L-Araujo |
| Gabriel | https://github.com/Gabriel2005dev |

Projeto acadêmico desenvolvido na **UNISUAM**.
