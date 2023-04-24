import { FormControl, Grid, InputLabel, SelectChangeEvent, Typography } from '@mui/material';
import styled from 'styled-components';
import { Container } from '@mui/system';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
    amountState,
    areaState,
    farmState,
    fishDetailRecommendInfo,
    getAreaState,
    moneyState,
    personNumState,
    recommendListState,
    selectConditions,
    selectFishState,
    selectState,
    totalAmountState,
} from '../../store/atom';
import { getAreaTotalFishData } from '../../api/recommend';
import React from 'react';
import { notifyError } from 'utils/notify';
import { Button, Select, TextField } from 'components/common';

interface FishInfo {
    farmTypes: string;
    fishInfoId: 0;
    fishName: string;
    fishYield: 0;
    imgUrl: string;
}

const SearchConditions = () => {
    const getArea = useRecoilValue(getAreaState);

    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const setFishList = useSetRecoilState(fishDetailRecommendInfo);

    // 리셋
    const resetFishDetailRecommendInfo = useResetRecoilState(fishDetailRecommendInfo);
    const resetSelectCondition = useResetRecoilState(selectConditions);
    const resetSelectFish = useResetRecoilState(selectFishState);
    const resetTotalAmount = useResetRecoilState(totalAmountState);
    const resetFarm = useResetRecoilState(farmState);
    const resetRecommendList = useResetRecoilState(recommendListState);
    const resetAmount = useResetRecoilState(amountState);

    // 검색조건 선택 여부 체크
    const [isSelected, setIsSelected] = useRecoilState(selectState);

    const handlePersonNumChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const onlyNumberPersonValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPersonNum(onlyNumberPersonValue);
        if (Number(value) >= 35) {
            notifyError('인원수는 35명 이하로 해주세요');
            setPersonNum(String(35));
        }
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const onlyNumberMoney = value.replace(/[^0-9]/g, '');
        setMoney(onlyNumberMoney);
        if (Number(value) > 10000000) {
            notifyError('가격은 천만원 이하로 해주세요');
            setMoney(String(10000000));
        }
    };

    const handleAreaChange = (e: SelectChangeEvent<unknown>) => {
        setArea(e.target.value as string);
    };

    const searchForFishByRegion = () => {
        if (Number(money) < 50000) {
            notifyError('가격을 50000이상으로 해주세요');
            setMoney(String(50000));
            return;
        } else if (Number(personNum) <= 0) {
            notifyError('인원을 입력해주세요');
            return;
        }
    };

    const onReset = () => {
        setPersonNum('');
        setMoney(String(50000));
        setArea('노량진');
        resetFishDetailRecommendInfo();
        resetSelectCondition();
        resetSelectFish();
        resetTotalAmount();
        resetAmount();
        resetFarm();
        resetRecommendList();
        setIsSelected(true);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Number(money) < 50000 || Number(personNum) <= 0) return;
        getAreaTotalFishData({ area }).then((res) =>
            res
                ? (setFishList(res.map((item: FishInfo) => ({ ...item, active: false }))), setIsSelected(false))
                : notifyError('해당 가격으론 찾을 수 있는 조합이 없어요!'),
        );
    };

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchForFishByRegion();
        }
    };

    return (
        <Card>
            <SearchConditionTypography>검색 조건</SearchConditionTypography>
            <SearchConditionContainer>
                <SearchConditionForm onSubmit={onSubmit}>
                    <CustomGrid container spacing={5}>
                        <CustomGrid item xs={10}>
                            <TextField
                                label="인원수"
                                value={personNum}
                                onChange={handlePersonNumChange}
                                endadornment="명"
                                disabled={!isSelected}
                                onKeyPress={(e) => {
                                    handleEnterPress(e);
                                }}
                            />
                        </CustomGrid>
                        <CustomGrid item xs={10}>
                            <TextField
                                label="예산"
                                value={money}
                                onChange={handleMoneyChange}
                                endadornment="원"
                                disabled={!isSelected}
                                onKeyPress={(e) => {
                                    handleEnterPress(e);
                                }}
                            />
                        </CustomGrid>
                        <CustomGrid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel id="local">지역</InputLabel>
                                <Select
                                    label="지역"
                                    datas={getArea}
                                    data={area}
                                    onChange={handleAreaChange}
                                    disabled={!isSelected}
                                />
                            </FormControl>
                        </CustomGrid>
                    </CustomGrid>
                    <SearchConditionBtnArea>
                        <SearchConditionSelectBtn
                            variant="contained"
                            type="submit"
                            disabled={!isSelected}
                            onClick={searchForFishByRegion}
                        >
                            {isSelected ? '조건 선택' : '선택 완료'}
                        </SearchConditionSelectBtn>
                        <SearchConditionResetBtn
                            variant="outlined"
                            onClick={() => {
                                onReset();
                                moveTop();
                            }}
                        >
                            조건 초기화
                        </SearchConditionResetBtn>
                    </SearchConditionBtnArea>
                </SearchConditionForm>
            </SearchConditionContainer>
        </Card>
    );
};

export default SearchConditions;

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
`;

const SearchConditionTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    font-weight: bold;
`;

const SearchConditionContainer = styled(Container)`
    display: flex;
    width: 100%;
    height: 90%;
    justify-content: center;
    align-items: center;
`;

const SearchConditionForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CustomGrid = styled(Grid)`
    justify-content: center;
    align-items: center;
`;

const SearchConditionBtnArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

const SearchConditionSelectBtn = styled(Button)`
    margin-top: 24px;
    margin-bottom: 16px;
    width: 274px;
    height: 38px;
    font-weight: 900;
`;

const SearchConditionResetBtn = styled(Button)`
    width: 40%;
    border-color: #d8d8d8;
    color: #949494;
`;
