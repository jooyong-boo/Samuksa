import React, { useState } from 'react';
import { Stack, ListItem } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailCard from './DetailCard';

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
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };
  
    const data = [
      {
        id: "1",
        heading: ["광어"],
        // secondaryHeading: "this is panel 1",
        details: ["10000"]
      },
      {
        id: "2",
        heading: ["광어", "우럭"],
        // secondaryHeading: "this is panel 2",
        details: ["10000" , "20000"]
      },
      {
        id: "3",
        heading: ["광어", "우럭", "참돔"],
        // secondaryHeading: "this is panel 3",
        details: ["10000" , "20000", "30000"]
      },
      {
        id: "4",
        heading: ["광어", "참돔"],
        // secondaryHeading: "this is panel 4",
        details: ["10000" , "30000"]
      }
    ];
  
    return (
      <div>
        {data.map((accordion) => {
          const { id, heading, secondaryHeading, details } = accordion;
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
              <Typography>{heading.join(`+`)}</Typography>
                {/* <Typography>
                  {secondaryHeading}
                </Typography> */}
              </AccordionSummary>
              <AccordionDetails>
                <DetailCard details={details} heading={heading} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    );
  }

export default SearchCard;