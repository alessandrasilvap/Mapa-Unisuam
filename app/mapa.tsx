import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import SearchBar from '../components/SearchBar';
import { useSettings } from '../hooks/useSettings';


const { width, height } = Dimensions.get('window');


interface Sala {
  nome: string;
  imagem: string;
}

//Dados das salas - usando as imagens específicas de cada sala
const salas: Sala[] = [
  //Salas C (101c a 105c)
  { nome: "Sala 101C", imagem: "sala101c.jpg" },
  { nome: "Sala 102C", imagem: "sala102c.jpg" },
  { nome: "Sala 103C", imagem: "sala103c.jpg" },
  { nome: "Sala 104C", imagem: "sala104c.jpg" },
  { nome: "Sala 105C", imagem: "sala105c.jpg" },
  
  //Salas D (101d a 109d)
  { nome: "Sala 101D", imagem: "sala101d.jpg" },
  { nome: "Sala 102D", imagem: "sala102d.jpg" },
  { nome: "Sala 103D", imagem: "sala103d.jpg" },
  { nome: "Sala 104D", imagem: "sala104d.jpg" },
  { nome: "Sala 105D", imagem: "sala105d.jpg" },
  { nome: "Sala 106D", imagem: "sala106d.jpg" },
  { nome: "Sala 107D", imagem: "sala107d.jpg" },
  { nome: "Sala 108D", imagem: "sala108d.jpg" },
  { nome: "Sala 109D", imagem: "sala109d.jpg" },
  
  //Salas E (101e a 110e)
  { nome: "Sala 101E", imagem: "sala101e.jpg" },
  { nome: "Sala 102E", imagem: "sala102e.jpg" },
  { nome: "Sala 103E", imagem: "sala103e.jpg" },
  { nome: "Sala 104E", imagem: "sala104e.jpg" },
  { nome: "Sala 105E", imagem: "sala105e.jpg" },
  { nome: "Sala 106E", imagem: "sala106e.jpg" },
  { nome: "Sala 107E", imagem: "sala107e.jpg" },
  { nome: "Sala 108E", imagem: "sala108e.jpg" },
  { nome: "Sala 109E", imagem: "sala109e.jpg" },
  { nome: "Sala 110E", imagem: "sala110e.jpg" },
  
  //Áreas especiais
  { nome: "Biblioteca", imagem: "biblioteca.jpg" },
  { nome: "Auditório", imagem: "auditorio.jpg" },
  { nome: "Banheiro", imagem: "banheiro.jpg" },
];


//Função para obter a imagem correta
const getImageSource = (imageName: string) => {
  switch (imageName) {
    //Imagem padrão
    case 'mapa1.png':
      return require('../assets/images/mapa1.png');
    
    //Salas C - usando as imagens específicas
    case 'sala101c.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala101c.jpg');
    case 'sala102c.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala102c.jpg');
    case 'sala103c.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala103c.jpg');
    case 'sala104c.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala104c.jpg');
    case 'sala105c.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala105c.jpg');
    
    //Salas D - usando as imagens específicas
    case 'sala101d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala101d.jpg');
    case 'sala102d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala102d.jpg');
    case 'sala103d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala103d.jpg');
    case 'sala104d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala104d.jpg');
    case 'sala105d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala105d.jpg');
    case 'sala106d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala106d.jpg');
    case 'sala107d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala107d.jpg');
    case 'sala108d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala108d.jpg');
    case 'sala109d.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala109d.jpg');
    
    //Salas E - usando as imagens específicas
    case 'sala101e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala101e.jpg');
    case 'sala102e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala102e.jpg');
    case 'sala103e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala103e.jpg');
    case 'sala104e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala104e.jpg');
    case 'sala105e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala105e.jpg');
    case 'sala106e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala106e.jpg');
    case 'sala107e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala107e.jpg');
    case 'sala108e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala108e.jpg');
    case 'sala109e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala109e.jpg');
    case 'sala110e.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/sala110e.jpg');
    
    //Áreas especiais - usando as imagens específicas
    case 'auditorio.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/auditorio.jpg'); 
    case 'banheiro.jpg':
      return require('../assets/images/mapeamento das salas - projeto mobile/banheiro.jpg');
    default:
      return require('../assets/images/mapa1.png');
  }
};


export default function MapaScreen() {
  const { colors, isDark } = useSettings();
  const [selectedSala, setSelectedSala] = useState<Sala | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("mapa1.png");
  const [isZooming, setIsZooming] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [lastGestureTime, setLastGestureTime] = useState(0);
  
  //Safe area insets para garantir que o layout não fique atrás dos ícones do sistema
  const insets = useSafeAreaInsets();
  
  //Garantir que os insets sejam sempre positivos
  const safeTop = Math.max(insets.top, 20);
  const safeBottom = Math.max(insets.bottom, 10);
  
  //Animações simplificadas para zoom suave
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  //Animações simplificadas
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  
  //Valores base para controle
  const baseScale = useRef(1);
  const baseTranslateX = useRef(0);
  const baseTranslateY = useRef(0);
  
  //Ponto focal do zoom
  const focalX = useRef(0);
  const focalY = useRef(0);
  
  //Configurações otimizadas para melhor controle
  const MIN_ZOOM = 0.8; //Zoom mínimo mais restritivo
  const MAX_ZOOM = 1.5; //Zoom máximo mais controlado (reduzido de 2.5 para 1.5)
  const RESET_THRESHOLD = 0; //Retorna quando expandir demais
  const ZOOM_OUT_THRESHOLD = 0.9; //Retorna quando afastar demais

  //Auto-hide controls após inatividade
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastGestureTime > 3000) {
        setShowControls(false);
        Animated.timing(controlsOpacity, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [lastGestureTime, controlsOpacity]);

  //Mostrar controles ao tocar
  const showControlsTemporarily = () => {
    setShowControls(true);
    setLastGestureTime(Date.now());
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  //Função para calcular limites rigorosos da tela - centralizada entre SearchBar e BottomNav
  const getScreenLimits = (currentScale: number) => {
    const imageWidth = width;
    //Altura dinâmica baseada no espaço disponível
    const imageHeight = height - 200; // Espaço total menos SearchBar + BottomNav
    const scaledWidth = imageWidth * currentScale;
    const scaledHeight = imageHeight * currentScale;
    
    //Área segura considerando SearchBar e BottomNav
    const searchBarHeight = 120;
    const bottomNavHeight = 80;
    const availableHeight = height - searchBarHeight - bottomNavHeight;
    
    //Calcular limites para manter imagem sempre visível e centralizada
    const maxTranslateX = Math.max(0, (scaledWidth - width) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - availableHeight) / 2);
    
    //Limites adaptativos baseados no tamanho da tela
    const horizontalLimit = width * 0.25; //25% da largura da tela
    const verticalLimit = availableHeight * 0.1; //10% da altura disponível
    
    //Limites mais rigorosos - sempre manter o mapa visível e centralizado
    const strictMinX = Math.min(-maxTranslateX, -horizontalLimit);
    const strictMaxX = Math.max(maxTranslateX, horizontalLimit);
    const strictMinY = Math.min(-maxTranslateY, -verticalLimit);
    const strictMaxY = Math.max(maxTranslateY, verticalLimit);
    
    return {
      minX: strictMinX,
      maxX: strictMaxX,
      minY: strictMinY,
      maxY: strictMaxY
    };
  };

  const handleSearch = (sala: Sala | null) => {
    if (sala) {
      setSelectedSala(sala);
      setCurrentImage(sala.imagem);
    } else {
      setSelectedSala(null);
      setCurrentImage("mapa1.png");
    }
  };

  const handleResetZoom = () => {
    //Resetar todos os valores
    baseScale.current = 1;
    baseTranslateX.current = 0;
    baseTranslateY.current = 0;
    focalX.current = 0;
    focalY.current = 0;
    
    //Animação suave de retorno - mantém Y sempre em 0
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      //Garantir que Y sempre fique em 0 após animação
      translateY.setValue(0);
      baseTranslateY.current = 0;
    });
  };

  const resetMap = () => {
    setSelectedSala(null);
    setCurrentImage("mapa1.png");
    handleResetZoom();
  };

  //Handler de zoom melhorado para melhor controle
  const onPinchGestureEvent = (event: any) => {
    const { scale: gestureScale, focalX: gestureFocalX, focalY: gestureFocalY } = event.nativeEvent;
    
    //Mostrar controles e atualizar tempo
    showControlsTemporarily();
    setIsZooming(true);
    
    //Capturar ponto focal (onde o usuário tocou)
    focalX.current = gestureFocalX - width / 2;
    focalY.current = 0; //Sempre centralizado verticalmente
    
    //Aplicar zoom com limites mais restritivos
    const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, gestureScale));
    
    //Calcular translação para manter foco no ponto tocado - APENAS HORIZONTAL
    const scaleFactor = newScale - 1;
    const newTranslateX = -focalX.current * scaleFactor;
    const newTranslateY = 0; //Sempre centralizado verticalmente
    
    //Aplicar limites da tela com mais precisão
    const limits = getScreenLimits(newScale);
    const clampedTranslateX = Math.max(limits.minX, Math.min(limits.maxX, newTranslateX));
    const clampedTranslateY = 0; //Sempre centralizado
    
    //Aplicar transformações com suavização
    scale.setValue(newScale);
    translateX.setValue(clampedTranslateX);
    translateY.setValue(clampedTranslateY);
    
    //Atualizar valores base imediatamente
    baseScale.current = newScale;
    baseTranslateX.current = clampedTranslateX;
    baseTranslateY.current = 0; //Sempre centralizado
  };

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      const currentZoom = baseScale.current;
      setIsZooming(false);
      
      //Garantir que Y sempre fique em 0 após qualquer zoom
      translateY.setValue(0);
      baseTranslateY.current = 0;
      
      //Retornar automaticamente se expandir demais (para não bagunçar layout)
      if (currentZoom < RESET_THRESHOLD) {
        handleResetZoom();
      }
      //Retornar automaticamente se afastar demais (zoom out)
      else if (currentZoom < ZOOM_OUT_THRESHOLD) {
        handleResetZoom();
      }
      //Manter zoom se estiver dentro dos limites aceitáveis
      else {
        //Garantir posição vertical fixa
        translateY.setValue(0);
        baseTranslateY.current = 0;
      }
    }
  };

  //Handler de pan melhorado - só permite pan após zoom e apenas horizontal
  const onPanGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    const currentScale = baseScale.current;
    
    //Só permite pan se estiver com zoom (escala > 1.1)
    if (currentScale <= 1.1) {
      return; //Bloqueia pan quando não há zoom
    }
    
    //Mostrar controles e atualizar tempo
    showControlsTemporarily();
    setIsPanning(true);
    
    //Calcular nova posição - APENAS HORIZONTAL (X)
    const newTranslateX = baseTranslateX.current + translationX;
    //Bloqueia movimento vertical - mantém Y fixo
    const newTranslateY = baseTranslateY.current; //Não permite movimento vertical
    
    //Aplicar limites rigorosos da tela
    const limits = getScreenLimits(currentScale);
    const clampedTranslateX = Math.max(limits.minX, Math.min(limits.maxX, newTranslateX));
    //Mantém Y sempre no centro (0)
    const clampedTranslateY = 0;
    
    //Validação adicional: garantir que o mapa sempre fique visível e centralizado
    const horizontalLimit = width * 0.25; //25% da largura da tela
    const finalTranslateX = Math.max(-horizontalLimit, Math.min(horizontalLimit, clampedTranslateX));
    const finalTranslateY = 0; //Sempre centralizado verticalmente
    
    //Aplicar movimento com limites rigorosos
    translateX.setValue(finalTranslateX);
    translateY.setValue(finalTranslateY);
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      const currentScale = baseScale.current;
      
      //Só permite pan se estiver com zoom (escala > 1.1)
      if (currentScale <= 1.1) {
        setIsPanning(false);
        return; //Bloqueia pan quando não há zoom
      }
      
      const limits = getScreenLimits(currentScale);
      setIsPanning(false);
      
      //Atualizar posição base - APENAS HORIZONTAL (X)
      const newBaseTranslateX = baseTranslateX.current + event.nativeEvent.translationX;
      //Bloqueia movimento vertical - mantém Y fixo
      const newBaseTranslateY = 0; //Não permite movimento vertical
      
      //Aplicar limites finais rigorosos
      const clampedX = Math.max(limits.minX, Math.min(limits.maxX, newBaseTranslateX));
      const clampedY = 0; //Sempre centralizado verticalmente
      
      //Validação final: garantir que o mapa sempre fique visível e centralizado
      const horizontalLimit = width * 0.25; //25% da largura da tela
      baseTranslateX.current = Math.max(-horizontalLimit, Math.min(horizontalLimit, clampedX));
      baseTranslateY.current = 0; //Sempre centralizado verticalmente
      
      //Atualizar valores finais
      translateX.setValue(baseTranslateX.current);
      translateY.setValue(baseTranslateY.current);
    }
  };

  //Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    mapContainer: {
      flex: 1,
      backgroundColor: colors.background,
      zIndex: 1,
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

  return (
    <View style={dynamicStyles.mainContainer}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor="#fff" //Cor do header estática (branca)
        translucent={true} 
      />
      
      {/*Container principal com Safe Area*/}
      <View style={[styles.container, { paddingTop: safeTop }]}>
        {/*Search Bar Moderna*/}
        <View style={styles.searchContainer}>
          <SearchBar
            salas={salas}
            onSearch={handleSearch}
            onSalaSelect={handleSearch}
          />
        </View>

        {/*Mapa Container*/}
        <View style={dynamicStyles.mapContainer}>
          <GestureHandlerRootView style={styles.gestureContainer}>
            <Animated.View style={styles.mapWrapper}>
              <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onPanHandlerStateChange}
                minPointers={1}
                maxPointers={1}
              >
                <Animated.View>
                  <PinchGestureHandler
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchHandlerStateChange}
                  >
                    <Animated.View
                      style={[
                        styles.mapImage,
                        {
                          transform: [
                            { scale: scale },
                            { translateX: translateX },
                            { translateY: translateY },
                          ],
                        },
                      ]}
                    >
                      <ImageBackground
                        source={getImageSource(currentImage)}
                        style={styles.mapImageBackground}
                        resizeMode="contain"
                      />
                    </Animated.View>
                  </PinchGestureHandler>
                </Animated.View>
              </PanGestureHandler>
            </Animated.View>
          </GestureHandlerRootView>
        </View>

        {/*Botão para resetar zoom*/}
        <Animated.View style={{ opacity: controlsOpacity }}>
          <TouchableOpacity 
            style={[styles.resetZoomButton, { bottom: 80 }]} 
            onPress={handleResetZoom}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.resetZoomText}>Resetar Zoom</Text>
          </TouchableOpacity>
        </Animated.View>

        {/*Botão para limpar seleção*/}
        {selectedSala && (
          <Animated.View style={{ opacity: controlsOpacity }}>
            <TouchableOpacity 
              style={[styles.clearSelectionButton, { bottom: 130 }]} 
              onPress={resetMap}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={20} color="#fff" />
              <Text style={styles.clearSelectionText}>Voltar ao mapa geral</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/*BottomNav fixo no final - fora do container principal*/}
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 100,
  },
  mapContainer: {
    flex: 1,
    zIndex: 1,
    paddingTop: 0,
    paddingBottom: 10,
  },
  gestureContainer: {
    flex: 1,
  },
  mapWrapper: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 10, 
    paddingBottom: 0,
    minHeight: height - 200, 
  },
  mapImage: {
    width: width,
    height: 500, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  clearSelectionButton: {
    position: 'absolute',
    bottom: 150,
    right: 10,
    backgroundColor: '#FF4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width - 20,
  },
  clearSelectionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  resetZoomButton: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width - 20,
  },
  resetZoomText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  imageIndicator: {
    position: 'absolute',
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: width - 20,
  },
  imageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});