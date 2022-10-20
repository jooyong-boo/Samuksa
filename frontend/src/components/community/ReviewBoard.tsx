import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getPostState, reviewPostPageState } from '../../store/atom';
import { userInfoState } from '../../store/user';
import Pagination from './Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import MobileBoard from './FreeBoard/MobileBoard';
import SearchMenu from './FreeBoard/SearchMenu';
import SortMenu from './FreeBoard/SortMenu';
import TableBoard from './FreeBoard/TableBoard';

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
    const [usePosts, setUsePosts] = useState<any[]>(postsRecoil);
    const [open, setOpen] = useState(false);
    const [curSort, setCurSort] = useState('최신순');

    const openSearch = () => {
        setOpen(!open);
    };

    const goWriting = () => {
        if (Object.keys(userInfo).length) {
            navigate('/write', { state: '/review' });
        } else {
            navigate('/login');
            notifyError('글작성을 하려면 로그인해야합니다.');
        }
    };

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const Menuopen = Boolean(anchorElNav);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
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
                        <SortMenu
                            setAnchorElNav={setAnchorElNav}
                            curSort={curSort}
                            setCurSort={setCurSort}
                            usePosts={usePosts}
                            setUsePosts={setUsePosts}
                            anchorElNav={anchorElNav}
                            Menuopen={Menuopen}
                        />
                    </div>
                </BoardTopWrapper>
                {open ? <SearchMenu posts={posts} notifyError={notifyError} setUsePosts={setUsePosts} /> : null}
                <TableBoard usePosts={usePosts} offset={offset} limit={limit} />
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
    ${({ theme }) => theme.device.mobile} {
        flex-wrap: wrap;
    }
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

const PaginationStack = styled(Stack)`
    width: 100%;
    align-items: center;
    margin: auto;
    margin-top: 1rem;
    overflow-x: hidden;
`;
