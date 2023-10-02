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
import {CheckListItem} from '../components/CheckListItem';
import colors from '../lib/styles/colors';

type CheckListProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckListScreen'
>;
let checkList = [
  {text: '가스 벨브 잠그기', fulFilled: true},
  {text: '창문 닫기', fulFilled: false},
  {text: '창문 닫기', fulFilled: true},
  {text: '창문 닫기', fulFilled: false},
];
const CheckListScreen: React.FC<CheckListProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          placeholder="추가하기..."
          style={styles.textInput}
          returnKeyType={'next'}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addText}>등록</Text>
        </TouchableOpacity>
      </View>
      <View>
        {checkList.map(({text, fulFilled}, idx) => (
          <CheckListItem
            key={idx}
            text={text}
            isFulfilled={fulFilled}></CheckListItem>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 20,
  },
  textInput: {
    borderColor: colors.navy,
    borderBottomWidth: 1,
    width: 250,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  addButton: {
    alignSelf: 'center',
  },
  addText: {
    backgroundColor: colors.navy,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 5,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export {CheckListScreen};
