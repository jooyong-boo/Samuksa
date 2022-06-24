import { Accordion, AccordionSummary, AccordionDetails, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import React from 'react';

const DetailRecommend = () => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableRow>
                        <TableCell variant="head">Header 1</TableCell>
                        <TableCell>Cell 1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head">Header 1</TableCell>
                        <TableCell>Cell 2</TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DetailRecommend;

{/* <Accordion
expanded={expanded === i}
onChange={handleChange(i)}
style={{ marginTop: 0 , marginBottom: 10, border: '1px solid black', borderRadius: '5px', backgroundColor: '#47B5FF' }}
// variant="contained"
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
              {fishRecommendInfos.map((fishRecommendInfo, i) => {
                const { fishName, serving, minWeight, maxWeight, areaFrom, price } = fishRecommendInfo;
                return (
                  <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >   
                      <TableCell component="th" scope="row">{fishName}<Img alt="complex" src={image} /></TableCell>
                      <TableCell>{serving}</TableCell>
                      <TableCell>{minWeight/1000}~{maxWeight/1000}kg</TableCell>
                      <TableCell>{areaFrom}</TableCell>
                      <TableCell>{price.toLocaleString('ko-KR')}원</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
          </Table>
      </TableContainer>
        <Typography variant='h6' sx={{ mr: 5, mt: 3}} style={{ textAlign: 'end' }}>Total: {totalPrice.toLocaleString('ko-KR')}원</Typography>
  </div>
</AccordionDetails>
</Accordion> */}