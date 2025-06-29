import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F8F8F8',
    text: '#000000',
    border: '#DDDDDD',
    notification: '#FF3B30',
    // Custom colors
    inputBackground: '#FFFFFF',
    inputText: '#000000',
    inputBorder: '#DDDDDD',
    placeholder: '#666666',
    resultBackground: '#F8F8F8',
    resultTitle: '#000000',
    resultDescription: '#666666',
    resultSource: '#999999',
    error: '#FF3B30',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#38383A',
    notification: '#FF453A',
    // Custom colors
    inputBackground: '#2C2C2E',
    inputText: '#FFFFFF',
    inputBorder: '#38383A',
    placeholder: '#8E8E93',
    resultBackground: '#2C2C2E',
    resultTitle: '#FFFFFF',
    resultDescription: '#CCCCCC',
    resultSource: '#8E8E93',
    error: '#FF453A',
  },
};

export type Theme = typeof lightTheme; 