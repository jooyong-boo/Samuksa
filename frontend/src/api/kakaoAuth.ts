import axios from 'axios';

const CLIENT_ID = '25f4989e35bd6c16dc5896e4c3ca5eaf';
const REDIRECT_URI = 'http://localhost:3000/register';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const kakaoLogin = async (code: string) => {
    try {
        let data = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                CLIENT_ID,
                REDIRECT_URI,
                code,
            },
        });
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};
