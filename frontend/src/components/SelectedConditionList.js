import {
    Avatar,
    Button,
    ButtonBase,
    CardActions,
    CardContent,
    Checkbox,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Slide,
    Slider,
    Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import styled from 'styled-components';
import image from '../components/assets/img/contemplative-reptile.jpeg';
import { areaState, isLoading, moneyState, personNumState, recommendListState, selectConditions } from '../store/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getFishRecommendData } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './SearchResults';
import { useState } from 'react';

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
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
`;

const SelectedConditionList = ({ setTotalAmount, totalAmount, setAmount }) => {
    const notify = (text) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const contactRef = useRef(null);

    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [recommendList, setRecommendList] = useRecoilState(recommendListState);
    const personNum = useRecoilValue(personNumState);
    const money = useRecoilValue(moneyState);
    const area = useRecoilValue(areaState);
    const [loading, setLoading] = useState(false);
    // console.log(selectCondition)

    const deleteContidion = (id, plusAmount) => {
        setSelectCondition(selectCondition.filter((item) => item.id !== id));
        setTotalAmount(totalAmount + plusAmount);
        setAmount(0);
    };

    const onClick = (e) => {
        e.preventDefault();
        if (selectCondition.length === 0) {
            notify('선택한 조건이 없습니다.');
        } else {
            setLoading(true);
            getFishRecommendData({ personNum, money, area }).then((res) => setRecommendList(res.fishRecommendUnions));
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    선택한 조건 목록
                </Typography>
                <CustomForm>
                    {selectCondition.map((select) => {
                        {
                            /* console.log(select) */
                        }
                        const { id, selectFish, amount, farmStatus, imgUrl } = select;
                        return (
                            <Slide key={id} direction="right" in={true} timeout={400}>
                                <div
                                    style={{
                                        display: 'flex',
                                        borderBottom: '1px solid #F6F6F6',
                                    }}
                                >
                                    {/* <Img alt="complex" src={image} sx={{ borderRadius: '3px' }} /> */}
                                    <Avatar
                                        alt={selectFish}
                                        src={imgUrl}
                                        variant="square"
                                        style={{
                                            height: '50px',
                                            width: '50px',
                                            borderRadius: '3px',
                                            margin: '13px',
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '16px 0px',
                                            }}
                                        >
                                            <div style={{ display: 'flex' }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: 14,
                                                        color: '#4A4A4A',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {selectFish}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 13,
                                                        color: '#A5A5A5',
                                                        fontWeight: 'medium',
                                                        marginLeft: 1,
                                                    }}
                                                >
                                                    ({amount}인)
                                                </Typography>
                                            </div>
                                            <Typography
                                                sx={{
                                                    fontSize: 13,
                                                    color: '#A5A5A5',
                                                    fontWeight: 'medium',
                                                }}
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                {farmStatus.join(', ')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '1px',
                                                    color: '#949494',
                                                    borderColor: '#D8D8D8',
                                                    fontSize: 12,
                                                    marginRight: '12px',
                                                }}
                                                onClick={() => {
                                                    deleteContidion(id, amount);
                                                }}
                                            >
                                                조건 삭제
                                            </Button>
                                            <ToastContainer />
                                        </CardActions>
                                    </div>
                                </div>
                            </Slide>
                        );
                    })}
                </CustomForm>
                <div style={{ width: '100%', height: '17%', display: 'flex' }}>
                    {selectCondition.length > 0 ? (
                        <Button
                            variant="contained"
                            disableElevation
                            sx={{
                                mt: 3,
                                mb: 2,
                                width: '274px',
                                height: '38px',
                                backgroundColor: '#0098EE',
                                fontWeight: 900,
                                margin: 'auto',
                            }}
                            onClick={onClick}
                        >
                            조합 검색
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            disableElevation
                            disabled={true}
                            sx={{
                                mt: 3,
                                mb: 2,
                                width: '274px',
                                height: '38px',
                                fontWeight: 900,
                                margin: 'auto',
                                ':disabled': {
                                    backgroundColor: 'rgba(0,152,238,0.3)',
                                    color: '#FFFFFF',
                                },
                            }}
                            onClick={onClick}
                        >
                            선택한 조합이 없어요
                        </Button>
                    )}
                </div>
            </Card>
            <SearchResults ref={contactRef} loading={loading} setLoading={setLoading} />
        </>
    );
};

export default SelectedConditionList;
