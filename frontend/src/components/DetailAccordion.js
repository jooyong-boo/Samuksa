import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

  const rows = [
    createData('광어', 2, '2~3', '국산(양식)', 20000),
    createData('우럭', 1, '1~1.5', '국산(양식)', 20000),
    createData('참돔', 2, '2~3', '국산(양식)', 20000),
    createData('숭어', 1, '1~2', '국산(양식)', 20000),
    createData('연어', 1, '1~3', '유럽산(자연)', 20000),
  ];

const DetailAccordion = () => {
    const [expanded, setExpanded] = useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion
        //   expanded={expanded}
        //   key={i}
        //   onChange={handleChange()}
          style={{ marginTop: 0 , marginBottom: 10, marginRight: 10, marginLeft: 10, border: '1px solid black', borderRadius: '5px', backgroundColor: '#47B5FF' }}
          variant="contained"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            // sx={{ height: '48px' }}
          >
            <Typography>숭어 + 광어</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', borderTop: '1px solid black', borderRadius: '4px'}}>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#F8F8F8' }}>
                        <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">중량(kg)</TableCell>
                        <TableCell align="right">원산지</TableCell>
                        <TableCell align="right">가격(원)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
          </AccordionDetails>
          
        </Accordion>
    );
};

export default DetailAccordion;