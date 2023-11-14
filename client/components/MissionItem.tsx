import {StyleSheet, Text, View} from 'react-native';
import colors from '../lib/styles/colors';

const MissionItem = ({text = '박수치기', isFulfilled = true}) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: isFulfilled ? 'black' : 'gray',
          },
        ]}>
        {text}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: colors.orange,
          },
        ]}>
        {isFulfilled ? '완료!' : ''}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 5,
    padding: 15,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export {MissionItem};
