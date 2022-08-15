import { Avatar, CardContent, Fade, Grid, ListItem, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import image from '../../components/assets/img/contemplative-reptile.jpeg';
import { fishDataState, recommendListState, selectConditions } from '../../store/atom';
import Spinner from '../../components/assets/spinner/Spinner.gif';
import SearchResultTable from './SearchResultTable';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

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
        let localStorageBookmark = JSON.parse(localStorage.getItem('bookmark'));
        let newBookmark = { ...localStorageBookmark, item };
        localStorage.setItem('bookmark', JSON.stringify(newBookmark));
    };

    // console.log(localStorage.length);

    return (
        <Card ref={ref}>
            <SearchResultsTypography>검색 결과({result.length})</SearchResultsTypography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomDiv>
                    {result.length > 0 && loading === false ? (
                        result.map((item, i) => {
                            const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                            return (
                                <Fade in={true} timeout={i * 50} key={i}>
                                    <CustomCardContent
                                        onClick={() => {
                                            onRecommendClick(fishRecommendCombinations, combinationName);
                                        }}
                                        sx={{
                                            backgroundColor: active ? '#F8F8F8' : 'white',
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
                                        <SearchedCombinationsDiv>
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
                                        </SearchedCombinationsDiv>
                                    </CustomCardContent>
                                </Fade>
                            );
                        })
                    ) : loading === true ? (
                        <LoadingSpinner>
                            <img src={Spinner} alt="로딩중" width="30%" />
                        </LoadingSpinner>
                    ) : null}
                </CustomDiv>
                <CustomListDiv>
                    {selectResult
                        ? selectResult.map((item, i) => {
                              const { totalPrice, combinationName, fishRecommendBtDtos, serving, active } = item;
                              {
                                  /* console.log(item) */
                              }
                              return (
                                  <Fade in={true} timeout={i * 300} key={i}>
                                      <CustomListItems
                                          onClick={() => {
                                              onEstimateClick(fishRecommendBtDtos, totalPrice, i);
                                          }}
                                          sx={{
                                              backgroundColor: active ? '#F8F8F8' : 'white',
                                          }}
                                      >
                                          {fishRecommendBtDtos
                                              ? fishRecommendBtDtos.map((item, i) => {
                                                    const { fishName, serving } = item;
                                                    return (
                                                        <CustomListItem key={i}>
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
                                                                ({serving}인분)
                                                            </Typography>
                                                        </CustomListItem>
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
                                      </CustomListItems>
                                  </Fade>
                              );
                          })
                        : null}
                </CustomListDiv>
                {selectEstimate ? (
                    <Fade in={true}>
                        <SelectedEstimateContainer>
                            <SelectedEstimateTopMenu>
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
                                {localStorage.getItem('bookmark') ? (
                                    <BookmarkAddedIcon fontSize="medium" />
                                ) : (
                                    <BookmarkBorderIcon
                                        fontSize="large"
                                        onClick={addBookmark(selectEstimate)}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                )}
                            </SelectedEstimateTopMenu>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </SelectedEstimateContainer>
                    </Fade>
                ) : null}
            </div>
        </Card>
    );
});

export default React.memo(SearchResults);

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

const SearchResultsTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    border-bottom: 1px solid #eaeaea;
    font-weight: bold;
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

const CustomCardContent = styled(CardContent)`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;
    height: 70px;
    &:last-child {
        padding-bottom: 1;
    }
    padding: 0 10px 0 10px;
    :hover {
        background-color: #f4f4f4;
    }
`;

const SearchedCombinationsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
`;

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CustomListDiv = styled.div`
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

const CustomListItems = styled(ListItem)`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;
    :hover {
        background-color: #f4f4f4;
    }
`;

const CustomListItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const SelectedEstimateContainer = styled.div`
    width: 69%;
    min-width: 300px;
    max-height: 490px;
    /* margin: auto; */
    overflow: auto;
    padding: 0 20px;
`;

const SelectedEstimateTopMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 0;
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
