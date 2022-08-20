import axios from 'axios';
import kakaoBtn from '../assets/img/kakaoLoginBtn.png';

const KakaoLogin = () => {
    const CLIENT_ID = '25f4989e35bd6c16dc5896e4c3ca5eaf';
    const REDIRECT_URI = 'http://localhost:3000/register';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // const login = async () => {
    //     try {
    //         let { data } = await axios.get(KAKAO_AUTH_URL);
    //         console.log(data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <img src={kakaoBtn} width="190" alt="카카오 로그인" />
            </a>
        </div>
    );
};

export default KakaoLogin;
