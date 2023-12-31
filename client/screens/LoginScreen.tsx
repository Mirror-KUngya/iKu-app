import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../lib/styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import handleLogin from '../handleApi/User/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  
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
        onChangeText={text => setPassword(text)}
      />
      <View>
        <TouchableOpacity
          style={[styles.loginButtonContainer]}
          onPress={async () => {
            try {
              const result = await handleLogin(userId, password, navigation);
              if (result) {
                AsyncStorage.setItem('userId', userId);
                navigation.navigate('HomeScreen');
              } else {
                Alert.alert("아이디나 비밀번호를 다시 확인해주세요.")
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.loginButtonContainer]}
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}>
          <Text style={[styles.signupText]}>처음이신가요?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FindIdScreen');
          }}>
          <Text style={styles.textInButton}>아이디찾기</Text>
        </TouchableOpacity>
        <Text style={styles.textInButton}>|</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChangePasswordScreen');
          }}>
          <Text style={styles.textInButton}>비밀번호변경</Text>
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
    flex: 0.5,
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
    fontSize: 24,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.navy,
    margin: 10,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    marginTop: 10,
  },
  loginText: {
    width: 300,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
  signupText: {
    width: 300,
    color: colors.orange,
    borderColor: colors.orange,
    borderWidth: 2,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  textInButton: {
    fontSize: 22,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
export {LoginScreen};
