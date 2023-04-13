import styled from 'styled-components';
import image from '../assets/img/mainImage.webp';
import { Box, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { getAreaTotalFishData } from '../api/recommend';
import { useRecoilState, useRecoilValue } from 'recoil';
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
import { Button } from 'components/common';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const MainPage = () => {
    const navigate = useNavigate();
    const getArea = useRecoilValue(getAreaState);
    const [personNum, setPersonNum] = useRecoilState(personNumState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [area, setArea] = useRecoilState(areaState);
    const [fishList, setFishList] = useRecoilState(fishDetailRecommendInfo);

    // 검색조건 선택 여부 체크
    const [select, setSelect] = useRecoilState(selectState);

    const handlePersonNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const onlyNumberPersonValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPersonNum(onlyNumberPersonValue);
        if (Number(value) >= 35) {
            notifyError('인원수는 35명 이하로 해주세요');
            setPersonNum(String(35));
        }
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        <CustomTextField
                            id="person"
                            placeholder="인원"
                            title="인원"
                            type="string"
                            variant="outlined"
                            value={personNum}
                            onChange={handlePersonNumChange}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">명</InputAdornment>,
                            }}
                        />
                        <CustomTextField
                            id="money"
                            placeholder="예산"
                            title="예산"
                            type="string"
                            variant="outlined"
                            value={money}
                            onChange={handleMoneyChange}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">원</InputAdornment>,
                            }}
                        />
                        <FormControl fullWidth>
                            {/* <InputLabel id="local">지역</InputLabel> */}
                            <AreaSelect
                                labelId="지역"
                                title="지역"
                                value={getArea ? area : ''}
                                onChange={(e) => {
                                    handleAreaChange(e);
                                }}
                                MenuProps={MenuProps}
                                fullWidth
                            >
                                {getArea &&
                                    getArea.map((area: string) => (
                                        <MenuItem key={area} value={area}>
                                            {area}
                                        </MenuItem>
                                    ))}
                            </AreaSelect>
                        </FormControl>
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
`;

const CustomTextField = styled(TextField)`
    background-color: white;
    border-radius: 5px;
    opacity: 0.8;
`;

const AreaSelect = styled(Select)`
    background-color: white;
    border-radius: 5px;
    opacity: 0.8;
`;

const SubmitBtn = styled(Button)`
    width: 97%;
    margin-top: 1rem;
    opacity: 0.9;
`;

export default MainPage;
