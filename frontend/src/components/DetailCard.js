import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '../../node_modules/@mui/material/index';
import image from '../img/contemplative-reptile.jpeg';



export default function DetailCard({heading, details}) {
  return (
    <div style={{ display: 'flex' }}>
        {heading.map((heading, i) => {
            return (
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
                        {details[i]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            )
        })}
    </div>
  );
}
