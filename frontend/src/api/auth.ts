import axios, { AxiosRequestConfig } from 'axios';

type Register = {
    id: string;
    password: string;
    nickName: string;
    email: string;
};

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers = {
            ...config.headers,
            'X-AUTH-TOKEN': token,
        };
    }
    return config;
});

export const signUp = async ({ id, password, nickName, email }: Register) => {
    try {
        const { data } = await instance.post('/user/signUp', null, {
            params: {
                userId: id,
                userName: nickName,
                passwd: password,
                userEmail: email,
            },
        });
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
};

export const login = async ({ userId, passwd }: { userId: string; passwd: string }) => {
    try {
        const { data } = await instance.get('/user/login', {
            params: {
                userId: userId,
                passwd: passwd,
            },
        });
        // console.log(data);
        if (data) {
            localStorage.setItem('jwtToken', data);
            return data;
        }
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const checkIdAxios = async ({ id }: { id: string }) => {
    try {
        const { data } = await instance.post('/user/signUp/existence-id', null, {
            params: { userId: id },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const checkNickNameAxios = async ({ nickName }: { nickName: string }) => {
    try {
        const { data } = await instance.post('/user/signUp/existence-name', null, {
            params: { userName: nickName },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const getUserInfo = async () => {
    try {
        const { data } = await instance.post('/user/user-info');
        // console.log(data);
        return data;
    } catch (err) {
        // console.log(err);
        return err.response.data;
    }
};

export const getWithdrawal = async () => {
    try {
        const { data } = await instance.delete('/user/user-info');
        return data;
    } catch (e) {
        console.log(e);
    }
};
