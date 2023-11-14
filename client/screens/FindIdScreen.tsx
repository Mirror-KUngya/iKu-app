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
import findID from '../handleApi/User/findID';

type FindIdProps = NativeStackScreenProps<RootStackParamList, 'FindIdScreen'>;

const FindIdScreen: React.FC<FindIdProps> = ({navigation}) => {
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [hideFirstScreen, setHideFirstScreen] = useState(false); // 첫 화면 숨기기
  const [result, setResult] = useState(false); // 비밀번호 성공하면 true, 실패하면 false로
  const [userId, setUserId] = useState(''); // 회원 아이디

  return (
    <View style={styles.container}>
      <View
        style={{
          display: hideFirstScreen ? 'none' : 'flex',
        }}>
        <Text style={styles.titleText}>회원 정보를 입력해주세요.</Text>
        <TextInput
          placeholder="이름"
          style={styles.textInput}
          returnKeyType={'done'}
          blurOnSubmit={false}
          value={inputName}
          onChangeText={text => setInputName(text)}
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
          style={[styles.buttonContainer]}
          onPress={async () => {
            try {
              const foundUserId = await findID(inputName, inputPhone);
              if (foundUserId) {
                setUserId(foundUserId); // 찾은 아이디 설정
                setResult(true); // 결과 상태를 성공으로 설정
              } else {
                setUserId(''); // 아이디를 비움
                setResult(false); // 결과 상태를 실패로 설정
              }
              setHideFirstScreen(true); // 화면 전환
            } catch (error) {
              console.log(error);
              setUserId(''); // 오류 발생 시 아이디를 비움
              setResult(false); // 결과 상태를 실패로 설정
              setHideFirstScreen(true); // 화면 전환
            }
          }}>
          <Text style={styles.buttonText}>찾기</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          display: hideFirstScreen ? 'flex' : 'none',
        }}>
        {result ? (
          <>
            <Image
              style={styles.image}
              source={require('../assets/images/check.png')}
            />
            <Text style={styles.titleText}>
              회원님의 아이디는{'\n'}
              {userId}입니다.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={[styles.buttonText, {width: 160}]}>
                  로그인 하러 가기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangePasswordScreen');
                }}>
                <Text style={[styles.buttonText, {width: 160}]}>
                  비밀번호변경
                </Text>
              </TouchableOpacity>
            </View>
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
                <Text style={[styles.buttonText, {width: 200}]}>
                  이전 페이지로
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={[styles.buttonText, {width: 200}]}>
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
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
});
export {FindIdScreen};
