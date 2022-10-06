import axios from 'axios';

// 전체 게시물 목록
export const getPosts = async () => {
    try {
        const { data } = await axios.get('https://koreanjson.com/posts');
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

// 선택한 게시물 조회
export const getPostsById = async (id: string | undefined) => {
    try {
        const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

// 게시물 댓글 조회
export const getCommentById = async (id: string | undefined) => {
    try {
        const { data } = await axios.get(`https://koreanjson.com/comments?postId=${id}`);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

type newPost = {
    date: string;
    title: string;
    content: string;
    avatar: string;
    userNickName?: string;
    read: boolean;
    id: number;
};

// 게시물 등록
export const setNewPost = async ({ date, title, content, avatar, userNickName, read, id }: newPost) => {
    try {
        const { data } = await axios.post('https://koreanjson.com/posts', {
            params: {
                id: userNickName,
                title,
                content,
                createdAt: date,
                updatedAt: date,
                UserId: id,
                avatar,
                read,
            },
        });
        return data;
    } catch (err) {
        console.log(err);
    }
};
