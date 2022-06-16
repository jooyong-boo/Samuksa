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

// export const getFishRecommendData = async ({ personNum, money, area }) => {
//     const { data } = await axios.get('http://localhost:8080/', { params: { personNum, money, area }})
//     return data;
// };

export const getFishRecommendData = async () => {
  const { data } = await axios.get('http://localhost:8080/test')
  console.log(data)
  return data;
};