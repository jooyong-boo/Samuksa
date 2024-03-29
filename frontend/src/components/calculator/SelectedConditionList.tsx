import { Avatar, CardActions, CardContent, Slide, Typography } from '@mui/material';
import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import { areaState, moneyState, personNumState, recommendListState, selectConditions } from '../../store/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getFishRecommendData } from '../../api/recommend';
import { notifyError } from 'utils/notify';
import { Button } from 'components/common';

interface amount {
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    totalAmount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    contactRef: MutableRefObject<HTMLDivElement>;
}

const SelectedConditionList = ({ setTotalAmount, totalAmount, setAmount, setLoading, contactRef }: amount) => {
    const [selectCondition, setSelectCondition] = useRecoilState<any[]>(selectConditions);
    const setRecommendList = useSetRecoilState(recommendListState);
    const personNum = useRecoilValue(personNumState);
    const money = useRecoilValue(moneyState);
    const area = useRecoilValue(areaState);
    // console.log(selectCondition)

    const deleteContidion = (id: number, plusAmount: number) => {
        setSelectCondition(selectCondition.filter((item) => item.id !== id));
        setTotalAmount(totalAmount + plusAmount);
        setAmount(0);
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (selectCondition.length === 0) {
            notifyError('선택한 조건이 없습니다.');
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
                    notifyError(
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
        <Card>
            <SelectedConditionListTypography>선택한 조건 목록</SelectedConditionListTypography>
            <SelectedConditionLists>
                {selectCondition.map((select) => {
                    const { id, selectFish, amount, farmStatus, imgUrl } = select;
                    return (
                        <Slide key={id} direction="right" in={true} timeout={400}>
                            <ListItem>
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
                                        <SelectedItemInfo fontSize={'0.9rem'} color={'#A5A5A5'} fontWeight={'medium'}>
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
                                    </CardActions>
                                </SelectedConditionListBox>
                            </ListItem>
                        </Slide>
                    );
                })}
            </SelectedConditionLists>
            <CombinationSearchBtnDiv>
                {selectCondition.length > 0 ? (
                    <CombinationSearchBtn variant="contained" onClick={onClick}>
                        조합 검색
                    </CombinationSearchBtn>
                ) : (
                    <CombinationSearchBtn variant="contained" disabled={true} onClick={onClick}>
                        선택한 조합이 없어요
                    </CombinationSearchBtn>
                )}
            </CombinationSearchBtnDiv>
        </Card>
    );
};
export default SelectedConditionList;

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    position: relative;
    @media all and (min-width: 479px) and (max-width: 1185px) {
        margin-bottom: 1rem;
    }
`;

const SelectedConditionListTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
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
`;
