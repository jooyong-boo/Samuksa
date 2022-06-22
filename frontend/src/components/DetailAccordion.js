import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import image from '../img/contemplative-reptile.jpeg';
import styled from 'styled-components';
import DetailPaper from './DetailPaper';
import { useRecoilValue } from 'recoil';
import { fishDataState, fishRecommendUnions } from '../store/atom';

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

const Img = styled('img')({
    margin: '0',
    display: 'block',
    maxWidth: '80px',
    maxHeight: '80px',
});


const DetailAccordion = ({fishDetailList}) => {
    const [expanded, setExpanded] = useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      console.log(panel)
      console.log(isExpanded)
      setExpanded(isExpanded ? panel : false);
    };

    console.log(fishDetailList);

    return (
      <div>
        <DetailPaper />
          {fishDetailList.map((fishDetail, i) => {
            const {combinationName, fishRecommendInfos, totalPrice} = fishDetail;
            console.log(combinationName, fishRecommendInfos, totalPrice)
            return (
              <div>
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
                    <Typography>{i + 1}순위 {combinationName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: 'white', borderTop: '1px solid black', borderRadius: '4px'}}>
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#F8F8F8' }}>
                                <TableRow>
                                <TableCell>이름</TableCell>
                                <TableCell>수량</TableCell>
                                <TableCell>중량(kg)</TableCell>
                                <TableCell>원산지</TableCell>
                                <TableCell>가격(원)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >   
                                    <TableCell component="th" scope="row">{row.name}<Img alt="complex" src={image} /></TableCell>
                                    <TableCell>{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                    <TableCell>{row.carbs}</TableCell>
                                    <TableCell>{row.protein}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                          <Typography variant='h6' sx={{ mr: 5, mt: 3}} style={{ textAlign: 'end' }}>Total: {totalPrice}원</Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            )
          })}
        </div>
    );
};

export default DetailAccordion;