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
import { createTheme, ThemeProvider, Typography } from '@mui/material';
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
    }
});


export default function SearchResultTable({ selectEstimate, totalPrice }) {

  return (
    <div>
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} sx={{ borderTop: '2px solid #A7A7A7', borderRadius: 0 }}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow theme={theme}>
                            <TableCell></TableCell>
                            <TableCell>수산물 명</TableCell>
                            <TableCell>원산지</TableCell>
                            <TableCell>양식여부</TableCell>
                            <TableCell>무게</TableCell>
                            <TableCell>수량</TableCell>
                            <TableCell>가격</TableCell>
                            <TableCell>순살 무게</TableCell>
                            <TableCell>합계</TableCell>
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
                                <TableCell><Img alt="complex" src={image} /></TableCell>
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
                    console.log({maxWeight} * {serving})
                    return(
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <Typography>{fishName}</Typography>
                            <Typography>{maxWeight / 1000}kg(무게) X 0.5(수율) X {serving}(수량)</Typography>
                            <Typography>{(maxWeight * serving) / 2}g</Typography>
                        </div>
                    )
                }): null}
            </div>
            <div>
                <Typography>총 금액: {totalPrice.toLocaleString('ko-KR')}원</Typography>
                <Typography>총 순살무게: 2500g</Typography>
            </div>
        </div>
    </div>
  );
}

