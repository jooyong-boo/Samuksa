import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ReviewBoard from './ReviewBoard';
import TipBoard from './TipBoard';

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 70px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: auto;
`;

const Board = () => {
    const [value, setValue] = useState(0);
    const [selectTab, setSelectTab] = useState('리뷰게시판');
    const navigate = useNavigate();

    const tab = [
        {
            id: 0,
            label: '리뷰게시판',
            path: '/board/review',
        },
        {
            id: 1,
            label: '꿀TIP게시판',
            path: '/board/tip',
        },
    ];

    useEffect(() => {
        setSelectTab(tab[0]);
    }, []);

    const onChangeTab = (label, id) => {
        setSelectTab(...tab.filter((item) => item.id === id));
    };

    const changePage = (path) => {
        navigate(path);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Background>
            <Box sx={{ width: '95%', height: '95%', backgroundColor: 'white', margin: 'auto' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tab.map(({ id, label, path }) => {
                        return (
                            <Tab
                                label={label}
                                key={id}
                                onClick={() => {
                                    onChangeTab(label, id);
                                    changePage(path);
                                }}
                            />
                        );
                    })}
                </Tabs>
                <Outlet />
            </Box>
        </Background>
    );
};

export default Board;
