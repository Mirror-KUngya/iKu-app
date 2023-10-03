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
import colors from '../lib/styles/colors';

type MissionStatustProps = NativeStackScreenProps<
  RootStackParamList,
  'MissionStatusScreen'
>;
const MissionStatusScreen: React.FC<MissionStatustProps> = ({navigation}) => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});
export {MissionStatusScreen};
