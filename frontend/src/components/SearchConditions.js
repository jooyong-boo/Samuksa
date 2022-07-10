import React, { useRef } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { Container } from '@mui/system';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { areaState, farmState, fishDetailRecommendInfo, fishPriceAllState, getAreaState, moneyState, personNumState, recommendListState, selectConditions, selectFishState, totalAmountState } from '../store/atom';
import DetailedSearchConditions from './DetailedSearchConditions';
import { getAreaTotalFishData } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
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

const SearchConditions = () => {

    const notify = (text) => toast.warning(text, { position: "top-center", autoClose: 1000, hideProgressBar: true });

    const getArea = useRecoilValue(getAreaState);

    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo);
    const resetFishDetailRecommendInfo = useResetRecoilState(fishDetailRecommendInfo);
    const resetSelectCondition = useResetRecoilState(selectConditions);
    const resetSelectFish = useResetRecoilState(selectFishState);
    const resetTotalAmount = useResetRecoilState(totalAmountState);
    const resetFarm = useResetRecoilState(farmState);

    // 검색조건 선택 여부 체크
    const [select, setSelect] = useState(true)

    const handlePersonNumChange = (e) => {
        const { value } = e.target;
        const onlyNumberPersonValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPersonNum(onlyNumberPersonValue);
        if (e.target.value > 100) {
            // alert('인원은 1 이상으로 해주세요');
            notify('인원수는 100명 이하로 해주세요');
            setPersonNum(99);
        } 
    }

    const handleMoneyChange = (e) => {
        const { value } = e.target;
        const onlyNumberMoney = value.replace(/[^0-9]/g, '');
        setMoney(onlyNumberMoney)
    }

    const onClick = (e) => {
        if (money < 50000) {
            e.preventDefault();
            // alert('가격은 50000이상으로 해주세요');
            notify('가격을 50000이상으로 해주세요');
            setMoney(50000)
            return;
        }
        if (personNum <= 0) {
            e.preventDefault();
            // alert('인원은 1 이상으로 해주세요');
            notify('인원은 1 이상으로 해주세요');
            setPersonNum(1);
            return;
        }
    }

    const onReset = (e) => {
        e.preventDefault();
        setPersonNum(1);
        setMoney(50000);
        setArea('노량진');
        resetFishDetailRecommendInfo();
        resetSelectCondition();
        resetSelectFish();
        resetTotalAmount();
        resetFarm();
        setSelect(true)
    }


    const onSubmit = (e) => {
            e.preventDefault();
            getAreaTotalFishData({ area }).then(res => res ? (setFishList(res), setSelect(false)) : notify('해당 가격으론 찾을 수 있는 조합이 없어요!'));
    }

    return (
        <>
            <Card>
                <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 조건</Typography>
                <Container style={{ display: 'flex', width: '100%', height: '90%' , justifyContent: 'center', alignItems: 'center' }}>
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Grid container spacing={5} justifyContent="center" alignItems="center">
                            <Grid item xs={11}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="인원수" 
                                    type="string"
                                    variant="outlined" 
                                    value={personNum}
                                    onChange={handlePersonNumChange} 
                                    autoFocus={true}
                                    fullWidth
                                    autoComplete='off'
                                    InputProps={{
                                        endAdornment:<InputAdornment position="end">명</InputAdornment>,
                                    }}
                                    disabled={select ? false : true}
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id="outlined-basic"
                                    label="예산" 
                                    type="string"
                                    variant="outlined" 
                                    value={money}
                                    onChange={handleMoneyChange} 
                                    fullWidth
                                    autoComplete='off'
                                    InputProps={{
                                        endAdornment:<InputAdornment position="end">원</InputAdornment>,
                                    }}
                                    disabled={select ? false : true}
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="local">지역</InputLabel>
                                    <Select
                                        labelId="local"
                                        label="지역"
                                        defaultValue={'노량진'}
                                        value={area}
                                        onChange={(e) => {setArea(e.target.value)}}
                                        MenuProps={MenuProps}
                                        fullWidth
                                        disabled={select ? false : true}
                                        // size="small"
                                    >
                                        {getArea.map((a, i) => (
                                            <MenuItem key={i} value={a}>{a}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                            {personNum > 0 && money >= 50000 ? <Button variant="contained" type='submit' disableElevation sx={{ mt: 3, mb: 2, width: '274px',height: '38px' ,backgroundColor: '#0098EE', fontWeight: 900, }} onClick={onClick}>선택</Button>
                            : <Button variant="contained" type='submit' disableElevation sx={{ mt: 3, mb: 2, width: '274px',height: '38px' ,backgroundColor: '#767676', fontWeight: 900, }} onClick={onClick}>선택</Button>}
                            <ToastContainer toastStyle={{ backgroundColor: "#F5F5F5", color: "#575757" }}/>
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