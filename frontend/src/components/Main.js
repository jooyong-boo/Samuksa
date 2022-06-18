import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Select, Button, InputLabel, Grid, FormControl } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { areaState, fishDataSelector, moneyState, personNumState } from '../store/atom';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: white;
    box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.1);
    transform: translate3d(0, 0, 0);
`;

const Wave = keyframes`
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: -1600px;
    }
`;

const Swell = keyframes`
    0%, 100% {
        transform: translate3d(0,-25px,0);
    }
    50% {
        transform: translate3d(0,5px,0);
    }
`;

const Wave1 = styled.div`
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='50%25' x2='50%25' y1='-10.959%25' y2='100%25'%3E%3Cstop stop-color='%231363df' stop-opacity='.25' offset='0%25'/%3E%3Cstop stop-color='%2347b5ff' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' fill-rule='evenodd' d='M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z' transform='matrix(-1 0 0 1 1600 0)'/%3E%3C/svg%3E%0A") repeat-x; 
  position: absolute;
  top: 80%;
  width: 6500px;
  height: 198px;
  animation: ${Wave} 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
`;

const Wave2 = styled(Wave1)`
    top: 85%;
    animation: ${Wave} 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, ${Swell} 7s ease -1.25s infinite;
    opacity: 1;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const Area = ['노량진', '가락', '강서', '마포', '서울', '구리', '수원', '평촌', '경기', '소래포구', '연안부두', '인천', '강원', '경상', '부산', '울산', '충청', '대전', '전라', '광주', '제주'];


const Main = () => {

    const navigate = useNavigate();

    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);

    console.log(personNum, typeof(personNum) ,money, typeof(money), area, typeof(area))

    const handlePersonNumChange = (e) => {
        setPersonNum(e.target.value);
        if (e.target.value < 0) {
            alert('인원은 1 이상으로 해주세요');
            setPersonNum('1');
        } else if (e.target.value > 10) {
            alert('인원은 10 이하로 해주세요');
            setPersonNum('10');
        }
    }

    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
    }

    const onClick = (e) => {
        if (money < 5000) {
            e.preventDefault();
            alert('가격은 5000이상으로 해주세요');
            setMoney(5000)
            return;
        }
        if (personNum <= 0) {
            e.preventDefault();
            alert('인원은 1 이상으로 해주세요');
            setPersonNum('1');
            return;
        }
    }


    const onSubmit = (e) => {
            e.preventDefault();
            navigate('/search');
    }

  return (
      <Background>
        <Header />
        <Container style={{ display: 'flex', width: '100%', height: '100%' , justifyContent: 'center', alignItems: 'center'}}>
            <form onSubmit={onSubmit} >
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={4}>
                        <TextField 
                            id="outlined-basic" 
                            label="인원수" 
                            type="number"
                            variant="outlined" 
                            value={personNum}
                            onChange={handlePersonNumChange} 
                            required 
                            autoFocus    
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="예산" 
                            type="number"
                            variant="outlined" 
                            value={money}
                            onChange={handleMoneyChange} 
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="local">지역</InputLabel>
                            <Select
                                labelId="local"
                                label="local"
                                defaultValue={'노량진'}
                                value={area}
                                onChange={(e) => {setArea(e.target.value)}}
                                MenuProps={MenuProps}
                                fullWidth
                                required
                            >
                                {Area.map((a) => (
                                    <MenuItem key={a} value={a}>{a}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant="contained" type='submit' sx={{ mt: 2 }} onClick={onClick} fullWidth>검색</Button>
            </form>
        </Container>
            <Wave1></Wave1>
            <Wave2></Wave2>
      </Background>
  );
};

export default Main;