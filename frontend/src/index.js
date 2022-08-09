import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import setAuthorizationToken from './components/utils/setAuthorizationToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

setAuthorizationToken(localStorage.jwtToken);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <ToastContainer
                    toastStyle={{
                        backgroundColor: '#F5F5F5',
                        color: '#575757',
                        opacity: '0.9',
                    }}
                />
                <Header />
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
