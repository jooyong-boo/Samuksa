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
}

export const handlers = [
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
            modifiedAt: date.toString(),
            title,
            content,
            viewCount: 123,
            commentCount: 3,
            recommendCount: 5,
        });

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json(idx),
        );
    }),

    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board`, (req, res, ctx) => {
        // If authenticated, return a mocked user details
        let data = post.content.sort((a, b) => b.idx - a.idx);
        let newData = {
            content: data,
        };

        return res(ctx.status(200), ctx.json(newData));
    }),

    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board/contents`, (req, res, ctx) => {
        const idx = req.url.searchParams.get('idx');
        let data = post.content.filter((item) => item.idx === Number(idx));

        return res(ctx.status(200), ctx.json(data[0]));
    }),

    rest.delete<{ titleIdx: string | number }>(
        `${process.env.REACT_APP_SamuksaUser_URL}/board/create`,
        (req, res, ctx) => {
            const { titleIdx } = req.body;
            let data = post.content.filter((item) => item.idx !== Number(titleIdx));
            post.content = data;

            return res(ctx.status(200), ctx.json(post));
        },
    ),

    rest.get(`${process.env.REACT_APP_SamuksaUser_URL}/board/comments`, (req, res, ctx) => {
        const boardTitleIdx = req.url.searchParams.get('boardTitleIdx');
        const page = req.url.searchParams.get('page');
        const size = req.url.searchParams.get('size');
        // let data = post.content.filter((item) => item.idx === Number(idx));
        // console.log(data);

        return res(ctx.status(200), ctx.json(comments));
    }),

    rest.post<CommentReqBody>(`${process.env.REACT_APP_SamuksaUser_URL}/board/create/comments`, (req, res, ctx) => {
        const { commendIdx, comment, titleIdx } = req.body;
        console.log(req.body);
        const date = new Date();
        const newTotal = comments.totalCommentCount + 1;
        const newComment = {
            idx: comments.data.length + 1,
            avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '삼먹사',
            content: comment,
            createdAt: date.toString(),
            modifiedAt: date.toString(),
            command: [
                {
                    idx: 1,
                    avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
                    nickName: '삼먹사2',
                    receiverNickName: '삼먹사',
                    content: '첫번째 댓글',
                    createdAt: date.toString(),
                    modifiedAt: date.toString(),
                },
            ],
        };
        comments.totalCommentCount = newTotal;
        comments.data.push(newComment);

        return res(ctx.status(200), ctx.json(comments));
    }),
];
