import axios from 'axios';
import {Alert} from 'react-native';

async function getCheckList(userId) {  // 매개변수 추가
    console.log("체크리스트 조회");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/checkList';
    try {
        const response = await axios.get(SERVER_URL, { UserID: userId});

        console.log(response.status)
        
        if (response.status === 200) {
            console.log(response.data);
        } else {
            console.log('체크리스트 조회 실패', response.data.message);
            // 토스트 메시지
            Alert.alert("체크리스트 조회 불가", response.data.message);
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default getCheckList;
