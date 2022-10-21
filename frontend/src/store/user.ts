import { atom, selector } from 'recoil';
import { getUserInfo } from '../api/auth';
import { v1 } from 'uuid';

export const loginStatusState = atom({
    key: `loginStatusState/${v1()}`,
    default: false,
});

export const userIdState = atom({
    key: `userIdState/${v1()}`,
    default: '',
});

export const userLoginFormState = atom({
    key: `userLoginFormState/${v1()}`,
    default: {
        userId: '',
        password: '',
    },
});

export const userInfoState = atom({
    key: `userInfoState/${v1()}`,
    default: {},
});

export const userImageState = atom({
    key: `userImageState/${v1()}`,
    default: '/broken-image.jpg',
});

export const userInfoSelector = selector({
    key: `userInfoSelector/${v1()}`,
    get: async ({ get }) => {
        try {
            const response = await getUserInfo();
            if (response?.data?.userId) {
                return response.data;
            } else {
                throw response;
            }
        } catch (err) {
            console.log(err);
        }
    },
    set: ({ set }, newValue) => {
        set(userInfoState, newValue);
    },
});
