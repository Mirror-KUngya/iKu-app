import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import colors from './lib/styles/colors';
import {
  CheckListScreen,
  HomeScreen,
  LoginScreen,
  MissionStatusScreen,
  SettingScreen,
  SignUpScreen,
} from './screens';

import { useEffect } from 'react';
import axios from 'axios';
import getToken from './getToken'

const SERVER_URL = 'http://192.168.64.19:3000/notice/token';

// // 서버에 전송할 토큰 형태를 정의합니다.
// interface TokenPayload {
//   token: string;
// }

// async function sendTokenToServer(token: string): Promise<void> {
//   try {
//     await axios.post<TokenPayload>(SERVER_URL, { token });
//     console.log('Token sent to server successfully');
//   } catch (error) {
//     console.error('Error sending token to server:', error);
//   }
// }

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await getToken();
  //     if (token) {
  //       sendTokenToServer(token);
  //       console.log(token);
  //     }
  //   };

  //   fetchToken();
  // }, []);
  const customOption1 = (title = '') => {
    return {
      title: title,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    };
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: '900',
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            title: '회원가입',
          }}></Stack.Screen>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'iKU',
            headerTintColor: colors.darkGreen,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerBackVisible: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="CheckListScreen"
          component={CheckListScreen}
          options={{
            title: '체크리스트',
          }}></Stack.Screen>
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            title: '설정',
          }}></Stack.Screen>
        <Stack.Screen
          name="MissionStatusScreen"
          component={MissionStatusScreen}
          options={{
            title: '미션 현황',
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
