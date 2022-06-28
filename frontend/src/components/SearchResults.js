import { Button, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';

const Card = styled.div`
    background-color: white;
    width: 1187;
    height: 542px;
    border-radius: 5px;
    margin: 30px 100px;
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
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    padding: '9px 13px 11px 16px',
  });

const SearchResults = () => {
    return (
        <>
            <Background>
                <Card>
                    <Typography sx={{ color: '#575757', padding: '10px', borderBottom: '1px solid #EAEAEA', fontWeight: 'bold'}}>검색 결과</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F6F6F6', borderRight: '1px solid #EAEAEA' ,width: '30%', height: '100%'}}>
                        <Img alt="complex" src={image} />
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', padding: '9px 18px 16px 0' }}>
                            <Typography sx={{ fontSize: 14, color: '#4A4A4A', fontWeight: 'bold' }}>
                                우럭
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: '#A5A5A5' }} color="text.secondary">
                                (15)
                            </Typography>
                        </CardContent>
                    {/* <CardActions>
                        <Button variant='outlined' sx={{ borderRadius: '1px', color: '#949494', borderColor: '#D8D8D8'}}>조건 삭제</Button>
                    </CardActions> */}
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default SearchResults;