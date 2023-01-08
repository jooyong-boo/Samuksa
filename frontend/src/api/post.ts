import { instance, instanceAuth } from './globalConfig';

// 전체 게시물 목록
export const getPosts = async () => {
    try {
        const { data } = await instance.get('https://koreanjson.com/posts');
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
        const { data } = await instance.get(`https://koreanjson.com/posts/${id}`);
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 게시물 댓글 조회
export const getCommentById = async (id: string | undefined) => {
    try {
        const { data } = await instance.get(`https://koreanjson.com/comments?postId=${id}`);
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 게시물 생성
export const createPost = (content: string, title: string, type: number) =>
    instanceAuth.post('/board/create', {
        content,
        title,
        type,
    });

// 게시물 조회
export const getPostContent = (idx: number) =>
    instance.get('/board/contents', {
        params: {
            idx,
        },
    });

// 게시물별 댓글 조회
export const getPostComment = (boardTitleIdx: number | string, page: number, size: number) =>
    instance.get('/board/comments', {
        params: {
            boardTitleIdx,
            page,
            size,
        },
    });

// 게시물 삭제
export const deletePost = (titleIdx: number | string) =>
    instanceAuth.delete('/board/create', {
        data: {
            titleIdx: Number(titleIdx),
        },
    });

// 게시물 수정
export const patchPost = (text: string, title: string, titleIdx: number, type: number) =>
    instanceAuth.patch('/board/create', {
        text,
        title,
        titleIdx,
        type,
    });

// 댓글 생성
export const createComment = (commentIdx: number | string, comment: string, titleIdx: number | string) =>
    instanceAuth.post('/board/create/comments', {
        commentIdx: Number(commentIdx),
        comment,
        titleIdx: Number(titleIdx),
    });

// 댓글 수정
export const patchComment = (comment: string, commentIdx: number) =>
    instanceAuth.patch('/board/create/comments', {
        data: {
            patchCommentRequest: {
                comment,
                commentIdx,
            },
        },
    });

// 댓글 삭제
export const deleteComment = (commentsIdx: number) =>
    instanceAuth.delete('/board/comments', {
        data: {
            commentsIdx,
        },
    });
