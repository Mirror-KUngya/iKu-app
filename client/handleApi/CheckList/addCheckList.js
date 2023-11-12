import axios from 'axios';
import {Alert} from 'react-native';

async function addCheckList(userId, toDo) {
    console.log("체크리스트 추가하기");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/checkList';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, toDo: toDo });
        console.log('CheckList Info sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            console.log("입력하신 체크리스트 항목이 추가되었습니다.");
        } else { 
            console.log("입력하신 체크리스트 항목이 추가에 실패했습니다.");
            // 토스트 메시지
            Alert.alert("다시 입력해주세요.");
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default addCheckList;
