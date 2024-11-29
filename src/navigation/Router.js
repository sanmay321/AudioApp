import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {routeName} from '../constants/routeName';
import AuthStack from './AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';


const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routeName.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={routeName.HOME_STACK} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
