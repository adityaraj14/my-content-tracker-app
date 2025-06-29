import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { MultiSearchProps, SearchResult } from './types';
import { useTheme } from '../../theme/ThemeContext';
import { tmdbApi, ApiError } from '../../services/api/tmdbApi';

export const MultiSearch: React.FC<MultiSearchProps> = ({ onSearchComplete }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApi = async () => {
      try {
        await tmdbApi.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize API. Please restart the app.');
        console.error('Initialization error:', err);
      }
    };

    initializeApi();
  }, []);

  const searchApis = async (searchQuery: string) => {
    if (!isInitialized) {
      setError('API is not initialized. Please wait or restart the app.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const transformedResults = await tmdbApi.searchTVShows(searchQuery);
      setResults(transformedResults);
      if (onSearchComplete) {
        onSearchComplete(transformedResults);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? `Error ${err.status}: ${err.message}`
        : 'Failed to fetch results. Please try again.';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchApis(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.inputText,
              borderColor: theme.colors.inputBorder,
            }
          ]}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for one..."
          placeholderTextColor={theme.colors.placeholder}
        />
        <TouchableOpacity
          style={[
            styles.searchButton,
            { backgroundColor: theme.colors.primary }
          ]}
          onPress={handleSearch}
          disabled={isLoading}>
          <Text style={styles.searchButtonText}>
            {isLoading ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
        {(query || results.length > 0) && (
          <TouchableOpacity
            style={[
              styles.clearButton,
              { backgroundColor: theme.colors.error }
            ]}
            onPress={handleClear}>
            <Text style={styles.searchButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      <ScrollView style={styles.resultsContainer}>
        {results.map((result) => (
          <View 
            key={result.id} 
            style={[
              styles.resultItem,
              { backgroundColor: theme.colors.resultBackground }
            ]}
          >
            <Text style={[
              styles.resultTitle,
              { color: theme.colors.resultTitle }
            ]}>
              {result.title || 'Untitled'}
            </Text>
            <Text style={[
              styles.resultSource,
              { color: theme.colors.resultSource }
            ]}>
              Type: {result.type}
            </Text>
            {typeof result.voteAverage === 'number' && result.voteAverage > 0 && (
              <Text style={[
                styles.resultSource,
                { color: theme.colors.resultSource }
              ]}>
                Rating: {result.voteAverage.toFixed(1)}/10
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}; 