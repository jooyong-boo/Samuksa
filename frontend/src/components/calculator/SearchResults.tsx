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

    const onEstimateClick = (item: any[], price: number, selectId: number, selectActive: boolean) => {
        setSelectResult(
            selectResult.map((item: any, id: number) =>
                id === selectId ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        if (selectActive) {
            setSelectEstimate(null);
            return;
        }
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
            <Container>
                <SearchResultsTypography>
                    검색 결과{result.length > 0 ? `(${result.length})` : null}
                </SearchResultsTypography>
                <Button>즐겨찾기 {bookmark.length}</Button>
            </Container>
            <ResultDiv>
                <CustomDiv>
                    {result.length > 0 && loading === false ? (
                        result.map((item, i) => {
                            const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                            let fontLength = combinationName.length;
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
                                        <CustomGrid container spacing={0.5} rowSpacing={0.2}>
                                            {combinationName.length > 1 ? (
                                                combinationName.map((item: string, i: number) => {
                                                    if (i > 3) return null;

                                                    return (
                                                        <Grid item xs={6} key={item}>
                                                            <CustomAvatar
                                                                alt={item}
                                                                src={image}
                                                                variant="rounded"
                                                                width={'30px'}
                                                                height={'30px'}
                                                            />
                                                        </Grid>
                                                    );
                                                })
                                            ) : (
                                                <CustomAvatar
                                                    alt={combinationName.join(' + ')}
                                                    src={image}
                                                    variant="rounded"
                                                    width={'50px'}
                                                    height={'50px'}
                                                    margin={'0'}
                                                />
                                            )}
                                        </CustomGrid>
                                        <SearchedCombinationsDiv>
                                            <SearchedCombinationsTypography
                                                color={'#4A4A4A'}
                                                fontWeight={'600'}
                                                fontSize={fontLength}
                                            >
                                                {combinationName.join(' + ')}
                                            </SearchedCombinationsTypography>
                                            <SearchedCombinationsTypography color={'#A5A5A5'}>
                                                ({combinationSize})
                                            </SearchedCombinationsTypography>
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
                                              onEstimateClick(fishRecommendBtDtos, totalPrice, i, active);
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
                                                                <CustomListItemTypography color={'#545454'}>
                                                                    {fishName}
                                                                </CustomListItemTypography>
                                                                <CustomListItemTypography color={'#979797'}>
                                                                    ({serving}인분)
                                                                </CustomListItemTypography>
                                                            </CustomListItem>
                                                        );
                                                    },
                                                )
                                              : null}
                                          <CustomListItemTypography
                                              fontWeight={'bold'}
                                              marginTop={'0.5rem'}
                                              fontSize={'1rem'}
                                          >
                                              {totalPrice.toLocaleString('ko-KR')}원
                                          </CustomListItemTypography>
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
                                <EstimateTopDiv>
                                    <EstimateTopText
                                        color={'#010000'}
                                        paddingTop={'18px'}
                                        fontWeight={'bold'}
                                        fontSize={'1.14rem'}
                                    >
                                        수산물 견적
                                    </EstimateTopText>
                                    <EstimateTopText color={'#949494'} fontSize={'0.78rem'} marginBottom={'11px'}>
                                        실제 시세과 상이할 수 있습니다.
                                    </EstimateTopText>
                                </EstimateTopDiv>
                                {newSelectEstimate?.length > 0 ? (
                                    <BookmarkAddedIcon
                                        fontSize="large"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            handleDeleteBookmark(selectEstimate);
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorderIcon
                                        fontSize="large"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            addBookmark(selectEstimate);
                                        }}
                                    />
                                )}
                            </SelectedEstimateTopMenu>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </SelectedEstimateContainer>
                    </Fade>
                ) : null}
            </ResultDiv>
        </Card>
    );
});

export default React.memo(SearchResults);

const Card = styled.div`
    background-color: white;
    /* width: 93%; */
    width: 1190px;
    height: 550px;
    min-width: 300px;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 7%;
    z-index: 3;
    @media all and (max-width: 1185px) {
        width: 95%;
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        flex-direction: column;
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 0.5rem;
    border-bottom: 1px solid #eaeaea;
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
    min-width: 200px;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
    @media all and (max-width: 350px) {
        width: 40%;
        /* flex-wrap: nowrap; */
    }
`;

const ResultDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    @media all and (max-width: 729px) {
        flex-wrap: wrap;
    }
`;

const CustomCardContent = styled(CardContent)`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #f6f6f6;
    width: 100%;
    height: 70px;
    &:last-child {
        padding-bottom: 0;
    }
    padding: 0 10px 0 10px;
    :hover {
        background-color: #f4f4f4;
    }
`;

const CustomGrid = styled(Grid)`
    justify-content: center;
    width: 40%;
`;

interface CustomAvatarProps {
    width: any;
    height: any;
    margin?: any;
}

const CustomAvatar = styled(Avatar)<CustomAvatarProps>`
    width: ${(props) => (props.width ? `${props.width}` : '1rem')};
    height: ${(props) => (props.height ? `${props.height}` : '1rem')};
    margin: ${(props) => (props.margin ? `${props.margin}` : 'auto')};
`;

const SearchedCombinationsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
`;

interface SearchedCombinationsTypographyProps {
    color: any;
    fontWeight?: any;
    fontSize?: any;
}

const SearchedCombinationsTypography = styled(Typography)<SearchedCombinationsTypographyProps>`
    max-width: 120px;
    color: ${(props) => (props.color ? `${props.color}` : 'white')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '400')};
    font-size: ${(props) =>
        props.fontSize > 2 ? `${(2 / props.fontSize + (0.55 - 0.9 / props.fontSize)).toFixed(2)}rem` : '0.9rem'};
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
    min-width: 100px;
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
    @media all and (max-width: 500px) {
        flex-grow: 1;
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

interface CustomListItemTypographyProps {
    color?: any;
    marginTop?: any;
    fontWeigth?: any;
    fontSize?: any;
}

const CustomListItemTypography = styled(Typography)<CustomListItemTypographyProps>`
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    margin-top: ${(props) => (props.marginTop ? `${props.marginTop}` : 'auto')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '400')};
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '0.9rem')};
`;

const SelectedEstimateContainer = styled.div`
    width: 68%;
    height: auto;
    /* min-width: 300px; */
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
    @media all and (max-width: 1120px) {
        width: 100%;
    }
    @media all and (max-width: 730px) {
        border-top: 1px solid #eaeaea;
    }
`;

const SelectedEstimateTopMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 0;
`;

const EstimateTopDiv = styled.div`
    padding: 0 1rem;
`;

interface EstimateTopTextProps {
    color: any;
    fontSize: any;
    paddingTop?: any;
    fontWeight?: any;
    marginBottom?: any;
}

const EstimateTopText = styled(Typography)<EstimateTopTextProps>`
    color: ${(props) => props.color && `${props.color}`};
    font-size: ${(props) => props.fontSize && `${props.fontSize}`};
    padding-top: ${(props) => props.paddingTop && `${props.paddingTop}`};
    font-weight: ${(props) => props.fontWeight && `${props.fontWeight}`};
    margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}`};
`;
