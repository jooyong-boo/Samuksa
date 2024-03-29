import styled from 'styled-components';
import image from '../assets/img/mainImage.webp';
import { Box, SelectChangeEvent } from '@mui/material';
import { getAreaTotalFishData } from '../api/recommend';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    areaState,
    fishDetailRecommendInfo,
    getAreaState,
    moneyState,
    personNumState,
    selectState,
} from '../store/atom';
import { useNavigate } from 'react-router-dom';
import Introduction from 'components/Introduction';
import Title from 'components/main/Title';
import { notifyError } from '../utils/notify';
import { Button, Select, TextField } from 'components/common';

const MainPage = () => {
    const navigate = useNavigate();
    const getArea = useRecoilValue(getAreaState);
    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const setFishList = useSetRecoilState(fishDetailRecommendInfo);

    // 검색조건 선택 여부 체크
    const setSelect = useSetRecoilState(selectState);

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

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (Number(personNum) <= 0) {
            e.preventDefault();
            notifyError('인원을 입력해주세요');
            return;
        } else if (Number(money) < 50000) {
            e.preventDefault();
            notifyError('가격을 50000이상으로 해주세요');
            setMoney(String(50000));
            return;
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getAreaTotalFishData({ area }).then((res) =>
            res
                ? (setFishList(res.map((item: {}) => (item ? { ...item, active: false } : { ...item }))),
                  setSelect(false))
                : notifyError('해당 가격으론 찾을 수 있는 조합이 없어요!'),
        );
        navigate('/calculator');
    };

    return (
        <>
            <Background>
                <Title />
                <SearchForm onSubmit={onSubmit}>
                    <CustomBox>
                        <TextField
                            placeholder="인원"
                            endadornment="명"
                            value={personNum}
                            onChange={handlePersonNumChange}
                        />
                        <TextField placeholder="예산" endadornment="원" value={money} onChange={handleMoneyChange} />
                        <Select title="지역" datas={getArea} data={area} onChange={handleAreaChange} />
                    </CustomBox>
                    <SubmitBtn variant="contained" type="submit" onClick={onClick}>
                        검색
                    </SubmitBtn>
                </SearchForm>
            </Background>
            <Introduction />
        </>
    );
};

const Background = styled.div`
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
`;

const SearchForm = styled.form`
    text-align: center;
`;

const CustomBox = styled(Box)`
    & > :not(style) {
        margin: 0.5rem;
        width: 11rem;
    }
    & > div {
        background-color: white;
        border-radius: 5px;
        opacity: 0.8;
    }
`;

const SubmitBtn = styled(Button)`
    width: 97%;
    margin-top: 1rem;
    opacity: 0.9;
`;

export default MainPage;
