import axios from 'axios';
import {Alert} from 'react-native';

async function resetPW(userId, phone, newPassword) {
    console.log("비밀번호 변경 버튼");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/findPW';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, UserPhone: phone, newPW: newPassword });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            return true;
        } else {
            console.log("비밀번호 변경 실패");
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default resetPW;
