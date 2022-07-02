import { atom, selector } from 'recoil';
import { getAreaTotalFishData, getFishRecommendData, getArea } from '../api/auth';

export const personNumState = atom ({
  key: 'personNumState',
  default: 1,
});

export const moneyState = atom ({
  key: 'moneyState',
  default: 500000,
});

export const areaState = atom({
    key: 'areaState',
    default: '노량진',
});

// 선택 어종

// 분량

// 양식여

// 선택 조건목록
export const selectConditions = atom({
  key: 'selectConditions',
  default: [],
});

// 전체 어종
export const fishDetailRecommendInfo = atom({
  key: 'fishDetailRecommendInfo',
  default: [],
});

export const getAreaState = selector({
  key: 'getAreaState',
  get: async ({ get }) => {
    const response = await getArea();
    // console.log(response)
    return response;
  },
});

export const fishPriceAllState = selector({
  key: 'fishPriceAllState',
  get: async ({ get }) => {
    // const area = get(areaState);
    const response = await getAreaTotalFishData();
    return response;
  },
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

