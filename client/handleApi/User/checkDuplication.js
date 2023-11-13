import axios from 'axios';
import { Alert } from 'react-native';

async function checkDuplication(userId) {
    console.log("아이디 중복 확인");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/isDuplicated';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId});
        console.log('UserInfo sent to server successfully');

        if (response.status === 201) {
            return false; // 아이디 중복 X
        } else if ((response.status === 202)) {
            Alert.alert("이미 존재하는 아이디입니다. \n다른 아이디를 입력해주세요!");
            return true; // 아이디 중복 O
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default checkDuplication;
