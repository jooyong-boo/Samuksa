import React from 'react';
import styled from 'styled-components';
import DetailedSearchConditions from '../components/DetailedSearchConditions';
import Header from '../components/Header';
import SearchConditions from '../components/SearchConditions';
import SearchResults from '../components/SearchResults';
import SelectedConditionList from '../components/SelectedConditionList';

const Background = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
`

const TestPage = () => {
    return (
        <Background>
            <Header />
            <SearchConditions />
            <DetailedSearchConditions />
            <SelectedConditionList />
            <SearchResults />
        </Background>
    );
};

export default TestPage;