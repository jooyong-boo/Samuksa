import { rest } from 'msw';
import { comments, post } from './data';

interface PostReqBody {
    content: string;
    title: string;
    type: number;
}

interface CommentReqBody {
    commendIdx: number;
    comment: string;
    titleIdx: number;
    userInfo: UserInfo;
}

interface UserInfo {
    userId: string;
    nickName: string;
    email: string;
    profileImage: string;
}

export const handlers = [
    // 글 생성
    rest.post<PostReqBody>(`${process.env.REACT_APP_SamuksaUser_URL}/board/create`, async (req, res, ctx) => {
        const { content, title, type } = req.body;
        const date = new Date();
        let idx = post.content.length + 1;
        console.log(content, title, type);
        post.content.push({
            idx,
            profileImage: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '삼먹사',
            createdAt: date.toString(),
            modifiedAt: '',
            title,
            content,
            viewCount: 0,
            commentCount: 0,
            recommendCount: 0,
        });

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json(idx),
        );
    }),
    // 글 목록 가져오기
    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board`, (req, res, ctx) => {
        // If authenticated, return a mocked user details
        let data = post.content.sort((a, b) => b.idx - a.idx);
        let newData = {
            content: data,
        };

        return res(ctx.status(200), ctx.json(newData));
    }),
    // 글 내용 가져오기
    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board/contents`, (req, res, ctx) => {
        const idx = req.url.searchParams.get('idx');
        let data = post.content.filter((item) => item.idx === Number(idx));
        let next = post.content.filter((item) => item.idx > Number(idx));
        let prev = post.content.filter((item) => item.idx < Number(idx));
        let result = { data: data[0], next: !next.length, prev: !prev.length };
        const postIdx = post.content.findIndex((item) => item.idx === Number(idx));
        post.content[postIdx].viewCount += 1;
        return res(ctx.status(200), ctx.json(result));
    }),

    // 글 수정
    rest.patch<{ text: string; title: string; titleIdx: number; type: number }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create`,
        (req, res, ctx) => {
            const { text, title, titleIdx, type } = req.body;
            const findIdx = post.content.findIndex((item) => item.idx === titleIdx);
            const date = new Date();
            post.content[findIdx] = { ...post.content[findIdx], title, content: text, modifiedAt: date.toString() };
            return res(ctx.status(200), ctx.json(post));
        },
    ),

    // 글 삭제
    rest.delete<{ titleIdx: string | number }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create`,
        (req, res, ctx) => {
            const { titleIdx } = req.body;
            let data = post.content.filter((item) => item.idx !== Number(titleIdx));
            post.content = data;

            return res(ctx.status(200), ctx.json(post));
        },
    ),
    // 댓글 불러오기
    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board/comments`, (req, res, ctx) => {
        const boardTitleIdx = req.url.searchParams.get('boardTitleIdx');
        const page = req.url.searchParams.get('page');
        const size = req.url.searchParams.get('size');

        return res(ctx.status(200), ctx.json(comments));
    }),
    // 댓글 생성
    rest.post<CommentReqBody>(`${process.env.REACT_APP_SamuksaUser_URL}/board/create/comments`, (req, res, ctx) => {
        const { commendIdx, comment, titleIdx, userInfo } = req.body;
        console.log(userInfo);
        const date = new Date();
        const newTotal = comments.totalCommentCount + 1;
        const newComment = {
            idx: comments.data.length + 1,
            avatarUrl: userInfo.profileImage,
            nickName: userInfo.nickName,
            content: comment,
            createdAt: date.toString(),
            modifiedAt: date.toString(),
            recommendCount: 0,
            command: [],
        };
        const postIdx = post.content.findIndex((item) => item.idx === titleIdx);
        post.content[postIdx].commentCount += 1;
        comments.totalCommentCount = newTotal;
        comments.data.push(newComment);

        return res(ctx.status(200), ctx.json(comments));
    }),

    //댓글 삭제
    rest.delete<{ commentsIdx: string | number }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/comments`,
        (req, res, ctx) => {
            const { commentsIdx } = req.body;
            let data = comments.data.filter((item) => item.idx !== Number(commentsIdx));
            let newData = { totalCommentCount: data.length, data };
            comments.totalCommentCount = data.length;
            comments.data = data;

            return res(ctx.status(200), ctx.json(newData));
        },
    ),

    //댓글 수정
    rest.patch<{ comment: string; commentIdx: number | string }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create/comments`,
        (req, res, ctx) => {
            const { comment, commentIdx } = req.body;
            const idx = comments.data.findIndex((ele) => ele.idx === commentIdx);
            const newData = { ...comments.data[idx], content: comment };
            comments.data[idx] = newData;
            return res(ctx.status(200), ctx.json(comments));
        },
    ),

    //답글 생성
    rest.post<{ commentIdx: number; comment: string; titleIdx: number | string; nickName: string; userInfo: UserInfo }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create/reply`,
        async (req, res, ctx) => {
            const { commentIdx, comment, nickName, userInfo } = req.body;
            const date = new Date();
            const target = comments.data.findIndex((ele) => ele.idx === commentIdx);
            const idx = comments.data[target].command.length + 1;

            comments.data[target].command.push({
                idx,
                avatarUrl: userInfo.profileImage,
                nickName: userInfo.nickName,
                receiverNickName: nickName,
                content: comment,
                createdAt: date.toString(),
                modifiedAt: date.toString(),
                recommendCount: 0,
            });

            return res(
                // Respond with a 200 status code
                ctx.status(200),
                ctx.json(comments),
            );
        },
    ),

    //답글 수정
    rest.patch<{ commentIdx: number; comment: string; titleIdx: number | string; commandIdx: number }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create/reply`,
        (req, res, ctx) => {
            const { comment, commentIdx, commandIdx } = req.body;
            const idx = comments.data.findIndex((ele) => ele.idx === commentIdx);
            const newData = { ...comments.data[idx].command[commandIdx - 1], content: comment };
            comments.data[idx].command[commandIdx - 1] = newData;
            return res(ctx.status(200), ctx.json(comments));
        },
    ),

    //게시글 추천
    rest.patch<{ titleIdx: number | string; recommend: boolean }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/post/recommend`,
        (req, res, ctx) => {
            const { titleIdx, recommend } = req.body;
            if (recommend) post.content[Number(titleIdx) - 1].recommendCount += 1;
            if (!recommend) post.content[Number(titleIdx) - 1].recommendCount -= 1;
            return res(ctx.status(200), ctx.json(post));
        },
    ),
    //댓글 추천
    rest.patch<{ titleIdx: number | string; commentIdx: number | string; recommend: boolean }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/comment/recommend`,
        (req, res, ctx) => {
            const { commentIdx, recommend } = req.body;
            if (recommend) comments.data[Number(commentIdx) - 1].recommendCount += 1;
            if (!recommend) comments.data[Number(commentIdx) - 1].recommendCount -= 1;

            return res(ctx.status(200), ctx.json(comments));
        },
    ),
];
