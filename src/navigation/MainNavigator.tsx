import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import HomeScreen from '../screens/HomeScreen';
import {colors} from '../theme/colors';

export type MainStackParamList = {
  Home: undefined;
  ZegoUIKitPrebuiltCallWaitingScreen: undefined;
  ZegoUIKitPrebuiltCallInCallScreen: undefined;
  Auth: undefined;
};

const NativeStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}>
      <NativeStack.Screen name="Home" component={HomeScreen} />
      <NativeStack.Screen
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
        options={{headerShown: false}}
      />
      <NativeStack.Screen
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
        options={{headerShown: false}}
      />
    </NativeStack.Navigator>
  );
};

export default MainNavigator;
