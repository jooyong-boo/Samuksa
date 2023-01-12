import { atom, selector } from 'recoil';
import { getAreaTotalFishData, getFishRecommendData, getArea, getFarmType } from '../api/recommend';
import { getPosts } from '../api/post';
import { randomNickname } from '../utils/randomNickname';
import { getRandomNumber } from '../components/community/PostViewer';
import { v1 } from 'uuid';

export const personNumState = atom({
    key: `personNumState/${v1()}`,
    default: '',
});

export const moneyState = atom({
    key: `moneyState/${v1()}`,
    default: '',
});

export const areaState = atom({
    key: `areaState/${v1()}`,
    default: '노량진',
});

// 조건부 스타일링용
export const selectState = atom({
    key: `selectState/${v1()}`,
    default: true,
});

// 선택 조건목록
type Condition = {
    id: number;
    selectFish: string;
    amount: number;
    imgUrl: string;
    farmStatus: string[];
};
export const selectConditions = atom<Condition[]>({
    key: `selectConditions/${v1()}`,
    default: [],
});

// 지역별 전체 어종
export const fishDetailRecommendInfo = atom({
    key: `fishDetailRecommendInfo/${v1()}`,
    default: [],
});

// 선택한 어종
type SelectFish = {
    active?: boolean;
    imgUrl: string;
    farmTypes: string[];
    fishInfoId: number;
    fishYield: number;
    fishName: string;
};
export const selectFishState = atom<SelectFish[]>({
    key: `selectFishState/${v1()}`,
    default: [],
});

// 선택 분량
export const amountState = atom({
    key: `amountState/${v1()}`,
    default: 0,
});

// 총 분량
export const totalAmountState = atom({
    key: `totalAmountState/${v1()}`,
    default: 0,
});

// 양식 여부
type Farm = {
    farmTypes: string[];
};
export const farmState = atom<Farm[]>({
    key: `farmState/${v1()}`,
    default: [],
});

//추천 수산물
type RecommendLists = {
    active: boolean;
    combinationName: string[];
    conbinationSize: number;
    fishRecommendCombinations: any;
    maxPrice: number;
};
export const recommendListState = atom<RecommendLists[]>({
    key: `recommendListState/${v1()}`,
    default: [],
});

// 검색결과 조합 선택
export const recommendListSelectState = atom({
    key: `recommendListSelectState/${v1()}`,
    default: [],
});

// 검색결과 선택한 조합 상세
export const selectRecommendDetailState = atom({
    key: `selectRecommendDetailState/${v1()}`,
    default: [],
});

// 수산물 판매지역
export const getAreaState = selector({
    key: `getAreaState/${v1()}`,
    get: async ({ get }) => {
        const response = await getArea();
        if (response.code === 'ERR_NETWORK') {
            // notifyError('서버와 연결이 끊겼습니다.');
            return '';
        }
        return response;
    },
});

// 게시글 목록
export const getPostState = selector({
    key: `getPostState/${v1()}`,
    get: async ({ get }) => {
        const response = await getPosts();
        const readPost = localStorage.getItem('reviewReadPost');
        const newPosts = response?.map((item: any) => {
            if (readPost?.includes(item.id)) {
                return Object.assign(
                    {},
                    item,
                    { read: true },
                    { nickName: randomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            } else {
                return Object.assign(
                    {},
                    item,
                    { nickName: randomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            }
        });
        return newPosts;
    },
});

// 게시글 조회
export const getPostViewState = atom({
    key: `getPostViewState/${v1()}`,
    default: [],
});

// 게시판 탭 저장
export const tabState = atom({
    key: `tapState/${v1()}`,
    default: 0,
});

// 리뷰게시판 페이지버튼 저장
export const reviewPostPageState = atom({
    key: `reviewPostPageState/${v1()}`,
    default: 1,
});

// 팁게시판 페이지버튼 저장
export const tipPostPageState = atom({
    key: `tipPostPageState/${v1()}`,
    default: 1,
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
