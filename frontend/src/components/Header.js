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
import { Button } from '@mui/material';

// const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {

    const navigate = useNavigate();

    const goMain = () => {
        navigate('/');
    };

    const goFishCal = () => {
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none' }} style={{ width: '100vw' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }} style={{ width: '90vw' }}>
            <div style={{ display: 'flex' }}>
                <SetMealIcon sx={{ display: { xs: 'flex' }, mr: 1, color: '#6EA5F8', fontSize: '2.5rem' }} />
                <Typography variant="h6" component="a" onClick={goMain} sx={{ color: '#6EA5F8', fontWeight: '900', fontSize: '1.7rem', cursor: 'pointer', fontFamily: 'sans-serif' }}>
                    Samuksa
                </Typography>
            </div>
            <div>
                <Typography variant='button' sx={{ color: '#7a7a7a', mr: 2, cursor: 'pointer', ":hover": { color: '#A7A7A7', borderBottom: '1px solid #A7A7A7' }, ":active": { color: '#A7A7A7', fontWeight: 'bold', borderBottom: '1px solid #A7A7A7' } }} onClick={goFishCal}>수산물 계산기</Typography>
                <Typography variant='button' sx={{ color: '#7a7a7a', ":hover": { color: '#A7A7A7', fontWeight: 'bold', borderBottom: '1px solid #A7A7A7'} }}>시세 검색</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Header;