import { instanceAuth } from './globalConfig';

type Register = {
    userId: string;
    password: string;
    nickName: string;
    email: string;
};

export const signUp = async ({ userId, password, nickName, email }: Register) => {
    try {
        const { data } = await instanceAuth.post('/signup', {
            userId,
            nickName,
            password,
            email,
        });
        return data;
    } catch (err) {
        return err;
    }
};

export const login = async ({ userId, password }: { userId: string; password: string }) => {
    try {
        const result = await instanceAuth.post('/login', {
            userId,
            password,
        });
        if (result.status === 200) {
            localStorage.setItem('jwtToken', result.headers[`access-token`]);
            return result;
        }
    } catch (err) {
        return err;
    }
};

export const logout = async (accessToken: string) => {
    try {
        const result = await instanceAuth.delete('/login/jwt', {
            data: {
                accessToken,
            },
        });
        return result;
    } catch (err) {
        return err;
    }
};

// 중복 확인
export const checkDuplicate = async (info: string, check: string) => {
    try {
        const { data } = await instanceAuth.get('/signup/existence-info', {
            params: {
                [`${check}`]: info,
            },
        });
        return data;
    } catch (err: any) {
        return err.response.data;
    }
};

// 이메일 인증, 체크
export const requestCheckEmail = async (email: string, checkEmail: string, authNum?: string, checkAuthNum?: string) => {
    try {
        const data = await instanceAuth.post('/signup/message', {
            [`${checkEmail}`]: email,
            [`${checkAuthNum}`]: authNum,
        });
        return data;
    } catch (err: any) {
        return err;
    }
};

//유저정보
export const getUserInfo = async () => {
    try {
        const result = await instanceAuth.get('/user/user-info');
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
        const { data } = await instanceAuth.delete('/user/user-info', {
            params: {
                userId,
                password,
            },
        });
        return data;
    } catch (err) {
        return err;
    }
};

// 유저 이미지
export const changeUserImage = async (formData: FormData) => {
    try {
        const result = await instanceAuth.post('/user/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (err) {
        return err;
    }
};

// 프로필 정보 변경
export const changeUserInfoAxios = async (change: string, info?: string, userId?: string, password?: string) => {
    try {
        const result = await instanceAuth.patch('/user/user-info', {
            [`${change}`]: info,
            userId,
            password,
        });
        return result;
    } catch (err) {
        console.log(err);
    }
};
