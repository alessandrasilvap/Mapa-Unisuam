import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface WebMapViewProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  showsCompass?: boolean;
  showsScale?: boolean;
  children?: React.ReactNode;
  onRegionChangeComplete?: (region: any) => void;
}

/**
 * Web-compatible MapView component
 * Shows a placeholder for web since react-native-maps doesn't work on web
 */
export default function WebMapView({ 
  style, 
  initialRegion, 
  showsUserLocation, 
  showsMyLocationButton, 
  showsCompass, 
  showsScale, 
  children,
  onRegionChangeComplete 
}: WebMapViewProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webMapContainer, style]}>
        <View style={styles.webMapPlaceholder}>
          <Text style={styles.webMapTitle}>🗺️ Mapa da Faculdade</Text>
          <Text style={styles.webMapSubtitle}>
            O mapa interativo está disponível apenas em dispositivos móveis
          </Text>
          <Text style={styles.webMapInfo}>
            Para uma experiência completa, use o app em seu smartphone
          </Text>
        </View>
        {children}
      </View>
    );
  }

  // For native platforms, this component shouldn't be used
  // Use the actual MapView from react-native-maps instead
  return null;
}

const styles = StyleSheet.create({
  webMapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: 300,
  },
  webMapTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  webMapSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  webMapInfo: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});
