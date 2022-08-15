import React, { useRef } from 'react';
import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { Container } from '@mui/system';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
    amountState,
    areaState,
    farmState,
    fishDetailRecommendInfo,
    fishPriceAllState,
    getAreaState,
    moneyState,
    personNumState,
    recommendListState,
    selectConditions,
    selectFishState,
    selectState,
    totalAmountState,
} from '../../store/atom';
import DetailedSearchConditions from './DetailedSearchConditions';
import { getAreaTotalFishData } from '../../api/recommend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const ITEM_HEIGHT = 28;
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
    const notify = (text) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const dismissAll = () => toast.dismiss();

    const getArea = useRecoilValue(getAreaState);

    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo);

    // 리셋
    const resetFishDetailRecommendInfo = useResetRecoilState(fishDetailRecommendInfo);
    const resetSelectCondition = useResetRecoilState(selectConditions);
    const resetSelectFish = useResetRecoilState(selectFishState);
    const resetTotalAmount = useResetRecoilState(totalAmountState);
    const resetFarm = useResetRecoilState(farmState);
    const resetRecommendList = useResetRecoilState(recommendListState);
    const resetAmount = useResetRecoilState(amountState);

    // 검색조건 선택 여부 체크
    const [select, setSelect] = useRecoilState(selectState);

    const handlePersonNumChange = (e) => {
        const { value } = e.target;
        const onlyNumberPersonValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPersonNum(onlyNumberPersonValue);
        if (e.target.value >= 35) {
            dismissAll();
            notify('인원수는 35명 이하로 해주세요');
            setPersonNum(35);
        }
    };

    const handleMoneyChange = (e) => {
        const { value } = e.target;
        const onlyNumberMoney = value.replace(/[^0-9]/g, '');
        setMoney(onlyNumberMoney);
        if (e.target.value > 10000000) {
            dismissAll();
            notify('가격은 천만원 이하로 해주세요');
            setMoney(10000000);
        }
    };

    const onClick = (e) => {
        if (money < 50000) {
            e.preventDefault();
            // alert('가격은 50000이상으로 해주세요');
            dismissAll();
            notify('가격을 50000이상으로 해주세요');
            setMoney(50000);
            return;
        } else if (personNum <= 0) {
            e.preventDefault();
            // alert('인원은 1 이상으로 해주세요');
            dismissAll();
            notify('인원을 입력해주세요');
            // setPersonNum(1);
            return;
        }
    };

    const onReset = (e) => {
        setPersonNum('');
        setMoney(50000);
        setArea('노량진');
        resetFishDetailRecommendInfo();
        resetSelectCondition();
        resetSelectFish();
        resetTotalAmount();
        resetAmount();
        resetFarm();
        resetRecommendList();
        setSelect(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getAreaTotalFishData({ area }).then((res) =>
            res
                ? (setFishList(res.map((item) => (item ? { ...item, active: false } : { ...item }))), setSelect(false))
                : (dismissAll(), notify('해당 가격으론 찾을 수 있는 조합이 없어요!')),
        );
    };

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Card>
                <SearchConditionTypography>검색 조건</SearchConditionTypography>
                <SearchConditionContainer>
                    <SearchConditionForm onSubmit={onSubmit}>
                        <Grid container spacing={5} justifyContent="center" alignItems="center">
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-basic"
                                    label="인원수"
                                    type="string"
                                    variant="outlined"
                                    value={personNum}
                                    onChange={handlePersonNumChange}
                                    autoFocus={true}
                                    fullWidth
                                    autoComplete="off"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">명</InputAdornment>,
                                    }}
                                    disabled={select ? false : true}
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-basic"
                                    label="예산"
                                    type="string"
                                    variant="outlined"
                                    value={money}
                                    onChange={handleMoneyChange}
                                    fullWidth
                                    autoComplete="off"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">원</InputAdornment>,
                                    }}
                                    disabled={select ? false : true}
                                    // size="small"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <FormControl fullWidth>
                                    <InputLabel id="local">지역</InputLabel>
                                    <Select
                                        labelId="local"
                                        label="지역"
                                        defaultValue={area}
                                        value={area ? area : ''}
                                        onChange={(e) => {
                                            setArea(e.target.value);
                                        }}
                                        MenuProps={MenuProps}
                                        fullWidth
                                        disabled={select ? false : true}
                                    >
                                        {getArea &&
                                            getArea.map((area, i) => (
                                                <MenuItem key={i} value={area}>
                                                    {area}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <SearchConditionBtnArea>
                            {select ? (
                                <SearchConditionSelectBtn
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    sx={{
                                        backgroundColor: '#0098EE',
                                    }}
                                    onClick={onClick}
                                >
                                    조건 선택
                                </SearchConditionSelectBtn>
                            ) : (
                                <SearchConditionSelectBtn
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    disabled={true}
                                    sx={{
                                        ':disabled': {
                                            backgroundColor: 'rgba(0,152,238,0.3)',
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    onClick={onClick}
                                >
                                    선택 완료
                                </SearchConditionSelectBtn>
                            )}
                            <SearchConditionResetBtn
                                variant="outlined"
                                onClick={() => {
                                    onReset();
                                    moveTop();
                                }}
                            >
                                조건 초기화
                            </SearchConditionResetBtn>
                        </SearchConditionBtnArea>
                    </SearchConditionForm>
                </SearchConditionContainer>
            </Card>
            <DetailedSearchConditions />
        </>
    );
};

export default SearchConditions;

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
`;

const SearchConditionTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid #eaeaea;
    font-weight: bold;
`;

const SearchConditionContainer = styled(Container)`
    display: flex;
    width: 100%;
    height: 90%;
    justify-content: center;
    align-items: center;
`;

const SearchConditionForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SearchConditionBtnArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

const SearchConditionSelectBtn = styled(Button)`
    margin-top: 24px;
    margin-bottom: 16px;
    width: 274px;
    height: 38px;
    font-weight: 900;
`;

const SearchConditionResetBtn = styled(Button)`
    width: 40%;
    border-radius: 5px;
    border-color: #d8d8d8;
    color: #949494;
`;
