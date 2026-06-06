import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Ingreso"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e293b',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Ingreso" component={LoginScreen} options={{ title: 'Ingreso' }} />
        <Stack.Screen name="Registro" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
