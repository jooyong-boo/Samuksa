import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 95vw;
    height: 93vh;
    /* padding-top: 104px; */
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
`;

const CommunityBoard = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Background>
            <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Box>
        </Background>
    );
};

export default CommunityBoard;
