import { Avatar, Button, CardContent, Fade, Grid, ListItem, Typography } from '@mui/material';
import React, { forwardRef, ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import image from '../../components/assets/img/contemplative-reptile.jpeg';
import { recommendListState, selectConditions } from '../../store/atom';
import Spinner from '../../components/assets/spinner/Spinner.gif';
import SearchResultTable from './SearchResultTable';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface loadingStats {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults = forwardRef(({ loading, setLoading }: loadingStats, ref: React.ForwardedRef<HTMLDivElement>) => {
    const notifyError = (text: ReactElement | string) => {
        dismissAll();
        toast.error(text, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
        });
    };
    const notifySuccess = (text: ReactElement | string) => {
        dismissAll();
        toast.success(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

    const [result, setResult] = useRecoilState<any[]>(recommendListState);
    const selectCondition = useRecoilValue(selectConditions);
    // console.log(result);

    const [selectResult, setSelectResult] = useState<null | any>(null);
    const [selectEstimate, setSelectEstimate] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [bookmark, setBookmark] = useState([]);
    const [newSelectEstimate, setNewSelectEstimate] = useState<any[]>([]);

    useEffect(() => {
        setSelectResult(null);
        setSelectEstimate(null);
        setResult([]);
    }, [selectCondition]);

    useEffect(() => {
        setLoading(false);
    }, [result]);

    const onRecommendClick = (item: any[], id: number) => {
        setSelectResult(item);
        setResult(
            result.map((item) =>
                item.combinationName === id ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        setSelectEstimate(null);
    };

    const onEstimateClick = (item: any[], price: number, selectId: number) => {
        setSelectResult(
            selectResult.map((item: any, id: number) =>
                id === selectId ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        setSelectEstimate(item);
        setTotalPrice(price);
    };

    const addBookmark = (item: any) => {
        let bookmark: any = localStorage.getItem('bookmark');
        if (bookmark?.length) {
            let newBookmark: any = [...JSON.parse(bookmark), item];
            setBookmark(newBookmark);
            localStorage.setItem('bookmark', JSON.stringify(newBookmark));
        } else {
            setBookmark(item);
            localStorage.setItem('bookmark', JSON.stringify([item]));
        }
        notifySuccess('즐겨찾기 추가완료');
    };

    const handleDeleteBookmark = (deleteItem: any) => {
        let bookmark: any[] = JSON.parse(localStorage.getItem('bookmark') || '[]');
        if (bookmark?.length) {
            let newBookmark: any = bookmark.filter((item) => JSON.stringify(item) !== JSON.stringify(deleteItem));
            setBookmark(newBookmark);
            setNewSelectEstimate([]);
            localStorage.setItem('bookmark', JSON.stringify(newBookmark));
        }
        notifySuccess('즐겨찾기 삭제완료');
    };

    useEffect(() => {
        let bookmark = localStorage.getItem('bookmark');
        if (bookmark) {
            setBookmark(JSON.parse(bookmark));
        }
    }, []);

    useEffect(() => {
        let bookmark: Array<string> = JSON.parse(localStorage.getItem('bookmark') || '{}');
        if (Object.keys(bookmark).length > 0) {
            let newSelect = bookmark?.filter((item) => {
                if (JSON.stringify(item) === JSON.stringify(selectEstimate)) {
                    return [...selectEstimate];
                }
            });
            setNewSelectEstimate(newSelect);
        }
    }, [selectEstimate, bookmark]);

    return (
        <Card ref={ref}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingRight: '0.5rem',
                    borderBottom: '1px solid #eaeaea',
                }}
            >
                {/* <SearchResultsTypography>검색 결과({result.length})</SearchResultsTypography> */}
                <SearchResultsTypography>
                    검색 결과{result.length > 0 ? `(${result.length})` : null}
                </SearchResultsTypography>
                <Button>즐겨찾기 {bookmark.length}</Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <CustomDiv>
                    {result.length > 0 && loading === false ? (
                        result.map((item, i) => {
                            const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                            return (
                                <Fade in={true} timeout={200} key={i}>
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
                                            spacing={0.5}
                                            rowSpacing={0.2}
                                            justifyContent="center"
                                            sx={{ width: '40%' }}
                                        >
                                            {combinationName.length > 1 ? (
                                                combinationName.map((item: string, i: number) => {
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
                                                    fontSize: '1rem',
                                                    color: '#4A4A4A',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {combinationName.join(' + ')}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '1rem',
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
                        ? selectResult.map((item: any, i: number) => {
                              const { totalPrice, combinationName, fishRecommendBtDtos, serving, active } = item;
                              return (
                                  <Fade in={true} timeout={300} key={i}>
                                      <CustomListItems
                                          onClick={() => {
                                              onEstimateClick(fishRecommendBtDtos, totalPrice, i);
                                          }}
                                          sx={{
                                              backgroundColor: active ? '#F8F8F8' : 'white',
                                          }}
                                      >
                                          {fishRecommendBtDtos
                                              ? fishRecommendBtDtos.map(
                                                    (item: { fishName: string; serving: number }, i: number) => {
                                                        const { fishName, serving } = item;
                                                        return (
                                                            <CustomListItem key={i}>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '0.92rem',
                                                                        color: '#545454',
                                                                    }}
                                                                >
                                                                    {fishName}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '0.92rem',
                                                                        color: '#979797',
                                                                    }}
                                                                >
                                                                    ({serving}인분)
                                                                </Typography>
                                                            </CustomListItem>
                                                        );
                                                    },
                                                )
                                              : null}
                                          <Typography
                                              sx={{
                                                  fontSize: '1rem',
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
                    <Fade in={true} timeout={300}>
                        <SelectedEstimateContainer>
                            <SelectedEstimateTopMenu>
                                <div>
                                    <Typography
                                        sx={{
                                            color: '#010000',
                                            paddingTop: '18px',
                                            fontWeight: 'bold',
                                            fontSize: '1.14rem',
                                        }}
                                    >
                                        수산물 견적
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#949494',
                                            fontSize: '0.78rem',
                                            mb: '11px',
                                        }}
                                    >
                                        실제 시세과 상이할 수 있습니다.
                                    </Typography>
                                </div>
                                {newSelectEstimate?.length > 0 ? (
                                    <BookmarkAddedIcon
                                        fontSize="medium"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            handleDeleteBookmark(selectEstimate);
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorderIcon
                                        fontSize="medium"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            addBookmark(selectEstimate);
                                        }}
                                    />
                                )}
                            </SelectedEstimateTopMenu>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                            {/* <div style={{ position: 'relative', textAlign: 'center', top: '0%' }}>
                                <ExpandMoreIcon />
                            </div> */}
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
    width: 1190px;
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
    font-weight: bold;
`;

const CustomDiv = styled.div`
    border-bottom: 1px solid #f6f6f6;
    border-right: 1px solid #eaeaea;
    width: 20%;
    height: 497px;
    position: relative;
    overflow: overlay;
    overflow-x: hidden;
    border-bottom-left-radius: 5px;
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
        padding-bottom: 0;
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
    /* border-bottom: 1px solid #f6f6f6; */
    min-width: 11%;
    position: relative;
    overflow: overlay;
    max-height: 497px;
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
    height: auto;
    min-width: 300px;
    max-height: 494px;
    /* margin: auto; */
    overflow: overlay;
    padding: 0 20px;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
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
