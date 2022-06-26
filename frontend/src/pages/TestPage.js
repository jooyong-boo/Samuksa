import React from 'react';
import DetailedSearchConditions from '../components/DetailedSearchConditions';
import Header from '../components/Header';
import SearchConditions from '../components/SearchConditions';

const TestPage = () => {
    return (
        <div>
            <Header />
            <SearchConditions />
            <DetailedSearchConditions />
        </div>
    );
};

export default TestPage;