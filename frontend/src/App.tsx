import './App.css';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';
import UserInfoPage from './pages/auth/UserInfoPage';
import RequireAuth from './components/utils/RequireAuth';
import PublicAuth from './components/utils/PublicAuth';

const MainPage = lazy(() => import('./pages/MainPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const BoardPage = lazy(() => import('./pages/board/BoardPage'));
const ReviewPage = lazy(() => import('./pages/board/ReviewPage'));
const TipPage = lazy(() => import('./pages/board/TipPage'));
const WritingPage = lazy(() => import('./pages/WritingPage'));
const PostViewPage = lazy(() => import('./pages/PostViewPage'));
const ProfilePage = lazy(() => import('./pages/auth/ProfilePage'));

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
