import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background-color: white;
    width: 100vw;
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 37px;
    overflow: hidden;
`;

const TopFiveRecommend = () => {
    return (
        <Background>
            <Typography>123</Typography>
        </Background>
    );
};

export default TopFiveRecommend;
