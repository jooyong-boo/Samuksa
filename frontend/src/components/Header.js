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
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../img/SAMUKSA.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Tooltip } from '@mui/material';

const settings = ['프로필', '회원정보', '게시판', '로그인'];

const Header = () => {
    const navigate = useNavigate();

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
    ]);

    const goMain = () => {
        navigate('/');
        setNAV_ITEMS(NAV_ITEMS.map((item) => ({ ...item, active: false })));
    };

    const goAccount = () => {
        navigate('/login');
    };

    const onClick = useCallback((id) => {
        setNAV_ITEMS(
            NAV_ITEMS.map((item) => (item.id === id ? { ...item, active: true } : { ...item, active: false })),
        );
    }, []);

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
                        <SetMealIcon sx={{ display: { xs: 'flex' }, mr: 1, color: '#6EA5F8', fontSize: '2.5rem' }} />
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
                                        onClick={() => {
                                            onClick(id);
                                        }}
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
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Login" src="/static/images/avatar/2.jpg" />
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={setting === '로그인' ? goAccount : null}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        {/* <AccountCircleIcon
                            onClick={goAccount}
                            sx={{
                                color: '#6EA5F8',
                                verticalAlign: 'middle',
                                width: '30px',
                                height: '40px',
                                cursor: 'pointer',
                            }}
                        /> */}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default React.memo(Header);
