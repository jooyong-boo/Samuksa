import { Box, Button, Fab } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { throttle } from 'lodash';
import { useRef } from 'react';

const CustomBox = styled(Box)`
    position: fixed;
    z-index: 1000;

    // 데스크탑
    @media screen and (min-width: 480px) {
        right: 4%;
        bottom: 5%;
    }
`;

const TopScrollBtn = () => {
    const [scroll, setScroll] = useState(false);
    const beforeScrollY = useRef(200);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    // const handleScroll = () => {
    //     // 스크롤이 Top에서 200px 이상 내려오면 true값을 useState에 넣어줌
    //     if (window.scrollY >= 200) {
    //         setScroll(true);
    //     } else {
    //         // 스크롤이 50px 미만일경우 false를 넣어줌
    //         setScroll(false);
    //     }
    // };

    const handleScroll = useMemo(
        () =>
            throttle(() => {
                const currentScrollY = window.scrollY;
                if (beforeScrollY.current <= currentScrollY) {
                    setScroll(true);
                } else {
                    setScroll(false);
                }
            }, 300),
        [beforeScrollY],
    );

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <CustomBox>
            <Fab
                color="primary"
                aria-label="top"
                onClick={moveTop}
                size="medium"
                sx={{
                    boxShadow: 'none',
                    backgroundColor: 'rgba(245,216,176,0.8)',
                    opacity: scroll ? '1' : '0',
                    visibility: scroll ? '' : 'hidden',
                    transition: scroll
                        ? 'all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                        : 'all 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                }}
            >
                <ArrowUpwardIcon />
            </Fab>
        </CustomBox>
    );
};

export default TopScrollBtn;
