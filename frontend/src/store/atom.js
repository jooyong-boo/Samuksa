import { atom, selector } from 'recoil';
import { getAreaTotalFishData, getFishRecommendData, getArea, getFarmType } from '../api/auth';

export const personNumState = atom({
    key: 'personNumState',
    default: '',
});

export const moneyState = atom({
    key: 'moneyState',
    default: 50000,
});

export const areaState = atom({
    key: 'areaState',
    default: '노량진',
});

// 조건부 스타일링용
export const selectState = atom({
    key: 'selectState',
    default: true,
});

// 선택 조건목록
export const selectConditions = atom({
    key: 'selectConditions',
    default: [],
});

// 지역별 전체 어종
export const fishDetailRecommendInfo = atom({
    key: 'fishDetailRecommendInfo',
    default: [],
});

// 선택한 어종
export const selectFishState = atom({
    key: 'selectFishState',
    default: [],
});

// 선택 분량
export const amountState = atom({
    key: 'amountState',
    default: 0,
});

// 총 분량
export const totalAmountState = atom({
    key: 'totalAmountState',
    default: 0,
});

// 양식 여부
export const farmState = atom({
    key: 'farmState',
    default: [],
});

//추천 수산물
export const recommendListState = atom({
    key: 'recommendListState',
    default: [],
});

// 검색결과 조합 선택
export const recommendListSelectState = atom({
    key: 'recommendListSelectState',
    default: [],
});

// 검색결과 선택한 조합 상세
export const selectRecommendDetailState = atom({
    key: 'selectRecommendDetailState',
    default: [],
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
// export const fishPriceAllState = selector({
//   key: 'fishPriceAllState',
//   get: async ({ get }) => {
//     const area = get(areaState);
//     const response = await getAreaTotalFishData({ area });
//     return response;
//   },
// });

// 수산물 추천
// export const fishDataState = selector({
//     key: 'fishData/get',
//     get: async ({ get }) => {
//       const personNum = get(personNumState);
//       const money = get(moneyState);
//       const area = get(areaState);
//       const response = await getFishRecommendData({personNum, money, area});
//       return response;
//     },
// });
