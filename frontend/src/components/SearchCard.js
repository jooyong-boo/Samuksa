import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { fishDataState } from '../store/atom';
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
    const [fishData, setFishData] = useRecoilState(fishDataState);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };

    const responseData = useQuery('fish', getFishRecommendData);
    useEffect(() => {
      setFishData(responseData)
    }, [responseData])

    return (
      <div>
        {fishData.map((fishdata) => {
          const { id, heading, details, total } = fishdata;
          return (
            <Accordion
              expanded={expanded === id}
              key={id}
              onChange={handleChange(id)}
              style={{ marginTop: 1 , marginBottom: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
              <Typography>{heading.join(` + `)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DetailCard details={details} heading={heading} total={total} />
              </AccordionDetails>
              <Typography variant='h6' sx={{ mr: 5}} style={{ textAlign: 'end' }}>Total: {total}원</Typography>
            </Accordion>
          );
        })}
      </div>
    );
  }

export default SearchCard;