import SearchConditions from './SearchConditions';
import styled from 'styled-components';
import BackgroundWave from '../BackgroundWave';

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

const Calculator = () => {
    return (
        <>
            <Background>
                <SearchConditions />
                {/* <TopScrollBtn /> */}
                <BackgroundWave />
            </Background>
        </>
    );
};

export default Calculator;
