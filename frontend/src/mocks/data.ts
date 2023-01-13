export const post = {
    content: [
        {
            idx: 1,
            profileImage: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '삼먹사',
            createdAt: '2022-12-27 22:56:27.0',
            modifiedAt: '',
            title: '첫번째 글',
            content: '안녕하세요',
            viewCount: 123,
            commentCount: 3,
            recommendCount: 5,
        },
    ],
};

export const comments = {
    totalCommentCount: 5,
    next: false,
    prev: false,
    data: [
        {
            idx: 1,
            avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '삼먹사',
            content: '첫번째 댓글',
            createdAt: '2022-12-27 22:56:27.0',
            modifiedAt: '2022-12-27 22:56:27.0',
            command: [
                {
                    idx: 1,
                    avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
                    nickName: '삼먹사',
                    receiverNickName: '삼먹사',
                    content: '첫번째 댓글',
                    createdAt: '2022-12-27 22:56:27.0',
                    modifiedAt: '2022-12-27 22:56:27.0',
                },
                {
                    idx: 2,
                    avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
                    nickName: '삼먹사2',
                    receiverNickName: '삼먹사',
                    content: '두번째 댓글',
                    createdAt: '2022-12-27 22:56:27.0',
                    modifiedAt: '2022-12-27 22:56:27.0',
                },
            ],
        },
        {
            idx: 2,
            avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
            nickName: '사먹사',
            content: '두번째 댓글',
            createdAt: '2022-12-27 22:56:27.0',
            modifiedAt: '2022-12-27 22:56:27.0',
            command: [
                {
                    idx: 1,
                    avatarUrl: 'http://localhost:8081/user/images/37c025f0-32bc-4f44-be73-5de992acb765.jpg',
                    nickName: '삼먹사2',
                    receiverNickName: '사먹사',
                    content: '첫번째 댓글',
                    createdAt: '2022-12-27 22:56:27.0',
                    modifiedAt: '2022-12-27 22:56:27.0',
                },
            ],
        },
    ],
};
