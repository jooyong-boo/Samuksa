import { Avatar, ButtonBase, FormControl, Grid, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import image from '../img/contemplative-reptile.jpeg';

const Card = styled.div`
    background-color: white;
    width: 560px;
    height: 460px;
    border-radius: 5px;
    margin: 30px 100px;
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

const DetailedSearchConditions = () => {
    return (
        <Background>
            <Card>
            <Typography sx={{ padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>상세 검색 조건</Typography>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '40%', borderBottom: '1px solid #EAEAEA', borderRight: '1px solid #EAEAEA' }}>
                    <FormControl fullWidth> 
                        <Input 
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div>
                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                maxWidth: 1200,
                                maxHeight: 700,
                                flexGrow: 1,
                                backgroundColor: '#F8F8F8',
                                padding: 0,
                            }}
                        >
                            <List
                                sx={{
                                    width: '100%',
                                    // maxWidth: 500,
                                    bgcolor: 'background.paper',
                                    // position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 374,
                                }}
                                subheader={<li />}
                                >
                                {[0, 1, 2, 3, 4, 5].map((item, i) => (
                                <div style={{ display: 'flex', backgroundColor: '#F4F4F4' }} key={i}>
                                    <ListItemAvatar sx={{ marginTop: '15px', marginLeft: '15px' }}>
                                        <Avatar
                                        // alt={`Avatar n°${value + 1}`}
                                        src={image}
                                        variant= 'square'
                                        />
                                    </ListItemAvatar>
                                    <ListItem key={i}>
                                        <ListItemText primary={`광어`} secondary={`수율(30%)`} />
                                    </ListItem>
                                </div>
                                ))}
                            </List>
                            {/* <Grid container spacing={6}>
                                <Grid item>
                                <ButtonBase sx={{ width: 50, height: 50 }}>
                                    <Img alt="complex" src={image} />
                                </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={1}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle2" component="div">
                                            광어
                                        </Typography>
                                        <Typography gutterBottom variant="caption" component="div">
                                            수율(35%)
                                        </Typography>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid> */}
                        </Paper>
                    </div>
                </div>
                <div style={{ width: '60%' }}>
                    123
                </div>
            </div>
            </Card>
        </Background>
    );
};

export default DetailedSearchConditions;