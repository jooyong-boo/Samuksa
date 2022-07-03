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
import { Avatar, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';

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
    },
    palette: {
        primary: {
            main: '#5A5A5A',
        }
    },
});

// const tableTopText = styled('Typo')


export default function SearchResultTable({ selectEstimate, totalPrice }) {

  return (
    <div>
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} sx={{ borderTop: '2px solid #A7A7A7', borderRadius: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow theme={theme}>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>{/*image*/}</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>수산물 명</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>원산지</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>양식여부</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>무게</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>수량</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>가격</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>순살 무게</TableCell>
                            <TableCell sx={{ padding: '8px 16px 8px 16px' }}>합계</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{  }}>
                    {selectEstimate ? selectEstimate.map((item, i) => {
                        const { fishName, area, areaFrom, farmType, size, maxWeight, minWeight, serving, price } = item;
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
                                <TableCell component="th" scope="row">
                                {fishName}
                                </TableCell>
                                <TableCell>{areaFrom}</TableCell>
                                <TableCell>{farmType}</TableCell>
                                <TableCell>{minWeight / 1000}~{maxWeight / 1000}kg</TableCell>
                                <TableCell>{serving}</TableCell>
                                <TableCell>{price.toLocaleString('ko-KR')}원</TableCell>
                                <TableCell>순살무게</TableCell>
                                <TableCell>{(price * serving).toLocaleString('ko-KR')}원</TableCell>
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
                    const { fishName, maxWeight, serving } = item;
                    return(
                        <div key={i} style={{ display: 'flex' }}>
                            <Typography sx={{ fontSize: 12, color: '#707070', marginRight: 1 }}>{fishName}</Typography>
                            <Typography sx={{ fontSize: 12, color: '#707070', marginRight: 1 }}>{maxWeight / 1000}kg(무게) X 0.5(수율) X {serving}(수량) =</Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 'bold', color: '#707070' }}>{(maxWeight * serving) / 2}g</Typography>
                        </div>
                    )
                }): null}
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'medium', marginRight: 1  }}>총 순살무게: </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}> 2500</Typography>g
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

