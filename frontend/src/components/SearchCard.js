import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fishDataState, fishRecommendUnions } from '../store/atom';
import styled from 'styled-components';

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
    const fishData = useRecoilValue(fishDataState)
  
    const handleChange = panel => (event, isExpanded) => {
      // console.log(panel)
      // console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };
    
    // const total = fishData.recommendTotalCount; // recommendCount

    const fishList = fishData.fishRecommendUnions; //fishRecommendCombination
    const recommendUnionCount = fishData.recommendUnionCount;
    const recommendTotalCount = fishData.recommendTotalCount;
    
    console.log(fishData)
    
    return (
      <div>
        <SearchTopBanner>{recommendUnionCount}개의 추천 목록이 있고 총 {recommendTotalCount}개의 조합이 있어요 </SearchTopBanner>
        <Typography sx={{ textAlign: 'center' }}>{recommendTotalCount}개의 조합이 있어요.</Typography>
        {fishList.map((fishList, i) => {
          const { combinationName, combinationSize, fishRecommendCombinations } = fishList;
          {/* console.log(fishRecommendCombinations); */}
          const fishDetailList = fishRecommendCombinations;
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
                  fishDetailList={fishDetailList} 
                  combinationSize={combinationSize}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
        {/* <Button variant="contained" sx={{ margin: 'auto', display: 'block', marginTop: '1rem' }}>더보기(예정)</Button> */}
        {fishList.length > 5 ? <Button variant="contained" sx={{ margin: 'auto', display: 'block', marginTop: '1rem' }}>더보기(예정)</Button> : null }
      </div>
    );
  }

export default SearchCard;