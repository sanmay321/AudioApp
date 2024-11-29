import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeName} from '../constants/routeName';
import AudioDevices from '../screens/AudioDevices';


const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routeName.AUDIO_DEVICES} component={AudioDevices} />
      
    </Stack.Navigator>
  );
};

export default HomeStack;
