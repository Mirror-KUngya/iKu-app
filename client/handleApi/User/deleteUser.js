import axios from 'axios';

async function deleteUser(userId) {
    console.log("회원탈퇴");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users';
    try {
        const response = await axios.delete(SERVER_URL, {data:{UserID: userId}});
        console.log(response.status)
        
        if (response.status === 200) {
            console.log("회원 삭제");
            return true;
        } else { 
            console.log("삭제 실패");
            return false;
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
        return false;
    }
}

export default deleteUser;