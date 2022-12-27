import NicknameDate from './NicknameDate.json';

export const randomNickname = () => {
    return NicknameDate.words[Math.floor(Math.random() * NicknameDate.words.length)];
};
