import { atom } from 'recoil';
import { v1 } from 'uuid';

export const postEditState = atom({
    key: `postEdit/${v1()}`,
    default: {
        content: '',
        title: '',
        idx: 0,
        type: 0,
    },
});
