import axios, { AxiosRequestConfig } from 'axios';

type Register = {
    userId: string;
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

export const signUp = async ({ userId, password, nickName, email }: Register) => {
    try {
        const { data } = await instance.post('/signup', {
            userId,
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

export const login = async ({ userId, password }: { userId: string; password: string }) => {
    try {
        const result = await instance.post('/login', {
            userId,
            password,
        });
        console.log(result);
        if (result.status === 200) {
            localStorage.setItem('jwtToken', result.headers[`access-token`]);
            localStorage.setItem('refreshToken', result.headers[`refresh-token`]);
            return result;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const logout = async (accessToken: string) => {
    try {
        const result = await instance.delete('/login/jwt', {
            data: {
                accessToken,
            },
        });
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// 중복 확인
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

// 이메일 인증, 체크
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

//유저정보
export const getUserInfo = async () => {
    try {
        const result = await instance.get('/user/user-info');
        if (result.data) {
            return result;
        } else {
            throw result;
        }
    } catch (err) {
        return err;
    }
};

// 회원 탈퇴
export const getWithdrawal = async (userId: string, password: string) => {
    try {
        const { data } = await instance.delete('/user/user-info', {
            params: {
                userId,
                password,
            },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};
// 토큰 재발급
export const getTokenReissuance = async (accessToken: string, refreshToken: string) => {
    try {
        const result = await instance.post('/login/refresh-token', {
            accessToken,
            refreshToken,
        });
        // console.log(result);
        if (result.status === 200) {
            return result;
        }
    } catch (err) {
        return err;
    }
};
// 유저 이미지
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

// 프로필 정보 변경
export const changeUserInfo = async (change: string, info: string) => {
    try {
        const result = await instance.patch('/user/user-info', {
            [`${change}`]: info,
        });
        return result;
    } catch (err) {
        console.log(err);
    }
};
