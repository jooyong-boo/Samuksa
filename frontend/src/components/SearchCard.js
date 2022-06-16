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

    const { isLoading, isError, data, error } = useQuery('fish', getFishRecommendData, {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: data => {
        // 성공시 호출
        console.log(data)
        setFishData(data)
      },
      onError: e => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
        console.log(e.message);
      }
    });
    // useEffect(() => {
    //   if (fishData !== data) {
    //     setFishData(data)
    //   }
    //   console.log(fishData)
    // }, [fishData]);
    console.log(data)

    return (
      <div>
        {fishData.map((fishdata, i) => {
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