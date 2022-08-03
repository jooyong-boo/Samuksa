import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SamuksaUser_URL,
});

export const signUp = async ({ userId, userName, passwd, userEmail }) => {
    try {
        const { data } = await instance.post('/user/signUp', null, {
            params: {
                userId: 'samuksa',
                userName: '사먹사',
                passwd: 'samuksa123',
                userEmail: 'samuksa@asdf.com',
            },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const login = async () => {
    try {
        const { data } = await instance.post('/user/login', null, {
            params: {
                passwd: 'samuksa123',
                userId: 'samuksa',
            },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const checkIdAxios = async ({ id }) => {
    try {
        const { data } = await instance.post('/user/signUp/isHaveId', null, {
            params: { userId: id },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};

export const checkNickNameAxios = async ({ nickName }) => {
    try {
        const { data } = await instance.post('/user/signUp/isHaveName', null, {
            params: { userName: nickName },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};
// export const getFishRecommendData = async ({ personNum, money, area }) => {
//     try {
//         const { data } = await instance.get('/fish/recommend', {
//             params: { personNumber: parseInt(personNum), money: parseInt(money), saleArea: area },
//         });
//         // console.log(data)
//         return data;
//     } catch (err) {
//         console.log(err.response);
//     }
// };
