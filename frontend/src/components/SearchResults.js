import { Avatar, CardContent, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import { fishDataState, recommendListState } from '../store/atom';
import SearchResultTable from './SearchResultTable';

const Card = styled.div`
    background-color: white;
    width: 1193px;
    height: 550px;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 3%;
`

const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #ebecee;
`;

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
        const result = useRecoilValue(recommendListState);
        console.log(result);

        const [selectResult, setSelectResult] = useState();
        const [selectEstimate, setSelectEstimate] = useState();
        const [totalPrice, setTotalPrice] = useState();

        const onRecommendClick = (item) => {
            setSelectResult(item);
        }
        console.log(selectResult);

        const onEstimateClick = (item, price) => {
            setSelectEstimate(item);
            setTotalPrice(price)
        };
        console.log(selectEstimate)
    return (
        <>  
            <Card>
                <Typography sx={{ color: '#575757', padding: '18px 0px 13px 19px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 결과</Typography>
                <div style={{ display: 'flex' }}>
                    <div style={{ borderBottom: '1px solid #F6F6F6', borderRight: '1px solid #EAEAEA' , width: '20%', height: 495, position: 'relative', overflow: 'auto'}}>
                        {result? result.map((item, i) => {
                            const { combinationName, combinationSize, fishRecommendCombinations } = item;
                            return (
                                <CardContent key={i} onClick={() => {onRecommendClick(fishRecommendCombinations)}} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #F6F6F6', height: '70px', '&:last-child': { pb: 0 }, padding: '0 10px 0 10px', ':hover': {backgroundColor: '#F4F4F4'}}}>
                                    {/* <Img alt="complex" src={image} /> */}
                                    <Avatar
                                        alt={combinationName}
                                        src={image}
                                        variant= 'square'
                                        style={{ height: '50px', width: '50px', borderRadius: '3px', margin: '0px' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%', paddingLeft: '10px' }}>
                                        <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                            {combinationName}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, color: '#A5A5A5' }} color="text.secondary">
                                            ({fishRecommendCombinations.length})
                                        </Typography>
                                    </div>
                                </CardContent>
                            )
                        }) : null}
                    </div>
                    <div style={{ width: '12%', height: '100%' , borderRight: '1px solid #EAEAEA' }}>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1200,
                                maxHeight: 800,
                                flexGrow: 1,
                                backgroundColor: '#F8F8F8',
                                padding: 0,
                                boxShadow: 'none',
                                borderBottom: '1px solid #EAEAEA'
                            }}
                        >
                            <List
                                sx={{
                                    width: '100%',
                                    height: 500,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'scroll',
                                    maxHeight: 495,
                                    padding: 0,
                                    overflowX: 'hidden',
                                    // borderBottom: '1px solid black'
                                    // border: 0,
                                }}
                                subheader={<li />}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' ,backgroundColor: 'white', height: '100%', borderBottom: '1px solid #F6F6F6' }}>
                                        {selectResult? (selectResult).map((item, i) => {
                                            const { totalPrice, combinationName, fishRecommendInfos } = item;
                                            return (
                                                <React.Fragment key={i}>
                                                    <ListItem onClick={() => {onEstimateClick(fishRecommendInfos, totalPrice)}} sx={{ paddingLeft: 0, borderBottom: '1px solid #F6F6F6', display: 'flex', flexDirection: 'column', ':hover': {backgroundColor: '#F4F4F4'} }}>
                                                        <div style={{  width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                                            <Typography sx={{ fontSize: '13px', color: '#545454' }}>{combinationName}</Typography>
                                                            <Typography sx={{ fontSize: '13px', color: '#979797' }}>(2인분)</Typography>
                                                        </div>
                                                            <Typography sx={{ fontSize: '15px', mt:1, fontWeight: 'bold' }}>{totalPrice.toLocaleString('ko-KR')}원</Typography>
                                                    </ListItem>
                                                </React.Fragment>
                                            )
                                        }): null}
                                    </div>
                                </List>
                            </Paper>
                    </div>
                    <div style={{ width: '70%', height: '100%'}}>
                        <div style={{ width: '95%', margin: 'auto', height: '490px', overflow: 'auto' }}>
                            <Typography sx={{ color: '#010000', paddingTop: '18px', fontWeight: 'bold', fontSize: '16px'}}>수산물 견적</Typography>
                            <Typography variant='body2' sx={{ color: '#949494', fontSize: '11px', mb: '11px' }}>실제 시세과 상이할 수 있습니다.</Typography>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default SearchResults;