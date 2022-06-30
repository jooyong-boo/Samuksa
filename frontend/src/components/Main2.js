import React from 'react';
import Header from './Header';
import SearchConditions from './SearchConditions';
import DetailedSearchConditions from './DetailedSearchConditions';
import SelectedConditionList from './SelectedConditionList';
import SearchResults from './SearchResults';
import styled from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 33px;
`

const Main2 = () => {
    return (
        <>
            <Header />
            <Background>
                <SearchConditions />
                <DetailedSearchConditions />
                <SelectedConditionList />
                <SearchResults />
            </Background>
        </>
    );
};

export default Main2;