import { createTheme } from '@mui/material';
import styled from 'styled-components';

export const Background = styled.div`
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

export const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Pretendard',
            'NanumBarunGothic',
            'Noto Sans KR',
            'nanumsquare',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Oxygen',
        ].join(','),
        fontSize: 14,
    },
    mixins: {
        toolbar: {
            minHeight: '4rem',
        },
    },
    palette: {
        primary: {
            main: '#0098ee',
        },
    },
});
