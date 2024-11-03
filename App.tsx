import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-native-paper';

import Splash from './views/layout/Splash';
import Home from './views/home/Home';
import Citas from './views/home/Citas';

const Tab = createMaterialBottomTabNavigator()

function App(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Citas" component={Citas} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
 