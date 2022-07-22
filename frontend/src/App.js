import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import { createTheme, ThemeProvider } from '@mui/material';
import CalculatorPage from './pages/CalculatorPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CommunityPage from './pages/CommunityPage';

const theme = createTheme({
    typography: {
        fontFamily:
            "Pretendard, 'Noto Sans KR', nanumsquare ,sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
