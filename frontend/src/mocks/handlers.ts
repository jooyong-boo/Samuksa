import { rest } from 'msw';
import { post } from './data';

interface PostReqBody {
    content: string;
    title: string;
    type: number;
}

export const handlers = [
    rest.post<PostReqBody>(`${process.env.REACT_APP_SamuksaUser_URL}/board/create`, async (req, res, ctx) => {
        const { content, title, type } = req.body;
        const date = new Date();
        console.log(content, title, type);
        post.content.push({
            idx: post.content.length + 1,
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
        console.log(idx);
        let data = post.content.filter((item) => item.idx === Number(idx));
        console.log(data);

        return res(ctx.status(200), ctx.json(data[0]));
    }),
];