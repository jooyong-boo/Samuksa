import React, { useRef } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Container } from '@mui/system';
import { useRecoilState } from 'recoil';
import { areaState, moneyState, personNumState } from '../store/atom';
import { useNavigate } from 'react-router-dom';
import DetailedSearchConditions from './DetailedSearchConditions';

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    /* margin: 30px 100px; */
    /* border: 1px solid black; */
`

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #ebecee;
    /* padding: 30px 100px; */
    /* box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.1);
    transform: translate3d(0, 0, 0); */
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

const SearchConditions = () => {

    const navigate = useNavigate();

    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);

    const personNumInput = useRef();

    const handlePersonNumChange = (e) => {
        setPersonNum(e.target.value);
        if (e.target.value < 0) {
            alert('인원은 1 이상으로 해주세요');
            setPersonNum('1');
        } else if (e.target.value > 3) {
            alert('인원은 3 이하로 해주세요');
            setPersonNum('3');
        }
    }

    const handleMoneyChange = (e) => {
        setMoney(e.target.value)
    }

    const onClick = (e) => {
        if (money < 5000) {
            e.preventDefault();
            alert('가격은 5000이상으로 해주세요');
            // setMoney(5000)
            return;
        }
        if (personNum <= 0) {
            e.preventDefault();
            alert('인원은 1 이상으로 해주세요');
            // setPersonNum('1');
            return;
        }
    }

    const onReset = (e) => {
        e.preventDefault();
        setPersonNum(1);
        setMoney(5000);
        setArea('노량진');
        personNumInput.current.focus();
    }
    console.log(area)


    const onSubmit = (e) => {
            e.preventDefault();
            // 상세 검색조건 어종 불러오기
    }

    return (
        <>
            <Card>
                <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 조건</Typography>
                <Container style={{ display: 'flex', width: '100%', height: '90%' , justifyContent: 'center', alignItems: 'center' }}>
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Grid container spacing={5} justifyContent="center" alignItems="center">
                            <Grid item xs={11}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="인원수" 
                                    type="number"
                                    variant="outlined" 
                                    value={personNum}
                                    onChange={handlePersonNumChange} 
                                    autoFocus    
                                    fullWidth
                                    ref={personNumInput}
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id="outlined-basic"
                                    label="예산" 
                                    type="number"
                                    variant="outlined" 
                                    value={money}
                                    onChange={handleMoneyChange} 
                                    fullWidth
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={11}>
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
                                        // size="small"
                                    >
                                        {Area.map((a, i) => (
                                            <MenuItem key={i} value={a}>{a}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            <Button variant="contained" type='submit' sx={{ mt: 3, mb: 2, width: '274px',height: '38px' ,backgroundColor: '#0098EE', fontWeight: 900}} onClick={onClick}>검색</Button>
                            <Button variant='outlined' onClick={onReset} sx={{ width: '30%', borderRadius: '1px', borderColor: '#D8D8D8', color: '#949494' }}>초기화</Button>
                        </div>
                    </form>
                </Container>
            </Card>
            <DetailedSearchConditions />
        </>
        );
};

export default SearchConditions;