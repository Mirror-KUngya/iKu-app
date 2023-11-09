import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../lib/styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import axios from 'axios';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    console.log("로그인 버튼 눌림");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/signIn';
    try {
      const response = await axios.post(SERVER_URL, { UserID:userId, UserPW:password });
      console.log('UserInfo sent to server successfully');
      console.log(response.status)
      // 로그인 성공 처리
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        navigation.navigate('HomeScreen');
      } else { // 로그인 에러
        console.log('Login failed:', response.data.message);
      }

    } catch (error) {
      console.log('Error sending userINfo to server:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.mainImage}
        source={require('../assets/images/iku_image.png')}
      />
      <Text style={styles.mainText}>iKU</Text>
      <TextInput
        placeholder="아이디"
        style={styles.textInput}
        returnKeyType={'next'}
        autoComplete={'email'}
        blurOnSubmit={false}
        value={userId}
        // onChange={e => setUserID(e.nativeEvent.text)}
        onChangeText={text => setUserID(text)}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.textInput}
        returnKeyType={'done'}
        autoComplete={'password'}
        secureTextEntry={true}
        blurOnSubmit={false}
        value={password}
        // onChange={e => setPassword(e.nativeEvent.text)}
        onChangeText={text => setPassword(text)}
      />
      <View>
        <TouchableOpacity
          style={[styles.loginButtonContainer]}
          onPress={handleLogin}>
          <Text
            style={styles.loginText}>
            로그인
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.textInButton}>아이디찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}>
          <Text style={styles.textInButton}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  mainText: {
    color: colors.green,
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInput: {
    width: 300,
    fontSize: 20,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.navy,
    margin: 5,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    marginTop: 10,
  },
  loginText: {
    width: 300,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  signButton: {},
  textInButton: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
export { LoginScreen };
