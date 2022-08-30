import styled, { keyframes } from 'styled-components';

const Background = styled.div`
    width: 100vw;
    height: 100%;
    position: relative;
    /* overflow: hidden; */
    background-color: #ebecee;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    transform: translate3d(0, 0, 0);
    z-index: 1;
`;

const Wave = keyframes`
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: -1600px;
    }
`;

const Swell = keyframes`
    0%, 100% {
        transform: translate3d(0,-25px,0);
    }
    50% {
        transform: translate3d(0,5px,0);
    }
`;

const Wave1 = styled.div`
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3E%3Cstop stop-color='%231363df' stop-opacity='.25' offset='0%25'/%3E%3Cstop stop-color='%2347b5ff' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z' transform='matrix(-1 0 0 1 1600 0)'/%3E%3C/svg%3E%0A")
        repeat-x;
    position: absolute;
    /* top: 80%; */
    bottom: 40%;
    width: 6500px;
    height: 198px;
    animation: ${Wave} 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
`;

const Wave2 = styled(Wave1)`
    /* top: 85%; */
    bottom: 45%;
    animation: ${Wave} 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, ${Swell} 7s ease -1.25s infinite;
    opacity: 1;
`;

const BackgroundWave = () => {
    return (
        <Background>
            <Wave1></Wave1>
            <Wave2></Wave2>
        </Background>
    );
};

export default BackgroundWave;
