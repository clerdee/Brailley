import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NotificationProvider } from './src/context/NotificationContext';

import LandingScreen from './src/screens/auth/LandingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}