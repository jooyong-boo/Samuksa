import { kakaoAuth } from 'api/kakaoAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import kakaoBtn from '../assets/img/kakaoLoginBtn.png';
import kakao from '../assets/img/kakaoTalk.png';

const KakaoLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_Kakao_Client_Id;
    const REDIRECT_URI = 'http://localhost:3000/register';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // const navigate = useNavigate();
    // const handleClickKakao = () => {
    //     navigate('http://localhost:8081/oauth2/authorization/kakao');
    //     // kakaoAuth()
    //     //     .then((res) => console.log(res))
    //     //     .then(() => {
    //     //         navigate('/register');
    //     //     });
    // };

    return (
        <div>
            <a href={KAKAO_AUTH_URL}>
                <KakaoImg src={kakao} alt="카카오 로그인" />
            </a>
        </div>
    );
};

export default KakaoLogin;

const KakaoImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    &:hover {
        opacity: 0.9;
    }
`;
