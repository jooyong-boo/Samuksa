import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DetailAccordion from './DetailAccordion';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fishRecommendUnions } from '../store/atom';


export default function DetailCard({ fishDetailList }) {

    const [expanded, setExpanded] = useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };

    // console.log(fishDetailList);

    // const [fishUnions, setFishUnions] = useRecoilState(fishRecommendUnions);

    // useEffect(() => {
    //   setFishUnions(fishDetailList);
    // }, [fishDetailList]);

    // console.log(fishUnions);

    
        // const totalPrice = fishDetailList[0].totalPrice;
    return (
        <div>
            <DetailAccordion fishDetailList={fishDetailList} />
        </div>
  );
}


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
            {/* <DetailPaper /> */}


