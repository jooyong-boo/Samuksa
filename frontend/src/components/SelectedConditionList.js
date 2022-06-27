import { Avatar, Button, ButtonBase, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    margin: 30px 100px;
    /* border: 1px solid black; */
    /* border-bottom: '1px solid #EAEAEA'; */
    /* border: 1px solid black; */
`

const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #ebecee;
    /* padding: 30px 100px; */
    /* box-shadow: 4px 8px 16px 0 rgba(0,0,0,0.1);
    transform: translate3d(0, 0, 0); */
`;

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '50px',
    maxHeight: '50px',
  });

const SelectedConditionList = () => {
    return (
        <Background>
            <Card>
                <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>선택한 조건 목록</Typography>
            </Card>
        </Background>
    );
};

export default SelectedConditionList;