import './App.css';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';
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
import RequireAuth from './components/utils/RequireAuth';
import PublicAuth from './components/utils/PublicAuth';

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/login"
                    element={
                        <PublicAuth>
                            <LoginPage />
                        </PublicAuth>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicAuth>
                            <RegisterPage />
                        </PublicAuth>
                    }
                />
                <Route
                    path="/myinfo"
                    element={
                        <RequireAuth>
                            <UserInfoPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/myinfo/profile"
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/board" element={<BoardPage />}>
                    <Route path="review" element={<ReviewPage />} />
                    <Route path="tip" element={<TipPage />} />
                    <Route path="review/post/:id" element={<PostViewPage />} />
                    <Route path="tip/post/:id" element={<PostViewPage />} />
                </Route>
                <Route
                    path="/write"
                    element={
                        <RequireAuth>
                            <WritingPage />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
