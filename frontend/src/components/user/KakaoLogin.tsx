import kakaoBtn from '../assets/img/kakaoLoginBtn.png';

const KakaoLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_Kakao_Client_Id;
    const REDIRECT_URI = 'http://localhost:3000/register';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <img src={kakaoBtn} width="190" alt="카카오 로그인" />
            </a>
        </div>
    );
};

export default KakaoLogin;
