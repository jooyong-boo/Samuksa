import React from 'react';
import Main from '../components/Main';
import styled from '@emotion/styled';

const Background = styled.div`
    background-color: white;
    width: 100vw;
    height: 100vw;
`

const MainPage = () => {
    return (
        <Background>
            <Main />
        </Background>
    )
}

export default MainPage;