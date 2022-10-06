import { atom, selector } from 'recoil';
import { getAreaTotalFishData, getFishRecommendData, getArea, getFarmType } from '../api/recommend';
import { getPosts, getPostsById } from '../api/post';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RandomNickname } from '../components/utils/RandomNickname';
import { getRandomNumber } from '../components/community/PostViewer';

const notifyError = (text: string) => {
    dismissAll();
    toast.error(text, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
    });
};
const dismissAll = () => toast.dismiss();

export const personNumState = atom({
    key: 'personNumState',
    default: '',
});

export const moneyState = atom({
    key: 'moneyState',
    default: '',
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
        if (response.code === 'ERR_NETWORK') {
            // notifyError('서버와 연결이 끊겼습니다.');
            return '';
        }
        return response;
    },
});

// 게시글 목록
export const getPostState = selector({
    key: 'getPostState',
    get: async ({ get }) => {
        const response = await getPosts();
        const readPost = localStorage.getItem('reviewReadPost');
        const newPosts = response.map((item: any) => {
            if (readPost?.includes(item.id)) {
                return Object.assign(
                    {},
                    item,
                    { read: true },
                    { nickName: RandomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            } else {
                return Object.assign(
                    {},
                    item,
                    { nickName: RandomNickname() },
                    { avatar: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg` },
                );
            }
        });
        return newPosts;
    },
});

// 게시글 조회
export const getPostViewState = atom({
    key: 'getPostViewState',
    default: [],
});

// 게시판 탭 저장
export const tabState = atom({
    key: 'tapState',
    default: 0,
});

// 리뷰게시판 페이지버튼 저장
export const reviewPostPageState = atom({
    key: 'reviewPostPageState',
    default: 1,
});

// 팁게시판 페이지버튼 저장
export const tipPostPageState = atom({
    key: 'tipPostPageState',
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
