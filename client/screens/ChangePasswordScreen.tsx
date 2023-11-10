import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../lib/styles/colors';
import {useState} from 'react';

type ChangePasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePasswordScreen'
>;

const ChangePasswordScreen: React.FC<ChangePasswordProps> = ({navigation}) => {
  const [inputId, setInputId] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>회원 정보를 입력해주세요.</Text>
      <TextInput
        placeholder="아이디"
        style={styles.textInput}
        returnKeyType={'done'}
        blurOnSubmit={false}
        value={inputId}
        onChangeText={text => setInputId(text)}
      />
      <TextInput
        placeholder="전화번호"
        style={styles.textInput}
        returnKeyType={'done'}
        blurOnSubmit={false}
        value={inputPhone}
        onChangeText={text => setInputPhone(text)}
      />
      <TextInput
        placeholder="새로운 비밀번호"
        style={styles.textInput}
        returnKeyType={'done'}
        autoComplete={'password'}
        secureTextEntry={true}
        blurOnSubmit={false}
        value={inputNewPassword}
        onChangeText={text => setInputNewPassword(text)}
      />
      <TouchableOpacity
        style={[styles.buttonContainer]}
        //onPress={onLoginPress}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonText}>변경</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'white',
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
  buttonContainer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '900',
    margin: 20,
  },
  buttonText: {
    width: 300,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
});

export {ChangePasswordScreen};
