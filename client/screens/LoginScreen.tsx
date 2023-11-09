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
import handleLogin from '../handleApi/Login';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const onLoginPress = () => {
    handleLogin(userId, password, navigation);
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
          //onPress={onLoginPress}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
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
