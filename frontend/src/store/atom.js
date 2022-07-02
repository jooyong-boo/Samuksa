import { atom, selector } from 'recoil';
import { getAreaTotalFishData, getFishRecommendData, getArea, getFarmType } from '../api/auth';

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

// 선택한 어종
export const selectFishState = atom({
  key: 'selectFishState',
  default: [],
});

// 선택한 어종이름
export const selectFishNameState = atom({
  key: 'selectFishNameState',
  default: '',
});

// 양식 여부
export const getFramTypeState = selector({
  key: 'getFramTypeState',
  get: async ({ get }) => {
      const selectFish = get(selectFishNameState);
      const response = await getFarmType({ fishName: selectFish });
      // console.log(response);
      return response;
  }
});

// 수산물 판매지역
export const getAreaState = selector({
  key: 'getAreaState',
  get: async ({ get }) => {
    const response = await getArea();
    // console.log(response)
    return response;
  },
});

// 수산물 정보
export const fishPriceAllState = selector({
  key: 'fishPriceAllState',
  get: async ({ get }) => {
    // const area = get(areaState);
    const response = await getAreaTotalFishData();
    return response;
  },
});

// 수산물 추천
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

