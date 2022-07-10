import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_Samuksa_URL,
});


// 추천
export const getFishRecommendData = async ({ personNum, money, area }) => {
  try {
    const { data } = await instance.get('/fish/recommend', { params: { personNumber : Number(personNum), money: Number(money), saleArea: area }});
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 정보 조회
export const getAreaTotalFishData = async ({ area }) => {
  try {
    const { data } = await instance.get('/fish/info', { params: { saleArea: area }});
    console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 판매지역 조회
export const getArea = async () => {
  try {
    const { data } = await instance.get('/fish/area');
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 양식여부 조회
export const getFarmType = async ({ fishName }) => {
  try {
    const { data } = await instance.get('/fish/farmType', { params: { fishName: fishName }});
    return data;
  } catch (err) {
    console.log(err.response);
  }
};