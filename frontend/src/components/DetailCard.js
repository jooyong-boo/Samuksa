import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid } from '../../node_modules/@mui/material/index';
import image from '../img/contemplative-reptile.jpeg';



export default function DetailCard({heading, details}) {
  return (
    <Grid container>
        {heading.map((heading, i) => {
            return (
                <Grid item xs={4}>
                    <Card sx={{ minWidth: 100, mr: 2 }}>
                        <CardMedia
                            component="img"
                            height="80"
                            image={image}
                            alt={heading}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {heading}
                            </Typography>
                            <Typography variant="body2">
                            <br />
                            {details[i]}원
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })}
    </Grid>
  );
}
