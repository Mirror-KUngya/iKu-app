import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { RootStackParamList } from '../types';
import colors from '../lib/styles/colors';
import React, { useState, useEffect } from 'react';
import getUserInfo from '../handleApi/Setting/getUserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        console.log("아이디 가져오기 실패...", error);
      }
    };
    fetchUserId();
  }, []);
  
  useEffect(() => {
    console.log("현재 아이디", userId);
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
            setEmergencyList({ target: info.Relationship, phone: info.GuardPhone });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setting();
  }, [userId]); // userId 의존성 추가
  
  const [userName, setUserName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [GuardPhone, setGuardPhone] = useState<string | null>(null);

  type EmergencyListType = {
    target: string;
    phone: string;
  };
  const [emergencyList, setEmergencyList] = useState<EmergencyListType | null>(null); const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.titleText}>{userName} 님</Text>
          <Text style={styles.middleText}>{userType}</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.keyText}>핸드폰 번호</Text>
          <Text style={styles.textInput}>{userPhone}</Text>
          <TouchableOpacity>
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
          {
            emergencyList && (
              <>
                <Text style={styles.keyText}>{emergencyList.target}</Text>
                <Text style={styles.textInput}>{emergencyList.phone}</Text>
              </>
            )
          }
          <TouchableOpacity>
            <Text style={styles.postText}>수정</Text>
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
            onValueChange={toggleSwitch}
            value={isEnabled}
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
            onValueChange={toggleSwitch}
            value={isEnabled}
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
        <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <Text style={styles.keyText}>비밀번호 수정</Text>
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.keyText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.keyText}>회원탈퇴</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  contentContainer: {
    borderBottomWidth: 2,
    borderColor: colors.navy,
    padding: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    fontSize: 26,
    marginRight: 10,
  },
  middleText: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  valueText: {
    color: colors.navy,
    fontWeight: '900',
    fontSize: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
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
});
export { SettingScreen };