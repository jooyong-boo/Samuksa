import BackgroundWave from 'components/BackgroundWave';
import DetailedSearchConditions from 'components/calculator/DetailedSearchConditions';
import SearchConditions from 'components/calculator/SearchConditions';
import styled from 'styled-components';

const CalculatorPage = () => {
    return (
        <Background>
            <SearchConditions />
            <DetailedSearchConditions />
            <BackgroundWave />
        </Background>
    );
};

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 104px;
    overflow: hidden;
`;

export default CalculatorPage;
