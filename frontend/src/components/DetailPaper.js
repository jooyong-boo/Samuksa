import React from 'react';
import { Paper, Grid, ButtonBase, Typography } from '@mui/material';
import styled from 'styled-components';
import image from '../img/contemplative-reptile.jpeg';
import DetailAccordion from './DetailAccordion';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const DetailPaper = () => {
    return (
        <div>
            <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 800,
                flexGrow: 1,
                // backgroundColor: (theme) =>
                // theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                marginBottom: '10px'
            }}
            >
                <Grid container spacing={6}>
                    <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={image} />
                    </ButtonBase>
                    </Grid>
                    <Grid item xs={6} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Standard license
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Full resolution 1920x1080 • JPEG
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ID: 1030114
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            Remove
                        </Typography>
                        <Typography variant="subtitle1">
                        $19.00
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <DetailAccordion />
        </div>
    );
};

export default DetailPaper;