import { Avatar, CardContent, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import { fishDataState, recommendListState } from '../store/atom';
import SearchResultTable from './SearchResultTable';

const Card = styled.div`
    background-color: white;
    width: 1193px;
    height: 550px;
    min-width: 500px;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 3%;
`;

const CustomDiv = styled.div`
    border-bottom: 1px solid #F6F6F6;
    border-right: 1px solid #EAEAEA;
    width: 20%;
    height: 494px;
    position: relative;
    overflow: overlay;
    overflow-x: hidden;
    min-width: 20%;
    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`;

const CustomList = styled.div`
    width: 11%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    flex-wrap: wrap;
    background-color: white;
    border-right: 1px solid #EAEAEA;
    border-bottom: 1px solid #F6F6F6;
    min-width: 11%;
    position: relative;
    overflow: overlay;
    max-height: 494px;
    padding: 0;
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
{/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', paddingLeft: '10px' }}> */}

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    margin: 'auto',
    // padding: '9px 13px',
  });

const SearchResults = () => {

    const [result, setResult] = useRecoilState(recommendListState);
    // console.log(result);

    const [selectResult, setSelectResult] = useState();
    const [selectEstimate, setSelectEstimate] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const onRecommendClick = (item, id) => {
        setSelectResult(item);
        setResult(result.map((item) =>
            item.combinationName === id ? {...item, active: !item.active} : { ...item, active: false }))
    }

    const onEstimateClick = (item, price, selectId) => {
        setSelectResult(selectResult.map((item, id) =>
            id === selectId ? {...item, active: !item.active} : { ...item, active: false }))
        setSelectEstimate(item);
        setTotalPrice(price)
    };

    return (
        <Card>
            <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 결과</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomDiv>
                    {result? result.map((item, i) => {
                        const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                        return (
                            <CardContent key={i} onClick={() => {onRecommendClick(fishRecommendCombinations, combinationName)}} sx={{ display: 'flex', alignItems: 'center', backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer', borderBottom: '1px solid #F6F6F6', height: '70px', '&:last-child': { pb: 0 }, padding: '0 10px 0 10px', ':hover': {backgroundColor: '#F4F4F4'}}}>
                                {/* <Img alt="complex" src={image} /> */}
                                <Avatar
                                    alt={combinationName.join(" + ")}
                                    src={image}
                                    variant= 'square'
                                    style={{ height: '50px', width: '50px', borderRadius: '3px', margin: '0px' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', paddingLeft: '10px' }}>
                                    <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                        {combinationName.join(" + ")}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, color: '#A5A5A5' }} color="text.secondary">
                                        ({fishRecommendCombinations.length})
                                    </Typography>
                                </div>
                            </CardContent>
                        )
                    }) : null}
                </CustomDiv>
                <CustomList>
                {selectResult? selectResult.map((item, i) => {
                    const { totalPrice, combinationName, fishRecommendBtDtos, serving, active } = item;
                    {/* console.log(item) */}
                    return (
                        <React.Fragment key={i}>
                            <ListItem onClick={() => {onEstimateClick(fishRecommendBtDtos, totalPrice, i)}} sx={{ paddingLeft: 0, backgroundColor: active? '#F8F8F8' : 'white', cursor: 'pointer', borderBottom: '1px solid #F6F6F6', display: 'flex', flexDirection: 'column', ':hover': {backgroundColor: '#F4F4F4'} }}>
                            {fishRecommendBtDtos? fishRecommendBtDtos.map((item, i) => {
                                const { fishName, serving } = item;
                                return (
                                    <div key={i} style={{  width: '100%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                        <Typography sx={{ fontSize: '13px', color: '#545454' }}>{fishName}</Typography>
                                        <Typography sx={{ fontSize: '13px', color: '#979797' }}>({serving}인분)</Typography>
                                    </div>
                                ) 
                            }) : null}
                                    <Typography sx={{ fontSize: '15px', mt:1, fontWeight: 'bold' }}>{totalPrice.toLocaleString('ko-KR')}원</Typography>
                            </ListItem>
                        </React.Fragment>
                    )
                }): null}
                </CustomList> 
                {selectEstimate ?
                    <div style={{ width: '69%', height: '100%',  minWidth: '300px' }}>
                        <div style={{ width: '95%', margin: 'auto', height: '490px', overflow: 'auto' }}>
                            <Typography sx={{ color: '#010000', paddingTop: '18px', fontWeight: 'bold', fontSize: '16px'}}>수산물 견적</Typography>
                            <Typography variant='body2' sx={{ color: '#949494', fontSize: '11px', mb: '11px' }}>실제 시세과 상이할 수 있습니다.</Typography>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </div>
                    </div>
                    : null
                }
            </div>
        </Card>
    );
};

export default React.memo(SearchResults);


