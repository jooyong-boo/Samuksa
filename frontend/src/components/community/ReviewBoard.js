import {
    Button,
    createTheme,
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
import usePagination from '@mui/material/usePagination/usePagination';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getPostState } from '../../store/atom';
import Pagination from './Pagination';

const Background = styled.div`
    background-color: white;
    width: 95%;
    height: 90%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow: hidden;
    margin: auto;
    padding: 40px;
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
    textAlign: 'center',
    fontSize: '0.9rem',
    // maxWidth: '800px',
};

const titleTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#5A5A5A',
    fontSize: '0.9rem',
    textAlign: 'center',
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    ':hover': {
        fontWeight: 'bold',
    },
};

const tableTopTextStyle = {
    color: '#5A5A5A',
    textAlign: 'center',
    fontSize: '1rem',
    padding: '16px 0px',
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
];

const ReviewBoard = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const goWriting = () => {
        navigate('/write');
    };

    const [posts, setPost] = useRecoilState(getPostState);

    // console.log(posts);

    return (
        <Background>
            <div style={{ width: '70%', textAlign: 'center', margin: 'auto' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>리뷰게시판</Typography>
                <ThemeProvider theme={theme}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderTop: '2px solid #A7A7A7',
                            borderRadius: 0,
                            maxHeight: '500px',
                            padding: '0px 12px',
                        }}
                    >
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {freeBoardHead.map((item) => (
                                        <TableCell key={item} sx={tableTopTextStyle}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{}}>
                                {posts.slice(offset, offset + limit).map((item) => {
                                    const { id, title, UserId, content, createdAt, updatedAt } = item;
                                    return (
                                        <TableRow
                                            key={id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                ':hover': {
                                                    backgroundColor: '#F4F4F4',
                                                },
                                            }}
                                        >
                                            <TableCell sx={tableTextStyle}>{id}</TableCell>
                                            <TableCell component="th" scope="row" sx={titleTextStyle}>
                                                <Link
                                                    to={`/post/${id}`}
                                                    style={{ textDecoration: 'none', color: '#5A5A5A' }}
                                                >
                                                    {title}
                                                </Link>
                                            </TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                            <TableCell sx={tableTextStyle}>{createdAt}</TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ThemeProvider>
                <Stack spacing={2} sx={{ width: '100%', alignItems: 'center', margin: 'auto', marginTop: '1rem' }}>
                    <Pagination
                        count={10}
                        variant="outlined"
                        color="primary"
                        total={posts.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </Stack>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: '3rem' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#6EA5F8',
                            color: 'white',
                            boxShadow: 'none',
                            width: '15%',
                            ':hover': { boxShadow: 'none' },
                        }}
                        onClick={goWriting}
                    >
                        글쓰기
                    </Button>
                </div>
            </div>
        </Background>
    );
};

export default ReviewBoard;
