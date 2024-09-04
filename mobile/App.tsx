import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import React from 'react';
import { ThemeProvider as MagnusThemeProvider } from 'react-native-magnus';
import { ThemeProvider } from 'styled-components/native';
import AppProvider from './context/authProvider';
import { LoadingProvider } from './context/loadingProvider';
import './gesture-handler';
import AppNavigator from './navigation/appNavigator';
import { customTheme } from './utils/theme';
import { SafeAreaView, StatusBar } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  const [loaded, error] = Font.useFonts({
    "Poppins-Regular": require('./assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Bold": require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={customTheme}>
      <MagnusThemeProvider theme={customTheme}>
        <LoadingProvider>
          <AppProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar barStyle="dark-content" backgroundColor="white" />
              <AppNavigator />
            </SafeAreaView>
          </AppProvider>
        </LoadingProvider>
      </MagnusThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
}
