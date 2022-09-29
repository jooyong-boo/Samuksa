import NicknameDate from '../utils/NicknameDate.json';

export const RandomNickname = () => {
    return NicknameDate.words[Math.floor(Math.random() * NicknameDate.words.length)];
};
