import { atom, selector } from 'recoil';
// import axios from 'axios';
import { getFishRecommendData } from '../api/auth';

// 메인페이지 입력값들 =============
export const personNumState = atom ({
  key: 'personNumState',
  default: 5,
});

export const moneyState = atom ({
  key: 'moneyState',
  default: 500000,
});

export const areaState = atom({
    key: 'areaState',
    default: '노량진',
  });
// ==========================

export const fishDetailRecommendInfo = atom({
  key: 'fishDetailRecommendInfo',
  default: [],
});

export const fishDataState = selector({
    key: 'fishData/get',
    get: async ({ get }) => {
      const personNum = get(personNumState);
      const money = get(moneyState);
      const area = get(areaState);
      const response = await getFishRecommendData({personNum, money, area});
      return response;
    },
});

