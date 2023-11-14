import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../types';
import {CheckListItem} from '../components/CheckListItem';
import colors from '../lib/styles/colors';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getCheckList from '../handleApi/CheckList/getCheckList';
import addCheckList from '../handleApi/CheckList/addCheckList';
import deleteCheckList from '../handleApi/CheckList/deleteCheckList';

type CheckListProps = NativeStackScreenProps<
  RootStackParamList,
  'CheckListScreen'
>;

const CheckListScreen: React.FC<CheckListProps> = ({navigation}) => {
  const [userId, setUserId] = useState<string | null>(null);
  interface CheckListItem {
    toDo: string; // 서버 스키마에 맞게 toDo 프로퍼티 추가
  }
  // 체크리스트 배열에 대한 상태
  const [checkList, setCheckList] = useState<CheckListItem[]>([]);
  // TextInput 값에 대한 상태
  const [newCheckListItem, setNewCheckListItem] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const retrievedUserId = await AsyncStorage.getItem('userId');
        setUserId(retrievedUserId);
      } catch (error) {
        console.log('아이디 가져오기 실패...', error);
      }
    };
    fetchUserId();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행

  useEffect(() => {
    const fetchCheckList = async () => {
      if (userId) {
        const fetchedList = await getCheckList(userId);
        if (fetchedList) {
          setCheckList(fetchedList);
        }
      }
    };

    fetchCheckList();
  }, [userId]); // userId가 변경될 때마다 실행

  // 새 항목을 체크리스트에 추가하는 함수
  const handleAddItem = () => {
    if (newCheckListItem.trim() !== '') {
      const newItem: CheckListItem = {toDo: newCheckListItem};
      addCheckList(userId, newCheckListItem);
      setCheckList([...checkList, newItem]);
      setNewCheckListItem(''); // 항목을 추가한 후 TextInput을 지웁니다
    }
  };

  const handleDeleteItem = async (toDo: string) => {
    if (userId) {
      try {
        await deleteCheckList(userId, toDo); // 서버에 삭제 요청
        const updatedList = checkList.filter(item => item.toDo !== toDo); // 삭제된 아이템을 제외한 새 리스트 생성
        setCheckList(updatedList); // 상태 업데이트
      } catch (error) {
        console.log('삭제 중 오류 발생: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          placeholder="체크리스트를 직접 추가해보세요"
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
        {checkList.length > 0 ? (
          checkList.map((item, idx) => (
            <CheckListItem
              key={idx}
              text={item.toDo}
              onDelete={handleDeleteItem}></CheckListItem> // 수정된 prop
          ))
        ) : (
          <Text>체크리스트가 비어있습니다.</Text>
        )}
      </View>
    </View>
  );
};
const width_proportion = '80%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginBottom: 40,
  },
  textInput: {
    borderColor: colors.navy,
    borderBottomWidth: 2,
    width: width_proportion,
    fontSize: 30,
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
    paddingHorizontal: 25,
    marginLeft: 5,
    borderRadius: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
});
export {CheckListScreen};
