import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import image from '../../components/assets/img/contemplative-reptile.webp';
import { Avatar, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';

const theme = createTheme({
    typography: {
        fontSize: 13,
        fontFamily: 'Pretendard',
    },
    palette: {
        primary: {
            main: '#5A5A5A',
        },
    },
});

const tableTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#5A5A5A',
};

const tableTop = ['', '수산물 명', '원산지', '무게', '수량', '가격', '합계'];

interface estimate {
    selectEstimate: any;
    totalPrice?: number;
}

export default function SearchResultTable({ selectEstimate, totalPrice }: estimate) {
    return (
        <>
            <ResultTableWrapper>
                <ThemeProvider theme={theme}>
                    <CustomTableContainer>
                        <Table aria-label="조합 상세리스트">
                            <TableHead>
                                <TableRow>
                                    {tableTop.map((item) => (
                                        <TableCell key={item} sx={tableTextStyle}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectEstimate
                                    ? selectEstimate.map((item: any, i: number) => {
                                          const {
                                              fishName,
                                              weightPerServing,
                                              totalMoney,
                                              serving,
                                              fishRecommendAlgoWeights,
                                          } = item;
                                          const [{ area, areaFrom, farmType, maxWeight, minWeight, price }] = [
                                              ...fishRecommendAlgoWeights,
                                          ];
                                          return (
                                              <TableRow
                                                  key={i}
                                                  sx={{
                                                      '&:last-child td, &:last-child th': { border: 0 },
                                                  }}
                                              >
                                                  <TableCell sx={tableTextStyle}>
                                                      <CustomAvatar alt={fishName} src={image} />
                                                  </TableCell>
                                                  <TableCell component="th" scope="row" sx={tableTextStyle}>
                                                      {fishName}
                                                  </TableCell>
                                                  <TableCell sx={tableTextStyle}>
                                                      {areaFrom} ({farmType})
                                                  </TableCell>
                                                  {/* <TableCell sx={tableTextStyle}>{farmType}</TableCell> */}
                                                  {/* <TableCell>{ maxWeight && minWeight? `${minWeight / 1000} ~ ${maxWeight / 1000}kg` : maxWeight? `${maxWeight / 1000}kg` : `${minWeight / 1000}kg` }</TableCell> */}
                                                  <TableCell sx={tableTextStyle}>
                                                      {(weightPerServing * serving) / 1000}
                                                      kg
                                                  </TableCell>
                                                  <TableCell sx={tableTextStyle}>{serving}</TableCell>
                                                  <TableCell sx={tableTextStyle}>
                                                      {(price * 1000).toLocaleString('ko-KR')}원
                                                  </TableCell>
                                                  {/* <TableCell sx={tableTextStyle}>
                                                      {((weightPerServing * serving) / 1000) * 0.5}
                                                      kg
                                                  </TableCell> */}
                                                  {/* <TableCell>{maxWeight? ((maxWeight * 0.5) / 1000) : minWeight? ((minWeight * 0.5) / 1000) : null}kg</TableCell> */}
                                                  <TableCell sx={tableTextStyle}>
                                                      {totalMoney.toLocaleString('ko-KR')}원
                                                  </TableCell>
                                              </TableRow>
                                          );
                                      })
                                    : null}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                </ThemeProvider>
                <MobileGridBox>
                    {selectEstimate
                        ? selectEstimate.map((item: any, i: number) => {
                              const { fishName, weightPerServing, totalMoney, serving, fishRecommendAlgoWeights } =
                                  item;
                              const [{ area, areaFrom, farmType, maxWeight, minWeight, price }] = [
                                  ...fishRecommendAlgoWeights,
                              ];
                              return (
                                  <div
                                      style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          border: '1px solid #eaeaea',
                                      }}
                                      key={i}
                                  >
                                      <div
                                          style={{
                                              padding: '1rem',
                                              height: '30rem',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                          }}
                                      >
                                          <CustomMobileAvatar alt={'1'} src={image} />
                                          <Typography>
                                              {fishName}({farmType})
                                          </Typography>
                                          <Typography>{areaFrom}</Typography>
                                          <Typography>
                                              {' '}
                                              {(weightPerServing * serving) / 1000}
                                              kg
                                          </Typography>
                                          <Typography>총 {serving}마리</Typography>
                                          <Typography>마리당 {(price * 1000).toLocaleString('ko-KR')}원</Typography>
                                          <Typography>Total: {totalMoney.toLocaleString('ko-KR')}원</Typography>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </MobileGridBox>
                <CombinationInfoContainer>
                    <CombinationFishDetailInfo>
                        {selectEstimate
                            ? selectEstimate.map((item: any, i: number) => {
                                  const { fishName, serving, fishRecommendAlgoWeights, weightPerServing } = item;
                                  const [{ maxWeight, minWeight }] = [...fishRecommendAlgoWeights];
                                  return (
                                      <CombinationDetailDiv key={i}>
                                          <CombinationDetailTypography
                                              fontSize={'0.8rem'}
                                              color={'#707070'}
                                              marginRight={'0.6rem'}
                                              minWidth={'2rem'}
                                              fontWeight={'600'}
                                          >
                                              {fishName}
                                          </CombinationDetailTypography>
                                          {/* <CombinationDetailTypography
                                              fontSize={'0.8rem'}
                                              color={'#707070'}
                                              marginRight={'0.5rem'}
                                          >
                                              {(weightPerServing * serving) / 1000}
                                              kg(무게) X 0.5(수율) X {serving}(수량){' '}
                                          </CombinationDetailTypography> */}
                                          <CombinationDetailTypography
                                              fontSize={'0.8rem'}
                                              color={'#707070'}
                                              marginRight={'0.5rem'}
                                          >
                                              {serving}마리
                                          </CombinationDetailTypography>
                                          <CombinationDetailTypography
                                              fontSize={'0.9rem'}
                                              fontWeight={'600'}
                                              color={'#707070'}
                                          >
                                              {(((weightPerServing * serving) / 1000) * 0.5 * serving).toFixed(1)}
                                              kg
                                          </CombinationDetailTypography>
                                      </CombinationDetailDiv>
                                  );
                              })
                            : null}
                    </CombinationFishDetailInfo>
                    <DetailWeightPriceDiv>
                        <CombinationDetailTypography fontSize={'1rem'} fontWeight={'medium'} marginRight={'0.5rem'}>
                            총 금액:{' '}
                        </CombinationDetailTypography>
                        <CombinationDetailTypography fontSize={'1.1rem'} fontWeight={'bold'}>
                            {totalPrice ? totalPrice.toLocaleString('ko-KR') : null}
                        </CombinationDetailTypography>
                        원
                    </DetailWeightPriceDiv>
                </CombinationInfoContainer>
            </ResultTableWrapper>
        </>
    );
}
const ResultTableWrapper = styled.div`
    /* @media all and (min-width: 951px) {
        width: 100%;
    }
    @media all and (min-width: 731px) and (max-width: 950px) {
        display: none;
    }
    @media all and (max-width: 615px) {
        display: none;
    } */
`;

const CustomTableContainer = styled(TableContainer)`
    border-top: 2px solid #a7a7a7;
    border-bottom: 2px solid #a7a7a7;
    border-radius: 0;
    @media all and (min-width: 951px) {
        width: 100%;
    }
    @media all and (min-width: 731px) and (max-width: 890px) {
        display: none;
    }
    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const CustomAvatar = styled(Avatar)`
    height: 3.9rem;
    width: 3.9rem;
    border-radius: 3px;
    margin: 5px 0;
`;

const CustomMobileAvatar = styled(Avatar)`
    height: 6rem;
    width: 6rem;
    border-radius: 3px;
    margin-bottom: 1rem;
`;

const CombinationInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: auto;
    margin: 1rem;
`;

const CombinationFishDetailInfo = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
`;

interface CombinationDetailTypographyProps {
    fontSize: any;
    color?: any;
    marginRight?: any;
    fontWeight?: any;
    minWidth?: any;
}

const CombinationDetailDiv = styled.div`
    display: flex;
`;

const CombinationDetailTypography = styled(Typography)<CombinationDetailTypographyProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '1rem')};
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    margin-right: ${(props) => (props.marginRight ? `${props.marginRight}` : '0')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '400')};
    min-width: ${(props) => props.minWidth && `${props.minWidth}`};
`;

const DetailWeightPriceDiv = styled.div`
    display: flex;
    align-items: center;
`;

const MobileGridBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 130px);
    justify-content: center;
    align-content: center;
    text-align: center;
    grid-gap: 20px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    @media all and (min-width: 851px) {
        display: none;
    }
    @media all and (min-width: 730px) and (max-width: 890px) {
        width: 100%;
        display: grid;
    }
    @media all and (min-width: 501px) and (max-width: 730px) {
        display: none;
    }
    ${({ theme }) => theme.device.mobile} {
        width: 100%;
        display: grid;
    }
`;
