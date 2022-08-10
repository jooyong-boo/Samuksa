import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { tabState } from '../../store/atom';
import ReviewBoard from './ReviewBoard';
import TipBoard from './TipBoard';

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 100px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: auto;
`;

const Board = () => {
    const [selectTab, setSelectTab] = useRecoilState(tabState);
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
    // console.log(selectTab);
    // useEffect(() => {
    //     setSelectTab(selectTab);
    // }, []);

    // const onChangeTab = (id) => {
    //     setSelectTab(...tab.filter((item) => item.id === id));
    // };

    const changePage = (path) => {
        navigate(path);
    };

    const handleChange = (event, newValue) => {
        setSelectTab(newValue);
    };

    return (
        <Background>
            <Box sx={{ width: '95%', height: '95%', backgroundColor: 'white', margin: 'auto', borderRadius: '10px' }}>
                <Tabs value={selectTab} onChange={handleChange} centered sx={{ marginBottom: '1rem' }}>
                    {tab.map(({ id, label, path }) => {
                        return (
                            <Tab
                                label={label}
                                key={id}
                                onClick={() => {
                                    // onChangeTab(id);
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
