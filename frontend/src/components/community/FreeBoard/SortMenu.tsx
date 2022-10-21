import { Menu, MenuItem, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const SortPages = [
    {
        id: 1,
        name: '최신순',
        active: false,
    },
    {
        id: 2,
        name: '추천순',
        active: false,
    },
    {
        id: 3,
        name: '댓글순',
        active: false,
    },
    {
        id: 4,
        name: '조회순',
        active: false,
    },
    {
        id: 5,
        name: '오래된순',
        active: false,
    },
];

interface SortMenuProps {
    setAnchorElNav: Dispatch<SetStateAction<any>>;
    curSort: string;
    setCurSort: Dispatch<SetStateAction<string>>;
    usePosts: any[];
    setUsePosts: Dispatch<SetStateAction<any[]>>;
    anchorElNav: null | HTMLElement;
    Menuopen: boolean;
}

const SortMenu = ({
    setAnchorElNav,
    curSort,
    setCurSort,
    usePosts,
    setUsePosts,
    anchorElNav,
    Menuopen,
}: SortMenuProps) => {
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
    );
};

export default SortMenu;

const SortMenuItem = styled(MenuItem)`
    width: 80px;
    padding: 1rem 0;
`;

const SortMenuTypography = styled(Typography)`
    font-weight: 400;
    text-align: center;
    width: 100%;
`;
