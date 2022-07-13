import React from 'react';
import Header from './Header';
import SearchConditions from './SearchConditions';
import styled from 'styled-components';
import TopStepper from './TopStepper';
import TopScrollBtn from './TopScrollBtn';
import BackgroundWave from './BackgroundWave';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 33px;
    overflow: hidden;
`;

const Main2 = () => {
    return (
        <>
            <Header />
            <Background>
                <SearchConditions />
                <TopScrollBtn />
                <BackgroundWave />
            </Background>
        </>
    );
};

export default Main2;
