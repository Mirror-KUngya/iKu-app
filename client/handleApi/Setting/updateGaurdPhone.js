import axios from 'axios';
import {Alert} from 'react-native';

async function updateGuardPhone(userId, newGaurdPhone) {
    console.log("보호자 연락망 수정");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/setting';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, newGaurdPhone:newGaurdPhone});
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            Alert.alert("보호자 전화번호를 변경하였습니다.");
        } else {
            console.log("보호자 전화번호 변경 실패");
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default updateGuardPhone;
