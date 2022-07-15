import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 104px;
    overflow: hidden;
`;

const Introduction = () => {
    return (
        <Background>
            <div style={{ display: 'inline-flex' }}>
                <Typography fontSize={60}>What is</Typography>
                <Typography fontSize={60} color="#6EA5F8" fontWeight="bold">
                    Samuksa
                </Typography>
                <Typography fontSize={60}>?</Typography>
            </div>
        </Background>
    );
};

export default Introduction;
