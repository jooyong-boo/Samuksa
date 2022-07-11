import * as React from 'react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import image from '../img/contemplative-reptile.jpeg';
import { Avatar, Button, createTheme, ThemeProvider, Typography } from '@mui/material';

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '66px',
    height: '66px',
    objectFit: 'cover',
  });

const theme = createTheme({
    typography: {
        fontSize: 12,
        fontFamily:"Pretendard"
    },
    palette: {
        primary: {
            main: '#5A5A5A',
        }
    },
});

const tableTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#5A5A5A' 
}

const tableTop = [
    '',
    '수산물 명',
    '원산지',
    '양식여부',
    '무게',
    '수량',
    '가격',
    '순살 무게',
    '합계',
];

// const tableTopText = styled('Typo')


export default function SearchResultTable({ selectEstimate, totalPrice }) {

    // console.log(selectEstimate, totalPrice)
  return (
    <div>
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} sx={{ borderTop: '2px solid #A7A7A7', borderRadius: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow theme={theme}>
                            {tableTop.map((item) => (
                                <TableCell key={item} sx={tableTextStyle}>{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{  }}>
                    {selectEstimate ? selectEstimate.map((item, i) => {
                        const { fishName, weightPerServing, totalMoney, serving, fishRecommendAlgoWeights } = item;
                        const [{ area, areaFrom, farmType, maxWeight, minWeight, price }] = [...fishRecommendAlgoWeights];
                        return (
                            <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>                                    
                                    <Avatar
                                        // alt={`Avatar n°${value + 1}`}
                                        src={image}
                                        variant= 'square'
                                        style={{ height: '60px', width: '60px', borderRadius: '3px' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" sx={tableTextStyle}>
                                {fishName}
                                </TableCell>
                                <TableCell sx={tableTextStyle}>{areaFrom}</TableCell>
                                <TableCell sx={tableTextStyle}>{farmType}</TableCell>
                                {/* <TableCell>{ maxWeight && minWeight? `${minWeight / 1000} ~ ${maxWeight / 1000}kg` : maxWeight? `${maxWeight / 1000}kg` : `${minWeight / 1000}kg` }</TableCell> */}
                                <TableCell sx={tableTextStyle}>{ weightPerServing * serving / 1000 }kg</TableCell>
                                <TableCell sx={tableTextStyle}>{serving}</TableCell>
                                <TableCell sx={tableTextStyle}>{(price * 1000).toLocaleString('ko-KR')}원</TableCell>
                                <TableCell sx={tableTextStyle}>{(weightPerServing * serving / 1000) * 0.5}kg</TableCell>
                                {/* <TableCell>{maxWeight? ((maxWeight * 0.5) / 1000) : minWeight? ((minWeight * 0.5) / 1000) : null}kg</TableCell> */}
                                <TableCell sx={tableTextStyle}>{totalMoney.toLocaleString('ko-KR')}원</TableCell>
                            </TableRow>
                        )
                    }) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%', margin: 'auto', marginTop: '1rem'}}>
            <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                {selectEstimate? selectEstimate.map((item, i) => {
                    const { fishName, serving, fishRecommendAlgoWeights, weightPerServing } = item;
                    const [{ maxWeight, minWeight }] = [...fishRecommendAlgoWeights];
                    return(
                        <div key={i} style={{ display: 'flex' }}>
                            <Typography sx={{ fontSize: 12, color: '#707070', marginRight: 1 }}>{fishName}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#707070', marginRight: 1 }}>{ weightPerServing * serving / 1000 }kg(무게) X 0.5(수율) X {serving}(수량) </Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: '700', color: '#707070' }}>{ ((weightPerServing * serving / 1000) * 0.5 * serving).toFixed(1) }kg</Typography>
                            {/* <Typography sx={{ fontSize: 12, color: '#707070', marginRight: 1 }}>{maxWeight? maxWeight / 1000 : minWeight / 1000}kg(무게) X 0.5(수율) X {serving}(수량) =</Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 'bold', color: '#707070' }}>{maxWeight ? ((maxWeight * serving / 2) / 1000) : ((minWeight * serving / 2) / 1000)}kg</Typography> */}
                        </div>
                    )
                }): null}
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'medium', marginRight: 1 }}>총 순살무게: </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>?</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'medium', marginRight: 1 }}>총 금액: </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{totalPrice? totalPrice.toLocaleString('ko-KR'): null}</Typography>원
                </div>
            </div>
        </div>
    </div>
  );
}

