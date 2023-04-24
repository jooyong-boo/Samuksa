import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getPostState, reviewPostPageState } from '../../store/atom';
import Pagination from 'components/community/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { MobileBoard, SearchMenu, SortMenu, TableBoard, WriteBtn } from 'components/community/FreeBoard';
import { useOutletContext } from 'react-router-dom';
import useGetPost from 'api/hooks/post/useGetPost';
import Loading from 'components/common/Loading';
import { Button } from 'components/common';

interface OutletProps {
    selectTab: number;
}

const ReviewPage = () => {
    const [limit, setLimit] = useState(10);
    const [postPage, setPostPage] = useRecoilState<number>(reviewPostPageState); //
    const offset = (postPage - 1) * limit;
    const postsRecoil = useRecoilValue<any[]>(getPostState);
    const [posts, setPosts] = useState(postsRecoil);
    const [usePosts, setUsePosts] = useState<any[]>(postsRecoil);
    const [open, setOpen] = useState(false);
    const [curSort, setCurSort] = useState('최신순');

    const { selectTab } = useOutletContext<OutletProps>();
    const [data, isLoading] = useGetPost(postPage - 1, limit, selectTab);

    const openSearch = () => {
        setOpen(!open);
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
                    <WriteBtn />
                    <div>
                        <SearchBtn variant="outlined" onClick={openSearch}>
                            <SearchIcon />
                        </SearchBtn>
                        <SortBtn
                            variant="outlined"
                            aria-controls={Menuopen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Menuopen ? 'true' : undefined}
                            onClick={handleOpenNavMenu}
                        >
                            <ListIcon />
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
                {open ? <SearchMenu posts={posts} setUsePosts={setUsePosts} /> : null}
                {!isLoading ? (
                    <>
                        <TableBoard usePosts={data?.content} offset={offset} limit={limit} />
                        <MobileBoard usePosts={data?.content} offset={offset} limit={limit} />
                    </>
                ) : (
                    <Loading />
                )}
                <PaginationStack>
                    <Pagination
                        total={data?.content.length}
                        limit={limit}
                        postPage={postPage}
                        setPostPage={setPostPage}
                    />
                </PaginationStack>
            </BoardContainer>
        </Background>
    );
};

const Background = styled.div`
    background-color: white;
    width: 95%;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
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
    ${({ theme }) => theme.device.tablet} {
        align-items: flex-start;
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
    ${({ theme }) => theme.device.mobile} {
        flex-wrap: wrap;
    }
`;

const SearchBtn = styled(Button)`
    margin-right: 0.3rem;
    border-color: #a7a7a7;
    color: #a7a7a7;
    font-weight: 700;
    width: 6rem;
    height: 2.5rem;
    border-radius: 7px;
`;

const SortBtn = styled(SearchBtn)`
    margin-right: 0;
`;

const SortTypography = styled(Typography)`
    font-size: 0.8rem;
    color: #374151;
    font-weight: 500;
    margin-left: 0.1rem;
`;

const PaginationStack = styled(Stack)`
    width: 100%;
    align-items: center;
    margin: auto;
    margin-top: 1rem;
    overflow-x: hidden;
`;

export default ReviewPage;
