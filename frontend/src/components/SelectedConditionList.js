import { Avatar, Button, ButtonBase, CardActions, CardContent, Checkbox, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Slider, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';

const Card = styled.div`
    background-color: white;
    width: 295px;
    height: 464px;
    border-radius: 5px;
    margin: 30px 100px;
    position: relative;
`

const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #ebecee;
`;

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    padding: '9px 13px 11px 16px',
  });

const SelectedConditionList = () => {
    return (
        <Background>
            <Card>
                <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>선택한 조건 목록</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F6F6F6'}}>
                        <Img alt="complex" src={image} />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '9px 18px 16px 0' }}>
                        <div style={{ display: 'flex' }}>
                            <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                우럭
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: '#A5A5A5' }}>
                                (2~3인)
                            </Typography>
                        </div>
                        <Typography sx={{ fontSize: 14, color: '#A5A5A5' }} color="text.secondary" gutterBottom>
                            자연산, 양식
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='outlined' sx={{ borderRadius: '1px', color: '#949494', borderColor: '#D8D8D8'}}>조건 삭제</Button>
                    </CardActions>
                </div>
                <Button variant='contained' sx={{ display: 'inline-block', position: 'absolute', backgroundColor: '#0098EE',fontSize: 12 , fontWeight: 900, width: '274px', bottom: '9px', left: '10px' }} >조합 검색</Button>
            </Card>
        </Background>
    );
};

export default SelectedConditionList;