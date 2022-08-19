import { atom, selector } from 'recoil';
import { getUserInfo } from '../api/auth';

export const loginStatusState = atom({
    key: 'loginStatusState',
    default: '',
});

export const userIdState = atom({
    key: 'userIdState',
    default: '',
});

export const userInfoState = atom({
    key: 'userInfoState',
    default: {},
});

// export const userInfoSelector = selector({
//     key: 'userInfoSelector',
//     get: async ({ get }) => {
//         let userInfo = get(userInfoState);
//         userInfo = await getUserInfo();
//         console.log(userInfo);
//         return userInfo;
//     },
// });
