import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_Samuksa_URL,
});

type recommend = {
    personNum: string;
    money: string;
    area: string;
};

// 추천
export const getFishRecommendData = async ({ personNum, money, area }: recommend) => {
    try {
        const { data } = await instance.get('/fish/recommend', {
            params: { personNumber: parseInt(personNum), money: parseInt(money), saleArea: area },
        });
        return data;
    } catch (err) {
        console.log(err);
    }
};

// 정보 조회
export const getAreaTotalFishData = async ({ area }: { area: string }) => {
    try {
        const { data } = await instance.get('/fish/info', { params: { saleArea: area } });
        // console.log(data)
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};

// 판매지역 조회
export const getArea = async () => {
    try {
        const { data } = await instance.get('/fish/area');
        return data;
    } catch (err) {
        return err;
    }
};

// 양식여부 조회
export const getFarmType = async ({ fishName }: { fishName: string }) => {
    try {
        const { data } = await instance.get('/fish/farmType', { params: { fishName: fishName } });
        return data;
    } catch (err: any) {
        console.log(err.response);
    }
};
