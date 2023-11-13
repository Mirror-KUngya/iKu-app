import axios from 'axios';
import {Alert} from 'react-native';

async function getUserInfo(userId) {
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/setting/' + userId;
    try {
        const response = await axios.get(SERVER_URL, { UserID: userId});
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default getUserInfo;
