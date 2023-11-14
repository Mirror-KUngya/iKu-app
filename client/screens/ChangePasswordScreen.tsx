import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../lib/styles/colors';
import {useState} from 'react';
import resetPW from '../handleApi/User/resetPW';
import {Alert} from 'react-native';
import findUser from '../handleApi/User/findUserForPW';

type ChangePasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePasswordScreen'
>;

const ChangePasswordScreen: React.FC<ChangePasswordProps> = ({navigation}) => {
  const [inputId, setInputId] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [hideFirstScreen, setHideFirstScreen] = useState(false); // 첫 화면 숨기기
  const [result, setResult] = useState(true); // 비밀번호 성공하면 true, 실패하면 false로
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isExist, setIsExsit] = useState(false);

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setIsPasswordMatch(inputNewPassword === text);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: hideFirstScreen ? 'none' : 'flex',
        }}>
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
        <TouchableOpacity
          onPress={async () => {
            try {
              const user = await findUser(inputId, inputPhone);
              console.log(user);
              if (user) {
                setIsExsit(true);
              } else {
                setIsExsit(false);
                Alert.alert('아이디나 전화번호를 다시 확인해주세요.');
              }
            } catch (error) {
              console.log(error);
            }
          }}
          style={[styles.buttonContainer]}>
          <Text style={styles.buttonText}>회원 조회</Text>
        </TouchableOpacity>
        {isExist && (
          <>
            <Text style={styles.confirmText}>회원조회가 완료되었습니다.</Text>
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
            <TextInput
              placeholder="새로운 비밀번호 확인"
              style={styles.textInput}
              returnKeyType={'next'}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange} // 변경됨
            />
            {!isPasswordMatch && (
              <Text style={styles.confirmText}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
            <TouchableOpacity
              style={[styles.buttonContainer]}
              onPress={async () => {
                try {
                  const res = await resetPW(
                    inputId,
                    inputPhone,
                    inputNewPassword,
                  );
                  console.log(res);
                  setResult(true);
                  setHideFirstScreen(true);
                } catch (error) {
                  Alert.alert('비밀번호 변경 중 오류가 발생했습니다.');
                  setResult(false);
                  setHideFirstScreen(false);
                }
              }}>
              <Text style={styles.buttonText}>변경</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View
        style={[
          {alignItems: 'center', display: hideFirstScreen ? 'flex' : 'none'},
        ]}>
        {result ? (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/check.png')}
            />
            <Text style={styles.titleText}>비밀번호가 변경되었습니다.</Text>
            <TouchableOpacity
              style={[styles.buttonContainer]}
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.buttonText}>로그인 하러 가기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/warning.png')}
            />
            <Text style={styles.titleText}>
              존재하지 않는{'\n'}회원 정보입니다.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setHideFirstScreen(false);
                }}>
                <Text style={[styles.buttonText, {width: 160}]}>
                  이전 페이지로
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={[styles.buttonText, {width: 160}]}>
                  로그인 하러 가기
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const width_proportion = '100%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 30,
    width: 600,
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
    fontSize: 32,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  buttonText: {
    width: width_proportion,
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
  confirmText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 15,
  },
});

export {ChangePasswordScreen};
