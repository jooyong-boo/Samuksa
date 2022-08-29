import { atom, selector } from 'recoil';
import { getUserInfo } from '../api/auth';

export const loginStatusState = atom({
    key: 'loginStatusState',
    default: false,
});

export const userIdState = atom({
    key: 'userIdState',
    default: '',
});

export const userInfoState = atom({
    key: 'userInfoState',
    default: {},
});

export const userImageState = atom({
    key: 'userImageState',
    default: '/broken-image.jpg',
});

export const userInfoSelector = selector({
    key: 'userInfoSelector',
    get: async ({ get }) => {
        const response = await getUserInfo();
        // console.log(response)
        return response;
    },
});
