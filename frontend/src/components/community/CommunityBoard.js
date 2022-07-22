import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 70px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
`;

const CommunityBoard = () => {
    const [value, setValue] = useState(0);

    const tab = [
        {
            id: 0,
            label: '자유게시판',
        },
        {
            id: 1,
            label: '꿀TIP게시판',
        },
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Background>
            <Box sx={{ width: '95%', height: '95%', backgroundColor: 'white' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tab.map(({ id, label }) => {
                        return <Tab label={label} key={id} center />;
                    })}
                </Tabs>
            </Box>
        </Background>
    );
};

export default CommunityBoard;
