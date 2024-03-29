import { Avatar, CardContent, Fade, Grid, ListItem, Typography } from '@mui/material';
import React, { forwardRef, useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeContext } from 'styled-components';
import image from '../../assets/img/contemplative-reptile.webp';
import { areaState, recommendListState, selectConditions } from '../../store/atom';
import Spinner from '../../assets/spinner/Spinner.gif';
import SearchResultTable from './SearchResultTable';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { NavLink } from 'react-router-dom';
import { notifySuccess } from 'utils/notify';
import { Button } from 'components/common';

interface loadingStats {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults = forwardRef(({ loading, setLoading }: loadingStats, ref: React.ForwardedRef<HTMLDivElement>) => {
    const theme = useContext(ThemeContext);

    const [result, setResult] = useRecoilState<any[]>(recommendListState);
    const selectCondition = useRecoilValue(selectConditions);
    const [selectResult, setSelectResult] = useState<null | any>(null);
    const [selectEstimate, setSelectEstimate] = useState<any>(null);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [bookmark, setBookmark] = useState([]);
    const [newSelectEstimate, setNewSelectEstimate] = useState<any[]>([]);
    const area = useRecoilValue(areaState);

    useEffect(() => {
        setSelectResult(null);
        setSelectEstimate(null);
        setResult([]);
    }, [selectCondition]);

    useEffect(() => {
        if (loading) {
            setSelectResult(null);
            setSelectEstimate(null);
        }
    }, [loading]);

    const onRecommendClick = (item: any[], id: number, active: boolean) => {
        setSelectResult(item);
        setResult(
            result.map((item) =>
                item.combinationName === id ? { ...item, active: !item.active } : { ...item, active: false },
            ),
        );
        if (active) {
            setSelectResult(null);
            setSelectEstimate(null);
            return;
        }
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
                <BookmarkLink to={'/bookmark'}>
                    <Button onClick={() => {}}>즐겨찾기 {bookmark.length}</Button>
                </BookmarkLink>
            </Container>
            <ResultDiv>
                <CustomDiv>
                    {result.length > 0 && loading === false
                        ? result.map((item, i) => {
                              const { combinationName, combinationSize, fishRecommendCombinations, active } = item;
                              let fontLength = combinationName.length;
                              return (
                                  <Fade in={true} timeout={200} key={i}>
                                      <CustomCardContent
                                          onClick={() => {
                                              onRecommendClick(fishRecommendCombinations, combinationName, active);
                                          }}
                                          active={active ? 'true' : ''}
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
                                                                  width={'2.14rem'}
                                                                  height={'2.14rem'}
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
                        : loading === true && (
                              <LoadingSpinner>
                                  <img src={Spinner} alt="로딩중" width="30%" />
                              </LoadingSpinner>
                          )}
                </CustomDiv>
                <CustomListDiv>
                    {selectResult?.map((item: any, i: number) => {
                        const { totalPrice, fishRecommendBtDtos, active } = item;
                        return (
                            <Fade in={true} timeout={300} key={i}>
                                <CustomListItems
                                    onClick={() => {
                                        onEstimateClick(fishRecommendBtDtos, totalPrice, i, active);
                                    }}
                                    active={active ? 'true' : ''}
                                >
                                    {fishRecommendBtDtos &&
                                        fishRecommendBtDtos.map(
                                            (item: { fishName: string; serving: number }, i: number) => {
                                                const { fishName, serving } = item;
                                                return (
                                                    <CustomListItem key={i}>
                                                        <CustomListItemTypography color={theme.colors.grayTwo}>
                                                            {fishName}
                                                        </CustomListItemTypography>
                                                        <CustomListItemTypography color={'#979797'}>
                                                            ({serving}인분)
                                                        </CustomListItemTypography>
                                                    </CustomListItem>
                                                );
                                            },
                                        )}
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
                    })}
                </CustomListDiv>
                {selectEstimate && (
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
                                        {area} 수산물 견적
                                    </EstimateTopText>
                                    <EstimateTopText color={'#949494'} fontSize={'0.78rem'} marginBottom={'11px'}>
                                        실제 시세과 상이할 수 있습니다.
                                    </EstimateTopText>
                                </EstimateTopDiv>
                                {newSelectEstimate?.length > 0 ? (
                                    <StyledAddBookmark
                                        onClick={() => {
                                            handleDeleteBookmark(selectEstimate);
                                        }}
                                    />
                                ) : (
                                    <StyledRemoveBookmark
                                        onClick={() => {
                                            addBookmark(selectEstimate);
                                        }}
                                    />
                                )}
                            </SelectedEstimateTopMenu>
                            <SearchResultTable selectEstimate={selectEstimate} totalPrice={totalPrice} />
                        </SelectedEstimateContainer>
                    </Fade>
                )}
            </ResultDiv>
        </Card>
    );
});

export default React.memo(SearchResults);

const Card = styled.div`
    background-color: white;
    width: 1190px;
    height: 550px;
    min-width: 322px;
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const SearchResultsTypography = styled(Typography)`
    color: #575757;
    padding: 18px 0px 13px 19px;
    font-weight: bold;
`;

const BookmarkLink = styled(NavLink)`
    text-decoration: none;
    display: flex;
`;

const CustomDiv = styled.div`
    border-bottom: 1px solid #f6f6f6;
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
    width: 20%;
    height: 496px;
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
    }
`;

const ResultDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    @media all and (max-width: 730px) {
        flex-wrap: wrap;
    }
`;

interface CustomCardContentProps {
    active: string;
}

const CustomCardContent = styled(CardContent)<CustomCardContentProps>`
    display: flex;
    align-items: center;
    background-color: ${(props) => (props.active ? '#F8F8F8' : 'white')};
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
    min-width: 105px;
    max-height: 497px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;
    padding: 0;
    background-color: white;
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
    overflow: overlay;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
    ${({ theme }) => theme.device.tablet} {
        width: 25%;
    }
    ${({ theme }) => theme.device.mobile} {
        flex-grow: 1;
        border-right: none;
    }
`;

interface CustomListItemsProps {
    active: string;
}

const CustomListItems = styled(ListItem)<CustomListItemsProps>`
    width: 100%;
    min-width: 105px;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.active ? '#F8F8F8' : 'white')};
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
    ${({ theme }) => theme.device.tablet} {
        justify-content: center;
    }
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
    ${({ theme }) => theme.device.tablet} {
        margin-left: 0.3rem;
        margin-right: 0.3rem;
    }
`;

const SelectedEstimateContainer = styled.div`
    width: 68%;
    height: auto;
    max-height: 494px;
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
    @media all and (max-width: 730px) {
        width: 100%;
        border-top: 1px solid ${({ theme }) => theme.colors.gray};
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
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

const StyledAddBookmark = styled(BookmarkAddedIcon)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`;

const StyledRemoveBookmark = styled(BookmarkBorderIcon)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
`;
