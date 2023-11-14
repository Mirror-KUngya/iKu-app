import axios from 'axios';
import { Alert } from 'react-native';

async function findUser(userId, userPhone) {
    console.log("비밀번호 변경을 위한 사용자 조회");
    const SERVER_URL = `https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/findUser/${userId}/${userPhone}`;
    try {
        const response = await axios.get(SERVER_URL, { UserID: userId, UserPhone: userPhone});
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            console.log("조회 성공");
            return true;
        } else {
            console.log("조회 실패");
            Alert.alert("아이디나 전화번호를 다시 확인해주세요.");
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default findUser;
