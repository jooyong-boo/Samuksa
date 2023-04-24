import styled from 'styled-components';
import LottieSinner from '../../assets/spinner/LottieSpinner.json';
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <Background>
            <LottieContainer>
                <Lottie animationData={LottieSinner} loop={true}></Lottie>
                <LoadingText>잠시만 기다려 주세요.</LoadingText>
            </LottieContainer>
        </Background>
    );
};

export default Loading;

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;

const LottieContainer = styled.div`
    width: 150px;
    height: 150px;
    margin: 0 auto;
    position: absolute;
    z-index: 1000;
`;
