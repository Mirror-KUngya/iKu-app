import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import colors from '../lib/styles/colors';

const CheckListItem = ({text = '가스 벨브 잠그기', isFulfilled = true}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {isFulfilled ? (
        <Icon name="check" size={32} color={colors.darkGreen} />
      ) : (
        <Icon name="x" size={32} color="red" />
      )}
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
    borderColor: colors.navy,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export {CheckListItem};
