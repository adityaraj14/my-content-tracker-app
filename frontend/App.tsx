/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { secureStorage } from './src/services/storage/secureStorage';
import { TMDB_API_KEY } from '@env';

// Enable screens for better performance
enableScreens();

// Define the type for our navigation stack
export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const initializeSecureStorage = async () => {
      try {
        if (!TMDB_API_KEY) {
          throw new Error('TMDB API key is not configured');
        }
        await secureStorage.initialize(TMDB_API_KEY);
      } catch (error) {
        console.error('Failed to initialize secure storage:', error);
      }
    };

    initializeSecureStorage();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                  title: 'StoryTime',
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;