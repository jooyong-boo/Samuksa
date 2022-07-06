import { Avatar, Button, Checkbox, FormControl, Input, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import image from '../img/contemplative-reptile.jpeg';
import { useState } from 'react';
import SelectedConditionList from './SelectedConditionList';
import { errorSelector, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { fishDetailRecommendInfo, fishPriceAllState, getFramTypeState, personNumState, recommendListState, selectConditions, selectFishNameState, selectFishState } from '../store/atom';
import { getFarmType } from '../api/auth';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = styled.div`
    background-color: white;
    width: 570px;
    height: 464px;
    border-radius: 5px;
    /* border: 1px solid black; */
    margin: 1rem;
`

const ListItemStyled = styled.div`
    /* style={{ display: 'flex', backgroundColor: 'white', height: '100%', borderBottom: '1px solid #F6F6F6' }} */
    display: flex;
    background-color: white;
    height: 100%;
    border-bottom: 1px solid #F6F6F6;
    &:hover {
        background-color: #F4F4F4;
    }
`;

const DetailedSearchConditions = () => {

    const notify = (text) => toast.warning(text, { position: "top-center", autoClose: 1000, hideProgressBar: true });

    const [areaFishPrice, setAreaFishPrice] = useRecoilState(fishPriceAllState);
    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [selectFish, setSelectFish] = useRecoilState(selectFishState)
    const resetSelectFish = useResetRecoilState(selectFishState)
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo)
    const [personNum, setPersonNum] = useRecoilState(personNumState)
    const [totalAmount, setTotalAmount] = useState(Number(personNum))
    const [fish, setFish] = useState(fishList)
    const [amount, setAmount] = useState(0);
    const [farm, setFarm] = useState([]);
    const [farmStatus, setFarmStatus] = useState([]);

    useEffect(() => {
        setFish(fishList)
    }, [fishList])

    useEffect(() => {
        if (Number(personNum) >= 1) {
            setTotalAmount(Number(personNum))
        }
    }, [personNum])
    
    
    useEffect(() => {
        resetSelectFish();
        setFish(
            fish.map(fish =>
                fish ? { ...fish, active: false } : {...fish}
            )
        );
    }, [selectCondition])
            
    useEffect(() => {
        fish.map(fish =>
            fish.active === true ? (getFarmType({ fishName: fish.fishName }).then(res => {setFarm(res)})) : setFarm([])
            )
    }, [selectFish])

    useEffect(() => {
        if (totalAmount > 0 && totalAmount - amount >= 0) {
            setTotalAmount(totalAmount - amount);
            setAmount(0);
        }
    }, [selectCondition])

    const onSearch = (e) => {
        e.preventDefault()
        let searchName = e.target.value;
        console.log(searchName);
        if (!searchName) {
            setFish(fishList);
        } else {
            let result = fishList.filter(name => name.fishName === searchName);
            setFish(result);
        }
    }

    const onToggle = id => {
        
        setFish(
            fish.map(fish =>
                fish.fishInfoId === id ? { ...fish, active: !fish.active } : { ...fish, active: false }
            )
                );
                
        setSelectFish(fish.filter(fish =>  fish.fishInfoId === id));
    };


    // console.log(farm);
    // console.log(farmStatus);
    
    const changeAmount = (event, newAmount) => {
        event.preventDefault();
        setAmount(newAmount)
        // console.log(amount)
    };

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
        } else if (farmStatus.length === 0) {
            // return alert('양식 여부를 체크해주세요');
            return notify('양식 여부를 체크해주세요');
        } else if (amount === 0 && selectCondition.length > 0) {
            return notify('분량 부족');
        } else if (amount === 0 && selectCondition.length === 0){
            return notify('분량을 선택해주세요');
        } else {
            selectCondition.some(item =>
                item.id === selectFish[0].fishInfoId) ?
                    notify('선택한 어종이 이미 있습니다.')
                    : setSelectCondition([...selectCondition, { id: selectFish[0].fishInfoId, selectFish: selectFish[0].fishName, amount, farmStatus }]);
        }
    };

    // console.log(totalAmount)

    return (
        <>
        <Card>
            <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>상세 검색 조건</Typography>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '45%', borderRight: '1px solid #EAEAEA', maxHeight: '420px' }}>
                    <FormControl fullWidth> 
                        <Input 
                            id="input-with-icon-adornment"
                            startAdornment={
                                // <InputAdornment position="start">
                                    <SearchIcon/>
                                // </InputAdornment>
                            }
                            type="string"
                            defaultValue=""
                            placeholder='찾는 어종을 입력하세요'
                            onChange={onSearch}
                        />
                    </FormControl>
                    <>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1200,
                                maxHeight: 700,
                                flexGrow: 1,
                                backgroundColor: '#F8F8F8',
                                padding: 0,
                                boxShadow: 'none'
                            }}
                        >
                            <List
                                sx={{
                                    width: '100%',
                                    // maxWidth: 500,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 385,
                                    // borderBottom: '1px solid black'
                                    // border: 0,
                                    padding: 0,
                                    boxShadow: 'none',
                                    overflowX: 'hidden',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        borderRadius: '6px',
                                        background: 'rgba(255, 255, 255, 0.4)',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        borderRadius: '6px'
                                    },
                                }}
                                subheader={<li />}
                                >
                                {fish.map((item) => {
                                    const { fishName, fishYield, fishInfoId, active} = item;
                                    {/* console.log(item); */}
                                    return (
                                        <ListItemStyled key={fishInfoId} style={{ backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer' }} onClick={() => {onToggle(fishInfoId)}}>
                                            <ListItemAvatar sx={{ padding: '9px 13px 9px 16px' }}>
                                                <Avatar
                                                // alt={`Avatar n°${value + 1}`}
                                                src={image}
                                                variant= 'square'
                                                style={{ height: '50px', width: '50px', borderRadius: '3px' }}
                                                />
                                            </ListItemAvatar>
                                            <ListItem sx={{ paddingLeft: 0 }}>
                                                <ListItemText primary={fishName} secondary={`(수율: ${fishYield}%)`} />
                                                {/* <Typography>{fishName}</Typography>
                                                <Typography>{fishYield}</Typography> */}
                                            </ListItem>
                                        </ListItemStyled>
                                    )
                                })}
                            </List>
                        </Paper>
                    </>
                </div>
                <div style={{ width: '55%' }}>
                    <div style={{ width: '70%', margin: 'auto', marginTop: '10%' }}>
                        <Typography sx={{ textAlign: 'center' }}>분량</Typography>            
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
                        <Typography sx={{ textAlign: 'center' }}>{amount}인분</Typography>
                    </div>
                    <div style={{ width: '90%',height: '100%' , margin: 'auto', marginTop: '10%', borderTop: '1px solid #EAEAEA', paddingTop: '24px', position: 'relative' }}>
                        <Typography variant='subtitle1'>양식 여부</Typography>
                        <Typography variant='body2' sx={{ color: '#737373' }}>중복 선택이 가능합니다.</Typography>
                        {
                            farm ? 
                                farm.map((item, i) => (
                                    <Typography key={i} sx={{ fontSize: '14px' }}><Checkbox id={item} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, `${item}`)}} checked={farmStatus.includes(`${item}`) ? true : false} />{item}</Typography>
                                )) : null
                        }
                        <Button variant="contained" type='submit' disableElevation sx={{ mb: 2, width: '100%', height: '38px', backgroundColor: '#767676', fontWeight: 900, marginTop: '70px', position: 'absolute' , bottom: 193, }} onClick={addCondition} >조건 추가하기</Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </Card>
        <SelectedConditionList setTotalAmount={setTotalAmount} totalAmount={totalAmount} setAmount={setAmount} />
        </>
    );
};

export default DetailedSearchConditions;