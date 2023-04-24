import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
    withCredentials: true,
};

export const instanceAuth = axios.create(axiosConfig);

export const instance = axios.create({
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
});

export const instanceRecommand = axios.create({
    baseURL: process.env.REACT_APP_Samuksa_URL,
});

instanceAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

instanceAuth.interceptors.response.use((res) => {
    if (res.headers[`access-token`]) {
        const token = res.headers[`access-token`];
        localStorage.setItem('jwtToken', token);
    }
    return res;
});
