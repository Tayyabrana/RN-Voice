import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@react-native-firebase/firestore';
import useAuth, {User} from '../store/useAuth';
import {globalStyles} from '../theme/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigator';
import {colors} from '../theme/colors';

const db = getFirestore();

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const user = useAuth(state => state.user);
  const setUser = useAuth(state => state.setUser);
  const [contacts, setContacts] = useState<User[]>([]);

  const initService = useCallback(() => {
    if (user) {
      ZegoUIKitPrebuiltCallService.init(
        '', // Your APP ID
        '', // Your App Sign
        user?.id,
        user?.username,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: 'zego_incoming.wav',
            outgoingCallFileName: 'zego_outgoing.wav',
          },
          androidNotificationConfig: {
            channelID: 'CallInvitation',
            channelName: 'CallInvitation',
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          requireConfig: () => {
            return {
              onHangUp: () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              },
            };
          },
          topMenuBarConfig: {
            buttons: ['minimizingButton'],
          },
          onWindowMinimized: () => navigation.navigate('Home'),
          onWindowMaximized: () =>
            navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen'),
        },
      ).then(() => {
        ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
          message:
            'We need your consent for the following permissions in order to use the offline call function properly',
          allow: 'Allow',
          deny: 'Deny',
        });
      });
    }
  }, [user, navigation]);

  const getUsers = useCallback(async () => {
    if (user) {
      const q = query(
        collection(db, 'users'),
        where('email', '!=', user.email),
      );
      const userDocs = await getDocs(q);
      const users: any = [];
      userDocs.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setContacts(users);
    }
  }, [user]);

  useEffect(() => {
    initService();

    getUsers();
  }, [getUsers, initService]);

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    ZegoUIKitPrebuiltCallService.uninit();
    navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <View style={styles.contact}>
            <Text style={styles.username}>{item.username}</Text>
            <View style={styles.actionBtns}>
              <ZegoSendCallInvitationButton
                invitees={[{userID: item.id, userName: item.username}]}
                isVideoCall={false}
                resourceID={'zego_data'}
                showWaitingPageWhenGroupCall={true}
              />
              <ZegoSendCallInvitationButton
                invitees={[{userID: item.id, userName: item.username}]}
                isVideoCall={true}
                resourceID={'zego_video_call'}
                showWaitingPageWhenGroupCall={true}
              />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contact: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  username: {
    fontWeight: '600',
    fontSize: 18,
    color: '#333',
  },
  actionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoutButton: {
    marginVertical: 20,
    padding: 12,
    backgroundColor: '#ff4d4f',
    borderRadius: 10,
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
