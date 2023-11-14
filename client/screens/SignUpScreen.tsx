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
import checkDuplication from '../handleApi/User/checkDuplication';
import signUp from '../handleApi/User/signUp';
import signUpGaurd from '../handleApi/User/signUpGuard';
import isExist from '../handleApi/User/hasSliver';
import { Alert } from 'react-native';

type SignUptProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: React.FC<SignUptProps> = ({ navigation }) => {
  const [userId, setUserID] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [guardPhone, setGuardPhone] = useState('');
  const [seniorUserId, setSeniorUserID] = useState('');
  const [seniorUserPassword, setSenioeUserPassword] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [relationshipWithSilver, setRelationshipWithSilver] = useState('');
  const [isDuplicationChecked, setIsDuplicationChecked] = useState(false);
  const [isSilverSearched, setIsSilverSearched] = useState(false);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordMatch(text === confirmPassword);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setIsPasswordMatch(password === text);
  };

  // 노인 회원인지 보호자 회원인지
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

  // '중복 확인' 버튼 로직
  const handleCheckDuplication = async () => {
    try {
      const isDuplicated = await checkDuplication(userId);
      setIsUserIdAvailable(!isDuplicated);
      setIsDuplicationChecked(!isDuplicated); // 중복 확인 완료 상태 업데이트
    } catch (error) {
      setIsUserIdAvailable(false);
      console.log(error);
    }
  };

  // '검색' 버튼 로직
  const handleSearchSilver = async () => {
    try {
      const result = await isExist(seniorUserId, seniorUserPassword);
      console.log("result", result)
      if (!result) {
        Alert.alert("존재하지 않는 회원입니다. 노인 회원가입부터 진행해주세요.")
      } else {
        Alert.alert("확인이 완료되었습니다.");
        setIsSilverSearched(result); // 검색 완료 상태 업데이트
      }  
    } catch (error) {
      console.log('Error searching silver user:', error);
    }
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
            onChangeText={text => setUserID(text)}
          />
          <TouchableOpacity onPress={
            async () => {
              try {
                const isDuplicated = await checkDuplication(userId);
                setIsUserIdAvailable(!isDuplicated);
              } catch (error) {
                setIsUserIdAvailable(false);
                console.log(error);
              }
            }
          }>
            <Text style={styles.okText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
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
        />
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.textInput}
          returnKeyType={'next'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange} // 변경됨
        />
        {!isPasswordMatch && (
          <Text style={styles.confirmText}>비밀번호가 일치하지 않습니다.</Text>
        )}
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
        {userOption === '노인 회원' && (
          <>
            <TextInput
              placeholder="거주지 주소"
              style={styles.textInput}
              returnKeyType={'next'}
              blurOnSubmit={false}
              value={userAddress}
              onChange={e => setUserAddress(e.nativeEvent.text)}
            />
            <TextInput
              placeholder="보호자 전화번호"
              style={styles.textInput}
              keyboardType="number-pad"
              returnKeyType={'next'}
              blurOnSubmit={false}
              value={guardPhone}
              onChange={e => setGuardPhone(e.nativeEvent.text)}
            />
          </>
        )}
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
              <TextInput
                placeholder="노인회원과의 관계"
                style={styles.textInput}
                returnKeyType={'next'}
                blurOnSubmit={false}
                value={relationshipWithSilver}
                onChange={e => setRelationshipWithSilver(e.nativeEvent.text)}
              />

              <TouchableOpacity onPress={() => handleSearchSilver()}>
                <Text style={[styles.okText, { margin: 0 }]}>검색</Text>
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.confirmText}>
              비밀번호가 일치하지 않습니다.
            </Text> 
            */}
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
        onPress={async() => {
          if (userOption === "노인 회원") {
            const result = await signUp(userName, phone, userAddress, userId, password, date.year, date.month, date.day, userOption, guardPhone);
            if (result){
              Alert.alert("회원가입이 성공적으로 완료되었습니다!\n 로그인 화면으로 이동합니다.");
              navigation.navigate("LoginScreen");
            }
            Alert.alert("모든 칸에 빠짐없이 입력해주세요.");
          } else {
            const guard = await signUpGaurd(userId, password, userOption, userName, phone, seniorUserId, seniorUserPassword);
            if (guard) {
              Alert.alert("회원가입이 성공적으로 완료되었습니다!\n 로그인 화면으로 이동합니다.");
              navigation.navigate("LoginScreen");
            }
            Alert.alert("모든 칸에 빠짐없이 입력해주세요.");
          }
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
