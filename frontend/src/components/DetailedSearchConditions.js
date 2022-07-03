import { Avatar, Button, ButtonBase, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import image from '../img/contemplative-reptile.jpeg';
import { useState } from 'react';
import SelectedConditionList from './SelectedConditionList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fishDetailRecommendInfo, fishPriceAllState, getFramTypeState, personNumState, recommendListState, selectConditions, selectFishNameState, selectFishState } from '../store/atom';
import { getFarmType } from '../api/auth';
import { useEffect } from 'react';

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

    const [areaFishPrice, setAreaFishPrice] = useRecoilState(fishPriceAllState);
    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [selectFish, setSelectFish] = useRecoilState(selectFishState)
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo)
    const personNum = useRecoilValue(personNumState)
    console.log(fishList)
    // const [selectFishName, setSelectFishName] = useRecoilState(selectFishNameState);
    // console.log(selectCondition);

    // const farmType = useRecoilValue(getFramTypeState)
    // console.log(farmType);

    // console.log(areaFishPrice);

    useEffect(() => {
        setFish(fishList)
    }, [fishList])
    
    const [fish, setFish] = useState(fishList)
    const [amount, setAmount] = useState(1);
    const [farm, setFarm] = useState([]);
    const [farmStatus, setFarmStatus] = useState([]);

    console.log(fish);
    
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

        // id 일치하면 fishName 넣기
        fish.map(fish =>
            fish.fishInfoId === id ? (getFarmType({ fishName: fish.fishName }).then(res => {setFarm(res)})) : null
        )
    };
    console.log(farm);
    console.log(farmStatus);
    const changeAmount = (event, newAmount) => {
        setAmount(newAmount)
        console.log(amount)
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
        if (selectFish === '') {
            return alert('어종을 선택해주세요');
        }
        if (farmStatus.length === 0) {
            return alert('양식 여부를 체크해주세요');
        }
        setSelectCondition(selectCondition.some(item =>
            item.id === selectFish[0].fishInfoId) ?
                [...selectCondition] : 
                [...selectCondition, { id: selectFish[0].fishInfoId, selectFish: selectFish[0].fishName, amount, farmStatus }]);
    };

    console.log(selectFish)
    // console.log(selectCondition);

    return (
        <>
        <Card>
            <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>상세 검색 조건</Typography>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '45%', borderRight: '1px solid #EAEAEA', maxHeight: '420px' }}>
                    <FormControl fullWidth sx={{}}> 
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
                                    boxShadow: 'none'
                                }}
                                subheader={<li />}
                                >
                                {fish.map((item, i) => {
                                    const { fishName, fishYield, fishInfoId, active} = item;
                                    {/* console.log(item); */}
                                    return (
                                        <ListItemStyled key={fishInfoId} style={{ backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer' }} onToggle={onToggle} onClick={() => {onToggle(fishInfoId)}}>
                                            <ListItemAvatar sx={{ padding: '9px 13px 9px 16px' }}>
                                                <Avatar
                                                // alt={`Avatar n°${value + 1}`}
                                                src={image}
                                                variant= 'square'
                                                style={{ height: '50px', width: '50px', borderRadius: '3px' }}
                                                />
                                            </ListItemAvatar>
                                            <ListItem key={i} sx={{ paddingLeft: 0 }}>
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
                            min={1}
                            max={personNum}
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
                        {/* {farmType.map((item, i) => (
                            <Typography key={i}><Checkbox id={item} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, `${item}`)}} checked={formStatus.includes(`${item}`) ? true : false} />{item}</Typography>
                        ))} */}
                        {/* <Typography><Checkbox id={'양식'} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, '양식')}} checked={formStatus.includes('양식') ? true : false} />양식</Typography> */}

                        <Button variant="contained" type='submit' sx={{ mb: 2, width: '100%', height: '38px', backgroundColor: '#767676', fontWeight: 900, marginTop: '70px', position: 'absolute' , bottom: 193, }} onClick={addCondition} >조건 추가하기</Button>
                    </div>
                </div>
            </div>
        </Card>
        <SelectedConditionList />
        </>
    );
};

export default DetailedSearchConditions;