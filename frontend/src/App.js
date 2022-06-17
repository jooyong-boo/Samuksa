import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import Loading from './components/Loading';

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/search' element={<SearchPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;


