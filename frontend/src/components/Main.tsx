import styled from '@emotion/styled';
import image from '../components/assets/img/mainImage.jpg';
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Introduction from './Introduction';
import React from 'react';

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

const Main = () => {
    const notify = (text: string) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const dismissAll = () => toast.dismiss();

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
            // alert('인원은 1 이상으로 해주세요');
            dismissAll();
            notify('인원수는 35명 이하로 해주세요');
            setPersonNum(String(35));
        }
    };

    const handleAreaChange = (e: SelectChangeEvent) => {
        setArea(e.target.value as string);
    };

    const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const onlyNumberMoney = value.replace(/[^0-9]/g, '');
        setMoney(onlyNumberMoney);
        if (Number(value) > 10000000) {
            dismissAll();
            notify('가격은 천만원 이하로 해주세요');
            setMoney(String(10000000));
        }
    };

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        if (Number(personNum) <= 0) {
            e.preventDefault();
            // alert('인원은 1 이상으로 해주세요');
            dismissAll();
            notify('인원을 입력해주세요');
            // setPersonNum(1);
            return;
        } else if (Number(money) < 50000) {
            e.preventDefault();
            // alert('가격은 50000이상으로 해주세요');
            dismissAll();
            notify('가격을 50000이상으로 해주세요');
            setMoney(String(50000));
            return;
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // getAreaTotalFishData({ area }).then(res => res ? (setFishList(res), setSelect(false)) : notify('해당 가격으론 찾을 수 있는 조합이 없어요!'));
        getAreaTotalFishData({ area }).then((res) =>
            res
                ? (setFishList(res.map((item: {}) => (item ? { ...item, active: false } : { ...item }))),
                  setSelect(false))
                : notify('해당 가격으론 찾을 수 있는 조합이 없어요!'),
        );
        navigate('/calculator');
    };

    return (
        <>
            <Background>
                <Container>
                    <MainTitle>모두가 편히</MainTitle>
                    <MainTitle marginLeft={'1rem'}>떠먹는 그날까지,</MainTitle>
                    <MainTitle color={'#0098ee'} marginLeft={'1rem'}>
                        사먹사
                    </MainTitle>
                </Container>
                <MainTitle marginBottom={'2rem'} fontSize={'1.78rem'} fontWeight={'600'}>
                    고민하지말고 편하게 추천 받아보세요.
                </MainTitle>
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
                            autoFocus
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
                                onChange={handleAreaChange}
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

export default Main;

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

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;

interface MainTitleProps {
    fontSize?: any;
    fontWeight?: any;
    color?: any;
    marginLeft?: any;
    marginBottom?: any;
}

const MainTitle = styled(Typography)<MainTitleProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '3.85rem')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '900')};
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    color: ${(props) => (props.color ? `${props.color}` : 'white')};
    margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}` : '0')};
    margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}` : '0')};
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
    margin-top: 1rem;
    opacity: 0.9;
    background-color: #0098ee;
    color: white;
    box-shadow: none;
    width: 96%;
`;
