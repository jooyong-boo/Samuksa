import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import introduce1 from '../img/introduce1.png';
import introduce2 from '../img/introduce2.png';
import introduce3 from '../img/introduce3.png';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 37px;
    overflow: hidden;
`;

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '250px',
    height: '340px',
    objectFit: 'cover',
    margin: 'auto',
    // padding: '9px 13px',
});

const Introduction = () => {
    return (
        <Background>
            <div style={{ display: 'inline-flex' }}>
                <Typography fontSize={60} mr={1}>
                    What is
                </Typography>
                <Typography fontSize={60} color="#6EA5F8" fontWeight="bold">
                    Samuksa
                </Typography>
                <Typography fontSize={60}>?</Typography>
            </div>
            <Grid container sx={{ textAlign: 'center', marginBottom: '80px' }} justifyContent="space-evenly">
                <Grid item>
                    <Img src={introduce1} alt="" />
                    <Typography fontSize={20} fontWeight="bold" color="#373737">
                        사용자 대상
                    </Typography>
                    <Typography fontSize={14} color="#545454" sx={{ width: '250px' }}>
                        직접 수산물 시장가서 회를 사먹는 사람들을 위한 서비스
                    </Typography>
                </Grid>
                <Grid item>
                    <Img src={introduce2} alt="" />
                    <Typography fontSize={20} fontWeight="bold" color="#373737">
                        목표
                    </Typography>
                    <Typography fontSize={14} color="#545454" sx={{ width: '250px' }}>
                        당일 시장의 횟감 시세를 적용인원과 예산에 맞게 추천
                    </Typography>
                </Grid>
                <Grid item>
                    <Img src={introduce3} alt="" />
                    <Typography fontSize={20} fontWeight="bold" color="#373737">
                        만든 이유
                    </Typography>
                    <Typography fontSize={14} color="#545454" sx={{ width: '250px' }}>
                        좋아하는 것을 만들어보기로 공통의 관심사 ‘회’
                    </Typography>
                </Grid>
            </Grid>
        </Background>
    );
};

export default Introduction;
