import {ActivityIndicator, View} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../theme/globalStyles';
import {colors} from '../theme/colors';
import useAuth from '../store/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckCredentials'>;

const CheckCredentialsScreen = ({navigation}: Props) => {
  const setUser = useAuth(state => state.setUser);

  useEffect(() => {
    (async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        setUser(JSON.parse(userString));
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        });
      }
    })();
  }, [setUser, navigation]);

  return (
    <View style={globalStyles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  );
};

export default CheckCredentialsScreen;
