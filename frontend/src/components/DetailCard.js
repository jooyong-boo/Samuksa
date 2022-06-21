import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid } from '../../node_modules/@mui/material/index';
import image from '../img/contemplative-reptile.jpeg';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

// complex Grid ---------
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

//-----------------------

// table UI ---------------------------------------------------------------

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

import DetailPaper from './DetailPaper';
import DetailAccordion from './DetailAccordion';

// ------------------------------------------------------------------------


export default function DetailCard({ fishDetailList }) {

    const [expanded, setExpanded] = useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };
    

        console.log(fishDetailList)
        const totalPrice = fishDetailList[0].totalPrice;
    return (
        <div>
        {/* <Grid container direction="row" justifyContent="center" alignItems="stretch">
                {fishDetailList.map((fishDetailList, i) => {
                    const { area, areaFrom, farmType, fishName, maxWeight, minWeight, price, serving, size } = fishDetailList.fishRecommendInfos[i];
                    console.log(area, areaFrom, farmType, fishName, maxWeight, minWeight, price, serving, size);
                    return (
                        <Grid item xs={4} key={i}>
                            <Card sx={{ minWidth: 100, mr: 1, mt: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="80"
                                    image={image}
                                    alt={fishName}
                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
                                    <Typography variant="h5" component="div" display={"flex"}>
                                        {fishName}
                                            <Typography sx={{ color: 'blue'}}>
                                                ({size})
                                            </Typography>
                                    </Typography>
                                    <Typography>
                                        파는곳: {area}
                                    </Typography>
                                    <Typography>
                                        최대중량: {maxWeight}g
                                    </Typography>
                                    <Typography>
                                        최소중량: {minWeight}g 
                                    </Typography>
                                    <Typography>
                                        수량: {serving}
                                    </Typography>
                                    <Typography>
                                        원산지: {areaFrom}({farmType})
                                    </Typography>
                                    <Typography variant="body2">
                                    <br />
                                    {price}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
        </Grid> */}
            <DetailPaper />
                <Typography variant='h6' sx={{ mr: 5, mt: 3}} style={{ textAlign: 'end' }}>Total: {totalPrice}원</Typography>
            {/* <DetailAccordion /> */}
    </div>
  );
}


