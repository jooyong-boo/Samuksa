import {
    Avatar,
    Button,
    createTheme,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    List,
    Menu,
    MenuItem,
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
import ListIcon from '@mui/icons-material/List';
import { getCommentById } from '../../api/post';
import { getRandomNumber } from './PostViewer';

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
    const userInfo = useRecoilValue<any>(userInfoState);
    const posts = useRecoilValue<any[]>(getPostState);
    const [usePosts, setUsePosts] = useState<any[]>([]);
    const [searchPosts, setSearchPosts] = useState('');
    const [postComment, setPostComment] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    const openSearch = () => {
        setOpen(!open);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        let searchTitle = e.target.value;
        setSearchPosts(searchTitle);
    };

    const handleSearch = (e: React.KeyboardEvent | React.MouseEvent): void => {
        if (e.type === 'click' || (e as React.KeyboardEvent).key === 'Enter') {
            let result = posts.filter((post: any) => post.title.includes(searchPosts));
            setUsePosts(result);
        }
    };

    const goWriting = () => {
        if (Object.keys(userInfo).length) {
            navigate('/write', { state: '/review' });
        } else {
            navigate('/login');
            notifyError('글작성을 하려면 로그인해야합니다.');
        }
    };

    const AddReadPost = (id: number) => {
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
                return Object.assign(
                    {},
                    item,
                    { read: true },
                    { nickName: RandomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            } else {
                return Object.assign(
                    {},
                    item,
                    { nickName: RandomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            }
        });

        setUsePosts(newPosts);
    }, [posts]);

    // const getPostComment = async () => {
    //     let comment = await Promise.all(
    //         posts.map((post) => {
    //             let newComment = getCommentById(post.id);
    //             return newComment;
    //         }),
    //     );
    //     setPostComment(comment);
    // };

    // useEffect(() => {
    //     getPostComment();
    // }, [usePosts]);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const Menuopen = Boolean(anchorElNav);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = [
        {
            id: 1,
            name: '작성순',
        },
        {
            id: 2,
            name: '추천순',
        },
    ];

    return (
        <Background>
            <ReviewBoardContainer>
                <BoardTopWrapper>
                    {/* <BoardTitleText>리뷰게시판</BoardTitleText> */}
                    <WriteBtn variant="contained" onClick={goWriting}>
                        <StyleCreateIcon />
                        글쓰기
                    </WriteBtn>
                    <div>
                        <SearchBtn variant="outlined" onClick={openSearch}>
                            <StyleSearchIcon />
                        </SearchBtn>
                        {/* <SortBtn variant="outlined"> */}

                        <SortBtn
                            variant="outlined"
                            aria-controls={Menuopen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Menuopen ? 'true' : undefined}
                            onClick={handleOpenNavMenu}
                        >
                            <StyleListIcon />
                        </SortBtn>
                        <Menu id="게시글정렬" anchorEl={anchorElNav} open={Menuopen} onClose={handleCloseNavMenu}>
                            {pages.map(({ id, name }) => {
                                return (
                                    <MenuItem
                                        key={id}
                                        onClick={handleCloseNavMenu}
                                        sx={{ width: '80px', padding: 0, height: '30px' }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                        {/* </SortBtn> */}
                    </div>
                </BoardTopWrapper>
                {open ? (
                    <SearchContainer>
                        <SearchBox>
                            <StyledSearchIcon
                                onClick={(e) => {
                                    handleSearch(e);
                                }}
                            />
                            <SearchInput
                                placeholder="게시글 검색"
                                onChange={onSearch}
                                onKeyPress={(e) => handleSearch(e)}
                            />
                        </SearchBox>
                    </SearchContainer>
                ) : null}
                <ThemeProvider theme={theme}>
                    <CustomTableContainer>
                        <Table aria-label="review table">
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
                                    const { id, title, UserId, createdAt, read, nickName } = item;
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
                                                <TitleNavLink
                                                    to={`post/${id}`}
                                                    read={read ? 'true' : ''}
                                                    onClick={() => {
                                                        AddReadPost(id);
                                                    }}
                                                >
                                                    {title}
                                                    {/* <Typography>
                                                        {postComment.length > 0 ? postComment[id - 1].length : ''}
                                                    </Typography> */}
                                                </TitleNavLink>
                                            </TableCell>
                                            <TableCell sx={tableTextStyle}>{nickName}</TableCell>
                                            <TableCell sx={tableTextStyle}>{timeForToday(createdAt)}</TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                            <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                    <MobileBoardContainer>
                        <StyledUl>
                            {usePosts.slice(offset, offset + limit).map((item: any) => {
                                const { id, title, UserId, createdAt, read, nickName, avatar } = item;
                                const newCreateAt = new Date(createdAt);
                                const year = newCreateAt.getFullYear();
                                const month = newCreateAt.getMonth();
                                const date = newCreateAt.getDate();

                                return (
                                    <div key={id}>
                                        <li
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                borderBottom: '1px solid #EAEAEA',
                                                padding: '0.5rem 0',
                                            }}
                                        >
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar src={avatar} sx={{ width: '2rem', height: '2rem' }} />
                                                    <Typography
                                                        sx={{
                                                            display: 'flex',
                                                            marginLeft: '0.5rem',
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        {nickName}
                                                    </Typography>
                                                </div>
                                                <Typography
                                                    sx={{
                                                        textAlign: 'start',
                                                        maxWidth: '300px',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        padding: '10px 0',
                                                        ':hover': { fontWeight: 'bold' },
                                                    }}
                                                >
                                                    <TitleNavLink
                                                        to={`post/${id}`}
                                                        read={read ? 'true' : ''}
                                                        onClick={() => {
                                                            AddReadPost(id);
                                                        }}
                                                    >
                                                        {title}
                                                    </TitleNavLink>
                                                </Typography>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}></div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div style={{ display: 'flex' }}>
                                                        <Typography sx={{ marginRight: '0.3rem' }}>
                                                            조회: {id}
                                                        </Typography>
                                                        <Typography sx={{ marginRight: '0.3rem' }}>
                                                            댓글:{' '}
                                                            {postComment.length > 0 ? postComment[id - 1].length : ''}
                                                        </Typography>
                                                        <Typography>추천: {UserId}</Typography>
                                                    </div>
                                                    <Typography
                                                        sx={{ color: '#5A5A5A', textAlign: 'end' }}
                                                    >{`${year}년 ${month}월 ${date}일`}</Typography>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                );
                            })}
                        </StyledUl>
                    </MobileBoardContainer>
                </ThemeProvider>
                <PaginationStack>
                    <Pagination total={posts.length} limit={limit} postPage={postPage} setPostPage={setPostPage} />
                </PaginationStack>
            </ReviewBoardContainer>
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
    align-items: center;
    overflow: auto;
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

const ReviewBoardContainer = styled.div`
    width: 80%;
    text-align: center;
    overflow: auto;
`;

const BoardTopWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 1rem;
`;

const WriteBtn = styled(Button)`
    background-color: #0098ee;
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 6rem;
    height: 2.5rem;
    padding: 6px 1rem 6px 0.9rem;
    border-radius: 7px;
    &:hover {
        box-shadow: none;
    }
`;

const SearchBtn = styled(WriteBtn)`
    background-color: white;
    color: #0098ee;
    margin-right: 0.3rem;
    border-color: #a7a7a7;
`;

const SortBtn = styled(SearchBtn)`
    margin-right: 0;
`;

const StyleCreateIcon = styled(CreateIcon)`
    margin-right: 0.4rem;
    width: 1.3rem;
`;

const StyleSearchIcon = styled(SearchIcon)`
    color: #a7a7a7;
`;

const StyleListIcon = styled(ListIcon)`
    color: #a7a7a7;
    font-size: 1.6rem;
`;

const SearchContainer = styled.div`
    border-top: 1px solid #eaeaea;
`;

const SearchBox = styled.div`
    display: flex;
    border: 1px solid #939393;
    border-radius: 10px;
    margin: 0.5rem 1rem;
    padding: 5px;
`;

const StyledSearchIcon = styled(SearchIcon)`
    color: #a7a7a7;
    cursor: pointer;
    margin-right: 0.3rem;
`;

const SearchInput = styled.input`
    border: none;
    width: 100%;
    :focus {
        outline: none;
    }
`;

const CustomTableContainer = styled(TableContainer)`
    border-top: 2px solid #a7a7a7;
    border-bottom: 2px solid #a7a7a7;
    border-radius: 0;
    max-height: 600px;
    padding: 0px 12px;
    @media screen and (max-width: 700px) {
        display: none;
    }
`;

const MobileBoardContainer = styled.div`
    width: 100%;
    @media screen and (min-width: 701px) {
        display: none;
    }
`;

const StyledUl = styled.ul`
    list-style: none;
    padding-left: 0px;
    border-top: 1px solid #eaeaea;
`;

interface TitleNavLinkProps {
    read: string;
}

const TitleNavLink = styled(NavLink)<TitleNavLinkProps>`
    color: ${(props) => (props.read ? '#770088' : '#5A5A5A')};
    text-decoration: none;
    font-size: 0.875rem;
`;

const PaginationStack = styled(Stack)`
    width: 100%;
    align-items: center;
    margin: auto;
    margin-top: 1rem;
    overflow-x: hidden;
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

const tableTopTextStyle = {
    color: '#5A5A5A',
    textAlign: 'center',
    fontSize: '0.875rem',
    padding: '12px 0px',
};

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
