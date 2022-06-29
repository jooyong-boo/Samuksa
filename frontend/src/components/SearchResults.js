import { Avatar, CardContent, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import SearchResultTable from './SearchResultTable';

const Card = styled.div`
    background-color: white;
    width: 1187;
    height: 542px;
    border-radius: 5px;
    margin: 30px 100px;
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
    padding: '9px 13px',
  });

const SearchResults = () => {
    return (
        <>
            <Background>
                <Card>
                    <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 결과</Typography>
                    <div style={{ display: 'flex' }}>
                        <div style={{ borderBottom: '1px solid #F6F6F6', borderRight: '1px solid #EAEAEA' , width: '25%', height: '600px' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #F6F6F6', height: '70px', '&:last-child': { pb: 0 }, padding: '0 10px 0 0' }}>
                                <Img alt="complex" src={image} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                        우럭
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, color: '#A5A5A5' }} color="text.secondary">
                                        (15)
                                    </Typography>
                                </div>
                            </CardContent>
                        </div>
                        {/* <div style={{ width: '15%' }}>
                            <Paper
                                sx={{
                                    p: 2,
                                    margin: 'auto',
                                    maxWidth: 1200,
                                    maxHeight: 700,
                                    flexGrow: 1,
                                    backgroundColor: '#F8F8F8',
                                    padding: 0,
                                    // display: 'inline-block',
                                }}
                            >
                                <List
                                    sx={{
                                        width: '100%',
                                        // maxWidth: 500,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'scroll',
                                        maxHeight: 300,
                                        borderBottom: '1px solid black'
                                    }}
                                    subheader={<li />}
                                    >
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                                    <div style={{ display: 'flex', backgroundColor: 'white', height: '100%' }} key={i}>
                                        <ListItem key={i} sx={{ paddingLeft: 0 }}>
                                            <ListItemText primary={`광어`} secondary={`수율(30%)`} />
                                        </ListItem>
                                    </div>
                                    ))}
                                </List>
                            </Paper>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Typography>광어</Typography>
                                    <Typography>(2인분)</Typography>
                                </div>
                            </div>
                        </div> */}
                        <div style={{ width: '75%', height: '100%'}}>
                            <div style={{ width: '90%', margin: 'auto', height: '490px', overflow: 'auto' }}>
                        <Typography sx={{ color: '#010000', paddingTop: '18px', fontWeight: 'bold', fontSize: '16px'}}>수산물 견적</Typography>
                        <Typography variant='body2' sx={{ color: '#949494', fontSize: '11px', mb: '11px' }}>실제 시세과 상이할 수 있습니다.</Typography>
                            <SearchResultTable />

                            </div>
                        </div>
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default SearchResults;