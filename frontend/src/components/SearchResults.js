import {
    Avatar,
    AvatarGroup,
    Button,
    CardContent,
    Fade,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
    Zoom,
} from '@mui/material';
import { height } from '@mui/system';
import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import { fishDataState, recommendListState, selectConditions } from '../store/atom';
import Spinner from '../spinner/Spinner.gif';
import SearchResultTable from './SearchResultTable';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const smoothAppear = keyframes`
    0% {
        opacity: 0;
        transform: none;
    }
    50% {
        opacity: 0.5;
        transform: translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: none;
    }
`;

const Card = styled.div`
    background-color: white;
    width: 1193px;
    height: 550px;
    min-width: 500px;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 7%;
    z-index: 3;
`;

const CustomDiv = styled.div`
    border-bottom: 1px solid #f6f6f6;
    border-right: 1px solid #eaeaea;
    width: 20%;
    height: 494px;
    position: relative;
    overflow: overlay;
    overflow-x: hidden;
    border-radius: 5px;
    min-width: 20%;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
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
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #f6f6f6;
    min-width: 11%;
    position: relative;
    overflow: overlay;
    max-height: 494px;
    padding: 0;
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

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    margin: 'auto',
    // padding: '9px 13px',
});

const SearchResults = forwardRef(({ loading, setLoading }, ref) => {
    const [result, setResult] = useRecoilState(recommendListState);
    const selectCondition = useRecoilValue(selectConditions);
    // console.log(result);

    const [selectResult, setSelectResult] = useState();
    const [selectEstimate, setSelectEstimate] = useState();
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        setSelectResult();
        setSelectEstimate();
        setResult([]);
    }, [selectCondition]);

    useEffect(() => {
        setLoading(false);
    }, [result]);

    const onRecommendClick = (item, id) => {
        setSelectResult(item);
        setResult(
            result.map((item) =>
                item.combinationName === id ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        setSelectEstimate();
    };

    const onEstimateClick = (item, price, selectId) => {
        setSelectResult(
            selectResult.map((item, id) =>
                id === selectId ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        setSelectEstimate(item);
        setTotalPrice(price);
    };

    const addBookmark = (item) => {
        localStorage.setItem('bookmark', JSON.stringify(selectEstimate));
    };

    console.log(selectEstimate);

    // console.log(localStorage.length);

    return (
        <Card ref={ref}>
            <Typography
                sx={{
                    color: '#575757',
                    padding: '18px 0px 13px 19px',
                    borderBottom: '1px solid #EAEAEA',
                    fontWeight: 'bold',
                }}
            >
                검색 결과({result.length > 0 ? result.length : null})
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomDiv>
                    {result.length > 0 && loading === false ? (
                        result.map((item, i) => {
                            const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                            return (
                                <Fade in={true} timeout={i * 100} key={i}>
                                    <CardContent
                                        onClick={() => {
                                            onRecommendClick(fishRecommendCombinations, combinationName);
                                        }}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: active ? '#F8F8F8' : 'white',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #F6F6F6',
                                            height: '70px',
                                            '&:last-child': { pb: 1 },
                                            padding: '0 10px 0 10px',
                                            ':hover': {
                                                backgroundColor: '#F4F4F4',
                                            },
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={0}
                                            rowSpacing={0}
                                            justifyContent="center"
                                            sx={{ width: '40%' }}
                                        >
                                            {combinationName.length > 1 ? (
                                                combinationName.map((item, i) => {
                                                    if (i > 3) return null;

                                                    return (
                                                        <Grid item xs={6} key={item}>
                                                            <Avatar
                                                                alt={item}
                                                                src={image}
                                                                variant="rounded"
                                                                sx={{
                                                                    height: '30px',
                                                                    width: '30px',
                                                                }}
                                                            />
                                                        </Grid>
                                                    );
                                                })
                                            ) : (
                                                <Avatar
                                                    alt={combinationName.join(' + ')}
                                                    src={image}
                                                    variant="rounded"
                                                    sx={{
                                                        height: '50px',
                                                        width: '50px',
                                                        margin: '0px',
                                                    }}
                                                />
                                            )}
                                        </Grid>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: '100%',
                                                paddingLeft: '10px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: '#4A4A4A',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {combinationName.join(' + ')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                    color: '#A5A5A5',
                                                }}
                                                color="text.secondary"
                                            >
                                                ({combinationSize})
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Fade>
                            );
                        })
                    ) : loading === true ? (
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <img src={Spinner} alt="로딩중" width="30%" />
                        </div>
                    ) : null}
                </CustomDiv>
                <CustomList>
                    {selectResult
                        ? selectResult.map((item, i) => {
                              const { totalPrice, combinationName, fishRecommendBtDtos, serving, active } = item;
                              {
                                  /* console.log(item) */
                              }
                              return (
                                  <Fade in={true} timeout={i * 300} key={i}>
                                      <ListItem
                                          onClick={() => {
                                              onEstimateClick(fishRecommendBtDtos, totalPrice, i);
                                          }}
                                          sx={{
                                              paddingLeft: 0,
                                              backgroundColor: active ? '#F8F8F8' : 'white',
                                              cursor: 'pointer',
                                              borderBottom: '1px solid #F6F6F6',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              ':hover': {
                                                  backgroundColor: '#F4F4F4',
                                              },
                                          }}
                                      >
                                          {fishRecommendBtDtos
                                              ? fishRecommendBtDtos.map((item, i) => {
                                                    const { fishName, serving } = item;
                                                    return (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent: 'space-around',
                                                                flexWrap: 'wrap',
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '13px',
                                                                    color: '#545454',
                                                                }}
                                                            >
                                                                {fishName}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '13px',
                                                                    color: '#979797',
                                                                }}
                                                            >
                                                                ({serving}
                                                                인분)
                                                            </Typography>
                                                        </div>
                                                    );
                                                })
                                              : null}
                                          <Typography
                                              sx={{
                                                  fontSize: '15px',
                                                  mt: 1,
                                                  fontWeight: 'bold',
                                              }}
                                          >
                                              {totalPrice.toLocaleString('ko-KR')}원
                                          </Typography>
                                      </ListItem>
                                  </Fade>
                              );
                          })
                        : null}
                </CustomList>
                {selectEstimate ? (
                    <Fade in={true}>
                        <div
                            style={{
                                width: '69%',
                                height: '100%',
                                minWidth: '300px',
                            }}
                        >
                            <div
                                style={{
                                    width: '95%',
                                    margin: 'auto',
                                    height: '80px',
                                    overflow: 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#010000',
                                            paddingTop: '18px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                        }}
                                    >
                                        수산물 견적
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#949494',
                                            fontSize: '11px',
                                            mb: '11px',
                                        }}
                                    >
                                        실제 시세과 상이할 수 있습니다.
                                    </Typography>
                                </div>
                                <div style={{ verticalAlign: 'middle' }}>
                                    <BookmarkBorderIcon
                                        fontSize="large"
                                        onClick={addBookmark(selectEstimate)}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                    <BookmarkAddedIcon fontSize="medium" />
                                </div>
                            </div>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </div>
                    </Fade>
                ) : null}
            </div>
        </Card>
    );
});

export default React.memo(SearchResults);

// if (i > 3)
// return (
//     <Typography
//         key={item}
//         sx={{
//             fontSize: '5px',
//         }}
//     >
//         외 {combinationName.length - i}개
//     </Typography>
// ); // 이미지 5개 이상 안나오게
