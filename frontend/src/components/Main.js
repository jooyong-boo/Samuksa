import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Select, Button, InputLabel, Grid, FormControl } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { areaState } from '../store/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

const Background = styled.div`
    background-color: white;
    width: 100vw;
    height: 100vw;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Area = ['노량진', '가락', '강서', '마포', '서울', '구리', '수원', '평촌', '경기', '소래포구', '연안부두', '인천', '강원', '경상', '부산', '울산', '충청', '대전', '전라', '광주', '제주'];


const Main = () => {

    const navigate = useNavigate();

    const [personNum, setPersonNum] = useState(1);
    const [money, setMoney] = useState(0);
    const [area, setArea] = useRecoilState(areaState);

    const handlePersonNumChange = (e) => {
        setPersonNum(e.target.value);
        if (e.target.value < 1) {
            alert('인원은 1 이상으로 해주세요');
            setPersonNum('1');
        } else if (e.target.value > 10) {
            alert('인원은 10 이하로 해주세요');
            setPersonNum('10');
        }
    }
    console.log(personNum)

    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
    }
    
    console.log(money)
    console.log(area)

    const onSubmit = (e) => {
            e.preventDefault();
            setPersonNum('');
            setMoney('');
            navigate('/search');
    }

  return (
      <Background>
        <Header />
        <Container style={{ display: 'flex', width: '100vw', height: '100vh' , justifyContent: 'center', alignItems: 'center'}}>
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
                <Button variant="contained" type='submit' sx={{ mt: 2 }} fullWidth>검색</Button>
            </form>
        </Container>
      </Background>
  );
};

export default Main;