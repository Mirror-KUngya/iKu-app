import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../types';
import {Calendar} from 'react-native-calendars';
import colors from '../lib/styles/colors';
import '../lib/utils/localeConfig';
type MissionStatustProps = NativeStackScreenProps<
  RootStackParamList,
  'MissionStatusScreen'
>;

const MissionStatusScreen: React.FC<MissionStatustProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Calendar
        // markedDates={markedDates}
        // onDayPress={day => console.log(day)}
        // onMonthChange={month => console.log('month changed', month)}
        theme={{
          arrowColor: colors.navy,
          arrowHeight: 40,
          textMonthFontSize: 24,
          textMonthFontWeight: 'bold',
          todayTextColor: 'white',
          todayBackgroundColor: colors.orange,
          textDayFontSize: 22,
          textDayFontWeight: 'bold',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});
export {MissionStatusScreen};
