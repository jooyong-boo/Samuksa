import BackgroundWave from 'components/BackgroundWave';
import {
    SearchConditions,
    DetailedSearchConditions,
    SearchResults,
    SelectedConditionList,
} from 'components/calculator';
import { MutableRefObject, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { amountState } from 'store/atom';
import styled from 'styled-components';

const CalculatorPage = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [amount, setAmount] = useRecoilState<number>(amountState);
    const [loading, setLoading] = useState<boolean>(false);
    const contactRef = useRef() as MutableRefObject<HTMLDivElement>;

    return (
        <Background>
            <SearchConditions />
            <DetailedSearchConditions
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
                amount={amount}
                setAmount={setAmount}
            />
            <SelectedConditionList
                setTotalAmount={setTotalAmount}
                totalAmount={totalAmount}
                setAmount={setAmount}
                contactRef={contactRef}
                setLoading={setLoading}
            />
            <SearchResults ref={contactRef} loading={loading} setLoading={setLoading} />
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
