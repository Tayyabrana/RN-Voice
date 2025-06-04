import {Alert, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../layout/AuthLayout';
import {globalStyles} from '../theme/globalStyles';
import Loader from '../components/Loader';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (username && email && password) {
      setLoading(true);
      try {
        const userCredentials = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await firestore()
          .collection('users')
          .doc(userCredentials.user.uid)
          .set({
            email,
            username,
            password,
          });
        navigation.navigate('Login');
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
        placeholder="Username"
        style={globalStyles.input}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={globalStyles.primaryButton} onPress={register}>
        <Text style={globalStyles.btnText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.primaryButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.btnText}>Login</Text>
      </TouchableOpacity>
      <Loader visible={loading} />
    </AuthLayout>
  );
};

export default RegisterScreen;
