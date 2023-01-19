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
export const patchComment = (comment: string, commentIdx: number | string) =>
    instanceAuth.patch('/board/create/comments', {
        comment,
        commentIdx: Number(commentIdx),
    });

// 댓글 삭제
export const deleteComment = (commentsIdx: number | string) =>
    instanceAuth.delete('/board/comments', {
        data: {
            commentsIdx: Number(commentsIdx),
        },
    });

// 댓글의 답글 생성
export const createReply = (
    commentIdx: number | string,
    comment: string,
    titleIdx: number | string,
    nickName: string,
) =>
    instanceAuth.post('/board/create/reply', {
        commentIdx: Number(commentIdx),
        comment,
        titleIdx: Number(titleIdx),
        nickName,
    });

// 댓글의 답글 수정
export const patchReply = (
    commentIdx: number | string,
    comment: string,
    titleIdx: number | string,
    commandIdx: number,
) =>
    instanceAuth.patch('/board/create/reply', {
        commentIdx: Number(commentIdx),
        comment,
        titleIdx: Number(titleIdx),
        commandIdx,
    });

// 게시글 추천
export const recommendPost = (titleIdx: number | string, recommend: boolean) =>
    instanceAuth.patch('/board/post/recommend', {
        titleIdx: Number(titleIdx),
        recommend,
    });

// 댓글 추천
export const recommendComment = (titleIdx: number | string, commentIdx: number | string, recommend: boolean) =>
    instanceAuth.patch('/board/comment/recommend', {
        titleIdx: Number(titleIdx),
        commentIdx: Number(commentIdx),
        recommend,
    });
