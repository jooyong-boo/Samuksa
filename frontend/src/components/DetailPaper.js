// import React from 'react';
// import { Paper, Grid, ButtonBase, Typography, Button } from '@mui/material';
// import styled from 'styled-components';
// import image from '../img/contemplative-reptile.jpeg';
// import { useNavigate } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';
// import { fishDetailRecommendInfo } from '../store/atom';

// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   });

// const DetailPaper = ({ fishRecommendInfos }) => {
//     const setFishRecommendInfos = useSetRecoilState(fishDetailRecommendInfo);
//     const navigate = useNavigate();

//     const onClick = (e) => {
//         e.preventDefault();
//         setFishRecommendInfos(fishRecommendInfos);
//         navigate('/detail');
//     };


//     return (
//         <div>
//             {fishRecommendInfos.map((fishRecommendInfo, i) => {
//                 const { area, areaFrom, farmType, fishName, price, size, minWeight, maxWeight } = fishRecommendInfo;
//                 return (
//                     <Paper
//                         key={i}
//                         sx={{
//                             p: 2,
//                             margin: 'auto',
//                             maxWidth: 1200,
//                             flexGrow: 1,
//                             // backgroundColor: (theme) =>
//                             // theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//                             marginBottom: '10px',
//                             backgroundColor: '#F8F8F8',
//                         }}
//                     >
//                         <Grid container spacing={6}>
//                             <Grid item>
//                             <ButtonBase sx={{ width: 128, height: 128 }}>
//                                 <Img alt="complex" src={image} />
//                             </ButtonBase>
//                             </Grid>
//                             <Grid item xs={6} sm container>
//                             <Grid item xs container direction="column" spacing={2}>
//                                 <Grid item xs>
//                                 <Typography gutterBottom variant="subtitle1" component="div">
//                                     {fishName}({size})
//                                 </Typography>
//                                 <Typography variant="body2" gutterBottom>
//                                     {areaFrom}({farmType})
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {area}
//                                 </Typography>
//                                 </Grid>
//                                 <Grid item>
//                                 <Typography sx={{ cursor: 'pointer' }} variant="body2">
//                                     중량: {minWeight / 1000}~{maxWeight / 1000}kg
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                 {price.toLocaleString('ko-KR')}원
//                                 </Typography>
//                                 </Grid>
//                             </Grid>
//                             </Grid>
//                         </Grid>
//                     </Paper>
//                 )   
//             })}
//             <Button variant='contained' onClick={onClick}>자세히 보기</Button>
//         </div>
//     )
// };

// export default DetailPaper;