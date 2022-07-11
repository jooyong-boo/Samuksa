import React from 'react';
import Header from './Header';
import SearchConditions from './SearchConditions';
import DetailedSearchConditions from './DetailedSearchConditions';
import SelectedConditionList from './SelectedConditionList';
import SearchResults from './SearchResults';
import styled from 'styled-components';
import TopStepper from './TopStepper';
import { Button } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 33px;
`;

const PositionContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 100;
  z-index: 1000;

  // 데스크탑
  @media screen and (min-width: 480px) {
    right: 4%;
  }
`;

const Main2 = () => {
    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <>
            <Header />
            <Background>
                <SearchConditions />
                <PositionContainer>
                    <Button variant='contained' sx={{ width: '120px', borderRadius: '50px', borderColor: '#D8D8D8', position: 'absolute', top: 4, right: 0, backgroundColor: '#0098EE', boxShadow: 'none', ":hover": { boxShadow: 'none' } }} onClick={moveTop}>Top<ArrowDropUpIcon/></Button> 
                </PositionContainer>
            </Background>
        </>
    );
};

export default Main2;
