// getCheckList.js
import axios from 'axios';
import { Alert } from 'react-native';

async function getCheckList(userId) {
    console.log("체크리스트 조회");
    const SERVER_URL = `https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/checkList/${userId}`; // 백틱(`)으로 변경

    try {
        const response = await axios.get(SERVER_URL); // 매개변수 제거

        console.log(response.status)
        
        if (response.status === 200) {
            console.log(response.data);
            return response.data; // 데이터 반환
        } else {
            console.log('체크리스트 조회 실패', response.data.message);
            Alert.alert("체크리스트 조회 불가", response.data.message);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

export default getCheckList;