import { Avatar, Button, ButtonBase, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import image from '../img/contemplative-reptile.jpeg';
import { useState } from 'react';
import SelectedConditionList from './SelectedConditionList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fishPriceAllState, selectConditions } from '../store/atom';
import { useCallback } from 'react';

const Card = styled.div`
    background-color: white;
    width: 570px;
    height: 464px;
    border-radius: 5px;
    border: 1px solid black;
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

const dummy = 
    [   
        { id: 1, fishName: '광어', yield1: 50, active: false },
        { id: 2, fishName: '숭어', yield1: 33, active: false },
        { id: 3, fishName: '참돔', yield1: 22, active: false }, 
        { id: 4, fishName: '광어', yield1: 50, active: false },
        { id: 5, fishName: '숭어', yield1: 33, active: false },
        { id: 6, fishName: '참돔', yield1: 22, active: false }, 
        { id: 7, fishName: '광어', yield1: 50, active: false },
        { id: 8, fishName: '숭어', yield1: 33, active: false },
        { id: 9, fishName: '참돔', yield1: 22, active: false }, 
    ];

const DetailedSearchConditions = () => {

    const [areaFishPrice, setAreaFishPrice] = useRecoilState(fishPriceAllState);

    
    console.log(areaFishPrice);
    
    const [fish, setFish] = useState(areaFishPrice)
    const [selectFish, setSelectFish] = useState();
    const [amount, setAmount] = useState(4);
    const [formStatus, setFormStatus] = useState([]);
    
    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    
    const onSearch = (e) => {
        e.preventDefault()
        let searchName = e.target.value;
        console.log(searchName);
        if (!searchName) {
            setFish(fish);
        } else {
            let result = fish.filter(name => name.fishName === searchName);
            setFish(result);
        }
    }
    
    const onToggle = id => {
        setFish(
            fish.map(fish =>
                fish.fishInfoId ? { ...fish, active: false } : fish
            )
        );
        setFish(
            fish.map(fish =>
                fish.fishInfoId === id ? { ...fish, active: !fish.active } : { ...fish, active: false}
            )
        );
        setSelectFish(fish.filter(fish =>  fish.fishInfoId === id));
    };

    const changeAmount = (event, newAmount) => {
        setAmount(newAmount)
        console.log(amount)
    };

    const changeHandler = (checked, id) => {
        if (checked) {
            setFormStatus([...formStatus, id]);
        } else {
          // 체크 해제
          setFormStatus(formStatus.filter((el) => el !== id));
        }
      };

    const addCondition = () => {
        if (selectFish.length > 1) {
            return alert('어종을 선택해주세요');
        }
        if (formStatus.length === 0) {
            return alert('양식 여부를 체크해주세요');
        }
        setSelectCondition([{ id: selectFish[0].id, selectFish: selectFish[0].fishName, amount: amount, formStatus: formStatus }]);
        // setSelectCondition([...selectCondition, { id: selectFish[0].id, selectFish: selectFish[0].fishName, amount: amount, formStatus: formStatus }]);
    };

    console.log(selectFish)
    console.log(selectCondition);

    return (
        <>
        <Card>
            <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>상세 검색 조건</Typography>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '45%', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA', height: '100%' }}>
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
                                }}
                                subheader={<li />}
                                >
                                {fish.map((item, i) => {
                                    const { fishName, fishYield, fishInfoId, active} = item;
                                    {/* console.log(item); */}
                                    return (
                                        <ListItemStyled key={fishInfoId} style={{ backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer' }} onToggle={onToggle} onClick={() => onToggle(fishInfoId)}>
                                            <ListItemAvatar sx={{ padding: '9px 13px 11px 16px' }}>
                                                <Avatar
                                                // alt={`Avatar n°${value + 1}`}
                                                src={image}
                                                variant= 'square'
                                                style={{ height: '50px', width: '50px' }}
                                                />
                                            </ListItemAvatar>
                                            <ListItem key={i} sx={{ paddingLeft: 0 }}>
                                                <ListItemText primary={fishName} secondary={`(수율: ${fishYield}%)`} />
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
                            max={4}
                            onChange={changeAmount}
                        />
                    </div>
                    <div style={{ width: '90%',height: '100%' , margin: 'auto', marginTop: '10%', borderTop: '1px solid #EAEAEA', paddingTop: '24px', position: 'relative' }}>
                        <Typography variant='subtitle1'>양식 여부</Typography>
                        <Typography variant='body2' sx={{ color: '#737373' }}>중복 선택이 가능합니다.</Typography>

                        <Typography><Checkbox id={'자연산'} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, '자연산')}} checked={formStatus.includes('자연산') ? true : false} />자연산</Typography>
                        <Typography><Checkbox id={'양식'} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, '양식')}} checked={formStatus.includes('양식') ? true : false} />양식</Typography>

                        <Button variant="contained" type='submit' sx={{ mb: 2, width: '100%', height: '38px', backgroundColor: '#767676', fontWeight: 900, marginTop: '70px', position: 'absolute' , bottom: 160, }} onClick={addCondition} >조건 추가하기</Button>
                    </div>
                </div>
            </div>
        </Card>
        <SelectedConditionList />
        </>
    );
};

export default DetailedSearchConditions;