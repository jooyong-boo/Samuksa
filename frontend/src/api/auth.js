import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_Samuksa_URL,
});


// 수산물 추천
export const getFishRecommendData = async ({ personNum, money, area }) => {
  try {
    const { data } = await instance.get('/fish/recommend', { params: { personNumber : personNum, money: money, saleArea: area }});
    console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 수산물 정보 조회
export const getAreaTotalFishData = async () => {
  try {
    const { data } = await instance.get('/fish/info');
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 수산물 판매지역 조회
export const getArea = async () => {
  try {
    const { data } = await instance.get('/fish/area');
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 수산물 양식여부 조회
export const getFarmType = async ({ fishName }) => {
  try {
    const { data } = await instance.get('/fish/farmType', { params: { fishName: fishName }});
    return data;
  } catch (err) {
    console.log(err.response);
  }
};