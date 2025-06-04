import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AuthLayout from '../layout/AuthLayout';
import {globalStyles} from '../theme/globalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import useAuth from '../store/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const setUser = useAuth(state => state.setUser);

  const login = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const userCredentials = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const userData = await firestore()
          .collection('users')
          .doc(userCredentials.user.uid)
          .get();

        if (userData.exists) {
          setUser({
            id: userData.id,
            ...userData.data(),
          });
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              id: userData.id,
              ...userData.data(),
            }),
          );
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
        }
      } catch (error) {
        Alert.alert(error.message);
      }
      setLoading(false);
    } else {
      Alert.alert('Please fill all the fields');
    }
  };
  return (
    <AuthLayout>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={globalStyles.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.primaryButton} onPress={login}>
        <Text style={globalStyles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.primaryButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.btnText}>Register</Text>
      </TouchableOpacity>
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default LoginScreen;
