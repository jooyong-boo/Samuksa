import {
    Button,
    createTheme,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider,
    Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Background = styled.div`
    background-color: white;
    width: 95%;
    height: 90%;
    padding-top: 30px;
    padding-left: 30px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow: hidden;
    margin: 10px auto;
`;

const theme = createTheme({
    typography: {
        fontSize: 12,
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

const freeBoardHead = ['No', '제목', '글쓴이', '작성시간', '조회수'];

const dummy = [
    {
        id: 1,
        title: '안녕하세요',
        author: '아무개',
        createdAt: '2022-04-22T14:07:35Z',
        hits: 12,
    },
    {
        id: 2,
        title: '반갑습니다',
        author: '광어킹',
        createdAt: '2022-04-22T14:07:35Z',
        hits: 21,
    },
    {
        id: 3,
        title: '이거',
        author: '우럭킹',
        createdAt: '2022-04-22T14:07:35Z',
        hits: 222,
    },
    {
        id: 4,
        title: '어떻게',
        author: '참돔킹',
        createdAt: '2022-04-22T14:07:35Z',
        hits: 32,
    },
    {
        id: 5,
        title: '먹나요',
        author: '돌돔킹',
        createdAt: '2022-04-22T14:07:35Z',
        hits: 52,
    },
    // {
    //     id: 1,
    //     title: '안녕하세요',
    //     author: '아무개',
    //     createdAt: '2022-04-22T14:07:35Z',
    //     hits: 12,
    // },
    // {
    //     id: 2,
    //     title: '반갑습니다',
    //     author: '광어킹',
    //     createdAt: '2022-04-22T14:07:35Z',
    //     hits: 21,
    // },
    // {
    //     id: 3,
    //     title: '이거',
    //     author: '우럭킹',
    //     createdAt: '2022-04-22T14:07:35Z',
    //     hits: 222,
    // },
    // {
    //     id: 4,
    //     title: '어떻게',
    //     author: '참돔킹',
    //     createdAt: '2022-04-22T14:07:35Z',
    //     hits: 32,
    // },
    // {
    //     id: 5,
    //     title: '먹나요',
    //     author: '돌돔킹',
    //     createdAt: '2022-04-22T14:07:35Z',
    //     hits: 52,
    // },
];

const FreeBoard = () => {
    const navigate = useNavigate();

    const goWriting = () => {
        navigate('/write');
    };

    return (
        <Background>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>자유게시판</Typography>
            <ThemeProvider theme={theme}>
                <TableContainer
                    component={Paper}
                    sx={{ borderTop: '2px solid #A7A7A7', borderRadius: 0, maxHeight: '540px' }}
                >
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow theme={theme}>
                                {freeBoardHead.map((item) => (
                                    <TableCell key={item} sx={tableTextStyle}>
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{}}>
                            {dummy.map((item, i) => {
                                const { id, title, author, createdAt, hits } = item;
                                return (
                                    <TableRow
                                        key={id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                    >
                                        <TableCell>{id}</TableCell>
                                        <TableCell component="th" scope="row" sx={tableTextStyle}>
                                            {title}
                                        </TableCell>
                                        <TableCell sx={tableTextStyle}>{author}</TableCell>
                                        <TableCell sx={tableTextStyle}>{createdAt}</TableCell>
                                        <TableCell sx={tableTextStyle}>{hits}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
            <Stack spacing={2} sx={{ width: '100vw', alignItems: 'center', margin: 'auto' }}>
                <Pagination count={10} variant="outlined" color="primary" />
            </Stack>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: '3rem' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#6EA5F8',
                        color: 'white',
                        boxShadow: 'none',
                        width: '10%',
                        ':hover': { boxShadow: 'none' },
                    }}
                    onClick={goWriting}
                >
                    글쓰기
                </Button>
            </div>
        </Background>
    );
};

export default FreeBoard;
