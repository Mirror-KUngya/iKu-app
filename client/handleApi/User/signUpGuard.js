import axios from 'axios';

async function signUpGaurd(userId, password, userType, userName, userPhone, relation,seniorId, seniorpw) { 
    console.log("회원가입 - 보호자");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/signUpGaurd';
    try {
        const response = await axios.post(SERVER_URL, {
            UserID: userId,
            UserPW: password,
            UserType: userType,
            UserName: userName,
            UserPhone: userPhone,
            RelationshipWithSilver: relation,
            SilverID:seniorId,
            SilverPW:seniorpw
        });
        console.log('Login UserInfo sent to server successfully');
        console.log(response.status)
        // 회원가입 성공 처리
        if (response.status === 200) {
            console.log('회원가입 성공');
            return true;
        } else { // 로그인 에러
            console.log('Login failed:', response.data.message);
            // 토스트 메시지
            return false;
        }
    } catch (error) {
        console.log('Error sending userINfo to server:', error);
        return false;
    }
}

export default signUpGaurd;
