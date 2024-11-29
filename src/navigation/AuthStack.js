import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeName} from '../constants/routeName';
import Login from '../screens/Login';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routeName.LOGIN} component={Login} />
    
    </Stack.Navigator>
  );
};

export default AuthStack;
