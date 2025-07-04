import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import MultiSearch from '../components/MultiSearch';
import { SearchResult } from '../components/MultiSearch/types';
import { styles } from './HomeScreen.styles';

/**
 * HomeScreen component serves as the main screen of the application.
 * It displays a header with theme toggle and a search section for finding stories.
 */
const HomeScreen: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleSearchComplete = (results: SearchResult[]) => {
    console.log('Search completed with results:', results);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentInsetAdjustmentBehavior="automatic">
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.headerTitle}>StoryTime</Text>
        <TouchableOpacity style={styles.darkModeToggle} onPress={toggleTheme}>
          <Text style={styles.darkModeText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Search
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.text }]}>
            Find your favorite stories across multiple sources
          </Text>
        </View>

        <MultiSearch onSearchComplete={handleSearchComplete} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen; 