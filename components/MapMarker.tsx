import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface MapMarkerProps {
  x: number; // Posição X em porcentagem (0-1)
  y: number; // Posição Y em porcentagem (0-1)
  highlighted?: boolean;
  color?: string;
  size?: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  x,
  y,
  highlighted = false,
  color = '#00FFFF',
  size = 12,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (highlighted) {
      // Animação de pulso contínua
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [highlighted, pulseAnim]);

  return (
    <View
      style={[
        styles.marker,
        {
          left: `${x * 100}%`,
          top: `${y * 100}%`,
        },
      ]}
    >
      <View
        style={[
          styles.markerContainer,
          {
            width: size * 2,
            height: size * 2,
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          <Ionicons
            name="location"
            size={size}
            color={highlighted ? '#FF4444' : color}
            style={styles.locationIcon}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    // Centralizar o marcador na posição exata (metade do tamanho)
    transform: [{ translateX: -7 }, { translateY: -7 }],
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    elevation: 8,
  },
  locationIcon: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    elevation: 8,
  },
});

export default MapMarker;