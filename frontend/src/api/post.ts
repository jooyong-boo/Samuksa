import axios, { AxiosRequestConfig } from 'axios';

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

// 전체 게시물 목록
export const getPosts = async () => {
    try {
        const { data } = await axios.get('https://koreanjson.com/posts');
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

export const getRealPosts = async () => {
    try {
        const { data } = await instance.get('/board', {
            data: {},
        });
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 선택한 게시물 조회
export const getPostsById = async (id: string | undefined) => {
    try {
        const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 게시물 댓글 조회
export const getCommentById = async (id: string | undefined) => {
    try {
        const { data } = await axios.get(`https://koreanjson.com/comments?postId=${id}`);
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 게시물 생성
export const createPost = async (id: string | undefined) => {
    try {
        const { data } = await instance.post('/board/create');
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};
