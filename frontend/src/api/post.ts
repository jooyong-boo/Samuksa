import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
    withCredentials: true,
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

instance.interceptors.response.use((res) => {
    if (res.headers[`access-token`]) {
        const token = res.headers[`access-token`];
        localStorage.setItem('jwtToken', token);
    }
    return res;
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

export const getRealPosts = (page: number, size: number, type: number) =>
    instance.get('/board', {
        params: {
            page,
            size,
            type,
        },
    });

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
export const createPost = (content: string, title: string, type: number) =>
    instance.post('/board/create', {
        boardCreateRequest: {
            content,
            title,
            type,
        },
    });

// 게시물 조회
export const getPostContent = (idx: number) =>
    instance.get('/board/contents', {
        params: {
            idx,
        },
    });

// 게시물별 댓글 조회
export const getPostComment = (boardTitleIdx: number, page: number, size: number) =>
    instance.get('/board/comments', {
        params: {
            boardTitleIdx,
            page,
            size,
        },
    });

// 게시물 삭제
export const deletePost = (titleIdx: number) =>
    instance.delete('/board/create', {
        data: {
            titleIdx,
        },
    });

// 게시물 수정
export const patchPost = (text: string, title: string, titleIdx: number, type: number) =>
    instance.patch('/board/create', {
        data: {
            patchBoardRequest: {
                text,
                title,
                titleIdx,
                type,
            },
        },
    });

// 댓글 생성
export const createComment = (commentIdx: number, comment: string, titleIdx: number) =>
    instance.post('/board/create/comments', {
        data: {
            commentCreateRequest: {
                commentIdx,
                comment,
                titleIdx,
            },
        },
    });

// 댓글 수정
export const patchComment = (comment: string, commentIdx: number) =>
    instance.patch('/board/create/comments', {
        data: {
            patchCommentRequest: {
                comment,
                commentIdx,
            },
        },
    });

// 댓글 삭제
export const deleteComment = (commentsIdx: number) =>
    instance.delete('/board/comments', {
        data: {
            commentsIdx,
        },
    });
