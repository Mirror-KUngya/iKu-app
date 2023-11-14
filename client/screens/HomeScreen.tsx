import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../types';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {backgroundColor: '#003865', flex: 1},
          ]}
          onPress={() => {
            navigation.navigate('CheckListScreen');
          }}>
          <Text style={styles.buttonText}>체크리스트 관리</Text>
          <Image
            source={require('../assets/images/check-list.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {backgroundColor: '#EF5B0C', flex: 1},
          ]}
          onPress={() => {
            navigation.navigate('MissionStatusScreen');
          }}>
          <Text style={styles.buttonText}>미션 현황 {'\n'}보기</Text>
          <Image
            source={require('../assets/images/calendar.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#0BA81E'}]}
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}>
          <Text style={styles.buttonText}>설정</Text>
          <Image
            source={require('../assets/images/setting.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const top_height_proportion = '40%';
const bottom_height_proportion = '60%';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    height: top_height_proportion,
  },
  bottomContainer: {
    height: bottom_height_proportion,
  },
  buttonContainer: {
    borderRadius: 15,
    margin: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  buttonImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    opacity: 0.7,
    padding: 50,
  },
});
export {HomeScreen};
