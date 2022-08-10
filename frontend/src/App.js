import './App.css';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Loading from './components/common/Loading';
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
import ProfilePage from './pages/auth/ProfilePage';
import UserInfoPage from './pages/auth/UserInfoPage';

const theme = createTheme({
    typography: {
        fontFamily:
            "Pretendard, 'Noto Sans KR', nanumsquare ,sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen",
    },
});

// if (process.env.NODE_ENV === 'production') {
//     console.log = function no_console() {};
//     console.warn = function no_console() {};
// }

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/myinfo" element={<UserInfoPage />} />
                    <Route path="/myinfo/profile" element={<ProfilePage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/board" element={<BoardPage />}>
                        <Route path="review" element={<ReviewPage />} />
                        <Route path="tip" element={<TipPage />} />
                        <Route path="review/post/:id" element={<PostViewPage />} />
                        <Route path="tip/post/:id" element={<PostViewPage />} />
                    </Route>
                    <Route path="/write" element={<WritingPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
