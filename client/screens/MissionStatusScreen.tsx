import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types';
import {Calendar} from 'react-native-calendars';
import colors from '../lib/styles/colors';
import '../lib/utils/localeConfig';
import {useState} from 'react';
import {MissionItem} from '../components/MissionItem';
type MissionStatustProps = NativeStackScreenProps<
  RootStackParamList,
  'MissionStatusScreen'
>;

const MissionStatusScreen: React.FC<MissionStatustProps> = ({navigation}) => {
  const [pickDate, setPickDate] = useState(new Date());

  let missionList = [
    {text: '박수치기', fulFilled: true},
    {text: '활짝 웃기', fulFilled: true},
    {text: '옆구리 운동', fulFilled: true},
    {text: '끝말잇기', fulFilled: true},
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        <Calendar
          onDayPress={day => setPickDate(new Date(day.dateString))}
          theme={{
            arrowColor: colors.navy,
            arrowHeight: 40,
            textMonthFontSize: 24,
            textMonthFontWeight: 'bold',
            todayTextColor: 'white',
            todayBackgroundColor: colors.orange,
            selectedDayBackgroundColor: 'orange',
            textDayFontSize: 22,
            textDayFontWeight: 'bold',
          }}
        />
      </View>
      <View style={styles.line}></View>
      <View style={{marginBottom: 10, marginHorizontal: 10}}>
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
    height: 2,
    backgroundColor: colors.navy,
    marginHorizontal: 80,
    marginVertical: 30,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.navy,
  },
});
export {MissionStatusScreen};
