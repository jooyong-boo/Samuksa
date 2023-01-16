export const post = {
    content: [
        {
            idx: 1,
            profileImage: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '삼먹사',
            createdAt: '2022-12-27 22:56:27.0',
            modifiedAt: '',
            title: '안녕하세요',
            content: '안녕하세요',
            viewCount: 0,
            commentCount: 0,
            recommendCount: 0,
        },
    ],
};

interface IComments {
    totalCommentCount: number;
    next: boolean;
    prev: boolean;
    data: any[];
}

export const comments: IComments = {
    totalCommentCount: 0,
    next: false,
    prev: false,
    data: [],
};
