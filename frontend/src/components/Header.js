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
import { useNavigate } from 'react-router-dom';
import Logo from '../img/SAMUKSA.png';

// const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {

    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    };

    const goFishCal = () => {
        navigate('/test');
    }

    return (
        <AppBar position="sticky" sx={{ boxShadow: 'none', border: '1px solid #D8D8D8' }}>
            <Container maxWidth="xl" sx={{ backgroundColor: 'white', maxWidth: '3000px' }}>
                <Toolbar disableGutters>
                    <SetMealIcon sx={{ display: { xs: 'flex' }, mr: 1, color: '#6EA5F8', fontSize: '2rem' }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={goMain}
                        sx={{
                        mr: 2,
                        display: { xs: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'sans-serif',
                        fontWeight: 900,
                        color: '#6EA5F8',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontSize: '2rem'
                        }}
                    >
                        Samuksa
                    </Typography>
                    {/* <img src={Logo} alt="logo" style={{ display: 'flex', cursor: 'pointer', flexWrap: 'nowrap'}}/> */}
                    <Typography variant='button' sx={{ color: '#7a7a7a', mr: 2, cursor: 'pointer' }} onClick={goFishCal}>수산물 계산기</Typography>
                    <Typography variant='button' sx={{ color: '#7a7a7a' }}>시세 검색</Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;