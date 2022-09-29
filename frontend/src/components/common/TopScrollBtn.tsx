import { Box, Fab } from '@mui/material';
import styled from 'styled-components';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { throttle } from 'lodash';
import { useRef } from 'react';

const TopScrollBtn = () => {
    const [scroll, setScroll] = useState(false);
    const beforeScrollY = useRef(100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

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
            <CircleFab color="primary" aria-label="top" onClick={moveTop} scroll={scroll ? 'true' : ''}>
                <ArrowUpwardIcon />
            </CircleFab>
        </CustomBox>
    );
};

export default TopScrollBtn;

const CustomBox = styled(Box)`
    position: fixed;
    z-index: 1000;
    right: 4%;
    bottom: 5%;

    /* // 데스크탑
        @media screen and (min-width: 480px) {
        }
    
        // 모바일
        @media screen and (max-width: 479px) {
            right: 4%;
            bottom: 5%;
        } */
`;

interface CircleFabProps {
    scroll: string;
}

const CircleFab = styled(Fab)<CircleFabProps>`
    box-shadow: none;
    width: 4rem;
    height: 4rem;
    background-color: rgba(245, 216, 176, 0.9);
    opacity: ${(props) => (props.scroll ? 1 : 0)};
    visibility: ${(props) => (props.scroll ? '' : 'hidden')};
    transition: ${(props) =>
        props.scroll ? 'all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : 'all 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'};
    :hover {
        background-color: ${({ theme }) => theme.colors.main};
    }
`;
