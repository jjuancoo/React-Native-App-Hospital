import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-native-paper';

import Splash from './views/layout/Splash';
import Home from './views/home/Home';
import Citas from './views/home/Citas';

//Auth
import Welcome from './views/auth/Welcome';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';

const Tab = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState(true);

  //Desaparece la splash screen
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Provider>
      <NavigationContainer>
        {isLoading ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
          </Stack.Navigator>
        ) : 
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Login' component={SignIn}/>
            <Stack.Screen name='Register' component={SignUp}/>
          </Stack.Navigator>
        }
      </NavigationContainer>
    </Provider>
  );
}

export default App;
 