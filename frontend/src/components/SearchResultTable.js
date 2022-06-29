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

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '66px',
    height: '66px',
    objectFit: 'cover',
  });

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen', 159, 6.0, 24, 4.0),
  createData('Ice', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Ginger', 356, 16.0, 49, 3.9),
];

export default function SearchResultTable() {
  return (

    <div>
        <>
            <TableContainer component={Paper} sx={{ borderTop: '2px solid #A7A7A7', borderRadius: 0 }}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                <TableRow>
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
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
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
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    </div>
  );
}

