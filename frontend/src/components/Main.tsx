import styled from 'styled-components';
import image from '../components/assets/img/mainImage.jpg';
import { Box, Button, FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getAreaTotalFishData } from '../api/recommend';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    areaState,
    fishDetailRecommendInfo,
    getAreaState,
    moneyState,
    personNumState,
    selectState,
} from '../store/atom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Introduction from './Introduction';
import React from 'react';

const Background = styled.div`
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
`;

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const Main = () => {
    const notify = (text: string) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const dismissAll = () => toast.dismiss();

    const navigate = useNavigate();

    const getArea = useRecoilValue(getAreaState);
    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo);

    // 검색조건 선택 여부 체크
    const [select, setSelect] = useRecoilState(selectState);

    const handlePersonNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const onlyNumberPersonValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPersonNum(onlyNumberPersonValue);
        if (Number(value) >= 35) {
            // alert('인원은 1 이상으로 해주세요');
            dismissAll();
            notify('인원수는 35명 이하로 해주세요');
            setPersonNum(String(35));
        }
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const onlyNumberMoney = value.replace(/[^0-9]/g, '');
        setMoney(onlyNumberMoney);
        if (Number(value) > 10000000) {
            dismissAll();
            notify('가격은 천만원 이하로 해주세요');
            setMoney(String(10000000));
        }
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (Number(personNum) <= 0) {
            e.preventDefault();
            // alert('인원은 1 이상으로 해주세요');
            dismissAll();
            notify('인원을 입력해주세요');
            // setPersonNum(1);
            return;
        } else if (Number(money) < 50000) {
            e.preventDefault();
            // alert('가격은 50000이상으로 해주세요');
            dismissAll();
            notify('가격을 50000이상으로 해주세요');
            setMoney(String(50000));
            return;
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // getAreaTotalFishData({ area }).then(res => res ? (setFishList(res), setSelect(false)) : notify('해당 가격으론 찾을 수 있는 조합이 없어요!'));
        getAreaTotalFishData({ area }).then((res) =>
            res
                ? (setFishList(res.map((item: {}) => (item ? { ...item, active: false } : { ...item }))),
                  setSelect(false))
                : notify('해당 가격으론 찾을 수 있는 조합이 없어요!'),
        );
        navigate('/calculator');
    };

    return (
        <>
            <Background>
                <div style={{ display: 'inline-flex' }}>
                    <Typography
                        sx={{
                            fontSize: '54px',
                            fontWeight: '900',
                            color: 'white',
                            textShadow: '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                        }}
                    >
                        모두가 편히 떠먹는 그날까지,
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '54px',
                            color: '#6EA5F8',
                            fontWeight: '900',
                            textShadow: '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                            marginLeft: '16px',
                        }}
                    >
                        사먹사
                    </Typography>
                </div>
                <Typography
                    sx={{
                        fontSize: '25px',
                        color: 'white',
                        fontWeight: '600',
                        textShadow: '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                        marginBottom: '2rem',
                    }}
                >
                    고민하지말고 편하게 추천 받아보세요.
                </Typography>
                <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '10rem' },
                        }}
                    >
                        <TextField
                            id="person"
                            placeholder="인원"
                            type="string"
                            variant="outlined"
                            value={personNum}
                            onChange={handlePersonNumChange}
                            autoFocus
                            autoComplete="off"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">명</InputAdornment>,
                            }}
                            sx={{ backgroundColor: 'white', borderRadius: '5px', opacity: '0.8' }}
                        />
                        <TextField
                            id="money"
                            placeholder="예산"
                            type="string"
                            variant="outlined"
                            value={money}
                            onChange={handleMoneyChange}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">원</InputAdornment>,
                            }}
                            sx={{ backgroundColor: 'white', borderRadius: '5px', opacity: '0.8' }}
                        />
                        <FormControl fullWidth>
                            <Select
                                // labelId="local"
                                value={area ? area : '노량진'}
                                onChange={(e) => {
                                    setArea(e.target.value);
                                }}
                                MenuProps={MenuProps}
                                fullWidth
                                sx={{ backgroundColor: 'white', borderRadius: '5px', opacity: '0.8' }}
                            >
                                {getArea &&
                                    getArea.map((area: string) => (
                                        <MenuItem key={area} value={area}>
                                            {area}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={onClick}
                        sx={{
                            mt: 2,
                            opacity: '0.9',
                            backgroundColor: '#6EA5F8',
                            color: 'white',
                            boxShadow: 'none',
                            width: '500px',
                        }}
                    >
                        검색
                    </Button>
                </form>
            </Background>
            <Introduction />
        </>
    );
};

export default Main;
