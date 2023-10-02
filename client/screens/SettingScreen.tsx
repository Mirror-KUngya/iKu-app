import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types';
import colors from '../lib/styles/colors';
import {useState} from 'react';

type SettingProps = NativeStackScreenProps<RootStackParamList, 'SettingScreen'>;

const [userName, setUserName] = useState('김아빠');
const [userType, setUerType] = useState('노인');
const SettingScreen: React.FC<SettingProps> = ({navigation}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});
export {SettingScreen};
