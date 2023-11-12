import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../types';
import { CheckListItem } from '../components/CheckListItem';
import colors from '../lib/styles/colors';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getCheckList from '../handleApi/CheckList/checkList';

type CheckListProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckListScreen'
>;

const CheckListScreen: React.FC<CheckListProps> = ({ navigation }) => {

  const [userId, setUserId] = useState<string | null> (null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const retrievedUserId = await AsyncStorage.getItem('userId');
        setUserId(retrievedUserId);
      } catch(error) {
        console.log("아이디 가져오기 실패...", error);
      }
    };
    fetchUserId();
  }, []);// 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행

  // 체크리스트 배열에 대한 상태
  const [checkList, setCheckList] = useState([
    { text: '가스 벨브 잠그기', fulFilled: true },
    { text: '창문 닫기', fulFilled: true },
  ]);

  // TextInput 값에 대한 상태
  const [newCheckListItem, setNewCheckListItem] = useState('');

  // 새 항목을 체크리스트에 추가하는 함수
  const handleAddItem = () => {
    if (newCheckListItem.trim() !== '') {
      const newItem = { text: newCheckListItem, fulFilled: false };
      setCheckList([...checkList, newItem]);
      setNewCheckListItem(''); // 항목을 추가한 후 TextInput을 지웁니다
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          placeholder="추가하기..."
          style={styles.textInput}
          value={newCheckListItem}
          onChangeText={setNewCheckListItem} // 텍스트 변경시 상태 업데이트
          returnKeyType={'next'}
          onSubmitEditing={handleAddItem} // 리턴 키를 눌렀을 때 추가 처리
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addText}>등록</Text>
        </TouchableOpacity>
      </View>
      <View>
        {checkList.map(({ text, fulFilled }, idx) => (
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
export { CheckListScreen };