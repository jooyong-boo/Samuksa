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
//   console.log(personNum, money, area)
//   try {
//     const { data } = await axios.get('http://localhost:8080/dummy', { params: { Person_number : personNum, money: money, area: area }})
//     return data;
//   } catch (err) {
//     console.log(err.response);
//   }
// };

// export const getFishRecommendData = async () => {
//   try {
//     const { data } = await axios.get('http://localhost:8080/test')
//     return data;
//   } catch (err) {
//     console.log(err.response);
//   }
// };