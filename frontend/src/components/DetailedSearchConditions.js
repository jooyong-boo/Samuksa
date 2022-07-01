import { Avatar, Button, ButtonBase, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import image from '../img/contemplative-reptile.jpeg';
import { useState } from 'react';

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

// const serving = [
//     {
//         value: 1,
//         label: '1인분',
//     },
//     {
//         value: 2,
//         label: '2인분',
//     },
//     {
//         value: 3,
//         label: '3인분',
//     },
//     {
//         value: 4,
//         label: '4인분',
//     },
// ];

const dummy = 
    [   
        { id: 1, fishName: '광어', yield1: 50, active: false },
        { id: 2, fishName: '숭어', yield1: 33, active: false },
        { id: 3, fishName: '참돔', yield1: 22, active: false }, 
        { id: 4, fishName: '우럭', yield1: 44, active: false },
        { id: 5, fishName: '숭어', yield1: 33, active: false },
        { id: 6, fishName: '참돔', yield1: 22, active: false }, 
        { id: 7, fishName: '우럭', yield1: 44, active: false },
        { id: 8, fishName: '숭어', yield1: 33, active: false },
        { id: 9, fishName: '참돔', yield1: 22, active: false }, 
        { id: 10, fishName: '우럭', yield1: 44, active: false },
    ]


function valuetext(value) {
    return `${value}인분`;
}

// function valueLabelFormat(value) {
//     return serving.findIndex((serv) => serv.value === value) + 1;
// }

// function valueLabelFormat(value) {
//     return `${value}인분`;
// }

const DetailedSearchConditions = () => {

    const [fish, setFish] = useState(dummy);
    const [amount, setAmount] = useState(4);
    const [formStatus, setFormStatus] = useState([]);

    console.log(fish)

    const onSearch = (e) => {
        e.preventDefault()
        let searchName = e.target.value;
        console.log(searchName);
        if (!searchName) {
            setFish(dummy);
        } else {
            let result = dummy.filter(name => name.fishName === searchName);
            setFish(result);
        }
    }

    const onToggle = id => {
        setFish(
            fish.map(fish =>
              fish.active = false
            )
          );
        // setFish(
        //     fish.map(fish =>
        //       fish.id !== id ? { ...fish, active: false } : fish
        //     )
        //   );
        setFish(
          fish.map(fish =>
            fish.id === id ? { ...fish, active: !fish.active } : fish
          )
        );
      };

    const changeAmount = (event, newAmount) => {
        setAmount(newAmount)
        console.log(amount)
    }

    console.log(formStatus)
    const changeHandler = (checked, id) => {
        if (checked) {
            setFormStatus([...formStatus, id]);
        } else {
          // 체크 해제
          setFormStatus(formStatus.filter((el) => el !== id));
        }
      };

    const addCondition = () => {
        if (formStatus.length === 0) {
            alert('양식 여부를 체크해주세요');
        }
    }

    return (
        <Card>
            <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>상세 검색 조건</Typography>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '45%', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
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
                                    const { fishName, yield1, id, active} = item;
                                    return (
                                        <ListItemStyled key={id} style={{ backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer' }} onToggle={onToggle} onClick={() => onToggle(id)}>
                                            <ListItemAvatar sx={{ padding: '9px 13px 11px 16px' }}>
                                                <Avatar
                                                // alt={`Avatar n°${value + 1}`}
                                                src={image}
                                                variant= 'square'
                                                style={{ height: '50px', width: '50px' }}
                                                />
                                            </ListItemAvatar>
                                            <ListItem key={i} sx={{ paddingLeft: 0 }}>
                                                <ListItemText primary={fishName} secondary={`(수율: ${yield1}%)`} />
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
                    <div style={{ width: '90%', margin: 'auto', marginTop: '10%', borderTop: '1px solid #EAEAEA', paddingTop: '24px', position: 'relative' }}>
                        <Typography variant='subtitle1'>양식 여부</Typography>
                        <Typography variant='body2' sx={{ color: '#737373' }}>중복 선택이 가능합니다.</Typography>

                        <Typography><Checkbox id={'자연산'} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, '자연산')}} checked={formStatus.includes('자연산') ? true : false} />자연산</Typography>
                        <Typography><Checkbox id={'양식'} sx={{ color: '#E1E1E1' }} onChange={(e) => {changeHandler(e.currentTarget.checked, '양식')}} checked={formStatus.includes('양식') ? true : false} />양식</Typography>

                        <Button variant="contained" type='submit' sx={{ mb: 2, width: '100%', height: '38px', backgroundColor: '#767676', fontWeight: 900, marginTop: '70px', position: 'absolute' , bottom: -100, }} onClick={addCondition} >조건 추가하기</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DetailedSearchConditions;

                            {/* <Grid container spacing={6}>
                                <Grid item>
                                <ButtonBase sx={{ width: 50, height: 50 }}>
                                    <Img alt="complex" src={image} />
                                </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={1}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle2" component="div">
                                            광어
                                        </Typography>
                                        <Typography gutterBottom variant="caption" component="div">
                                            수율(35%)
                                        </Typography>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid> */}