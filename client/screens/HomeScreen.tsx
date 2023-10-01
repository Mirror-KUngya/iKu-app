import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {backgroundColor: '#003865', flex: 1},
          ]}>
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
          ]}>
          <Text style={styles.buttonText}>미션 현황 {'\n'}보기</Text>
          <Image
            source={require('../assets/images/calendar.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.buttonContainer, {backgroundColor: '#0BA81E'}]}>
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    height: 250,
  },
  bottomContainer: {
    height: 100,
  },
  buttonContainer: {
    borderRadius: 15,
    margin: 5,
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    opacity: 0.7,
  },
});
export default HomeScreen;
