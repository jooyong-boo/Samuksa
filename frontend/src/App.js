import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Loading from './components/Loading';
import DetailRecommendPage from './pages/DetailRecommendPage';

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/detail' element={<DetailRecommendPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;


