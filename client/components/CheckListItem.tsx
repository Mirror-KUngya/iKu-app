import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import colors from '../lib/styles/colors';

const CheckListItem = ({
  text,
  onDelete,
}: {
  text: string;
  onDelete: (t: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icon
        name="xmark"
        size={32}
        color={'red'}
        onPress={e => onDelete(text)}
      />
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export {CheckListItem};
