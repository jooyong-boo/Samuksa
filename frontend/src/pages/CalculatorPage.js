import React from 'react';
import styled from 'styled-components';
import Calculator from '../components/calculator/Calculator';

const Background = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
`;

const CalculatorPage = () => {
    return <Calculator />;
};

export default CalculatorPage;
