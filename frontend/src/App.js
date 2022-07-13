import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import MainPage from './pages/MainPage';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: "Pretendard, 'Noto Sans KR', nanumsquare ,sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
