import axios from 'axios';
import { Alert } from 'react-native';

async function getMission(userId, missionDate) {
    console.log("날짜 별 미션 조회");
    const SERVER_URL = `https://port-0-iku-1drvf2llok7l15f.sel5.cloudtype.app/missions/${userId}/${missionDate}`;
    console.log(missionDate)
    try {
        const response = await axios.get(SERVER_URL);
        console.log('UserInfo sent to server successfully');

        if (response.status === 200) {
            return {
                Smile: response.data.Smile,
                Clap: response.data.Clap,
                Exercise: response.data.Exercise,
                WordChain: response.data.WordChain
            }
        }
    } catch (error) {
        console.log('Error sending userInfo to server:', error);
    }
}

export default getMission;
