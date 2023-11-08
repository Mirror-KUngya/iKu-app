import axios from 'axios';

const SERVER_URL = 'http://192.168.64.19:3000/notice/token';

async function sendTokenToServer(token) {
  try {
    await axios.post(SERVER_URL, { token });
    console.log('Token sent to server successfully');
  } catch (error) {
    console.log('Error sending token to server:', error);
  }
}

export default sendTokenToServer;