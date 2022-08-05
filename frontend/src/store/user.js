import { atom, selector } from 'recoil';
import { getUserInfo } from '../api/auth';

export const loginStatusState = atom({
    key: 'loginStatusState',
    default: '',
});

export const getUserInfoState = selector({
    key: 'getUserInfoState',
    get: async ({ get }) => {
        const response = await getUserInfo();
        console.log(response);
        return response;
    },
});
