import { Accordion, AccordionSummary, AccordionDetails, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fishDetailRecommendInfo } from '../store/atom';

const DetailRecommend = () => {
    const navigate = useNavigate();

    const onBack = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    const detailRecommends = useRecoilValue(fishDetailRecommendInfo);
    console.log(detailRecommends);
    return (
        <div>
            {detailRecommends.map((detailRecommend, i) =>{
                const { fishName, area, areaFrom, farmType, size, maxWeight, minWeight, serving, price } = detailRecommend;
                console.log(detailRecommend);
                return (
                    <div>
                    <Typography>{i + 1}번째</Typography>
                    <TableContainer component={Paper} key={i} sx={{ border: '1px solid black', marginBottom: '3rem' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell variant="head">이름</TableCell>
                                    <TableCell>{fishName}({size})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">가격</TableCell>
                                    <TableCell>{price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">수량</TableCell>
                                    <TableCell>{serving}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">원산지</TableCell>
                                    <TableCell>{areaFrom}({farmType})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">중량</TableCell>
                                    <TableCell>{minWeight/1000}~{maxWeight/1000}kg</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">위치</TableCell>
                                    <TableCell>{area}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                )
            })}
            <Button variant='contained' onClick={onBack}>뒤로가기</Button>
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