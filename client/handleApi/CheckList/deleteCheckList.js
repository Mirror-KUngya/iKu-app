import axios from 'axios';
import {Alert} from 'react-native';

async function deleteCheckList(userId, toDo) {
    console.log("체크리스트 삭제");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/checkList';
    try {
        const response = await axios.delete(SERVER_URL, { data: { UserID: userId, toDo: toDo } }); // 수정된 부분
        console.log(response.status)
        
        if (response.status === 200) {
            console.log("입력하신 체크리스트 항목이 삭제되었습니다.");
            Alert.alert("입력하신 체크리스트 항목이 삭제되었습니다.");
        } else { 
            console.log("삭제 실패");
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default deleteCheckList;
