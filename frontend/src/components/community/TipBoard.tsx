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
import { useNavigate, NavLink, useOutletContext } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getPostState, tipPostPageState } from '../../store/atom';
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
import useGetPost from 'api/hooks/post/useGetPost';
import TableBoard from './FreeBoard/TableBoard';
import MobileBoard from './FreeBoard/MobileBoard';

const tipBoardHead = ['No', '제목', '글쓴이', '작성시간', '추천수', '조회수'];

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
    {
        id: 5,
        name: '오래된순',
        active: false,
    },
];

interface OutletProps {
    selectTab: number;
}

const TipBoard = () => {
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
    const [postPage, setPostPage] = useRecoilState<number>(tipPostPageState);
    const offset = (postPage - 1) * limit;
    const userInfo = useRecoilValue<any>(userInfoState);
    const postsRecoil = useRecoilValue<any[]>(getPostState);
    const [reversePosts, setReversePosts] = useState([...postsRecoil].reverse());
    const [usePosts, setUsePosts] = useState<any[]>(postsRecoil);
    const [searchPosts, setSearchPosts] = useState('');
    const [postComment, setPostComment] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [curSort, setCurSort] = useState('오래된순');
    const [searchOption, setSearchOption] = useState('제목');

    const { selectTab } = useOutletContext<OutletProps>();
    const [data, isLoading] = useGetPost(postPage - 1, limit, selectTab);

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
                let result = reversePosts.filter((post: any) => post.title.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('tipReadPost');
                    if (readPost?.includes(post.id)) {
                        return { ...post, read: true };
                    } else {
                        return post;
                    }
                });
                setUsePosts(writedResult);
            }
            if (searchOption === '글쓴이') {
                let result = reversePosts.filter((post: any) => post.nickName.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('tipReadPost');
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

    const goWriting = (): void => {
        if (Object.keys(userInfo).length) {
            navigate('/write', { state: '/tip' });
        } else {
            navigate('/login');
            notifyError('글작성을 하려면 로그인해야합니다.');
        }
    };

    const AddReadPost = (id: number) => {
        let readPost: any = localStorage.getItem('tipReadPost');
        if (readPost?.length) {
            let newReadPost: any = [...JSON.parse(readPost), id];
            localStorage.setItem('tipReadPost', JSON.stringify(newReadPost));
        } else {
            localStorage.setItem('tipReadPost', JSON.stringify([id]));
        }
    };

    const handleChangeSearchOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(e.target.value);
    };

    useEffect(() => {
        let sortUsePosts = [...postsRecoil];
        setUsePosts(sortUsePosts.sort((a, b) => b.id - a.id));
    }, [postsRecoil]);

    // useEffect(() => {
    //     const readPost = localStorage.getItem('tipReadPost');
    //     const newPosts = reversePosts.map((item: any) => {
    //         if (readPost?.includes(item.id)) {
    //             return Object.assign(
    //                 {},
    //                 item,
    //                 { read: true },
    //                 { nickName: RandomNickname() },
    //                 { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
    //             );
    //         } else {
    //             return Object.assign(
    //                 {},
    //                 item,
    //                 { nickName: RandomNickname() },
    //                 { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
    //             );
    //         }
    //     });
    //     setReversePosts(newPosts);
    //     setUsePosts(newPosts);
    // }, [postsRecoil]);

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
            let sortUsePosts = [...usePosts];
            switch (name) {
                case '최신순':
                    setUsePosts(sortUsePosts.sort((a, b) => a.id - b.id));
                    break;
                case '오래된순':
                    setUsePosts(sortUsePosts.sort((a, b) => b.id - a.id));
                    break;
            }
        }
    };

    return (
        <Background>
            <BoardContainer>
                <BoardTopWrapper>
                    {/* <BoardTitleText>TIP게시판</BoardTitleText> */}
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
                                placeholder={`${searchOption} 검색`}
                                onChange={onSearch}
                                onKeyPress={(e) => handleSearch(e)}
                            />
                        </SearchBox>
                    </SearchContainer>
                ) : null}

                <TableBoard usePosts={data?.content} offset={offset} limit={limit} />
                <MobileBoard usePosts={usePosts} offset={offset} limit={limit} />
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

export default TipBoard;

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
    width: 100%;
    max-width: 1200px;
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
    border-top: 1px solid #a7a7a7;
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
    width: 100%;
    :focus {
        outline: none;
    }
`;

const SelectBox = styled.select`
    border: none;
    font-size: 1rem;
    padding: 10px 0;
    text-align: center;
    :focus {
        outline: none;
    }
`;

const CustomTableContainer = styled(TableContainer)`
    border-top: 1px solid #a7a7a7;
    border-bottom: 1px solid #a7a7a7;
    border-radius: 0;
    max-height: 600px;
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

const StyledAvatar = styled(Avatar)`
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
    color: ${(props) => (props.read ? '#770088' : '#374151')};
    text-decoration: none;
    font-size: 0.875rem;
    ${({ theme }) => theme.device.tablet} {
        font-size: 0.95rem;
    }
`;

const PostUserInfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: auto;
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
            main: '#374151',
        },
    },
});

const tableTopTextStyle = {
    color: '#374151',
    textAlign: 'center',
    fontSize: '0.875rem',
    padding: '12px 0px',
};

const tableTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#374151',
    textAlign: 'center',
    fontSize: '0.875rem',
    maxWidth: '130px',
};

const titleTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#374151',
    textAlign: 'center',
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    ':hover': {
        fontWeight: 'bold',
    },
};
