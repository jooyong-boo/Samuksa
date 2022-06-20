import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fishDataSelector, fishDataState } from '../store/atom';
import { useQuery } from 'react-query';
import { getFishRecommendData } from '../api/auth';
import styled from 'styled-components';

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

const SearchTopBanner = styled.div`
  display: flex;
  background-color: #DFF6FF;
  width: 100%;
  height: 5vh;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  color: red;
  border: 1px solid black;
`;

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
          <SearchTopBanner>{total}개의 조합이 있어요.</SearchTopBanner>
          <Typography sx={{ textAlign: 'center' }}>{total}개의 조합이 있어요.</Typography>
        {fishList.map((fishList, i) => {
          const { combinationName, totalPrice } = fishList;
          const  fishReList = fishList.fishRecommendLists;
          return (
            <Accordion
              expanded={expanded === i}
              key={i}
              onChange={handleChange(i)}
              style={{ marginTop: 0 , marginBottom: 10, marginRight: 10, marginLeft: 10, border: '1px solid black', borderRadius: '5px', backgroundColor: '#47B5FF' }}
              variant="contained"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                // sx={{ height: '48px' }}
              >
              <Typography>{i + 1}. {combinationName}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'white', borderTop: '1px solid black', borderRadius: '4px'}}>
                <DetailCard 
                  fishReList={fishReList} 
                  totalPrice={totalPrice}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button variant="contained" sx={{ margin: 'auto', display: 'block', marginTop: '1rem' }}>Contained</Button>

      </div>
    );
  }

export default SearchCard;