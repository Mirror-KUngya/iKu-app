import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import colors from './lib/styles/colors';
import {
  CheckListScreen,
  HomeScreen,
  LoginScreen,
  SettingScreen,
} from './screens';

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}></Stack.Screen>
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
            headerTitleAlign: 'center',
          }}></Stack.Screen>
        <Stack.Screen
          name="CheckListScreen"
          component={CheckListScreen}
          options={{
            title: '체크리스트',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}></Stack.Screen>
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            title: '설정',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
