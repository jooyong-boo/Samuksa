import {
    Avatar,
    Button,
    Checkbox,
    FormControl,
    Grow,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Slider,
    Typography,
} from '@mui/material';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SelectedConditionList from './SelectedConditionList';
import { errorSelector, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
    amountState,
    farmState,
    fishDetailRecommendInfo,
    getFramTypeState,
    personNumState,
    recommendListState,
    selectConditions,
    selectFishNameState,
    selectFishState,
} from '../../store/atom';
import { getFarmType } from '../../api/recommend';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from 'react';
import { useCallback } from 'react';

const Card = styled.div`
    background-color: white;
    width: 570px;
    height: 464px;
    border-radius: 5px;
    /* border: 1px solid black; */
    margin: 1rem;
`;

const ListItemStyled = styled.div`
    display: flex;
    background-color: white;
    height: 100%;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;
    &:hover > div {
        background-color: #f4f4f4;
    }
`;

const listStyle = {
    width: '100%',
    // maxWidth: 500,
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'overlay',
    maxHeight: 408,
    borderRadius: '5px',
    // borderBottom: '1px solid black'
    // border: 0,
    padding: 0,
    boxShadow: 'none',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '5px',
    },
};

const DetailedSearchConditions = () => {
    const notify = (text) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });

    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [selectFish, setSelectFish] = useRecoilState(selectFishState);
    const resetSelectFish = useResetRecoilState(selectFishState);
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo);
    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [totalAmount, setTotalAmount] = useState(0);
    const [fish, setFish] = useState(fishList);
    const [amount, setAmount] = useRecoilState(amountState);
    const [farm, setFarm] = useRecoilState(farmState);
    const [farmStatus, setFarmStatus] = useState([]);

    useMemo(() => {
        setFish(fishList);
    }, [fishList]);

    useEffect(() => {
        setTotalAmount(Number(personNum));
    }, [personNum]);

    useEffect(() => {
        resetSelectFish();
        setFish(fish.map((fish) => (fish ? { ...fish, active: false } : { ...fish })));
        if (totalAmount > 0 && totalAmount - amount >= 0) {
            setTotalAmount(totalAmount - amount);
            setAmount(0);
        }
    }, [selectCondition]);

    useEffect(() => {
        // fish.map(fish =>
        //     fish.active === true ? (setFarm(fish.farmTypes)) : null
        //     )
        if (selectFish.length) {
            setFarm(selectFish[0].farmTypes);
        }
    }, [selectFish]);

    useEffect(() => {
        setSelectFish(fish.filter((fish) => fish.active === true));
    }, [fish]);

    const onSearch = (e) => {
        e.preventDefault();
        let searchName = e.target.value;
        console.log(searchName);
        if (!searchName) {
            setFish(fishList);
        } else {
            let result = fishList.filter((name) => name.fishName === searchName);
            setFish(result);
        }
    };

    const onToggle = (id) => {
        setFarmStatus([]);
        setFish(
            fish.map((fish) =>
                fish.fishInfoId === id ? { ...fish, active: !fish.active } : { ...fish, active: false },
            ),
        );

        // fish.filter(fish =>  fish.fishInfoId === id ? setFarm(fish.farmTypes) : setFarm([]))
    };

    const changeAmount = useCallback((event, newAmount) => {
        event.preventDefault();
        setAmount(newAmount);
        // console.log(amount)
    }, []);

    const changeHandler = (checked, id) => {
        if (checked) {
            setFarmStatus([...farmStatus, id]);
        } else {
            // 체크 해제
            setFarmStatus(farmStatus.filter((el) => el !== id));
        }
    };

    const addCondition = () => {
        if (selectFish.length === 0) {
            // return alert('어종을 선택해주세요');
            return notify('어종을 선택해주세요');
        } else if (amount === 0 && totalAmount > 0) {
            return notify('분량을 선택해주세요');
        } else if (amount === 0 && selectCondition.length > 0) {
            return notify('분량 부족');
        } else if (farmStatus.length === 0) {
            // return alert('양식 여부를 체크해주세요');
            return notify('양식 여부를 체크해주세요');
        } else {
            selectCondition.some((item) => item.id === selectFish[0].fishInfoId)
                ? notify('선택한 어종이 이미 있습니다.')
                : setSelectCondition([
                      ...selectCondition,
                      {
                          id: selectFish[0].fishInfoId,
                          selectFish: selectFish[0].fishName,
                          amount,
                          farmStatus,
                          imgUrl: selectFish[0].imgUrl,
                      },
                  ]);
        }
        resetSelectFish();
        setFarmStatus([]);
        setFarm([]);
    };

    // console.log(totalAmount)

    return (
        <>
            <Card>
                <Typography
                    sx={{
                        color: '#575757',
                        padding: '18px 0px 13px 19px',
                        borderBottom: '1px solid #EAEAEA',
                        fontWeight: 'bold',
                    }}
                >
                    상세 검색 조건
                </Typography>
                {/* <div style={{ display: 'flex', height: '100%', opacity: fish.length > 0 ? 1 : 0.4 }}> */}
                <div style={{ display: 'flex', height: '100%' }}>
                    <div
                        style={{
                            width: '45%',
                            height: '100%',
                            borderRight: '1px solid #EAEAEA',
                            maxHeight: '410px',
                        }}
                    >
                        {/* <FormControl fullWidth>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={
                                    // <InputAdornment position="start">
                                    <SearchIcon />
                                    // </InputAdornment>
                                }
                                type="string"
                                defaultValue=""
                                placeholder="찾는 어종을 입력하세요"
                                onChange={onSearch}
                                autoComplete="off"
                                readOnly={fishList.length > 0 ? false : true}
                                disableUnderline={fishList.length > 0 ? false : true}
                            />
                        </FormControl> */}
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1200,
                                maxHeight: 700,
                                flexGrow: 1,
                                // backgroundColor: '#F8F8F8',
                                padding: 0,
                                boxShadow: 'none',
                            }}
                        >
                            {fish.length > 0 ? (
                                <List sx={listStyle} subheader={<li />}>
                                    {fish.map((item, i) => {
                                        const { fishName, fishYield, fishInfoId, active, imgUrl } = item;
                                        return (
                                            <Grow in={true} timeout={i * 200} key={fishInfoId}>
                                                <ListItemStyled
                                                    style={{
                                                        backgroundColor: active ? '#F8F8F8' : 'white',
                                                    }}
                                                    onClick={() => {
                                                        onToggle(fishInfoId, active);
                                                    }}
                                                >
                                                    <ListItemAvatar
                                                        sx={{
                                                            padding: '9px 13px 9px 16px',
                                                        }}
                                                    >
                                                        <Avatar
                                                            alt={fishName}
                                                            src={imgUrl}
                                                            variant="square"
                                                            style={{
                                                                height: '50px',
                                                                width: '50px',
                                                                borderRadius: '3px',
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItem
                                                        sx={{
                                                            paddingLeft: 0,
                                                            ':hover': { backgroundColor: '#f4f4f4' },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={fishName}
                                                            secondary={`(수율: ${fishYield}%)`}
                                                        />
                                                        {/* <Typography>{fishName}</Typography>
                                                <Typography>{fishYield}</Typography> */}
                                                    </ListItem>
                                                </ListItemStyled>
                                            </Grow>
                                        );
                                    })}
                                </List>
                            ) : (
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 375,
                                        color: '#AEAEAE',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                    }}
                                >
                                    검색 조건을 선택해주세요
                                </Typography>
                            )}
                        </Paper>
                    </div>
                    <div style={{ width: '55%', maxHeight: '420px' }}>
                        <div
                            style={{
                                width: '70%',
                                margin: 'auto',
                                marginTop: '10%',
                            }}
                        >
                            <Typography sx={{ textAlign: 'center' }}>분량</Typography>
                            {selectFish.length > 0 ? (
                                <Slider
                                    aria-labelledby="range-slider"
                                    value={amount}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={totalAmount}
                                    onChange={changeAmount}
                                />
                            ) : (
                                <Slider disabled value={0} />
                            )}
                            <Typography sx={{ textAlign: 'center' }}>{amount}인</Typography>
                        </div>
                        <div
                            style={{
                                width: '90%',
                                height: '30%',
                                margin: 'auto',
                                marginTop: '10%',
                                borderTop: '1px solid #EAEAEA',
                                paddingTop: '24px',
                                position: 'relative',
                            }}
                        >
                            <Typography variant="subtitle1">양식 여부</Typography>
                            {farm.length > 0 && selectFish.length > 0 ? (
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: '14px', color: '#737373', marginTop: '5px', fontWeight: 'medium' }}
                                >
                                    중복 선택이 가능합니다.
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{ fontSize: '14px', color: '#AEAEAE', marginTop: '5px', fontWeight: 'medium' }}
                                >
                                    어종 선택이 필요합니다.
                                </Typography>
                            )}
                            {farm.length > 0 && selectFish.length > 0
                                ? farm.map((item, i) => (
                                      <Typography key={i} sx={{ fontSize: '14px' }}>
                                          <Checkbox
                                              id={item}
                                              sx={{ color: '#E1E1E1' }}
                                              onChange={(e) => {
                                                  changeHandler(e.currentTarget.checked, `${item}`);
                                              }}
                                              checked={farmStatus.includes(`${item}`) ? true : false}
                                          />
                                          {item}
                                      </Typography>
                                  ))
                                : null}
                        </div>
                        <div
                            style={{
                                width: '90%',
                                height: '20%',
                                margin: 'auto',
                                marginTop: '20px',
                                position: 'relative',
                            }}
                        >
                            {selectFish && amount && farmStatus.length > 0 ? (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    sx={{
                                        width: '100%',
                                        height: '38px',
                                        backgroundColor: '#0098EE',
                                        fontWeight: 900,
                                        marginTop: '70px',
                                    }}
                                    onClick={addCondition}
                                >
                                    조건 추가하기
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    disabled={true}
                                    sx={{
                                        width: '100%',
                                        height: '38px',
                                        fontWeight: 900,
                                        marginTop: '70px',
                                        ':disabled': {
                                            backgroundColor: 'rgba(0,152,238,0.3)',
                                            color: '#FFFFFF',
                                        },
                                    }}
                                    onClick={addCondition}
                                >
                                    {totalAmount > 0 ? `조건을 선택해주세요` : `선택할 분량이 없어요`}
                                </Button>
                            )}
                        </div>
                        {/* <ToastContainer /> */}
                    </div>
                </div>
            </Card>
            <SelectedConditionList setTotalAmount={setTotalAmount} totalAmount={totalAmount} setAmount={setAmount} />
        </>
    );
};

export default DetailedSearchConditions;
