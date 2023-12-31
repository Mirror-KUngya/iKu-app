import axios from 'axios';
import { Alert } from 'react-native';

async function isExist(userId, userPW) {
    console.log("노인 아이디 있는지");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/isDuplicated';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, UserPW: userPW });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default isExist;
