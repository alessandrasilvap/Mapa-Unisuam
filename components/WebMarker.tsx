import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface WebMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  pinColor?: string;
  onPress?: () => void;
}

/**
 * Web-compatible Marker component
 * Shows a placeholder marker for web since react-native-maps doesn't work on web
 */
export default function WebMarker({ 
  coordinate, 
  title, 
  description, 
  pinColor = '#007AFF',
  onPress 
}: WebMarkerProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webMarker, { backgroundColor: pinColor }]} onTouchEnd={onPress}>
        <Text style={styles.webMarkerText}>📍</Text>
        {title && <Text style={styles.webMarkerTitle}>{title}</Text>}
        {description && <Text style={styles.webMarkerDescription}>{description}</Text>}
      </View>
    );
  }

  // For native platforms, this component shouldn't be used
  // Use the actual Marker from react-native-maps instead
  return null;
}

const styles = StyleSheet.create({
  webMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  webMarkerText: {
    fontSize: 20,
  },
  webMarkerTitle: {
    position: 'absolute',
    top: 45,
    left: -50,
    width: 140,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  webMarkerDescription: {
    position: 'absolute',
    top: 65,
    left: -50,
    width: 140,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 4,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
