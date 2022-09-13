import {
    Button,
    createTheme,
    FormControl,
    Input,
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
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getPostState, reviewPostPageState } from '../../store/atom';
import { userInfoState } from '../../store/user';
import Pagination from './Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import timeForToday from '../utils/TimeForToday';
import { RandomNickname } from '../common/RandomNickname';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

const reviewBoardHead = ['No', '제목', '글쓴이', '작성시간', '추천수', '조회수'];

const ReviewBoard = () => {
    const notifyError = (text: string) => {
        dismissAll();
        toast.error(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState<number>(1);
    const [postPage, setPostPage] = useRecoilState<number>(reviewPostPageState);
    const offset = (postPage - 1) * limit;
    const userInfo = useRecoilValue(userInfoState);
    const posts = useRecoilValue(getPostState);
    const [usePosts, setUsePosts] = useState<any[]>([]);
    const [searchPosts, setSearchPosts] = useState('');

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let searchTitle = e.target.value;
        setSearchPosts(searchTitle);
    };

    const handleSearch = (e: React.KeyboardEvent) => {
        console.log(e);
        if (e.key === 'Enter') {
            let result = posts.filter((post: any) => post.title.includes(searchPosts));
            setUsePosts(result);
        }
    };

    const goWriting = () => {
        if (userInfo) {
            navigate('/write', { state: '/review' });
        } else {
            navigate('/login');
            notifyError('글작성을 하려면 로그인해야합니다.');
        }
    };

    const AddReadPost = (id: any) => {
        let readPost: any = localStorage.getItem('reviewReadPost');
        if (readPost?.length) {
            let newReadPost: any = [...JSON.parse(readPost), id];
            localStorage.setItem('reviewReadPost', JSON.stringify(newReadPost));
        } else {
            localStorage.setItem('reviewReadPost', JSON.stringify([id]));
        }
    };

    useEffect(() => {
        const readPost = localStorage.getItem('reviewReadPost');
        const newPosts = posts.map((item: any) => {
            if (readPost?.includes(item.id)) {
                return Object.assign({}, item, { read: true });
            } else {
                return item;
            }
        });
        setUsePosts(newPosts);
    }, [posts]);

    return (
        <Background>
            <div
                style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    margin: 'auto',
                }}
            >
                <Typography sx={{ fontSize: '2rem', fontWeight: '600' }}>리뷰게시판</Typography>
                <FormControl sx={{ width: '40%' }}>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            // <InputAdornment position="start">
                            <SearchIcon />
                            // </InputAdornment>
                        }
                        type="string"
                        defaultValue=""
                        placeholder="게시글 검색"
                        onChange={onSearch}
                        onKeyPress={(e) => handleSearch(e)}
                        autoComplete="off"
                        // readOnly={fishList.length > 0 ? false : true}
                        // disableUnderline={fishList.length > 0 ? false : true}
                    />
                </FormControl>
                <WriteBtn variant="contained" onClick={goWriting}>
                    <CreateIcon sx={{ marginRight: '0.4rem', width: '1.3rem' }} />
                    글쓰기
                </WriteBtn>
            </div>
            <div style={{ width: '80%', textAlign: 'center', overflow: 'auto' }}>
                <ThemeProvider theme={theme}>
                    <CustomTableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {reviewBoardHead.map((item) => (
                                        <TableCell key={item} sx={tableTopTextStyle}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usePosts.slice(offset, offset + limit).map((item: any) => {
                                    const { id, title, UserId, createdAt, read } = item;
                                    const newCreateAt = new Date(createdAt);
                                    const year = newCreateAt.getFullYear();
                                    const month = newCreateAt.getMonth();
                                    const date = newCreateAt.getDate();
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
                                                <NavLink
                                                    to={`post/${id}`}
                                                    style={{
                                                        color: read ? '#770088' : '#5A5A5A',
                                                        textDecoration: 'none',
                                                        fontSize: '0.875rem',
                                                    }}
                                                    onClick={() => {
                                                        AddReadPost(id);
                                                    }}
                                                >
                                                    {title}
                                                </NavLink>
                                            </TableCell>
                                            <TableCell sx={tableTextStyle}>{RandomNickname()}</TableCell>
                                            <TableCell
                                                sx={tableTextStyle}
                                            >{`${year}년 ${month}월 ${date}일`}</TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                </ThemeProvider>
                <Stack sx={{ width: '100%', alignItems: 'center', margin: 'auto', marginTop: '1rem' }}>
                    <Pagination
                        total={posts.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        postPage={postPage}
                        setPostPage={setPostPage}
                    />
                </Stack>
            </div>
        </Background>
    );
};

export default ReviewBoard;

const Background = styled.div`
    background-color: white;
    width: 95%;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    overflow: overlay;
    margin: auto;
    padding: 10px;
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
`;

const theme = createTheme({
    typography: {
        fontSize: 10,
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
    fontSize: '0.875rem',
};

const titleTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#5A5A5A',
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
    fontSize: '0.875rem',
    padding: '12px 0px',
};

const WriteBtn = styled(Button)`
    background-color: #0098ee;
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 6.5rem;
    height: 2.3rem;
    padding: 6px 1rem 6px 0.9rem;
    &:hover {
        box-shadow: none;
    }
`;

const CustomTableContainer = styled(TableContainer)`
    border-top: 2px solid #a7a7a7;
    border-bottom: 2px solid #a7a7a7;
    border-radius: 0;
    max-height: 500px;
    padding: 0px 12px;
`;
