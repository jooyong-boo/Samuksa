import { atom, selector } from 'recoil';
import axios from 'axios';

export const personNumState = atom ({
  key: 'personNumState',
  default: 1,
});

export const moneyState = atom ({
  key: 'moneyState',
  default: 5000,
});

export const areaState = atom({
    key: 'areaState',
    default: '노량진',
  });

export const fishDataState = atom({
  key: 'fishDataState',
  default: [],
});

export const fishDataSelector = selector({
    key: 'fishData/get',
    get: async ({ get }) => {
      const personNum = get(personNumState);
      const money = get(moneyState);
      const area = get(areaState);
      try {
        const { data } = await axios.get('http://localhost:8080/dummy', { params: { person_number : personNum, money: money, area: area }})
        console.log(data)
        return data;
      } catch (err) {
        console.log(err.response);
      }
    },
});

