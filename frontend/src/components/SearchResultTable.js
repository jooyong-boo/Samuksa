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

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '66px',
    height: '66px',
    objectFit: 'cover',
  });

function createData(name, calories, fat, carbs, protein, a, b, c) {
  return { name, calories, fat, carbs, protein, a, b, c };
}

const rows = [
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
  createData('광어', '제주', '양식', 1, 2, 35000, 600, 70000),
];


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


export default function SearchResultTable() {

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
                {rows.map((row, i) => (
                    <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell><Img alt="complex" src={image} /></TableCell>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.fat}</TableCell>
                        <TableCell>{row.carbs}</TableCell>
                        <TableCell>{row.protein}</TableCell>
                        <TableCell>{row.a}</TableCell>
                        <TableCell>{row.b}</TableCell>
                        <TableCell>{row.c}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </ThemeProvider>
        <Typography>광어 무게 수율 수량</Typography>
    </div>
  );
}

