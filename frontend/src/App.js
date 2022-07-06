import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Loading from './components/Loading';
import DetailRecommendPage from './pages/DetailRecommendPage';
import TestPage from './pages/TestPage';
import { createTheme, ThemeProvider  } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'GangwonEdu_OTFBoldA', Pretendard, 'Noto Sans KR', Pretendard, nanumsquare ,sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen"
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Suspense fallback={<Loading/>}>
      <Routes>
        {/* <Route path='/' element={<MainPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/detail' element={<DetailRecommendPage />} /> */}
        <Route path='/' element={<TestPage/>} />
      </Routes>
    </Suspense>
    </ThemeProvider>
  );
}

export default App;


