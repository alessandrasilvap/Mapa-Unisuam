import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSettings } from '../hooks/useSettings';

interface Sala {
  nome: string;
  imagem: string;
}

interface SearchBarProps {
  salas: Sala[];
  onSearch: (sala: Sala | null) => void;
  onSalaSelect: (sala: Sala) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ salas, onSearch, onSalaSelect }) => {
  const { colors, vibrate } = useSettings();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Sala[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtrar sugestões baseado no texto digitado
  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = salas.filter(sala =>
        sala.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText, salas]);

  const handleSearch = () => {
    Keyboard.dismiss();
    
    if (searchText.trim() === '') {
      Alert.alert('Atenção', 'Digite o nome da sala para buscar');
      return;
    }

    const salaEncontrada = salas.find(sala =>
      sala.nome.toLowerCase() === searchText.toLowerCase()
    );

    if (salaEncontrada) {
      onSearch(salaEncontrada);
      onSalaSelect(salaEncontrada);
      setSearchText('');
      setShowSuggestions(false);
    } else {
      Alert.alert('Sala não encontrada', 'Verifique o nome da sala e tente novamente');
      onSearch(null);
    }
  };

  const handleSuggestionPress = (sala: Sala) => {
    setSearchText(sala.nome);
    setShowSuggestions(false);
    onSearch(sala);
    onSalaSelect(sala);
  };

  const handleClear = () => {
    setSearchText('');
    setShowSuggestions(false);
    onSearch(null);
  };


  const dynamicStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 1,
      borderRadius: 30,
      
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    clearButton: {
      padding: 0,
      borderRadius: 10,
      
    },
    searchButton: {
      backgroundColor: colors.primary,
      borderRadius: 24,
      padding: 10,
      marginLeft: 8,
    },
    suggestionsList: {
      position: 'absolute',
      top: 70,
      left: 16,
      right: 16,
      backgroundColor: colors.card,
      borderRadius: 16,
      marginTop: 4,
      maxHeight: 200,
      zIndex: 300,
      borderWidth: 1,
      borderColor: colors.primary + '20',
    },
    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary + '20',
    },
    suggestionText: {
      marginLeft: 10,
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.searchContainer}>
        <View style={dynamicStyles.inputContainer}>
          <Ionicons name="search" size={20} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            style={dynamicStyles.input}
            placeholder="Digite o nome da sala..."
            placeholderTextColor={colors.text + '60'}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="words"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={dynamicStyles.clearButton}>
              <Ionicons name="close-circle" size={25} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={dynamicStyles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={dynamicStyles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}
            >
              <Ionicons name="location" size={16} color={colors.primary} />
              <Text style={dynamicStyles.suggestionText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          style={dynamicStyles.suggestionsList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#7e57c2',
    borderRadius: 24,
    padding: 5,
    marginLeft: 8,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 8,
    maxHeight: 200,
    zIndex: 300,
    borderWidth: 1,
    borderColor: '#7e57c220',
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#7e57c220',
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
});

export default SearchBar;
