import axios from 'axios';

async function updateSilverPhone(userId, newPhone) {
    console.log("전화번호 수정");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/setting/silver';
    try {
        const response = await axios.put(SERVER_URL, { UserID: userId, Phone:newPhone});
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        
        if (response.status === 200) {
            return true;
        } else {
            console.log("전화번호 변경 실패");
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default updateSilverPhone;
