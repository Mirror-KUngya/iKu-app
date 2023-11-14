import axios from 'axios';

async function handleLogin(userId, password, confirmPassword, userName, phone, seniorUserId, seniorUserPassword, navigation) {  // 매개변수 추가
    console.log("회원가입 버튼 눌림");
    const SERVER_URL = 'https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/users/signup';
    try {
        const response = await axios.post(SERVER_URL, { UserID: userId, UserPW: password });
        console.log('UserInfo sent to server successfully');
        console.log(response.status)
        // 로그인 성공 처리
        if (response.status === 200) {
            console.log('Login successful:', response.data);
            navigation.navigate('HomeScreen'); // 여기서 navigation 사용
        } else { // 로그인 에러
            console.log('Login failed:', response.data.message);
            // 토스트 메시지
        }
    } catch (error) {
        console.log('Error sending userINfo to server:', error);
    }
}

export default handleLogin;
