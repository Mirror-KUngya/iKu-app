import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../types';
import colors from '../lib/styles/colors';
import inputState from '../lib/utils/inputState';
import DatePicker from '../components/DatePicker';

type SignUptProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: React.FC<SignUptProps> = ({ navigation }) => {
  const [userId, setUserID] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [seniorUserId, setSeniorUserID] = useState('');
  const [seniorUserPassword, setSenioeUserPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);


  const checkUserIdAvailability = () => {
    // 실제 앱에서는 여기서 백엔드 API를 호출하여 확인을 수행합니다.
    // 예시를 위해 항상 사용 가능하다고 가정합니다.
    setIsUserIdAvailable(true);
  };
  // 나중에 이 함수를 '중복 확인' 버튼의 onPress 이벤트에 연결합니다.

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordMatch(text === confirmPassword);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setIsPasswordMatch(password === text);
  };


  const [userOption, setUserOption] = useState<'보호자 회원' | '노인 회원'>(
    '보호자 회원',
  );

  const [userIdInputState, setUserIdInputState] = useState(inputState.NORMAL);
  const [date, setDate] = useState({
    year: '2023',
    month: '01',
    day: '01',
  });

  const handleDateChange = (year: string, month: string, day: string) => {
    setDate({ year, month, day });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topFirstContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/iku_image.png')}
          />
        </View>
        <View style={styles.topSecondContainer}>
          <Text style={styles.topFirstText}>iKU</Text>
          <Text style={styles.topSecondText}>
            독거노인을 위한{'\n'}인공지능 스마트 미러
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>계정 정보</Text>
        <View style={styles.rowContainer}>
          <TextInput
            placeholder="아이디"
            style={styles.textInput}
            returnKeyType={'next'}
            autoComplete={'email'}
            blurOnSubmit={false}
            value={userId}
            onChange={e => setUserID(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={checkUserIdAvailability}>
            <Text style={styles.okText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.confirmText}>사용 가능한 아이디입니다.</Text> */}
        {isUserIdAvailable && (
          <Text style={styles.confirmText}>사용 가능한 아이디입니다.</Text>
        )}
        <TextInput
          placeholder="비밀번호"
          style={styles.textInput}
          returnKeyType={'next'}
          blurOnSubmit={false}
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        //onChange={e => setPassword(e.nativeEvent.text)}
        />
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.textInput}
          returnKeyType={'next'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange} // 변경됨
        // placeholder="비밀번호 확인"
        // style={styles.textInput}
        // returnKeyType={'next'}
        // blurOnSubmit={false}
        // secureTextEntry={true}
        // value={confirmPassword}
        // onChange={e => setConfirmPassword(e.nativeEvent.text)}
        />
        {!isPasswordMatch && (
          <Text style={styles.confirmText}>비밀번호가 일치하지 않습니다.</Text>
        )}
        {/* <Text style={styles.confirmText}>비밀번호가 일치하지 않습니다.</Text> */}
        <View style={{ marginTop: 20 }}></View>
        <Text style={styles.titleText}>회원 정보</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.optionButton]}
            onPress={() => setUserOption('보호자 회원')}>
            <Text
              style={[
                styles.okText,
                userOption !== '보호자 회원' && styles.nonSelectedOption,
              ]}>
              보호자 회원
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserOption('노인 회원')}
            style={[styles.optionButton]}>
            <Text
              style={[
                styles.okText,
                userOption !== '노인 회원' && styles.nonSelectedOption,
              ]}>
              노인 회원
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="이름"
          style={styles.textInput}
          returnKeyType={'next'}
          blurOnSubmit={false}
          value={userName}
          onChange={e => setUserName(e.nativeEvent.text)}
        />
        <TextInput
          placeholder="전화번호"
          style={styles.textInput}
          keyboardType="number-pad"
          returnKeyType={'next'}
          blurOnSubmit={false}
          value={phone}
          onChange={e => setPhone(e.nativeEvent.text)}
        />
        {userOption === '보호자 회원' ? (
          <>
            <TextInput
              placeholder="노인회원 아이디"
              style={styles.textInput}
              returnKeyType={'next'}
              blurOnSubmit={false}
              value={seniorUserId}
              onChange={e => setSeniorUserID(e.nativeEvent.text)}
            />

            <View style={styles.rowContainer}>
              <TextInput
                placeholder="노인회원 비밀번호"
                style={styles.textInput}
                returnKeyType={'next'}
                blurOnSubmit={false}
                value={seniorUserPassword}
                onChange={e => setSenioeUserPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity>
                <Text style={[styles.okText, { margin: 0 }]}>검색</Text>
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.confirmText}>
              비밀번호가 일치하지 않습니다.
            </Text> */}
          </>
        ) : (
          <>
            <DatePicker
              year={date.year}
              month={date.month}
              day={date.day}
              onDateChange={handleDateChange}
            />
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}>
        <Text style={[styles.okText, { marginBottom: 50 }]}>회원가입</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
  },
  topFirstContainer: {
    width: 150,
  },
  topSecondContainer: {
    alignSelf: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  topFirstText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: colors.darkGreen,
  },
  topSecondText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  textInput: {
    minWidth: 200,
    fontSize: 20,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.navy,
    margin: 5,
    fontWeight: 'bold',
  },
  confirmText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  titleText: {
    color: colors.navy,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
  },
  optionButton: {
    width: '50%',
  },
  nonSelectedOption: {
    backgroundColor: 'lightgray',
  },
  okText: {
    backgroundColor: colors.navy,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 5,
    borderRadius: 8,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export { SignUpScreen };
