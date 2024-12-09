import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';

import Splash from './views/layout/Splash';
import Home from './views/home/Home';
import Citas from './views/home/Citas';
import ResultadosEstudios from './views/home/ResultadosEstudios';
import Configuracion from './views/home/Configuracion';

//Auth
import Welcome from './views/auth/Welcome';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';

//Modal
import EditForms from './views/home/Screens/EditForms';
import EditEstudio from './views/home/Screens/EditEstudio';

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
      <Tab.Screen name="Inicio" component={Home} options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused ?
                require('./src/icons/homeNegro.png') :
                require('./src/icons/home.png')
            }
            style={{
              height: 22, width: 22
            }}
          />
        )
      }} />
      <Tab.Screen name="Estudios" component={Citas}   options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused ?
                require('./src/icons/citaNegro.png') :
                require('./src/icons/cita.png')
            }
            style={{
              height: 22, width: 22
            }}
          />
        )
      }}/>
      <Tab.Screen name="Resultados" component={ResultadosEstudios}  options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused ?
                require('./src/icons/calendariosNegro.png') :
                require('./src/icons/calendarios.png')
            }
            style={{
              height: 22, width: 22
            }}
          />
        )
      }} />
      <Tab.Screen name="Configuracion" component={Configuracion}  options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused ?
                require('./src/icons/configuracionNegro.png') :
                require('./src/icons/configuracion.png')
            }
            style={{
              height: 22, width: 22
            }}
          />
        )
      }} />
    </Tab.Navigator>
  )
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MainTabs' component={AppTabs} options={{headerShown: false}}/>
      <Stack.Screen name='Modals' component={EditForms} options={{presentation: 'modal', headerTitle: '', headerTransparent: true, headerStyle: {backgroundColor: "transparent"}}} />
      <Stack.Screen name='EditEstudio' component={EditEstudio} options={{presentation: 'modal', headerTitle: '', headerTransparent: true, headerStyle: {backgroundColor: "transparent"}}} />
    </Stack.Navigator>
  )
}

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Root" component={RootStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
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
 