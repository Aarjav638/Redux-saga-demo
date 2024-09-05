import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import store from '../redux/store';
import Home from '../screens/Home';
import {StatusBar} from 'react-native';
import Chart from '../screens/Chart';
export type RootStackParamList = {
  Home: undefined;
  Chart: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chart" component={Chart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigator;
