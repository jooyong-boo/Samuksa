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
    const notify = (text: ReactElement | string) => {
        dismissAll();
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

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
                    setRecommendList(res.fishRecommendUnions);
                    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    notify(
                        <p>
                            찾을 수 있는 조합이 없습니다.
                            <br /> 조건을 다시 정해주세요.
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
                                    <CustomAvatar alt={selectFish} src={imgUrl} />
                                    <SelectedConditionListBox>
                                        <CustomCardContent>
                                            <SelectedItemsBox>
                                                <SelectedItemInfo color={'#4A4A4A'} fontWeight={'600'}>
                                                    {selectFish}
                                                </SelectedItemInfo>
                                                <SelectedItemInfo
                                                    fontSize={'0.9rem'}
                                                    color={'#A5A5A5'}
                                                    fontWeight={'medium'}
                                                    marginLeft={'0.5rem'}
                                                >
                                                    ({amount}인)
                                                </SelectedItemInfo>
                                            </SelectedItemsBox>
                                            <SelectedItemInfo
                                                fontSize={'0.9rem'}
                                                color={'#A5A5A5'}
                                                fontWeight={'medium'}
                                            >
                                                {farmStatus.join(', ')}
                                            </SelectedItemInfo>
                                        </CustomCardContent>
                                        <CardActions>
                                            <DeleteConditionBtn
                                                variant="outlined"
                                                onClick={() => {
                                                    deleteContidion(id, amount);
                                                }}
                                            >
                                                조건 삭제
                                            </DeleteConditionBtn>
                                            <ToastContainer />
                                        </CardActions>
                                    </SelectedConditionListBox>
                                </ListItem>
                            </Slide>
                        );
                    })}
                </SelectedConditionLists>
                <CombinationSearchBtnDiv>
                    {selectCondition.length > 0 ? (
                        <CombinationSearchBtn variant="contained" disableElevation onClick={onClick}>
                            조합 검색
                        </CombinationSearchBtn>
                    ) : (
                        <CombinationSearchBtn variant="contained" disableElevation disabled={true} onClick={onClick}>
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
    /* 테블릿 세로 (해상도 768px ~ 1023px)*/
    @media all and (min-width: 768px) and (max-width: 1185px) {
        margin-bottom: 1rem;
    }

    /* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/
    @media all and (min-width: 480px) and (max-width: 767px) {
        /* width: 95%; */
        margin-bottom: 1rem;
    }

    /* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
    @media all and (max-width: 479px) {
        /* width: 95%; */
        margin-bottom: 1rem;
    }
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

const CustomAvatar = styled(Avatar)`
    height: 50px;
    width: 50px;
    border-radius: 3px;
    margin: 13px;
`;

const SelectedConditionListBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const CustomCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    padding: 16px 0px;
    justify-content: center;
`;

const SelectedItemsBox = styled.div`
    display: flex;
`;

interface SelectedItemInfoProps {
    fontSize?: any;
    color?: any;
    fontWeight?: any;
    marginLeft?: any;
}

const SelectedItemInfo = styled(Typography)<SelectedItemInfoProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '0.975rem')};
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '400')};
    margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}` : '0')};
`;

const DeleteConditionBtn = styled(Button)`
    border-radius: 1px;
    color: #949494;
    border-color: #d8d8d8;
    font-size: 0.8rem;
    margin-right: 12px;
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
    background-color: ${({ theme }) => theme.colors.main};
    &:disabled {
        background-color: rgba(0, 152, 238, 0.3);
        color: #ffffff;
    }
`;
