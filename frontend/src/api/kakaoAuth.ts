import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
};

const instance = axios.create(axiosConfig);

export const kakaoAuth = async () => {
    try {
        let data = await instance.post('/oauth2/authorization/kakao');
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

const CLIENT_ID = process.env.REACT_APP_Kakao_Client_Id;
const REDIRECT_URI = 'http://localhost:3000/register';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const kakaoLogin = async (code: string | null) => {
    try {
        let { data } = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                code,
            },
        });
        console.log(data);
        localStorage.setItem('kakaoAuth', data.access_token);
    } catch (e) {
        console.log(e);
    }
};

export const kakaoUserInfo = async () => {
    let kakaoToken = localStorage.getItem('kakaoAuth');
    try {
        let { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${kakaoToken}`,
            },
        });
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};
