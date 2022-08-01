import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import { createTheme, ThemeProvider } from '@mui/material';
import CalculatorPage from './pages/CalculatorPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardPage from './pages/board/BoardPage';
import WritingPage from './pages/WritingPage';
import PostViewPage from './pages/PostViewPage';
import ReviewPage from './pages/board/ReviewPage';
import TipPage from './pages/board/TipPage';

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
                    <Route path="/board/*" element={<BoardPage />}>
                        <Route path="review" element={<ReviewPage />} />
                        <Route path="tip" element={<TipPage />} />
                    </Route>
                    <Route path="/write" element={<WritingPage />} />
                    <Route path="/post/:id" element={<PostViewPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
