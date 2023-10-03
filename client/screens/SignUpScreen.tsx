import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types';
import colors from '../lib/styles/colors';
import {useState} from 'react';

type SignUptProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: React.FC<SignUptProps> = ({navigation}) => {
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
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
});
export {SignUpScreen};
