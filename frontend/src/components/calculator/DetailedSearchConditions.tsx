import {
    Avatar,
    Checkbox,
    Grow,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Slider,
    Typography,
} from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
    farmState,
    fishDetailRecommendInfo,
    personNumState,
    selectConditions,
    selectFishState,
} from '../../store/atom';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { notifyError } from 'utils/notify';
import { Button } from 'components/common';

const DetailedSearchConditions = ({ ...props }) => {
    const { totalAmount, setTotalAmount, amount, setAmount } = props;
    const [selectCondition, setSelectCondition] = useRecoilState(selectConditions);
    const [selectFish, setSelectFish] = useRecoilState(selectFishState);
    const resetSelectFish = useResetRecoilState(selectFishState);
    const fishList = useRecoilValue(fishDetailRecommendInfo);
    const personNum = useRecoilValue(personNumState);
    const [fish, setFish] = useState<any[]>(fishList);
    const [farm, setFarm] = useRecoilState<any[]>(farmState);
    const [farmStatus, setFarmStatus] = useState<string[]>([]);

    useMemo(() => {
        setFish(fishList);
    }, [fishList]);

    useEffect(() => {
        setTotalAmount(Number(personNum));
    }, [personNum]);

    useEffect(() => {
        resetSelectFish();
        setFish(fish.map((fish) => (fish ? { ...fish, active: false } : { ...fish })));
        if (totalAmount > 0 && totalAmount - amount >= 0) {
            setTotalAmount(totalAmount - amount);
            setAmount(0);
        }
    }, [selectCondition]);

    useEffect(() => {
        if (selectFish.length) {
            setFarm(selectFish[0].farmTypes);
        }
    }, [selectFish]);

    useEffect(() => {
        setSelectFish(fish.filter((fish) => fish.active === true));
    }, [fish]);

    const onToggle = (id: number) => {
        setFarmStatus([]);
        setAmount(0);
        setFish(
            fish.map((fish) =>
                fish.fishInfoId === id ? { ...fish, active: !fish.active } : { ...fish, active: false },
            ),
        );
    };

    const changeAmount = (_: Event, newValue: number | number[]) => {
        setAmount(newValue as number);
    };

    const changeHandler = (checked: boolean, id: string) => {
        if (checked) {
            setFarmStatus([...farmStatus, id]);
        } else {
            // 체크 해제
            setFarmStatus(farmStatus.filter((el) => el !== id));
        }
    };

    const addCondition = () => {
        if (selectFish.length === 0) {
            return notifyError('어종을 선택해주세요');
        } else if (amount === 0 && totalAmount > 0) {
            return notifyError('분량을 선택해주세요');
        } else if (amount === 0 && selectCondition.length > 0) {
            return notifyError('분량 부족');
        } else if (farmStatus.length === 0) {
            return notifyError('양식 여부를 체크해주세요');
        } else {
            selectCondition.some((item) => item.id === selectFish[0].fishInfoId)
                ? notifyError('선택한 어종이 이미 있습니다.')
                : setSelectCondition([
                      ...selectCondition,
                      {
                          id: selectFish[0].fishInfoId,
                          selectFish: selectFish[0].fishName,
                          amount,
                          farmStatus,
                          imgUrl: selectFish[0].imgUrl,
                      },
                  ]);
        }
        resetSelectFish();
        setFarmStatus([]);
        setFarm([]);
    };

    return (
        <Card>
            <CustomTypography>상세 검색 조건</CustomTypography>
            <Container>
                <CustomFishListDiv>
                    <CustomFishListPaper>
                        {fish.length > 0 ? (
                            <CustomList>
                                {fish.map((item, i) => {
                                    const { fishName, fishYield, fishInfoId, active, imgUrl } = item;
                                    return (
                                        <Grow in={true} timeout={i * 200} key={fishInfoId}>
                                            <ListItemDiv
                                                onClick={() => {
                                                    onToggle(fishInfoId);
                                                }}
                                                active={active}
                                            >
                                                <ListItemAvaterStyled>
                                                    <AvaterStyled alt={fishName} src={imgUrl} />
                                                </ListItemAvaterStyled>
                                                <ListItemStyled>
                                                    <ListItemText
                                                        primary={fishName}
                                                        secondary={`(수율: ${fishYield}%)`}
                                                    />
                                                </ListItemStyled>
                                            </ListItemDiv>
                                        </Grow>
                                    );
                                })}
                            </CustomList>
                        ) : (
                            <CustomSearchConditionSelectInfo>검색 조건을 선택해주세요</CustomSearchConditionSelectInfo>
                        )}
                    </CustomFishListPaper>
                </CustomFishListDiv>
                <CustomConditionSettingDiv>
                    <SelectVolumeDiv>
                        <SelectVolumeTypograhy>분량</SelectVolumeTypograhy>
                        {selectFish.length > 0 ? (
                            <Slider
                                aria-labelledby="range-slider"
                                value={amount}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={totalAmount}
                                onChange={changeAmount}
                            />
                        ) : (
                            <Slider disabled value={0} />
                        )}
                        <SelectVolumeTypograhy>{amount}인</SelectVolumeTypograhy>
                    </SelectVolumeDiv>
                    <CustomSelectFarmTypeDiv>
                        <Typography variant="subtitle1">양식 여부</Typography>
                        {farm.length > 0 && selectFish.length > 0 ? (
                            <CustomSelectFarmTypography color={'#737373'}>
                                중복 선택이 가능합니다.
                            </CustomSelectFarmTypography>
                        ) : (
                            <CustomSelectFarmTypography color={'#AEAEAE'}>
                                어종 선택이 필요합니다.
                            </CustomSelectFarmTypography>
                        )}
                        {farm.length > 0 &&
                            selectFish.length > 0 &&
                            farm.map((item, i) => (
                                <SelectFarmTypeTypography
                                    key={i}
                                    onClick={() => {
                                        changeHandler(farmStatus.includes(`${item}`) ? false : true, `${item}`);
                                    }}
                                >
                                    <FarmTypeCheckBox
                                        id={item}
                                        onChange={(e) => {
                                            changeHandler(e.currentTarget.checked, `${item}`);
                                        }}
                                        checked={farmStatus.includes(`${item}`) ? true : false}
                                    />
                                    {item}
                                </SelectFarmTypeTypography>
                            ))}
                    </CustomSelectFarmTypeDiv>
                    <CustomConditionAddDiv>
                        {selectFish && amount && farmStatus.length > 0 ? (
                            <CustomConditionAddBtn variant="contained" type="submit" onClick={addCondition}>
                                조건 추가하기
                            </CustomConditionAddBtn>
                        ) : (
                            <CustomConditionAddBtn
                                variant="contained"
                                type="submit"
                                disabled={true}
                                onClick={addCondition}
                            >
                                {totalAmount > 0 ? `조건을 선택해주세요` : `선택할 분량이 없어요`}
                            </CustomConditionAddBtn>
                        )}
                    </CustomConditionAddDiv>
                </CustomConditionSettingDiv>
            </Container>
        </Card>
    );
};

export default DetailedSearchConditions;

const Card = styled.div`
    background-color: white;
    width: 570px;
    height: 464px;
    border-radius: 5px;
    margin: 1rem;
`;

const CustomTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    font-weight: bold;
`;

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const CustomFishListDiv = styled.div`
    width: 45%;
    height: 100%;
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
    max-height: 410px;
`;

const CustomFishListPaper = styled(Paper)`
    margin: auto;
    max-width: 1200;
    max-height: 700;
    flex-grow: 1;
    padding: 0;
    box-shadow: none;
`;

interface ListItemStyledProps {
    active?: boolean;
}

const ListItemDiv = styled.div<ListItemStyledProps>`
    display: flex;
    background-color: ${(props) => (props.active ? '#F8F8F8' : 'white')};
    height: 100%;
    border-bottom: 1px solid #f6f6f6;
    cursor: pointer;
    &:hover {
        background-color: #f4f4f4;
    }
`;

const ListItemAvaterStyled = styled(ListItemAvatar)`
    padding: 9px 13px 9px 16px;
`;

const AvaterStyled = styled(Avatar)`
    height: 50px;
    width: 50px;
    border-radius: 3px;
`;

const ListItemStyled = styled(ListItem)`
    padding-left: 0;
    &:hover {
        background-color: #f4f4f4;
    }
`;

const CustomList = styled(List)`
    width: 100%;
    background-color: 'background.paper';
    position: relative;
    overflow: auto;
    max-height: 410px;
    border-radius: 5px;
    padding: 0;
    box-shadow: none;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
`;

const CustomSearchConditionSelectInfo = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 375px;
    color: #aeaeae;
    font-weight: bold;
    font-size: 14px;
`;

const CustomConditionSettingDiv = styled.div`
    width: 55%;
    max-height: 420px;
`;

const SelectVolumeDiv = styled.div`
    width: 70%;
    height: 80px;
    margin: auto;
    margin-top: 28px;
`;

const SelectVolumeTypograhy = styled(Typography)`
    text-align: center;
`;

const CustomSelectFarmTypeDiv = styled.div`
    width: 90%;
    height: 225px;
    margin: auto;
    margin-top: 28px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    padding-top: 24px;
`;

interface CustomSelectFarmTypographyProps {
    color: any;
}

const CustomSelectFarmTypography = styled(Typography)<CustomSelectFarmTypographyProps>`
    font-size: 0.9rem;
    margin-top: 3px;
    font-weight: medium;
    color: ${(props) => (props.color ? `${props.color}` : 'white')};
`;

const SelectFarmTypeTypography = styled(Typography)`
    font-size: 0.9rem;
    width: 90px;
    border-radius: 5px;
    &:hover {
        background-color: rgba(99, 99, 99, 0.1);
        cursor: pointer;
    }
`;

const FarmTypeCheckBox = styled(Checkbox)`
    color: #e1e1e1;
`;

const CustomConditionAddDiv = styled.div`
    width: 100%;
    display: flex;
`;

const CustomConditionAddBtn = styled(Button)`
    width: 92%;
    height: 38px;
    font-weight: 900;
    margin: auto;
`;
