import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/assets/img/SAMUKSA.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Tooltip } from '@mui/material';
import { useEffect } from 'react';

// const settings = ['프로필', '회원정보', '게시판', '로그인'];

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [NAV_ITEMS, setNAV_ITEMS] = useState([
        {
            id: 1,
            name: '수산물 계산기',
            path: '/calculator',
        },
        {
            id: 2,
            name: '시세 검색',
            path: '/',
        },
        {
            id: 3,
            name: '게시판',
            path: '/board',
        },
    ]);

    const [loginStatus, setLoginStatus] = useState(false);
    const USERS_ITEMS = [
        {
            id: 1,
            name: '로그아웃',
            path: '/',
        },
        {
            id: 2,
            name: '프로필',
            path: '/',
        },
        {
            id: 3,
            name: '회원 정보',
            path: '/',
        },
    ];

    const NON_USERS_ITEMS = [
        {
            id: 1,
            name: '로그인',
            path: '/login',
        },
    ];

    const goMain = () => {
        navigate('/');
        setNAV_ITEMS(NAV_ITEMS.map((item) => ({ ...item, active: false })));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goNavigate = (path) => {
        navigate(`${path}`);
    };

    // const goAccount = () => {
    //     navigate('/login');
    // };

    // const goCommunity = () => {
    //     navigate('/community');
    // };

    useEffect(() => {
        setNAV_ITEMS(
            NAV_ITEMS.map((item) =>
                location.pathname === item.path ? { ...item, active: true } : { ...item, active: false },
            ),
        );
    }, [location]);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }} style={{ width: '100vw' }}>
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}
                    style={{ width: '95vw' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SetMealIcon
                            onClick={goMain}
                            sx={{
                                display: { xs: 'flex' },
                                mr: 1,
                                color: '#6EA5F8',
                                fontSize: '2.5rem',
                                cursor: 'pointer',
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="a"
                            onClick={goMain}
                            sx={{
                                color: '#6EA5F8',
                                fontWeight: '900',
                                fontSize: '1.7rem',
                                cursor: 'pointer',
                                fontFamily: 'sans-serif',
                            }}
                        >
                            SAMUKSA
                        </Typography>
                    </div>
                    <div>
                        {NAV_ITEMS.map(({ id, name, path, active }) => {
                            return (
                                <Typography
                                    key={id}
                                    variant="button"
                                    sx={{
                                        mr: 2,
                                        ':hover': {
                                            color: '#7A7A7A',
                                            fontWeight: 'bold',
                                            borderBottom: '1px solid #A7A7A7',
                                        },
                                    }}
                                >
                                    <NavLink
                                        to={`${path}`}
                                        // onClick={() => {
                                        //     onClick(id);
                                        // }}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#7A7A7A',
                                            fontWeight: active ? 'bold' : '',
                                        }}
                                    >
                                        {name}
                                    </NavLink>
                                </Typography>
                            );
                        })}
                        <Tooltip title="User">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {loginStatus ? (
                                    <AccountCircleIcon
                                        sx={{
                                            color: '#6EA5F8',
                                            verticalAlign: 'middle',
                                            width: '40px',
                                            height: '40px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : (
                                    <AccountCircleIcon
                                        sx={{
                                            color: '#a2a5a9',
                                            verticalAlign: 'middle',
                                            width: '40px',
                                            height: '40px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {(loginStatus ? USERS_ITEMS : NON_USERS_ITEMS).map(({ id, name, path }) => (
                                <MenuItem
                                    key={id}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        goNavigate(path);
                                    }}
                                >
                                    <Typography textAlign="center" variant="button" color="#7A7A7A">
                                        {name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default React.memo(Header);
