import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ThemeProvider as MagnusThemeProvider } from 'react-native-magnus';
import { ThemeProvider } from 'styled-components/native';
import AppProvider from './context/authProvider';
import BookmarkProvider from './context/bookmarkProvider';
import { GlobalUIProvider } from './context/GlobalUIProvider';
import { LoadingProvider } from './context/loadingProvider';
import './gesture-handler';
import AppNavigator from './navigation/appNavigator';
import { customTheme } from './utils/theme';

const queryClient = new QueryClient()

export default function App() {
  console.log('1')
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(customTheme.colors.background);
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <StatusBar backgroundColor={customTheme.colors.background} />
        <GlobalUIProvider>
          <MagnusThemeProvider theme={customTheme}>
            <LoadingProvider>
              <AppProvider>
                <BookmarkProvider>
                  <AppNavigator />
                </BookmarkProvider>
              </AppProvider>
            </LoadingProvider>
          </MagnusThemeProvider>
        </GlobalUIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
