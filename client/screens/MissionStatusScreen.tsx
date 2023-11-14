import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types';
import {Calendar} from 'react-native-calendars';
import colors from '../lib/styles/colors';
import '../lib/utils/localeConfig';
import {useState, useEffect} from 'react';
import {MissionItem} from '../components/MissionItem';
import getMission from '../handleApi/Mission/getMission';
import AsyncStorage from '@react-native-async-storage/async-storage';
type MissionStatustProps = NativeStackScreenProps<
  RootStackParamList,
  'MissionStatusScreen'
>;

const MissionStatusScreen: React.FC<MissionStatustProps> = ({navigation}) => {
  const [pickDate, setPickDate] = useState(new Date());

  const [missionList, setMissionList] = useState([
    {text: '박수치기', fulFilled: false},
    {text: '활짝 웃기', fulFilled: false},
    {text: '옆구리 운동', fulFilled: false},
    {text: '끝말잇기', fulFilled: false},
  ]);

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
    const fetchMission = async () => {
      if (userId !== null) {
        // userId가 null이 아닐 때만 함수 실행
        const missionDate = `${pickDate.getFullYear()}-${
          pickDate.getMonth() + 1
        }-${pickDate.getDate()}`;
        const missionData = await getMission(userId, missionDate);
        if (missionData) {
          setMissionList([
            {text: '박수치기', fulFilled: missionData.Clap},
            {text: '활짝 웃기', fulFilled: missionData.Smile},
            {text: '옆구리 운동', fulFilled: missionData.Exercise},
            {text: '끝말잇기', fulFilled: missionData.WordChain},
          ]);
        }
      }
    };
    fetchMission();
  }, [userId, pickDate]); // userId가 변경될 때마다 useEffect가 다시 실행되도록 함

  return (
    <ScrollView style={styles.container}>
      <View>
        <Calendar
          onDayPress={day => setPickDate(new Date(day.dateString))}
          theme={{
            textDayFontSize: 26,
            textMonthFontSize: 32,
            textDayHeaderFontSize: 32,
            arrowColor: colors.navy,
            arrowHeight: 40,
            textMonthFontWeight: 'bold',
            todayTextColor: colors.orange,
            textDayFontWeight: 'bold',
            weekVerticalMargin: 20,
          }}
        />
      </View>
      <View style={styles.line}></View>
      <View style={{marginBottom: 20, marginHorizontal: 20}}>
        <Text style={styles.dateText}>{`${pickDate.getFullYear()}년 ${
          pickDate.getMonth() + 1
        }월 ${pickDate.getDate()}일`}</Text>
      </View>
      <View>
        {missionList.map(({text, fulFilled}, idx) => (
          <MissionItem
            key={idx}
            text={text}
            isFulfilled={fulFilled}></MissionItem>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  line: {
    height: 3,
    backgroundColor: colors.navy,
    marginHorizontal: 80,
    marginVertical: 80,
  },
  dateText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.navy,
  },
});
export {MissionStatusScreen};
