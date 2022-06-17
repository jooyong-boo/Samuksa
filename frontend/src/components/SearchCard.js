import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fishDataSelector, fishDataState } from '../store/atom';
import { useQuery } from 'react-query';
import { getFishRecommendData } from '../api/auth';

// const theme = createTheme({
//     root: {
//       width: "100%"
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       flexBasis: "33.33%",
//       flexShrink: 0
//     },
//     secondaryHeading: {
//       fontSize: theme.typography.pxToRem(15),
//       color: theme.palette.text.secondary
//     }
//   });

function SearchCard() {
    const [expanded, setExpanded] = useState(false);
    const fishData = useRecoilValue(fishDataSelector)
    // const [fish, setFish] = useRecoilState(fishDataState);
    console.log(fishData)
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };
    
    // useEffect(() => {
    //   if (fishData) {
    //     setFish(fishData)
    //   }
    //   console.log(fish)
    // }, []);
    
    const total = fishData.recommendCount; // recommendCount
    const fishList = fishData.fishRecommendCombination; //fishRecommendCombination

    console.log(total)
    console.log(fishList)



    return (
      <div>
          <Typography sx={{ textAlign: 'center' }}>{total}개의 조합이 있어요.</Typography>
        {fishList.map((fishList, i) => {
          const { combinationName, totalPrice } = fishList;
          const  fishReList = fishList.fishRecommendLists;
          return (
            <Accordion
              expanded={expanded === i}
              key={i}
              onChange={handleChange(i)}
              style={{ marginTop: 0 , marginBottom: 0, borderTop: '1px solid black' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
              <Typography>{combinationName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DetailCard 
                  fishReList={fishReList} 
                />
              </AccordionDetails>
              <Typography variant='h6' sx={{ mr: 5}} style={{ textAlign: 'end' }}>Total: {totalPrice}원</Typography>
            </Accordion>
          );
        })}
      </div>
    );
  }

export default SearchCard;