import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setID } from './setid';

async function handleLogin(userId, password, navigation) {
    console.log("로그인 버튼 눌림");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/signIn';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, UserPW: password });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        // 로그인 성공 처리
        if (response.status === 200) {
            console.log('Login successful:', response.data);
            AsyncStorage.setItem('userId', response.data.UserID);
            AsyncStorage.setItem('userName', response.data.UserName);
            //navigation.navigate('HomeScreen'); // 여기서 navigation 사용
            return true;
        } else{ // 로그인 에러
            console.log('Login failed:', response.data.message);
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default handleLogin;
