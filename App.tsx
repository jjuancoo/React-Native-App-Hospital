import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-native-paper';

import Splash from './views/layout/Splash';

const Tab = createMaterialBottomTabNavigator()

function App(): React.JSX.Element {

  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Splash">
          <Tab.Screen name="Splash" component={Splash} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
 