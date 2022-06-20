import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid } from '../../node_modules/@mui/material/index';
import image from '../img/contemplative-reptile.jpeg';




// fishName: "광어"
// fishYeild: 33
// maxWeight: 1000
// minWeight: 500
// price: 10000
// serving: 0
// size: "소"

export default function DetailCard({ fishReList, totalPrice }) {
  return (
    <div>
        <Grid container>
            {fishReList.map((fishReList, i) => {
                const { fishName, size, price, fishYeild, maxWeight, minWeight, serving,} = fishReList;
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
                                    수율: {fishYeild}%
                                </Typography>
                                <Typography>
                                    최대중량: {maxWeight.toLocaleString()}g
                                </Typography>
                                <Typography>
                                    최소중량: {minWeight.toLocaleString()}g 
                                </Typography>
                                <Typography variant="body2">
                                <br />
                                {price.toLocaleString()}원
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
        <Typography variant='h6' sx={{ mr: 5, mt: 3}} style={{ textAlign: 'end' }}>Total: {totalPrice.toLocaleString()}원</Typography>
    </div>
  );
}


