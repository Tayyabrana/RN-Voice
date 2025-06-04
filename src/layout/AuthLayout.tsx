import {Image, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../theme/globalStyles';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/icon.png')} style={globalStyles.logo} />
      {children}
    </View>
  );
};

export default AuthLayout;
