import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import setAuthorizationToken from './components/utils/setAuthorizationToken';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopScrollBtn from './components/common/TopScrollBtn';
import { StyledEngineProvider } from '@mui/styled-engine';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { muiTheme } from './components/styles/muiTheme';
import { styledTheme } from './components/styles/styledTheme';
import { toastTheme } from './components/styles/toastTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();
setAuthorizationToken(localStorage.jwtToken);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <StyledEngineProvider injectFirst>
                        <StyledThemeProvider theme={styledTheme}>
                            <MuiThemeProvider theme={muiTheme}>
                                <ToastContainer toastStyle={toastTheme} />
                                <Header />
                                <App />
                                <TopScrollBtn />
                            </MuiThemeProvider>
                        </StyledThemeProvider>
                    </StyledEngineProvider>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
