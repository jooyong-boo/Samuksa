import axios from 'axios';
import { reject } from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        config.headers['X-AUTH-TOKEN'] = null;
        return config;
    }
    config.headers['X-AUTH-TOKEN'] = `${token}`;
    return config;
});

export const signUp = async ({ id, password, nickName, email }) => {
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

export const login = async ({ userId, passwd }) => {
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

export const checkIdAxios = async ({ id }) => {
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

export const checkNickNameAxios = async ({ nickName }) => {
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
        console.log(err.response);
    }
};
