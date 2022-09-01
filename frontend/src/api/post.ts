import axios from 'axios';

// 전체 게시물 목록
export const getPosts = async () => {
    try {
        const { data } = await axios.get('https://koreanjson.com/posts');
        // console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

// 선택한 게시물 조회
export const getPostsId = async (id: number) => {
    try {
        const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

// export const randomUserId = async () => {
//     try {
//         const data = await axios.get(`https://randomuser.me/api/?inc=name`);
//         console.log(data);
//         return data;
//     } catch (err) {
//         console.log(err.response);
//     }
// };
