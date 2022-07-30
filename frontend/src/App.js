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
import WritingPage from './pages/WritingPage';
import PostViewPage from './pages/PostViewPage';

const theme = createTheme({
    typography: {
        fontFamily:
            "Pretendard, 'Noto Sans KR', nanumsquare ,sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen",
    },
});

if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function no_console() {};
}

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
                    <Route path="/write" element={<WritingPage />} />
                    <Route path="/post/:id" element={<PostViewPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
