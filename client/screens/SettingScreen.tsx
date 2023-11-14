import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Switch } from 'react-native-switch';
import { RootStackParamList } from '../types';
import colors from '../lib/styles/colors';
import React, { useState, useEffect } from 'react';
import getUserInfo from '../handleApi/Setting/getUserInfo';
import deleteUser from '../handleApi/User/deleteUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateSilverPhone from '../handleApi/Setting/updateSilverPhone';
import updateGuardPhone from '../handleApi/Setting/updateGaurdPhone';
import { Alert } from 'react-native';

type SettingProps = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>;

const SettingScreen: React.FC<SettingProps> = ({ navigation }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const retrievedUserId = await AsyncStorage.getItem('userId');
        if (retrievedUserId !== null) {
          setUserId(retrievedUserId);
        }
      } catch (error) {
        console.log('아이디 가져오기 실패...', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    console.log('현재 아이디', userId);
  }, [userId]); // userId 상태가 변경될 때마다 실행

  useEffect(() => {
    const setting = async () => {
      try {
        if (userId) {
          const info = await getUserInfo(userId);
          if (info) {
            console.log(info);
            setUserName(info.UserName);
            setUserType(info.UserType);
            setUserPhone(info.UserPhone);

            setGuardPhone(info.GuardPhone);
            setEmergencyList({
              target: info.Relationship,
              phone: info.GaurdPhone,
            });
            setEmergencyList({
              target: info.Relationship,
              phone: info.GuardPhone,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setting();
  }, [userId]); // userId 의존성 추가

  const handleDelete = async (userId: String) => {
    const result = await deleteUser(userId)
    if (result) {
      Alert.alert("회원탈퇴가 완료되었습니다.");
      navigation.navigate("LoginScreen")
    } else {
      Alert.alert("회원탈퇴 중 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
    }
  }

  const formatPhoneNumber = (phoneNumber: string): string => {
    // 숫자만 추출
    const numbers = phoneNumber.replace(/[^\d]/g, '');

    // 숫자를 그룹으로 나누어 형식에 맞게 변환
    let formattedNumber = '';
    if (numbers.length <= 3) {
      formattedNumber = numbers;
    } else if (numbers.length <= 7) {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }

    // 11자리를 초과하는 숫자는 자름
    return formattedNumber.slice(0, 13);
  };

  const handleUpdateGuardPhone = async () => {
    if (userId && GuardPhone) {
      const result = await updateGuardPhone(userId, GuardPhone);
      if (result) {
        Alert.alert("보호자 전화번호 변경 성공", "보호자 전화번호가 성공적으로 변경되었습니다.");
      } else {
        Alert.alert("변경 실패", "보호자 전화번호 변경에 실패했습니다.");
      }
    } else {
      Alert.alert("오류", "아이디 또는 전화번호가 유효하지 않습니다.");
    }
  };

  const handleUpdateSilverphone = async () => {
    if (userId && userPhone) {
      const result = await updateSilverPhone(userId, userPhone);
      if (result) {
        Alert.alert("전화번호 변경 성공", "전화번호가 성공적으로 변경되었습니다.");
      } else {
        Alert.alert("변경 실패", "전화번호 변경에 실패했습니다.");
      }
    } else {
      Alert.alert("오류", "아이디 또는 전화번호가 유효하지 않습니다.");
    }
  };

  const [userName, setUserName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [GuardPhone, setGuardPhone] = useState<string | null>(null);

  type EmergencyListType = {
    target: string;
    phone: string;
  };
  const [emergencyList, setEmergencyList] = useState<EmergencyListType | null>(
    null,
  );
  const [isMissionCompletedEnabled, setIsMissionCompletedEnabled] = useState(true);
  const [isNoOperationEnabled, setIsNoOperationEnabled] = useState(true);

  const toggleMissionCompleted = () => setIsMissionCompletedEnabled(previousState => !previousState);
  const toggleNoOperation = () => setIsNoOperationEnabled(previousState => !previousState);


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.titleText}>{userName} 님</Text>
          <Text style={styles.middleText}>{userType}</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.keyText}>핸드폰 번호</Text>
          <TextInput
            placeholder={userPhone || "전화번호"} // userPhone이 null일 경우 "전화번호"를 표시
            style={styles.textInput}
            keyboardType="number-pad"
            returnKeyType={'next'}
            blurOnSubmit={false}
            value={userPhone || ''} // userPhone이 null일 경우 빈 문자열을 전달
            onChange={e => setUserPhone(formatPhoneNumber(e.nativeEvent.text))}
          />
          <TouchableOpacity onPress={handleUpdateSilverphone}>
            <Text style={styles.postText}>변경</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.titleText}>비상 연락망</Text>
          <Text style={styles.middleText}>
            위급 상황 시 해당 연락처로 연락됩니다.
          </Text>
        </View>
        <View style={styles.innerContainer}>
          {emergencyList && (
            <>
              <Text style={styles.keyText}>{emergencyList.target}</Text>
              <TextInput
                placeholder={GuardPhone || "보호자 전화번호"}
                style={styles.textInput}
                keyboardType="number-pad"
                returnKeyType={'next'}
                blurOnSubmit={false}
                value={GuardPhone || ''}
                onChange={e => setGuardPhone(formatPhoneNumber(e.nativeEvent.text))}
              />
            </>
          )}
          <TouchableOpacity onPress={handleUpdateGuardPhone}>
            <Text style={styles.postText}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.titleText}>알림</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.keyText}>일일 미션 완료 시</Text>
          <Switch
            activeText="켜짐"
            inActiveText="꺼짐"
            circleSize={25}
            barHeight={30}
            onValueChange={toggleMissionCompleted}
            value={isMissionCompletedEnabled}
            backgroundActive={colors.orange}
            backgroundInactive={'gray'}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.keyText}>하루 동안 조작 없을 시</Text>
          <Switch
            activeText="켜짐"
            inActiveText="꺼짐"
            circleSize={25}
            barHeight={30}
            onValueChange={toggleNoOperation}
            value={isNoOperationEnabled}
            backgroundActive={colors.orange}
            backgroundInactive={'gray'}
            switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.emergencyContainer}>
          <Text style={styles.titleText}>계정</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <Text style={styles.keyText}>비밀번호 수정</Text>
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.keyText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              if (userId !== null) {
                Alert.alert(
                  "사용자의 모든 정보가 삭제됩니다.",
                  "계속 하시겠습니까?",
                  [
                    { text: "아니요", style: "cancel" },
                    { text: "네", onPress: () => handleDelete(userId) }
                  ]
                );
              } else {
                // userId가 null일 때의 처리
                Alert.alert("오류", "유효하지 않은 사용자 ID입니다.");
              }
            }}>
            <Text style={styles.keyText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const width_proportion = '60%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  contentContainer: {
    borderBottomWidth: 2,
    borderColor: colors.navy,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyContainer: {},
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  titleText: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 32,
    marginRight: 20,
    marginVertical: 20,
  },
  middleText: {
    color: colors.orange,
    fontSize: 24,
    fontWeight: 'bold',
  },
  keyText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10,
  },
  valueText: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 26,
  },
  postButton: {
    alignSelf: 'center',
  },
  postText: {
    backgroundColor: colors.navy,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 5,
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    minWidth: width_proportion,
    fontSize: 26,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.navy,
    margin: 5,
    fontWeight: 'bold',
  },
});
export { SettingScreen };
