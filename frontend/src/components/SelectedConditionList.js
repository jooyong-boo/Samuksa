import { Avatar, Button, ButtonBase, CardActions, CardContent, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import { areaState, moneyState, personNumState, recommendListState, selectConditions } from '../store/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getFishRecommendData } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    /* margin: 30px 100px; */
    position: relative;
`;

const CustomForm = styled.form`
    position: relative;
    height: 340px;
    overflow: overlay;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`;

const SelectedConditionList = ({ setTotalAmount, totalAmount, setAmount }) => {

    const notify = (text) => toast.warning(text, { position: "top-center", autoClose: 1000, hideProgressBar: true });

    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [recommendList, setRecommendList] = useRecoilState(recommendListState);
    const personNum = useRecoilValue(personNumState);
    const money = useRecoilValue(moneyState);
    const area = useRecoilValue(areaState);
    // console.log(selectCondition)

    const deleteContidion = (id, PlusAmount) => {
        setSelectCondition(selectCondition.filter(item => item.id !== id ))
        setTotalAmount(totalAmount + PlusAmount)
        setAmount(0)
    }

    const onClick = (e) => {
        e.preventDefault();
        if (selectCondition.length === 0) {
            notify('선택한 조건이 없습니다.');
        } else {
            getFishRecommendData({ personNum, money, area }).then(res => setRecommendList(res.fishRecommendUnions))
        }
    }

    return (
            <Card>
                <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>선택한 조건 목록</Typography>
                    <CustomForm>
                    {selectCondition.map((select) => {
                        {/* console.log(select) */}
                        const { id, selectFish, amount, farmStatus, imgUrl } = select;
                        return (
                            <div style={{ display: 'flex', borderBottom: '1px solid #F6F6F6' }} key={id}>
                                {/* <Img alt="complex" src={image} sx={{ borderRadius: '3px' }} /> */}
                                <Avatar
                                    // alt={`Avatar n°${value + 1}`}
                                    src={imgUrl}
                                    variant= 'square'
                                    style={{ height: '50px', width: '50px', borderRadius: '3px', margin: '13px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '16px 0px' }}>
                                        <div style={{ display: 'flex' }}>
                                            <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                                {selectFish}
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, color: '#A5A5A5', fontWeight: 'medium', marginLeft: 1 }}>
                                                ({amount}인분)
                                            </Typography>
                                        </div>
                                        <Typography sx={{ fontSize: 13, color: '#A5A5A5', fontWeight: 'medium' }} color="text.secondary" gutterBottom>
                                            {farmStatus.join(", ")}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant='outlined' sx={{ borderRadius: '1px', color: '#949494', borderColor: '#D8D8D8', fontSize: 12 }} onClick={() => {deleteContidion(id, amount)}}>삭제</Button>
                                        <ToastContainer />
                                    </CardActions>
                                </div>
                            </div>
                        )
                    })}
                    </CustomForm>
                {selectCondition.length > 0 ? <Button variant='contained' disableElevation sx={{ display: 'inline-block', position: 'absolute', backgroundColor: '#0098EE',fontSize: 15 , fontWeight: 900, width: '274px', height: '38px' ,bottom: '9px', left: '10px' }} onClick={onClick} >조합 검색</Button>
                    : <Button variant='contained' disableElevation sx={{ display: 'inline-block', position: 'absolute', backgroundColor: '#767676',fontSize: 15 , fontWeight: 900, width: '274px', height: '38px' ,bottom: '9px', left: '10px' }} onClick={onClick} >조합 검색</Button>}
            </Card>
    );
};

export default SelectedConditionList;