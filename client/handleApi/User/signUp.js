import axios from 'axios';

async function signUp (userName, userPhone, userAddress, userId, password, birthYear, birthMonth, birthDay,userType, guardPhone) { 
    console.log("회원가입");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/signUp';
    try {
        const response = await axios.post(SERVER_URL, {
            UserName: userName,
            UserPhone: userPhone,
            UserAddress: userAddress,
            UserID: userId,
            UserPW: password,
            BirthYear: birthYear,
            BirthMonth: birthMonth,
            BirthDay: birthDay,
            UserType: userType,
            GuardPhone: guardPhone
        });
        console.log('Login UserInfo sent to server successfully');
        console.log(response.status)
        // 회원가입 성공 처리
        if (response.status === 200) {
            console.log('회원가입 성공');
            return true;
        } 
        else if (response.status === 401) {
            console.log("jjj")
            return false;
        }
        else { // 로그인 에러
            console.log('회원가입 실패:', response.data.message);
            return false;
        }
    } catch (error) {
        console.log('Error sending userIㅜfo to server:', error);
        return false;
    }
}

export default signUp;
