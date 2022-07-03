import { QueryClient } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient();

// export const postInputData = async ({ personNum, money, area }) => {
//   try {
//     const { data } = await axios.post('http://localhost:8080/', { personNum, money, area })
//     return data;
//   } catch (error) {
//     return error.response;
//   }
// };


// 수산물 추천
export const getFishRecommendData = async ({ personNum, money, area }) => {
  try {
    const { data } = await axios.get('http://localhost:8080/fish/recommend', { params: { personNumber : personNum, money: money, saleArea: area }});
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

// 수산물 정보 조회
export const getAreaTotalFishData = async () => {
  try {
    // await axios.post('http://localhost:8080//fish/api');
    const { data } = await axios.get('http://localhost:8080/fish/info');
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err.response);
  }
}

// 수산물 판매지역 조회
export const getArea = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/fish/area');
    return data;
  } catch (err) {
    console.log(err.response);
  }
}

// 수산물 양식여부 조회
export const getFarmType = async ({ fishName }) => {
  try {
    const { data } = await axios.get('http://localhost:8080/fish/farmType', { params: { fishName: fishName }});
    return data;
  } catch (err) {
    console.log(err.response);
  }
}