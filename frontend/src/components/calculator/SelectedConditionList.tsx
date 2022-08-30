import { Avatar, Button, CardActions, CardContent, Slide, Typography } from '@mui/material';
import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import { areaState, moneyState, personNumState, recommendListState, selectConditions } from '../../store/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getFishRecommendData } from '../../api/recommend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './SearchResults';
import { useState } from 'react';

interface amount {
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    totalAmount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}

const SelectedConditionList = ({ setTotalAmount, totalAmount, setAmount }: amount) => {
    const notify = (text: ReactElement | string) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const contactRef = useRef<HTMLDivElement>(null);

    const [selectCondition, setSelectCondition] = useRecoilState<any[]>(selectConditions);
    const [recommendList, setRecommendList] = useRecoilState(recommendListState);
    const personNum = useRecoilValue(personNumState);
    const money = useRecoilValue(moneyState);
    const area = useRecoilValue(areaState);
    const [loading, setLoading] = useState<boolean>(false);
    // console.log(selectCondition)

    const deleteContidion = (id: number, plusAmount: number) => {
        setSelectCondition(selectCondition.filter((item) => item.id !== id));
        setTotalAmount(totalAmount + plusAmount);
        setAmount(0);
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (selectCondition.length === 0) {
            notify('선택한 조건이 없습니다.');
        } else {
            setLoading(true);
            getFishRecommendData({ personNum, money, area })
                .then((res) => {
                    // 조합이 없을 경우
                    if (res.recommendTotalCount < 1) {
                        throw new Error('조합 없음');
                    }
                    // 조합이 있는 경우
                    setLoading(false);
                    setRecommendList(res.fishRecommendUnions);
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                })
                .catch((e) => {
                    setLoading(false);
                    notify(
                        <p>
                            찾을 수 있는 조합이 없습니다.
                            <br /> 예산을 다시 설정해주세요.
                        </p>,
                    );
                    return;
                });
        }
    };

    return (
        <>
            <Card>
                <SelectedConditionListTypography>선택한 조건 목록</SelectedConditionListTypography>
                <SelectedConditionLists>
                    {selectCondition.map((select) => {
                        const { id, selectFish, amount, farmStatus, imgUrl } = select;
                        return (
                            <Slide key={id} direction="right" in={true} timeout={400}>
                                <ListItem>
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
                                </ListItem>
                            </Slide>
                        );
                    })}
                </SelectedConditionLists>
                <CombinationSearchBtnDiv>
                    {selectCondition.length > 0 ? (
                        <CombinationSearchBtn
                            variant="contained"
                            disableElevation
                            sx={{
                                backgroundColor: '#0098EE',
                            }}
                            onClick={onClick}
                        >
                            조합 검색
                        </CombinationSearchBtn>
                    ) : (
                        <CombinationSearchBtn
                            variant="contained"
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
                            선택한 조합이 없어요
                        </CombinationSearchBtn>
                    )}
                </CombinationSearchBtnDiv>
            </Card>
            <SearchResults ref={contactRef} loading={loading} setLoading={setLoading} />
        </>
    );
};

export default SelectedConditionList;

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    /* margin: 30px 100px; */
    position: relative;
`;

const SelectedConditionListTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid #eaeaea;
    font-weight: bold;
`;

const SelectedConditionLists = styled.form`
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

const ListItem = styled.div`
    display: flex;
    border-bottom: 1px solid #f6f6f6;
`;

const CombinationSearchBtnDiv = styled.div`
    width: 100%;
    height: 17%;
    display: flex;
`;

const CombinationSearchBtn = styled(Button)`
    width: 92%;
    height: 38px;
    font-weight: 900;
    margin: auto;
`;
