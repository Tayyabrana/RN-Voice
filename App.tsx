/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {JSX} from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <RootNavigator />
      <ZegoUIKitPrebuiltCallFloatingMinimizedView />
    </NavigationContainer>
  );
}

export default App;
