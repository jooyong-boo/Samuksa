import React, { useState } from 'react';
import { Stack, ListItem, TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';
import { useRecoilValue } from 'recoil';
import { fishDataState } from '../store/atom';

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
    const fishData = useRecoilValue(fishDataState);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <div>
        {fishData.map((fishdata) => {
          const { id, heading, details, total } = fishdata;
          return (
            <Accordion
              expanded={expanded === id}
              key={id}
              onChange={handleChange(id)}
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
              <Typography sx={{ mr: 5, fontSize: 20}} style={{ textAlign: 'end' }}>총 가격:{total}원</Typography>
            </Accordion>
          );
        })}
      </div>
    );
  }

export default SearchCard;