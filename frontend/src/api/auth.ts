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
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

export const signUp = async ({ id, password, nickName, email }: Register) => {
    try {
        const { data } = await instance.post('/signup', {
            userId: id,
            nickName,
            password,
            email,
        });
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
};

export const login = async ({ userId, passwd }: { userId: string; passwd: string }) => {
    try {
        const result = await instance.post('/login', {
            userId,
            password: passwd,
        });
        console.log(result);
        if (result.status === 200) {
            localStorage.setItem('jwtToken', result.headers[`access-token`]);
            localStorage.setItem('refreshToken', result.headers[`refresh-token`]);
            return result;
        }
    } catch (err) {
        return err;
    }
};

export const logout = async ({ AToken }: { AToken: string }) => {
    try {
        const result = await instance.delete('/user/login', {
            params: {
                'A-Token': AToken,
            },
        });
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const checkDuplicate = async (info: string, check: string) => {
    try {
        const { data } = await instance.get('/signup/existence-info', {
            params: {
                [`${check}`]: info,
            },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
        return err.response.data;
    }
};

export const requestCheckEmail = async (email: string, checkEmail: string, authNum?: string, checkAuthNum?: string) => {
    try {
        const data = await instance.post('/signup/message', {
            [`${checkEmail}`]: email,
            [`${checkAuthNum}`]: authNum,
        });
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const checkEmailAxios = async ({ email }: { email: string }) => {
    try {
        const data = await instance.post('/signup/message', null, {
            params: {
                userEmail: email,
            },
        });
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const checkEmailAuthAxios = async ({ authNum, email }: { authNum: string; email: string }) => {
    try {
        const data = await instance.post('/signup/message-auth', null, {
            params: {
                Key: authNum,
                userEmail: email,
            },
        });
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const getUserInfo = async () => {
    try {
        const result = await instance.get('/user/user-info');
        console.log(result);
        if (result.data) {
            return result;
        } else {
            throw result;
        }
    } catch (err) {
        return err;
    }
};

export const getWithdrawal = async (userId: string, passwd: string) => {
    try {
        const { data } = await instance.delete('/user/user-info', {
            params: {
                userId,
                passwd,
            },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const getTokenReissuance = async ({ AToken, RToken }: { AToken: string; RToken: string }) => {
    try {
        const result = await instance.post('/user/refresh-token', null, {
            params: {
                'A-Token': AToken,
                'R-Token': RToken,
            },
        });
        // console.log(result);
        if (result.status === 200) {
            return result;
        }
    } catch (err) {
        return err;
    }
};

export const changeUserImage = async (formData: FormData) => {
    try {
        const result = await instance.post(
            '/user/upload-image',
            {
                formData,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
