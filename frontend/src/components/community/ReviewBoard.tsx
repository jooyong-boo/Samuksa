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
    SelectChangeEvent,
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
import { RandomNickname } from '../utils/RandomNickname';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { getCommentById } from '../../api/post';
import { getRandomNumber } from './PostViewer';

const reviewBoardHead = ['No', '제목', '글쓴이', '작성시간', '추천수', '조회수'];

const SortPages = [
    {
        id: 1,
        name: '최신순',
    },
    {
        id: 2,
        name: '추천순',
    },
    {
        id: 3,
        name: '댓글순',
    },
    {
        id: 4,
        name: '조회순',
    },
];

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
    const postsRecoil = useRecoilValue<any[]>(getPostState);
    const [posts, setPosts] = useState(postsRecoil);
    const [usePosts, setUsePosts] = useState<any[]>([]);
    const [searchPosts, setSearchPosts] = useState('');
    const [postComment, setPostComment] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [curSort, setCurSort] = useState(SortPages[0].name);
    const [searchOption, setSearchOption] = useState('제목');

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
            if (searchOption === '제목') {
                let result = posts.filter((post: any) => post.title.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('reviewReadPost');
                    if (readPost?.includes(post.id)) {
                        return { ...post, read: true };
                    } else {
                        return post;
                    }
                });
                setUsePosts(writedResult);
            }
            if (searchOption === '글쓴이') {
                let result = posts.filter((post: any) => post.nickName.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('reviewReadPost');
                    if (readPost?.includes(post.id)) {
                        return { ...post, read: true };
                    } else {
                        return post;
                    }
                });
                setUsePosts(writedResult);
            }
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

    const handleChangeSearchOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(e.target.value);
    };

    useEffect(() => {
        const readPost = localStorage.getItem('reviewReadPost');
        const newPosts = postsRecoil.map((item: any) => {
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

        setPosts(newPosts);
        setUsePosts(newPosts);
    }, [postsRecoil]);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const Menuopen = Boolean(anchorElNav);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSortPage = (e: React.MouseEvent, name: string) => {
        e.preventDefault();
        if (curSort !== name) {
            setCurSort(name);
        }
    };

    return (
        <Background>
            <BoardContainer>
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
                        <SortBtn
                            variant="outlined"
                            aria-controls={Menuopen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Menuopen ? 'true' : undefined}
                            onClick={handleOpenNavMenu}
                        >
                            <StyleListIcon />
                            <SortTypography>{curSort}</SortTypography>
                        </SortBtn>
                        <Menu id="게시글정렬" anchorEl={anchorElNav} open={Menuopen} onClose={handleCloseNavMenu}>
                            {SortPages.map(({ id, name }) => {
                                return (
                                    <SortMenuItem
                                        key={id}
                                        onClick={(e) => {
                                            handleCloseNavMenu();
                                            handleSortPage(e, name);
                                        }}
                                    >
                                        <SortMenuTypography>{name}</SortMenuTypography>
                                    </SortMenuItem>
                                );
                            })}
                        </Menu>
                    </div>
                </BoardTopWrapper>
                {open ? (
                    <SearchContainer>
                        <SelectBox
                            onChange={(e) => {
                                handleChangeSearchOption(e);
                            }}
                        >
                            <option value="제목">제목</option>
                            <option value="글쓴이">글쓴이</option>
                        </SelectBox>
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
                                    const { id, title, UserId, createdAt, read, nickName, avatar } = item;
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
                                            <TableCell sx={tableTextStyle}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <MobileAvatar src={avatar} />
                                                    <Typography sx={{ marginLeft: '0.5rem' }}>{nickName}</Typography>
                                                </div>
                                            </TableCell>
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
                                        <MobileLi>
                                            <div>
                                                <MobileWriterWrapper>
                                                    <MobileAvatar src={avatar} />
                                                    <NickNameInfo>{nickName}</NickNameInfo>
                                                </MobileWriterWrapper>
                                                <TitleInfo>
                                                    <TitleNavLink
                                                        to={`post/${id}`}
                                                        read={read ? 'true' : ''}
                                                        onClick={() => {
                                                            AddReadPost(id);
                                                        }}
                                                    >
                                                        {title}
                                                    </TitleNavLink>
                                                </TitleInfo>
                                            </div>
                                            <MobilePostAdditionalInfoWrapper>
                                                <MobilePostAddInfoLeft>
                                                    <MobilePostAddInfoText>조회: {id}</MobilePostAddInfoText>
                                                    <MobilePostAddInfoText>
                                                        댓글: {postComment.length > 0 ? postComment[id - 1].length : ''}
                                                    </MobilePostAddInfoText>
                                                    <Typography>추천: {UserId}</Typography>
                                                </MobilePostAddInfoLeft>
                                                <MobilePostAddInfoRightText>{`${year}년 ${month}월 ${date}일`}</MobilePostAddInfoRightText>
                                            </MobilePostAdditionalInfoWrapper>
                                        </MobileLi>
                                    </div>
                                );
                            })}
                        </StyledUl>
                    </MobileBoardContainer>
                </ThemeProvider>
                <PaginationStack>
                    <Pagination
                        total={postsRecoil.length}
                        limit={limit}
                        postPage={postPage}
                        setPostPage={setPostPage}
                    />
                </PaginationStack>
            </BoardContainer>
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

const BoardContainer = styled.div`
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
    background-color: ${({ theme }) => theme.colors.main};
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
    color: ${({ theme }) => theme.colors.main};
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

const SortTypography = styled(Typography)`
    font-size: 0.8rem;
    color: #374151;
    font-weight: 500;
`;

const SortMenuItem = styled(MenuItem)`
    width: 80px;
    padding: 1rem 0;
`;

const SortMenuTypography = styled(Typography)`
    font-weight: 400;
    text-align: center;
    width: 100%;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #eaeaea;
`;

const SearchBox = styled.div`
    display: flex;
    width: 90%;
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
    outline: none;
    width: 100%;
`;

const SelectBox = styled.select`
    border: none;
    border-radius: 0;
    font-size: 1rem;
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
    ${({ theme }) => theme.device.tablet} {
        display: none;
    }
`;

const MobileBoardContainer = styled.div`
    display: none;
    ${({ theme }) => theme.device.tablet} {
        display: block;
        width: 100%;
    }
`;

const StyledUl = styled.ul`
    list-style: none;
    padding-left: 0px;
    border-top: 1px solid #eaeaea;
`;

const MobileLi = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    padding: 0.5rem 0;
`;

const MobileWriterWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const MobileAvatar = styled(Avatar)`
    width: 2rem;
    height: 2rem;
`;

const NickNameInfo = styled(Typography)`
    display: flex;
    margin-left: 0.5rem;
    font-size: 0.8rem;
`;

const TitleInfo = styled(Typography)`
    text-align: start;
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
    :hover {
        font-weight: bold;
    }
`;

interface TitleNavLinkProps {
    read: string;
}

const TitleNavLink = styled(NavLink)<TitleNavLinkProps>`
    color: ${(props) => (props.read ? '#770088' : '#5A5A5A')};
    text-decoration: none;
    font-size: 0.875rem;
`;

const MobilePostAdditionalInfoWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const MobilePostAddInfoLeft = styled.div`
    display: flex;
`;

const MobilePostAddInfoText = styled(Typography)`
    margin-left: 0.3rem;
`;

const MobilePostAddInfoRightText = styled(Typography)`
    color: #5a5a5a;
    text-align: end;
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
