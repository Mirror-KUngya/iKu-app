import axios from 'axios';
import {Alert} from 'react-native';

async function resetPW(userId, password, newPassword) {
    console.log("비밀번호 변경 버튼 눌림");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/findPW';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, UserPW: password, newPW: newPassword });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            Alert.alert("비밀번호 변경에 성공하였습니다!");
        } else {
            console.log("비밀번호 변경 실패");
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default resetPW;
