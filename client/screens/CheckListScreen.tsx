import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types';

type CheckListProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckListScreen'
>;

const CheckListScreen: React.FC<CheckListProps> = ({navigation}) => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
});
export {CheckListScreen};
