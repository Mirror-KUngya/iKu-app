import axios from 'axios';
import { Alert } from 'react-native';

async function checkDuplication(userId) {
    console.log("아이디 중복 확인");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/isDuplicated';
    try {
        const response = await axios.get(SERVER_URL, { UserID: userId});
        console.log('UserInfo sent to server successfully');

        if (response.status === 201) {
            return true;
        } else {
            Alert.alert("이미 사용 중인 아이디입니다.");
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default checkDuplication;
