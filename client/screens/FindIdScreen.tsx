import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../lib/styles/colors';
import {useState} from 'react';

type FindIdProps = NativeStackScreenProps<RootStackParamList, 'FindIdScreen'>;

const FindIdScreen: React.FC<FindIdProps> = ({navigation}) => {
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>회원 정보를 입력해주세요.</Text>
      <TextInput
        placeholder="이름"
        style={styles.textInput}
        returnKeyType={'done'}
        blurOnSubmit={false}
        value={inputName}
        onChangeText={text => setInputName(text)}
      />
      <TextInput
        placeholder="전화번호"
        style={styles.textInput}
        returnKeyType={'done'}
        blurOnSubmit={false}
        value={inputPhone}
        onChangeText={text => setInputPhone(text)}
      />
      <TouchableOpacity
        style={[styles.ㅠuttonContainer]}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonText}>찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    width: 300,
    fontSize: 20,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: colors.navy,
    margin: 5,
    fontWeight: 'bold',
  },
  ㅠuttonContainer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '900',
    margin: 20,
  },
  buttonText: {
    width: 300,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.navy,
  },
});
export {FindIdScreen};
