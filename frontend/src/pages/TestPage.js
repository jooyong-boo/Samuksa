import React from 'react';
import styled from 'styled-components';
import DetailedSearchConditions from '../components/DetailedSearchConditions';
import Header from '../components/Header';
import SearchConditions from '../components/SearchConditions';

const Background = styled.div`
    background-color: white;
    width: 100vw;
    height: 100vh;
`

const TestPage = () => {
    return (
        <Background>
            <Header />
            <SearchConditions />
            <DetailedSearchConditions />
        </Background>
    );
};

export default TestPage;