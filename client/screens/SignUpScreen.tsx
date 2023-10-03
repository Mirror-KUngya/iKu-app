import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types';
import colors from '../lib/styles/colors';
import {useState} from 'react';

type SignUptProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: React.FC<SignUptProps> = ({navigation}) => {
  return <ScrollView style={styles.container}></ScrollView>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});
export {SignUpScreen};
