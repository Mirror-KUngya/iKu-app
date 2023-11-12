import axios from 'axios';
import { Alert } from 'react-native';

async function findID(userName, userPhone) {
    console.log("아이디 찾기");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/findID';
    try {
        const response = await axios.post(SERVER_URL, { UserName: userName, UserPhone: userPhone });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            console.log("아이디: " + response.data.UserID);
            return response.data.UserID;
        } else {
            console.log('Login failed:', response.data.message);
            // 토스트 메시지
            Alert.alert("존재하지 않는 회원입니다.");
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default findID;
