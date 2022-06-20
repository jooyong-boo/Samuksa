import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid } from '../../node_modules/@mui/material/index';
import image from '../img/contemplative-reptile.jpeg';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// table UI ---------------------------------------------------------------

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

// ------------------------------------------------------------------------


// function BasicTable() {
//     return (

//     );


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
        <Grid container>
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
        </Grid>
        <Typography variant='h6' sx={{ mr: 5, mt: 3}} style={{ textAlign: 'end' }}>Total: {totalPrice}원</Typography>
        <Accordion
            //   expanded={expanded}
            //   key={i}
            //   onChange={handleChange()}
              style={{ marginTop: 0 , marginBottom: 10, marginRight: 10, marginLeft: 10, border: '1px solid black', borderRadius: '5px', backgroundColor: '#47B5FF' }}
              variant="contained"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                // sx={{ height: '48px' }}
              >
              <Typography>111</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'white', borderTop: '1px solid black', borderRadius: '4px'}}>
              <div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
              </AccordionDetails>
            </Accordion>
    </div>
  );
}


