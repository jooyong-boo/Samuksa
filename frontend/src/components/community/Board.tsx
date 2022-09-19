import { Box, Tab, Tabs } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { tabState } from '../../store/atom';

const Board = () => {
    const [selectTab, setSelectTab] = useRecoilState(tabState);
    const navigate = useNavigate();
    const location = useLocation();

    const tab = [
        {
            id: 0,
            label: '리뷰게시판',
            path: '/board/review',
        },
        {
            id: 1,
            label: 'TIP게시판',
            path: '/board/tip',
        },
    ];

    const handleChangePage = (path: string) => {
        navigate(path);
    };

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setSelectTab(newValue);
    };

    useEffect(() => {
        if (location.pathname === '/board/review') {
            setSelectTab(0);
        } else if (location.pathname === '/board/tip') {
            setSelectTab(1);
        }
    }, [location]);

    return (
        <Background>
            <BoardBox>
                <Tabs value={selectTab} onChange={handleChange} centered>
                    {tab.map(({ id, label, path }) => {
                        return (
                            <BoardTab
                                label={label}
                                key={id}
                                onClick={() => {
                                    handleChangePage(path);
                                }}
                            />
                        );
                    })}
                </Tabs>
                <Outlet />
            </BoardBox>
        </Background>
    );
};

export default Board;

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 100px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: auto;
`;

const BoardBox = styled(Box)`
    width: 95%;
    height: 95%;
    background-color: white;
    margin: auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const BoardTab = styled(Tab)`
    font-size: 1rem;
    padding: 0;
    :focus {
        color: #0098ee;
    }
    :hover {
        color: #0098ee;
    }
`;
