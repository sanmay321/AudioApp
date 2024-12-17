import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeName} from '../constants/routeName';
import AudioDevices from '../screens/AudioDevices';
import Device from '../screens/Device';
import AudioPlayer from '../screens/AudioPlayer';
import WaveformVisualizer from '../screens/WaveformVisualizer';


const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routeName.AUDIO_DEVICES} component={AudioDevices} />
      <Stack.Screen name={routeName.DEVICE} component={Device} />
      
    </Stack.Navigator>
  );
};

export default HomeStack;
