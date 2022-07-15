import React, { useState } from 'react';
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

const NAV_ITEMS = [
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
];

const Header = () => {
    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    };

    const goAccount = () => {
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }} style={{ width: '100vw' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }} style={{ width: '95vw' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SetMealIcon sx={{ display: { xs: 'flex' }, mr: 1, color: '#6EA5F8', fontSize: '2.5rem' }} />
                        <Typography variant="h6" component="a" onClick={goMain} sx={{ color: '#6EA5F8', fontWeight: '900', fontSize: '1.7rem', cursor: 'pointer', fontFamily: 'sans-serif' }}>
                            SAMUKSA
                        </Typography>
                    </div>
                    <div>
                        {NAV_ITEMS.map(({ id, name, path }) => {
                            return (
                                <Typography key={id} variant="button" sx={{ mr: 2, ':hover': { color: '#A7A7A7', fontWeight: 'bold', borderBottom: '1px solid #A7A7A7' } }}>
                                    <NavLink to={`${path}`} style={{ textDecoration: 'none', color: '#7a7a7a' }}>
                                        [{name}]
                                    </NavLink>
                                </Typography>
                            );
                        })}
                        <AccountCircleIcon onClick={goAccount} sx={{ color: '#6EA5F8', verticalAlign: 'middle', width: '30px', height: '40px', cursor: 'pointer' }} />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
