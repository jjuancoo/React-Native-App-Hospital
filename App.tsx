import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';

import Splash from './views/layout/Splash';
import Home from './views/home/Home';
import Citas from './views/home/Citas';

//Auth
import Welcome from './views/auth/Welcome';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';

const Tab = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={SignIn} />
      <Stack.Screen name='Register' component={SignUp} />
    </Stack.Navigator>
  )
}

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Citas" component={Citas} />
    </Tab.Navigator>
  )
};

const MainNavigator = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Manejar la Splash Screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  if (isLoading) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    );
  }

  return (
      isAuthenticated ? <AppTabs /> : <AuthStack />
  );
};

function App(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState(true);

  //Desaparece la splash screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <AuthProvider>
      <Provider>
        <NavigationContainer>
        <MainNavigator />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}

export default App;
 